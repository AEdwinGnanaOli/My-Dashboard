// ==================== COLOR PALETTE ====================
// theme/colors.js

/**
 * Centralized color palette for reusability
 */

export const colors = {
    // Primary colors
    primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#ffffff',
    },

    // Secondary colors
    secondary: {
        main: '#dc004e',
        light: '#ff5983',
        dark: '#9a0036',
        contrastText: '#ffffff',
    },

    // Success colors
    success: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
        contrastText: '#ffffff',
    },

    // Error colors
    error: {
        main: '#d32f2f',
        light: '#ef5350',
        dark: '#c62828',
        contrastText: '#ffffff',
    },

    // Warning colors
    warning: {
        main: '#ed6c02',
        light: '#ff9800',
        dark: '#e65100',
        contrastText: '#ffffff',
    },

    // Info colors
    info: {
        main: '#0288d1',
        light: '#03a9f4',
        dark: '#01579b',
        contrastText: '#ffffff',
    },

    // Grey scale
    grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
        A100: '#f5f5f5',
        A200: '#eeeeee',
        A400: '#bdbdbd',
        A700: '#616161',
    },

    // Common colors
    common: {
        black: '#000000',
        white: '#ffffff',
    },

    // Text colors
    text: {
        light: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
            disabled: 'rgba(0, 0, 0, 0.38)',
        },
        dark: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
        },
    },

    // Background colors
    background: {
        light: {
            default: '#fafafa',
            paper: '#ffffff',
        },
        dark: {
            default: '#121212',
            paper: '#1e1e1e',
        },
    },

    // Divider colors
    divider: {
        light: 'rgba(0, 0, 0, 0.12)',
        dark: 'rgba(255, 255, 255, 0.12)',
    },

    // Action colors
    action: {
        light: {
            active: 'rgba(0, 0, 0, 0.54)',
            hover: 'rgba(0, 0, 0, 0.04)',
            selected: 'rgba(0, 0, 0, 0.08)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
            focus: 'rgba(0, 0, 0, 0.12)',
        },
        dark: {
            active: '#ffffff',
            hover: 'rgba(255, 255, 255, 0.08)',
            selected: 'rgba(255, 255, 255, 0.16)',
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
            focus: 'rgba(255, 255, 255, 0.12)',
        },
    },

    // Custom application colors
    custom: {
        sidebar: {
            light: '#ffffff',
            dark: '#1a1a1a',
        },
        header: {
            light: '#ffffff',
            dark: '#1e1e1e',
        },
        hover: {
            light: 'rgba(0, 0, 0, 0.04)',
            dark: 'rgba(255, 255, 255, 0.08)',
        },
    },
};

