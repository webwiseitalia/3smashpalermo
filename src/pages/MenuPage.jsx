import { Link } from 'react-router-dom';
import menu1 from '../assets/menù/menù-1.webp';
import menu2 from '../assets/menù/menù-2.webp';
import logoHero from '../assets/logo-hero-3smash.webp';
import siteData from '../constants/siteData';

export default function MenuPage() {
  return (
    <div className="bg-[#2D2C72] min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#faf3e3]">
        <div className="flex justify-between items-center px-6 md:px-12 py-4">
          <Link to="/" className="relative z-10" onClick={() => window.scrollTo(0, 0)}>
            <img
              src={logoHero}
              alt="3 Smash Palermo - Logo"
              title="3 Smash Palermo"
              className="h-10 md:h-14"
              width="120"
              height="56"
              style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(47%) saturate(2267%) hue-rotate(222deg) brightness(90%) contrast(93%)' }}
            />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-[#2D2C72] text-sm font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform duration-200"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Home
          </Link>
        </div>
        <div className="checkerboard-sm h-[36px]" />
      </div>

      {/* Menu images */}
      <div className="pt-[108px] flex flex-col flex-1">
        <img
          src={menu1}
          alt="3 Smash Palermo - Menu Smash Burger"
          title="I nostri Smash Burger: Chick, Pig, Beef e Intruso"
          className="w-full h-auto block"
          loading="eager"
          width="1200"
          height="800"
        />
        <img
          src={menu2}
          alt="3 Smash Palermo - Menu Completo"
          title="Menu completo: Starters, Sweets, Bevande e Salse"
          className="w-full h-auto block"
          loading="lazy"
          width="1200"
          height="800"
        />
      </div>

      {/* Footer */}
      <footer className="bg-[#2D2C72] relative overflow-hidden">
        <div className="checkerboard-cream h-[50px]" />
        <div className="py-12 px-6 md:px-10 lg:px-16 relative z-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <img
                src={logoHero}
                alt="3 Smash Palermo - Logo"
                title="3 Smash Palermo - Smash Burger Artigianali"
                className="h-10 md:h-14 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-200"
                loading="lazy"
                width="120"
                height="56"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <p className="text-[#faf3e3]/80 text-sm">{siteData.address.full}</p>
                <a href={`mailto:${siteData.contact.email}`} className="text-[#faf3e3]/80 hover:text-[#faf3e3] text-sm transition-colors">{siteData.contact.email}</a>
                <a href={`tel:${siteData.contact.phone}`} className="text-[#faf3e3]/80 hover:text-[#faf3e3] text-sm transition-colors">{siteData.contact.phoneFormatted}</a>
              </div>
              <a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#faf3e3]/80 hover:text-[#faf3e3] hover:scale-110 transition-all duration-200 text-sm uppercase tracking-wider font-bold"
              >
                {siteData.social.instagramHandle}
              </a>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#faf3e3]/15">
              <p className="text-[#faf3e3]/70 text-sm">
                © {new Date().getFullYear()} {siteData.name}. Tutti i diritti riservati.
              </p>
              <div className="flex gap-6">
                <Link to="/privacy-policy" className="text-[#faf3e3]/80 hover:text-[#faf3e3] text-sm transition-colors" onClick={() => window.scrollTo(0, 0)}>
                  Privacy Policy
                </Link>
                <Link to="/cookie-policy" className="text-[#faf3e3]/80 hover:text-[#faf3e3] text-sm transition-colors" onClick={() => window.scrollTo(0, 0)}>
                  Cookie Policy
                </Link>
              </div>
            </div>
            <div className="text-center pt-4">
              <a href="https://webwiseitalia.com/" target="_blank" rel="noopener noreferrer" className="text-[#faf3e3]/40 hover:text-[#faf3e3]/60 text-xs transition-colors underline">
                Powered by Webwise
              </a>
            </div>
          </div>
        </div>
        <div className="checkerboard-cream h-[50px]" />
      </footer>
    </div>
  );
}
