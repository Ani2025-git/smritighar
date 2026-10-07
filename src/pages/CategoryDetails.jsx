import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Layers, Compass } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useMuseumData } from '../context/MuseumDataContext';
import { categories } from '../data/categories';
import ObjectCard from '../components/ObjectCard';

const CategoryDetails = () => {
  const { slug } = useParams();
  const { t, tCategory } = useTranslation();
  const { objects } = useMuseumData();
  const category = categories.find((c) => c.slug === slug);

  // Filter objects belonging to this category
  const categoryObjects = objects.filter(
    (o) => category && o.category.toLowerCase() === category.name.toLowerCase()
  );

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-cream">Category Not Found</h2>
        <p className="text-parchment-dark">The requested museum category does not exist in our archives.</p>
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-gold text-museum-950 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </Link>
      </div>
    );
  }

  const displayName = tCategory(category.name);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-xs text-parchment-dark">
        <Link to="/categories" className="hover:text-amber-gold transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('nav.categories')}</span>
        </Link>
        <span>/</span>
        <span className="text-amber-gold font-medium">{displayName}</span>
      </div>

      {/* CATEGORY BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-gold/30 shadow-museum bg-wood-dark">
        <div className="absolute inset-0 bg-cover bg-center filter brightness-[0.35] sepia-[0.3]" style={{ backgroundImage: `url(${category.image})` }}></div>
        <div className="relative z-10 p-8 sm:p-12 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-museum-950/80 border border-amber-gold/40 text-amber-gold text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Exhibition Hall</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-cream">
            {displayName}
          </h1>
          <p className="text-parchment text-base sm:text-lg leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* OBJECTS IN CATEGORY */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-amber-gold/20 pb-4">
          <h2 className="font-serif text-2xl font-bold text-cream">
            Category Objects ({categoryObjects.length})
          </h2>
          <Link to="/explore" className="text-xs text-amber-gold hover:underline">
            View All Museum Archives →
          </Link>
        </div>

        {categoryObjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryObjects.map((obj) => (
              <ObjectCard key={obj.id} object={obj} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-wood-dark/40 rounded-2xl border border-amber-gold/20 space-y-3">
            <Compass className="w-10 h-10 text-amber-gold/40 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-cream">No Demo Objects in this Category Yet</h3>
            <p className="text-parchment-dark text-sm">
              We are continuously curating more historical artifacts for the {category.name} exhibition.
            </p>
            <Link
              to="/explore"
              className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-amber-gold text-museum-950 font-bold text-xs"
            >
              Explore Full Museum
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default CategoryDetails;
