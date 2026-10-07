import React, { createContext, useContext, useState, useEffect } from 'react';
import { objects as defaultObjects } from '../data/objects';

const MuseumDataContext = createContext();
const STORAGE_KEY = 'smritighar_catalog_v1';

export const MuseumDataProvider = ({ children }) => {
  const [objects, setObjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved museum catalog from localStorage:', e);
    }
    return defaultObjects;
  });

  // Sync state to localStorage whenever objects update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(objects));
    } catch (e) {
      console.error('Failed to save museum catalog to localStorage:', e);
    }
  }, [objects]);

  // ADD OBJECT
  const addObject = (newObj) => {
    const slug = newObj.slug || newObj.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const created = {
      ...newObj,
      id: newObj.id || Date.now(),
      slug: slug || `artifact-${Date.now()}`,
      status: newObj.status || 'Published',
      featured: Boolean(newObj.featured),
      facts: Array.isArray(newObj.facts) ? newObj.facts : [],
      quickNotes: Array.isArray(newObj.quickNotes) ? newObj.quickNotes : [],
      evolutionChain: Array.isArray(newObj.evolutionChain) && newObj.evolutionChain.length > 0 
        ? newObj.evolutionChain 
        : [newObj.name, newObj.modernEquivalent || 'Modern Equivalent'],
      createdAt: new Date().toISOString()
    };

    setObjects((prev) => [created, ...prev]);
    return created;
  };

  // UPDATE OBJECT
  const updateObject = (updatedObj) => {
    setObjects((prev) =>
      prev.map((item) => (item.id === updatedObj.id ? { ...item, ...updatedObj } : item))
    );
  };

  // DELETE OBJECT
  const deleteObject = (id) => {
    setObjects((prev) => prev.filter((item) => item.id !== id));
  };

  // TOGGLE FEATURED
  const toggleFeatured = (id) => {
    setObjects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, featured: !item.featured } : item))
    );
  };

  // RESET CATALOG TO DEFAULT 12 OBJECTS
  const resetToDefaults = () => {
    setObjects(defaultObjects);
    localStorage.removeItem(STORAGE_KEY);
  };

  // EXPORT CATALOG AS JSON FILE
  const exportCatalogJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(objects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `smritighar-catalog-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // IMPORT CATALOG FROM JSON STRING
  const importCatalogJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setObjects(parsed);
        return { success: true, count: parsed.length };
      }
      return { success: false, error: 'JSON does not contain a valid array of objects.' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <MuseumDataContext.Provider
      value={{
        objects,
        addObject,
        updateObject,
        deleteObject,
        toggleFeatured,
        resetToDefaults,
        exportCatalogJson,
        importCatalogJson,
        totalObjects: objects.length,
        featuredCount: objects.filter((o) => o.featured).length
      }}
    >
      {children}
    </MuseumDataContext.Provider>
  );
};

export const useMuseumData = () => {
  const context = useContext(MuseumDataContext);
  if (!context) {
    throw new Error('useMuseumData must be used within a MuseumDataProvider');
  }
  return context;
};
