import React, { useState } from 'react';
import { 
  LayoutDashboard, Layers, Clock, ArrowRightLeft, GraduationCap, 
  Settings, LogOut, Plus, Search, Edit, Trash2, ShieldCheck, Award, Eye 
} from 'lucide-react';
import { categories } from '../data/categories';
import { eras } from '../data/eras';
import ObjectFormModal from './ObjectFormModal';

const AdminDashboard = ({ objectList, onUpdateObjects, onLogout }) => {
  const [activeTab, setActiveTab] = useState('objects');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingObject, setEditingObject] = useState(null);

  // STATS
  const totalObjects = objectList.length;
  const totalCategories = categories.length;
  const totalEras = eras.length;
  const featuredCount = objectList.filter((o) => o.featured).length;

  // SEARCH FILTER
  const filteredList = objectList.filter((o) =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.era.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingObject(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (obj) => {
    setEditingObject(obj);
    setIsModalOpen(true);
  };

  const handleDeleteObject = (id) => {
    if (window.confirm('Are you sure you want to delete this museum object record from the demo session?')) {
      const updated = objectList.filter((o) => o.id !== id);
      onUpdateObjects(updated);
    }
  };

  const handleSaveObject = (savedObject) => {
    if (editingObject) {
      // Edit existing
      const updated = objectList.map((o) => (o.id === savedObject.id ? savedObject : o));
      onUpdateObjects(updated);
    } else {
      // Add new
      const newObj = {
        ...savedObject,
        id: Date.now()
      };
      onUpdateObjects([newObj, ...objectList]);
    }
  };

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'objects', label: 'Museum Objects', icon: Award },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'timeline', label: 'Timeline Eras', icon: Clock },
    { id: 'then-vs-now', label: 'Then vs Now', icon: ArrowRightLeft },
    { id: 'student-corner', label: 'Student Corner', icon: GraduationCap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-museum-950 flex flex-col lg:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full lg:w-64 bg-wood-dark border-r border-amber-gold/20 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-gold/20 pb-4">
            <div className="w-9 h-9 rounded-lg bg-museum-950 border border-amber-gold flex items-center justify-center text-amber-gold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-cream">Curator Admin</h2>
              <span className="text-[10px] text-amber-gold uppercase tracking-wider block">Demo Control Panel</span>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const active = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-museum-950 text-amber-gold border border-amber-gold/40 font-semibold'
                      : 'text-cream/80 hover:bg-museum-950/40 hover:text-amber-goldLight'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-gold" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-amber-gold/20">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Curator</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-x-hidden">
        
        {/* STATS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-wood-dark/70 p-5 rounded-2xl border border-amber-gold/30 shadow-museum flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-parchment-dark tracking-wider">Total Objects</span>
              <h3 className="font-serif text-3xl font-bold text-cream mt-1">{totalObjects}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-museum-950 border border-amber-gold/30 flex items-center justify-center text-amber-gold">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-wood-dark/70 p-5 rounded-2xl border border-amber-gold/30 shadow-museum flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-parchment-dark tracking-wider">Categories</span>
              <h3 className="font-serif text-3xl font-bold text-cream mt-1">{totalCategories}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-museum-950 border border-amber-gold/30 flex items-center justify-center text-amber-gold">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-wood-dark/70 p-5 rounded-2xl border border-amber-gold/30 shadow-museum flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-parchment-dark tracking-wider">Timeline Eras</span>
              <h3 className="font-serif text-3xl font-bold text-cream mt-1">{totalEras}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-museum-950 border border-amber-gold/30 flex items-center justify-center text-amber-gold">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-wood-dark/70 p-5 rounded-2xl border border-amber-gold/30 shadow-museum flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-parchment-dark tracking-wider">Featured Objects</span>
              <h3 className="font-serif text-3xl font-bold text-amber-gold mt-1">{featuredCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-museum-950 border border-amber-gold/30 flex items-center justify-center text-amber-gold">
              <Eye className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* TAB 1: OBJECT MANAGEMENT (MAIN) */}
        {activeTab === 'objects' || activeTab === 'dashboard' ? (
          <div className="bg-wood-dark/70 rounded-2xl border border-amber-gold/30 p-6 shadow-museum space-y-6">
            
            {/* MANAGEMENT HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-gold/20 pb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-cream">Museum Objects Management</h2>
                <p className="text-xs text-parchment-dark mt-0.5">
                  Add, edit, or delete museum artifacts (Session Demo)
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-amber-gold absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search objects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-museum-950 text-cream pl-9 pr-3 py-2 rounded-xl border border-amber-gold/30 text-xs focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 rounded-xl bg-amber-gold text-museum-950 font-bold text-xs shadow-gold-glow flex items-center gap-1.5 hover:bg-amber-goldLight cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Object</span>
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
                    <th className="py-3 px-4">Featured</th>
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
                        />
                        <div>
                          <span className="font-semibold block text-cream">{obj.name}</span>
                          <span className="text-[10px] text-parchment-dark">{obj.year}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-parchment">{obj.category}</td>
                      <td className="py-3 px-4 text-parchment">{obj.era}</td>
                      <td className="py-3 px-4 text-amber-gold">{obj.modernEquivalent}</td>
                      <td className="py-3 px-4">
                        {obj.featured ? (
                          <span className="px-2 py-0.5 rounded bg-amber-gold/20 text-amber-gold font-bold text-[10px]">Yes</span>
                        ) : (
                          <span className="text-parchment-dark text-[10px]">No</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(obj)}
                          className="p-1.5 rounded bg-wood-dark hover:bg-amber-gold/20 text-amber-gold border border-amber-gold/30 cursor-pointer"
                          title="Edit Object"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteObject(obj.id)}
                          className="p-1.5 rounded bg-wood-dark hover:bg-rose-950/60 text-rose-400 border border-rose-500/30 cursor-pointer"
                          title="Delete Object"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          <div className="bg-wood-dark/70 rounded-2xl border border-amber-gold/30 p-8 shadow-museum text-center space-y-4">
            <h3 className="font-serif text-2xl font-bold text-cream uppercase">
              {activeTab} Management Demo
            </h3>
            <p className="text-sm text-parchment-dark max-w-md mx-auto">
              This panel section demonstrates the future administrative control for {activeTab}. Content changes can be configured here in full production mode.
            </p>
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
