import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Landmark, Search, Menu, X, Sparkles, BookOpen } from 'lucide-react';
import SearchBarModal from './SearchBarModal';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Categories', path: '/categories' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Then vs Now', path: '/then-vs-now' },
    { name: 'Student Corner', path: '/student-corner' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-museum-950/90 backdrop-blur-md border-b border-amber-gold/20 shadow-museum transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-lg bg-wood-dark border border-amber-gold/40 flex items-center justify-center shadow-gold-glow group-hover:border-amber-gold transition-colors">
                <Landmark className="w-6 h-6 text-amber-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wide text-cream group-hover:text-amber-goldLight transition-colors">
                  SmritiGhar
                </span>
                <span className="text-[11px] font-sans tracking-widest text-parchment-dark uppercase">
                  Museum of Forgotten Things
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
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
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-lg bg-wood-dark/60 text-parchment hover:text-amber-gold border border-amber-gold/20 hover:border-amber-gold/50 transition-all cursor-pointer"
                title="Search Museum Archives"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-goldDark via-amber-gold to-amber-goldLight text-museum-950 font-semibold text-sm shadow-gold-glow hover:opacity-95 transition-opacity"
              >
                <Sparkles className="w-4 h-4 text-museum-950" />
                <span>Explore Museum</span>
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg bg-wood-dark/60 text-parchment hover:text-amber-gold border border-amber-gold/20"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-lg bg-wood-dark text-parchment border border-amber-gold/30 hover:text-amber-gold"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-museum-900 border-b border-amber-gold/30 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.name}
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
                Explore Museum Catalogue
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
