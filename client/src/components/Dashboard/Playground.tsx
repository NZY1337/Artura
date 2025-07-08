// hooks
import { useState, type SetStateAction } from "react";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useDashboardContext } from "./hooks/useDashboardContext";
import useDesignGeneration from "../../hooks/variations/useDesignGeneration";
import { useQueryClient } from "@tanstack/react-query";

// types
import type { EditableProjectProps, GridCell, ImageProps, ProjectResponseProps } from "../../types";

// components
import { TypeAnimation } from "react-type-animation";
import BuilderModalPreview from "../Builder/BuiulderModalPreview";
import AIBuilder from "../Builder/AIBuilder";
import GenerationBox from "./GenerationBox";
import Box from "@mui/material/Box";
import Carousel from "../UtilityComponents/Carousel";

// utils
import { mapResponseData } from "../utils/utilities";

// icons
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const result = {
//     project: {
//         id: "bbb7b7b2-4468-4329-a11e-b9eccdc6a333",
//         userId: "user_2xrVpetV8CkDDyfbJPSXmsrRe57",
//         category: "DESIGN_GENERATION",
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
    const { isPending, mutate } = useDesignGeneration();
    const { grid, project, setGrid, setProject } = useDashboardContext();
    const [slideIndex, setSlideIndex] = useState(0);

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
        if (project.prompt === "") {
            notifications.show(
                "Add more details to the prompt for better results.  ",
                {
                    severity: "error",
                    autoHideDuration: 3000,
                }
            );
            return;
        }

        let targetIndex: number | null = null;

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
        await new Promise((res) => setTimeout(res, 3000));

        if (targetIndex === null) return;
        // const generated = await mockGenerate(
        //   Math.floor(Math.random() * mockData.length)
        // );
        // setGrid((prevGrid: GridCell[]) => {
        //     const newGrid = [...prevGrid];
        //     newGrid[targetIndex!] = mapResponseData(result);
        //     return newGrid;
        // });

        mutate(project, {
            onSuccess: (data: ProjectResponseProps) => {
                setGrid((prevGrid: GridCell[]) => {
                    const newGrid = [...prevGrid];
                    newGrid[targetIndex!] = mapResponseData(data);
                    // newGrid[targetIndex!] = data;
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

    return (
        <Box sx={{ position: "relative", height: "90vh" }}>
            <Box
                sx={{
                    scrollbarWidth: "thin", // Firefox
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
                        marginRight: "5px", // Add spacing to push the thumb left
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
                    const generatedImages = item !== null && !("loading" in item) && Array.isArray(item.images) && item.images.filter((image): image is ImageProps => 'url' in image && !image.url.includes("uploaded-")
                    );

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
                                            <img
                                                key={'url' in image ? image.url : index}
                                                src={'url' in image ? image.url : ''}
                                                alt={`Interior ${index + 1}`}
                                            />
                                        ))}
                                    </Carousel>

                                    <GenerationBox onFullscreen={() => onFullscreen(index)} onRemove={() => onRemove(index)} />
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

                {project !== null ? (
                    <BuilderModalPreview
                        open={open}
                        project={project}
                        handleCloseModal={() => setOpen(false)}
                        slideIndex={slideIndex}
                    />
                ) : null}
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
                <AIBuilder onHandleSubmit={handleQueuedGeneration} isLoading={isPending} />
            </Box>
        </Box>
    );
};

export default Playground;
