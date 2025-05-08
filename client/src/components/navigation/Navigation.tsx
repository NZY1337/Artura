import React from 'react';
import  AppBar from '@mui/material/AppBar';
import  Toolbar from '@mui/material/Toolbar';
import  Typography from '@mui/material/Typography';
import  Box from '@mui/material/Box';
import  Container from '@mui/material/Container';
import MenuDrawer from './drawer';
import RenderLinks from './RenderLinks';
import { styled } from '@mui/material/styles';
// import Logo from '../Logo/Logo';

const AppBarContainer = styled(AppBar)(({ theme }) => ({
    '.MuiToolbar-root': {
        display: 'flex', 
        justifyContent: 'space-between',
    },

    [theme.breakpoints.down('md')]: {
      '.MuiContainer-root': {
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row-reverse',
    },
    },
}));

const Navigation: React.FC = () => {
    return (
        <AppBarContainer>
            <Container>
                <MenuDrawer />
                <Toolbar sx={{ height: '80px', mt: 2, borderRadius: 2 }}>
                    {/* <Logo />  */}
                    <Typography variant={"h4"}>Artura</Typography>

                    <Box sx={{ display: { xs: "none", md: "flex" }}}>
                        <RenderLinks />
                        
                    </Box>
                </Toolbar>
            </Container>
        </AppBarContainer>
    );
};

export default Navigation;





