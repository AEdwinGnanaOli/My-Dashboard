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