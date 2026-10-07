import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import bn from './locales/bn.json';
import hi from './locales/hi.json';

const resources = {
  en: { translation: en },
  bn: { translation: bn },
  hi: { translation: hi },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'bn', 'hi'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'smritighar_lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
