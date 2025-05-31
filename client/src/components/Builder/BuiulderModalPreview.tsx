import Close from '@mui/icons-material/Close';
import GenericModal from '../UtilityComponents/modals/GenericModal';
import { Box, Avatar, Stack, Divider, Grid, Typography, Button, } from '@mui/material';
import BuilderOptionsPreview from './BuilderOptionsPreview';
import type { ProjectProps } from '../../types';

const BuilderModalPreview = ({ project, handleCloseModal, open }: { project: ProjectProps, open: boolean, handleCloseModal: () => void }) => {
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

                    <img src={project?.images[0]?.url} alt="Interior" style={{ objectFit: 'contain', objectPosition: 'right', width: '100%', maxHeight: '80vh' }} />
                </Grid>

                <Grid size={{ xs: 12, md: 12, lg: 4 }} sx={{ display: 'flex', alignItems: 'center', p: 4 }}>
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

                            <Typography variant="body2" sx={{ color: '#ccc', mb: 3 }}>
                                {project.prompt}
                            </Typography>

                            <Divider sx={{ borderColor: '#333', my: 2 }} />

                            <BuilderOptionsPreview builderState={{
                                size: '1536x1024',
                                quality: 'high',
                                spaceType: ['Living Room'],
                                designTheme: ['Modern'],
                                prompt: project.prompt,
                                n: 1,
                                output_format: 'png',
                            }} />
                        </Box>
                    </Box>
                </Grid>

                <Button sx={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }} onClick={handleCloseModal}><Close /></Button>
            </Grid>
        </GenericModal >
    );
}

export default BuilderModalPreview

