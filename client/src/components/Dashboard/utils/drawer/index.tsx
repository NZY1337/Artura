import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import History from '@mui/icons-material/History';
import Close from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const DashboardDrawer = styled(Drawer)(({ theme }) => ({
    '.MuiList-root': {
        display: 'flex',
        flexDirection: 'column',
    },
    '.MuiBox-root': {
        position: 'relative',
        marginTop: '.5rem',

        '.MuiList-root': {
            marginTop: '1rem',
        },
    },
    '.MuiMenuItem-root': {
        minHeight: '48px',
        borderBottom: '1px solid rgba(255, 255, 255, .1)',
        webkitBackgroundClip: 'padding-box',
        backgroundClip: 'padding-box',
    },
    '.close-drawer': {
        color: theme.palette.warning.light,
        // backgroundColor: 'unset',
        position: 'absolute',
        top: 0,
        right: 0,
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

    const DrawerList = (
        <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
            <Button color="warning" className='close-drawer'><Close />Close</Button>
        </Box>
    );

    return (
        <>
            <IconButton
                sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '15px',
                    borderRadius: '5px',
                    p: .5,
                    '&:hover': {
                        // backgroundColor: 'unset',
                        borderRadius: '5px',
                        color: 'white',
                    }
                }}
                onClick={toggleDrawer(true)} className='dashboard-history-btn'>
                <History sx={{ mr: .5 }} />
                <Typography>History</Typography>
            </IconButton>

            <DashboardDrawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </DashboardDrawer>
        </>
    );
}
