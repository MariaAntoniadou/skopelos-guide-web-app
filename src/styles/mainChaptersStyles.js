import { skopelosColors } from './colors';
import { typographyStyles } from './typographyStyles';

export const mainChaptersStyles = {

  chapterTitle: {
    ...typographyStyles.chapterTitle,
    
  },
  
  storyboardTitle: {
    ...typographyStyles.storyboardTitle,
    
  },
  chapterDescription: {
    ...typographyStyles.chapterDescription,
  },

  quoteText: {
    ...typographyStyles.quoteText,
    
  },
  
  quoteSection: {
    textAlign: 'center',
    marginBottom: 8,
    padding: { xs: 1, md: 2 },
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTop: `2px solid ${skopelosColors.oceanBlue}`,
    borderBottom: 'none',
  },


  decorativeLine: {
    width: '100px',
    height: '2px',
    backgroundColor: skopelosColors.oceanBlue,
    mx: 'auto',
    mt: 3,
    opacity: 0.8,
  },

  chaptersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: { xs: 2, md: 4 },
  },

  chapterBox: {
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  padding: { xs: 4, md: 4 },
  marginBottom: 3,
  //position: 'relative',
  boxShadow: '0 2px 16px rgba(37, 132, 108, 1)',
  transition: 'box-shadow 0.3s, transform 0.3s, background 0.3s',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 1,
  },

  '&:hover': {
    boxShadow: '0 2px 16px rgba(29, 115, 95, 1)',
    transform: 'translateY(-4px) scale(1.02)',
  },
},


  storyboardCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 0,
    maxWidth: 300,
    height: 370,
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    boxShadow: `0 4px 12px ${'rgba(60, 197, 165, 0.9)'}`,
    
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      transform: 'translateY(-3px) scale(1.03)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      
      '& .storyboard-image': {
        transform: 'scale(1.00)',
      },
    },
  },

  storyboardImageContainer: {
    position: 'relative',
    width: '100%',
    height: 450,
    overflow: 'hidden',
  },
  storyboardImage: {
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },

  arrowButtonText: {
    fontSize: '2rem',
    fontWeight: 300,
    color: skopelosColors.oceanBlue,
    lineHeight: 1,
  },
};