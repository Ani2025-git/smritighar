import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-wood-dark/80 text-parchment hover:text-amber-gold border border-amber-gold/30 hover:border-amber-gold text-xs font-semibold transition-all cursor-pointer shadow-sm"
      >
        <Globe className="w-4 h-4 text-amber-gold" />
        <span>{currentLang.native}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-amber-gold transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-museum-900 border border-amber-gold/40 shadow-museum z-50 overflow-hidden py-1 animate-fadeIn">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                i18n.language === lang.code
                  ? 'bg-amber-gold/20 text-amber-gold font-bold'
                  : 'text-cream/90 hover:bg-wood-dark hover:text-amber-goldLight'
              }`}
            >
              <span>{lang.native}</span>
              {i18n.language === lang.code && <span className="text-amber-gold text-[10px]">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
