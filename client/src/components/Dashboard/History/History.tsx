import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import HistoryIcon from '@mui/icons-material/History';
import Close from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import HistoryProjects from './HistoryProjects';

const DashboardDrawer = styled(Drawer)(({ theme }) => ({
    '.MuiList-root': {
        display: 'flex',
        flexDirection: 'column',
    },
    '.MuiBox-root': {
        position: 'relative',
    },
    '.MuiMenuItem-root': {
        minHeight: '48px',
        borderBottom: '1px solid rgba(255, 255, 255, .1)',
        webkitBackgroundClip: 'padding-box',
        backgroundClip: 'padding-box',
    },
    '.close-drawer': {
        color: theme.palette.warning.light,
        left: '0px',
        '&:hover': {
            boxShadow: 'none',
            color: theme.palette.warning.dark,
            backgroundColor: 'unset',
        }
    },
    '.clerk-signin-button': {
        position: 'relative',
    },
    '.dashboard-history-btn': {
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
            borderRadius: '10%!important',
        }
    }
}));

export default function History() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerContent = (
        <Box sx={{
            width: {
                xs: '100%',
                sm: '60vw',
                md: '40vw',
                lg: '30vw',
                xl: '25vw',
            }, height: '100%', pt: "4.5rem"
        }} onClick={toggleDrawer(false)} className='dashboard-history'>
            <Button sx={{ zIndex: 1 }} color="warning" className='close-drawer'><Close />Close</Button>
            <Box onClick={(e) => e.stopPropagation()}>
                <HistoryProjects />
            </Box>
        </Box>
    );

    return (
        <>
            <IconButton
                onClick={toggleDrawer(true)}
                disableFocusRipple
                disableRipple
                disableTouchRipple
                sx={{
                    '&:hover': {
                        color: 'orange',
                    }
                }}>
                <HistoryIcon sx={{ mr: .5 }} />
                <Typography>History</Typography>
            </IconButton>

            <DashboardDrawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                {DrawerContent}
            </DashboardDrawer>
        </>
    );
}
