import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { Landmark, Compass, Heart, Scroll } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-wood-deep text-cream border-t border-amber-gold/30 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-spotlight pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* COL 1: BRAND */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-wood-dark border border-amber-gold/40 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-amber-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-cream">SmritiGhar</span>
                <span className="text-[10px] font-sans text-amber-gold uppercase tracking-widest">{t('footer.tagline')}</span>
              </div>
            </div>
            <p className="text-sm text-parchment-dark leading-relaxed font-sans">
              {t('footer.description')}
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-amber-gold bg-museum-950/60 px-3 py-1.5 rounded-full border border-amber-gold/20">
              <Scroll className="w-3.5 h-3.5" />
              <span>{t('hero.badge')}</span>
            </div>
          </div>

          {/* COL 2: EXHIBITION HALLS */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-amber-gold mb-4 border-b border-amber-gold/20 pb-2">
              {t('featuredCollections.badge')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/explore" className="text-cream/80 hover:text-amber-gold transition-colors">
                  {t('nav.explore')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-cream/80 hover:text-amber-gold transition-colors">
                  {t('nav.categories')}
                </Link>
              </li>
              <li>
                <Link to="/timeline" className="text-cream/80 hover:text-amber-gold transition-colors">
                  {t('nav.timeline')}
                </Link>
              </li>
              <li>
                <Link to="/then-vs-now" className="text-cream/80 hover:text-amber-gold transition-colors">
                  {t('nav.thenVsNow')}
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: STUDENT CORNER & ABOUT */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-amber-gold mb-4 border-b border-amber-gold/20 pb-2">
              {t('nav.studentCorner')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/student-corner" className="text-cream/80 hover:text-amber-gold transition-colors">
                  {t('nav.studentCorner')}
                </Link>
              </li>
              <li>
                <Link to="/student-corner#project-helper" className="text-cream/80 hover:text-amber-gold transition-colors">
                  {t('studentCorner.projectHelper')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream/80 hover:text-amber-gold transition-colors">
                  {t('about.title')}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-cream/40 hover:text-amber-gold/60 transition-colors text-xs">
                  Curator Admin Panel (Demo)
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: CURATOR'S NOTE */}
          <div className="bg-museum-950/60 p-5 rounded-xl border border-amber-gold/20 flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-base font-semibold text-amber-goldLight mb-2">
                {t('footer.curatorNote')}
              </h4>
              <p className="text-xs text-parchment-dark leading-relaxed italic">
                "{t('footer.curatorQuote')}"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-gold/10 text-[11px] text-amber-gold/80 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>{t('about.tagline')}</span>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 border-t border-amber-gold/20 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment-dark gap-4">
          <p>© 2026 SmritiGhar — {t('footer.tagline')}. {t('footer.rights')}</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-amber-gold fill-amber-gold" /> for students, educators & curious minds.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
