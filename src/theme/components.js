// ==================== COMPONENT OVERRIDES ====================
// theme/components.js

import { colors } from './colors';

export const getComponentOverrides = (mode) => ({
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: 'none',
                },
            },
            contained: {
                '&:hover': {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                },
            },
            outlined: {
                borderWidth: 1.5,
                '&:hover': {
                    borderWidth: 1.5,
                },
            },
        },
        defaultProps: {
            disableElevation: true,
        },
    },

    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                boxShadow: mode === 'light'
                    ? '0 2px 8px rgba(0,0,0,0.08)'
                    : '0 2px 8px rgba(0,0,0,0.3)',
            },
        },
    },

    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 8,
            },
            elevation1: {
                boxShadow: mode === 'light'
                    ? '0 1px 3px rgba(0,0,0,0.12)'
                    : '0 1px 3px rgba(0,0,0,0.4)',
            },
            elevation2: {
                boxShadow: mode === 'light'
                    ? '0 2px 8px rgba(0,0,0,0.08)'
                    : '0 2px 8px rgba(0,0,0,0.3)',
            },
        },
    },

    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                },
            },
        },
        defaultProps: {
            variant: 'outlined',
        },
    },

    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: mode === 'light' ? colors.grey[400] : colors.grey[600],
                },
            },
        },
    },

    MuiInputLabel: {
        defaultProps: {
            shrink: true,
        },
    },

    MuiChip: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                fontWeight: 500,
            },
        },
    },

    MuiDialog: {
        styleOverrides: {
            paper: {
                borderRadius: 12,
            },
        },
    },

    MuiTableCell: {
        styleOverrides: {
            root: {
                borderBottom: `1px solid ${mode === 'light' ? colors.grey[200] : colors.grey[800]}`,
            },
            head: {
                fontWeight: 600,
                backgroundColor: mode === 'light' ? colors.grey[50] : colors.grey[900],
            },
        },
    },

    MuiTableRow: {
        styleOverrides: {
            root: {
                '&:hover': {
                    backgroundColor: mode === 'light'
                        ? colors.custom.hover.light
                        : colors.custom.hover.dark,
                },
            },
        },
    },

    MuiIconButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
            },
        },
    },

    MuiTooltip: {
        styleOverrides: {
            tooltip: {
                borderRadius: 6,
                fontSize: '0.75rem',
            },
        },
    },

    MuiAlert: {
        styleOverrides: {
            root: {
                borderRadius: 8,
            },
        },
    },

    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: 'none',
                borderBottom: `1px solid ${mode === 'light' ? colors.grey[200] : colors.grey[800]}`,
            },
        },
    },

    MuiDrawer: {
        styleOverrides: {
            paper: {
                borderRight: `1px solid ${mode === 'light' ? colors.grey[200] : colors.grey[800]}`,
            },
        },
    },

    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                margin: '2px 8px',
                '&.Mui-selected': {
                    backgroundColor: mode === 'light'
                        ? 'rgba(25, 118, 210, 0.08)'
                        : 'rgba(144, 202, 249, 0.16)',
                    '&:hover': {
                        backgroundColor: mode === 'light'
                            ? 'rgba(25, 118, 210, 0.12)'
                            : 'rgba(144, 202, 249, 0.24)',
                    },
                },
            },
        },
    },
});
