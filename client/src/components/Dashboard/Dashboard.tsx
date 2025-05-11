import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import DashboardTitle from './DashboardTitle';
import DashboardFooter from './DashboardFooter';
import dashboardTheme from './themeContext';
import { AppProvider, type Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import DesignGenerator from './variations/DesignGenerator';
import VirtualStaging from './variations/VirtualStaging';
import Landscaping from './variations/Landscaping';
import Overview from './Overview';

// utils
import { DASHBOARD_NAVIGATION } from '../../helpers/constants';

// hooks
import { NotificationsProvider } from '@toolpad/core/useNotifications';

// types
import { type Router } from '@toolpad/core';

// clerk
import { useUser, useClerk, UserProfile } from '@clerk/clerk-react';
import DesignGeneratorBackground from '../DesignBackgroundGenerator';

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
        signIn: () => { }, signOut
    }), [signOut]);

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
            theme={dashboardTheme}
        >
            <NotificationsProvider slotProps={{ snackbar: { anchorOrigin: { vertical: 'bottom', horizontal: 'right' } } }}>
                <DashboardLayout
                    slots={{ sidebarFooter: DashboardFooter, appTitle: DashboardTitle }}>
                    <DesignGeneratorBackground>
                        <PageContainer>
                            {renderContent()}
                        </PageContainer>
                    </DesignGeneratorBackground>

                </DashboardLayout>
            </NotificationsProvider>
        </AppProvider>
    );
}
