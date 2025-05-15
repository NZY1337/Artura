import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import History from '@mui/icons-material/History';
import Close from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import HistoryVariations from './History';

const DashboardDrawer = styled(Drawer)(({ theme }) => ({
    '.MuiPaper-root': {
        top: '65px'
    },
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


export default function HistoryDrawer() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerContent = (
        <Box sx={{ width: '20vw', height: '100%' }} onClick={toggleDrawer(false)} className='dashboard-history'>
            <Button sx={{ zIndex: 1 }} color="warning" className='close-drawer'><Close />Close</Button>
            <Box onClick={(e) => e.stopPropagation()}>
                <HistoryVariations />
            </Box>
        </Box>
    );

    return (
        <>
            <IconButton
                onClick={toggleDrawer(true)}
                sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '15px',
                    borderRadius: '5px',
                    p: .5,
                    '&:hover': {
                        borderRadius: '5px',
                        color: 'white',
                    }
                }}>
                <History sx={{ mr: .5 }} />
                <Typography>History</Typography>
            </IconButton>

            <DashboardDrawer sx={{ position: 'relative', width: '20vw' }} anchor='right' open={open} onClose={toggleDrawer(false)}>
                {DrawerContent}
            </DashboardDrawer>
        </>
    );
}
