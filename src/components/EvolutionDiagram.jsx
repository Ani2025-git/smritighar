import React from 'react';
import { ArrowRight, History } from 'lucide-react';

const EvolutionDiagram = ({ steps, title = "Technology Evolution Path" }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="my-8 p-6 rounded-2xl bg-wood-dark/80 border border-amber-gold/40 shadow-museum">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-amber-gold" />
        <h3 className="font-serif text-xl font-bold text-cream">{title}</h3>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3 py-2">
        {steps.map((step, index) => {
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              <div
                className={`px-4 py-2.5 rounded-xl border text-xs md:text-sm font-semibold transition-all ${
                  isFirst
                    ? 'bg-amber-gold/20 border-amber-gold text-amber-goldLight shadow-gold-glow'
                    : isLast
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    : 'bg-museum-950 border-amber-gold/20 text-cream/90'
                }`}
              >
                <div className="text-[10px] uppercase tracking-widest text-parchment-dark/70 font-sans mb-0.5">
                  {isFirst ? 'Vintage Origin' : isLast ? 'Modern Day' : `Stage ${index + 1}`}
                </div>
                <span>{step}</span>
              </div>

              {!isLast && (
                <ArrowRight className="w-4 h-4 text-amber-gold shrink-0 animate-pulse" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default EvolutionDiagram;
