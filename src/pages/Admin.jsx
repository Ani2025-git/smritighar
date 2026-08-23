import React, { useState } from 'react';
import AdminLogin from '../admin/AdminLogin';
import AdminDashboard from '../admin/AdminDashboard';
import { objects as initialObjects } from '../data/objects';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [objectList, setObjectList] = useState(initialObjects);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleUpdateObjects = (newObjects) => {
    setObjectList(newObjects);
  };

  return (
    <div className="w-full min-h-screen">
      {!isLoggedIn ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AdminDashboard
          objectList={objectList}
          onUpdateObjects={handleUpdateObjects}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Admin;
