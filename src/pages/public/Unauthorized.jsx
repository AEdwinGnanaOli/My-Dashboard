// ==================== UNAUTHORIZED PAGE WITH MUI ====================
// pages/Unauthorized.jsx

import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { BlockOutlined as BlockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          <BlockIcon
            sx={{
              fontSize: 80,
              color: 'error.main',
              mb: 3,
            }}
          />
          <Typography variant="h3" gutterBottom fontWeight="bold">
            403
          </Typography>
          <Typography variant="h5" gutterBottom>
            Access Denied
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            You don't have permission to access this page.
            Please contact your administrator if you believe this is an error.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

