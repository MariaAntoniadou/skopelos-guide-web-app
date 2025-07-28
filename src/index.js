import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { AuthProvider } from './contexts/AuthContexts'; 
import './i18n';
import 'leaflet/dist/leaflet.css';
import { WeatherProvider } from './contexts/WeatherContext';


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider> 
        <WeatherProvider>
          <App />
        </WeatherProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);