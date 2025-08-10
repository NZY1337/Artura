// hooks
import { useState, type SetStateAction } from "react";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useDashboardContext } from "./hooks/useDashboardContext";
import useDesignGenerator from "../../hooks/variations/useDesignGenerator";
import useDesignEditor from "../../hooks/variations/useDesignEditor";
import { useQueryClient } from "@tanstack/react-query";

// types
import type { GridCell, ProjectResponseProps, EditableProjectProps } from "../../types";

// components
import { TypeAnimation } from "react-type-animation";
import BuilderModalPreview from "../Builder/BuiulderModalPreview";
import AIBuilder from "../Builder/AIBuilder";
import GenerationBox from "./GenerationBox";
import Box from "@mui/material/Box";
import Carousel from "../UtilityComponents/Carousel";

// utils
import { mapResponseData, urlToFile } from "../utils/utilities";

// icons
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const result = {
//     project: {
//         id: "bbb7b7b2-4468-4329-a11e-b9eccdc6a333",
//         userId: "user_2xrVpetV8CkDDyfbJPSXmsrRe57",
//         category: "DESIGN_GENERATOR",
//         createdAt: "2025-06-19T13:28:53.399Z",
//         updatedAt: "2025-06-19T13:28:53.399Z",
//         prompt:
//             "Create a super realistic 3d rendering of this architectural rendering.. Do not change the positions of the walls, and maintain lines in the same exact position as they are in the plan, but add furniture and finishes and textures and depth.",
//         background: "auto",
//         outputFormat: "png",
//         quality: "high",
//         size: "1536x1024",
//         designTheme: "MODERN",
//         spaceType: "LIVING_ROOM",
//         n: 1
//     },
//     images: [
//         {
//             id: "e027ce3b-1ae4-4948-87aa-922ed335d3b9",
//             url: "https://yfyiqiqqwgdvmazcgdnv.supabase.co/storage/v1/object/public/artura/user_2xrVpetV8CkDDyfbJPSXmsrRe57/generated-user_2xrVpetV8CkDDyfbJPSXmsrRe57-1750339732317-0.png",
//             projectId: "bbb7b7b2-4468-4329-a11e-b9eccdc6afc2",
//             createdAt: "2025-06-19T13:28:53.494Z",
//         },
//     ],
//     imageGenerationResponse: {
//         id: "93d1f1d9-b68b-45bc-97f9-4c5860eb7f9f",
//         projectId: "bbb7b7b2-4468-4329-a11e-b9eccdc6afc2",
//         inputTokens: 402,
//         imageTokens: 323,
//         textTokens: 79,
//         outputTokens: 1568,
//         totalTokens: 1970,
//         imageCost: 0.25,
//         tokenCost: 0.06634500000000002,
//         totalCost: 0.316345,
//     },
// };

// const mockGenerate = (index: number): Promise<typeof mockData[0]> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(mockData[index]);
//         }, 10000);
//     });
// };

const Playground = () => {
    const [open, setOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const [builderState, setBuilderState] = useState<EditableProjectProps>({
        size: 'SIZE_1024x1024',
        quality: 'HIGH',
        spaceType: 'LIVING_ROOM',
        designTheme: 'MODERN',
        category: 'DESIGN_GENERATOR',
        prompt: '',
        n: 1,
        outputFormat: 'PNG',
        images: [],
    });

    // hooks
    const { isPending: isPendingGenerator, mutate: mutateGenerator } = useDesignGenerator();
    const { isPending: isPendingEditor, mutate: mutateEditor } = useDesignEditor();
    const { grid, project, setGrid, setProject } = useDashboardContext();
    const queryClient = useQueryClient();
    const notifications = useNotifications();

    const settings = {
        lazyLoad: true,
        slidesToShow: 1, // make sure it's 1 if you want only one image at a time
        slidesToScroll: 1,
        infinite: false, // infinite scroll only if more than one image
        autoplay: false,
        speed: 500,
        arrows: true,
        nextArrow: <KeyboardArrowRightIcon sx={{ color: "#fff", zIndex: 1 }} />,
        prevArrow: <KeyboardArrowLeftIcon sx={{ color: "#fff", zIndex: 1 }} />,
        beforeChange: (_: number, next: SetStateAction<number>) => setSlideIndex(next)
    };

    /*
        - In your first setGrid, I'm setting a loading: true marker.
        - But React state updates are asynchronous — they don’t immediately apply.
        - calling mockGenerate() right after setGrid(), the component might not yet re-render and show the "Loading..." state.
        - So the await setTimeout(..., 0) gives React time to finish that state update, ensuring the "loading" indicator is visible before the mock generation finishes.
          * @returns 
          * This function handles the queued generation of a new project.
          * It finds the first empty cell in the grid, sets it to loading state,
          * and then simulates a generation process by calling mockGenerate.
          * Once the generation is complete, it updates the grid with the generated project.
          * If no empty cell is found, it does nothing.
    */
    const handleQueuedGeneration = async (project: EditableProjectProps) => {
        let targetIndex: number | null = null;
        const { category } = project;

        if (project.prompt === "") {
            notifications.show("Add more details to the prompt for better results.",
                {
                    severity: "error",
                    autoHideDuration: 3000,
                }
            );
            return;
        }

        setGrid((prevGrid: GridCell[]) => {
            const newGrid = [...prevGrid];
            const firstEmptyIndex = newGrid.findIndex((cell) => cell == null);
            if (firstEmptyIndex !== -1) {
                newGrid[firstEmptyIndex] = { loading: true };
                targetIndex = firstEmptyIndex;
            }

            return newGrid;
        });

        // Wait a tick to ensure React state update goes through
        await new Promise((res) => setTimeout(res, 0));

        if (targetIndex === null) return;
        // const generated = await mockGenerate(
        //   Math.floor(Math.random() * mockData.length)
        // );
        // setGrid((prevGrid: GridCell[]) => {
        //     const newGrid = [...prevGrid];
        //     newGrid[targetIndex!] = mapResponseData(result);
        //     return newGrid;
        // });

        if (category === "DESIGN_EDITOR") {
            mutateEditor(project, {
                onSuccess: (data: ProjectResponseProps) => {
                    setGrid((prevGrid: GridCell[]) => {
                        const newGrid = [...prevGrid];
                        newGrid[targetIndex!] = mapResponseData(data);
                        return newGrid;
                    });

                    queryClient.invalidateQueries({ queryKey: ['projects'] });
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

                    queryClient.invalidateQueries({ queryKey: ['projects'] });
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

    const onFullscreen = (index: number) => {
        const selectedProject = grid[index];

        if (selectedProject && selectedProject !== null && !("loading" in selectedProject)) {
            setOpen(true);
            setProject((prevProject) => {
                if (prevProject && prevProject.id !== selectedProject.id) {
                    setSlideIndex(0);
                }
                return selectedProject
            });
        }
    };

    const onRemove = (index: number) => {
        setGrid((prevGrid) => {
            const newArr = [...prevGrid];
            newArr.splice(index, 1);
            newArr.push(null);
            return newArr;
        });
    };

    const onEditProject = async (index: number) => {
        const selectedProject = grid[index];

        if (!selectedProject || selectedProject === null || "loading" in selectedProject) {
            return;
        }

        try {
            // Show loading indicator while preparing edit data
            notifications.show("Preparing project for editing...", {
                severity: "info",
                autoHideDuration: 2000,
            });

            // Convert image URLs to File objects
            const convertedImages: Array<{ file: File, preview: string }> = [];

            if (selectedProject.images && Array.isArray(selectedProject.images)) {
                for (const image of selectedProject.images) {
                    if ('url' in image && image.url) {
                        try {
                            const fileObject = await urlToFile(image.url);
                            convertedImages.push({
                                file: fileObject,
                                preview: image.url // Keep the original URL as preview
                            });
                        } catch (error) {
                            console.error('Failed to convert image:', error);
                            notifications.show("Failed to load some images for editing", {
                                severity: "warning",
                                autoHideDuration: 3000,
                            });
                        }
                    }
                }
            }

            // Update builderState with the selected project data and converted images
            setBuilderState({
                id: selectedProject.id,
                category: selectedProject.category,
                prompt: selectedProject.prompt,
                background: selectedProject.background,
                outputFormat: selectedProject.outputFormat,
                quality: selectedProject.quality,
                size: selectedProject.size,
                designTheme: selectedProject.designTheme,
                spaceType: selectedProject.spaceType,
                n: selectedProject.n,
                // Add the converted images as File objects
                images: convertedImages,
            });

            notifications.show("Project loaded for editing", {
                severity: "success",
                autoHideDuration: 2000,
            });

        } catch (error) {
            console.error('Error preparing project for edit:', error);
            notifications.show("Failed to prepare project for editing", {
                severity: "error",
                autoHideDuration: 3000,
            });
        }
    };

    return (
        <Box sx={{ position: "relative", height: "90vh" }}>
            <Box
                sx={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#888 transparent",
                    "&::-webkit-scrollbar": {
                        width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888",
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                        marginRight: "5px",
                    },
                    height: "100%",
                    overflow: "auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1px",
                    placeContent: "start center",
                    padding: "1px",
                }}>
                {grid.map((item, index) => {
                    const isLoading = item && "loading" in item;
                    const generatedImages = item !== null
                        && !("loading" in item)
                        && Array.isArray(item.images)
                        && item.images.filter((image) => 'url' in image && !image.url.includes("uploaded-"));

                    return (
                        <Box key={index}
                            sx={{
                                aspectRatio: "1 / 1",
                                width: "100%",
                                boxSizing: "border-box",
                                boxShadow: "0 0 0 1px #000",
                                display: "flex",
                                placeContent: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                            }}>

                            {generatedImages ? (
                                <>
                                    <Carousel className="playground-carousel-container" settings={settings}>
                                        {generatedImages.map((image, index) => (
                                            "url" in image ? (
                                                <img
                                                    key={image.url}
                                                    src={image.url}
                                                    alt={`Interior ${index + 1}`}
                                                />
                                            ) : null
                                        ))}
                                    </Carousel>

                                    <GenerationBox onFullscreen={() => onFullscreen(index)} onRemove={() => onRemove(index)} onEdit={() => onEditProject(index)} />
                                </>
                            ) : null}

                            {isLoading ? (
                                <TypeAnimation sequence={["Loading...", 1500, "Hold tight...", 1500, "This may take a while...", 1500]}
                                    wrapper="span"
                                    cursor={true}
                                    repeat={Infinity}
                                    speed={75}
                                    style={{ display: "inline-block", color: "#ffa500" }}
                                />
                            ) : null}
                        </Box>
                    );
                })}

                {project !== null && (
                    <BuilderModalPreview open={open} project={project} handleCloseModal={() => setOpen(false)} slideIndex={slideIndex} />
                )}
            </Box>

            <Box sx={{
                position: "absolute",
                bottom: "50px",
                left: "50%",
                transform: "translateX(-50%)",
                maxWidth: "800px",
                minWidth: "100px",
                width: "100%",
            }}>
                <AIBuilder builderState={builderState} setBuilderState={setBuilderState} onHandleSubmit={handleQueuedGeneration} isLoading={isPendingGenerator || isPendingEditor} />
            </Box>
        </Box>
    );
};

export default Playground;
