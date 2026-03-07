import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

import { Link } from 'react-router-dom';

import logo from '../assets/logo.webp';
import logoHero from '../assets/logo-hero-3smash.webp';
import sidesPatatine from '../assets/sides-patatine-nuggets.webp';
// Smash burger photos (blue background)
import smashBeef from '../assets/smash/Beef.webp';
import smashPork from '../assets/smash/Pork.webp';
import smashChick from '../assets/smash/Chick.webp';
import smashIntruso from '../assets/smash/Intruso.webp';
// Content photos (professional shots)
import content1 from '../assets/content/content-1.webp';
import content2 from '../assets/content/content-2.webp';
import content3 from '../assets/content/content-3.webp';
import content4 from '../assets/content/content-4.webp';
import content5 from '../assets/content/content-5.webp';
import content6 from '../assets/content/content-6.webp';
import content7 from '../assets/content/content-7.webp';
import content8 from '../assets/content/content-8.webp';
// Sweets
import sweetCookie from '../assets/sweets/Cookie.webp';
import sweetNutella from '../assets/sweets/Nutella Bun.webp';
// Scontornati (cutout images)
import scontBeef from '../assets/scontornati/Beef.webp';
import scontChick from '../assets/scontornati/Chick.webp';
import scontPig from '../assets/scontornati/Pig.webp';
import scontFries from '../assets/scontornati/Fries.webp';
import scontNuggets from '../assets/scontornati/Nuggets.webp';
import scontAmericanFries from '../assets/scontornati/American Fries.webp';
import scontChickChock from '../assets/scontornati/Chick - Chock.webp';
import scontMeatballs from '../assets/scontornati/Meat balls 2.webp';
import scontPulledPork from '../assets/scontornati/Pulled Pork Balls.webp';
import scontSasitz from '../assets/scontornati/Sasitz.webp';
import scontRolly from '../assets/scontornati/Rolly.webp';
import scontPorkins from "../assets/scontornati/Porkin's.webp";
import scontNutellaBun from '../assets/scontornati/Nutella Bun.webp';
import scontCookie from '../assets/scontornati/Cookies.webp';
import siteData from '../constants/siteData';

gsap.registerPlugin(ScrollTrigger);

// Falling burgers — 3 colossal smash burgers stacking on the left, overflowing off-screen
// Note: container is w-1/2 so left % values are relative to half the screen
const fallingFood = [
  // Bottom burger — Beef (lands first, sits at very bottom of hero)
  { img: scontBeef, size: 'w-[36rem] md:w-[56rem] lg:w-[80rem]', left: '-85%', mdLeft: '-54%', bottom: '-150px', mdBottom: '-390px', delay: 0.1, rotate: -6 },
  // Middle burger — Pig (stacks on top)
  { img: scontPig, size: 'w-[32rem] md:w-[52rem] lg:w-[75rem]', left: '-80%', mdLeft: '-48%', bottom: '-30px', mdBottom: '-190px', delay: 0.35, rotate: 8 },
  // Top burger — Chick (stacks on top)
  { img: scontChick, size: 'w-[28rem] md:w-[48rem] lg:w-[70rem]', left: '-75%', mdLeft: '-42%', bottom: '100px', mdBottom: '10px', delay: 0.6, rotate: -5 },
  // Meatballs — mobile only, far left corner
  { img: scontMeatballs, size: 'w-[24rem]', left: '-95%', mdLeft: '-54%', bottom: '-250px', mdBottom: '-390px', delay: 0.8, rotate: 10, mobileOnly: true },
];

// Falling starters — stacking on the right side
// Note: container is w-1/2 so right % values are relative to half the screen
const fallingStarters = [
  // Bottom right — American Fries
  { img: scontAmericanFries, size: 'w-[22rem] md:w-[36rem] lg:w-[50rem]', right: '-75%', mdRight: '-40%', bottom: '-70px', mdBottom: '-240px', delay: 0.2, rotate: 6 },
  // Nuggets — nestled between the two fries
  { img: scontNuggets, size: 'w-[20rem] md:w-[32rem] lg:w-[45rem]', right: '-65%', mdRight: '-24%', bottom: '-20px', mdBottom: '-160px', delay: 0.25, rotate: -8 },
  // Fries (tilted -30°, overlapping American Fries from the left)
  { img: scontFries, size: 'w-[22rem] md:w-[36rem] lg:w-[50rem]', right: '-45%', mdRight: '-10%', bottom: '-70px', mdBottom: '-240px', delay: 0.3, rotate: -30 },
];

export default function HomePage() {
  const mainRef = useRef(null);
  const chiSiamoRef = useRef(null);
  const chiSiamoTrackRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStarter, setActiveStarter] = useState(null);
  const galleryRef = useRef(null);
  const [polaroidPositions, setPolaroidPositions] = useState({});
  const [dragging, setDragging] = useState(null);
  const [topZ, setTopZ] = useState(20);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [showDragHint, setShowDragHint] = useState(false);
  const [dragHintDismissed, setDragHintDismissed] = useState(false);
  const dragHintRef = useRef(null);

  useEffect(() => {
    if (dragHintDismissed || !galleryRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !dragHintDismissed) {
          setShowDragHint(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, [dragHintDismissed]);

  const handlePointerDown = (e, i) => {
    e.preventDefault();
    if (showDragHint) {
      setShowDragHint(false);
      setDragHintDismissed(true);
    }
    const rect = galleryRef.current.getBoundingClientRect();
    const el = e.currentTarget;
    const elRect = el.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - elRect.left, y: e.clientY - elRect.top };
    setDragging(i);
    setTopZ(prev => prev + 1);
    setPolaroidPositions(prev => ({ ...prev, [i]: { ...(prev[i] || {}), z: topZ + 1 } }));
  };

  useEffect(() => {
    if (dragging === null) return;
    const handleMove = (e) => {
      const rect = galleryRef.current.getBoundingClientRect();
      const x = Math.max(-5, Math.min(95, ((e.clientX - rect.left - dragOffset.current.x) / rect.width) * 100));
      const y = Math.max(0, Math.min(90, ((e.clientY - rect.top - dragOffset.current.y) / rect.height) * 100));
      setPolaroidPositions(prev => ({ ...prev, [dragging]: { ...prev[dragging], left: `${x}%`, top: `${y}%` } }));
    };
    const handleUp = () => setDragging(null);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [dragging]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Falling burgers animation — 3 giant burgers stacking on the left
      gsap.utils.toArray('.falling-food').forEach((el) => {
        const delay = parseFloat(el.dataset.delay) || 0;
        const rotate = parseFloat(el.dataset.rotate) || 0;
        gsap.fromTo(el,
          {
            y: '-120vh',
            rotation: rotate * 4,
            opacity: 0,
          },
          {
            y: 0,
            rotation: rotate,
            opacity: 1,
            duration: 1.8,
            ease: 'bounce.out',
            delay: delay,
          }
        );
      });

      // Hero logo entrance
      gsap.from('.hero-logo', {
        scale: 0.6,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Hero subtitle
      gsap.from('.hero-sub', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4,
      });

      // Hero CTA
      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      });

      // Overlapping title reveals
      gsap.utils.toArray('.overlap-title').forEach((el) => {
        gsap.from(el, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Section reveals
      gsap.utils.toArray('.reveal-section').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Menu cards stagger
      gsap.utils.toArray('.menu-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.08,
        });
      });

      // Parallax images
      gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.to(img, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Chi Siamo horizontal photo scroll (driven by vertical scroll)
      const chiTrack = chiSiamoTrackRef.current;
      if (chiTrack) {
        const totalScroll = chiTrack.scrollWidth - chiTrack.parentElement.offsetWidth;
        gsap.to(chiTrack, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: chiSiamoRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Horizontal scroll text
      gsap.to('.scroll-text', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scroll-text-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Smash Burgers - from real menu
  const menuItems = [
    { name: "Beef", desc: "Patty di manzo, cheddar, cipolla, cetriolo e salsa burger", price: "4.90", img: smashBeef, extra: "Aggiungi uno smash €2,50" },
    { name: "Pig", desc: "Patty di maiale, scamorza affumicata, cipolla caramellata e BBQ al Nero d'Avola", price: "4.90", img: smashPork },
    { name: "Chick", desc: "Patty di pollo, Brie, pomodoro a fette e salsa Alabama Peppery", price: "4.90", img: smashChick },
    { name: "Intruso", desc: "Scopri il panino misterioso! Cambia ogni settimana", price: "4.90", img: smashIntruso },
  ];

  // Starters
  const starters = [
    { name: "Fries", price: "2.50", img: scontFries },
    { name: "American Fries", price: "3.90", img: scontAmericanFries },
    { name: "Nuggets", desc: "6pz", price: "3.90", img: scontNuggets },
    { name: "Chick-Chock", desc: "Sovracosce di pollo cotte a CBT e fritte — 4pz", price: "3.90", img: scontChickChock },
    { name: "Meatballs", desc: "Polpette di manzo cotte CBT e fritte — 4pz", price: "3.90", img: scontMeatballs },
    { name: "Pulled Pork Balls", desc: "Polpette di pulled cotte al barbecue e fritte — 3pz", price: "3.90", img: scontPulledPork },
  ];

  // New Starters
  const newStarters = [
    { name: "Sasitz", desc: "Salsiccia di maiale cotta a CBT panata e fritta — 6pz", price: "4.50", img: scontSasitz },
    { name: "Rolly", desc: "Involtino siciliano salamino fritto 2pz + involtino siciliano lime fritto 2pz — 4pz", price: "4.50", img: scontRolly },
    { name: "Porkin's", desc: "Involtini primavera di Pulled Pork fritti — 3pz", price: "4.50", img: scontPorkins },
  ];

  // Sweets
  const sweets = [
    { name: "Nutella Bun", desc: "Bun al cacao con Nutella", price: "2.50", img: sweetNutella, scontornato: scontNutellaBun },
    { name: "Cookie", desc: "Con gocce di cioccolato", price: "1.50", img: sweetCookie, scontornato: scontCookie },
  ];

  // Bevande
  const drinks = [
    { name: "Acqua", desc: "50cl", price: "1.20" },
    { name: "Bibite", desc: "33cl — Coca Cola, Coca Cola Zero, Fanta, Sprite e Fuzetea", price: "2.50" },
  ];

  // Salse
  const salse = "BBQ al Nero d'Avola, salsa Alabama Peppery, salsa burger, ketchup e maionese — €0,50";

  return (
    <div ref={mainRef} className="bg-[#faf3e3] overflow-x-hidden">

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf3e3]">
        <div className="flex justify-between items-center px-6 md:px-12 py-4">
          <a
            href="#home"
            className="relative z-10 hover:scale-105 transition-transform duration-200"
          >
            <img src={logoHero} alt="3 Smash Palermo - Logo" title="3 Smash Palermo" className="h-10 md:h-14" width="120" height="56" loading="lazy" style={{ filter: 'brightness(0) saturate(100%) invert(22%) sepia(63%) saturate(1567%) hue-rotate(209deg) brightness(87%) contrast(92%)' }} />
          </a>

          <div className="hidden md:flex gap-10 items-center">
            {['Menu', 'Chi Siamo', 'Contatti'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[#2D2C72] text-sm uppercase tracking-[0.2em] font-bold hover:text-[#1a1a45] hover:-translate-y-0.5 transition-all duration-200 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#2D2C72] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://instagram.com/3smashpalermo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D2C72] p-2.5 border-2 border-[#2D2C72] hover:bg-[#2D2C72] hover:text-[#faf3e3] hover:scale-110 transition-all duration-300 rounded-full"
              aria-label="Seguici su Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://tiktok.com/@3smashpalermo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D2C72] p-2.5 border-2 border-[#2D2C72] hover:bg-[#2D2C72] hover:text-[#faf3e3] hover:scale-110 transition-all duration-300 rounded-full"
              aria-label="Seguici su TikTok"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
          </div>

          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span className="w-7 h-0.5 bg-[#2D2C72] block rounded-full" animate={mobileMenuOpen ? { rotate: 45, y: 8, backgroundColor: '#faf3e3' } : { rotate: 0, y: 0, backgroundColor: '#2D2C72' }} transition={{ duration: 0.3 }} />
            <motion.span className="w-7 h-0.5 bg-[#2D2C72] block rounded-full" animate={mobileMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }} transition={{ duration: 0.3 }} />
            <motion.span className="w-7 h-0.5 bg-[#2D2C72] block rounded-full" animate={mobileMenuOpen ? { rotate: -45, y: -8, backgroundColor: '#faf3e3' } : { rotate: 0, y: 0, backgroundColor: '#2D2C72' }} transition={{ duration: 0.3 }} />
          </motion.button>
        </div>
        <div className="checkerboard-sm h-[36px]" />
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#2D2C72] flex flex-col justify-center items-center"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute top-0 left-0 right-0 checkerboard-cream h-[50px]" />
            <div className="absolute bottom-0 left-0 right-0 checkerboard-cream h-[50px]" />
            <nav className="flex flex-col items-center gap-8">
              {['Menu', 'Chi Siamo', 'Contatti'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-[#faf3e3] text-4xl md:text-5xl font-display font-bold uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="https://instagram.com/3smashpalermo"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 retro-btn-cream retro-btn text-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                Instagram
              </motion.a>
            </nav>
            <div className="absolute bottom-10 left-10 text-[#faf3e3]/20 text-9xl font-black" style={{ fontFamily: 'system-ui' }}>3</div>
            <div className="absolute top-20 right-10 text-[#faf3e3]/10 text-7xl font-black" style={{ fontFamily: 'system-ui' }}>3</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HERO - Big Centered Logo ===== */}
      <section id="home" className="min-h-screen bg-[#2D2C72] relative overflow-hidden flex flex-col items-center justify-center" style={{ paddingTop: '80px', paddingBottom: '120px' }}>

        {/* Grid texture — same as Chi Siamo */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(#faf3e3 1px, transparent 1px), linear-gradient(90deg, #faf3e3 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Decorative 3s */}
        <div className="absolute top-32 -right-20 text-[#faf3e3]/[0.05] text-[30rem] font-black select-none pointer-events-none leading-none" style={{ fontFamily: 'system-ui', transform: 'rotate(12deg)' }}>3</div>
        <div className="absolute -bottom-16 -left-16 text-[#faf3e3]/[0.04] text-[24rem] font-black select-none pointer-events-none leading-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-8deg)' }}>3</div>

        {/* Falling food animation — left half */}
        <div className="absolute top-0 left-0 bottom-0 w-1/2 md:overflow-hidden z-[1]">
          {fallingFood.map((item, i) => (
            <div
              key={i}
              className={`falling-food absolute ${item.size} falling-burger-${i}${item.mobileOnly ? ' md:hidden' : ''}`}
              style={{ '--mob-left': item.left, '--mob-bottom': item.bottom, '--desk-left': item.mdLeft, '--desk-bottom': item.mdBottom }}
              data-delay={item.delay}
              data-rotate={item.rotate}
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-auto object-contain"
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Falling starters animation — right half */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden z-[1]">
          {fallingStarters.map((item, i) => (
            <div
              key={i}
              className={`falling-food absolute ${item.size} falling-starter-${i}`}
              style={{ '--mob-right': item.right, '--mob-bottom': item.bottom, '--desk-right': item.mdRight, '--desk-bottom': item.mdBottom }}
              data-delay={item.delay}
              data-rotate={item.rotate}
            >
              <img
                src={item.img}
                alt=""
                className="w-full h-auto object-contain"
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Content — on top of falling food */}
        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          <div className="retro-badge-outline text-[#faf3e3] border-[#faf3e3] text-xs tracking-[0.3em] mb-8 hero-sub">
            Mercato San Lorenzo — Palermo
          </div>

          <h1 className="hero-logo mb-8">
            <img
              src={logoHero}
              alt="3 Smash Palermo"
              title="3 Smash - Smash Burger Artigianali"
              className="w-[90vw] max-w-[900px] h-auto"
              style={{ filter: 'brightness(0) saturate(100%) invert(95%) sepia(10%) saturate(400%) hue-rotate(10deg) brightness(103%) contrast(96%)' }}
            />
          </h1>

          <p className="hero-sub text-[#faf3e3]/90 text-lg md:text-xl lg:text-2xl max-w-xl leading-relaxed mb-10">
            Carne fresca schiacciata sul griddle rovente. Quella crosticina caramellata che non dimentichi.
          </p>

          <div className="hero-cta flex flex-wrap gap-5 justify-center">
            <a
              href="#menu"
              className="retro-btn retro-btn-cream text-sm md:text-base hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              Scopri il Menu
            </a>
            <a
              href="#contatti"
              className="retro-btn text-sm md:text-base border-[#faf3e3] text-[#faf3e3] bg-transparent hover:scale-105 transition-transform duration-200"
              style={{ boxShadow: '4px 4px 0 #faf3e3' }}
            >
              Dove Siamo
            </a>
          </div>
        </div>

        {/* Checkerboard bottom */}
        <div className="absolute bottom-0 left-0 right-0 checkerboard-cream h-[50px]" />
      </section>

      {/* ===== Scrolling Text Banner ===== */}
      <section className="scroll-text-container py-5 bg-[#faf3e3] overflow-hidden border-b-4 border-[#2D2C72]">
        <div className="scroll-text flex gap-12 whitespace-nowrap text-[#2D2C72] text-4xl md:text-6xl font-display font-bold uppercase">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex gap-12 items-center">
              <span>Smash Burger</span>
              <span className="text-[#2D2C72]/30 font-black text-3xl" style={{ fontFamily: 'system-ui' }}>✦</span>
              <span>Palermo</span>
              <span className="text-[#2D2C72]/30 font-black text-3xl" style={{ fontFamily: 'system-ui' }}>✦</span>
              <span>Dal 2020</span>
              <span className="text-[#2D2C72]/30 font-black text-3xl" style={{ fontFamily: 'system-ui' }}>✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ===== EVENTO ===== */}
      <section className="bg-[#faf3e3] relative overflow-hidden">
        {/* Grid paper background — same as menu section */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#2D2C72 1px, transparent 1px), linear-gradient(90deg, #2D2C72 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.04
        }} />

        {/* Giant overlapping title */}
        <div className="relative pt-16 md:pt-24 pb-0">
          <div className="px-6 md:px-10 lg:px-16 relative z-10">
            <span className="retro-badge text-xs tracking-[0.3em] mb-4 inline-block reveal-section">Save the date</span>
          </div>
          <h2 className="overlap-title text-[#2D2C72] text-[3.5rem] md:text-[6rem] lg:text-[9rem] xl:text-[11rem] font-display font-bold uppercase leading-[0.85] px-6 md:px-10 lg:px-16 relative z-20 mb-[-1.5rem] md:mb-[-3rem] lg:mb-[-5rem]">
            Smash<br />Night
          </h2>
        </div>

        {/* Event content — title overlaps onto it */}
        <div className="relative z-10 px-6 md:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">

            {/* Left — Landscape photo with event details */}
            <div className="flex-[2]">
              <div
                className="relative overflow-hidden rounded-2xl border-4 border-[#2D2C72] h-[400px] md:h-[550px] lg:h-[650px] hover:-translate-y-1 transition-transform duration-300"
                style={{ boxShadow: '8px 8px 0 #2D2C72' }}
              >
                <img
                  src={content8}
                  alt="Smash Night - Evento 3 Smash Palermo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2040]/90 via-[#1a2040]/20 to-transparent" />

                {/* Event details overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <p className="text-[#faf3e3]/90 text-base md:text-lg max-w-xl leading-relaxed mb-6">
                    Una serata speciale dedicata agli amanti dello smash burger. Musica dal vivo, birre artigianali e i nostri smash in edizione limitata.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    <span className="bg-[#faf3e3] text-[#2D2C72] px-4 py-2 rounded-full font-display font-bold text-sm md:text-base border-3 border-[#2D2C72]" style={{ boxShadow: '3px 3px 0 #2D2C72' }}>
                      Sab 15 Marzo
                    </span>
                    <span className="bg-[#faf3e3] text-[#2D2C72] px-4 py-2 rounded-full font-display font-bold text-sm md:text-base border-3 border-[#2D2C72]" style={{ boxShadow: '3px 3px 0 #2D2C72' }}>
                      Ore 19:00
                    </span>
                    <span className="bg-[#2D2C72] text-[#faf3e3] px-4 py-2 rounded-full font-display font-bold text-sm md:text-base border-3 border-[#faf3e3]" style={{ boxShadow: '3px 3px 0 rgba(245,230,200,0.3)' }}>
                      Ingresso Libero
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Vertical photo (Instagram post style) */}
            <div className="flex-[1]">
              <div
                className="relative overflow-hidden rounded-2xl border-4 border-[#2D2C72] h-[400px] md:h-[550px] lg:h-[650px] hover:-translate-y-1 transition-transform duration-300 group"
                style={{ boxShadow: '8px 8px 0 #2D2C72' }}
              >
                <img
                  src={content1}
                  alt="Smash Night - Post Instagram"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Instagram-style indicator */}
                <div className="absolute top-4 right-4 bg-[#faf3e3] text-[#2D2C72] w-10 h-10 rounded-full flex items-center justify-center border-3 border-[#2D2C72]" style={{ boxShadow: '3px 3px 0 #2D2C72' }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-16 md:h-24" />
      </section>

      {/* ===== GALLERIA ===== */}
      <section className="bg-[#2D2C72] relative">
        <div className="checkerboard-cream h-[50px] relative z-30" />

        {/* Drag area — overflow hidden clips polaroids at borders */}
        <div ref={galleryRef} className="relative min-h-[600px] md:min-h-[800px] lg:min-h-[900px] overflow-hidden">

          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: 'linear-gradient(#faf3e3 1px, transparent 1px), linear-gradient(90deg, #faf3e3 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

          {/* Giant overlapping title — absolute + z-40 so polaroids never cover it */}
          <div className="absolute top-0 left-0 right-0 pt-12 md:pt-20 px-6 md:px-10 lg:px-16 text-center z-40 pointer-events-none">
            <span className="retro-badge-outline text-xs tracking-[0.3em] mb-8 inline-block reveal-section" style={{ color: '#faf3e3', borderColor: '#faf3e3' }}>
              I nostri momenti
            </span>
            <h2 className="overlap-title text-[#faf3e3] text-[3.5rem] md:text-[6rem] lg:text-[9rem] xl:text-[11rem] font-display font-bold uppercase leading-[0.85]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              Galleria
            </h2>
          </div>
            {[
              /* Left edge */
              { img: content1, caption: 'Street food!', rotate: 8, top: '5%', left: '0%', w: 'w-[40%] md:w-[26%]', z: 1 },
              { img: content4, caption: 'Sicilia mia', rotate: -10, top: '35%', left: '-2%', w: 'w-[38%] md:w-[24%]', z: 2 },
              { img: content8, caption: 'Fuoco! 🔥', rotate: 13, top: '65%', left: '2%', w: 'w-[36%] md:w-[23%]', z: 3 },
              /* Center-left */
              { img: content5, caption: 'Smash time 🔥', rotate: -12, top: '0%', left: '20%', w: 'w-[42%] md:w-[28%]', z: 4 },
              { img: content3, caption: 'Mercato vibes', rotate: 10, top: '18%', left: '28%', w: 'w-[38%] md:w-[25%]', z: 7 },
              { img: content6, caption: 'Good times', rotate: -5, top: '38%', left: '24%', w: 'w-[43%] md:w-[28%]', z: 8 },
              { img: content3, caption: 'Palermo style', rotate: 7, top: '55%', left: '18%', w: 'w-[41%] md:w-[27%]', z: 5, desktopOnly: true },
              { img: content2, caption: 'Crosticina!', rotate: -6, top: '70%', left: '30%', w: 'w-[40%] md:w-[26%]', z: 6 },
              /* Center */
              { img: content2, caption: 'Stack perfetto', rotate: 6, top: '3%', left: '42%', w: 'w-[40%] md:w-[26%]', z: 5, desktopOnly: true },
              { img: content7, caption: 'Cheese pull 🧀', rotate: -8, top: '22%', left: '50%', w: 'w-[42%] md:w-[27%]', z: 6 },
              { img: content1, caption: 'Smash Night!', rotate: 8, top: '35%', left: '48%', w: 'w-[40%] md:w-[26%]', z: 3, desktopOnly: true },
              { img: content7, caption: 'Che bontà', rotate: -9, top: '58%', left: '44%', w: 'w-[39%] md:w-[26%]', z: 9, desktopOnly: true },
              { img: content6, caption: 'Best burger', rotate: 12, top: '72%', left: '48%', w: 'w-[38%] md:w-[25%]', z: 10, desktopOnly: true },
              /* Center-right */
              { img: content8, caption: 'Sul griddle', rotate: -3, top: '1%', left: '58%', w: 'w-[44%] md:w-[30%]', z: 3, desktopOnly: true },
              { img: content4, caption: 'The Pig 🐷', rotate: 14, top: '16%', left: '16%', w: 'w-[36%] md:w-[24%]', z: 1, desktopOnly: true },
              { img: content5, caption: 'Griddle life', rotate: -11, top: '40%', left: '60%', w: 'w-[38%] md:w-[25%]', z: 2, desktopOnly: true },
              { img: content4, caption: 'Dal 2020 ❤️', rotate: 4, top: '52%', left: '60%', w: 'w-[42%] md:w-[28%]', z: 4, desktopOnly: true },
              /* Right edge */
              { img: content3, caption: 'San Lorenzo', rotate: -7, top: '8%', left: '76%', w: 'w-[36%] md:w-[24%]', z: 2, desktopOnly: true },
              { img: content5, caption: 'Smash lover', rotate: 11, top: '40%', left: '78%', w: 'w-[34%] md:w-[23%]', z: 1 },
              { img: content2, caption: 'Numero 3 ✌️', rotate: -5, top: '68%', left: '74%', w: 'w-[38%] md:w-[25%]', z: 3 },
            ].map((item, i) => {
              const pos = polaroidPositions[i] || {};
              return (
                <div
                  key={i}
                  className={`absolute ${item.w} group reveal-section touch-none select-none${item.desktopOnly ? ' hidden md:block' : ''}`}
                  style={{
                    top: pos.top || item.top,
                    left: pos.left || item.left,
                    zIndex: pos.z || item.z,
                    transform: `rotate(${item.rotate}deg)`,
                    cursor: dragging === i ? 'grabbing' : 'grab',
                    transition: dragging === i ? 'none' : 'box-shadow 0.3s',
                  }}
                  onPointerDown={(e) => handlePointerDown(e, i)}
                >
                  <div
                    className={`bg-[#faf3e3] p-2 md:p-3 pb-10 md:pb-14 rounded-sm ${dragging === i ? 'scale-105' : 'hover:scale-105'}`}
                    style={{ boxShadow: dragging === i ? '8px 12px 30px rgba(0,0,0,0.5)' : '4px 6px 20px rgba(0,0,0,0.4)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  >
                    <div className="overflow-hidden pointer-events-none">
                      <img
                        src={item.img}
                        alt="3 Smash Palermo"
                        className="w-full aspect-[4/3] object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <p className="absolute bottom-2 md:bottom-4 left-3 md:left-4 text-[#2D2C72]/80 text-xs md:text-sm font-medium pointer-events-none" style={{ fontFamily: "'Caveat', cursive" }}>
                      {item.caption}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Drag hint — animated hand with ripple effect */}
            {showDragHint && (
              <div className="absolute z-50 pointer-events-none" style={{ top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="animate-drag-hint flex flex-col items-center">
                  {/* Ripple circles */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#faf3e3]/20" style={{ animation: 'dragRipple 2.5s ease-out infinite' }} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#faf3e3]/15" style={{ animation: 'dragRipple 2.5s ease-out infinite 0.4s' }} />
                    </div>
                    {/* Hand icon with drag animation */}
                    <div className="relative" style={{ animation: 'dragHandMove 2.5s ease-in-out infinite' }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="md:w-14 md:h-14 drop-shadow-lg">
                        <path d="M8 13V5.5C8 4.67 8.67 4 9.5 4S11 4.67 11 5.5V11h1V3.5C12 2.67 12.67 2 13.5 2S15 2.67 15 3.5V11h1V4.5C16 3.67 16.67 3 17.5 3S19 3.67 19 4.5V11h1V7.5C20 6.67 20.67 6 21.5 6S23 6.67 23 7.5V16c0 3.87-3.13 7-7 7H14c-2.79 0-5.2-1.64-6.32-4L4.49 12.78C4.18 12.3 4.32 11.66 4.8 11.35c.48-.31 1.12-.17 1.43.31L8 13z" fill="#faf3e3"/>
                        <path d="M8 13V5.5C8 4.67 8.67 4 9.5 4S11 4.67 11 5.5V11h1V3.5C12 2.67 12.67 2 13.5 2S15 2.67 15 3.5V11h1V4.5C16 3.67 16.67 3 17.5 3S19 3.67 19 4.5V11h1V7.5C20 6.67 20.67 6 21.5 6S23 6.67 23 7.5V16c0 3.87-3.13 7-7 7H14c-2.79 0-5.2-1.64-6.32-4L4.49 12.78C4.18 12.3 4.32 11.66 4.8 11.35c.48-.31 1.12-.17 1.43.31L8 13z" stroke="#2D2C72" strokeWidth="0.5" strokeOpacity="0.3"/>
                      </svg>
                    </div>
                  </div>
                  {/* Label */}
                  <div className="mt-4 bg-[#faf3e3] text-[#2D2C72] px-5 py-2.5 rounded-full shadow-xl" style={{ animation: 'dragLabelPulse 2.5s ease-in-out infinite' }}>
                    <span className="font-bold text-sm md:text-base tracking-wide" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.2rem' }}>
                      Trascina le foto!
                    </span>
                  </div>
                </div>
              </div>
            )}

        </div>

        <div className="checkerboard-cream h-[50px] relative z-30" />
      </section>

      {/* ===== MENU — Overlapping Titles on Photos ===== */}
      <section id="menu" className="bg-[#faf3e3] relative">
        {/* Grid paper background */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#2D2C72 1px, transparent 1px), linear-gradient(90deg, #2D2C72 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.04
        }} />

        {/* Section intro with overlap */}
        <div className="relative pt-20 md:pt-32 pb-0">
          <div className="px-6 md:px-10 lg:px-16 relative z-10">
            <span className="retro-badge text-xs tracking-[0.3em] mb-4 inline-block reveal-section">Cosa offriamo</span>
          </div>
          {/* Giant title — LEFT aligned */}
          <h2 className="overlap-title text-[#2D2C72] text-[4rem] md:text-[7rem] lg:text-[10rem] xl:text-[12rem] font-display font-bold uppercase leading-[0.85] px-6 md:px-10 lg:px-16 relative z-20 mb-[-2rem] md:mb-[-4rem] lg:mb-[-6rem]">
            Il Nostro<br />Menu
          </h2>
        </div>

        {/* Photo strip that title overlaps onto */}
        <div className="relative z-10 overflow-hidden">
          <div className="flex gap-4 md:gap-6 animate-marquee py-4">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4 md:gap-6 flex-shrink-0">
                {[content1, content2, content4, content5, content8, content3, content6].map((img, i) => (
                  <div
                    key={`${setIndex}-${i}`}
                    className="relative group hover:scale-105 hover:z-10 transition-transform duration-300"
                  >
                    <img
                      src={img}
                      alt="3 Smash Palermo - Galleria"
                      title="Smash burger e momenti al Mercato San Lorenzo"
                      className="h-40 md:h-56 w-auto object-cover rounded-2xl border-3 border-[#2D2C72]"
                      loading="lazy"
                      width="300"
                      height="224"
                      style={{ boxShadow: '4px 4px 0 #2D2C72' }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Menu description */}
        <div className="px-6 md:px-10 lg:px-16 relative z-10 pt-10 md:pt-16">
          <p className="text-[#2D2C72]/80 max-w-lg text-lg reveal-section">
            Ogni burger è preparato al momento con ingredienti freschi. Carne 100% italiana, pane artigianale.
          </p>
        </div>

        {/* Burgers Grid */}
        <div className="px-6 md:px-10 lg:px-16 relative z-10 pt-12 md:pt-20 pb-20 md:pb-32">
          {/* Smash Burgers - 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {menuItems.map((item, i) => (
              <div
                key={i}
                className="menu-card group relative hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl border-3 border-[#2D2C72]" style={{ boxShadow: '6px 6px 0 #2D2C72' }}>
                    <img
                      src={item.img}
                      alt={`${item.name} - Smash burger di 3 Smash Palermo`}
                      title={`${item.name} - ${item.desc}`}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-[#2D2C72] text-2xl md:text-3xl lg:text-4xl font-display font-bold uppercase leading-[0.9] -mt-5 md:-mt-7 relative z-10 px-1" style={{ textShadow: '2px 2px 0 #faf3e3, -2px -2px 0 #faf3e3, 2px -2px 0 #faf3e3, -2px 2px 0 #faf3e3, 0 2px 0 #faf3e3, 0 -2px 0 #faf3e3, 2px 0 0 #faf3e3, -2px 0 0 #faf3e3' }}>
                    {item.name}
                  </h3>
                  <div className="absolute top-3 right-3 bg-[#faf3e3] text-[#2D2C72] px-4 py-1.5 font-display text-lg font-bold rounded-full border-3 border-[#2D2C72] z-10" style={{ boxShadow: '3px 3px 0 #2D2C72' }}>
                    €{item.price}
                  </div>
                </div>
                <p className="text-[#2D2C72]/80 text-sm leading-relaxed mt-3 px-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Extra smash note + CTA */}
          <div className="mt-6 reveal-section flex flex-wrap items-center gap-6">
            <span className="retro-badge text-xs tracking-[0.2em]">Aggiungi uno smash — €2,50</span>
            <Link to="/menu" className="retro-btn text-sm md:text-base hover:scale-105 active:scale-95 transition-transform duration-200" onClick={() => window.scrollTo(0, 0)}>
              Scopri Tutto
            </Link>
          </div>

          {/* Starters — compact list with hover image reveal */}
          <div className="mt-24 md:mt-36 reveal-section">
            <h3 className="overlap-title text-[#2D2C72] text-[3rem] md:text-[5rem] lg:text-[7rem] font-display font-bold uppercase leading-[0.85] relative z-20 mb-6 text-center">
              Starters
            </h3>

            <div className="retro-card p-6 md:p-8 relative overflow-visible">
              {[...starters, ...newStarters].map((item, i) => (
                <div
                  key={i}
                  className={`relative py-5 group cursor-default md:hover:translate-x-2 transition-transform duration-200 ${i < starters.length + newStarters.length - 1 ? 'border-b-2 border-dashed border-[#2D2C72]/20' : ''}`}
                  onClick={() => item.img && setActiveStarter(activeStarter === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3">
                        <span className="text-[#2D2C72] text-lg md:text-xl font-medium group-hover:font-bold transition-all">{item.name}</span>
                        {i >= starters.length && <span className="bg-[#2D2C72] text-[#faf3e3] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">New</span>}
                      </div>
                      {item.desc && <span className="text-[#2D2C72]/70 text-xs block mt-0.5">{item.desc}</span>}
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                      <span className="h-px w-8 bg-[#2D2C72]/30 group-hover:w-14 group-hover:bg-[#2D2C72] transition-all" />
                      <span className="text-[#2D2C72] font-display font-bold text-xl">€{item.price}</span>
                    </div>
                  </div>
                  {/* Mobile: image below text when active */}
                  {item.img && activeStarter === i && (
                    <div className="md:hidden flex justify-center pt-3">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-40 w-auto object-contain drop-shadow-xl"
                        style={{ animation: 'fadeInHint 0.3s ease-out' }}
                        loading="lazy"
                      />
                    </div>
                  )}
                  {/* Desktop: hover image reveal */}
                  {item.img && (
                    <div className="hidden md:block absolute right-28 md:right-40 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 z-0">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-60 md:h-80 lg:h-96 w-auto object-contain drop-shadow-xl"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ===== THE EXTRAS — Diner-style unified block ===== */}
          <div className="mt-24 md:mt-36 reveal-section">
            <h3 className="overlap-title text-[#2D2C72] text-[3rem] md:text-[5rem] lg:text-[7rem] font-display font-bold uppercase leading-[0.85] relative z-20 mb-6 text-right">
              The Extras
            </h3>

            <div className="retro-card p-0 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* LEFT — Sweets with big cutout images */}
                <div className="p-6 md:p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-dashed border-[#2D2C72]/20 relative">
                  <span className="retro-badge text-[10px] tracking-[0.3em] mb-8 inline-block">Dolci</span>

                  <div className="space-y-8">
                    {sweets.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 md:gap-6 group cursor-default hover:translate-x-1.5 transition-transform duration-200"
                      >
                        {/* Cutout image */}
                        <div className="flex-shrink-0 w-20 h-20 md:w-40 md:h-40 relative group-hover:scale-[1.08] group-hover:-rotate-3 transition-transform duration-300">
                          <img
                            src={item.scontornato}
                            alt={item.name}
                            className="w-full h-full object-contain drop-shadow-xl"
                            loading="lazy"
                          />
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-[#2D2C72] font-display font-bold text-lg md:text-2xl uppercase leading-tight">{item.name}</h4>
                            <span className="text-[#2D2C72] font-display font-bold text-xl md:text-3xl flex-shrink-0">€{item.price}</span>
                          </div>
                          <p className="text-[#2D2C72]/70 text-sm mt-1">{item.desc}</p>
                          <span className="h-px w-12 bg-[#2D2C72]/20 group-hover:w-20 group-hover:bg-[#2D2C72] transition-all block mt-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — Bevande + Salse compact lists */}
                <div className="p-6 md:p-10 flex flex-col justify-between">
                  {/* Bevande */}
                  <div>
                    <span className="retro-badge text-[10px] tracking-[0.3em] mb-6 inline-block">Bevande</span>
                    <div className="space-y-0">
                      {drinks.map((item, i) => (
                        <div
                          key={i}
                          className={`flex justify-between items-center py-4 group cursor-default hover:translate-x-2 transition-transform duration-200 ${i < drinks.length - 1 ? 'border-b-2 border-dashed border-[#2D2C72]/20' : ''}`}
                        >
                          <div>
                            <span className="text-[#2D2C72] text-lg font-medium group-hover:font-bold transition-all">{item.name}</span>
                            {item.desc && <span className="text-[#2D2C72]/70 text-xs block mt-0.5">{item.desc}</span>}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="h-px w-8 bg-[#2D2C72]/30 group-hover:w-14 group-hover:bg-[#2D2C72] transition-all" />
                            <span className="text-[#2D2C72] font-display font-bold text-xl">€{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-6 border-t-4 border-dotted border-[#2D2C72]/15" />

                  {/* Salse */}
                  <div>
                    <span className="retro-badge text-[10px] tracking-[0.3em] mb-4 inline-block">Le Salse</span>
                    <p className="text-[#2D2C72]/90 text-base leading-relaxed">{salse}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Checkerboard Divider ===== */}
      <div className="checkerboard h-[50px]" />

      {/* ===== CHI SIAMO — Giant Title + Horizontal Scrolling Photos ===== */}
      <section id="chi-siamo" ref={chiSiamoRef} className="bg-[#2D2C72] relative overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#faf3e3 1px, transparent 1px), linear-gradient(90deg, #faf3e3 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Giant overlapping title — RIGHT aligned */}
        <div className="relative pt-20 md:pt-32 px-6 md:px-10 lg:px-16 text-right">
          <span className="retro-badge-outline text-[#faf3e3] border-[#faf3e3] text-xs tracking-[0.3em] mb-4 inline-block reveal-section">
            La nostra storia
          </span>
          <h2 className="overlap-title text-[#faf3e3] text-[4rem] md:text-[7rem] lg:text-[10rem] xl:text-[12rem] font-display font-bold uppercase leading-[0.85] relative z-20 mb-[-2rem] md:mb-[-4rem] lg:mb-[-6rem]">
            Chi<br />Siamo
          </h2>
        </div>

        {/* Horizontal scrolling photos — driven by scroll on desktop, swipeable strip on mobile */}
        <div className="relative z-10 overflow-hidden">
          <div ref={chiSiamoTrackRef} className="flex gap-6 md:gap-8 px-6 md:px-10 lg:px-16 py-4">
            {[
              { img: content8, alt: "Smash burger in preparazione sul griddle rovente", h: "h-64 md:h-[420px]" },
              { img: content6, alt: "Clienti felici al Mercato San Lorenzo", h: "h-64 md:h-[380px] md:mt-10" },
              { img: content1, alt: "Stack di smash burger 3 Smash Palermo", h: "h-64 md:h-[420px]" },
              { img: content5, alt: "Preparazione smash burger sul griddle", h: "h-64 md:h-[360px] md:mt-16" },
              { img: content3, alt: "Esperienza al Mercato San Lorenzo di Palermo", h: "h-64 md:h-[420px]" },
              { img: content2, alt: "Stack di burger 3 Smash Palermo", h: "h-64 md:h-[380px] md:mt-8" },
              { img: content4, alt: "Pig burger in primo piano", h: "h-64 md:h-[400px] md:mt-4" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-[280px] md:w-[350px] lg:w-[400px] ${item.h} hover:scale-[1.03] hover:z-20 transition-transform duration-300`}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded-2xl border-4 border-[#faf3e3]/30"
                  loading="lazy"
                  style={{ boxShadow: '6px 6px 0 rgba(245,230,200,0.2)' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text content */}
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pt-12 md:pt-20 pb-20 md:pb-32">
          <div className="max-w-2xl reveal-section">
            <div className="space-y-6 text-[#faf3e3]/90 text-lg md:text-xl leading-relaxed">
              <p>
                <strong className="text-[#faf3e3]">3 Smash</strong> è nato dalla passione per lo street food autentico americano, reinterpretato con l'anima siciliana.
              </p>
              <p>
                La tecnica dello smash è semplice ma perfetta: una palla di carne fresca schiacciata sul griddle rovente crea quella crosticina caramellata unica.
              </p>
              <p>
                Ci trovi al <strong className="text-[#faf3e3]">Mercato San Lorenzo</strong>, il cuore di Palermo.
              </p>
            </div>

            <a
              href="https://instagram.com/3smashpalermo"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn retro-btn-cream inline-flex items-center gap-4 mt-12 text-sm hover:scale-105 transition-transform duration-200"
            >
              <span>Seguici</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== Checkerboard Divider ===== */}
      <div className="checkerboard h-[50px]" />

      {/* ===== INSTAGRAM — Overlapping Title on Grid ===== */}
      <section className="bg-[#faf3e3] relative overflow-hidden">
        <div className="relative pt-16 md:pt-24 px-6 md:px-10 lg:px-16 text-center">
          {/* Giant title — CENTERED */}
          <h2 className="overlap-title text-[#2D2C72] text-[3rem] md:text-[5rem] lg:text-[7rem] xl:text-[9rem] font-display font-bold uppercase leading-[0.85] relative z-20 mb-[-1rem] md:mb-[-2.5rem] lg:mb-[-4rem]">
            @3smash<br className="md:hidden" />palermo
          </h2>
        </div>

        <div className="px-6 md:px-10 lg:px-16 relative z-10 pb-16 md:pb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[content5, content2, content3, content7, content4, content6].map((img, i) => (
              <a
                key={i}
                href="https://instagram.com/3smashpalermo"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden rounded-2xl group border-3 border-[#2D2C72] hover:scale-105 hover:z-10 transition-transform duration-300"
                style={{ boxShadow: '4px 4px 0 #2D2C72' }}
              >
                <img
                  src={img}
                  alt="3 Smash Palermo su Instagram"
                  title="Seguici su Instagram @3smashpalermo"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                  width="200"
                  height="200"
                />
              </a>
            ))}
          </div>
          <p className="text-[#2D2C72]/80 mt-6 text-lg">Seguici per novità e offerte esclusive</p>
        </div>
      </section>

      {/* ===== Checkerboard Divider ===== */}
      <div className="checkerboard h-[50px]" />

      {/* ===== CONTATTI — Overlapping Title on Map ===== */}
      <section id="contatti" className="bg-[#faf3e3] relative overflow-hidden">
        <div className="px-6 md:px-10 lg:px-16">
          {/* Giant title — RIGHT aligned */}
          <div className="relative pt-20 md:pt-32 text-left">
            <span className="retro-badge text-xs tracking-[0.3em] mb-4 inline-block reveal-section">Ti aspettiamo</span>
            <h2 className="overlap-title text-[#2D2C72] text-[3.5rem] md:text-[6rem] lg:text-[9rem] xl:text-[11rem] font-display font-bold uppercase leading-[0.85] relative z-20 mb-[-1.5rem] md:mb-[-3rem] lg:mb-[-5rem]">
              Vieni a<br />Trovarci
            </h2>
          </div>

          {/* Map that title overlaps onto */}
          <div
            className="relative z-10 rounded-2xl overflow-hidden h-80 md:h-[450px] border-4 border-[#2D2C72] hover:-translate-y-1 transition-transform duration-300"
            style={{ boxShadow: '8px 8px 0 #2D2C72' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.4!2d13.3623!3d38.1157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDA2JzU2LjUiTiAxM8KwMjEnNDQuMyJF!5e0!3m2!1sit!2sit!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Mappa 3 Smash Palermo"
            />
          </div>

          {/* Contact info - inline below map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 md:pt-16 pb-20 md:pb-32 reveal-section text-center">
            {[
              { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Dove', info: ['Mercato San Lorenzo', 'Palermo'] },
              { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Quando', info: ['Mar — Dom: 11:00 — 22:00', 'Lunedì: Chiuso'] },
              { title: 'Social', info: ['@3smashpalermo'], isInstagram: true },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-[#2D2C72] rounded-full flex items-center justify-center flex-shrink-0">
                  {item.isInstagram ? (
                    <svg className="w-5 h-5 text-[#faf3e3]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-[#faf3e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-[#2D2C72] text-xl font-display font-bold uppercase mb-1">{item.title}</h3>
                  {item.info.map((line, j) => (
                    item.isInstagram ? (
                      <a key={j} href="https://instagram.com/3smashpalermo" target="_blank" rel="noopener noreferrer" className="text-[#2D2C72]/80 hover:text-[#2D2C72] transition-colors block font-medium">
                        {line}
                      </a>
                    ) : (
                      <p key={j} className="text-[#2D2C72]/80">{line}</p>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
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
          </div>
        </div>
        <div className="checkerboard-cream h-[50px]" />
      </footer>
    </div>
  );
}
