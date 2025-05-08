import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import DashboardTitle from './DashboardTitle';
import DashboardFooter from './DashboardFooter';
import dashboardTheme from './themeContext';
import { AppProvider, type Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

// utils
import ProfileDashboard from './components/User/DashboardProfile';
import { DASHBOARD_NAVIGATION } from '../../helpers/constants';

// hooks
import { NotificationsProvider } from '@toolpad/core/useNotifications';

// types
import { type Router } from '@toolpad/core';

// clerk
import { useUser, useClerk, UserProfile } from '@clerk/clerk-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const { user } = useUser();
    const { signOut } = useClerk()
    
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
        signIn: () => {}, signOut 
    }),[navigate]);

    const renderContent = () => {
        switch (router.pathname) {
            case '/dashboard':
                return <ProfileDashboard />;

            case '/dashboard/profile':
                return <UserProfile  />;
    
            default:
                return null;
        }
    };

    return (
        <AppProvider
            session={{user: { name: user?.fullName, image: user?.imageUrl || 'https://avatars.githubusercontent.com/c', email: user?.emailAddresses[0].emailAddress, id: user?.id } as Session['user']}}
            authentication={authentication}
            navigation={DASHBOARD_NAVIGATION}
            router={router}
            theme={dashboardTheme}>
            <NotificationsProvider slotProps={{ snackbar: { anchorOrigin: { vertical: 'bottom', horizontal: 'right' }}}}>
                <DashboardLayout 
                    slots={{ sidebarFooter: DashboardFooter, appTitle: DashboardTitle }}
                    // sx={{'.css-1xraqll-MuiList-root li:not(:first-of-type)': preview ? { display: 'none' } : { color: 'gray', pointerEvents: 'none', display: 'none' }}}
                    >
                    <PageContainer>
                        {renderContent()}
                    </PageContainer>
                </DashboardLayout>
            </NotificationsProvider>
        </AppProvider>
    );
}
