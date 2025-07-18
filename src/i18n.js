import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // loads translations via HTTP (from /locales/{{lng}}/translation.json)
  .use(LanguageDetector) // detects user language automatically
  .use(initReactI18next) // passes i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // fallback language if detection fails
    supportedLngs: ['en', 'el'], // languages you support
    debug: false,
    interpolation: {
      escapeValue: false, // react already escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/translations.json', 
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },
  });

export default i18n;
