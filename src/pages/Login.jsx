import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import { Box, Button, TextField, Typography, Paper, Container } from '@mui/material';

import { ROLES, PERMISSIONS } from '../config/roles';

const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login logic
    if (username && password) {
      let role = ROLES.STUDENT; // Default
      
      if (username.toLowerCase() === 'admin') role = ROLES.ADMIN;
      else if (username.toLowerCase() === 'manager') role = ROLES.MANAGER;
      else if (username.toLowerCase() === 'librarian') role = ROLES.LIBRARIAN;
      else if (username.toLowerCase() === 'staff') role = ROLES.STAFF;
      
      const user = {
        name: username,
        email: `${username}@example.com`,
        role: role,
        permissions: PERMISSIONS[role] || [], // Dynamically attach permissions
        image: '', // Placeholder
      };
      
      dispatch(setCredentials({ user, token: 'mock-jwt-token' }));
      navigate(from, { replace: true });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Use 'admin' for Admin role, others for User role.
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
