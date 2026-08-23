import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import bn from '../locales/bn.json';
import hi from '../locales/hi.json';

const translations = { en, bn, hi };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('smritighar_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('smritighar_lang', language);
  }, [language]);

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguage(langCode);
    }
  };

  // Helper function to resolve nested keys like "nav.home"
  const t = (key) => {
    const currentDict = translations[language] || translations.en;
    const fallbackDict = translations.en;

    const keys = key.split('.');
    
    let result = currentDict;
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        result = undefined;
        break;
      }
    }

    // Fallback to English if translation missing
    if (result === undefined) {
      let fallbackResult = fallbackDict;
      for (const k of keys) {
        if (fallbackResult && fallbackResult[k] !== undefined) {
          fallbackResult = fallbackResult[k];
        } else {
          fallbackResult = key;
          break;
        }
      }
      return fallbackResult;
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return {
    t: context.t,
    i18n: {
      language: context.language,
      changeLanguage: context.changeLanguage,
    },
  };
};
