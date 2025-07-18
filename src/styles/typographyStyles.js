import { skopelosColors } from './colors';

export const skopelosFonts = { 
   titles: "'Noto Serif', serif",
   text: "'Comfortaa', sans-serif",
  
};

export const typographyStyles = {
  pageTitle: {
    fontFamily: skopelosFonts.titles,
    fontWeight: 400,
    fontSize: '3.5rem',
    letterSpacing: '4px', 
    textAlign: 'center',
    color: skopelosColors.text.primary,
  },
  
  sectionTitle: {
    fontFamily: skopelosFonts.titles,
    fontWeight: 500, 
    fontSize: '2rem',
    letterSpacing: '2px', 
    color: skopelosColors.text.primary,
  },
  
  cardTitle: {
    fontFamily: skopelosFonts.titles,
    fontWeight: 400, 
    fontSize: '1.5rem',
    letterSpacing: '1px', 
    color: skopelosColors.text.primary,
  },

  chapterTitle: {
    fontFamily: skopelosFonts.titles, 
    fontSize: { xs: '1.8rem', md: '2.4rem' },
    letterSpacing: '0.03em', 
    lineHeight: 1.2,
    color: skopelosColors.text.primary,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 3,
    '&:hover': {
      color: skopelosColors.brightBlue,
      transition: 'color 0.3s ease',
    },
  },
  
  bodyText: {
    fontFamily: skopelosFonts.text,
    fontSize: '1rem',
    lineHeight: 1.6,
    fontWeight: 400, 
    color: skopelosColors.text.secondary,
  },

  navButton: {
    fontFamily: skopelosFonts.text,
    fontWeight: 500, 
    fontSize: '1rem',
    letterSpacing: '0.3px', 
    color: 'white',
  },

  chapterDescription: {
  fontFamily: skopelosFonts.text,
  fontSize: { xs: '1rem', md: '1rem' },
  lineHeight: 1.6,
  fontWeight: 500,
  letterSpacing: '0.01em',
  color: skopelosColors.text.secondary,
  marginBottom: 4,
  width: '100%',           
  maxWidth: '100%',         
  backgroundColor: 'rgba(95, 201, 217, 0.9)',
  padding: 3,
  boxSizing: 'border-box',  
  '& p': {
    margin: 0,
    marginBottom: 2,
    textAlign: 'center',
  },
},

  storyboardTitle: {
    fontFamily: skopelosFonts.text,
    fontWeight: 800, 
    letterSpacing: '0.05em', 
    opacity: 1,
    //textTransform: 'uppercase',
    fontSize: '0.875rem',
    color: skopelosColors.text.primary,
    
  },

  quoteText: {
    fontFamily: skopelosFonts.text,fontSize: { xs: '1.1rem', md: '1.3rem' },
    fontStyle: 'italic',
    color: skopelosColors.text.secondary,
    maxWidth: '600px',
    mx: 'auto',
    lineHeight: 1.8,
    letterSpacing: '0.02em',
    fontWeight: 300,
  },
};