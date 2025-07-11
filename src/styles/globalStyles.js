import { GlobalStyles } from '@mui/material';
import { skopelosColors } from './colors';

export const SkopelosGlobalStyles = () => (
  <GlobalStyles
    styles={{
      // Reset and base styles
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      
      // HTML and body
      html: {
        height: '100%',
        scrollBehavior: 'smooth',
      },
      
      body: {
        height: '100%',
        backgroundColor: skopelosColors.background.primary,
        color: skopelosColors.text.primary,
        fontFamily: "'Raleway', sans-serif",
        lineHeight: 1.6,
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      },
      
      // Root element
      '#root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      
      // Scrollbar styling
      '::-webkit-scrollbar': {
        width: '12px',
      },
      
      '::-webkit-scrollbar-track': {
        backgroundColor: skopelosColors.background.primary,
      },
      
      '::-webkit-scrollbar-thumb': {
        backgroundColor: skopelosColors.seaGreen,
        borderRadius: '6px',
        border: `2px solid ${skopelosColors.background.primary}`,
      },
      
      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: skopelosColors.brightBlue,
      },
      
      // Link styling
      'a': {
        color: skopelosColors.seaGreen,
        textDecoration: 'none',
        transition: 'color 0.3s ease',
        '&:hover': {
          color: skopelosColors.brightBlue,
        },
      },
      
      // Selection styling
      '::selection': {
        backgroundColor: skopelosColors.seaGreen,
        color: skopelosColors.background.primary,
      },
      
      '::-moz-selection': {
        backgroundColor: skopelosColors.seaGreen,
        color: skopelosColors.background.primary,
      },
      
      // Headings default styling
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: "'Playfair Display', serif",
        fontWeight: 600,
        color: skopelosColors.text.primary,
        marginBottom: '1rem',
      },
      
      // Paragraph styling
      'p': {
        marginBottom: '1rem',
        color: skopelosColors.text.secondary,
      },
      
      // List styling
      'ul, ol': {
        paddingLeft: '1.5rem',
        marginBottom: '1rem',
      },
      
      'li': {
        marginBottom: '0.5rem',
        color: skopelosColors.text.secondary,
      },
      
      // Image styling
      'img': {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
      },
      
      // Button reset
      'button': {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
      },
      
      // Input styling
      'input, textarea': {
        fontFamily: 'inherit',
        fontSize: 'inherit',
        border: `1px solid ${skopelosColors.borders.primary}`,
        borderRadius: '4px',
        padding: '0.5rem',
        backgroundColor: skopelosColors.background.secondary,
        color: skopelosColors.text.primary,
        '&:focus': {
          outline: 'none',
          borderColor: skopelosColors.borders.focus,
          boxShadow: `0 0 0 2px ${skopelosColors.borders.hover}`,
        },
      },
      
      // Loading animation
      '@keyframes pulse': {
        '0%': {
          opacity: 1,
        },
        '50%': {
          opacity: 0.5,
        },
        '100%': {
          opacity: 1,
        },
      },
      
      '@keyframes fadeIn': {
        from: {
          opacity: 0,
          transform: 'translateY(20px)',
        },
        to: {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
      
      '@keyframes slideIn': {
        from: {
          transform: 'translateX(-100%)',
        },
        to: {
          transform: 'translateX(0)',
        },
      },
      
      // Utility classes
      '.fade-in': {
        animation: 'fadeIn 0.6s ease-out',
      },
      
      '.slide-in': {
        animation: 'slideIn 0.5s ease-out',
      },
      
      '.pulse': {
        animation: 'pulse 2s infinite',
      },
      
      // Glass effect utility
      '.glass-effect': {
        backgroundColor: skopelosColors.background.glass,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${skopelosColors.borders.primary}`,
      },
      
      // Shadow utilities
      '.shadow-soft': {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      
      '.shadow-medium': {
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      },
      
      '.shadow-strong': {
        boxShadow: `0 12px 40px ${skopelosColors.borders.hover}`,
      },
      
      // Text utilities
      '.text-glow': {
        textShadow: `0 0 10px ${skopelosColors.brightBlue}`,
      },
      
      '.text-gradient': {
        background: `linear-gradient(45deg, ${skopelosColors.seaGreen}, ${skopelosColors.brightBlue})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    }}
  />
);