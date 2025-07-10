import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',  // μπορείς να βάλεις dark αν θες
    primary: {
      main: '#4a148c',  // σκούρο μωβ
    },
    secondary: {
      main: '#ff6f00',  // πορτοκαλί ζεστό
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Dancing Script", serif',
    h1: {
      fontFamily: '"Dancing Script", cursive',
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.6,
      color: '#444',
    },
  },
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);


