/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from "@mui/material/Grid";
import AIBuilder from "../../Builder/AIBuilder";
import HistoryDrawer from "../History/History";
import WaitingModal from "../../UtilityComponents/modals/WaitingModal";
import { useNotifications, } from '@toolpad/core/useNotifications';
import Box from "@mui/material/Box";

// hooks
import { useEffect, useState } from "react";
import useDesignGeneration from "../../../hooks/variations/useDesignGeneration";

import type { SubmitBuilderProps, ProjectResponseProps, ProjectProps } from "../../../types";
import BuilderModalPreview from "../../Builder/BuiulderModalPreview";
import GenerationBox from "../GenerationBox";
import { mockData } from "../../utils/mockData";
import { Typography } from "@mui/material";

const Playground = () => {
    const [openWaitingModal, setOpenWaitingModal] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState<ProjectProps | null>(null);
    const [grid, setGrid] = useState(Array(24).fill(null));
    const notifications = useNotifications();

    const handleCloseWaitingModal = () => setOpenWaitingModal(false);

    const { isPending, mutate, data } = useDesignGeneration({
        closeWaitingModal: handleCloseWaitingModal
    });

    const onHandleSubmit = async (data: SubmitBuilderProps) => {
        if (data.prompt === '') {
            notifications.show('Add more details to the prompt for better results.  ', {
                severity: 'error',
                autoHideDuration: 3000,
            })
            return;
        }
        mutate(data);
    };

    const mockGenerate = (index: number): Promise<typeof mockData[0]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockData[index]);
            }, 2000);
        });
    };

    // let generationQueue = Promise.resolve(); // Shared across calls

    const onHandleTestSubmit = (data: SubmitBuilderProps) => {
        // generationQueue = generationQueue.then(() =>
        //     handleQueuedGeneration()
        // );
        handleQueuedGeneration()
    };

    const handleQueuedGeneration = async () => {
        let targetIndex: number | null = null;

        // Step 1: Use functional update to safely get index
        setGrid((prevGrid) => {
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

        // Step 2: Do the mock generation
        const generated = await mockGenerate(Math.floor(Math.random() * mockData.length));

        // Step 3: Replace with actual result
        setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[targetIndex!] = generated;
            return newGrid;
        });
    };


    const onFullscreen = (index: number) => {
        setOpen(true);
        setProject(grid[index]);
        // Handle fullscreen logic here
    };

    useEffect(() => {
        // If data is available, update the grid with the new project
        console.log('data', grid);
    }, [grid]);

    const generatedPreview = data?.result?.image?.url as ProjectResponseProps['result']['image']['url'];
    // projectIndex !== null && console.log('projectIndex', projectIndex, 'generatedPreview', generatedPreview);

    return (
        <>
            {grid.map((item, index) => {
                const isLoading = item && 'loading' in item;

                return (
                    <Box
                        key={index}
                        sx={{
                            aspectRatio: '1 / 1',
                            width: '100%',
                            boxSizing: 'border-box',
                            boxShadow: '0 0 0 1px #000',
                            display: 'flex',
                            placeContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {isLoading ? (
                            <Typography sx={{ color: 'gray' }}>Loading...</Typography>
                        ) : item ? (
                            <GenerationBox onFullscreen={() => onFullscreen(index)} item={item} />
                        ) : null}

                    </Box>
                );
            })}


            <Grid sx={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)' }} size={{ xs: 12, md: 12, lg: 12 }}>
                <AIBuilder onHandleSubmit={onHandleTestSubmit} generatedPreview={generatedPreview} isLoading={isPending} />
            </Grid>

            <HistoryDrawer />
            <WaitingModal open={openWaitingModal} handleClose={handleCloseWaitingModal} />
            {project !== null ? <BuilderModalPreview open={open} project={project} handleCloseModal={() => setOpen(false)} /> : null}

        </>
    );
}

export default Playground;