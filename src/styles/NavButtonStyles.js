import { skopelosColors } from './colors';
import { typographyStyles } from './typographyStyles';

export const navButtonStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0.5,
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-2px)',
    },
  },

  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: 'white',
    marginBottom: 0.5,
  },

  button: {
    color: 'white',
    ...typographyStyles.navButton, // Use your custom navButton typography
    textTransform: 'none',
    px: 4,
    py: 1.5,
    position: 'relative',
    overflow: 'hidden',
    background: 'transparent',
    border: '1px solid transparent',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    
    // Elegant underline effect
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: '0%',
      height: '2px',
      background: `linear-gradient(90deg, ${skopelosColors.brightBlue}, rgba(255, 255, 255, 0.8))`,
      transform: 'translateX(-50%)',
      transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    
    // Subtle background effect
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.08)',
      opacity: 0,
      transition: 'all 0.4s ease',
      zIndex: 0,
    },
    
    // Elegant hover effects
    '&:hover': {
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      
      '&::before': {
        opacity: 1,
      },
      
      '&::after': {
        width: '80%',
      },
    },
    
    // Active state
    '&:active': {
      transform: 'translateY(-1px)',
    },
    
    // Focus state for accessibility
    '&:focus': {
      outline: 'none',
      boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.3)',
    },
    
    // Text positioning
    '& .MuiButton-label, & > span': {
      position: 'relative',
      zIndex: 1,
    },
  },

  text: {
    ...typographyStyles.navButton, // Use your custom navButton typography
    position: 'relative',
    zIndex: 1,
    color: 'white',
    fontSize: { xs: '0.8rem', md: '0.9rem' },
    fontWeight: 500,
    letterSpacing: '0.02em',
    textAlign: 'center',
    lineHeight: 1.2,
    // Responsive font size
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
    },
  },
};