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
    borderTop: `2px solid ${skopelosColors.brightBlue}`,
    borderBottom: 'none',
  },


  decorativeLine: {
    width: '100px',
    height: '2px',
    backgroundColor: skopelosColors.brightBlue,
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
  padding: { xs: 4, md: 6 },
  marginBottom: 6,
  position: 'relative',
  borderRadius: 16,
  boxShadow: '0 2px 16px rgba(44, 62, 80, 0.08)',
  transition: 'box-shadow 0.3s, transform 0.3s, background 0.3s',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${skopelosColors.brightBlue}, ${skopelosColors.oceanBlue})`,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 1,
  },

  '&:hover': {
    background: 'linear-gradient(135deg, #e7e8e9ff 0%, #f7fafc 100%)',
    boxShadow: '0 8px 32px rgba(44, 62, 80, 0.16)',
    transform: 'translateY(-4px) scale(1.02)',
  },
},


  storyboardCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 1,
    borderRadius:4,
    minWidth: 280,
    maxWidth: 280,
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    cursor: 'pointer',
    boxShadow: `0 4px 12px ${'rgba(95, 201, 217, 0.9)'}`,
    
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      transform: 'translateY(-3px) scale(1.03)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      
      '& .storyboard-image': {
        transform: 'scale(1.02)',
      },
    },
  },

  storyboardImageContainer: {
    position: 'relative',
    width: '100%',
    height: 350,
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
    color: skopelosColors.brightBlue,
    lineHeight: 1,
  },
};