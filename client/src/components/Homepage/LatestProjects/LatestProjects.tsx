// hooks
import useCategory from "../../../hooks/useCategory";

// components
import { Container, Grid, Typography } from '@mui/material';
import Carousel from "../../UtilityComponents/Carousel";
import RenderLatestProjects from "./RenderLatestProject";

// types
import type { ProjectProps } from "../../../types";

export default function LatestProjects() {
    const { data } = useCategory();

    const settings = {
        dots: false,
        autoplay: true,
        focusOnSelect: true,
        speed: 5000,
        autoplaySpeed: 0,
        slidesToShow: 2,
        infinite: data?.projects?.length >= 1,  // Disable infinite if not enough items
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
            {data && data.projects && data.projects.length > 0 ? <>
                <Container maxWidth={false} sx={{ width: '98%', mt: 15 }}>
                    <Container sx={{ mb: 3 }}>
                        <Grid container justifyContent={'center'}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography textAlign={'left'} variant="body1" sx={{ mb: 2 }}>
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

                    <Carousel className="latest-projects-carousel" settings={settings}>
                        {data?.projects.slice(0, 5)?.map((project: ProjectProps, index: number) => (
                            <RenderLatestProjects project={project} index={index}  />
                        ))}
                    </Carousel>
                </Container>
            </> : null}
        </>
    );
}

