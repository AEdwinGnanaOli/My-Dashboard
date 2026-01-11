
// ==================== THEME PROVIDER COMPONENT ====================
// components/ThemeProvider.jsx

import React, { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectThemeDarkMode } from '../../store/slices/themeSlice';
import { createAppTheme } from '../../theme/theme';

export const AppThemeProvider = ({ children }) => {
    const darkMode = useSelector(selectThemeDarkMode);

    const theme = useMemo(
        () => createAppTheme(darkMode ? 'dark' : 'light'),
        [darkMode]
    );

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};