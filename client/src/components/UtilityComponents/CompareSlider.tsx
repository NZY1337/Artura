import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Container, Grid } from '@mui/material';
import img1 from '../../assets/kitchen-after.png';
import img2 from '../../assets/kitchen-before.png';

export const CompareSlider = () => {
    return (
        <Container sx={{ mb: 10 }}>
            <Grid container>
                <Grid size={{ xs: 12 }}>
                    <ReactCompareSlider
                        transition=".75s ease-in-out"
                        boundsPadding={0}
                        itemOne={<ReactCompareSliderImage alt="Image one" src={img1} />}
                        itemTwo={<ReactCompareSliderImage alt="Image two" src={img2} style={{ filter: 'saturate(1.25) contrast(1.1) drop-shadow(2px 4px 6px black)' }} />}
                        keyboardIncrement="5%"
                        position={50}
                    />
                </Grid>

            </Grid>
        </Container>
    );
};

export default CompareSlider;