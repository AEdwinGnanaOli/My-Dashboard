// ==================== SIDEBAR THEME CONFIGURATION ====================
// theme/sidebarStyles.js

import { alpha } from '@mui/material';

/**
 * Get sidebar-specific theme overrides
 */
export const getSidebarStyles = (theme) => {
    const isDark = theme.palette.mode === 'dark';

    return {
        // Sidebar container styles
        sidebar: {
            backgroundColor: isDark
                ? alpha(theme.palette.background.paper, 0.6)
                : theme.palette.background.paper,
            borderRight: `1px solid ${alpha(theme.palette.divider, isDark ? 0.08 : 0.12)}`,
            backdropFilter: 'blur(10px)',
            boxShadow: isDark
                ? `2px 0 10px ${alpha('#000', 0.2)}`
                : `2px 0 10px ${alpha('#000', 0.05)}`,
        },

        // Navigation item styles
        navItem: {
            base: {
                borderRadius: '10px',
                margin: '2px 12px',
                padding: '10px 12px',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0,
                    height: '70%',
                    borderRadius: '0 4px 4px 0',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    transition: 'width 0.3s ease',
                },
            },
            hover: {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                transform: 'translateX(4px)',
                '&::before': {
                    width: '4px',
                },
            },
            active: {
                backgroundColor: isDark
                    ? alpha(theme.palette.primary.main, 0.15)
                    : alpha(theme.palette.primary.main, 0.12),
                color: theme.palette.primary.main,
                fontWeight: 600,
                boxShadow: isDark
                    ? `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`
                    : `0 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`,
                '&::before': {
                    width: '4px',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '10px',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    pointerEvents: 'none',
                },
            },
        },

        // Navigation icon styles
        navIcon: {
            color: theme.palette.text.secondary,
            transition: 'all 0.2s ease',
            active: {
                color: theme.palette.primary.main,
                filter: `drop-shadow(0 0 4px ${alpha(theme.palette.primary.main, 0.4)})`,
            },
        },

        // Navigation text styles
        navText: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: theme.palette.text.primary,
            active: {
                color: theme.palette.primary.main,
                fontWeight: 600,
            },
        },

        // Section header styles
        sectionHeader: {
            padding: '16px 20px 8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            color: theme.palette.text.secondary,
            opacity: 0.7,
        },

        // Divider styles
        divider: {
            margin: '12px 16px',
            borderColor: alpha(theme.palette.divider, isDark ? 0.08 : 0.12),
        },
    };
};
