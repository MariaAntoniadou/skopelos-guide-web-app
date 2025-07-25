import { skopelosColors } from './colors';
import { typographyStyles } from './typographyStyles';

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
  },

  descriptionBox: {
    ...typographyStyles.chapterDescription, 

  },

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
    ...typographyStyles.cardTitle, // Use your custom cardTitle style
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
    ...typographyStyles.bodyText, // Use your custom bodyText style
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