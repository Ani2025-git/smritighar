import React, { useState } from 'react';
import { X, Save, Plus, Edit2, Image, Layers, Clock } from 'lucide-react';
import { categories } from '../data/categories';
import { eras } from '../data/eras';

const getInitialFormData = (object) => {
  if (object) {
    return {
      ...object,
      facts: Array.isArray(object.facts) ? object.facts.join('\n') : object.facts || '',
      quickNotes: Array.isArray(object.quickNotes) ? object.quickNotes.join('\n') : object.quickNotes || '',
    };
  }
  return {
    name: '',
    shortDescription: '',
    whatIsIt: '',
    history: '',
    howItWorked: '',
    whereUsed: '',
    importance: '',
    facts: '',
    quickNotes: '',
    category: 'Communication',
    era: '1950s',
    year: '1950–1980',
    origin: 'Various Countries',
    inventor: 'Historical Inventor',
    modernEquivalent: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?auto=format&fit=crop&w=800&q=80',
    featured: false,
    status: 'Published'
  };
};

const ObjectFormModal = ({ isOpen, onClose, onSave, editingObject }) => {
  const [formData, setFormData] = useState(() => getInitialFormData(editingObject));
  const [prevEditingObject, setPrevEditingObject] = useState(editingObject);

  if (editingObject !== prevEditingObject) {
    setPrevEditingObject(editingObject);
    setFormData(getInitialFormData(editingObject));
  }

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process facts and notes into arrays
    const formattedData = {
      ...formData,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      facts: typeof formData.facts === 'string' ? formData.facts.split('\n').filter(Boolean) : formData.facts,
      quickNotes: typeof formData.quickNotes === 'string' ? formData.quickNotes.split('\n').filter(Boolean) : formData.quickNotes,
      evolutionChain: formData.evolutionChain || [formData.name, formData.modernEquivalent]
    };

    onSave(formattedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-museum-950/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-museum-900 border border-amber-gold/40 rounded-2xl shadow-museum overflow-hidden flex flex-col">
        
        {/* MODAL HEADER */}
        <div className="px-6 py-4 border-b border-amber-gold/20 bg-wood-dark/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-gold font-serif text-xl font-bold">
            {editingObject ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            <span>{editingObject ? 'Edit Museum Object' : 'Add New Museum Object'}</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-parchment-dark hover:text-amber-gold">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MODAL FORM */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm font-sans">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* NAME */}
            <div className="space-y-1">
              <label className="font-semibold text-cream">Object Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Vintage Typewriter"
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
              />
            </div>

            {/* CATEGORY */}
            <div className="space-y-1">
              <label className="font-semibold text-cream">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* ERA */}
            <div className="space-y-1">
              <label className="font-semibold text-cream">Era *</label>
              <select
                name="era"
                value={formData.era}
                onChange={handleChange}
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
              >
                {eras.map((e) => (
                  <option key={e.id} value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>

            {/* YEAR */}
            <div className="space-y-1">
              <label className="font-semibold text-cream">Approximate Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g. 1950–1980"
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
              />
            </div>

            {/* ORIGIN */}
            <div className="space-y-1">
              <label className="font-semibold text-cream">Origin / Country</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="e.g. United States / Worldwide"
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
              />
            </div>

            {/* INVENTOR */}
            <div className="space-y-1">
              <label className="font-semibold text-cream">Inventor / Craftsman</label>
              <input
                type="text"
                name="inventor"
                value={formData.inventor}
                onChange={handleChange}
                placeholder="e.g. Christopher Latham Sholes"
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
              />
            </div>

            {/* MODERN EQUIVALENT */}
            <div className="space-y-1">
              <label className="font-semibold text-cream">Modern Equivalent *</label>
              <input
                type="text"
                name="modernEquivalent"
                value={formData.modernEquivalent}
                onChange={handleChange}
                required
                placeholder="e.g. Laptop / Smartphone"
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
              />
            </div>

            {/* IMAGE URL */}
            <div className="space-y-1">
              <label className="font-semibold text-cream">Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
              />
            </div>

          </div>

          {/* SHORT DESCRIPTION */}
          <div className="space-y-1">
            <label className="font-semibold text-cream">Short Description *</label>
            <textarea
              name="shortDescription"
              rows={2}
              value={formData.shortDescription}
              onChange={handleChange}
              required
              placeholder="Brief summary for display cards..."
              className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
            />
          </div>

          {/* WHAT IS IT */}
          <div className="space-y-1">
            <label className="font-semibold text-cream">What Is It? (Full Description)</label>
            <textarea
              name="whatIsIt"
              rows={3}
              value={formData.whatIsIt}
              onChange={handleChange}
              placeholder="Student-friendly explanation of the object..."
              className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
            />
          </div>

          {/* HISTORY */}
          <div className="space-y-1">
            <label className="font-semibold text-cream">History & Origin Story</label>
            <textarea
              name="history"
              rows={3}
              value={formData.history}
              onChange={handleChange}
              placeholder="Historical background and when it became popular..."
              className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
            />
          </div>

          {/* HOW IT WORKED */}
          <div className="space-y-1">
            <label className="font-semibold text-cream">How Did It Work?</label>
            <textarea
              name="howItWorked"
              rows={3}
              value={formData.howItWorked}
              onChange={handleChange}
              placeholder="Working mechanism and operation steps..."
              className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* WHERE USED */}
            <div className="space-y-1">
              <label className="font-semibold text-cream">Where Was It Used?</label>
              <textarea
                name="whereUsed"
                rows={2}
                value={formData.whereUsed}
                onChange={handleChange}
                placeholder="Common locations..."
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
              />
            </div>

            {/* IMPORTANCE */}
            <div className="space-y-1">
              <label className="font-semibold text-cream">Why Was It Important?</label>
              <textarea
                name="importance"
                rows={2}
                value={formData.importance}
                onChange={handleChange}
                placeholder="Importance to society/tech..."
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none"
              />
            </div>
          </div>

          {/* STUDENT QUICK NOTES & FACTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-cream">Student Quick Notes (One per line)</label>
              <textarea
                name="quickNotes"
                rows={3}
                value={formData.quickNotes}
                onChange={handleChange}
                placeholder="Bullet point 1&#10;Bullet point 2..."
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-cream">Did You Know? Facts (One per line)</label>
              <textarea
                name="facts"
                rows={3}
                value={formData.facts}
                onChange={handleChange}
                placeholder="Fact 1&#10;Fact 2..."
                className="w-full bg-museum-950 text-cream p-2.5 rounded-xl border border-amber-gold/30 focus:border-amber-gold focus:outline-none font-mono text-xs"
              />
            </div>
          </div>

          {/* TOGGLES */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-cream">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-amber-gold rounded"
              />
              <span>Mark as Featured Object</span>
            </label>

            <div className="flex items-center gap-2 text-cream">
              <span>Status:</span>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="bg-museum-950 text-amber-gold p-1.5 rounded-lg border border-amber-gold/30"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 border-t border-amber-gold/20 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-wood-dark text-parchment hover:text-cream border border-amber-gold/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-gold text-museum-950 font-bold shadow-gold-glow flex items-center gap-2 hover:bg-amber-goldLight"
            >
              <Save className="w-4 h-4" />
              <span>Save Object Record</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ObjectFormModal;
