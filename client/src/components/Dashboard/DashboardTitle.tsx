import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import DiamondIcon from "@mui/icons-material/Diamond";
import { keyframes } from "@emotion/react";

// hooks
import { useNavigate } from 'react-router-dom';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.6);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.9);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 5px rgba(0, 255, 0, 0.6);
  }
`;

function DashboardTitle() {
    const navigate = useNavigate();
    const handleClick = () => navigate('/');

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Typography fontWeight={600} color={'warning'} variant="body1" sx={{cursor: 'pointer'}} onClick={handleClick}>HOME</Typography>
            
            {/* <Tooltip title="credits left">
                <Chip sx={{ animation: `${pulseAnimation} 3.5s infinite ease-in-out` }} size="small" label={ 0} color="success" icon={<DiamondIcon />} />
            </Tooltip> */}
        </Stack>
    );
}

export default DashboardTitle;