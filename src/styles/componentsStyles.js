import { skopelosColors } from './colors'; 

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
  storyboardContainer: {
  display: 'flex',
  flexDirection: 'row', 
  gap: '5px',   
  overflowX:'auto'  ,
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none', 
  '&::-webkit-scrollbar': { display: 'none' }, 
},
  contentWrapper: {
    px: { xs: 3, md: 6 },
  },
  

  arrowNavigationWrapper: {
    position: 'relative',
    width: '100%',
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
  border: `1.5px solid ${skopelosColors.oceanBlue}`,
  borderRadius: '0%',
  width: 44,
  height: 44,
  opacity: 0,
  transform: 'translateY(-50%)',
  transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
  color: skopelosColors.oceanBlue,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.2rem',
  boxShadow: '0 2px 8px rgba(30,64,126,0.10)',

  '&.left': { left: -22 },
  '&.right': { right: -22 },

  '&:hover': {
    background: skopelosColors.oceanBlue,
    color: '#fff',
    transform: 'translateY(-50%) scale(1.08)',
    boxShadow: '0 4px 16px rgba(30,64,126,0.18)',
    border: `1.5px solid ${skopelosColors.oceanBlue}`,
  },
},
};


