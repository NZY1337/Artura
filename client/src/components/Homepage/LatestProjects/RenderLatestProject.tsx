import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// types
import type { RenderLatestProjectsProps } from "../../../types";

const RenderLatestProjects = ({ project, index, handleOpenModal, handleSetCurrentIndex }: RenderLatestProjectsProps) => {
    return (
        <Grid size={{ xs: 12, md: 12, lg: 12 }} key={index} container justifyContent="center" alignItems="center"
            sx={{
                height: 300,
                p: .5,
                cursor: 'pointer'
            }}
            onClick={() => {
                handleSetCurrentIndex(index);
                handleOpenModal();
            }}
        >
            <Box component="img" src={project?.images[0]?.url} alt={`Interior ${index + 1}`}
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    boxShadow: 3,
                }}
            />
        </Grid>
    )
}

export default RenderLatestProjects