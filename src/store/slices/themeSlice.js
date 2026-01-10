import { createSlice } from '@reduxjs/toolkit';
import { THEME_CONFIG } from '../../config';

// Initial state from config or localStorage
const getInitialMode = () => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
        return JSON.parse(saved);
    }
    return THEME_CONFIG.defaultMode === 'dark';
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        darkMode: getInitialMode(),
    },
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
        },
        setTheme: (state, action) => {
            state.darkMode = action.payload;
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export const selectDarkMode = (state) => state.theme.darkMode;

export default themeSlice.reducer;
