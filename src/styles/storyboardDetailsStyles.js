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

  // Main content section with text on left, image on right
  imageSection: {
    marginBottom: 6,
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: { xs: 'center', md: 'flex-start' },
    gap: 6,
    padding: { xs: 2, md: 4 },
    maxWidth: '1200px',
    mx: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    border: `1px solid ${skopelosColors.borders.primary}15`,
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
  },

  // Content area - LEFT SIDE
  contentArea: {
    width: { xs: '100%', md: '50%' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: { xs: 2, md: 3 },
    order: { xs: 2, md: 1 },
  },

  storyboardTitle: {
    ...typographyStyles.chapterTitle, 
    fontSize: { xs: '1.8rem', md: '2.4rem' },
    fontWeight: 200,
    textAlign: { xs: 'center', md: 'left' },
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

  // Elegant divider (left aligned)
  divider: {
    width: '550px',
    height: '2px',
    backgroundColor: skopelosColors.oceanBlue,
    mx: { xs: 'auto', md: 0 },
    marginY: 3,
    marginBottom: 4,
    opacity: 0.8,
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

  // Image caption/description
  imageCaption: {
    maxWidth: '100%',
    textAlign: { xs: 'center', md: 'left' },
    marginTop: 3,
    padding: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: `0 4px 12px ${skopelosColors.brightBlue}`,
    border: `1px solid ${skopelosColors.borders.primary}15`,
  },

  captionText: {
    ...typographyStyles.bodyText, // Use your custom bodyText style
    fontSize: '0.95rem',
    fontStyle: 'italic',
    color: skopelosColors.text.secondary,
    lineHeight: 1.6,
    letterSpacing: '0.01em',
  },

  // Image container - RIGHT SIDE
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

  mainImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'transform 0.4s ease',
    
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  // Image overlay for elegant effect
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

  // Clean tags section
  tagsSection: {
    maxWidth: '400px',
    mx: 'auto',
    marginBottom: 4,
    padding: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    border: `1px solid ${skopelosColors.borders.primary}15`,
    position: 'relative',
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: `linear-gradient(90deg, ${skopelosColors.oceanBlue}, ${skopelosColors.oceanBlue})`,
    },
  },

  tagsTitle: {
    ...typographyStyles.chapterTitle, // Use your custom chapterTitle style
    color: skopelosColors.text.primary,
    fontSize: { xs: '1.2rem', md: '1.4rem' },
    fontWeight: 200,
    marginBottom: 3,
    marginTop: 0,
    textAlign: 'center',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
  },

  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 3,
    justifyContent: 'center',
    marginBottom: 2,
  },

  tagChip: {
    ...typographyStyles.bodyText, // Use your custom bodyText style
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: skopelosColors.text.primary,
    fontSize: '0.9rem',
    fontStyle: 'italic',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    border: `1px solid ${skopelosColors.borders.primary}30`,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
    
    '&:hover': {
      backgroundColor: skopelosColors.brightBlue,
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(30, 64, 126, 0.25)',
      border: `1px solid ${skopelosColors.brightBlue}`,
    },
  },

  tagIcon: {
    width: 16,
    height: 16,
    opacity: 0.8,
  },

  // Clean back button
  backButtonContainer: {
    textAlign: 'center',
    mt: 6,
    marginBottom: 4,
  },

  backButton: {
    ...typographyStyles.bodyText, // Use your custom bodyText style
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

  // Content wrapper
  contentWrapper: {
    maxWidth: '1200px',
    mx: 'auto',
    padding: { xs: 2, md: 4 },
  },
};