import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import DiamondIcon from "@mui/icons-material/Diamond";
import { keyframes } from "@emotion/react";
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { getUserCredits } from '../../services/users';

import Skeleton from 'react-loading-skeleton';

// hooks
import { useNavigate } from 'react-router-dom';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

function DashboardTitle() {
    const navigate = useNavigate();
    const handleClick = () => navigate('/');
    const { user } = useUser();

    const { isPending, data } = useQuery({
        queryKey: ['users', user?.id],
        queryFn: () => {
            if (!user?.id) throw new Error("User ID is undefined");
            return getUserCredits(user?.id);
        },
        enabled: !!user?.id
    });

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Typography fontWeight={600} color={'warning'} variant="body1" sx={{ cursor: 'pointer' }} onClick={handleClick}>HOME</Typography>

            {isPending ? <Skeleton duration={1} height={25} width={80} borderRadius={50} /> : <Tooltip title="credits left">
                <Chip size="small" label={data?.ammount} icon={<DiamondIcon sx={{ animation: `${pulseAnimation} 3.5s infinite ease-in-out` }} />} />
            </Tooltip>}
        </Stack>
    );
}

export default DashboardTitle;