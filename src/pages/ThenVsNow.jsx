import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { ArrowRightLeft, CheckCircle, HelpCircle } from 'lucide-react';
import { comparisons } from '../data/comparisons';

const ThenVsNow = () => {
  const { t, tCategory, tObjectName } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-gold font-semibold flex items-center justify-center gap-1.5">
          <ArrowRightLeft className="w-4 h-4" />
          <span>Generational Technology Comparison</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-cream">
          {t('thenVsNow.title')}
        </h1>
        <p className="text-parchment-dark text-base sm:text-lg leading-relaxed">
          {t('thenVsNow.subtitle')}
        </p>
      </div>

      {/* COMPARISON CARDS GRID */}
      <div className="space-y-12">
        {comparisons.map((item) => {
          const oldDisplayName = tObjectName(item.oldName) || item.oldName;
          const categoryDisplayName = tCategory(item.category) || item.category;

          return (
            <div
              key={item.id}
              className="bg-wood-dark/70 rounded-3xl overflow-hidden border border-amber-gold/30 shadow-museum p-6 sm:p-8 space-y-6"
            >
              {/* CARD TITLE & CATEGORY */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-gold/20 pb-4 gap-2">
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
                    {oldDisplayName} <span className="text-amber-gold font-sans font-normal text-xl px-2">vs</span> {item.newName}
                  </h2>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-museum-950 border border-amber-gold/30 text-amber-gold text-xs font-semibold">
                  {categoryDisplayName}
                </span>
              </div>

              {/* SIDE BY SIDE IMAGES AND DESCRIPTIONS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* THEN (OLD OBJECT) */}
                <div className="bg-museum-950/80 p-5 rounded-2xl border border-amber-gold/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md bg-wood-dark border border-amber-gold/40 text-amber-gold font-serif text-sm font-bold">
                      {t('thenVsNow.thenLabel')}
                    </span>
                    <span className="text-xs text-parchment-dark">{oldDisplayName}</span>
                  </div>

                <div className="aspect-[16/9] rounded-xl overflow-hidden border border-amber-gold/30">
                  <img
                    src={item.oldImage}
                    alt={item.oldName}
                    className="w-full h-full object-cover sepia-[0.3]"
                  />
                </div>

                <p className="text-xs sm:text-sm text-parchment-dark leading-relaxed font-sans">
                  {item.oldDescription}
                </p>
              </div>

              {/* NOW (MODERN OBJECT) */}
              <div className="bg-museum-950/80 p-5 rounded-2xl border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-sans text-xs font-bold">
                    {t('thenVsNow.nowLabel')}
                  </span>
                  <span className="text-xs text-emerald-400">{item.newName}</span>
                </div>

                <div className="aspect-[16/9] rounded-xl overflow-hidden border border-emerald-500/30">
                  <img
                    src={item.newImage}
                    alt={item.newName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-xs sm:text-sm text-parchment-dark leading-relaxed font-sans">
                  {item.newDescription}
                </p>
              </div>

            </div>

            {/* WHAT CHANGED & WHY BETTER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-wood-dark border border-amber-gold/20 space-y-1">
                <div className="flex items-center gap-2 text-amber-gold text-xs font-bold uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{t('thenVsNow.whatChanged')}</span>
                </div>
                <p className="text-xs text-cream/90 leading-relaxed">
                  {item.whatChanged}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-wood-dark border border-emerald-500/30 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{t('thenVsNow.whyBetter')}</span>
                </div>
                <p className="text-xs text-cream/90 leading-relaxed">
                  {item.whyBetter}
                </p>
              </div>
            </div>

          </div>
        );
      })}
    </div>

    </div>
  );
};

export default ThenVsNow;
