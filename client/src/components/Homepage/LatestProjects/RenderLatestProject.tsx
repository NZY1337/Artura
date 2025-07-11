import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// types
import type { ProjectProps } from "../../../types";

export interface ShowCaseProps {
    project: ProjectProps
    index: number;
}

const ShowCase = ({ project, index }: ShowCaseProps) => {
    return (
        <Grid size={{ xs: 12, md: 12, lg: 12 }} key={index} container justifyContent="center" alignItems="center"
            sx={{ height: '50vh', p: .5 }}>

            <Box component="img" src={'url' in project.images[0] ? project.images[0].url : undefined} alt={`Interior ${index + 1}`}
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

export default ShowCase