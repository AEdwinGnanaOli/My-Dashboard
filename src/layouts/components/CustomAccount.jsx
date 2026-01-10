import * as React from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
  useTheme,
  alpha,
  Chip,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentIcon from '@mui/icons-material/Payment';
import LoginIcon from '@mui/icons-material/Login';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

/**
 * CustomAccount - Modern account component with creative styling
 */
function CustomAccount({ session, onSignIn, onSignOut }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isDark = theme.palette.mode === 'dark';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    if (onSignOut) {
      onSignOut();
    }
  };

  // Generate avatar gradient based on name
  const getAvatarGradient = (name) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    ];
    const index = name ? name.charCodeAt(0) % gradients.length : 0;
    return gradients[index];
  };

  // Signed out state
  if (!session || !session.user) {
    return (
      <Button
        variant="contained"
        size="small"
        startIcon={<LoginIcon />}
        onClick={onSignIn}
        sx={{
          borderRadius: '12px',
          textTransform: 'none',
          px: 2.5,
          py: 0.8,
          fontWeight: 600,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
          '&:hover': {
            boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
            transform: 'translateY(-1px)',
          },
        }}
      >
        Sign In
      </Button>
    );
  }

  const { user } = session;

  return (
    <>
      {/* Account Button */}
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer',
          padding: '6px 12px 6px 6px',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.2 : 0.6),
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.15)}`,
            transform: 'translateY(-1px)',
          },
        }}
      >
        {/* Avatar with gradient border */}
        <Box
          sx={{
            position: 'relative',
            padding: '2px',
            borderRadius: '12px',
            background: getAvatarGradient(user.name),
          }}
        >
          <Avatar
            src={user.image}
            alt={user.name}
            sx={{
              width: 34,
              height: 34,
              borderRadius: '10px',
              border: `2px solid ${theme.palette.background.paper}`,
              fontSize: '0.9rem',
              fontWeight: 700,
              background: getAvatarGradient(user.name),
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>
          {/* Online indicator */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
              border: `2px solid ${theme.palette.background.paper}`,
              boxShadow: '0 0 8px rgba(76, 175, 80, 0.5)',
            }}
          />
        </Box>

        {/* User info */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
              {user.name}
            </Typography>
            <VerifiedIcon sx={{ fontSize: 14, color: '#2196f3' }} />
          </Box>
          <Typography variant="caption" color="text.secondary" lineHeight={1} sx={{ fontSize: '0.68rem' }}>
            {user.role || 'User'}
          </Typography>
        </Box>

        <KeyboardArrowDownIcon
          sx={{
            fontSize: 18,
            color: theme.palette.text.secondary,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </Box>

      {/* Account Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 300,
              mt: 1.5,
              overflow: 'visible',
              borderRadius: 3,
              backdropFilter: 'blur(20px)',
              backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.9 : 0.95),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: `0 20px 40px ${alpha('#000', 0.15)}`,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 24,
                width: 12,
                height: 12,
                bgcolor: alpha(theme.palette.background.paper, isDark ? 0.9 : 0.95),
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                borderBottom: 'none',
                borderRight: 'none',
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Header with User Info */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            background: isDark
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                padding: '3px',
                borderRadius: '16px',
                background: getAvatarGradient(user.name),
              }}
            >
              <Avatar
                src={user.image}
                alt={user.name}
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '14px',
                  border: `3px solid ${theme.palette.background.paper}`,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  background: getAvatarGradient(user.name),
                }}
              >
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  {user.name}
                </Typography>
                <VerifiedIcon sx={{ fontSize: 16, color: '#2196f3' }} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                {user.email}
              </Typography>
              <Chip
                icon={<StarIcon sx={{ fontSize: '14px !important' }} />}
                label={user.role || 'User'}
                size="small"
                sx={{
                  mt: 0.5,
                  height: 22,
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.2)} 0%, ${alpha(theme.palette.warning.light, 0.1)} 100%)`,
                  color: theme.palette.warning.dark,
                  '& .MuiChip-icon': {
                    color: theme.palette.warning.main,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Menu Items */}
        <Box sx={{ py: 1 }}>
          <MenuItem
            onClick={handleClose}
            sx={{
              py: 1.2,
              px: 2.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                '& .menu-icon': {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemIcon>
              <PersonIcon className="menu-icon" fontSize="small" sx={{ transition: 'color 0.2s' }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={500}>My Profile</Typography>
            </ListItemText>
          </MenuItem>

          <MenuItem onClick={handleClose} sx={{ py: 1.2, px: 2.5, '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.08) } }}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={500}>Account Settings</Typography>
            </ListItemText>
          </MenuItem>

          <MenuItem onClick={handleClose} sx={{ py: 1.2, px: 2.5, '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.08) } }}>
            <ListItemIcon>
              <SecurityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={500}>Security</Typography>
            </ListItemText>
          </MenuItem>

          <MenuItem onClick={handleClose} sx={{ py: 1.2, px: 2.5, '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.08) } }}>
            <ListItemIcon>
              <PaymentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={500}>Billing</Typography>
            </ListItemText>
          </MenuItem>

          <Divider sx={{ my: 1 }} />

          <MenuItem onClick={handleClose} sx={{ py: 1.2, px: 2.5, '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.08) } }}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={500}>Settings</Typography>
            </ListItemText>
          </MenuItem>
        </Box>

        <Divider />

        {/* Sign Out */}
        <Box sx={{ p: 1.5 }}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleSignOut}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
              borderColor: alpha(theme.palette.error.main, 0.3),
              '&:hover': {
                backgroundColor: alpha(theme.palette.error.main, 0.08),
                borderColor: theme.palette.error.main,
              },
            }}
          >
            Sign Out
          </Button>
        </Box>
      </Menu>
    </>
  );
}

export default CustomAccount;
