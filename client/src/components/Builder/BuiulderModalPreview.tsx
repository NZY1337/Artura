import Close from "@mui/icons-material/Close";
import GenericModal from "../UtilityComponents/modals/GenericModal";
import {
    Box,
    Avatar,
    Stack,
    Divider,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import BuilderOptionsPreview from "./BuilderOptionsPreview";
import type { ProjectProps, QualityFormatProps, SizeImageProps } from "../../types";

import Carousel from "../UtilityComponents/Carousel";

const BuilderModalPreview = ({
    project,
    handleCloseModal,
    open,
}: {
    project: ProjectProps;
    open: boolean;
    handleCloseModal: () => void;
}) => {

    const settings = {
        dots: false,
        slidesToShow: 1,  // make sure it's 1 if you want only one image at a time
        slidesToScroll: 1,
        infinite: project.images.length > 1, // infinite scroll only if more than one image
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,

    };

    console.log("Project in BuilderModalPreview:", project);

    return (
        <GenericModal open={open}>
            <Grid
                container
                sx={(theme) => ({
                    height: "inherit",
                    position: "relative",

                    [theme.breakpoints.down("lg")]: {
                        height: "unset",
                        marginTop: "2rem",
                    },
                })}
            >
                <Grid
                    size={{ xs: 12, md: 12, lg: 7 }}
                    sx={(theme) => ({
                        p: 4,
                        display: "flex",
                        alignItems: "center",
                        [theme.breakpoints.down("lg")]: {
                            marginTop: "2rem",
                        },
                    })}
                >
                    <Carousel settings={settings}>
                        {project?.images.map((image, index) => {
                            return (
                                (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`Interior ${index + 1}`}
                                        style={{
                                            objectFit: "contain",
                                            objectPosition: "center",
                                            width: "100%",
                                            maxHeight: "80vh",
                                        }}
                                    />
                                )
                            )
                        })}
                    </Carousel>
                </Grid>

                <Grid
                    size={{ xs: 12, md: 12, lg: 4 }}
                    sx={{ display: "flex", alignItems: "center", p: 4 }}
                >
                    <Box>
                        <Box>
                            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                <Avatar
                                    src="/path-to-your-blueprint-thumbnail.png"
                                    alt="Blueprint"
                                    sx={{ width: 56, height: 56 }}
                                />
                                <Typography variant="caption" color="gray">
                                    Created on {new Date(project?.createdAt).toLocaleDateString()}
                                </Typography>
                            </Stack>

                            <Typography variant="body2" sx={{ color: "#ccc", mb: 3 }}>
                                {project?.prompt}
                            </Typography>

                            <Divider sx={{ borderColor: "#333", my: 2 }} />

                            <BuilderOptionsPreview
                                builderState={{
                                    size: project?.size as SizeImageProps,
                                    quality: project?.quality as QualityFormatProps,
                                    spaceType: ["Living Room"],
                                    designTheme: ["Modern"],
                                    category: ["Design Generator"],
                                    prompt: project?.prompt,
                                    n: 1,
                                    output_format: "png",
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>

                <Button
                    sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        color: "white",
                    }}
                    onClick={handleCloseModal}
                >
                    <Close />
                </Button>
            </Grid>
        </GenericModal>
    );
};

export default BuilderModalPreview;
