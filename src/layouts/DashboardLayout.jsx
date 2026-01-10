import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DashboardLayout as ToolpadDashboardLayout } from '@toolpad/core/DashboardLayout';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Box, useTheme } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode, toggleTheme } from '../store/slices/themeSlice';
import { selectCurrentUser, selectIsAuthenticated, logout, setCredentials } from '../store/slices/authSlice';

// Custom slot components
import CustomAppTitle from './components/CustomAppTitle.jsx';
import CustomToolbarActions from './components/CustomToolbarActions.jsx';
import CustomAccount from './components/CustomAccount';
import SidebarFooter from './components/SidebarFooter.jsx';
// SessionContext import removed usage

// Config imports
import { NAVIGATION_CONFIG, BRANDING_CONFIG, SIDEBAR_CONFIG } from '../config';
import { mapNavigationIcons } from '../utils/iconMapper.jsx';

// Convert navigation config icons to React elements
const NAVIGATION = mapNavigationIcons(NAVIGATION_CONFIG);

// Branding configuration from config file
const BRANDING = {
  title: BRANDING_CONFIG.title,
  logo: BRANDING_CONFIG.logo,
  homeUrl: BRANDING_CONFIG.homeUrl,
};

/**
 * ToolbarActionsWrapper - Wraps ToolbarActions with Account component
 */

function ToolbarActionsWrapper() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const handleToggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  const handleSignIn = () => {
      // For now, mock sign-in just to verify flow, typically handled by Login page
      // dispatch(setCredentials({ user: { name: 'Test User', email: 'test@example.com', role: 'admin' }, token: 'mock-token' }));
      // But actually, CustomAuth might trigger a redirect or modal.
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

/**
 * DashboardLayout - Main layout component using Toolpad Core
 * Uses custom slots for appTitle, toolbarActions, and sidebarFooter
 */

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Redux state
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const session = isAuthenticated ? { user } : null;

  // Create router object for AppProvider
  const router = React.useMemo(
    () => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path) => navigate(path),
    }),
    [location, navigate]
  );

  // Memoized toolbar actions component
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
