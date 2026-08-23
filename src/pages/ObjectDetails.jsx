import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Clock, MapPin, Wrench, RefreshCw, Lightbulb, 
  HelpCircle, History as HistoryIcon, Map, Award, Sparkles, BookOpen 
} from 'lucide-react';
import { objects } from '../data/objects';
import StudentNote from '../components/StudentNote';
import EvolutionDiagram from '../components/EvolutionDiagram';
import ObjectCard from '../components/ObjectCard';

const ObjectDetails = () => {
  const { slug } = useParams();
  const object = objects.find((o) => o.slug === slug);

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
          <span>Back to Archive</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-amber-gold">{object.category}</span>
          <span>/</span>
          <span className="text-cream">{object.name}</span>
        </div>
      </div>

      {/* EXHIBIT HERO BANNER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-wood-dark/80 rounded-3xl p-6 sm:p-10 border border-amber-gold/40 shadow-museum relative overflow-hidden">
        
        {/* IMAGE DISPLAY */}
        <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-amber-gold/40 shadow-cabinet">
          <img
            src={object.image}
            alt={object.name}
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
              <span>{object.category} Artifact</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-cream leading-tight">
              {object.name}
            </h1>
            <p className="text-parchment text-base mt-2 italic font-serif">
              "{object.shortDescription}"
            </p>
          </div>

          {/* QUICK METADATA GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-amber-gold/20 text-xs">
            <div className="bg-museum-950/60 p-3 rounded-xl border border-amber-gold/20">
              <span className="text-parchment-dark/70 block uppercase tracking-wider text-[10px]">Approx. Years</span>
              <span className="font-semibold text-cream text-sm mt-0.5 block">{object.year}</span>
            </div>

            <div className="bg-museum-950/60 p-3 rounded-xl border border-amber-gold/20">
              <span className="text-parchment-dark/70 block uppercase tracking-wider text-[10px]">Historical Origin</span>
              <span className="font-semibold text-cream text-sm mt-0.5 block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-gold" />
                {object.origin}
              </span>
            </div>

            <div className="bg-museum-950/60 p-3 rounded-xl border border-amber-gold/20 col-span-2 sm:col-span-1">
              <span className="text-parchment-dark/70 block uppercase tracking-wider text-[10px]">Modern Equivalent</span>
              <span className="font-semibold text-amber-gold text-sm mt-0.5 block flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                {object.modernEquivalent}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* STUDENT QUICK NOTES HIGHLIGHT BOX */}
      <StudentNote notes={object.quickNotes} title={`Student Quick Notes: ${object.name}`} />

      {/* EDUCATIONAL DETAILED SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN EDUCATIONAL TEXT (2 COLS) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECTION 1: WHAT IS IT */}
          <section className="bg-wood-dark/50 p-6 sm:p-8 rounded-2xl border border-amber-gold/20 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-gold border-b border-amber-gold/20 pb-3">
              <HelpCircle className="w-5 h-5" />
              <h2 className="font-serif text-2xl font-bold text-cream">What Is It?</h2>
            </div>
            <p className="text-parchment-light text-base leading-relaxed font-sans pt-2">
              {object.whatIsIt}
            </p>
          </section>

          {/* SECTION 2: HISTORY */}
          <section className="bg-wood-dark/50 p-6 sm:p-8 rounded-2xl border border-amber-gold/20 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-gold border-b border-amber-gold/20 pb-3">
              <HistoryIcon className="w-5 h-5" />
              <h2 className="font-serif text-2xl font-bold text-cream">Historical Origin & Evolution</h2>
            </div>
            <p className="text-parchment-light text-base leading-relaxed font-sans pt-2">
              {object.history}
            </p>
          </section>

          {/* SECTION 3: HOW DID IT WORK */}
          <section className="bg-wood-dark/50 p-6 sm:p-8 rounded-2xl border border-amber-gold/20 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-gold border-b border-amber-gold/20 pb-3">
              <Wrench className="w-5 h-5" />
              <h2 className="font-serif text-2xl font-bold text-cream">How Did It Work?</h2>
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
                <h3 className="font-serif text-xl font-bold text-cream">Where Was It Used?</h3>
              </div>
              <p className="text-parchment-dark text-sm leading-relaxed">
                {object.whereUsed}
              </p>
            </div>

            <div className="bg-wood-dark/50 p-6 rounded-2xl border border-amber-gold/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-gold mb-2">
                <Sparkles className="w-4 h-4" />
                <h3 className="font-serif text-xl font-bold text-cream">Why Was It Important?</h3>
              </div>
              <p className="text-parchment-dark text-sm leading-relaxed">
                {object.importance}
              </p>
            </div>
          </div>

          {/* SECTION 5: WHAT REPLACED IT (EVOLUTION DIAGRAM) */}
          <EvolutionDiagram steps={object.evolutionChain} title={`What Replaced the ${object.name}?`} />

        </div>

        {/* SIDEBAR: DID YOU KNOW? FACT CARDS */}
        <div className="space-y-6">
          <div className="bg-wood-dark/80 p-6 rounded-2xl border-2 border-amber-gold/40 shadow-museum space-y-4">
            <div className="flex items-center gap-2 text-amber-gold border-b border-amber-gold/20 pb-3">
              <Lightbulb className="w-5 h-5 text-amber-gold" />
              <h3 className="font-serif text-xl font-bold text-cream">Did You Know?</h3>
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
          <h2 className="font-serif text-2xl font-bold text-cream">You May Also Like</h2>
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
