import { skopelosColors } from './colors';

export const skopelosFonts = {
  titles: "'Playfair Display', serif",  // Elegant serif for all titles
  text: "'Raleway', sans-serif",        // Clean sans-serif for all text
};

export const typographyStyles = {
  // All title styles use the same font
  pageTitle: {
    fontFamily: skopelosFonts.titles,
    fontWeight: 700,
    fontSize: '3.5rem',
    letterSpacing: '8px',
    textAlign: 'center',
    color: skopelosColors.text.primary,
  },
  
  sectionTitle: {
    fontFamily: skopelosFonts.titles,
    fontWeight: 600,
    fontSize: '2rem',
    letterSpacing: '4px',
    color: skopelosColors.text.primary,
  },
  
  cardTitle: {
    fontFamily: skopelosFonts.titles,
    fontWeight: 500,
    fontSize: '1.5rem',
    letterSpacing: '2px',
    color: skopelosColors.text.primary,
  },

  chapterTitle: {
    fontFamily: skopelosFonts.titles,
    fontWeight: 600,
    fontSize: { xs: '1.75rem', md: '2.5rem' },
    letterSpacing: '-0.03em',
    lineHeight: 1.2,
    color: skopelosColors.text.primary,
    transition: 'all 0.3s ease',
    '&:hover': {
      color: skopelosColors.brightBlue,
    },
  },
  
  // All text styles use the same font
  bodyText: {
    fontFamily: skopelosFonts.text,
    fontSize: '1rem',
    lineHeight: 1.6,
    color: skopelosColors.text.secondary,
  },

  navButton: {
    fontFamily: skopelosFonts.text,
    fontWeight: 400,
    fontSize: '1rem',
    letterSpacing: '0.5px',
    color: 'white',
  },

  chapterDescription: {
    fontFamily: skopelosFonts.text,
    fontSize: '1rem',
    lineHeight: 1.8,
    fontWeight: 400,
    letterSpacing: '0.3px',
    color: skopelosColors.text.secondary,
  },

  storyboardSectionTitle: {
    fontFamily: skopelosFonts.text,
    fontWeight: 500,
    letterSpacing: '-0.01em',
    opacity: 0.8,
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    color: skopelosColors.text.primary,
  },

  quoteText: {
    fontFamily: skopelosFonts.text,
    fontSize: { xs: '1rem', md: '1.1rem' },
    fontStyle: 'italic',
    lineHeight: 1.8,
    letterSpacing: '0.025em',
    color: skopelosColors.text.secondary,
  },
};