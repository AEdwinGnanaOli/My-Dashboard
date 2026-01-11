
// ==================== UPDATED AUTH SLICE WITH SELECTORS ====================
// store/authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { setStorage, getStorage, removeStorage, STORAGE_KEYS } from '../../utils/storage';

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

            removeStorage(STORAGE_KEYS.AUTH_STATE);
            removeStorage(STORAGE_KEYS.AUTH_TOKEN);
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };

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

// Selectors
// Selectors with meaningful naming conventions
export const selectAuth = (state) => state.auth;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthToken = (state) => state.auth.token;
export const selectAuthIsLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthUserRole = (state) => state.auth.user?.role;
export const selectAuthUserName = (state) => state.auth.user?.name;
export const selectAuthUserEmail = (state) => state.auth.user?.email;
export const selectAuthUserId = (state) => state.auth.user?.id;

// Derived selectors
export const selectAuthHasError = (state) => !!state.auth.error;
export const selectAuthIsReady = (state) => !state.auth.loading && state.auth.isAuthenticated;
export default authSlice.reducer;