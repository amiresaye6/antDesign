import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true, // Debug only in development
    ns: ['common', 'signup', 'login', 'forgotPassword'], // Define namespaces
    defaultNS: 'common', // Default namespace
    interpolation: {
      escapeValue: false, // React handles escaping
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Dynamic path with namespace
    },
    detection: {
      order: ['navigator', 'localStorage', 'cookie'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;