import { Container, Box, Grid, Card, CardContent, Typography, } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';

const HomeServicesPreview = () => {
    const services = [
        {
            title: 'Home Design Consultation',
            description:
                "Professional interior decorator visiting a client's home to assess their design needs, preferences, and goals.",
            backgroundColor: '#121212', // dark
            color: '#fff',
        },
        {
            title: 'Space Planning and Layout Design',
            description:
                "Professional interior decorator visiting a client's home assess their design needs, preferences, and goals.",
            backgroundColor: '#c49a78', // brownish
            color: '#fff',
        },
        {
            title: 'Renovation and Remodeling',
            description:
                "Professional interior decorator visiting a client's home assess their design needs, preferences, and goals.",
            backgroundColor: '#121212', // dark
            color: '#fff',
        },
    ];

    return <>
        <Container sx={{ mt: '-7rem', justifyContent: ' center' }} disableGutters={true}>
            <Grid container spacing={3} gap={0} sx={{ justifyContent: 'center' }}>
                {services.map((service, index) => (
                    <Grid size={{ md: 4, lg: 4, xs: 6 }} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                backgroundColor: service.backgroundColor,
                                color: service.color,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                p: 3,
                                borderRadius: 0,
                                boxShadow: 'none',
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, p: 0, borderRadius: 0 }}>
                                <Typography variant="body1" width={'80%'} component="h5" fontSize={20} fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase' }}>
                                    {service.title}
                                </Typography>
                                <Typography variant="body1">
                                    {service.description}
                                </Typography>
                            </CardContent>
                            <Box mt={3}>
                                <Link style={{ color: '#fff' }} to={`/services/${service.title}`} aria-label={`Learn more about ${service.title}`}>
                                    <ArrowRightAltIcon sx={{ fontSize: 30 }} />
                                </Link>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </>
}

export default HomeServicesPreview;

