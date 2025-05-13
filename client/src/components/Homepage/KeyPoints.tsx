import SectionWrapper from '../UtilityComponents/SectionWrapper';
import {
    Grid,
    Typography,
    Stack,
    Button
} from "@mui/material";

import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import interior from '../../assets/interior-designers.svg';
import realEstate from '../../assets/realestate.png';
import DomainAddSharpIcon from '@mui/icons-material/DomainAddSharp';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const KeyPoints = () => {
    return (
        <SectionWrapper
            sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
                '&::after': {
                    content: '""',
                    display: 'block',
                    width: '80%',
                    height: '80%',
                    backgroundImage: `url(${realEstate})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: .2,
                    textAlign: 'center',
                    zIndex: -1
                }
            }}
            justify='center'
            innerWidth='lg'
            outerWidth={false}
            title={<SectionWrapper.Title variant="h2">
                Easy and Fast A.I. Technology
            </SectionWrapper.Title>
            }>
            <Grid container gap={10} justifyContent={"center"} mt={10}>
                <Grid size={{ xs: 2 }}>
                    <Stack alignItems={"center"} textAlign={"center"} spacing={1}>
                        <Typography variant="subtitle1" color='grey.400'>
                            Family & Friends, Gardners
                        </Typography>
                        <FilterVintageIcon fontSize='large' sx={{ color: '#00FF00' }} />
                    </Stack>
                </Grid>

                <Grid size={{ xs: 1.5 }}>
                    <Stack alignItems={"center"} textAlign={"center"} spacing={1}>
                        <Typography variant="subtitle1" color='grey.400'>
                            Interior Designers
                        </Typography>

                        <img src={interior} style={{ width: '40px', height: 'auto' }} />
                    </Stack>
                </Grid>

                <Grid size={{ xs: 2 }} textAlign={"center"}>
                    <Stack alignItems={"center"} spacing={1}>
                        <Typography variant="subtitle1" color='grey.400'>
                            Architects, Home & Builders
                        </Typography>
                        <EngineeringIcon fontSize='large' sx={{ color: '#00FF00' }} />
                    </Stack>
                </Grid>

                <Grid size={{ xs: 1.5 }} textAlign={"center"}>
                    <Stack alignItems={"center"} spacing={1}>
                        <Typography variant="subtitle1" color='grey.400'>
                            Real Estate Agencies
                        </Typography>
                        <DomainAddSharpIcon fontSize='large' sx={{ color: '#00FF00' }} />
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12 }} textAlign={"center"}>
                    <Button variant='contained' >
                        Get Instant Access
                        <ElectricBoltIcon sx={{ ml: 1 }} color="warning" />
                    </Button>
                </Grid>
            </Grid>
        </SectionWrapper>
    );
};

export default KeyPoints;

