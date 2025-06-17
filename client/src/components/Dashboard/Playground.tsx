
// hooks
import { useState } from "react";
import useDesignGeneration from "../../hooks/variations/useDesignGeneration";
import { useNotifications, } from '@toolpad/core/useNotifications';

// types
import type { SubmitBuilderProps, ProjectProps } from "../../types";

// components
import { TypeAnimation } from "react-type-animation";
import BuilderModalPreview from "../Builder/BuiulderModalPreview";
import AIBuilder from "../Builder/AIBuilder";
import GenerationBox from "./GenerationBox";
import Box from "@mui/material/Box";

import { mapResponseData } from "../utils/utilities";

type GridCell = null | { loading: true } | ProjectProps;

// result = {
//     "project": {
//         "id": "a7ee2d7c-baba-4c6c-935e-3a1874221f7e",
//         "userId": "user_2xrVpetV8CkDDyfbJPSXmsrRe57",
//         "prompt": "create a victorian bedroom.",
//         "category": "DESIGN_GENERATION",
//         "size": "1536x1024",
//         "quality": "high",
//         "createdAt": "2025-06-15T22:13:32.904Z",
//         "updatedAt": "2025-06-15T22:13:32.904Z"
//     },
//     "images": {
//         "count": 1
//     },
//     "imageGenerationResponse": {
//         "id": "700d1d92-5a80-4788-8cd5-5e7d5272526c",
//         "projectId": "a7ee2d7c-baba-4c6c-935e-3a1874221f7e",
//         "background": "auto",
//         "outputFormat": "png",
//         "quality": "high",
//         "size": "1536x1024",
//         "inputTokens": 12,
//         "imageTokens": 0,
//         "textTokens": 12,
//         "outputTokens": 6208,
//         "totalTokens": 6220,
//         "imageCost": 0.25,
//         "tokenCost": 0.24838,
//         "totalCost": 0.49838
//     }
// }

const Playground = () => {
    const [open, setOpen] = useState(false);
    const [project, setProject] = useState<ProjectProps | null>(null);
    const [grid, setGrid] = useState<GridCell[]>(Array(18).fill(null));
    const notifications = useNotifications();
    const { isPending, mutate } = useDesignGeneration();

    // const mockGenerate = (index: number): Promise<typeof mockData[0]> => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(mockData[index]);
    //         }, 10000);
    //     });
    // };

    // let generationQueue = Promise.resolve(); // Shared across calls

    // const onHandleTestSubmit = () => {
    // generationQueue = generationQueue.then(() =>
    //     handleQueuedGeneration()
    // );
    // handleQueuedGeneration()
    // };

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
    const handleQueuedGeneration = async (project: SubmitBuilderProps) => {
        if (project.prompt === '') {
            notifications.show('Add more details to the prompt for better results.  ', {
                severity: 'error',
                autoHideDuration: 3000,
            })
            return;
        }

        let targetIndex: number | null = null;

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
        // const generated = await mockGenerate(Math.floor(Math.random() * mockData.length));

        mutate(project, {
            onSuccess: (project) => {
                console.log(project);
                setGrid((prevGrid) => {
                    const newGrid = [...prevGrid];
                    newGrid[targetIndex!] = mapResponseData(project);
                    return newGrid;
                });
            },
        });
    };

    const onFullscreen = (index: number) => {
        const selectedProject = grid[index];
        if (selectedProject && selectedProject !== null && !('loading' in selectedProject)) {
            setOpen(true);
            setProject(selectedProject);
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

    return (
        <Box sx={{ position: 'relative', height: '90vh' }}>
            <Box
                sx={{
                    scrollbarWidth: 'thin', // Firefox
                    scrollbarColor: '#888 transparent',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                        marginRight: '5px', // Add spacing to push the thumb left
                    },
                    height: '100%',
                    overflow: 'auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1px',
                    placeContent: 'start center',
                    padding: '1px',
                }}>
                {grid.map((item, index) => {
                    const isLoading = item && 'loading' in item;
                    const backgroundImage = item !== null && !('loading' in item) && item.images?.[0]?.url;

                    const itemResponse = {
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }

                    return (
                        <Box key={index}
                            sx={{
                                aspectRatio: '1 / 1',
                                width: '100%',
                                boxSizing: 'border-box',
                                boxShadow: '0 0 0 1px #000',
                                display: 'flex',
                                placeContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                ...(backgroundImage ? itemResponse : {})
                            }}>
                            {isLoading ? <TypeAnimation
                                sequence={['Loading...', 1500, 'Hold tight...', 1500, 'This may take a while...', 1500]}
                                wrapper="span"
                                cursor={true}
                                repeat={Infinity}
                                speed={75}
                                style={{ display: 'inline-block', color: '#ffa500' }}
                            /> : item ? <GenerationBox onFullscreen={() => onFullscreen(index)} onRemove={() => onRemove(index)} item={item} /> : null}
                        </Box>
                    );
                })}

                {project !== null ? <BuilderModalPreview open={open} project={project} handleCloseModal={() => setOpen(false)} /> : null}
            </Box>

            <Box sx={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', maxWidth: '800px', minWidth: '100px', width: '100%', }}>
                <AIBuilder onHandleSubmit={handleQueuedGeneration} isLoading={isPending} />
            </Box>
        </Box>
    );
}

export default Playground;