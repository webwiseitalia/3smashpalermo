import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CookieBanner from './components/CookieBanner';
// import LoadingScreen from './components/LoadingScreen';

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const JustEatPage = lazy(() => import('./pages/JustEatPage'));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<Suspense fallback={null}><PrivacyPolicy /></Suspense>} />
        <Route path="/cookie-policy" element={<Suspense fallback={null}><CookiePolicy /></Suspense>} />
        <Route path="/menu" element={<Suspense fallback={null}><MenuPage /></Suspense>} />
        <Route path="/ordina" element={<Suspense fallback={null}><JustEatPage /></Suspense>} />
      </Routes>
      <CookieBanner />
    </>
  );
}

export default App;
