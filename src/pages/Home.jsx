import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, Compass, BookOpen, Layers, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { objects } from '../data/objects';
import { categories } from '../data/categories';
import ObjectCard from '../components/ObjectCard';
import CategoryCard from '../components/CategoryCard';
import CreatorSection from '../components/CreatorSection';

const Home = () => {
  // Get featured categories (top 6 requested)
  const featuredCategorySlugs = ['communication', 'technology', 'home-living', 'photography', 'education', 'entertainment'];
  const featuredCategories = categories.filter((c) => featuredCategorySlugs.includes(c.slug));

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-museum-950 border-b border-amber-gold/30">
        {/* Background Image with Dark Vignette */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.35] sepia-[0.25] scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=2000&q=80')`
          }}
        ></div>

        {/* Museum Spotlight Gradient & Dust Particles Effect */}
        <div className="absolute inset-0 bg-spotlight pointer-events-none animate-spotlight"></div>
        <div className="absolute inset-0 bg-vignette pointer-events-none"></div>

        {/* Floating Sparkle/Dust Motifs */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-amber-gold/40 animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-amber-gold/30 blur-xs animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-parchment/30 animate-pulse"></div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 py-16">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-wood-dark/80 border border-amber-gold/40 text-amber-gold text-xs uppercase tracking-widest shadow-gold-glow animate-fadeIn">
            <Sparkles className="w-4 h-4 text-amber-gold" />
            <span>Educational Digital Museum & Knowledge Archive</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-cream tracking-tight leading-none drop-shadow-md">
            Things We Once Lived With<span className="text-amber-gold">.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-parchment font-sans leading-relaxed font-normal drop-shadow">
            A digital museum preserving the objects, technologies, and everyday items that shaped the lives of previous generations.
          </p>

          <div className="font-serif italic text-amber-goldLight text-xl tracking-wider">
            Explore. Learn. Remember.
          </div>

          {/* BUTTONS */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-goldDark via-amber-gold to-amber-goldLight text-museum-950 font-bold text-base shadow-gold-glow hover:scale-105 transition-all cursor-pointer"
            >
              <Compass className="w-5 h-5 text-museum-950" />
              <span>Explore Museum</span>
            </Link>

            <Link
              to="/timeline"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-wood-dark/90 text-cream hover:text-amber-gold font-semibold text-base border border-amber-gold/40 hover:border-amber-gold shadow-museum hover:scale-105 transition-all cursor-pointer"
            >
              <Clock className="w-5 h-5 text-amber-gold" />
              <span>Browse Timeline</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-gold font-semibold">Exhibition Galleries</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream">
            Treasures Worth Remembering
          </h2>
          <p className="text-parchment-dark text-base">
            Discover objects that were once an irreplaceable part of everyday life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED OBJECTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-museum-pattern py-12 rounded-3xl border border-amber-gold/20 shadow-museum">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-amber-gold/20 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-gold font-semibold uppercase tracking-widest mb-1">
              <Award className="w-4 h-4" />
              <span>Permanent Exhibition</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream">
              Featured Museum Objects
            </h2>
            <p className="text-parchment-dark text-sm mt-1">
              Explore 12 iconic artifacts from previous generations.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-amber-gold hover:text-amber-goldLight text-sm font-semibold group cursor-pointer"
          >
            <span>View Full Archive ({objects.length} Items)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {objects.map((obj) => (
            <ObjectCard key={obj.id} object={obj} />
          ))}
        </div>
      </section>

      {/* 4. EDUCATIONAL MISSION SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-parchment-pattern text-ink-dark rounded-3xl p-8 sm:p-12 border-2 border-amber-gold shadow-museum relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wood-dark text-amber-gold text-xs font-semibold uppercase tracking-widest">
              <BookOpen className="w-4 h-4" />
              <span>Designed for Students & Schools</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ink-dark leading-tight">
              Bridging Generations Through Historical Objects
            </h2>

            <p className="text-ink-medium text-base sm:text-lg leading-relaxed">
              SmritiGhar serves as a bridge between the past and present. Every object featured includes student-friendly explanations, working mechanisms, historical background, and direct comparisons to modern technologies.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/student-corner"
                className="px-6 py-3 rounded-xl bg-wood-dark text-cream font-bold text-sm hover:bg-wood-light shadow-md transition-colors"
              >
                Open Student Corner
              </Link>
              <Link
                to="/then-vs-now"
                className="px-6 py-3 rounded-xl bg-amber-gold/20 text-ink-dark font-bold text-sm border border-amber-goldDark hover:bg-amber-gold/40 transition-colors"
              >
                Compare Then vs Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT THE DEVELOPER / CREATOR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CreatorSection />
      </div>

    </div>
  );
};

export default Home;
