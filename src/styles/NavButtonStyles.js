import { skopelosColors } from './colors';
import { typographyStyles , skopelosFonts} from './typographyStyles';

export const navButtonStyles = {
  button: {
    color: 'white',
    ...typographyStyles.navButton,
    textTransform: 'none',
    px: 4,
    py: 1.5,
    position: 'relative',
    overflow: 'hidden',
    background: 'transparent',
    border: '1px solid transparent',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fontFamily: skopelosFonts.primary,
    fontSize: '1rem',
    fontWeight: 400,
    letterSpacing: '0.02em',
    fontStyle: 'normal', // Remove italic
    
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
    position: 'relative',
    zIndex: 1,
    fontFamily: skopelosFonts.primary,
    fontWeight: 400,
    letterSpacing: '0.02em',
    fontStyle: 'normal', // Remove italic here too
  },
};