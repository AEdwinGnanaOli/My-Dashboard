import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DashboardLayout as ToolpadDashboardLayout } from '@toolpad/core/DashboardLayout';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Box, useTheme } from '@mui/material';

// Custom slot components
import CustomAppTitle from './components/CustomAppTitle.jsx';
import CustomToolbarActions from './components/CustomToolbarActions.jsx';
import CustomAccount from './components/CustomAccount';
import SidebarFooter from './components/SidebarFooter.jsx';
import { useSession } from '../context/SessionContext';

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
function ToolbarActionsWrapper({ darkMode, onToggleDarkMode }) {
  const { session, signIn, signOut } = useSession();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CustomToolbarActions darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      <CustomAccount session={session} onSignIn={signIn} onSignOut={signOut} />
    </Box>
  );
}

/**
 * DashboardLayout - Main layout component using Toolpad Core
 * Uses custom slots for appTitle, toolbarActions, and sidebarFooter
 */
function DashboardLayout({ darkMode, onToggleDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useSession();
  const theme = useTheme();

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
    () => <ToolbarActionsWrapper darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />,
    [darkMode, onToggleDarkMode]
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
