import { useState } from "react";

// components
import Close from "@mui/icons-material/Close";
import GenericModal from "../UtilityComponents/modals/GenericModal";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import BuilderOptionsPreview from "./BuilderOptionsPreview";
import Carousel from "../UtilityComponents/Carousel";

// types
import type { ProjectProps, } from "../../types";

const BuilderModalPreview = ({ project, open, handleCloseModal }: { project: ProjectProps; open: boolean; handleCloseModal: () => void; }) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(false);


    const imagesUploadedByUser = project?.images.filter(({ url }) => url.includes('uploaded-'));
    const imagesGeneratedByAI = project?.images.filter(({ url }) => url.includes('generated-'));

    console.log(imagesGeneratedByAI);

    const settings = {
        slidesToShow: 1,  // make sure it's 1 if you want only one image at a time
        slidesToScroll: 1,
        infinite: false, // infinite scroll only if more than one image
        autoplay: false,
        // arrows: false
    };

    // let timeout: NodeJS.Timeout;

    const handleMouseEnter = (url: string) => {
        setPreviewImage(url);
        setIsPreviewVisible(true);
    };

    const handleMouseLeave = () => {
        setIsPreviewVisible(false);
    };


    return (
        <GenericModal open={open}>
            <Grid container
                sx={(theme) => ({
                    height: "inherit", position: "relative",
                    [theme.breakpoints.down("lg")]: {
                        height: "unset", marginTop: "2rem",
                    },
                })}>

                <Grid size={{ xs: 12, md: 12, lg: 7 }}
                    sx={(theme) => ({
                        p: 4, display: "flex", alignItems: "center",
                        [theme.breakpoints.down("lg")]: {
                            marginTop: "2rem",
                        },
                    })}>

                    <Box sx={{ position: 'relative', width: '100%' }}>
                        <Carousel settings={settings}>
                            {imagesGeneratedByAI.map((image, index) => (
                                <img
                                    key={image.url}
                                    src={image.url}
                                    alt={`Interior ${index + 1}`}
                                    style={{
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        width: "100%",
                                    }}
                                />
                            ))}
                        </Carousel>

                        {/* <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                zIndex: 10,
                                backgroundColor: isPreviewVisible ? "rgba(57, 57, 57, 0.9)" : "transparent",
                                opacity: isPreviewVisible ? 1 : 0,
                                transition: "opacity 0.4s ease-in-out, background-color 0.4s ease-in-out",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                pointerEvents: "none", // avoid blocking interactions
                            }}
                        >
                            <img
                                src={previewImage ?? ""}
                                alt="Preview"
                                style={{
                                    objectFit: "contain",
                                    objectPosition: "center",
                                    width: "100%",
                                    height: "100%",
                                    opacity: isPreviewVisible ? 1 : 0,
                                    transition: "opacity 0.4s ease-in-out",
                                    pointerEvents: "none",
                                }}
                            />
                        </Box> */}
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 12, lg: 4 }} sx={{ display: "flex", alignItems: "center", p: 4 }}>
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                            {imagesGeneratedByAI.map((image) => (
                                <Avatar
                                    key={image.url}
                                    variant="rounded"
                                    src={image.url}
                                    onMouseEnter={() => handleMouseEnter(image.url)}
                                    onMouseLeave={handleMouseLeave}
                                    sx={{ width: 80, height: 80, cursor: 'pointer' }}
                                />
                            ))}
                        </Stack>

                        <Typography variant="body2" sx={{ color: "#ccc", mb: 3 }}>
                            {project?.prompt}
                        </Typography>

                        <Divider sx={{ borderColor: "#333", my: 2 }} />

                        <BuilderOptionsPreview
                            builderState={{
                                size: project?.size,
                                quality: project?.quality,
                                spaceType: ["Living Room"],
                                designTheme: ["Modern"],
                                category: ["Design Generator"],
                                prompt: project?.prompt,
                                n: 1,
                                output_format: "png",
                            }}
                        />
                    </Box>
                </Grid>

                <Button sx={{ position: "absolute", top: "10px", right: "10px", color: "white", }} onClick={handleCloseModal}>
                    <Close />
                </Button>
            </Grid>
        </GenericModal>
    );
};

export default BuilderModalPreview;
