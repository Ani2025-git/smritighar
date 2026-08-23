import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { Landmark, Shield, GraduationCap, Sparkles, Scroll, ArrowRight } from 'lucide-react';
import CreatorSection from '../components/CreatorSection';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-gold font-semibold flex items-center justify-center gap-1.5">
          <Landmark className="w-4 h-4" />
          <span>Educational Museum Manifesto</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-cream">
          {t('about.title')}
        </h1>
        <p className="font-serif italic text-amber-goldLight text-xl sm:text-2xl">
          {t('about.tagline')}
        </p>
      </div>

      {/* MANIFESTO MAIN TEXT */}
      <section className="bg-wood-dark/70 rounded-3xl p-8 sm:p-12 border border-amber-gold/30 shadow-museum space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Scroll className="w-64 h-64 text-amber-gold" />
        </div>

        <div className="max-w-4xl space-y-6 text-parchment-light text-base sm:text-lg leading-relaxed font-sans relative z-10">
          <p className="text-xl sm:text-2xl font-serif text-cream leading-snug border-l-4 border-amber-gold pl-4 py-1 italic">
            "{t('about.manifesto')}"
          </p>

          <p>
            <strong>SmritiGhar</strong> (Hindi for <em>House of Memories</em>) was created as a digital educational museum where students, teachers, and curious visitors from across the globe can discover these objects and learn about their history, working principles, social impact, and technological evolution.
          </p>

          <p className="text-parchment-dark text-sm sm:text-base">
            In our rapidly accelerating digital world, we often take modern smartphones, wireless internet, and cloud storage for granted. By exploring the physical objects that preceded modern conveniences, students gain a deeper respect for human innovation, mechanical ingenuity, and cultural history.
          </p>
        </div>
      </section>

      {/* MISSION CARDS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-gold font-semibold">Our Core Pillars</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream">
            {t('about.tagline')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 1: PRESERVE */}
          <div className="bg-wood-dark/60 p-8 rounded-3xl border border-amber-gold/30 shadow-museum space-y-4 text-center hover:border-amber-gold/70 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-museum-950 border border-amber-gold/40 flex items-center justify-center mx-auto text-amber-gold group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-cream group-hover:text-amber-gold">
              {t('about.preserve')}
            </h3>
            <p className="text-xs sm:text-sm text-parchment-dark leading-relaxed font-sans">
              {t('about.preserveDesc')}
            </p>
          </div>

          {/* CARD 2: EDUCATE */}
          <div className="bg-wood-dark/60 p-8 rounded-3xl border border-amber-gold/30 shadow-museum space-y-4 text-center hover:border-amber-gold/70 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-museum-950 border border-amber-gold/40 flex items-center justify-center mx-auto text-amber-gold group-hover:scale-110 transition-transform">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-cream group-hover:text-amber-gold">
              {t('about.educate')}
            </h3>
            <p className="text-xs sm:text-sm text-parchment-dark leading-relaxed font-sans">
              {t('about.educateDesc')}
            </p>
          </div>

          {/* CARD 3: INSPIRE */}
          <div className="bg-wood-dark/60 p-8 rounded-3xl border border-amber-gold/30 shadow-museum space-y-4 text-center hover:border-amber-gold/70 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-museum-950 border border-amber-gold/40 flex items-center justify-center mx-auto text-amber-gold group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-cream group-hover:text-amber-gold">
              {t('about.inspire')}
            </h3>
            <p className="text-xs sm:text-sm text-parchment-dark leading-relaxed font-sans">
              {t('about.inspireDesc')}
            </p>
          </div>

        </div>
      </section>

      {/* MEET THE DEVELOPER / ABOUT US */}
      <CreatorSection />

      {/* EXPLORE CTA */}
      <section className="bg-parchment-pattern text-ink-dark rounded-3xl p-8 sm:p-12 border-2 border-amber-gold shadow-museum text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-ink-dark">
          Begin Your Historical Exploration
        </h2>
        <p className="max-w-2xl mx-auto text-ink-medium text-sm sm:text-base">
          Browse through our digital galleries, timeline tracks, and comparative Then vs Now archives.
        </p>
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-wood-dark text-amber-gold font-bold text-sm shadow-md hover:bg-wood-light transition-colors"
          >
            <span>{t('hero.exploreBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
