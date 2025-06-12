import SectionWrapper from '../UtilityComponents/SectionWrapper';
import {
    Grid,
    Typography,
    Button,
    Box
} from "@mui/material";


import circle from '../../assets/circle.svg';
import variation1 from '../../assets/variation1.png';
import variant2 from '../../assets/variant2.png';
import variant3 from '../../assets/variation3.png';
import variant4 from '../../assets/variation4.png';
import ShuffleIcon from '@mui/icons-material/Shuffle';

const DesignVariations = () => {
    return (
        <SectionWrapper
            sx={{
                display: 'flex',
                position: 'relative',
                zIndex: 1,
                '&::after': {
                    content: '""',
                    display: 'block',
                    width: '80%',
                    height: '80%',
                    backgroundImage: `url(${circle})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: .2,
                    zIndex: -1
                }
            }}
            justify='flex-end'
            innerWidth='lg'
            outerWidth={false}
            subtitle1={<SectionWrapper.Subtitle >
                We are generic frontenders who do generic things for generic people who do generic things. We are generic frontenders who do generic things for
            </SectionWrapper.Subtitle>
            }>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 8 }} >
                    <Typography variant='h2'>
                        Using Over <Typography color='warning.main' variant='h2'>75+</Typography> AI Home Designs Styles
                    </Typography>

                    <Box
                        sx={{
                            mt: 3,
                            position: "relative",
                            width: "100%",
                            height: 350, // Adjust height as needed
                            backgroundImage: `url(${variation1})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",

                            overflow: "hidden",
                        }}>

                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 16,
                                left: 16,
                                bgcolor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background for readability
                                color: "white",
                                p: 1,
                                borderRadius: 1,
                            }}
                        >
                            <Typography >
                                bohemian
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, lg: 4 }} display={'flex'} flexDirection={'column'}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: '100%', // Adjust height as needed
                            backgroundImage: `url(${variant2})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",

                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 16,
                                right: 16,
                                bgcolor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background for readability
                                color: "white",
                                p: 1,
                                borderRadius: 1,
                            }}
                        >
                            <Typography sx={{ writingMode: 'vertical-rl', transform: "rotate(180deg)" }}>
                                garden
                            </Typography>
                        </Box>
                    </Box>
                    <Typography fontWeight={800} fontSize={40} mt={3} mb={0} lineHeight={1}>
                        344 <Typography fontWeight={100} fontSize={20} mt={0}> designs created </Typography>
                    </Typography>
                </Grid>

                <Grid size={{ xs: 6 }} >
                    <Box
                        sx={{
                            position: "relative",
                            height: 350,
                            width: "100%",
                            backgroundImage: `url(${variant3})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            overflow: "hidden",
                        }}
                    >
                        {/* Bottom-left positioned text */}
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 16,
                                left: 16,
                                bgcolor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background for readability
                                color: "white",
                                p: 1,
                                borderRadius: 1,
                            }}
                        >
                            <Typography >
                                mediteranian
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 6 }} >
                    <Box
                        sx={{
                            position: "relative",
                            height: 350,
                            width: "100%",
                            backgroundImage: `url(${variant4})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",

                            overflow: "hidden",
                        }}
                    >
                        {/* Bottom-left positioned text */}
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 16,
                                left: 16,
                                bgcolor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background for readability
                                color: "white",
                                p: 1,
                                borderRadius: 1,
                            }}
                        >
                            <Typography >
                                scandinavian
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid mt={5} textAlign={'center'} size={{ xs: 12 }} >
                    <Button variant='outlined' >
                        Discover all Variations
                        <ShuffleIcon sx={{ ml: 1 }} color="warning" />
                    </Button>
                </Grid>
            </Grid>
        </SectionWrapper>
    );
};

export default DesignVariations;

