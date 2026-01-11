
// ==================== UPDATED DASHBOARD LAYOUT ====================
// layouts/DashboardLayout.jsx

import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DashboardLayout as ToolpadDashboardLayout } from '@toolpad/core/DashboardLayout';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Box, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { selectThemeDarkMode, toggleTheme } from '../store/slices/themeSlice';
import { selectAuthUser, selectAuthIsAuthenticated, logout } from '../store/slices/authSlice';

// Custom components
import CustomAppTitle from './components/CustomAppTitle.jsx';
import CustomToolbarActions from './components/CustomToolbarActions.jsx';
import CustomAccount from './components/CustomAccount';
import SidebarFooter from './components/SidebarFooter.jsx';

// Config
import { NAVIGATION_CONFIG, BRANDING_CONFIG, SIDEBAR_CONFIG } from '../config';
import { mapNavigationIcons } from '../utils/iconMapper.jsx';

const NAVIGATION = mapNavigationIcons(NAVIGATION_CONFIG);
const BRANDING = {
    title: BRANDING_CONFIG.title,
    logo: BRANDING_CONFIG.logo,
    homeUrl: BRANDING_CONFIG.homeUrl,
};

function ToolbarActionsWrapper() {
    const dispatch = useDispatch();
    const darkMode = useSelector(selectThemeDarkMode);
    const user = useSelector(selectAuthUser);
    const isAuthenticated = useSelector(selectAuthIsAuthenticated);

    const handleToggleDarkMode = () => {
        dispatch(toggleTheme());
    };

    const handleSignIn = () => {
        console.log("Sign in clicked");
    };

    const handleSignOut = () => {
        dispatch(logout());
    };

    const session = isAuthenticated ? { user } : null;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CustomToolbarActions darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
            <CustomAccount session={session} onSignIn={handleSignIn} onSignOut={handleSignOut} />
        </Box>
    );
}

function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    const user = useSelector(selectAuthUser);
    const isAuthenticated = useSelector(selectAuthIsAuthenticated);
    const session = isAuthenticated ? { user } : null;

    const router = React.useMemo(
        () => ({
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
            navigate: (path) => navigate(path),
        }),
        [location, navigate]
    );

    const MemoizedToolbarActions = React.useCallback(
        () => <ToolbarActionsWrapper />,
        []
    );

    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={BRANDING}
            router={router}
            session={session}
            theme={theme}
        >
            <ToolpadDashboardLayout
                slots={{
                    appTitle: CustomAppTitle,
                    toolbarActions: MemoizedToolbarActions,
                    sidebarFooter: SidebarFooter,
                }}
                defaultSidebarCollapsed={SIDEBAR_CONFIG.defaultCollapsed}
                sidebarExpandedWidth={SIDEBAR_CONFIG.expandedWidth}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto',
                        backgroundColor: 'background.default',
                    }}
                >
                    <Outlet />
                </Box>
            </ToolpadDashboardLayout>
        </AppProvider>
    );
}

export default DashboardLayout;