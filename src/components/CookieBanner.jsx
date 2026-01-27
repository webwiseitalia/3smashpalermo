import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import siteData from '../constants/siteData';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Check if we're on a policy page
  const isPolicyPage = location.pathname === '/privacy-policy' || location.pathname === '/cookie-policy';

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(siteData.cookieKey);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(siteData.cookieKey, 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(siteData.cookieKey, 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Blur overlay - only show when NOT on policy pages */}
      <AnimatePresence>
        {isVisible && !isPolicyPage && (
          <motion.div
            className="fixed inset-0 bg-[#0a0a0a]/60 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Cookie Banner */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[70] p-4 md:p-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-4xl mx-auto bg-[#1a1a1a] border border-[#f5e6c8]/20 rounded-2xl p-6 md:p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#3451a1] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#f5e6c8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#f5e6c8] text-xl md:text-2xl font-display font-bold uppercase mb-2">
                    Informativa Cookie
                  </h3>
                  <p className="text-[#f5e6c8]/60 text-sm md:text-base leading-relaxed">
                    Questo sito utilizza <strong className="text-[#f5e6c8]">solo cookie tecnici</strong> necessari al funzionamento.
                    Non utilizziamo cookie di profilazione o tracciamento.
                    Per maggiori informazioni, consulta la nostra{' '}
                    <Link to="/cookie-policy" className="text-[#3451a1] hover:underline">
                      Cookie Policy
                    </Link>{' '}
                    e{' '}
                    <Link to="/privacy-policy" className="text-[#3451a1] hover:underline">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </div>

              {/* Buttons - same size and style */}
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={handleReject}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-[#f5e6c8]/30 text-[#f5e6c8] font-semibold uppercase tracking-wider text-sm hover:bg-[#f5e6c8]/10 transition-all rounded-lg"
                >
                  Rifiuta
                </button>
                <button
                  onClick={handleAccept}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-[#3451a1] bg-[#3451a1] text-[#f5e6c8] font-semibold uppercase tracking-wider text-sm hover:bg-[#4563b5] hover:border-[#4563b5] transition-all rounded-lg"
                >
                  Accetta
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
