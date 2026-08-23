import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { Landmark, Search, Menu, X, Sparkles } from 'lucide-react';
import SearchBarModal from './SearchBarModal';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.explore'), path: '/explore' },
    { name: t('nav.categories'), path: '/categories' },
    { name: t('nav.timeline'), path: '/timeline' },
    { name: t('nav.thenVsNow'), path: '/then-vs-now' },
    { name: t('nav.studentCorner'), path: '/student-corner' },
    { name: t('nav.about'), path: '/about' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-museum-950/95 backdrop-blur-md border-b border-amber-gold/20 shadow-museum transition-all duration-300">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-2">
            
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-wood-dark border border-amber-gold/40 flex items-center justify-center shadow-gold-glow group-hover:border-amber-gold transition-colors">
                <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-amber-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-cream group-hover:text-amber-goldLight transition-colors leading-tight">
                  SmritiGhar
                </span>
                <span className="text-[9px] sm:text-[11px] font-sans tracking-widest text-parchment-dark uppercase hidden sm:block">
                  {t('footer.tagline')}
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV LINKS (VISIBLE ON XL / LG) */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-2.5 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      active
                        ? 'text-amber-gold bg-wood-dark/70 border border-amber-gold/30 shadow-inner'
                        : 'text-cream/80 hover:text-amber-goldLight hover:bg-wood-dark/40'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT ACTION BUTTONS */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* LANGUAGE SWITCHER (ALWAYS VISIBLE) */}
              <LanguageSwitcher />

              {/* SEARCH BUTTON */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 sm:p-2.5 rounded-lg bg-wood-dark/60 text-parchment hover:text-amber-gold border border-amber-gold/20 hover:border-amber-gold/50 transition-all cursor-pointer"
                title="Search Museum Archives"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* CTA EXPLORE BUTTON */}
              <Link
                to="/explore"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-amber-goldDark via-amber-gold to-amber-goldLight text-museum-950 font-semibold text-xs sm:text-sm shadow-gold-glow hover:opacity-95 transition-opacity"
              >
                <Sparkles className="w-4 h-4 text-museum-950" />
                <span className="hidden md:inline">{t('nav.exploreMuseum')}</span>
              </Link>

              {/* MOBILE MENU TOGGLE BUTTON (VISIBLE BELOW XL) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg bg-wood-dark text-parchment border border-amber-gold/30 hover:text-amber-gold cursor-pointer ml-1"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>
          </div>
        </div>

        {/* MOBILE & TABLET DRAWER (VISIBLE BELOW XL) */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-museum-900 border-b border-amber-gold/30 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-amber-gold bg-wood-dark border border-amber-gold/30'
                    : 'text-cream/90 hover:bg-wood-dark/50 hover:text-amber-goldLight'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-amber-gold/20 flex flex-col gap-2">
              <Link
                to="/explore"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-lg bg-amber-gold text-museum-950 font-semibold shadow-gold-glow"
              >
                {t('nav.exploreMuseum')}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* SEARCH MODAL */}
      <SearchBarModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
