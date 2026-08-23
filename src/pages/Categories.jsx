import React from 'react';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';
import CategoryCard from '../components/CategoryCard';

const Categories = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-gold font-semibold">
          {t('featuredCollections.badge')}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-cream">
          {t('nav.categories')}
        </h1>
        <p className="text-parchment-dark text-base sm:text-lg leading-relaxed">
          {t('featuredCollections.subtitle')}
        </p>
      </div>

      {/* CATEGORIES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

    </div>
  );
};

export default Categories;
