import { createTheme } from '@mui/material/styles';
import { colors } from './colors';
import { typography } from './typography';
import { getComponentOverrides } from './components';

export { colors };



// ==================== THEME CREATOR ====================
// theme/theme.js

/**
 * Create dynamic theme based on mode
 */
export const createAppTheme = (mode = 'light') => {
    const isDark = mode === 'dark';

    return createTheme({
        palette: {
            mode,
            primary: colors.primary,
            secondary: colors.secondary,
            success: colors.success,
            error: colors.error,
            warning: colors.warning,
            info: colors.info,
            grey: colors.grey,
            common: colors.common,
            text: isDark ? colors.text.dark : colors.text.light,
            background: isDark ? colors.background.dark : colors.background.light,
            divider: isDark ? colors.divider.dark : colors.divider.light,
            action: isDark ? colors.action.dark : colors.action.light,
        },

        typography,

        shape: {
            borderRadius: 8,
        },

        shadows: [
            'none',
            isDark ? '0 1px 3px rgba(0,0,0,0.4)' : '0 1px 3px rgba(0,0,0,0.12)',
            isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
            isDark ? '0 4px 12px rgba(0,0,0,0.25)' : '0 4px 12px rgba(0,0,0,0.06)',
            isDark ? '0 8px 16px rgba(0,0,0,0.2)' : '0 8px 16px rgba(0,0,0,0.05)',
            isDark ? '0 12px 24px rgba(0,0,0,0.18)' : '0 12px 24px rgba(0,0,0,0.04)',
            isDark ? '0 16px 32px rgba(0,0,0,0.16)' : '0 16px 32px rgba(0,0,0,0.03)',
            isDark ? '0 20px 40px rgba(0,0,0,0.14)' : '0 20px 40px rgba(0,0,0,0.02)',
            isDark ? '0 24px 48px rgba(0,0,0,0.12)' : '0 24px 48px rgba(0,0,0,0.02)',
            ...Array(16).fill('none'),
        ],

        components: getComponentOverrides(mode),

        // Custom theme extensions
        custom: {
            sidebar: isDark ? colors.custom.sidebar.dark : colors.custom.sidebar.light,
            header: isDark ? colors.custom.header.dark : colors.custom.header.light,
            hover: isDark ? colors.custom.hover.dark : colors.custom.hover.light,
        },
    });
};


