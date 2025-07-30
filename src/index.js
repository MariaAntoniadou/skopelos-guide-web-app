import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { AuthProvider } from './contexts/AuthContexts'; 
import './i18n';
import 'leaflet/dist/leaflet.css';
import { WeatherProvider } from './contexts/WeatherContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <CssBaseline />
      <AuthProvider> 
        <WeatherProvider>
          <App />
        </WeatherProvider>
      </AuthProvider>
  </React.StrictMode>
);