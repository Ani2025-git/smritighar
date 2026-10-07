import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { useMuseumData } from '../context/MuseumDataContext';
import { 
  ArrowLeft, Clock, MapPin, Wrench, RefreshCw, Lightbulb, 
  HelpCircle, History as HistoryIcon, Map, Award, Sparkles,
  Volume2, VolumeX, Play, Pause, Square, FileText, Printer, X, Check
} from 'lucide-react';
import StudentNote from '../components/StudentNote';
import EvolutionDiagram from '../components/EvolutionDiagram';
import ObjectCard from '../components/ObjectCard';

const ObjectDetails = () => {
  const { slug } = useParams();
  const { t, tCategory, tObjectName, i18n } = useTranslation();
  const { objects } = useMuseumData();
  const object = objects.find((o) => o.slug === slug);

  // Audio Guide & Placard States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [showPlacard, setShowPlacard] = useState(false);
  const [copiedPlacard, setCopiedPlacard] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!object) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-cream">Object Not Found</h2>
        <p className="text-parchment-dark">The requested museum object could not be found in our archives.</p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-gold text-museum-950 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Museum Catalogue</span>
        </Link>
      </div>
    );
  }

  const displayName = tObjectName(object.name);
  const displayCategory = tCategory(object.category);

  // Audio Guide toggle handler
  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Curator Audio Guide is not supported in this browser.');
      return;
    }

    if (isPlayingAudio && !isAudioPaused) {
      window.speechSynthesis.pause();
      setIsAudioPaused(true);
      return;
    }

    if (isAudioPaused) {
      window.speechSynthesis.resume();
      setIsAudioPaused(false);
      return;
    }

    window.speechSynthesis.cancel();
    const narrationText = `${displayName}. ${displayCategory}. Historical Era: ${object.era}. ${object.shortDescription}. About this artifact: ${object.whatIsIt}. Historical origin: ${object.history}. Operational mechanism: ${object.howItWorked}. Why it was essential: ${object.importance}. Modern equivalent: ${object.modernEquivalent}.`;
    
    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const targetLang = i18n?.language || 'en';
    const matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(targetLang));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsAudioPaused(false);
  };

  const handleStopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsAudioPaused(false);
  };

  const handleCopyPlacardText = () => {
    const placardText = `[SMRITIGHAR ARCHIVAL EXHIBITION PLACARD]\nAccession ID: SG-OBJ-${object.id}\nArtifact: ${displayName}\nCategory: ${displayCategory}\nEra: ${object.era} (${object.year})\nOrigin: ${object.origin}\nModern Replacement: ${object.modernEquivalent}\n\nSummary:\n"${object.shortDescription}"\n\nPreserved at: SmritiGhar Museum (https://smritighar.org)`;
    navigator.clipboard.writeText(placardText);
    setCopiedPlacard(true);
    setTimeout(() => setCopiedPlacard(false), 2000);
  };

  // Get related objects from same category or era (excluding current)
  const relatedObjects = objects
    .filter((o) => o.id !== object.id && (o.category === object.category || o.era === object.era))
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* BREADCRUMB & BACK LINK */}
      <div className="flex items-center justify-between text-xs text-parchment-dark border-b border-amber-gold/20 pb-4">
        <Link to="/explore" className="hover:text-amber-gold flex items-center gap-1.5 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>{t('details.backToArchive')}</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-amber-gold">{displayCategory}</span>
          <span>/</span>
          <span className="text-cream">{displayName}</span>
        </div>
      </div>

      {/* EXHIBIT HERO BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-wood-dark/80 rounded-3xl p-6 sm:p-10 border border-amber-gold/40 shadow-museum relative overflow-hidden">
        
        {/* IMAGE DISPLAY */}
        <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-amber-gold/40 shadow-cabinet">
          <img
            src={object.image}
            alt={displayName}
            className="w-full h-full object-cover sepia-hover"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-museum-950/90 border border-amber-gold/40 text-amber-gold text-xs font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{object.era}</span>
          </div>
        </div>

        {/* METADATA SUMMARY */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-gold/10 text-amber-gold text-xs font-semibold uppercase tracking-widest mb-2 border border-amber-gold/20">
              <Award className="w-3.5 h-3.5" />
              <span>{displayCategory}</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-cream leading-tight">
              {displayName}
            </h1>
            <p className="text-parchment text-base mt-2 italic font-serif">
              "{object.shortDescription}"
            </p>
          </div>

          {/* QUICK METADATA GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-amber-gold/20 text-xs">
            <div className="bg-museum-950/60 p-3 rounded-xl border border-amber-gold/20">
              <span className="text-parchment-dark/70 block uppercase tracking-wider text-[10px]">{t('details.approxYears')}</span>
              <span className="font-semibold text-cream text-sm mt-0.5 block">{object.year}</span>
            </div>

            <div className="bg-museum-950/60 p-3 rounded-xl border border-amber-gold/20">
              <span className="text-parchment-dark/70 block uppercase tracking-wider text-[10px]">{t('details.origin')}</span>
              <span className="font-semibold text-cream text-sm mt-0.5 block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-gold" />
                {object.origin}
              </span>
            </div>

            <div className="bg-museum-950/60 p-3 rounded-xl border border-amber-gold/20 col-span-2 sm:col-span-1">
              <span className="text-parchment-dark/70 block uppercase tracking-wider text-[10px]">{t('details.modernEquivalent')}</span>
              <span className="font-semibold text-amber-gold text-sm mt-0.5 block flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                {object.modernEquivalent}
              </span>
            </div>
          </div>

          {/* FEATURE ACTION BAR: AUDIO GUIDE & EXHIBIT PLACARD */}
          <div className="pt-4 border-t border-amber-gold/20 flex flex-wrap items-center gap-3">
            {/* AUDIO GUIDE PLAYER BUTTON */}
            <div className="inline-flex items-center gap-2 bg-museum-950/80 p-1.5 rounded-xl border border-amber-gold/30">
              <button
                onClick={handleToggleAudio}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-goldDark to-amber-gold text-museum-950 font-bold text-xs flex items-center gap-1.5 shadow-gold-glow hover:opacity-90 cursor-pointer"
              >
                {isPlayingAudio && !isAudioPaused ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause Audio Guide</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isAudioPaused ? 'Resume Audio Guide' : 'Curator Audio Guide'}</span>
                  </>
                )}
              </button>

              {isPlayingAudio && (
                <>
                  <button
                    onClick={handleStopAudio}
                    className="p-1.5 rounded-lg hover:bg-wood-dark text-parchment hover:text-amber-gold cursor-pointer"
                    title="Stop Audio"
                  >
                    <Square className="w-3.5 h-3.5" />
                  </button>
                  <span className="flex items-center gap-1 px-2 text-[10px] font-mono text-amber-gold animate-pulse">
                    <span className="inline-block w-1.5 h-3 bg-amber-gold animate-bounce"></span>
                    <span className="inline-block w-1.5 h-4 bg-amber-gold animate-bounce delay-100"></span>
                    <span className="inline-block w-1.5 h-2 bg-amber-gold animate-bounce delay-200"></span>
                    <span>Narrating...</span>
                  </span>
                </>
              )}
            </div>

            {/* PLACARD BUTTON */}
            <button
              onClick={() => setShowPlacard(true)}
              className="px-3.5 py-2 rounded-xl bg-wood-dark/80 hover:bg-wood-dark text-cream border border-amber-gold/30 hover:border-amber-gold text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-amber-gold" />
              <span>Archival Placard</span>
            </button>
          </div>

        </div>

      </div>

      {/* ARCHIVAL EXHIBITION PLACARD MODAL */}
      {showPlacard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-museum-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-wood-dark border-2 border-amber-gold rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-museum space-y-6 relative">
            <button
              onClick={() => setShowPlacard(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-parchment hover:text-amber-gold hover:bg-museum-950/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-amber-gold/20 pb-4 text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-gold block">Official Exhibition Label</span>
              <h3 className="font-serif text-2xl font-bold text-cream">{displayName}</h3>
              <span className="font-mono text-xs text-parchment-dark">Catalog ID: SG-OBJ-{object.id}</span>
            </div>

            <div className="p-4 rounded-2xl bg-parchment-light text-ink-dark space-y-3 font-serif text-sm shadow-inner">
              <div className="flex justify-between border-b border-ink-dark/15 pb-2 text-xs">
                <span><strong>Origin:</strong> {object.origin}</span>
                <span><strong>Period:</strong> {object.year}</span>
              </div>
              <p className="italic leading-relaxed font-sans text-xs">
                "{object.whatIsIt}"
              </p>
              <div className="pt-2 border-t border-ink-dark/15 flex justify-between items-center text-[10px] uppercase tracking-wider font-sans font-bold text-ink-muted">
                <span>Accession: Permanent Collection</span>
                <span>SmritiGhar Museum</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handleCopyPlacardText}
                className="px-4 py-2 rounded-xl bg-museum-950 text-amber-gold border border-amber-gold/30 hover:border-amber-gold text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {copiedPlacard ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
                <span>{copiedPlacard ? 'Copied Label!' : 'Copy Placard'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-amber-gold text-museum-950 font-bold text-xs shadow-gold-glow flex items-center gap-1.5 hover:bg-amber-goldLight cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Placard</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STUDENT QUICK NOTES HIGHLIGHT BOX */}
      <StudentNote notes={object.quickNotes} title={`${t('details.studentQuickNotes')}: ${displayName}`} />

      {/* EDUCATIONAL DETAILED SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN EDUCATIONAL TEXT (2 COLS) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECTION 1: WHAT IS IT */}
          <section className="bg-wood-dark/50 p-6 sm:p-8 rounded-2xl border border-amber-gold/20 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-gold border-b border-amber-gold/20 pb-3">
              <HelpCircle className="w-5 h-5" />
              <h2 className="font-serif text-2xl font-bold text-cream">{t('details.whatIsIt')}</h2>
            </div>
            <p className="text-parchment-light text-base leading-relaxed font-sans pt-2">
              {object.whatIsIt}
            </p>
          </section>

          {/* SECTION 2: HISTORY */}
          <section className="bg-wood-dark/50 p-6 sm:p-8 rounded-2xl border border-amber-gold/20 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-gold border-b border-amber-gold/20 pb-3">
              <HistoryIcon className="w-5 h-5" />
              <h2 className="font-serif text-2xl font-bold text-cream">{t('details.history')}</h2>
            </div>
            <p className="text-parchment-light text-base leading-relaxed font-sans pt-2">
              {object.history}
            </p>
          </section>

          {/* SECTION 3: HOW DID IT WORK */}
          <section className="bg-wood-dark/50 p-6 sm:p-8 rounded-2xl border border-amber-gold/20 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-gold border-b border-amber-gold/20 pb-3">
              <Wrench className="w-5 h-5" />
              <h2 className="font-serif text-2xl font-bold text-cream">{t('details.howItWorked')}</h2>
            </div>
            <p className="text-parchment-light text-base leading-relaxed font-sans pt-2">
              {object.howItWorked}
            </p>
          </section>

          {/* SECTION 4: WHERE WAS IT USED & WHY IMPORTANT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-wood-dark/50 p-6 rounded-2xl border border-amber-gold/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-gold mb-2">
                <Map className="w-4 h-4" />
                <h3 className="font-serif text-xl font-bold text-cream">{t('details.whereUsed')}</h3>
              </div>
              <p className="text-parchment-dark text-sm leading-relaxed">
                {object.whereUsed}
              </p>
            </div>

            <div className="bg-wood-dark/50 p-6 rounded-2xl border border-amber-gold/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-gold mb-2">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-serif text-xl font-bold text-cream">{t('details.importance')}</h3>
              </div>
              <p className="text-parchment-dark text-sm leading-relaxed">
                {object.importance}
              </p>
            </div>
          </div>

          {/* SECTION 5: WHAT REPLACED IT (EVOLUTION DIAGRAM) */}
          <EvolutionDiagram steps={object.evolutionChain} title={`${t('details.whatReplacedIt')} ${displayName}`} />

        </div>

        {/* SIDEBAR: DID YOU KNOW? FACT CARDS */}
        <div className="space-y-6">
          <div className="bg-wood-dark/80 p-6 rounded-2xl border-2 border-amber-gold/40 shadow-museum space-y-4">
            <div className="flex items-center gap-2 text-amber-gold border-b border-amber-gold/20 pb-3">
              <Lightbulb className="w-5 h-5 text-amber-gold" />
              <h3 className="font-serif text-xl font-bold text-cream">{t('details.didYouKnow')}</h3>
            </div>

            <div className="space-y-3">
              {object.facts.map((fact, i) => (
                <div key={i} className="p-4 rounded-xl bg-museum-950/70 border border-amber-gold/20 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-gold">
                    Trivia Fact #{i + 1}
                  </span>
                  <p className="text-xs text-parchment-light leading-relaxed">
                    "{fact}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CURATOR KEY INFO CARD */}
          <div className="p-5 rounded-xl bg-museum-950 border border-amber-gold/20 text-xs space-y-2 text-parchment-dark">
            <div className="font-serif text-sm font-semibold text-amber-gold">
              Museum Archival Record
            </div>
            <p>Catalog ID: <span className="font-mono text-cream">SG-OBJ-{object.id}</span></p>
            <p>Inventor: <span className="text-cream">{object.inventor || "Traditional Craftsmanship"}</span></p>
            <p>Preservation Status: <span className="text-emerald-400">Digitally Archived</span></p>
          </div>
        </div>

      </div>

      {/* RELATED OBJECTS SECTION */}
      {relatedObjects.length > 0 && (
        <section className="pt-8 border-t border-amber-gold/20 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-cream">{t('details.relatedObjects')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedObjects.map((rel) => (
              <ObjectCard key={rel.id} object={rel} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ObjectDetails;
