import React, { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Clock, Calendar, Sparkles } from 'lucide-react';
import { eras } from '../data/eras';
import { objects } from '../data/objects';
import ObjectCard from '../components/ObjectCard';

const Timeline = () => {
  const { t } = useTranslation();
  const [activeEraId, setActiveEraId] = useState('all');

  const filteredEras = activeEraId === 'all'
    ? eras
    : eras.filter((e) => e.slug === activeEraId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-gold font-semibold flex items-center justify-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>Chronological Knowledge Archive</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-cream">
          {t('nav.timeline')}
        </h1>
        <p className="text-parchment-dark text-base sm:text-lg leading-relaxed">
          {t('hero.subtitle')}
        </p>
      </div>

      {/* ERA SELECTOR NAVIGATION TABS */}
      <div className="flex items-center justify-center overflow-x-auto py-3 px-2 gap-2 border-b border-amber-gold/20 no-scrollbar">
        <button
          onClick={() => setActiveEraId('all')}
          className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeEraId === 'all'
              ? 'bg-amber-gold text-museum-950 shadow-gold-glow'
              : 'bg-wood-dark/60 text-cream/80 hover:text-amber-gold border border-amber-gold/20'
          }`}
        >
          All Eras (8)
        </button>

        {eras.map((era) => (
          <button
            key={era.id}
            onClick={() => setActiveEraId(era.slug)}
            className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeEraId === era.slug
                ? 'bg-amber-gold text-museum-950 shadow-gold-glow'
                : 'bg-wood-dark/60 text-cream/80 hover:text-amber-gold border border-amber-gold/20'
            }`}
          >
            {era.name}
          </button>
        ))}
      </div>

      {/* TIMELINE ERA BLOCKS */}
      <div className="space-y-16 relative">
        {/* Vertical Timeline Guide Line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-gold/10 via-amber-gold/40 to-amber-gold/10 -translate-x-1/2 pointer-events-none"></div>

        {filteredEras.map((era) => {
          // Get objects belonging to this era
          const eraObjects = objects.filter((o) => o.era.toLowerCase() === era.name.toLowerCase());

          return (
            <div
              key={era.id}
              className="bg-wood-dark/50 rounded-3xl p-6 sm:p-10 border border-amber-gold/30 shadow-museum relative overflow-hidden space-y-8"
            >
              {/* ERA BANNER HEADER */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-amber-gold/20 pb-6 gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-gold uppercase tracking-widest">
                    <Calendar className="w-4 h-4" />
                    <span>Historical Era</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-cream">
                    {era.name}
                  </h2>
                  <p className="font-serif italic text-amber-goldLight text-lg">
                    {era.subtitle}
                  </p>
                </div>
                <p className="max-w-md text-xs sm:text-sm text-parchment-dark leading-relaxed">
                  {era.description}
                </p>
              </div>

              {/* ERA OBJECTS GRID */}
              <div>
                <h3 className="font-serif text-xl font-bold text-cream mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-gold" />
                  <span>Representative Objects of {era.name}</span>
                </h3>

                {eraObjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eraObjects.map((obj) => (
                      <ObjectCard key={obj.id} object={obj} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-parchment-dark italic">
                    Additional artifacts from {era.name} are currently undergoing archival preservation.
                  </p>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Timeline;
