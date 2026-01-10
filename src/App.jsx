import * as React from 'react';
import { RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import { router } from './routes';
import { selectDarkMode } from './store/slices/themeSlice';
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

function AppContent() {
  const darkMode = useSelector(selectDarkMode);
  const theme = React.useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
