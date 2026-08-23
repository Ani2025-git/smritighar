import React from 'react';
import { ExternalLink, Code2, Sparkles, UserCheck } from 'lucide-react';

const CreatorSection = () => {
  return (
    <section className="my-12 bg-wood-dark/90 rounded-3xl p-8 sm:p-10 border-2 border-amber-gold/40 shadow-museum relative overflow-hidden">
      {/* Background spotlight overlay */}
      <div className="absolute inset-0 bg-spotlight pointer-events-none opacity-40"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        
        {/* PROFILE PHOTO WITH ANTIQUE GOLD FRAME */}
        <div className="relative shrink-0">
          <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-amber-gold shadow-gold-glow bg-museum-950 p-1">
            <img
              src="/animesh-mishra.jpg"
              alt="Animesh Mishra"
              className="w-full h-full object-cover rounded-xl sepia-[0.15] hover:sepia-0 transition-all duration-300"
            />
          </div>
          {/* Developer badge tag */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-gold text-museum-950 text-[11px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1 whitespace-nowrap">
            <Code2 className="w-3.5 h-3.5" />
            <span>Creator</span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-4 max-w-2xl">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-gold font-semibold uppercase tracking-widest mb-1">
              <UserCheck className="w-4 h-4 text-amber-gold" />
              <span>About The Developer</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream">
              Animesh Mishra
            </h2>
            <p className="text-amber-goldLight font-sans font-medium text-sm">
              Web Developer
            </p>
          </div>

          <p className="font-serif italic text-parchment-light text-base sm:text-lg leading-relaxed bg-museum-950/60 p-4 rounded-2xl border border-amber-gold/20">
            “I created SmritiGhar to help students and curious people learn about old objects, technologies and memories from the past.”
          </p>

          <div className="pt-2">
            <a
              href="https://github.com/Ani2025-git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-goldDark via-amber-gold to-amber-goldLight text-museum-950 font-bold text-sm shadow-gold-glow hover:scale-105 transition-all cursor-pointer"
            >
              <span>Visit My Website</span>
              <ExternalLink className="w-4 h-4 text-museum-950" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CreatorSection;
