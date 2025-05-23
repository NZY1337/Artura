import { Grid, Box } from "@mui/material"

import type { ProjectProps } from "../../../types";

interface RenderLatestProjectsProps {
    project: ProjectProps
    index: number;
    handleOpenModal: () => void;
    handleSetCurrentIndex: (index: number) => void;
}

const RenderLatestProjects = ({ project, index, handleOpenModal, handleSetCurrentIndex }: RenderLatestProjectsProps) => {
    return (
        <>
            <Grid
                size={{ xs: 12, md: 12, lg: 12 }}
                key={index}
                container
                justifyContent="center"
                alignItems="center"
                sx={{
                    height: 300,
                    p: .5,
                    cursor: 'pointer'
                }}
                onClick={() => {
                    handleSetCurrentIndex(index);
                    handleOpenModal()
                }}
            >
                <Box
                    component="img"
                    src={project?.images[0].url}
                    alt={`Interior ${index + 1}`}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        // borderRadius: 2,
                        boxShadow: 3,
                    }}
                />
            </Grid>
        </>
    )
}

export default RenderLatestProjects