import { lazy, Suspense, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CookieBanner from './components/CookieBanner';
import LoadingScreen from './components/LoadingScreen';

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const MenuPage = lazy(() => import('./pages/MenuPage'));

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [loading, setLoading] = useState(isHome);

  return (
    <>
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<Suspense fallback={null}><PrivacyPolicy /></Suspense>} />
        <Route path="/cookie-policy" element={<Suspense fallback={null}><CookiePolicy /></Suspense>} />
        <Route path="/menu" element={<Suspense fallback={null}><MenuPage /></Suspense>} />
      </Routes>
      <CookieBanner />
    </>
  );
}

export default App;
