import { skopelosColors } from './colors';
import { typographyStyles } from './typographyStyles';

export const storyboardDetailsStyles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },

  loadingSpinner: {
    color: skopelosColors.brightBlue,
  },

  errorContainer: {
    textAlign: 'center',
    mt: 8,
  },

  storyboardTitle: {
    ...typographyStyles.chapterTitle, 
    fontSize: { xs: '1.8rem', md: '2.4rem' },
    fontWeight: 200,
    textAlign: { xs: 'center',sm:'center', md: 'center' },
    marginBottom: 3,
    marginTop: 0,
    letterSpacing: '0.03em',
    color: skopelosColors.text.primary,
    textTransform: 'uppercase',
    
    '&:hover': {
      color: skopelosColors.brightBlue,
      transition: 'color 0.3s ease',
    },
  },


  topbarTitle: {
    ...typographyStyles.bodyText,
    color: skopelosColors.text.secondary,
    textAlign: { xs: 'center', md: 'left' },
    fontSize: { xs: '1.1rem', md: '1.2rem' },
    lineHeight: 1.7,
    letterSpacing: '0.05em',
    fontWeight: 300,
    
  },

  imageContainer: {
    position: 'relative',
    maxWidth: '500px',
    width: { xs: '100%', md: '50%' },
    marginBottom: { xs: 4, md: 0 },
    overflow: 'hidden',
    boxShadow: `0 4px 12px ${skopelosColors.brightBlue}`,
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    border: `1px solid ${skopelosColors.borders.primary}20`,
    order: { xs: 1, md: 2 },
    
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.18)',
    },
  },

  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 1,
    },
  },

  backButtonContainer: {
    textAlign: 'center',
    mt: 6,
    marginBottom: 4,
  },

  backButton: {
    ...typographyStyles.bodyText, 
    color: skopelosColors.brightBlue,
    padding: '12px 24px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: `1px solid ${skopelosColors.borders.primary}40`,
    display: 'inline-block',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontWeight: 400,
    letterSpacing: '0.02em',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: skopelosColors.brightBlue,
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(30, 64, 126, 0.2)',
    },
  },

  contentWrapper: {
    maxWidth: '1200px',
    mx: 'auto',
    padding: { xs: 2, md: 4 },
  },
};