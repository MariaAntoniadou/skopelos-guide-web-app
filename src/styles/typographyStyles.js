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
    letterSpacing: '3px', 
    textAlign: 'center',
    color: skopelosColors.text.primary,
  },
  
  sectionTitle: {
    fontFamily: skopelosFonts.titles,
    fontWeight: 500, 
    fontSize: '2rem',
    letterSpacing: '2px', 
    color: skopelosColors.oceanBlue,
  },
  
  cardTitle: {
    fontFamily: skopelosFonts.titles,
    fontWeight: 400, 
    fontSize: '1.5rem',
    letterSpacing: '1px', 
    color: skopelosColors.oceanBlue,
  },

  chapterTitle: {
    fontFamily: skopelosFonts.titles, 
    fontSize: { xs: '1.8rem', md: '2.4rem' },
    letterSpacing: '0.03em', 
    lineHeight: 1.2,
    mt:5,
    color: skopelosColors.text.primary,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 3,
    '&:hover': {
      color: skopelosColors.oceanBlue,
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
  fontSize: { xs: '1rem', md: '1.1rem' },
  lineHeight: 1.5,
  fontWeight: 1000,
  letterSpacing: '0.01sem',
  color: skopelosColors.seaGreen,
  marginBottom: 4,
  width: '100%',           
  maxWidth: '100%',         
  backgroundColor: 'rgba(130, 206, 209, 1)',
  padding: 3,
  boxSizing: 'border-box',  
  '& p': {
    margin: 0,
    marginBottom: 2,
  }
},

  storyboardTitle: {
    fontFamily: skopelosFonts.text,
    fontWeight: 600, 
    letterSpacing: '0.05em',
    textAlign:'center', 
    opacity: 1,
    fontSize: '0.875rem',
    color: skopelosColors.text.primary,
    
  },

  quoteText: {
    fontFamily: skopelosFonts.text,fontSize: { xs: '1.1rem', md: '1.7rem' },
    color: skopelosColors.seaGreen,
    maxWidth: '600px',
    mx: 'auto',
    lineHeight: 2,
    letterSpacing: '0.05em',
    fontWeight: 700,
  },
};