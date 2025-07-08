// hooks
import { useDashboardContext } from '../hooks/useDashboardContext';
import useCategory from '../../../hooks/useCategory';

// components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from 'react-loading-skeleton';

// types
import type { ProjectApiProps, GridCell } from '../../../types';

const HistoryProjects = () => {
    const { isPending, data } = useCategory();
    const { setGrid, grid } = useDashboardContext();

    const skeletonCount = data?.projects?.length || 6;

    if (isPending && skeletonCount) {
        return (
            <Grid container spacing={2} p={1}>
                {[...Array(skeletonCount)].map((_, idx) => (
                    <Grid size={{ xs: 6, md: 6, lg: 6, xl: 4 }} key={idx}>
                        <Skeleton height={100} borderRadius={10} />
                    </Grid>
                ))}
            </Grid >
        );
    }

    return (
        <>
            <Grid container spacing={2} p={1.5}>
                {data?.projects && data?.projects.length > 0 ?
                    <>
                        {data?.projects.map((project: ProjectApiProps, index: number) => {
                            const isProjectInGrid = grid.some((p: GridCell) => p && 'id' in p && p.id === project.id);

                            return (
                                <Grid size={{ xs: 6, md: 6, lg: 6, xl: 4 }} key={index} sx={{
                                    aspectRatio: '1 / 1',
                                    pointerEvents: isProjectInGrid ? 'none' : 'auto',
                                    opacity: isProjectInGrid ? 0.5 : 1,
                                    filter: isProjectInGrid ? 'grayscale(100%)' : 'none',
                                    transition: 'opacity 0.3s ease, filter 0.3s ease-in-out',
                                }}>
                                    <Card sx={{ borderRadius: '2px', boxShadow: 3, }}
                                        onClick={() => {
                                            setGrid((prevGrid: GridCell[]) => {
                                                const newGrid = [...prevGrid];
                                                const firstEmptyIndex = newGrid.findIndex((cell) => cell == null);
                                                newGrid[firstEmptyIndex] = project;
                                                return newGrid;
                                            });
                                        }}>
                                        <CardMedia
                                            component="img"
                                            height="100%"
                                            image={'url' in project.images[0] ? project.images[0].url : ''}
                                            alt={`Pexels image ${index + 1}`}
                                            sx={{
                                                aspectRatio: '1 / 1',
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
                        <Grid>
                            <div>No projects found.</div>
                        </Grid>
                    )}
            </Grid>
        </>

    );
};

export default HistoryProjects;
