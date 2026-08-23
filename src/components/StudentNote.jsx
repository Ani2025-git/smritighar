import React from 'react';
import { GraduationCap, CheckCircle2, Bookmark } from 'lucide-react';

const StudentNote = ({ notes, title = "Student Quick Notes" }) => {
  if (!notes || notes.length === 0) return null;

  return (
    <div className="my-8 p-6 rounded-2xl bg-parchment-light border-2 border-amber-gold/80 text-ink-dark shadow-museum relative overflow-hidden">
      {/* Decorative Stamp Tag */}
      <div className="absolute top-0 right-0 bg-amber-gold text-museum-950 text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm">
        <Bookmark className="w-3 h-3 fill-museum-950" />
        <span>Exam & Study Note</span>
      </div>

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-wood-dark text-amber-gold flex items-center justify-center shadow-md">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-ink-dark">{title}</h3>
          <p className="text-xs text-ink-muted">Essential key takeaways for students & history project notes</p>
        </div>
      </div>

      {/* NOTES BULLETS */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
        {notes.map((note, index) => (
          <li key={index} className="flex items-start gap-2.5 bg-parchment/60 p-3 rounded-lg border border-amber-gold/30">
            <CheckCircle2 className="w-4 h-4 text-amber-goldDark shrink-0 mt-0.5" />
            <span className="text-xs md:text-sm text-ink-dark font-medium leading-snug">
              {note}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentNote;
