

// ==================== PERMISSION GUARD WITH MUI ====================
// components/guards/PermissionGuard.jsx

import React from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { Lock as LockIcon, Warning as WarningIcon } from '@mui/icons-material';
import { usePermissions } from '../../hooks/usePermissions';

/**
 * PermissionGuard Component with MUI styling
 * Conditionally renders children based on user permissions
 */
export const PermissionGuard = ({
  permission,
  permissions,
  requireAll = false,
  children,
  fallback,
  showFallback = true,
  fallbackType = 'default', // 'default', 'alert', 'minimal'
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  let isAllowed = false;

  if (permission) {
    isAllowed = hasPermission(permission);
  } else if (permissions) {
    isAllowed = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  }

  if (isAllowed) {
    return <>{children}</>;
  }

  // Custom fallback provided
  if (fallback !== undefined) {
    return <>{fallback}</>;
  }

  // Don't show fallback
  if (!showFallback) {
    return null;
  }

  // Default MUI fallbacks
  if (fallbackType === 'alert') {
    return (
      <Alert severity="warning" icon={<LockIcon />}>
        You don't have permission to access this feature.
      </Alert>
    );
  }

  if (fallbackType === 'minimal') {
    return (
      <Typography variant="body2" color="text.secondary">
        Access restricted
      </Typography>
    );
  }

  // Default fallback
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: 'background.default',
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          maxWidth: 400,
        }}
      >
        <LockIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          You don't have permission to view this content.
        </Typography>
        <Button variant="outlined" href="/dashboard">
          Go to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};


