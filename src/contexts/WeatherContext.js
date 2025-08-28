import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const { i18n } = useTranslation();
  const locale = i18n.language || 'el';

  useEffect(() => {
    async function fetchWeather() {
      try {
        const apiKey = "7927d486f1d246f1a2e81847252507";
        const location = "39.1236,23.7348"; // Skopelos coordinates
        
        // Map locale to supported WeatherAPI languages
        const getWeatherLang = (locale) => {
          const langMap = {
            'el': 'el',
            'en': 'en',
            'gr': 'el'
          };
          return langMap[locale] || 'en';
        };
        
        const weatherLang = getWeatherLang(locale);
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&lang=${weatherLang}`;
        
        
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
        } else {
          setWeather(null);
        }
        
      } catch (err) {
        setWeather(null);
      }
    }
    
    fetchWeather();
  }, [locale]);

  return (
    <WeatherContext.Provider value={weather}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);