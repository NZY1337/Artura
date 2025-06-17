
// hooks
import { useMemo, useRef, useEffect } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk, useAuth } from '@clerk/clerk-react';

// components
import DashboardTitle from './DashboardTitle';
import DashboardFooter from './DashboardFooter';
import Playground from './Playground';
import Profile from './Profile';
import Overview from './Overview';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Users } from './Users';
import { AppProvider } from '@toolpad/core/AppProvider';

// Providers
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import CustomThemeSwitcher from './CustomThemeSwitcher';

// utils
import { DASHBOARD_NAVIGATION } from '../../helpers/constants';
import { createTheme } from '@mui/material/styles';
import { typography, components, colorSchemes, palette } from './context/themeContext';

// types
import { type Router } from '@toolpad/core';
import { type Session } from '@toolpad/core/AppProvider';

// constants
import { DASHBOARD_NAV_BACKGROUND } from '../../helpers/constants';
import HistoryDrawer from "./History/History";

export default function Dashboard() {
    const navigate = useNavigate();
    const divRef = useRef<HTMLDivElement>(null);
    const { user } = useUser();
    const { signOut } = useClerk();
    const { getToken } = useAuth();
    const { setMode, mode } = useColorScheme() as {
        setMode: (mode: 'light' | 'dark') => void;
        mode: 'light' | 'dark';
    };

    const dashboardSession = {
        user: {
            name: user?.fullName,
            image: user?.imageUrl || 'https://avatars.githubusercontent.com/c',
            email: user?.emailAddresses[0].emailAddress, id: user?.id
        } as Session['user']
    }

    const router: Router = useMemo(() => ({
        navigate: (path: string | URL) => {
            const newPath = path.toString();
            if (window.location.pathname !== newPath) { // ✅ Prevents re-navigation if already on the same page
                navigate(newPath);
            }
        },
        pathname: window.location.pathname,
        searchParams: new URLSearchParams(window.location.search),
    }), [navigate]);

    const memoizedTheme = useMemo(() =>
        createTheme({
            colorSchemes,
            typography,
            components,
            palette: { ...palette }
        }), [mode]);

    const authentication = useMemo(() => ({
        signIn: () => { }, signOut
    }), [signOut]);

    const renderContent = () => {
        switch (router.pathname) {
            case '/dashboard':
                return <Overview />;

            case '/dashboard/playground':
                return <Playground />

            case '/dashboard/profile':
                return <Profile />;

            case '/dashboard/users':
                return <Users />;

            default:
                return null;
        }
    };

    useEffect(() => {
        async function callProtectedRoute() {
            const token = await getToken();
            console.log(token);  // copy this exact token to Postman
        }

        callProtectedRoute()

        const parent = divRef.current?.parentElement;
        if (parent) {
            parent.classList.add('no-overflow');
        }
    }, [])


    return (
        <AppProvider
            session={dashboardSession}
            authentication={authentication}
            navigation={DASHBOARD_NAVIGATION}
            router={router}
            theme={memoizedTheme}>
            <NotificationsProvider slotProps={{ snackbar: { anchorOrigin: { vertical: 'bottom', horizontal: 'right' } } }}>
                <DashboardLayout
                    sx={{
                        'nav.MuiBox-root': {
                            ...DASHBOARD_NAV_BACKGROUND.setBackgroundNav(mode)
                        }
                    }}
                    slots={{
                        sidebarFooter: DashboardFooter,
                        appTitle: DashboardTitle,
                        toolbarActions: () => {
                            return <>
                                <HistoryDrawer />
                                <CustomThemeSwitcher setMode={setMode} mode={mode} />
                            </>
                        }
                    }}>
                    <PageContainer
                        ref={divRef}
                        maxWidth={false}
                        title=''
                        breadcrumbs={[]}
                        className='dashboard-page-container'>
                        {renderContent()}
                    </PageContainer>
                </DashboardLayout>
            </NotificationsProvider>
        </AppProvider >
    );
}
