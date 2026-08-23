import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { Clock, ArrowRight } from 'lucide-react';

const ObjectCard = ({ object }) => {
  const { t, i18n } = useTranslation();

  // Helper key translation for object names
  const getTranslatedName = (name) => {
    if (name.includes('Telephone')) return t('objectNames.rotaryTelephone');
    if (name.includes('Gramophone')) return t('objectNames.gramophone');
    if (name.includes('Radio')) return t('objectNames.vintageRadio');
    if (name.includes('Typewriter')) return t('objectNames.typewriter');
    if (name.includes('Camera')) return t('objectNames.filmCamera');
    if (name.includes('Cassette')) return t('objectNames.cassettePlayer');
    if (name.includes('Television') || name.includes('TV')) return t('objectNames.bwTv');
    if (name.includes('Lantern')) return t('objectNames.lantern');
    if (name.includes('Floppy')) return t('objectNames.floppyDisk');
    if (name.includes('Postcard') || name.includes('Letter')) return t('objectNames.postcard');
    if (name.includes('Coin')) return t('objectNames.oldCoins');
    if (name.includes('Slate')) return t('objectNames.schoolSlate');
    return name;
  };

  const displayName = i18n.language !== 'en' ? getTranslatedName(object.name) : object.name;

  return (
    <div className="bg-wood-dark/60 rounded-xl overflow-hidden border border-amber-gold/25 shadow-museum hover:border-amber-gold/80 hover:shadow-gold-glow transition-all duration-300 flex flex-col group h-full">
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[4/3] overflow-hidden bg-museum-950">
        <img
          src={object.image}
          alt={displayName}
          className="w-full h-full object-cover sepia-hover"
          loading="lazy"
        />
        
        {/* ERA BADGE */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-museum-950/85 backdrop-blur-md border border-amber-gold/30 text-amber-gold font-sans text-xs font-semibold flex items-center gap-1.5 shadow-sm">
          <Clock className="w-3 h-3" />
          <span>{object.era}</span>
        </div>

        {/* CATEGORY BADGE */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-wood-dark/85 backdrop-blur-md border border-amber-gold/20 text-cream/90 font-sans text-xs">
          {object.category}
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-cream group-hover:text-amber-goldLight transition-colors">
            {displayName}
          </h3>
          <p className="text-sm text-parchment-dark leading-relaxed font-sans mt-2 line-clamp-2">
            {object.shortDescription}
          </p>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-3 border-t border-amber-gold/15 flex items-center justify-between">
          <span className="text-xs text-amber-gold/80 italic font-serif">
            {t('featuredObjects.replacedBy')}: <span className="font-sans not-italic text-cream/80">{object.modernEquivalent}</span>
          </span>
          
          <Link
            to={`/object/${object.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-gold group-hover:text-amber-goldLight hover:underline cursor-pointer"
          >
            <span>{t('featuredObjects.viewDetails')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ObjectCard;
