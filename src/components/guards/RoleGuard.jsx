// ==================== ROLE GUARD WITH MUI ====================
// components/guards/RoleGuard.jsx

import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { AdminPanelSettings as AdminIcon } from '@mui/icons-material';
import { usePermissions } from '../../hooks/usePermissions';

/**
 * RoleGuard Component with MUI styling
 * Conditionally renders children based on user role
 */
export const RoleGuard = ({
  role,
  roles,
  children,
  fallback,
  showFallback = true,
}) => {
  const { role: userRole } = usePermissions();

  let isAllowed = false;

  if (role) {
    isAllowed = userRole === role;
  } else if (roles) {
    isAllowed = roles.includes(userRole);
  }

  if (isAllowed) {
    return <>{children}</>;
  }

  if (fallback !== undefined) {
    return <>{fallback}</>;
  }

  if (!showFallback) {
    return null;
  }

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
        <AdminIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Role Required
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          This feature is restricted to certain user roles.
        </Typography>
        <Button variant="outlined" href="/dashboard">
          Go to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};
