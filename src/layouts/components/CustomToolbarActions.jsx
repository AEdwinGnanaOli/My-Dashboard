import * as React from 'react';
import {
  Box,
  IconButton,
  Badge,
  Tooltip,
  InputBase,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  alpha,
  Chip,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MailIcon from '@mui/icons-material/Mail';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import { TOOLBAR_CONFIG } from '../../config';

const getNotificationIcon = (type) => {
  const iconProps = { fontSize: 'small' };
  switch (type) {
    case 'success':
      return <CheckCircleIcon {...iconProps} sx={{ color: '#4caf50' }} />;
    case 'warning':
      return <WarningIcon {...iconProps} sx={{ color: '#ff9800' }} />;
    case 'info':
      return <InfoIcon {...iconProps} sx={{ color: '#2196f3' }} />;
    default:
      return <InfoIcon {...iconProps} color="action" />;
  }
};

const getNotificationColor = (type) => {
  switch (type) {
    case 'success': return 'rgba(76, 175, 80, 0.1)';
    case 'warning': return 'rgba(255, 152, 0, 0.1)';
    case 'info': return 'rgba(33, 150, 243, 0.1)';
    default: return 'transparent';
  }
};

/**
 * CustomToolbarActions - Modern glassmorphism-inspired toolbar actions
 */
function CustomToolbarActions({ darkMode, onToggleDarkMode }) {
  const theme = useTheme();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [notificationsAnchor, setNotificationsAnchor] = React.useState(null);
  const isDark = theme.palette.mode === 'dark';

  const { search, notifications, messages, themeToggle, help, settings } = TOOLBAR_CONFIG;
  const notificationItems = notifications.items || [];
  const unreadCount = notificationItems.filter((n) => !n.read).length;

  // Glassmorphism button style
  const glassButtonStyle = {
    backdropFilter: 'blur(10px)',
    backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.2 : 0.6),
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    color: theme.palette.text.secondary,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* Modern Search Bar */}
      {search.enabled && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 1.5,
            py: 0.5,
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.15 : 0.7),
            border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
            width: searchOpen ? 220 : 42,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: searchOpen ? `0 4px 20px ${alpha(theme.palette.primary.main, 0.15)}` : 'none',
          }}
        >
          <IconButton
            size="small"
            onClick={() => setSearchOpen(!searchOpen)}
            sx={{ p: 0.5, color: searchOpen ? theme.palette.primary.main : theme.palette.text.secondary }}
          >
            {searchOpen ? <CloseIcon fontSize="small" /> : <SearchIcon fontSize="small" />}
          </IconButton>
          {searchOpen && (
            <InputBase
              placeholder={search.placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                ml: 1,
                flex: 1,
                fontSize: '0.875rem',
                '& input::placeholder': {
                  opacity: 0.6,
                },
              }}
              autoFocus
            />
          )}
        </Box>
      )}

      {/* Notifications with Badge */}
      {notifications.enabled && (
        <>
          <Tooltip title="Notifications" arrow>
            <IconButton
              onClick={(e) => setNotificationsAnchor(e.currentTarget)}
              sx={{
                ...glassButtonStyle,
                position: 'relative',
              }}
            >
              <Badge
                badgeContent={unreadCount}
                sx={{
                  '& .MuiBadge-badge': {
                    background: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.65rem',
                    minWidth: 18,
                    height: 18,
                    boxShadow: '0 2px 8px rgba(244, 67, 54, 0.4)',
                  },
                }}
              >
                <NotificationsIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Notifications Menu - Modern Design */}
          <Menu
            anchorEl={notificationsAnchor}
            open={Boolean(notificationsAnchor)}
            onClose={() => setNotificationsAnchor(null)}
            slotProps={{
              paper: {
                sx: {
                  width: 360,
                  maxHeight: 450,
                  mt: 1.5,
                  borderRadius: 3,
                  backdropFilter: 'blur(20px)',
                  backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.9 : 0.95),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: `0 20px 40px ${alpha('#000', 0.15)}`,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2.5, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" fontWeight={700} fontSize="1rem">
                  Notifications
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {unreadCount} new alerts
                </Typography>
              </Box>
              <Chip
                label="Mark all read"
                size="small"
                onClick={() => setNotificationsAnchor(null)}
                sx={{
                  fontSize: '0.7rem',
                  height: 24,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              />
            </Box>
            <Divider />
            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
              {notificationItems.map((notification) => (
                <MenuItem
                  key={notification.id}
                  onClick={() => setNotificationsAnchor(null)}
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    borderLeft: notification.read ? 'none' : `3px solid ${theme.palette.primary.main}`,
                    backgroundColor: notification.read ? 'transparent' : getNotificationColor(notification.type),
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.action.hover, 0.08),
                    },
                  }}
                >
                  <ListItemIcon>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        backgroundColor: getNotificationColor(notification.type),
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={notification.read ? 400 : 600}>
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block" noWrap>
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                  />
                </MenuItem>
              ))}
            </Box>
            <Divider />
            <Box sx={{ p: 1.5, textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                View All Notifications
              </Typography>
            </Box>
          </Menu>
        </>
      )}

      {/* Messages */}
      {messages.enabled && (
        <Tooltip title="Messages" arrow>
          <IconButton sx={glassButtonStyle}>
            <Badge
              badgeContent={messages.badgeCount}
              sx={{
                '& .MuiBadge-badge': {
                  background: 'linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  minWidth: 18,
                  height: 18,
                  boxShadow: '0 2px 8px rgba(33, 150, 243, 0.4)',
                },
              }}
            >
              <MailIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Tooltip>
      )}

      {/* Theme Toggle with Animation */}
      {themeToggle.enabled && (
        <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'} arrow>
          <IconButton
            onClick={onToggleDarkMode}
            sx={{
              ...glassButtonStyle,
              '&:hover': {
                ...glassButtonStyle['&:hover'],
                '& .theme-icon': {
                  transform: 'rotate(180deg)',
                },
              },
            }}
          >
            {darkMode ? (
              <LightModeIcon className="theme-icon" fontSize="small" sx={{ transition: 'transform 0.3s ease' }} />
            ) : (
              <DarkModeIcon className="theme-icon" fontSize="small" sx={{ transition: 'transform 0.3s ease' }} />
            )}
          </IconButton>
        </Tooltip>
      )}

      {/* Help */}
      {help.enabled && (
        <Tooltip title="Help Center" arrow>
          <IconButton sx={glassButtonStyle}>
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {/* Settings */}
      {settings.enabled && (
        <Tooltip title="Settings" arrow>
          <IconButton
            sx={{
              ...glassButtonStyle,
              '&:hover .settings-icon': {
                transform: 'rotate(90deg)',
              },
            }}
          >
            <TuneIcon className="settings-icon" fontSize="small" sx={{ transition: 'transform 0.3s ease' }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default CustomToolbarActions;
