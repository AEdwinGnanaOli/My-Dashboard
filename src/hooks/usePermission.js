// ==================== ROLES CONFIGURATION ====================
export const ROLES = {
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    LIBRARIAN: 'Librarian',
    STAFF: 'Staff',
    STUDENT: 'Student',
};

// ==================== PERMISSIONS CONFIGURATION ====================
export const PERMISSIONS = {
    // User Management
    VIEW_USERS: 'view_users',
    CREATE_USER: 'create_user',
    EDIT_USER: 'edit_user',
    DELETE_USER: 'delete_user',

    // Book Management
    VIEW_BOOKS: 'view_books',
    CREATE_BOOK: 'create_book',
    EDIT_BOOK: 'edit_book',
    DELETE_BOOK: 'delete_book',

    // Borrowing
    BORROW_BOOK: 'borrow_book',
    RETURN_BOOK: 'return_book',
    VIEW_BORROWING_HISTORY: 'view_borrowing_history',
    MANAGE_ALL_BORROWINGS: 'manage_all_borrowings',

    // Reports
    VIEW_REPORTS: 'view_reports',
    GENERATE_REPORTS: 'generate_reports',

    // Settings
    MANAGE_SETTINGS: 'manage_settings',
    MANAGE_ROLES: 'manage_roles',
};

// ==================== ROLE-PERMISSION MAPPING ====================
export const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: [
        PERMISSIONS.VIEW_USERS,
        PERMISSIONS.CREATE_USER,
        PERMISSIONS.EDIT_USER,
        PERMISSIONS.DELETE_USER,
        PERMISSIONS.VIEW_BOOKS,
        PERMISSIONS.CREATE_BOOK,
        PERMISSIONS.EDIT_BOOK,
        PERMISSIONS.DELETE_BOOK,
        PERMISSIONS.BORROW_BOOK,
        PERMISSIONS.RETURN_BOOK,
        PERMISSIONS.VIEW_BORROWING_HISTORY,
        PERMISSIONS.MANAGE_ALL_BORROWINGS,
        PERMISSIONS.VIEW_REPORTS,
        PERMISSIONS.GENERATE_REPORTS,
        PERMISSIONS.MANAGE_SETTINGS,
        PERMISSIONS.MANAGE_ROLES,
    ],
    [ROLES.MANAGER]: [
        PERMISSIONS.VIEW_USERS,
        PERMISSIONS.CREATE_USER,
        PERMISSIONS.EDIT_USER,
        PERMISSIONS.VIEW_BOOKS,
        PERMISSIONS.CREATE_BOOK,
        PERMISSIONS.EDIT_BOOK,
        PERMISSIONS.VIEW_BORROWING_HISTORY,
        PERMISSIONS.MANAGE_ALL_BORROWINGS,
        PERMISSIONS.VIEW_REPORTS,
        PERMISSIONS.GENERATE_REPORTS,
    ],
    [ROLES.LIBRARIAN]: [
        PERMISSIONS.VIEW_USERS,
        PERMISSIONS.VIEW_BOOKS,
        PERMISSIONS.CREATE_BOOK,
        PERMISSIONS.EDIT_BOOK,
        PERMISSIONS.BORROW_BOOK,
        PERMISSIONS.RETURN_BOOK,
        PERMISSIONS.VIEW_BORROWING_HISTORY,
        PERMISSIONS.MANAGE_ALL_BORROWINGS,
    ],
    [ROLES.STAFF]: [
        PERMISSIONS.VIEW_BOOKS,
        PERMISSIONS.BORROW_BOOK,
        PERMISSIONS.RETURN_BOOK,
        PERMISSIONS.VIEW_BORROWING_HISTORY,
    ],
    [ROLES.STUDENT]: [
        PERMISSIONS.VIEW_BOOKS,
        PERMISSIONS.BORROW_BOOK,
        PERMISSIONS.VIEW_BORROWING_HISTORY,
    ],
};

// ==================== CONTEXT ====================
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading user from localStorage or API
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

// ==================== PERMISSION HOOKS ====================

// Main hook - Returns object with all permissions and role checks
export const usePermissions = () => {
    const { user } = useAuth();

    const userPermissions = user?.role ? ROLE_PERMISSIONS[user.role] || [] : [];
    const userRole = user?.role || null;

    // Helper function to check single permission
    const hasPermission = (permission) => {
        return userPermissions.includes(permission);
    };

    // Helper function to check multiple permissions (any)
    const hasAnyPermission = (permissions) => {
        return permissions.some(permission => userPermissions.includes(permission));
    };

    // Helper function to check multiple permissions (all)
    const hasAllPermissions = (permissions) => {
        return permissions.every(permission => userPermissions.includes(permission));
    };

    return {
        // Role checks
        isAdmin: userRole === ROLES.ADMIN,
        isManager: userRole === ROLES.MANAGER,
        isLibrarian: userRole === ROLES.LIBRARIAN,
        isStaff: userRole === ROLES.STAFF,
        isStudent: userRole === ROLES.STUDENT,
        role: userRole,

        // Permission checks - User Management
        canViewUsers: hasPermission(PERMISSIONS.VIEW_USERS),
        canCreateUser: hasPermission(PERMISSIONS.CREATE_USER),
        canEditUser: hasPermission(PERMISSIONS.EDIT_USER),
        canDeleteUser: hasPermission(PERMISSIONS.DELETE_USER),

        // Permission checks - Book Management
        canViewBooks: hasPermission(PERMISSIONS.VIEW_BOOKS),
        canCreateBook: hasPermission(PERMISSIONS.CREATE_BOOK),
        canEditBook: hasPermission(PERMISSIONS.EDIT_BOOK),
        canDeleteBook: hasPermission(PERMISSIONS.DELETE_BOOK),

        // Permission checks - Borrowing
        canBorrowBook: hasPermission(PERMISSIONS.BORROW_BOOK),
        canReturnBook: hasPermission(PERMISSIONS.RETURN_BOOK),
        canViewBorrowingHistory: hasPermission(PERMISSIONS.VIEW_BORROWING_HISTORY),
        canManageAllBorrowings: hasPermission(PERMISSIONS.MANAGE_ALL_BORROWINGS),

        // Permission checks - Reports
        canViewReports: hasPermission(PERMISSIONS.VIEW_REPORTS),
        canGenerateReports: hasPermission(PERMISSIONS.GENERATE_REPORTS),

        // Permission checks - Settings
        canManageSettings: hasPermission(PERMISSIONS.MANAGE_SETTINGS),
        canManageRoles: hasPermission(PERMISSIONS.MANAGE_ROLES),

        // Helper functions
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        permissions: userPermissions,
    };
};

// Individual hooks (kept for backward compatibility and specific use cases)

// Check if user has specific permission
export const usePermission = (permission) => {
    const { user } = useAuth();

    if (!user || !user.role) return false;

    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
};

// Check if user has any of the specified permissions
export const useAnyPermission = (permissions) => {
    const { user } = useAuth();

    if (!user || !user.role) return false;

    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.some(permission => userPermissions.includes(permission));
};

// Check if user has all specified permissions
export const useAllPermissions = (permissions) => {
    const { user } = useAuth();

    if (!user || !user.role) return false;

    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return permissions.every(permission => userPermissions.includes(permission));
};

// Get all permissions for current user
export const useUserPermissions = () => {
    const { user } = useAuth();

    if (!user || !user.role) return [];

    return ROLE_PERMISSIONS[user.role] || [];
};

// Check if user has specific role
export const useRole = (role) => {
    const { user } = useAuth();
    return user?.role === role;
};

// Check if user has any of the specified roles
export const useAnyRole = (roles) => {
    const { user } = useAuth();
    return roles.includes(user?.role);
};

// ==================== PERMISSION COMPONENTS ====================

// Component to conditionally render based on permission
export const Can = ({ permission, permissions, requireAll = false, fallback = null, children }) => {
    const { user } = useAuth();

    if (!user || !user.role) return fallback;

    const userPermissions = ROLE_PERMISSIONS[user.role] || [];

    let hasPermission = false;

    if (permission) {
        hasPermission = userPermissions.includes(permission);
    } else if (permissions) {
        hasPermission = requireAll
            ? permissions.every(p => userPermissions.includes(p))
            : permissions.some(p => userPermissions.includes(p));
    }

    return hasPermission ? children : fallback;
};

// Component to conditionally render based on role
export const HasRole = ({ role, roles, fallback = null, children }) => {
    const { user } = useAuth();

    if (!user || !user.role) return fallback;

    const hasRole = role
        ? user.role === role
        : roles?.includes(user.role);

    return hasRole ? children : fallback;
};

// ==================== UTILITY FUNCTIONS ====================

// Check permission (for use outside React components)
export const checkPermission = (userRole, permission) => {
    const permissions = ROLE_PERMISSIONS[userRole] || [];
    return permissions.includes(permission);
};

// Check role (for use outside React components)
export const checkRole = (userRole, roleToCheck) => {
    return userRole === roleToCheck;
};

// Get all permissions for a role
export const getRolePermissions = (role) => {
    return ROLE_PERMISSIONS[role] || [];
};
