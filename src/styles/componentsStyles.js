import { skopelosColors } from './colors'; 
import { typographyStyles } from './typographyStyles';

export const pageStyles = {
  container: {
    backgroundColor: skopelosColors.background.primary,
    minHeight: '100vh',
    py: 8,
    backgroundImage: `
      radial-gradient(circle at 25% 25%, ${skopelosColors.background.accent}40 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, ${skopelosColors.borders.primary}30 0%, transparent 50%)
    `,
  },
  
  contentWrapper: {
    //maxWidth: '1400px',
    //mx: 'auto',
    px: { xs: 3, md: 6 },
  },
  
  storyboardContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    overflowX: 'auto',
    overflowY: 'hidden',
    //paddingBottom: 3,
    //paddingX: 0,
    scrollBehavior: 'smooth',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  arrowNavigationWrapper: {
    position: 'relative',
    width: '100%',
    //padding: '0 20px',
    '&:hover .arrow-button': {
      opacity: 1,
      transform: 'translateY(-50%) scale(1)',
    },
  },
};

export const cardStyles = {
  arrowButton: {
  position: 'absolute',
  top: '50%',
  zIndex: 10,
  background: 'rgba(255,255,255,0.92)',
  border: `1.5px solid ${skopelosColors.brightBlue}`,
  borderRadius: '0%',
  width: 44,
  height: 44,
  opacity: 0,
  transform: 'translateY(-50%)',
  transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
  color: skopelosColors.brightBlue,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.2rem',
  boxShadow: '0 2px 8px rgba(30,64,126,0.10)',

  '&.left': { left: -22 },
  '&.right': { right: -22 },

  '&:hover': {
    background: skopelosColors.brightBlue,
    color: '#fff',
    transform: 'translateY(-50%) scale(1.08)',
    boxShadow: '0 4px 16px rgba(30,64,126,0.18)',
    border: `1.5px solid ${skopelosColors.brightBlue}`,
  },
},
};

export const navigationStyles = {
  navbar: {
    backgroundColor: skopelosColors.oceanBlue,
    backdropFilter: 'blur(20px)',
    boxShadow: '0 4px 20px rgba(26, 54, 93, 0.3)',
    borderBottom: 'none',
  },
  
  navButton: {
    color: 'white',
    ...typographyStyles.navButton,
    textTransform: 'none',
    borderRadius: 3,
    px: 4,
    py: 1.5,
    position: 'relative',
    overflow: 'hidden',
    background: 'transparent',
    border: '2px solid transparent',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 3,
      opacity: 0,
      transition: 'all 0.4s ease',
      zIndex: 0,
    },
    
    '&:hover': {
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
      
      '&::before': {
        opacity: 1,
        background: `linear-gradient(135deg, ${skopelosColors.brightBlue}40, ${skopelosColors.seaGreen}30)`,
      },
    },
  },
};