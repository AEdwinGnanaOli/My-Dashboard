// ==================== SIMPLE useStorage HOOK ====================
// hooks/useStorage.js

import { useState, useEffect, useCallback } from 'react';
import { setStorage, getStorage, removeStorage } from '../utils/storage';

/**
 * Simple storage hook for managing localStorage
 * 
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 */
export const useStorage = (key, defaultValue = null) => {
    // Initialize state from localStorage
    const [value, setValue] = useState(() => {
        return getStorage(key, defaultValue);
    });

    // Update localStorage when value changes
    useEffect(() => {
        if (value !== null && value !== undefined) {
            setStorage(key, value);
        }
    }, [key, value]);

    // Set new value
    const setStorageValue = useCallback((newValue) => {
        try {
            // Support function updater like useState
            const valueToSet = typeof newValue === 'function'
                ? newValue(value)
                : newValue;

            setValue(valueToSet);
            setStorage(key, valueToSet);
        } catch (error) {
            console.error(`Error setting storage for key "${key}":`, error);
        }
    }, [key, value]);

    // Remove from storage
    const removeStorageValue = useCallback(() => {
        setValue(defaultValue);
        removeStorage(key);
    }, [key, defaultValue]);

    return [value, setStorageValue, removeStorageValue];
};

