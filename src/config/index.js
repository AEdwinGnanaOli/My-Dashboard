import { createTheme } from '@mui/material/styles';

/**
 * Branding Configuration
 */
export const BRANDING_CONFIG = {
    title: 'My Dashboard',
    subtitle: 'Analytics Pro',
    logo: '', // URL or leave empty to use icon
    homeUrl: '/',
    version: '1.0.0',
    companyName: 'Acme Corp',
    copyrightYear: new Date().getFullYear(),
};

/**
 * Authentication / Account Configuration
 */
export const ACCOUNT_CONFIG = {
    mockUser: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        image: '', // Leave empty for initial avatar
        role: 'Admin',
    },
};

/**
 * Navigation Configuration
 * icons are string names that map to icons in iconMapper.jsx
 */
export const NAVIGATION_CONFIG = [
    {
        kind: 'header',
        title: 'Main',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: 'Dashboard',
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: 'ShoppingCart',
    },
    {
        segment: 'users',
        title: 'Users',
        icon: 'People',
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: 'BarChart',
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: 'AttachMoney',
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: 'Analytics',
            },
        ],
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'System',
    },
    {
        segment: 'settings',
        title: 'Settings',
        icon: 'Settings',
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: 'Layers',
    },
];

/**
 * Sidebar Configuration
 */
export const SIDEBAR_CONFIG = {
    defaultCollapsed: false,
    expandedWidth: 280,
    footer: {
        enabled: true,
        storage: {
            enabled: true,
            label: 'Storage',
            used: 34.2,
            total: 100,
        },
        showVersion: true,
        showCompany: true,
    },
};

/**
 * Toolbar Configuration
 */
export const TOOLBAR_CONFIG = {
    search: {
        enabled: true,
        placeholder: 'Search...',
        expandable: true,
    },
    notifications: {
        enabled: true,
        items: [
            {
                id: 1,
                title: 'New Order Received',
                message: 'Order #1234 has been placed',
                time: '5 min ago',
                type: 'success',
                read: false,
            },
            {
                id: 2,
                title: 'Server Warning',
                message: 'High CPU usage detected',
                time: '1 hour ago',
                type: 'warning',
                read: false,
            },
            {
                id: 3,
                title: 'Update Available',
                message: 'A new version is available',
                time: '2 hours ago',
                type: 'info',
                read: true,
            },
        ],
    },
    messages: {
        enabled: true,
        badgeCount: 3,
    },
    themeToggle: {
        enabled: true,
    },
    help: {
        enabled: true,
        url: '/help',
    },
    settings: {
        enabled: true,
        url: '/settings',
    },
};

/**
 * Theme Configuration
 */
export const THEME_CONFIG = {
    defaultMode: 'light',
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 800 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { fontWeight: 600 },
    },
    borderRadius: 12, // Modern rounded corners
    light: {
        primary: {
            main: '#2196f3', // Blue
            light: '#6ec6ff',
            dark: '#0069c0',
        },
        secondary: {
            main: '#9c27b0', // Purple
            light: '#d05ce3',
            dark: '#6a0080',
        },
        background: {
            default: '#f3f6f9',
            paper: '#ffffff',
        },
    },
    dark: {
        primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5',
        },
        secondary: {
            main: '#ce93d8',
            light: '#f3e5f5',
            dark: '#ab47bc',
        },
        background: {
            default: '#0b0f19', // Deep dark blue/black
            paper: '#111827',
        },
    },
};
