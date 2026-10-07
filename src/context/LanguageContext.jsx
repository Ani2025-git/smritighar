import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';
import en from '../locales/en.json';
import bn from '../locales/bn.json';
import hi from '../locales/hi.json';

const translations = { en, bn, hi };

const normalizeLang = (code) => {
  if (!code) return 'en';
  const clean = String(code).split('-')[0].toLowerCase();
  return translations[clean] ? clean : 'en';
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('smritighar_lang') || localStorage.getItem('i18nextLng');
    if (saved) return normalizeLang(saved);
    if (typeof navigator !== 'undefined' && navigator.language) {
      return normalizeLang(navigator.language);
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('smritighar_lang', language);
    localStorage.setItem('i18nextLng', language);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
    if (i18n && i18n.changeLanguage && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const changeLanguage = (langCode) => {
    const cleanCode = normalizeLang(langCode);
    setLanguage(cleanCode);
    localStorage.setItem('smritighar_lang', cleanCode);
    localStorage.setItem('i18nextLng', cleanCode);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = cleanCode;
    }
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(cleanCode);
    }
  };

  // Helper function to resolve nested keys like "nav.home"
  const t = (key) => {
    if (!key) return '';
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

  // Centralized helper to translate category names and slugs
  const tCategory = (nameOrSlug) => {
    if (!nameOrSlug) return '';
    const val = String(nameOrSlug).toLowerCase().trim();
    if (val === 'communication') return t('categories.communication');
    if (val === 'technology') return t('categories.technology');
    if (val === 'home & living' || val === 'home-living' || val === 'homeliving') return t('categories.homeLiving');
    if (val === 'education' || val === 'education & office') return t('categories.education');
    if (val === 'entertainment') return t('categories.entertainment');
    if (val === 'photography') return t('categories.photography');
    if (val === 'transport') return t('categories.transport');
    if (val === 'money & currency' || val === 'money-currency' || val === 'moneycurrency') return t('categories.moneyCurrency');
    if (val === 'agriculture & village life' || val === 'agriculture-village') return t('categories.agricultureVillage');
    if (val === 'tools & equipment' || val === 'tools-equipment') return t('categories.toolsEquipment');
    return nameOrSlug;
  };

  // Centralized helper to translate object names and slugs
  const tObjectName = (nameOrSlug) => {
    if (!nameOrSlug) return '';
    const val = String(nameOrSlug).toLowerCase();
    if (val.includes('telephone')) return t('objectNames.rotaryTelephone');
    if (val.includes('gramophone')) return t('objectNames.gramophone');
    if (val.includes('radio')) return t('objectNames.vintageRadio');
    if (val.includes('typewriter')) return t('objectNames.typewriter');
    if (val.includes('camera')) return t('objectNames.filmCamera');
    if (val.includes('cassette') || val.includes('walkman')) return t('objectNames.cassettePlayer');
    if (val.includes('television') || val.includes('tv')) return t('objectNames.bwTv');
    if (val.includes('lantern')) return t('objectNames.lantern');
    if (val.includes('floppy')) return t('objectNames.floppyDisk');
    if (val.includes('postcard') || val.includes('letter')) return t('objectNames.postcard');
    if (val.includes('coin')) return t('objectNames.oldCoins');
    if (val.includes('slate')) return t('objectNames.schoolSlate');
    return nameOrSlug;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, tCategory, tObjectName }}>
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
    tCategory: context.tCategory,
    tObjectName: context.tObjectName,
    i18n: {
      language: context.language,
      changeLanguage: context.changeLanguage,
    },
  };
};

