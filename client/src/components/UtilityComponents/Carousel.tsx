import Slider from "react-slick";
import { Container, Grid, Box, Typography } from '@mui/material';

const images = [
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=4096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=3400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=2908&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615874694520-474822394e73?q=80&w=4096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615876063860-d971f6dca5dc?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551215717-8bc8cfe833ee?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80',
];


export default function Carousel() {
    const settings = {
        dots: false,
        autoplay: true,
        focusOnSelect: true,
        speed: 3000,
        autoplaySpeed: 0,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>


            <Container maxWidth={false} sx={{ width: '98%', mt: 15 }}>
                <Container >
                    <Grid container justifyContent={'center'} >
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography textAlign={'left'} variant="body1" sx={{ mb: 2 }} >
                                Interior Photos Lorem ipsum dolor, sit amet consectetur. Voluptatibus veritatis nisi sunt ipsum eos blanditiis eius, nostrum nihil quaerat odit veniam at praesentium similique mollitia ducimus tempora molestiae pariatur laborum.
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="h2" sx={{ mb: 2 }} textAlign={'right'}>
                                Latest Generations
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

                <Slider {...settings}>
                    {images.map((img, index) => (
                        <Grid
                            gap={0}
                            size={{ xs: 12, md: 12, lg: 4 }}
                            key={index}
                            container
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                height: 300,
                                p: .2,
                            }}
                        >
                            <Box
                                component="img"
                                src={img}
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
                    ))}
                </Slider>
            </Container>

        </>
    );
}

