import Slider from "react-slick";
import { Container } from '@mui/material';
import type { CarouselProps } from "../../types";

export default function Carousel({ children, settings }: CarouselProps) {
    return (
        <>
            <Container maxWidth={false} sx={{ width: '98%' }}>
                <Slider {...settings}>
                    {children}
                </Slider>
            </Container>
        </>
    );
}

