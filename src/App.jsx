import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Integrations from './pages/Integrations';
import { SessionProvider } from './context/SessionContext';
import { THEME_CONFIG } from './config';

/**
 * Create theme from config
 * @param {string} mode - 'light' or 'dark'
 * @returns {Theme} MUI theme object
 */
function createThemeFromConfig(mode) {
  const colors = mode === 'dark' ? THEME_CONFIG.dark : THEME_CONFIG.light;

  return createTheme({
    palette: {
      mode,
      ...colors,
    },
    typography: THEME_CONFIG.typography,
    shape: {
      borderRadius: THEME_CONFIG.borderRadius,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  });
}

// Create themes from config
const lightTheme = createThemeFromConfig('light');
const darkTheme = createThemeFromConfig('dark');

function App() {
  // Dark mode state - persisted to localStorage, default from config
  const [darkMode, setDarkMode] = React.useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return THEME_CONFIG.defaultMode === 'dark';
  });

  // Toggle dark mode handler
  const handleToggleDarkMode = React.useCallback(() => {
    setDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <DashboardLayout
                  darkMode={darkMode}
                  onToggleDarkMode={handleToggleDarkMode}
                />
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="users" element={<Users />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/sales" element={<Reports />} />
              <Route path="reports/traffic" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="integrations" element={<Integrations />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;
