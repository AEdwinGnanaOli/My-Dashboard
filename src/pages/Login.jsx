import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  LockOutlined as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

import { ROLES, PERMISSIONS } from '../config/roles';

const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      let role = ROLES.STUDENT;

      if (username.toLowerCase() === 'admin') role = ROLES.ADMIN;
      else if (username.toLowerCase() === 'manager') role = ROLES.MANAGER;
      else if (username.toLowerCase() === 'librarian') role = ROLES.LIBRARIAN;
      else if (username.toLowerCase() === 'staff') role = ROLES.STAFF;

      const user = {
        name: username,
        email: `${username}@example.com`,
        role: role,
        permissions: PERMISSIONS[role] || [],
        image: '',
      };

      dispatch(loginSuccess({ user, token: 'mock-jwt-token' }));
      navigate(from, { replace: true });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        px: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          maxWidth: 400,
          mx: 'auto',
          borderRadius: 3,
          backgroundColor: 'white',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <LockIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" fontWeight="bold" color="primary">
            Sign In
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Welcome back! Please sign in to your account
          </Typography>
        </Box>

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
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  value={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Link
              href="#"
              variant="body2"
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Sign In
          </Button>


        </Box>


      </Paper>
    </Box>
  );
};

export default Login;
