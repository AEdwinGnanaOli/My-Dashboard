import { Box, Typography, useTheme, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BRANDING_CONFIG } from '../../config';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

/**
 * CustomAppTitle - Creative app title with animated gradient and glow effects
 */
function CustomAppTitle() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === 'dark';

  const handleClick = () => {
    navigate(BRANDING_CONFIG.homeUrl);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        cursor: 'pointer',
        padding: '8px 4px',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          '& .logo-box': {
            boxShadow: isDark
              ? `0 0 20px ${alpha(theme.palette.primary.main, 0.6)}`
              : `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
          },
          '& .sparkle-icon': {
            transform: 'rotate(15deg) scale(1.1)',
          },
        },
      }}
    >
      {/* Animated Logo Box */}
      <Box
        className="logo-box"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          borderRadius: '14px',
          background: isDark
            ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          boxShadow: isDark
            ? `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`
            : `0 6px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `linear-gradient(45deg, transparent 30%, ${alpha('#fff', 0.1)} 50%, transparent 70%)`,
            animation: 'shimmer 3s infinite',
          },
          '@keyframes shimmer': {
            '0%': { transform: 'translateX(-100%) rotate(45deg)' },
            '100%': { transform: 'translateX(100%) rotate(45deg)' },
          },
        }}
      >
        <AutoAwesomeIcon
          className="sparkle-icon"
          sx={{
            color: 'white',
            fontSize: 26,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            transition: 'transform 0.3s ease',
            zIndex: 1,
          }}
        />
      </Box>

      {/* Brand Text with Gradient */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: '1.15rem',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            background: isDark
              ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`
              : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {BRANDING_CONFIG.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: `linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)`,
              boxShadow: '0 0 8px rgba(76, 175, 80, 0.5)',
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            {BRANDING_CONFIG.subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CustomAppTitle;
