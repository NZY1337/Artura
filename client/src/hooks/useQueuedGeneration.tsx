import type { GridCell, EditableProjectProps, ProjectResponseProps } from "../types";
import { mapResponseData } from "../components/utils/utilities";
import type { QueryClient } from "@tanstack/react-query";

type MutateFn = (
  p: EditableProjectProps,
  opts: { onSuccess?: (data: ProjectResponseProps) => void; onError?: () => void }
) => void;

export default function useQueuedGeneration({
  setGrid,
  mutateGenerator,
  mutateEditor,
  queryClient,
  notifications,
}: {
  setGrid: (updater: (prev: GridCell[]) => GridCell[]) => void;
  mutateGenerator: MutateFn;
  mutateEditor: MutateFn;
  queryClient: QueryClient;
  notifications: { show: (s: string, opts?: Record<string, unknown> | undefined) => void };
}) {
  const handleQueuedGeneration = async (project: EditableProjectProps) => {
    let targetIndex: number | null = null;
    const { category } = project;

    if (project.prompt === "") {
      notifications.show("Add more details to the prompt for better results.", {
        severity: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    setGrid((prevGrid: GridCell[]) => {
      const newGrid = [...prevGrid];
      const firstEmptyIndex = newGrid.findIndex((cell) => cell == null);
      if (firstEmptyIndex !== -1) {
        newGrid[firstEmptyIndex] = { loading: true } as unknown as GridCell;
        targetIndex = firstEmptyIndex;
      }

      return newGrid;
    });

    // Wait a tick to ensure React state update goes through
    await new Promise((res) => setTimeout(res, 0));

    if (targetIndex === null) return;

    if (category === "DESIGN_EDITOR") {
      mutateEditor(project, {
        onSuccess: (data: ProjectResponseProps) => {
          setGrid((prevGrid: GridCell[]) => {
            const newGrid = [...prevGrid];
            newGrid[targetIndex!] = mapResponseData(data);
            return newGrid;
          });

          queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: () => {
          setGrid((prevGrid: GridCell[]) => {
            const newGrid = [...prevGrid];
            newGrid[targetIndex!] = null;
            return newGrid;
          });
        },
      });
    }

    if (category === "DESIGN_GENERATOR") {
      mutateGenerator(project, {
        onSuccess: (data: ProjectResponseProps) => {
          setGrid((prevGrid: GridCell[]) => {
            const newGrid = [...prevGrid];
            newGrid[targetIndex!] = mapResponseData(data);
            return newGrid;
          });

          queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: () => {
          setGrid((prevGrid: GridCell[]) => {
            const newGrid = [...prevGrid];
            newGrid[targetIndex!] = null;
            return newGrid;
          });
        },
      });
    }
  };

  return { handleQueuedGeneration };
}
