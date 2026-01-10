
// ==================== UPDATED AUTH SLICE ====================
// store/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { setStorage, getStorage, removeStorage, STORAGE_KEYS } from '../utils/storage';

// Load initial state from localStorage
const loadAuthFromStorage = () => {
    const savedAuth = getStorage(STORAGE_KEYS.AUTH_STATE);
    if (savedAuth) {
        return {
            user: savedAuth.user,
            token: savedAuth.token,
            isAuthenticated: !!savedAuth.token,
            loading: false,
            error: null,
        };
    }
    return {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    };
};

const initialState = loadAuthFromStorage();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;

            // Save to localStorage
            setStorage(STORAGE_KEYS.AUTH_STATE, {
                user: action.payload.user,
                token: action.payload.token,
            });
            setStorage(STORAGE_KEYS.AUTH_TOKEN, action.payload.token);
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;

            // Clear from localStorage
            removeStorage(STORAGE_KEYS.AUTH_STATE);
            removeStorage(STORAGE_KEYS.AUTH_TOKEN);
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };

            // Update in localStorage
            const currentAuth = getStorage(STORAGE_KEYS.AUTH_STATE) || {};
            setStorage(STORAGE_KEYS.AUTH_STATE, {
                ...currentAuth,
                user: state.user,
            });
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateUser,
    clearError,
} = authSlice.actions;

export default authSlice.reducer;