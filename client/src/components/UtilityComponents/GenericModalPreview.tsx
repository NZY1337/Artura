import { Grid, Typography, Button, Box, Chip } from '@mui/material';
import Close from '@mui/icons-material/Close';
import GenericModal from './modals/GenericModal';

import type { ProjectProps } from '../../types';

const GenericModalPreview = ({ project, handleCloseModal, open }: { project: ProjectProps, open: boolean, handleCloseModal: () => void }) => {
    return (
        <GenericModal open={open}>
            <Grid container sx={(theme) => ({
                height: 'inherit', position: 'relative',

                [theme.breakpoints.down('lg')]: {
                    height: 'unset',
                    marginTop: '2rem'
                }
            })}>
                <Grid size={{ xs: 12, md: 12, lg: 7 }}
                    sx={(theme) => ({
                        p: 4, display: 'flex', alignItems: 'center',
                        [theme.breakpoints.down('lg')]: {
                            marginTop: '2rem'
                        }
                    })}>

                    <img src={project?.images[0].url} alt="Interior" style={{ objectFit: 'contain', objectPosition: 'right', width: '100%', maxHeight: '80vh' }} />
                </Grid>

                <Grid size={{ xs: 12, md: 12, lg: 4 }} sx={{ display: 'flex', alignItems: 'center', p: 4 }}>
                    <Box>
                        <Chip label={project?.category.toLocaleLowerCase()} color="primary" sx={{ mb: 2, fontWeight: 700 }} />
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {project?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Created on {new Date(project?.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" mt={2}>
                            {project?.description}
                        </Typography>
                    </Box>
                </Grid>

                <Button sx={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }} onClick={handleCloseModal}><Close /></Button>
            </Grid>
        </GenericModal >
    );
}

export default GenericModalPreview

