// ==================== UPDATED THEME SLICE ====================
// store/slices/themeSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { setStorage, getStorage, STORAGE_KEYS } from '../../utils/storage';

const THEME_STORAGE_KEY = 'theme_mode';

// Initial state from localStorage or default
const getInitialMode = () => {
    const saved = getStorage(THEME_STORAGE_KEY);
    if (saved !== null) {
        return saved;
    }
    return false; // default to light mode
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        darkMode: getInitialMode(),
    },
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
            setStorage(THEME_STORAGE_KEY, state.darkMode);
        },
        setThemeMode: (state, action) => {
            state.darkMode = action.payload;
            setStorage(THEME_STORAGE_KEY, action.payload);
        },
    },
});

export const { toggleTheme, setThemeMode } = themeSlice.actions;

// Selectors
export const selectTheme = (state) => state.theme;
export const selectThemeDarkMode = (state) => state.theme.darkMode;
export const selectThemeMode = (state) => state.theme.darkMode ? 'dark' : 'light';

export default themeSlice.reducer;
