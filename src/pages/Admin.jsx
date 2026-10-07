import React, { useState } from 'react';
import AdminLogin from '../admin/AdminLogin';
import AdminDashboard from '../admin/AdminDashboard';
import { useMuseumData } from '../context/MuseumDataContext';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('smritighar_admin_logged') === 'true';
  });
  
  const { 
    objects, 
    addObject, 
    updateObject, 
    deleteObject, 
    toggleFeatured, 
    resetToDefaults, 
    exportCatalogJson, 
    importCatalogJson 
  } = useMuseumData();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('smritighar_admin_logged', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('smritighar_admin_logged');
  };

  return (
    <div className="w-full min-h-screen">
      {!isLoggedIn ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AdminDashboard
          objectList={objects}
          onAddObject={addObject}
          onUpdateObject={updateObject}
          onDeleteObject={deleteObject}
          onToggleFeatured={toggleFeatured}
          onResetDefaults={resetToDefaults}
          onExportCatalog={exportCatalogJson}
          onImportCatalog={importCatalogJson}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Admin;
