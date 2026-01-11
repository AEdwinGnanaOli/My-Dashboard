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
  IconButton,
  Tooltip,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentIcon from '@mui/icons-material/Payment';
import LoginIcon from '@mui/icons-material/Login';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

/**
 * CustomAccount - Compact account component with avatar-only display
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

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Signed out state - Compact button
  if (!session || !session.user) {
    return (
      <Tooltip title="Sign In" arrow>
        <IconButton
          onClick={onSignIn}
          sx={{
            width: 40,
            height: 40,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: '#fff',
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <LoginIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }

  const { user } = session;

  return (
    <>
      {/* Compact Avatar Button */}
      <Tooltip title={user.name || 'Account'} arrow>
        <IconButton
          onClick={handleClick}
          sx={{
            p: 0,
            position: 'relative',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            transition: 'transform 0.2s ease',
          }}
        >
          {/* Avatar with gradient border */}
          <Box
            sx={{
              position: 'relative',
              padding: '3px',
              borderRadius: '50%',
              background: getAvatarGradient(user.name),
            }}
          >
            <Avatar
              src={user.image}
              alt={user.name}
              sx={{
                width: 36,
                height: 36,
                border: `2px solid ${theme.palette.background.paper}`,
                fontSize: '0.875rem',
                fontWeight: 700,
                background: getAvatarGradient(user.name),
              }}
            >
              {getInitials(user.name)}
            </Avatar>
            
            {/* Online indicator */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
                border: `2px solid ${theme.palette.background.paper}`,
                boxShadow: '0 0 8px rgba(76, 175, 80, 0.6)',
              }}
            />
          </Box>
        </IconButton>
      </Tooltip>

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
              width: 240,
              mt: 1,
              overflow: 'visible',
              borderRadius: 2,
              backdropFilter: 'blur(20px)',
              backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.95 : 0.98),
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: isDark
                ? `0 4px 20px ${alpha('#000', 0.4)}`
                : `0 4px 20px ${alpha('#000', 0.1)}`,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 8,
                height: 8,
                bgcolor: alpha(theme.palette.background.paper, isDark ? 0.95 : 0.98),
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
        {/* Compact Header with User Info */}
        <Box
          sx={{
            px: 1.5,
            py: 1.5,
            background: isDark
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`
              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            {/* Avatar */}
            <Box
              sx={{
                padding: '2px',
                borderRadius: '10px',
                background: getAvatarGradient(user.name),
              }}
            >
              <Avatar
                src={user.image}
                alt={user.name}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '8px',
                  border: `2px solid ${theme.palette.background.paper}`,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  background: getAvatarGradient(user.name),
                }}
              >
                {getInitials(user.name)}
              </Avatar>
            </Box>

            {/* User Info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  noWrap
                  sx={{ fontSize: '0.85rem' }}
                >
                  {user.name}
                </Typography>
                {user.verified && (
                  <VerifiedIcon sx={{ fontSize: 13, color: '#2196f3', flexShrink: 0 }} />
                )}
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
                sx={{ fontSize: '0.7rem', display: 'block', lineHeight: 1.4 }}
              >
                {user.email}
              </Typography>
              <Chip
                icon={<StarIcon sx={{ fontSize: '11px !important' }} />}
                label={user.role || 'User'}
                size="small"
                sx={{
                  mt: 0.4,
                  height: 18,
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.15)} 0%, ${alpha(theme.palette.warning.light, 0.08)} 100%)`,
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

        {/* Menu Items - Compact */}
        <Box sx={{ py: 0.5 }}>
          <MenuItem
            sx={{
              py: 0.7,
              px: 1.5,
              borderRadius: 1,
              mx: 0.5,
              minHeight: 'auto',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <PersonIcon sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                My Profile
              </Typography>
            </ListItemText>
          </MenuItem>

          <MenuItem
            sx={{
              py: 0.7,
              px: 1.5,
              borderRadius: 1,
              mx: 0.5,
              minHeight: 'auto',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <SettingsIcon sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                Settings
              </Typography>
            </ListItemText>
          </MenuItem>
        </Box>

        <Divider sx={{ my: 0.5 }} />

        {/* Sign Out - Compact */}
        <Box sx={{ p: 0.75 }}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
            onClick={handleSignOut}
            size="small"
            sx={{
              borderRadius: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              py: 0.6,
              fontSize: '0.8rem',
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
