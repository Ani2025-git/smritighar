import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  GraduationCap, BookOpen, Lightbulb, History, ArrowRight, 
  CheckCircle2, Bookmark, Award, Copy, Check 
} from 'lucide-react';
import { quickLearningTopics, studentTrivia, evolutionFlows, schoolProjects, objectOfTheWeek } from '../data/studentData';
import EvolutionDiagram from '../components/EvolutionDiagram';

const StudentCorner = () => {
  const { t, i18n } = useTranslation();
  const [copiedIndex, setCopiedIndex] = React.useState(null);

  const handleCopySummary = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

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

  const objectOfWeekName = i18n.language !== 'en' ? getTranslatedName(objectOfTheWeek.name) : objectOfTheWeek.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-parchment-light text-ink-dark font-bold text-xs uppercase tracking-widest border border-amber-gold">
          <GraduationCap className="w-4 h-4 text-amber-goldDark" />
          <span>{t('studentCorner.title')}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-cream">
          {t('studentCorner.title')}
        </h1>
        <p className="text-parchment-dark text-base sm:text-lg leading-relaxed">
          {t('studentCorner.subtitle')}
        </p>
      </div>

      {/* 1. OBJECT OF THE WEEK */}
      <section className="bg-wood-dark/80 rounded-3xl p-6 sm:p-10 border-2 border-amber-gold shadow-museum relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-amber-gold text-museum-950 text-xs font-bold uppercase tracking-widest px-5 py-1.5 rounded-bl-2xl flex items-center gap-1.5">
          <Award className="w-4 h-4" />
          <span>{t('studentCorner.objectOfWeek')}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-amber-gold/40 shadow-cabinet">
            <img
              src={objectOfTheWeek.image}
              alt={objectOfWeekName}
              className="w-full h-full object-cover sepia-hover"
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs text-amber-gold font-semibold uppercase tracking-widest">{t('studentCorner.objectOfWeek')}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-cream">
              {objectOfWeekName} ({objectOfTheWeek.era})
            </h2>
            <p className="text-parchment text-sm leading-relaxed italic bg-museum-950/60 p-4 rounded-xl border border-amber-gold/20">
              "{objectOfTheWeek.curatorNote}"
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-cream/90 pt-2">
              {objectOfTheWeek.facts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-gold shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                to={`/object/${objectOfTheWeek.slug}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-gold text-museum-950 font-bold text-xs shadow-gold-glow hover:bg-amber-goldLight"
              >
                <span>{t('featuredObjects.viewDetails')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK LEARNING CARDS */}
      <section className="space-y-6">
        <div className="border-b border-amber-gold/20 pb-4">
          <h2 className="font-serif text-3xl font-bold text-cream flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-gold" />
            <span>{t('studentCorner.quickLearning')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {quickLearningTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-wood-dark/60 p-6 rounded-2xl border border-amber-gold/25 shadow-museum space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-gold px-2.5 py-1 rounded bg-museum-950 inline-block border border-amber-gold/20">
                  {topic.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-cream">
                  {topic.title}
                </h3>
                <p className="text-xs sm:text-sm text-parchment-dark leading-relaxed font-sans">
                  {topic.summary}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-parchment-light text-ink-dark text-xs font-medium border-l-4 border-amber-goldDark mt-4">
                <strong>Key Takeaway:</strong> {topic.keyTakeaway}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TECHNOLOGY EVOLUTION DIAGRAMS */}
      <section className="space-y-6">
        <div className="border-b border-amber-gold/20 pb-4">
          <h2 className="font-serif text-3xl font-bold text-cream flex items-center gap-2">
            <History className="w-6 h-6 text-amber-gold" />
            <span>{t('studentCorner.evolutionPathways')}</span>
          </h2>
        </div>

        <div className="space-y-6">
          {evolutionFlows.map((flow) => (
            <EvolutionDiagram key={flow.id} steps={flow.steps} title={flow.title} />
          ))}
        </div>
      </section>

      {/* 4. DID YOU KNOW? TRIVIA GRID */}
      <section className="space-y-6">
        <div className="border-b border-amber-gold/20 pb-4">
          <h2 className="font-serif text-3xl font-bold text-cream flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-amber-gold" />
            <span>{t('studentCorner.triviaTitle')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {studentTrivia.map((fact, idx) => (
            <div
              key={idx}
              className="bg-wood-dark/60 p-5 rounded-2xl border border-amber-gold/20 shadow-museum space-y-2 relative overflow-hidden"
            >
              <div className="text-3xl font-serif font-extrabold text-amber-gold/20 absolute top-2 right-4 pointer-events-none">
                #{idx + 1}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-gold block">
                {t('details.didYouKnow')}
              </span>
              <p className="text-xs sm:text-sm text-parchment-light leading-relaxed relative z-10 pt-1">
                "{fact}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SCHOOL PROJECT HELPER */}
      <section id="project-helper" className="bg-parchment-pattern text-ink-dark rounded-3xl p-8 sm:p-12 border-2 border-amber-gold shadow-museum space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wood-dark text-amber-gold text-xs font-bold uppercase tracking-widest">
            <Bookmark className="w-3.5 h-3.5" />
            <span>{t('studentCorner.projectHelper')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-ink-dark">
            History & Technology Project Reference Guides
          </h2>
          <p className="text-ink-medium text-sm sm:text-base">
            Students can explore these predefined project themes to collect information, dates, and historical descriptions for school assignments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {schoolProjects.map((project, idx) => (
            <div key={project.id} className="bg-parchment/80 p-6 rounded-2xl border border-amber-gold/40 space-y-4 flex flex-col justify-between shadow-sm">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-ink-dark">{project.title}</h3>
                <p className="text-xs text-ink-medium leading-relaxed">{project.description}</p>
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-amber-goldDark block mb-1">
                    Suggested Artifacts to Study:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.suggestedObjects.map((obj, i) => (
                      <span key={i} className="text-[11px] bg-wood-dark text-cream px-2 py-0.5 rounded font-sans">
                        {obj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-gold/30">
                <button
                  onClick={() => handleCopySummary(`Project Topic: ${project.title}\nDescription: ${project.description}\nKey Objects: ${project.suggestedObjects.join(', ')}`, idx)}
                  className="w-full py-2 rounded-lg bg-wood-dark text-amber-gold text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-wood-light transition-colors"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{t('studentCorner.copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('studentCorner.copyProject')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default StudentCorner;
