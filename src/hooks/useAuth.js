// ==================== useAuth HOOK ====================
// hooks/useAuth.js

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateUser,
    clearError,
} from '../store/authSlice';

/**
 * Hook for auth state management with localStorage sync
 */
export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    // Login
    const login = useCallback((userData) => {
        dispatch(loginSuccess(userData));
    }, [dispatch]);

    // Logout
    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    // Update user data
    const updateUserData = useCallback((userData) => {
        dispatch(updateUser(userData));
    }, [dispatch]);

    // Start login (loading state)
    const startLogin = useCallback(() => {
        dispatch(loginStart());
    }, [dispatch]);

    // Login failed
    const failLogin = useCallback((error) => {
        dispatch(loginFailure(error));
    }, [dispatch]);

    // Clear error
    const clearAuthError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    return {
        user: auth.user,
        token: auth.token,
        isAuthenticated: auth.isAuthenticated,
        loading: auth.loading,
        error: auth.error,
        login,
        logout: handleLogout,
        updateUser: updateUserData,
        startLogin,
        failLogin,
        clearError: clearAuthError,
    };
};
