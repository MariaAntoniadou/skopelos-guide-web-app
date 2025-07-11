import { skopelosColors } from './colors';
import { typographyStyles, skopelosFonts } from './typographyStyles';

export const mainChaptersStyles = {
  // Quote section - clean and elegant
  quoteSection: {
    textAlign: 'center',
    marginBottom: 8,
    padding: { xs: 4, md: 6 },
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTop: `2px solid ${skopelosColors.brightBlue}`,
    borderBottom: `1px solid ${skopelosColors.borders.primary}20`,
  },

  quoteText: {
    ...typographyStyles.bodyText,
    fontSize: { xs: '1.1rem', md: '1.3rem' },
    fontStyle: 'italic',
    color: skopelosColors.text.secondary,
    maxWidth: '600px',
    mx: 'auto',
    lineHeight: 1.8,
    letterSpacing: '0.02em',
    fontWeight: 300,
  },

  decorativeLine: {
    width: '100px',
    height: '2px',
    backgroundColor: skopelosColors.brightBlue,
    mx: 'auto',
    mt: 3,
    opacity: 0.8,
  },

  // Clean chapters container
  chaptersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    maxWidth: '1200px',
    mx: 'auto',
    padding: { xs: 2, md: 4 },
  },

  // Elegant chapter box
  chapterBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    border: `1px solid ${skopelosColors.borders.primary}15`,
    padding: { xs: 4, md: 6 },
    marginBottom: 6,
    position: 'relative',
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: `linear-gradient(90deg, ${skopelosColors.brightBlue}, ${skopelosColors.oceanBlue})`,
    },

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      transform: 'translateY(-2px)',
      transition: 'all 0.3s ease',
    },
  },

  // Clean chapter title
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

  // Clean description
  chapterDescription: {
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
  padding: 3, // Add padding for better spacing
  textAlign: 'center', // Center the text inside
  
  '& p': {
    margin: 0,
    marginBottom: 2,
    textAlign: 'center', // Center paragraph text too
  },
},

  // Refined storyboard card
  storyboardCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: `1px solid ${skopelosColors.borders.primary}20`,
    padding: 3,
    minWidth: 280,
    maxWidth: 280,
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    cursor: 'pointer',
    boxShadow: `0 4px 12px ${skopelosColors.brightBlue}`,
    
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      
      '& .storyboard-image': {
        transform: 'scale(1.02)',
      },
    },
  },

  // Clean storyboard title
  storyboardTitle: {
    ...typographyStyles.chapterTitle,
    fontSize: '1.1rem',
    fontWeight: 400,
    color: skopelosColors.text.primary,
    marginBottom: 2,
    textAlign: 'center',
    letterSpacing: '0.02em',
    lineHeight: 1.4,
    height: 'auto',
    minHeight: '2.8em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Sharp, clean image
  storyboardImage: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease',
    border: `1px solid ${skopelosColors.borders.primary}10`,
    
    '&.storyboard-image': {
      // Class for hover targeting
    },
  },

  // Clean arrow button text
  arrowButtonText: {
    fontSize: '2rem',
    fontWeight: 300,
    color: skopelosColors.brightBlue,
    lineHeight: 1,
  },
};