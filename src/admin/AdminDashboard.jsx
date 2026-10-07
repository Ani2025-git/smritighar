import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, Layers, Clock, ArrowRightLeft, GraduationCap, 
  Settings, LogOut, Plus, Search, Edit, Trash2, ShieldCheck, Award, 
  Eye, Download, Upload, RefreshCw, ExternalLink, Star, CheckCircle, 
  AlertTriangle, BookOpen, Sparkles
} from 'lucide-react';
import { categories } from '../data/categories';
import { eras } from '../data/eras';
import { comparisons } from '../data/comparisons';
import { quickLearningTopics, objectOfTheWeek } from '../data/studentData';
import { useTranslation } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ObjectFormModal from './ObjectFormModal';

const AdminDashboard = ({ 
  objectList = [], 
  onAddObject, 
  onUpdateObject, 
  onDeleteObject, 
  onToggleFeatured, 
  onResetDefaults, 
  onExportCatalog, 
  onImportCatalog, 
  onLogout 
}) => {
  const { tCategory, tObjectName } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedEraFilter, setSelectedEraFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingObject, setEditingObject] = useState(null);
  const [importStatus, setImportStatus] = useState(null);

  // KEY METRICS
  const totalObjects = objectList.length;
  const totalCategories = categories.length;
  const totalEras = eras.length;
  const featuredCount = objectList.filter((o) => o.featured).length;

  // OBJECT FILTERING
  const filteredList = objectList.filter((o) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      !query ||
      o.name.toLowerCase().includes(query) ||
      o.category.toLowerCase().includes(query) ||
      o.era.toLowerCase().includes(query) ||
      (o.modernEquivalent && o.modernEquivalent.toLowerCase().includes(query));

    const matchesCat = selectedCategoryFilter === 'all' || o.category.toLowerCase() === selectedCategoryFilter.toLowerCase();
    const matchesEra = selectedEraFilter === 'all' || o.era.toLowerCase() === selectedEraFilter.toLowerCase();

    return matchesSearch && matchesCat && matchesEra;
  });

  const handleOpenAddModal = () => {
    setEditingObject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (obj) => {
    setEditingObject(obj);
    setIsModalOpen(true);
  };

  const handleDeleteObject = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the museum archives?`)) {
      if (onDeleteObject) onDeleteObject(id);
    }
  };

  const handleSaveObject = (savedObject) => {
    if (editingObject) {
      if (onUpdateObject) onUpdateObject(savedObject);
    } else {
      if (onAddObject) onAddObject(savedObject);
    }
    setIsModalOpen(false);
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (content && onImportCatalog) {
        const res = onImportCatalog(content);
        if (res.success) {
          setImportStatus(`Successfully restored ${res.count} museum artifacts!`);
        } else {
          setImportStatus(`Import Error: ${res.error}`);
        }
        setTimeout(() => setImportStatus(null), 5000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'objects', label: 'Museum Objects', icon: Award, count: totalObjects },
    { id: 'categories', label: 'Categories', icon: Layers, count: totalCategories },
    { id: 'timeline', label: 'Timeline Eras', icon: Clock, count: totalEras },
    { id: 'then-vs-now', label: 'Then vs Now', icon: ArrowRightLeft, count: comparisons.length },
    { id: 'student-corner', label: 'Student Corner', icon: GraduationCap },
    { id: 'settings', label: 'Settings & Backups', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-museum-950 flex flex-col lg:flex-row text-cream">
      
      {/* SIDEBAR */}
      <aside className="w-full lg:w-64 bg-wood-dark border-r border-amber-gold/20 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          
          {/* CURATOR HEADER */}
          <div className="flex items-center gap-3 border-b border-amber-gold/20 pb-4">
            <div className="w-10 h-10 rounded-xl bg-museum-950 border border-amber-gold flex items-center justify-center text-amber-gold shadow-gold-glow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-cream">Curator Studio</h2>
              <span className="text-[10px] text-amber-gold uppercase tracking-wider block font-semibold">
                Control Panel
              </span>
            </div>
          </div>

          {/* SIDEBAR NAVIGATION */}
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const active = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-museum-950 text-amber-gold border border-amber-gold/40 font-semibold shadow-inner'
                      : 'text-cream/80 hover:bg-museum-950/40 hover:text-amber-goldLight'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-amber-gold" />
                    <span>{link.label}</span>
                  </div>
                  {link.count !== undefined && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-wood-dark border border-amber-gold/30 text-amber-gold">
                      {link.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SIDEBAR FOOTER */}
        <div className="pt-6 border-t border-amber-gold/20 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-museum-950 text-amber-gold border border-amber-gold/30 hover:border-amber-gold transition-colors"
          >
            <span>Live Exhibition</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Curator</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-x-hidden">
        
        {/* TOP STATUS BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-wood-dark/60 p-4 rounded-2xl border border-amber-gold/20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-parchment-dark">
              Active Curator Session: <strong className="text-cream">Archival Management Active</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-goldDark to-amber-gold text-museum-950 font-bold text-xs shadow-gold-glow flex items-center gap-1.5 hover:opacity-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-museum-950" />
              <span>Add Artifact</span>
            </button>
          </div>
        </div>

        {/* NOTIFICATION BANNER */}
        {importStatus && (
          <div className="p-4 rounded-xl bg-amber-gold/20 border border-amber-gold text-xs text-cream flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{importStatus}</span>
          </div>
        )}

        {/* STATS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-wood-dark/70 p-5 rounded-2xl border border-amber-gold/30 shadow-museum flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-parchment-dark tracking-wider">Total Artifacts</span>
              <h3 className="font-serif text-3xl font-bold text-cream mt-1">{totalObjects}</h3>
              <span className="text-[10px] text-emerald-400">100% Digitized</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-museum-950 border border-amber-gold/30 flex items-center justify-center text-amber-gold shadow-gold-glow">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-wood-dark/70 p-5 rounded-2xl border border-amber-gold/30 shadow-museum flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-parchment-dark tracking-wider">Exhibition Halls</span>
              <h3 className="font-serif text-3xl font-bold text-cream mt-1">{totalCategories}</h3>
              <span className="text-[10px] text-parchment-dark">Curated Galleries</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-museum-950 border border-amber-gold/30 flex items-center justify-center text-amber-gold shadow-gold-glow">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-wood-dark/70 p-5 rounded-2xl border border-amber-gold/30 shadow-museum flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-parchment-dark tracking-wider">Timeline Eras</span>
              <h3 className="font-serif text-3xl font-bold text-cream mt-1">{totalEras}</h3>
              <span className="text-[10px] text-parchment-dark">Chronological Spans</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-museum-950 border border-amber-gold/30 flex items-center justify-center text-amber-gold shadow-gold-glow">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-wood-dark/70 p-5 rounded-2xl border border-amber-gold/30 shadow-museum flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-parchment-dark tracking-wider">Featured Exhibits</span>
              <h3 className="font-serif text-3xl font-bold text-amber-gold mt-1">{featuredCount}</h3>
              <span className="text-[10px] text-amber-goldLight">Permanent Showcase</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-museum-950 border border-amber-gold/30 flex items-center justify-center text-amber-gold shadow-gold-glow">
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            {/* QUICK ACTIONS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={handleOpenAddModal}
                className="p-5 rounded-2xl bg-wood-dark/60 border border-amber-gold/30 hover:border-amber-gold hover:bg-wood-dark transition-all text-left space-y-2 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-gold text-museum-950 flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-cream group-hover:text-amber-gold transition-colors">Add New Object</h4>
                <p className="text-xs text-parchment-dark">Catalog a new vintage item into the collection.</p>
              </button>

              <button
                onClick={onExportCatalog}
                className="p-5 rounded-2xl bg-wood-dark/60 border border-amber-gold/30 hover:border-amber-gold hover:bg-wood-dark transition-all text-left space-y-2 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-museum-950 text-amber-gold border border-amber-gold/40 flex items-center justify-center font-bold">
                  <Download className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-cream group-hover:text-amber-gold transition-colors">Export Backup</h4>
                <p className="text-xs text-parchment-dark">Download full museum catalog JSON archive.</p>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className="p-5 rounded-2xl bg-wood-dark/60 border border-amber-gold/30 hover:border-amber-gold hover:bg-wood-dark transition-all text-left space-y-2 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-lg bg-museum-950 text-amber-gold border border-amber-gold/40 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-cream group-hover:text-amber-gold transition-colors">Exhibition Halls</h4>
                <p className="text-xs text-parchment-dark">Browse category counts and distribution.</p>
              </button>

              <Link
                to="/explore"
                target="_blank"
                className="p-5 rounded-2xl bg-wood-dark/60 border border-amber-gold/30 hover:border-amber-gold hover:bg-wood-dark transition-all text-left space-y-2 cursor-pointer group block"
              >
                <div className="w-9 h-9 rounded-lg bg-museum-950 text-amber-gold border border-amber-gold/40 flex items-center justify-center font-bold">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-cream group-hover:text-amber-gold transition-colors">Public Catalogue</h4>
                <p className="text-xs text-parchment-dark">Open the live visitor catalogue in a new view.</p>
              </Link>
            </div>

            {/* RECENT OBJECTS TABLE PREVIEW */}
            <div className="bg-wood-dark/70 rounded-2xl border border-amber-gold/30 p-6 shadow-museum space-y-4">
              <div className="flex items-center justify-between border-b border-amber-gold/20 pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-cream">Recent Archival Additions</h3>
                  <p className="text-xs text-parchment-dark">Latest items managed in the museum archive</p>
                </div>
                <button
                  onClick={() => setActiveTab('objects')}
                  className="text-xs text-amber-gold hover:underline font-semibold"
                >
                  View All ({totalObjects}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-museum-950 text-amber-gold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Artifact</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Era</th>
                      <th className="py-3 px-4">Modern Equivalent</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-gold/10">
                    {objectList.slice(0, 5).map((obj) => (
                      <tr key={obj.id} className="hover:bg-museum-950/40 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={obj.image}
                            alt={obj.name}
                            className="w-9 h-9 object-cover rounded-lg border border-amber-gold/30"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div>
                            <span className="font-semibold block text-cream">{tObjectName(obj.name)}</span>
                            <span className="text-[10px] text-parchment-dark">{obj.year}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-parchment">{tCategory(obj.category)}</td>
                        <td className="py-3 px-4 text-parchment">{obj.era}</td>
                        <td className="py-3 px-4 text-amber-gold">{obj.modernEquivalent}</td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <Link
                            to={`/object/${obj.slug}`}
                            target="_blank"
                            className="inline-block p-1.5 rounded bg-museum-950 text-amber-gold border border-amber-gold/20 hover:border-amber-gold"
                            title="Live View"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleOpenEditModal(obj)}
                            className="p-1.5 rounded bg-wood-dark hover:bg-amber-gold/20 text-amber-gold border border-amber-gold/30 cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: OBJECTS MANAGEMENT */}
        {activeTab === 'objects' && (
          <div className="bg-wood-dark/70 rounded-2xl border border-amber-gold/30 p-6 shadow-museum space-y-6">
            
            {/* MANAGEMENT HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-gold/20 pb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-cream">Museum Objects Catalogue</h2>
                <p className="text-xs text-parchment-dark mt-0.5">
                  Curate, edit, and organize all historical artifacts.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* SEARCH */}
                <div className="relative">
                  <Search className="w-4 h-4 text-amber-gold absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search artifacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-museum-950 text-cream pl-9 pr-3 py-2 rounded-xl border border-amber-gold/30 text-xs focus:outline-none w-48 sm:w-56"
                  />
                </div>

                {/* CATEGORY FILTER */}
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-museum-950 text-cream py-2 px-3 rounded-xl border border-amber-gold/30 text-xs focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{tCategory(c.name)}</option>
                  ))}
                </select>

                {/* ERA FILTER */}
                <select
                  value={selectedEraFilter}
                  onChange={(e) => setSelectedEraFilter(e.target.value)}
                  className="bg-museum-950 text-cream py-2 px-3 rounded-xl border border-amber-gold/30 text-xs focus:outline-none"
                >
                  <option value="all">All Eras</option>
                  {eras.map((e) => (
                    <option key={e.id} value={e.name}>{e.name}</option>
                  ))}
                </select>

                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 rounded-xl bg-amber-gold text-museum-950 font-bold text-xs shadow-gold-glow flex items-center gap-1.5 hover:bg-amber-goldLight cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-museum-950" />
                  <span>New Object</span>
                </button>
              </div>
            </div>

            {/* OBJECTS TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-museum-950 text-amber-gold uppercase tracking-wider text-[10px] border-b border-amber-gold/20">
                  <tr>
                    <th className="py-3 px-4">Artifact</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Era</th>
                    <th className="py-3 px-4">Modern Equivalent</th>
                    <th className="py-3 px-4 text-center">Featured</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-gold/10 text-cream">
                  {filteredList.map((obj) => (
                    <tr key={obj.id} className="hover:bg-museum-950/40 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={obj.image}
                          alt={obj.name}
                          className="w-10 h-10 object-cover rounded-lg border border-amber-gold/30"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div>
                          <span className="font-semibold block text-cream">{tObjectName(obj.name)}</span>
                          <span className="text-[10px] text-parchment-dark font-mono">SG-OBJ-{obj.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-parchment">{tCategory(obj.category)}</td>
                      <td className="py-3 px-4 text-parchment">{obj.era}</td>
                      <td className="py-3 px-4 text-amber-gold">{obj.modernEquivalent}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onToggleFeatured && onToggleFeatured(obj.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            obj.featured 
                              ? 'bg-amber-gold/20 text-amber-gold border-amber-gold/40 shadow-gold-glow' 
                              : 'text-parchment-dark/50 border-transparent hover:text-amber-gold'
                          }`}
                          title="Toggle Featured Exhibit"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <Link
                          to={`/object/${obj.slug}`}
                          target="_blank"
                          className="inline-block p-1.5 rounded bg-wood-dark hover:bg-amber-gold/20 text-amber-gold border border-amber-gold/30 cursor-pointer"
                          title="Live Public View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEditModal(obj)}
                          className="p-1.5 rounded bg-wood-dark hover:bg-amber-gold/20 text-amber-gold border border-amber-gold/30 cursor-pointer"
                          title="Edit Artifact"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteObject(obj.id, obj.name)}
                          className="p-1.5 rounded bg-wood-dark hover:bg-rose-950/60 text-rose-400 border border-rose-500/30 cursor-pointer"
                          title="Delete Artifact"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredList.length === 0 && (
                <div className="py-12 text-center text-parchment-dark text-sm">
                  No artifacts match your search query. Try clearing filters or add a new artifact!
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="bg-wood-dark/70 rounded-2xl border border-amber-gold/30 p-6 shadow-museum space-y-6">
            <div className="flex items-center justify-between border-b border-amber-gold/20 pb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-cream">Exhibition Galleries & Categories</h2>
                <p className="text-xs text-parchment-dark mt-0.5">
                  10 curated exhibition halls organizing human history and technology.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const count = objectList.filter((o) => o.category.toLowerCase() === cat.name.toLowerCase()).length;
                return (
                  <div
                    key={cat.id}
                    className="bg-museum-950/80 rounded-2xl border border-amber-gold/30 overflow-hidden flex flex-col justify-between group shadow-museum"
                  >
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover sepia-[0.2] group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-wood-dark/90 text-amber-gold text-xs font-bold border border-amber-gold/30">
                        {count} Items
                      </div>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-cream group-hover:text-amber-gold transition-colors">
                          {tCategory(cat.name)}
                        </h3>
                        <p className="text-xs text-parchment-dark mt-1 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-amber-gold/15 flex items-center justify-between">
                        <Link
                          to={`/category/${cat.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 text-xs text-amber-gold hover:underline font-semibold"
                        >
                          <span>View Public Hall</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: TIMELINE ERAS MANAGEMENT */}
        {activeTab === 'timeline' && (
          <div className="bg-wood-dark/70 rounded-2xl border border-amber-gold/30 p-6 shadow-museum space-y-6">
            <div className="border-b border-amber-gold/20 pb-4">
              <h2 className="font-serif text-2xl font-bold text-cream">Chronological Timeline Eras</h2>
              <p className="text-xs text-parchment-dark mt-0.5">
                8 chronological epochs shaping technological and social evolution.
              </p>
            </div>

            <div className="space-y-4">
              {eras.map((era) => {
                const eraObjects = objectList.filter((o) => o.era.toLowerCase() === era.name.toLowerCase());
                return (
                  <div
                    key={era.id}
                    className="p-5 rounded-2xl bg-museum-950/80 border border-amber-gold/20 hover:border-amber-gold/50 transition-colors space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-gold/15 pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-wood-dark border border-amber-gold/30 flex items-center justify-center text-amber-gold">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-bold text-cream">{era.name}</h3>
                          <span className="text-xs text-amber-goldLight italic">{era.subtitle}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-wood-dark text-amber-gold text-xs font-semibold self-start sm:self-auto">
                        {eraObjects.length} Archival Artifacts
                      </span>
                    </div>

                    <p className="text-xs text-parchment-dark leading-relaxed">
                      {era.description}
                    </p>

                    {eraObjects.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {eraObjects.map((obj) => (
                          <Link
                            key={obj.id}
                            to={`/object/${obj.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-wood-dark text-[11px] text-cream/90 border border-amber-gold/20 hover:border-amber-gold"
                          >
                            <span>{tObjectName(obj.name)}</span>
                            <ExternalLink className="w-2.5 h-2.5 text-amber-gold" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: THEN VS NOW */}
        {activeTab === 'then-vs-now' && (
          <div className="bg-wood-dark/70 rounded-2xl border border-amber-gold/30 p-6 shadow-museum space-y-6">
            <div className="border-b border-amber-gold/20 pb-4">
              <h2 className="font-serif text-2xl font-bold text-cream">Generational Technology Comparisons</h2>
              <p className="text-xs text-parchment-dark mt-0.5">
                Side-by-side evolution comparisons between vintage objects and modern devices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comparisons.map((c) => (
                <div
                  key={c.id}
                  className="bg-museum-950/80 p-5 rounded-2xl border border-amber-gold/30 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-amber-gold/20 pb-2">
                    <h3 className="font-serif text-lg font-bold text-cream">
                      {tObjectName(c.oldName) || c.oldName} vs {c.newName}
                    </h3>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-wood-dark text-amber-gold">
                      {tCategory(c.category)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1 bg-wood-dark/50 p-2.5 rounded-xl border border-amber-gold/15">
                      <span className="text-[10px] text-amber-gold font-bold uppercase block">Past Tech</span>
                      <p className="text-parchment-dark">{c.oldDescription}</p>
                    </div>
                    <div className="space-y-1 bg-wood-dark/50 p-2.5 rounded-xl border border-amber-gold/15">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase block">Modern Tech</span>
                      <p className="text-parchment-dark">{c.newDescription}</p>
                    </div>
                  </div>

                  <div className="text-xs text-parchment-light italic bg-museum-950 p-2.5 rounded-xl border border-amber-gold/10">
                    "{c.whatChanged}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: STUDENT CORNER */}
        {activeTab === 'student-corner' && (
          <div className="bg-wood-dark/70 rounded-2xl border border-amber-gold/30 p-6 shadow-museum space-y-6">
            <div className="border-b border-amber-gold/20 pb-4">
              <h2 className="font-serif text-2xl font-bold text-cream">Student Education Hub</h2>
              <p className="text-xs text-parchment-dark mt-0.5">
                Educational modules, object of the week showcase, and quick learning topics.
              </p>
            </div>

            {/* OBJECT OF THE WEEK PREVIEW */}
            <div className="p-5 rounded-2xl bg-museum-950/90 border-2 border-amber-gold/40 space-y-3">
              <div className="flex items-center gap-2 text-amber-gold text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>Current Object of the Week</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-cream">
                {tObjectName(objectOfTheWeek.name)} ({objectOfTheWeek.era})
              </h3>
              <p className="text-xs text-parchment-dark italic">
                "{objectOfTheWeek.curatorNote}"
              </p>
            </div>

            {/* QUICK LEARNING TOPICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickLearningTopics.map((topic) => (
                <div key={topic.id} className="p-4 rounded-xl bg-museum-950/70 border border-amber-gold/20 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-amber-gold block">{topic.category}</span>
                  <h4 className="font-serif text-base font-bold text-cream">{topic.title}</h4>
                  <p className="text-xs text-parchment-dark">{topic.summary}</p>
                  <div className="text-[11px] text-amber-goldLight pt-1">
                    <strong>Key takeaway:</strong> {topic.keyTakeaway}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS & BACKUPS */}
        {activeTab === 'settings' && (
          <div className="bg-wood-dark/70 rounded-2xl border border-amber-gold/30 p-6 shadow-museum space-y-8">
            <div className="border-b border-amber-gold/20 pb-4">
              <h2 className="font-serif text-2xl font-bold text-cream">Museum Data Engine & Backups</h2>
              <p className="text-xs text-parchment-dark mt-0.5">
                Export and import archives, restore pristine baseline, or inspect curatorial system info.
              </p>
            </div>

            {/* BACKUP & RESTORE BOX */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* EXPORT */}
              <div className="p-5 rounded-2xl bg-museum-950/80 border border-amber-gold/20 space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-amber-gold text-museum-950 flex items-center justify-center font-bold">
                    <Download className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-cream pt-2">Export Catalog</h3>
                  <p className="text-xs text-parchment-dark">
                    Save all {totalObjects} artifacts as a JSON backup file to your computer.
                  </p>
                </div>
                <button
                  onClick={onExportCatalog}
                  className="w-full py-2.5 rounded-xl bg-amber-gold text-museum-950 font-bold text-xs shadow-gold-glow hover:bg-amber-goldLight cursor-pointer"
                >
                  Download JSON Backup
                </button>
              </div>

              {/* IMPORT */}
              <div className="p-5 rounded-2xl bg-museum-950/80 border border-amber-gold/20 space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-museum-950 border border-amber-gold text-amber-gold flex items-center justify-center font-bold">
                    <Upload className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-cream pt-2">Import Catalog</h3>
                  <p className="text-xs text-parchment-dark">
                    Upload a previously exported JSON file to restore or add artifacts.
                  </p>
                </div>
                <label className="w-full py-2.5 rounded-xl bg-museum-950 text-amber-gold border border-amber-gold/40 hover:border-amber-gold font-bold text-xs text-center cursor-pointer block">
                  <span>Upload JSON File</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileImport}
                    className="hidden"
                  />
                </label>
              </div>

              {/* RESET TO FACTORY */}
              <div className="p-5 rounded-2xl bg-museum-950/80 border border-rose-500/30 space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-400 border border-rose-500/40 flex items-center justify-center font-bold">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-cream pt-2">Reset Baseline</h3>
                  <p className="text-xs text-parchment-dark">
                    Restore the 12 default curated museum artifacts and clear custom modifications.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Reset catalog back to the original 12 artifacts? Any custom added objects will be replaced.')) {
                      onResetDefaults();
                      alert('Museum catalog successfully restored to default baseline!');
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-950 text-rose-300 border border-rose-500/40 font-bold text-xs cursor-pointer"
                >
                  Restore Factory Defaults
                </button>
              </div>

            </div>

            {/* CURATOR SYSTEM INFO CARD */}
            <div className="p-5 rounded-2xl bg-museum-950 border border-amber-gold/20 text-xs text-parchment-dark space-y-2">
              <span className="font-serif text-base font-bold text-amber-gold block">
                SmritiGhar Archival System Architecture
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                <div>
                  <span className="text-parchment-dark/70 block uppercase text-[10px]">Storage Engine</span>
                  <span className="text-cream font-mono">Persistent LocalStorage (smritighar_catalog_v1)</span>
                </div>
                <div>
                  <span className="text-parchment-dark/70 block uppercase text-[10px]">Multi-Language Support</span>
                  <span className="text-cream font-mono">English, Bengali, Hindi (i18n + React Context)</span>
                </div>
                <div>
                  <span className="text-parchment-dark/70 block uppercase text-[10px]">Curator Security Mode</span>
                  <span className="text-cream font-mono">Front-End Demo Session</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ADD / EDIT OBJECT MODAL */}
      <ObjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveObject}
        editingObject={editingObject}
      />

    </div>
  );
};

export default AdminDashboard;
