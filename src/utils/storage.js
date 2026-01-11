/**
 * Simple storage utility functions
 */

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'token',
    USER_DATA: 'user',
    AUTH_STATE: 'auth_state',
};

/**
 * Set item in localStorage
 */
export const setStorage = (key, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
        return true;
    } catch (error) {
        console.error('Error setting storage:', error);
        return false;
    }
};

/**
 * Get item from localStorage
 */
export const getStorage = (key, defaultValue = null) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error getting storage:', error);
        return defaultValue;
    }
};

/**
 * Remove item from localStorage
 */
export const removeStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing storage:', error);
        return false;
    }
};

/**
 * Clear all localStorage
 */
export const clearStorage = () => {
    try {
        localStorage.clear();
        return true;
    } catch (error) {
        console.error('Error clearing storage:', error);
        return false;
    }
};

