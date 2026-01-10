import * as React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  LinearProgress,
  useTheme,
  alpha,
  Chip,
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SIDEBAR_CONFIG, BRANDING_CONFIG } from '../../config';

/**
 * SidebarFooter - Creative sidebar footer with animated elements
 */
function SidebarFooter({ mini }) {
  const theme = useTheme();
  const { footer } = SIDEBAR_CONFIG;
  const { storage } = footer;
  const isDark = theme.palette.mode === 'dark';

  const storagePercent = storage.enabled ? (storage.used / storage.total) * 100 : 0;

  if (!footer.enabled) {
    return null;
  }

  // Get progress color based on usage
  const getProgressColor = () => {
    if (storagePercent > 90) return 'linear-gradient(90deg, #f44336 0%, #e91e63 100%)';
    if (storagePercent > 70) return 'linear-gradient(90deg, #ff9800 0%, #ffc107 100%)';
    return 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)';
  };

  // Mini version
  if (mini) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        {storage.enabled && (
          <Tooltip title={`${storage.label}: ${storagePercent.toFixed(0)}%`} placement="right">
            <IconButton
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <StorageIcon fontSize="small" color="primary" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    );
  }

  // Full version
  return (
    <Box
      sx={{
        p: 2,
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      {/* Storage Card with Gradient */}
      {storage.enabled && (
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            background: isDark
              ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative element */}
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: alpha(theme.palette.primary.main, 0.1),
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '10px',
                  background: getProgressColor(),
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
              >
                <StorageIcon sx={{ fontSize: 18, color: 'white' }} />
              </Box>
              <Typography variant="body2" fontWeight={700}>
                {storage.label}
              </Typography>
            </Box>
            <Chip
              label={`${storagePercent.toFixed(0)}%`}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.7rem',
                fontWeight: 700,
                background: getProgressColor(),
                color: 'white',
              }}
            />
          </Box>

          {/* Custom Progress Bar */}
          <Box
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              overflow: 'hidden',
              mb: 1,
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${storagePercent}%`,
                background: getProgressColor(),
                borderRadius: 4,
                transition: 'width 0.5s ease',
                boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`,
              }}
            />
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ position: 'relative' }}>
            <strong>{storage.used} GB</strong> of {storage.total} GB used
          </Typography>
        </Box>
      )}

      {/* Upgrade Card */}
      <Box
        sx={{
          mt: 2,
          p: 1.5,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
            '& .rocket-icon': {
              transform: 'translateY(-3px) rotate(-10deg)',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <RocketLaunchIcon
            className="rocket-icon"
            sx={{
              color: 'white',
              fontSize: 22,
              transition: 'transform 0.3s ease',
            }}
          />
          <Box>
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2 }}>
              Upgrade Plan
            </Typography>
            <Typography variant="caption" sx={{ color: alpha('#fff', 0.8) }}>
              Get more storage
            </Typography>
          </Box>
          <KeyboardArrowUpIcon sx={{ color: 'white', ml: 'auto' }} />
        </Box>
      </Box>

      {/* Version & Company */}
      {(footer.showVersion || footer.showCompany) && (
        <Box
          sx={{
            mt: 2,
            pt: 1.5,
            borderTop: `1px dashed ${alpha(theme.palette.divider, 0.2)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {footer.showVersion && (
            <Chip
              label={`v${BRANDING_CONFIG.version}`}
              size="small"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                backgroundColor: alpha(theme.palette.text.primary, 0.08),
                color: theme.palette.text.secondary,
              }}
            />
          )}
          {footer.showCompany && (
            <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem' }}>
              {BRANDING_CONFIG.copyrightYear} {BRANDING_CONFIG.companyName}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default SidebarFooter;
