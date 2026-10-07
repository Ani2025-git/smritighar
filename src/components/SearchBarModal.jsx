import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag, Clock } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useMuseumData } from '../context/MuseumDataContext';

const SearchBarModal = ({ isOpen, onClose }) => {
  const { t, tCategory, tObjectName } = useTranslation();
  const { objects } = useMuseumData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      return;
    }

    const query = searchTerm.toLowerCase().trim();
    const results = objects.filter((obj) => {
      const translatedName = tObjectName(obj.name).toLowerCase();
      const translatedCat = tCategory(obj.category).toLowerCase();
      return (
        obj.name.toLowerCase().includes(query) ||
        translatedName.includes(query) ||
        obj.category.toLowerCase().includes(query) ||
        translatedCat.includes(query) ||
        obj.era.toLowerCase().includes(query) ||
        obj.shortDescription.toLowerCase().includes(query) ||
        obj.whatIsIt.toLowerCase().includes(query)
      );
    });

    setFilteredResults(results);
  }, [searchTerm, tCategory, tObjectName]);

  if (!isOpen) return null;

  const handleSelectObject = (slug) => {
    onClose();
    setSearchTerm('');
    navigate(`/object/${slug}`);
  };

  const handleQuickTag = (tag) => {
    setSearchTerm(tag);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-museum-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-museum-900 border border-amber-gold/40 rounded-2xl shadow-museum overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER INPUT */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-amber-gold/20 bg-wood-dark/50">
          <Search className="w-5 h-5 text-amber-gold" />
          <input
            type="text"
            placeholder={t('nav.searchPlaceholder') || "Search telephone, radio, camera, 1980s..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-cream placeholder-parchment-dark/60 focus:outline-none font-sans text-base"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-wood-dark text-parchment hover:text-amber-gold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QUICK SEARCH TAGS */}
        {!searchTerm && (
          <div className="p-6 space-y-4">
            <p className="text-xs uppercase tracking-widest text-amber-gold/80 font-semibold">
              Popular Archive Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {['Telephone', 'Radio', 'Camera', '1980s', 'Communication', 'School Slate', 'Gramophone'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleQuickTag(tag)}
                  className="px-3 py-1.5 rounded-lg bg-wood-dark/70 hover:bg-amber-gold/20 text-cream/90 text-xs border border-amber-gold/20 hover:border-amber-gold/50 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3 text-amber-gold" />
                  <span>{tObjectName(tag) || tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS LIST */}
        {searchTerm && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2 divide-y divide-amber-gold/10">
            {filteredResults.length > 0 ? (
              filteredResults.map((obj) => {
                const displayName = tObjectName(obj.name);
                const displayCategory = tCategory(obj.category);
                return (
                  <div
                    key={obj.id}
                    onClick={() => handleSelectObject(obj.slug)}
                    className="p-3 rounded-xl hover:bg-wood-dark/80 transition-colors cursor-pointer flex items-center justify-between group pt-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={obj.image}
                        alt={displayName}
                        className="w-14 h-14 object-cover rounded-lg border border-amber-gold/30 group-hover:border-amber-gold transition-colors"
                      />
                      <div>
                        <h4 className="font-serif text-lg font-semibold text-cream group-hover:text-amber-goldLight transition-colors">
                          {displayName}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-parchment-dark mt-0.5">
                          <span className="text-amber-gold">{displayCategory}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-gold/70" />
                            {obj.era}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-amber-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10 text-parchment-dark text-sm">
                No museum objects found matching "{searchTerm}". Try searching for categories like "Technology" or eras like "1950s".
              </div>
            )}
          </div>
        )}

        {/* FOOTER TIP */}
        <div className="px-6 py-3 bg-museum-950/60 text-xs text-parchment-dark border-t border-amber-gold/10 flex justify-between items-center">
          <span>Press ESC to close</span>
          <span className="text-amber-gold font-medium">{filteredResults.length} archive matches</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBarModal;
