import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { ArrowRight, Layers } from 'lucide-react';

const CategoryCard = ({ category }) => {
  const { t, tCategory } = useTranslation();

  const displayName = tCategory(category.name);

  return (
    <div className="bg-wood-dark/70 rounded-xl overflow-hidden border border-amber-gold/20 hover:border-amber-gold/60 shadow-museum hover:shadow-gold-glow transition-all duration-300 flex flex-col group h-full">
      {/* IMAGE */}
      <div className="relative aspect-[16/9] overflow-hidden bg-museum-950">
        <img
          src={category.image}
          alt={displayName}
          className="w-full h-full object-cover sepia-hover opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wood-dark via-transparent to-transparent"></div>
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-museum-950/80 border border-amber-gold/30 text-amber-gold font-sans text-xs flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          <span>{category.count} Artifacts</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-cream group-hover:text-amber-gold transition-colors">
            {displayName}
          </h3>
          <p className="text-xs text-parchment-dark leading-relaxed font-sans mt-2">
            {category.description}
          </p>
        </div>

        {/* LINK */}
        <Link
          to={`/category/${category.slug}`}
          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-museum-950 border border-amber-gold/30 hover:border-amber-gold hover:bg-wood-dark text-amber-gold text-xs font-semibold transition-all group-hover:text-amber-goldLight"
        >
          <span>{t('featuredCollections.exploreCategory')}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
