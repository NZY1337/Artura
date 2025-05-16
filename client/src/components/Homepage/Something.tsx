// 1. HOW IT WORKS SECTION
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import StyleIcon from '@mui/icons-material/Style';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import video from '../../assets/artura-video-pexels.mp4';


export function HowItWorksSection() {
    const steps = [
        { icon: <DesignServicesIcon fontSize="large" />, title: 'Upload Your Space', desc: 'Start by uploading a photo of your room or area.' },
        { icon: <StyleIcon fontSize="large" />, title: 'Choose a Style', desc: 'Pick from a range of design styles to match your taste.' },
        { icon: <AutoAwesomeIcon fontSize="large" />, title: 'Generate Design', desc: 'Let our AI do the magic and generate stunning visuals.' },
    ];

    return (
        <Box sx={{ py: 8, backgroundColor: '#121212', color: '#fff' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center">How It Works</Typography>
                <Grid container spacing={4} justifyContent="center">
                    {steps.map((step, i) => (
                        <Grid size={{ xs: 12, md: 4 }} key={i} textAlign="center">
                            {step.icon}
                            <Typography variant="h6" mt={2}>{step.title}</Typography>
                            <Typography variant="body2" mt={1}>{step.desc}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}


// 2. CLIENT TESTIMONIALS SECTION
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export function TestimonialsSection() {
    const testimonials = [
        {
            quote: 'This saved me weeks of planning. The designs were stunning.',
            name: 'Maria',
            role: 'Interior Designer',
        },
        {
            quote: 'I renovated my office just from the AI mockup. Love it!',
            name: 'Luca',
            role: 'Freelancer',
        },
        {
            quote: 'Quick, beautiful, and personalized. Exactly what I needed.',
            name: 'Andreea',
            role: 'Architect',
        },
    ];

    return (
        <Box sx={{ py: 8, backgroundColor: '#1e1e1e', color: '#fff' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center">What Our Clients Say</Typography>
                <Grid container spacing={4} justifyContent="center">
                    {testimonials.map((t, i) => (
                        <Grid size={{ xs: 12, md: 4 }} key={i}>
                            <Box sx={{ border: '1px solid #444', borderRadius: 2, p: 3 }}>
                                <FormatQuoteIcon sx={{ fontSize: 40, opacity: 0.3 }} />
                                <Typography variant="body1" mt={2}>"{t.quote}"</Typography>
                                <Typography variant="subtitle2" mt={2} fontWeight="bold">{t.name}</Typography>
                                <Typography variant="caption" color="gray">{t.role}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}


// 3. BEFORE & AFTER SHOWCASE SECTION
import { Card, CardMedia } from '@mui/material';

export function BeforeAfterSection() {
    const showcases = [
        { before: '/images/before1.jpg', after: '/images/after1.jpg' },
        { before: '/images/before2.jpg', after: '/images/after2.jpg' },
    ];

    return (
        <Box sx={{ py: 8, backgroundColor: '#121212', color: '#fff' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center">Before & After</Typography>
                <Grid container spacing={4} justifyContent="center">
                    {showcases.map((s, i) => (
                        <Grid size={{ xs: 12, md: 4 }} key={i}>
                            <Typography variant="subtitle1">Before</Typography>
                            <Card sx={{ mb: 2 }}>
                                <CardMedia component="img" height="200" image={s.before} alt="Before" />
                            </Card>
                            <Typography variant="subtitle1">After</Typography>
                            <Card>
                                <CardMedia component="img" height="200" image={s.after} alt="After" />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}


// 4. SUCCESS METRICS SECTION
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export function SuccessMetricsSection() {
    const metrics = [
        { icon: <TrendingUpIcon fontSize="large" />, number: '10K+', label: 'Designs Generated' },
        { icon: <ThumbUpAltIcon fontSize="large" />, number: '98%', label: 'User Satisfaction' },
        { icon: <AccessTimeIcon fontSize="large" />, number: '5x', label: 'Faster Design Time' },
    ];

    return (
        <Box sx={{ py: 8, backgroundColor: '#1e1e1e', color: '#fff' }}>
            <Container>
                <Typography variant="h4" gutterBottom textAlign="center">Success Metrics</Typography>
                <Grid container spacing={4} justifyContent="center">
                    {metrics.map((m, i) => (
                        <Grid size={{ xs: 12, md: 4 }} key={i} textAlign="center">
                            {m.icon}
                            <Typography variant="h5" mt={2}>{m.number}</Typography>
                            <Typography variant="subtitle2">{m.label}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}


export const TwoImageLayout = () => {
    return (
        // <Container maxWidth={false} disableGutters>
        //     <Grid container sx={{ height: '50vh' }}>
        //         <Grid size={{ xs: 12, md: 6 }}>
        //             <Box
        //                 sx={{
        //                     height: '100%',
        //                     backgroundImage: `url(https://images.pexels.com/photos/5292244/pexels-photo-5292244.jpeg)`,
        //                     backgroundSize: 'cover',
        //                     backgroundPosition: 'center',
        //                 }}
        //             />
        //         </Grid>
        //         <Grid size={{ xs: 12, md: 6 }}>
        //             <Box
        //                 sx={{
        //                     height: '100%',
        //                     backgroundImage: `url(https://images.pexels.com/photos/158148/ruhl-house-home-galveston-texas-158148.jpeg)`,
        //                     backgroundSize: 'cover',
        //                     backgroundPosition: 'center',
        //                 }}
        //             />
        //         </Grid>
        //     </Grid>
        // </Container>

        <Container maxWidth={false} disableGutters>
            <Box sx={{ position: 'relative', height: '50vh', overflow: 'hidden' }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        minWidth: '100%',
                        minHeight: '100%',
                        objectFit: 'cover',
                        zIndex: -1,
                    }}
                >
                    <source
                        src={video}
                        type="video/mp4"
                    />
                </video>

                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        color: '#fff',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            backgroundImage: `url(https://images.pexels.com/photos/5292244/pexels-photo-5292244.jpeg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <Container>
                        <Grid container alignItems="center" justifyContent={'space-around'}>
                            <Grid size={{ xs: 12, md: 5 }}>
                                <Typography variant="h4" fontSize={30} fontWeight={200}>Empower Your Interior Design Experience through the help of Artificial Intelligence.</Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 5 }}>
                                <Typography variant="body1" fontSize={20} >
                                    10% discount with promo code:{" "}
                                    <Typography variant="subtitle1" component="span" fontWeight="bold" color="#3ecf8e">
                                        ARTURA
                                    </Typography>
                                </Typography>

                                <Button variant='contained' sx={{ mt: 1 }} >
                                    Register Now
                                </Button>
                            </Grid>
                        </Grid >
                    </Container>
                </Box>
            </Box>
        </Container >
    );
};

export default TwoImageLayout;
