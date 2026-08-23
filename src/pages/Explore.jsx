import React, { useState, useMemo } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Search, RotateCcw, Layers } from 'lucide-react';
import { objects } from '../data/objects';
import { categories } from '../data/categories';
import { eras } from '../data/eras';
import ObjectCard from '../components/ObjectCard';

const Explore = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [sortBy, setSortBy] = useState('a-z');

  // FILTER & SORT LOGIC
  const filteredObjects = useMemo(() => {
    return objects
      .filter((obj) => {
        // Search term
        const matchesSearch =
          !searchTerm ||
          obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.whatIsIt.toLowerCase().includes(searchTerm.toLowerCase());

        // Category
        const matchesCategory =
          selectedCategory === 'all' ||
          obj.category.toLowerCase() === selectedCategory.toLowerCase();

        // Era
        const matchesEra =
          selectedEra === 'all' ||
          obj.era.toLowerCase() === selectedEra.toLowerCase();

        return matchesSearch && matchesCategory && matchesEra;
      })
      .sort((a, b) => {
        if (sortBy === 'a-z') return a.name.localeCompare(b.name);
        if (sortBy === 'z-a') return b.name.localeCompare(a.name);
        if (sortBy === 'oldest') return a.id - b.id;
        if (sortBy === 'newest') return b.id - a.id;
        return 0;
      });
  }, [searchTerm, selectedCategory, selectedEra, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedEra('all');
    setSortBy('a-z');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-gold font-semibold">
          Digital Catalogue & Archives
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-cream">
          {t('hero.exploreBtn')}
        </h1>
        <p className="text-parchment-dark text-base sm:text-lg leading-relaxed">
          {t('hero.subtitle')}
        </p>
      </div>

      {/* SEARCH AND FILTERS BAR */}
      <div className="bg-wood-dark/80 p-6 rounded-2xl border border-amber-gold/30 shadow-museum space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* SEARCH INPUT */}
          <div className="md:col-span-1 relative">
            <Search className="w-5 h-5 text-amber-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('nav.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-museum-950 text-cream placeholder-parchment-dark/50 pl-11 pr-4 py-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none text-sm font-sans"
            />
          </div>

          {/* CATEGORY FILTER */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-museum-950 text-cream py-2.5 px-3.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none text-sm font-sans"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* ERA FILTER */}
          <div>
            <select
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value)}
              className="w-full bg-museum-950 text-cream py-2.5 px-3.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none text-sm font-sans"
            >
              <option value="all">All Eras ({eras.length})</option>
              {eras.map((era) => (
                <option key={era.id} value={era.name}>
                  {era.name}
                </option>
              ))}
            </select>
          </div>

          {/* SORT DROPDOWN */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-museum-950 text-amber-gold font-semibold py-2.5 px-3.5 rounded-xl border border-amber-gold/40 focus:border-amber-gold focus:outline-none text-sm font-sans"
            >
              <option value="a-z">Sort: A to Z</option>
              <option value="z-a">Sort: Z to A</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="newest">Sort: Newest First</option>
            </select>
          </div>
        </div>

        {/* ACTIVE FILTERS AND RESULTS COUNTER */}
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-amber-gold/15 text-xs text-parchment-dark gap-2">
          <span>
            Showing <strong className="text-amber-gold">{filteredObjects.length}</strong> of {objects.length} museum artifacts
          </span>

          {(searchTerm || selectedCategory !== 'all' || selectedEra !== 'all') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-amber-gold hover:text-amber-goldLight cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* OBJECTS GRID */}
      {filteredObjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredObjects.map((obj) => (
            <ObjectCard key={obj.id} object={obj} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-wood-dark/40 rounded-2xl border border-amber-gold/20 space-y-4">
          <Layers className="w-12 h-12 text-amber-gold/40 mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-cream">No Museum Objects Found</h3>
          <p className="text-parchment-dark text-sm max-w-md mx-auto">
            We couldn't find any objects matching your search criteria. Try selecting a different category or clearing filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-xl bg-amber-gold text-museum-950 font-bold text-sm shadow-gold-glow"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
};

export default Explore;
