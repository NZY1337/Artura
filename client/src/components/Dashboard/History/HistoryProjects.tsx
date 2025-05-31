import { useState } from 'react';
import { Grid, Card, CardMedia } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import GenericModalPreview from '../../Builder/BuiulderModalPreview';
import useCategory from '../../../hooks/useCategory';

import type { ProjectProps } from '../../../types';

const HistoryProjects = () => {
    const [open, setOpen] = useState(false);
    const [projectIndex, setProjectIndex] = useState(0);
    const { isPending, data } = useCategory();

    const skeletonCount = data?.projects?.length || 6;

    if (isPending) {
        return (
            <Grid container spacing={2} p={1}>
                {[...Array(skeletonCount)].map((_, idx) => (
                    <Grid size={{ xs: 6, md: 6, lg: 6, xl: 4 }} key={idx}>
                        <Skeleton height={100} borderRadius={10} />
                    </Grid>
                ))
                }
            </Grid >
        );
    }

    return (
        <>
            <Grid container spacing={2} p={1.5}>
                {data?.projects && data?.projects.length > 0 ?
                    <>
                        {data?.projects.map((project: ProjectProps, index: number) => {
                            return (
                                <Grid size={{ xs: 6, md: 6, lg: 6, xl: 4 }} key={index}>
                                    <Card
                                        onClick={() => {
                                            setOpen(true);
                                            setProjectIndex(index);
                                        }}
                                        sx={{
                                            borderRadius: '2px',
                                            boxShadow: 3,
                                        }}>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image={project.images[0]?.url}
                                            alt={`Pexels image ${index + 1}`}
                                            sx={{
                                                objectFit: 'cover',
                                                transition: 'transform 0.15s ease-in-out',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    transition: 'transform 0.15s ease-in-out',
                                                    cursor: 'pointer',
                                                }
                                            }}

                                        />
                                    </Card>
                                </Grid>
                            )
                        })}
                    </> : (
                        <>
                            <Grid>
                                <div>No projects found.</div>
                            </Grid>
                        </>
                    )}
            </Grid>
            <GenericModalPreview open={open} handleCloseModal={() => setOpen(false)} project={data?.projects[projectIndex]} />
        </>

    );
};

export default HistoryProjects;
