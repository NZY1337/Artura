import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// components
import DashboardTitle from './DashboardTitle';
import DashboardFooter from './DashboardFooter';
import dashboardTheme from './themeContext';
import { AppProvider, type Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import DesignGenerator from './Variations/DesignGenerator'; // Ensure the file exists at this path or adjust the path accordingly
import VirtualStaging from './Variations/VirtualStaging';
import Landscaping from './Variations/Landscaping';
import { Users } from './Users';
import Overview from './Overview';

// utils
import { DASHBOARD_NAVIGATION } from '../../helpers/constants';

// hooks
import { NotificationsProvider } from '@toolpad/core/useNotifications';

// types
import { type Router } from '@toolpad/core';

// clerk
import { useUser, useClerk, UserProfile, useAuth } from '@clerk/clerk-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useUser();
    const { signOut } = useClerk();
    const { getToken } = useAuth();

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

    const authentication = useMemo(() => ({
        signIn: () => { }, signOut
    }), [signOut]);

    useEffect(() => {
        async function callProtectedRoute() {
            const token = await getToken();
            console.log(token);  // copy this exact token to Postman
        }

        callProtectedRoute()
    }, [])

    const renderContent = () => {
        switch (router.pathname) {
            case '/dashboard':
                return <Overview />;

            case '/dashboard/design-generator':
                return <DesignGenerator />;

            case '/dashboard/virtual-staging':
                return <VirtualStaging />;

            case '/dashboard/landscaping':
                return <Landscaping />;

            case '/dashboard/profile':
                return <UserProfile />;

            case '/dashboard/users':
                return <Users />;

            default:
                return null;
        }
    };

    return (
        <AppProvider
            session={{ user: { name: user?.fullName, image: user?.imageUrl || 'https://avatars.githubusercontent.com/c', email: user?.emailAddresses[0].emailAddress, id: user?.id } as Session['user'] }}
            authentication={authentication}
            navigation={DASHBOARD_NAVIGATION}
            router={router}
            theme={dashboardTheme}>
            <NotificationsProvider slotProps={{ snackbar: { anchorOrigin: { vertical: 'bottom', horizontal: 'right' } } }}>
                <DashboardLayout
                    // sx={{
                    //     'nav.MuiBox-root': {
                    //         backgroundColor: '#e5e5f7',
                    //         backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, #212121 150px), repeating-linear-gradient(#212121, #000000)`
                    //     }
                    // }}
                    slots={{ sidebarFooter: DashboardFooter, appTitle: DashboardTitle }}>
                    <PageContainer sx={{ position: 'relative', px: 0, padding: 0 }}>
                        <ToastContainer position="bottom-right" />
                        {renderContent()}
                    </PageContainer>
                </DashboardLayout>
            </NotificationsProvider>
        </AppProvider >
    );
}
