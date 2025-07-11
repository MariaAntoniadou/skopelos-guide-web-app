import { skopelosColors } from './colors';
import { typographyStyles,skopelosFonts } from './typographyStyles';


export const chapterDetailsStyles = {
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

  chapterTitle: {
    ...typographyStyles.chapterTitle,
    fontSize: { xs: '1.8rem', md: '2.4rem' },
    fontWeight: 200,
    color: skopelosColors.text.primary,
    marginBottom: 3,
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    textAlign: 'center',
    '&:hover': {
      color: skopelosColors.brightBlue,
      transition: 'color 0.3s ease',
    },
  },

  descriptionBox: {
    ...typographyStyles.bodyText,
    fontSize: { xs: '1rem', md: '1.1rem' },
    color: skopelosColors.text.secondary,
    lineHeight: 1.7,
    marginBottom: 4,
    maxWidth: '1000px',
    mx: 'auto', // Center the description box
    letterSpacing: '0.01em',
    fontFamily: skopelosFonts.accent,
    backgroundColor: 'rgba(228, 213, 166, 0.9)',
    padding: 3, 
    textAlign: 'center', // Center the text inside
    
    '& p': {
      margin: 0,
      marginBottom: 2,
      textAlign: 'center', // Center paragraph text too
    },
  },

  // Elegant gallery layout
  storyboardGallery: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginBottom: 8,
    marginTop: 2,
  },

  storyboardRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },

  storyboardCard: {
    position: 'relative',
    width: 350,
    height: 450,
    backgroundColor: 'white',
    overflow: 'hidden',
    boxShadow: `0 4px 12px ${skopelosColors.brightBlue}`,
    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    cursor: 'pointer',
    
    '&:hover': {
      transform: 'translateY(-12px) scale(1.02)',
      boxShadow: `0 4px 12px ${skopelosColors.brightBlue}`,
      
      '& .image-overlay': {
        opacity: 1,
      },
      
      '& .card-title': {
        color: skopelosColors.brightBlue,
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
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },

  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },

  storyboardTitle: {
    ...typographyStyles.chapterTitle,
    fontSize: '1.3rem',
    fontWeight: 500,
    color: skopelosColors.text.primary,
    lineHeight: 1.4,
    textAlign: 'center',
    padding: '25px 24px',
    margin: 0,
    letterSpacing: '0.01em',
    transition: 'color 0.3s ease',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTop: `1px solid ${skopelosColors.borders.primary}10`,

    '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '2px',
    backgroundColor: skopelosColors.brightBlue,
    opacity: 0.7,
    transition: 'all 0.3s ease',
  },
  },

  noImagePlaceholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    height: '100%',
    border: `2px dashed ${skopelosColors.borders.primary}30`,
    transition: 'all 0.3s ease',
    
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      borderColor: skopelosColors.brightBlue,
    },
  },

  noImageText: {
    ...typographyStyles.bodyText,
    opacity: 0.5,
    fontSize: '1rem',
    fontStyle: 'italic',
    color: skopelosColors.text.secondary,
  },

  backButtonContainer: {
    textAlign: 'center',
    mt: 8,
  },

  backButton: {
    ...typographyStyles.bodyText,
    color: skopelosColors.brightBlue,
    padding: '12px 24px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: `1px solid ${skopelosColors.borders.primary}`,
    display: 'inline-block',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: skopelosColors.brightBlue,
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(30, 64, 126, 0.2)',
    },
  },
};