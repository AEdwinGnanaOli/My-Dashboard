// ==================== PROTECTED ROUTE ====================
// components/routes/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { selectAuthUser, selectAuthIsAuthenticated, selectAuthIsLoading } from '../store/slices/authSlice';

/**
 * ProtectedRoute with loading state
 */
export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const isAuthenticated = useSelector(selectAuthIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthIsLoading);
  const location = useLocation();

  // Show loading while checking auth
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role authorization
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

