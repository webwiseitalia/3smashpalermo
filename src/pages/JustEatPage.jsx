import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import logoHero from '../assets/logo-hero-3smash.webp';
import scontBeef from '../assets/nuove foto hero/Beef.webp';
import scontPig from '../assets/nuove foto hero/Pig.webp';
import scontChick from '../assets/nuove foto hero/Chick.webp';
import scontFries from '../assets/nuove foto hero/Fries.webp';
import scontNuggets from '../assets/nuove foto hero/Nuggets.webp';
import scontAmericanFries from '../assets/nuove foto hero/American Fries.webp';
import scontMeatballs from '../assets/nuove foto hero/Meat balls 2.webp';
import scontPulledPork from '../assets/scontornati/Pulled Pork Balls.webp';
import scontSasitz from '../assets/scontornati/Sasitz.webp';
import scontRolly from '../assets/scontornati/Rolly.webp';
import scontPorkins from "../assets/scontornati/Porkin's.webp";
import scontCookie from '../assets/scontornati/Cookies.webp';
import scontNutellaBun from '../assets/scontornati/Nutella Bun.webp';
import scontChickChock from '../assets/scontornati/Chick - Chock.webp';
import scontIntruso from '../assets/scontornati/Intruso.webp';

// All food lands at bottom: 100px, scattered horizontally across the page
const scatteredFood = [
  { img: scontBeef, size: 'w-[32rem] md:w-[52rem]', left: '-12%', delay: 0.1, rotate: 15 },
  { img: scontFries, size: 'w-[30rem] md:w-[48rem]', left: '75%', delay: 0.2, rotate: -20 },
  { img: scontNuggets, size: 'w-[26rem] md:w-[44rem]', left: '-18%', delay: 0.35, rotate: 10 },
  { img: scontPig, size: 'w-[28rem] md:w-[46rem]', left: '80%', delay: 0.15, rotate: -12 },
  { img: scontAmericanFries, size: 'w-[30rem] md:w-[48rem]', left: '5%', delay: 0.4, rotate: -8 },
  { img: scontChick, size: 'w-[28rem] md:w-[46rem]', left: '60%', delay: 0.3, rotate: 18 },
  { img: scontMeatballs, size: 'w-[24rem] md:w-[40rem]', left: '-8%', delay: 0.5, rotate: 22 },
  { img: scontSasitz, size: 'w-[24rem] md:w-[40rem]', left: '85%', delay: 0.45, rotate: -15 },
  { img: scontRolly, size: 'w-[26rem] md:w-[42rem]', left: '15%', delay: 0.55, rotate: -10 },
  { img: scontPorkins, size: 'w-[26rem] md:w-[42rem]', left: '70%', delay: 0.6, rotate: 14 },
  { img: scontCookie, size: 'w-[22rem] md:w-[36rem]', left: '30%', delay: 0.65, rotate: -25 },
  { img: scontNutellaBun, size: 'w-[22rem] md:w-[36rem]', left: '50%', delay: 0.7, rotate: 20 },
  { img: scontPulledPork, size: 'w-[24rem] md:w-[40rem]', left: '40%', delay: 0.25, rotate: -18 },
  { img: scontChickChock, size: 'w-[26rem] md:w-[44rem]', left: '25%', delay: 0.32, rotate: -14 },
  { img: scontIntruso, size: 'w-[28rem] md:w-[46rem]', left: '55%', delay: 0.48, rotate: 16 },
];

export default function JustEatPage() {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.jeat-food').forEach((el) => {
        const delay = parseFloat(el.dataset.delay) || 0;
        const rotate = parseFloat(el.dataset.rotate) || 0;
        gsap.fromTo(el,
          { y: '-120vh', rotation: rotate * 4, opacity: 0 },
          { y: 0, rotation: rotate, opacity: 1, duration: 2.8, ease: 'bounce.out', delay }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="h-screen bg-[#2D2C72] relative overflow-hidden flex flex-col">
      {/* Checkerboard top */}
      <div className="checkerboard-cream h-[50px] bg-[#2D2C72] shrink-0 relative z-20" />

      {/* Food items — land just above bottom checkerboard */}
      {scatteredFood.map((item, i) => (
        <div
          key={i}
          className={`jeat-food absolute ${item.size} pointer-events-none`}
          data-delay={item.delay}
          data-rotate={item.rotate}
          style={{
            left: item.left,
            bottom: '-30px',
          }}
        >
          <img src={item.img} alt="" className="w-full h-auto" style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }} />
        </div>
      ))}

      <div className="flex-1 flex items-start justify-center relative pt-8 md:pt-12">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#faf3e3 1px, transparent 1px), linear-gradient(90deg, #faf3e3 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Content — centered, pushed up */}
        <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-3xl px-6">
          <img
            src={logoHero}
            alt="3 Smash Palermo"
            className="w-32 md:w-40 brightness-0 invert opacity-90"
            width="160"
            height="160"
          />

          <span className="retro-badge text-xs tracking-[0.3em] bg-[#faf3e3] text-[#2D2C72] border-[#faf3e3]">
            Ordini Online
          </span>

          <h1 className="text-[#faf3e3] text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase leading-[0.9] whitespace-nowrap">
            <span className="block">In Arrivo</span>
            <span className="block">A Breve</span>
          </h1>

          <p className="text-[#faf3e3]/60 text-lg md:text-xl max-w-md leading-relaxed">
            Stiamo preparando qualcosa di speciale. Presto potrai ordinare i tuoi smash burger preferiti direttamente da qui!
          </p>

          <div className="w-20 h-1 bg-[#faf3e3]/20 rounded-full" />

          <button
            onClick={() => navigate('/')}
            className="retro-btn retro-btn-cream text-sm tracking-[0.15em]"
          >
            Torna al Sito
          </button>
        </div>
      </div>

      {/* Checkerboard bottom */}
      <div className="checkerboard-cream h-[50px] bg-[#2D2C72] shrink-0 relative z-20" />
    </div>
  );
}
