import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Explore from './pages/Explore';
import Categories from './pages/Categories';
import CategoryDetails from './pages/CategoryDetails';
import Timeline from './pages/Timeline';
import ObjectDetails from './pages/ObjectDetails';
import ThenVsNow from './pages/ThenVsNow';
import StudentCorner from './pages/StudentCorner';
import About from './pages/About';
import Admin from './pages/Admin';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout wrapper for public routes vs admin
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryDetails />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/timeline/:era" element={<Timeline />} />
            <Route path="/object/:slug" element={<ObjectDetails />} />
            <Route path="/then-vs-now" element={<ThenVsNow />} />
            <Route path="/student-corner" element={<StudentCorner />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
