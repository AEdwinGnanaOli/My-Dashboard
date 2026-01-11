// ==================== AUTH CONTEXT ====================
// context/AuthContext.jsx

import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, STORAGE_KEYS } from '../utils/storage';
import { loginSuccess, logout } from '../store/slices/authSlice';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    // Initialize auth from localStorage on mount
    useEffect(() => {
        const savedAuth = getStorage(STORAGE_KEYS.AUTH_STATE);
        if (savedAuth && savedAuth.token) {
            dispatch(loginSuccess(savedAuth));
        }
    }, [dispatch]);

    const contextValue = {
        user: auth.user,
        token: auth.token,
        isAuthenticated: auth.isAuthenticated,
        loading: auth.loading,
        error: auth.error,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return context;
};
