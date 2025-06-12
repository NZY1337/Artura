
// hooks
import { useMemo, } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk, } from '@clerk/clerk-react';

// components
import DashboardTitle from './DashboardTitle';
import DashboardFooter from './DashboardFooter';
import Playground from './Variations/Playground';
import Overview from './Overview';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Users } from './Users';
import { AppProvider } from '@toolpad/core/AppProvider';
import { UserProfile } from '@clerk/clerk-react';

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

export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useUser();
    const { signOut } = useClerk();
    // const { getToken } = useAuth();
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

            case '/dashboard/playground': // check more documentation about PageContainer via mui toolpad PageContainer to understand why I did this
                return <Playground />

            case '/dashboard/profile':
                return <UserProfile />;

            case '/dashboard/users':
                return <Users />;

            default:
                return null;
        }
    };

    // useEffect(() => {
    //     async function callProtectedRoute() {
    //         const token = await getToken();
    //         console.log(token);  // copy this exact token to Postman
    //     }

    //     callProtectedRoute()
    // }, [])

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
                        toolbarActions: () => <CustomThemeSwitcher setMode={setMode} mode={mode} />
                    }}>
                    <PageContainer
                        maxWidth={false}
                        title=''
                        breadcrumbs={[]}
                        className='dashboard-page-container'
                        sx={{
                            px: 0,
                            padding: 0,
                            position: 'relative',
                            ...(window.location.pathname === '/dashboard/playground' ? {
                                '& .MuiStack-root>.MuiBox-root': {
                                    height: '100vh',
                                    overflowY: 'auto',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: '1px',
                                    placeContent: 'start center',
                                    padding: '1px',
                                },
                            } : {}),
                        }}
                    >
                        {renderContent()}
                    </PageContainer>
                </DashboardLayout>
            </NotificationsProvider>
        </AppProvider >
    );
}
