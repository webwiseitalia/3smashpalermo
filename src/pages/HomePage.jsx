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
import siteData from '../constants/siteData';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const mainRef = useRef(null);
  const chiSiamoRef = useRef(null);
  const chiSiamoTrackRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Floating elements
      gsap.to('.float-element', {
        y: -12,
        duration: 2.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
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
    { name: "Pig", desc: "Patty di maiale, scamorza affumicata, cipolla in agrodolce e BBQ al Nero d'Avola", price: "4.90", img: smashPork },
    { name: "Chick", desc: "Patty di pollo, Brie, pomodoro a fette e salsa Alabama Peppery", price: "4.90", img: smashChick },
    { name: "Intruso", desc: "Scopri il panino misterioso! Cambia ogni settimana", price: "4.90", img: smashIntruso },
  ];

  // Starters
  const starters = [
    { name: "Fries", price: "2.50" },
    { name: "American Fries", price: "3.90" },
    { name: "Nuggets", desc: "6pz", price: "3.90" },
    { name: "Chick-Chock", desc: "Sovracosce di pollo cotto a CBT e fritte — 4pz", price: "3.90" },
    { name: "Meatballs", desc: "Polpette di manzo cotto CBT e fritte — 4pz", price: "3.90" },
    { name: "Pulled Pork Balls", desc: "Polpette di pulled cotte al barbecue e fritte — 3pz", price: "3.90" },
  ];

  // New Starters
  const newStarters = [
    { name: "Sasitz", desc: "Salsiccia di maiale cotta a bassa temperatura e fritta — 6pz", price: "4.50" },
    { name: "Rolly", desc: "2pz involtino salamino fritto + 2pz involtino lime fritto — 4pz", price: "4.50" },
    { name: "Porkin's", desc: "Involtini di Pulled Pork fritti — 3pz", price: "4.50" },
  ];

  // Sweets
  const sweets = [
    { name: "Nutella Bun", desc: "Bun al cacao con Nutella", price: "2.50", img: sweetNutella },
    { name: "Cookie", desc: "Con gocce di cioccolato", price: "1.50", img: sweetCookie },
  ];

  // Bevande
  const drinks = [
    { name: "Acqua", price: "1.20" },
    { name: "Bibite", desc: "Coca Cola, Coca Cola Zero, Fanta, Sprite e Fuzetea", price: "2.50" },
  ];

  // Salse
  const salse = "BBQ al Nero d'Avola, salsa Alabama Peppery, salsa burger, ketchup e maionese — €0,50";

  return (
    <div ref={mainRef} className="bg-[#faf3e3] overflow-x-hidden">

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf3e3] border-b-4 border-[#3451a1]">
        <div className="checkerboard-sm h-[36px]" />
        <div className="flex justify-between items-center px-6 md:px-12 py-4">
          <motion.a
            href="#home"
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
          >
            <img src={logo} alt="3 Smash Palermo - Logo" title="3 Smash Palermo" className="h-10 md:h-14 rounded-xl" width="56" height="56" loading="lazy" />
          </motion.a>

          <div className="hidden md:flex gap-10 items-center">
            {['Menu', 'Chi Siamo', 'Contatti'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[#3451a1] text-sm uppercase tracking-[0.2em] font-bold hover:text-[#1a2d6b] transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#3451a1] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="https://instagram.com/3smashpalermo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3451a1] p-2.5 border-2 border-[#3451a1] hover:bg-[#3451a1] hover:text-[#faf3e3] transition-all duration-300 rounded-full"
              whileHover={{ scale: 1.1 }}
              aria-label="Seguici su Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://tiktok.com/@3smashpalermo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3451a1] p-2.5 border-2 border-[#3451a1] hover:bg-[#3451a1] hover:text-[#faf3e3] transition-all duration-300 rounded-full"
              whileHover={{ scale: 1.1 }}
              aria-label="Seguici su TikTok"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </motion.a>
          </div>

          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span className="w-7 h-0.5 bg-[#3451a1] block rounded-full" animate={mobileMenuOpen ? { rotate: 45, y: 8, backgroundColor: '#faf3e3' } : { rotate: 0, y: 0, backgroundColor: '#3451a1' }} transition={{ duration: 0.3 }} />
            <motion.span className="w-7 h-0.5 bg-[#3451a1] block rounded-full" animate={mobileMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }} transition={{ duration: 0.3 }} />
            <motion.span className="w-7 h-0.5 bg-[#3451a1] block rounded-full" animate={mobileMenuOpen ? { rotate: -45, y: -8, backgroundColor: '#faf3e3' } : { rotate: 0, y: 0, backgroundColor: '#3451a1' }} transition={{ duration: 0.3 }} />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#3451a1] flex flex-col justify-center items-center"
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
                  className="text-[#f5e6c8] text-4xl md:text-5xl font-display font-bold uppercase"
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
            <div className="absolute bottom-10 left-10 text-[#f5e6c8]/20 text-9xl font-black" style={{ fontFamily: 'system-ui' }}>3</div>
            <div className="absolute top-20 right-10 text-[#f5e6c8]/10 text-7xl font-black" style={{ fontFamily: 'system-ui' }}>3</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HERO - Big Centered Logo ===== */}
      <section id="home" className="min-h-screen bg-[#3451a1] relative overflow-hidden flex flex-col items-center justify-center" style={{ paddingTop: 'calc(72px + 50px)', paddingBottom: '120px' }}>
        {/* Checkerboard under navbar */}
        <div className="absolute top-[72px] left-0 right-0 checkerboard-cream h-[50px] z-10" />

        {/* Decorative 3s */}
        <div className="absolute top-32 -right-20 text-[#f5e6c8]/[0.05] text-[30rem] font-black select-none pointer-events-none leading-none" style={{ fontFamily: 'system-ui', transform: 'rotate(12deg)' }}>3</div>
        <div className="absolute -bottom-16 -left-16 text-[#f5e6c8]/[0.04] text-[24rem] font-black select-none pointer-events-none leading-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-8deg)' }}>3</div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 flex flex-col items-center">
          <div className="retro-badge-outline text-[#f5e6c8] border-[#f5e6c8] text-xs tracking-[0.3em] mb-8 hero-sub">
            Mercato San Lorenzo — Palermo
          </div>

          <h1 className="hero-logo mb-8">
            <img
              src={logoHero}
              alt="3 Smash Palermo"
              title="3 Smash - Smash Burger Artigianali"
              className="w-[90vw] max-w-[900px] h-auto"
            />
          </h1>

          <p className="hero-sub text-[#f5e6c8]/90 text-lg md:text-xl lg:text-2xl max-w-xl leading-relaxed mb-10">
            Carne fresca schiacciata sul griddle rovente. Quella crosticina caramellata che non dimentichi.
          </p>

          <div className="hero-cta flex flex-wrap gap-5 justify-center">
            <motion.a
              href="#menu"
              className="retro-btn retro-btn-cream text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Scopri il Menu
            </motion.a>
            <motion.a
              href="#contatti"
              className="retro-btn text-sm md:text-base border-[#f5e6c8] text-[#f5e6c8] bg-transparent"
              style={{ boxShadow: '4px 4px 0 #f5e6c8' }}
              whileHover={{ scale: 1.05 }}
            >
              Dove Siamo
            </motion.a>
          </div>
        </div>

        {/* Checkerboard bottom */}
        <div className="absolute bottom-0 left-0 right-0 checkerboard-cream h-[50px]" />
      </section>

      {/* ===== Scrolling Text Banner ===== */}
      <section className="scroll-text-container py-5 bg-[#f5e6c8] overflow-hidden border-b-4 border-[#3451a1]">
        <div className="scroll-text flex gap-12 whitespace-nowrap text-[#3451a1] text-4xl md:text-6xl font-display font-bold uppercase">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex gap-12 items-center">
              <span>Smash Burger</span>
              <span className="text-[#3451a1]/30 font-black text-3xl" style={{ fontFamily: 'system-ui' }}>✦</span>
              <span>Palermo</span>
              <span className="text-[#3451a1]/30 font-black text-3xl" style={{ fontFamily: 'system-ui' }}>✦</span>
              <span>Dal 2020</span>
              <span className="text-[#3451a1]/30 font-black text-3xl" style={{ fontFamily: 'system-ui' }}>✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ===== MENU — Overlapping Titles on Photos ===== */}
      <section id="menu" className="bg-[#faf3e3] relative">
        {/* Grid paper background */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#3451a1 1px, transparent 1px), linear-gradient(90deg, #3451a1 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.04
        }} />

        {/* Section intro with overlap */}
        <div className="relative pt-20 md:pt-32 pb-0">
          <div className="px-6 md:px-10 lg:px-16 relative z-10">
            <span className="retro-badge text-xs tracking-[0.3em] mb-4 inline-block reveal-section">Cosa offriamo</span>
          </div>
          {/* Giant title — LEFT aligned */}
          <h2 className="overlap-title text-[#3451a1] text-[4rem] md:text-[7rem] lg:text-[10rem] xl:text-[12rem] font-display font-bold uppercase leading-[0.85] px-6 md:px-10 lg:px-16 relative z-20 mb-[-2rem] md:mb-[-4rem] lg:mb-[-6rem]">
            Il Nostro<br />Menu
          </h2>
        </div>

        {/* Photo strip that title overlaps onto */}
        <div className="relative z-10 overflow-hidden">
          <div className="flex gap-4 md:gap-6 animate-marquee py-4">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4 md:gap-6 flex-shrink-0">
                {[content1, content2, content4, content5, content8, content3, content6].map((img, i) => (
                  <motion.div
                    key={`${setIndex}-${i}`}
                    className="relative group"
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                  >
                    <img
                      src={img}
                      alt="3 Smash Palermo - Galleria"
                      title="Smash burger e momenti al Mercato San Lorenzo"
                      className="h-40 md:h-56 w-auto object-cover rounded-2xl border-3 border-[#3451a1]"
                      loading="lazy"
                      width="300"
                      height="224"
                      style={{ boxShadow: '4px 4px 0 #3451a1' }}
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Menu description */}
        <div className="px-6 md:px-10 lg:px-16 relative z-10 pt-10 md:pt-16">
          <p className="text-[#3451a1]/80 max-w-lg text-lg reveal-section">
            Ogni burger è preparato al momento con ingredienti freschi. Carne 100% italiana, pane artigianale.
          </p>
        </div>

        {/* Burgers Grid */}
        <div className="px-6 md:px-10 lg:px-16 relative z-10 pt-12 md:pt-20 pb-20 md:pb-32">
          {/* Smash Burgers - 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {menuItems.map((item, i) => (
              <motion.div
                key={i}
                className="menu-card group relative"
                whileHover={{ y: -8 }}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl border-3 border-[#3451a1]" style={{ boxShadow: '6px 6px 0 #3451a1' }}>
                    <img
                      src={item.img}
                      alt={`${item.name} - Smash burger di 3 Smash Palermo`}
                      title={`${item.name} - ${item.desc}`}
                      className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-[#3451a1] text-2xl md:text-3xl lg:text-4xl font-display font-bold uppercase leading-[0.9] -mt-5 md:-mt-7 relative z-10 px-1" style={{ textShadow: '2px 2px 0 #faf3e3, -2px -2px 0 #faf3e3, 2px -2px 0 #faf3e3, -2px 2px 0 #faf3e3, 0 2px 0 #faf3e3, 0 -2px 0 #faf3e3, 2px 0 0 #faf3e3, -2px 0 0 #faf3e3' }}>
                    {item.name}
                  </h3>
                  <div className="absolute top-3 right-3 bg-[#f5e6c8] text-[#3451a1] px-4 py-1.5 font-display text-lg font-bold rounded-full border-3 border-[#3451a1] z-10" style={{ boxShadow: '3px 3px 0 #3451a1' }}>
                    €{item.price}
                  </div>
                </div>
                <p className="text-[#3451a1]/80 text-sm leading-relaxed mt-3 px-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Extra smash note */}
          <div className="mt-6 reveal-section">
            <span className="retro-badge text-xs tracking-[0.2em]">Aggiungi uno smash — €2,50</span>
          </div>

          {/* Starters — overlapping title on image */}
          <div className="mt-24 md:mt-36 reveal-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="relative">
                <h3 className="overlap-title text-[#3451a1] text-[3rem] md:text-[5rem] lg:text-[6rem] font-display font-bold uppercase leading-[0.85] relative z-20 mb-[-1.5rem] md:mb-[-3rem] text-center">
                  Starters
                </h3>
                <motion.div className="relative z-10" whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }}>
                  <img
                    src={content7}
                    alt="Patatine fritte croccanti - 3 Smash Palermo"
                    className="w-full rounded-2xl border-4 border-[#3451a1]"
                    loading="lazy"
                    style={{ boxShadow: '8px 8px 0 #3451a1' }}
                  />
                </motion.div>
              </div>
              <div className="lg:pt-20">
                <div className="retro-card p-6">
                  {starters.map((item, i) => (
                    <motion.div key={i} className={`flex justify-between items-center py-4 group ${i < starters.length - 1 ? 'border-b-2 border-dashed border-[#3451a1]/20' : ''}`} whileHover={{ x: 8 }}>
                      <div>
                        <span className="text-[#3451a1] text-lg font-medium group-hover:font-bold transition-all">{item.name}</span>
                        {item.desc && <span className="text-[#3451a1]/70 text-xs block">{item.desc}</span>}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="h-px w-8 bg-[#3451a1]/30 group-hover:w-14 group-hover:bg-[#3451a1] transition-all" />
                        <span className="text-[#3451a1] font-display font-bold text-xl">€{item.price}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* New Starters */}
                <div className="mt-6">
                  <span className="retro-badge text-xs tracking-[0.2em] mb-4 inline-block">New</span>
                  <div className="retro-card p-6">
                    {newStarters.map((item, i) => (
                      <motion.div key={i} className={`flex justify-between items-center py-4 group ${i < newStarters.length - 1 ? 'border-b-2 border-dashed border-[#3451a1]/20' : ''}`} whileHover={{ x: 8 }}>
                        <div>
                          <span className="text-[#3451a1] text-lg font-medium group-hover:font-bold transition-all">{item.name}</span>
                          {item.desc && <span className="text-[#3451a1]/70 text-xs block">{item.desc}</span>}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="h-px w-8 bg-[#3451a1]/30 group-hover:w-14 group-hover:bg-[#3451a1] transition-all" />
                          <span className="text-[#3451a1] font-display font-bold text-xl">€{item.price}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sweets & Drinks */}
          <div className="mt-24 md:mt-36 reveal-section">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Sweets */}
              <div>
                <h3 className="overlap-title text-[#3451a1] text-[2.5rem] md:text-[3.5rem] font-display font-bold uppercase leading-[0.85] mb-6">Sweets</h3>
                <div className="grid grid-cols-2 gap-4">
                  {sweets.map((item, i) => (
                    <motion.div key={i} className="group" whileHover={{ y: -4 }}>
                      <div className="overflow-hidden rounded-2xl border-3 border-[#3451a1] mb-3" style={{ boxShadow: '4px 4px 0 #3451a1' }}>
                        <img src={item.img} alt={item.name} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      </div>
                      <h4 className="text-[#3451a1] font-display font-bold text-lg uppercase">{item.name}</h4>
                      <p className="text-[#3451a1]/70 text-xs">{item.desc}</p>
                      <span className="text-[#3451a1] font-display font-bold text-lg">€{item.price}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bevande */}
              <div>
                <h3 className="overlap-title text-[#3451a1] text-[2.5rem] md:text-[3.5rem] font-display font-bold uppercase leading-[0.85] mb-6">Bevande</h3>
                <div className="retro-card p-6">
                  {drinks.map((item, i) => (
                    <motion.div key={i} className={`flex justify-between items-center py-4 group ${i < drinks.length - 1 ? 'border-b-2 border-dashed border-[#3451a1]/20' : ''}`} whileHover={{ x: 8 }}>
                      <div>
                        <span className="text-[#3451a1] text-lg font-medium group-hover:font-bold transition-all">{item.name}</span>
                        {item.desc && <span className="text-[#3451a1]/70 text-xs block">{item.desc}</span>}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="h-px w-8 bg-[#3451a1]/30 group-hover:w-14 group-hover:bg-[#3451a1] transition-all" />
                        <span className="text-[#3451a1] font-display font-bold text-xl">€{item.price}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Salse */}
              <div>
                <h3 className="overlap-title text-[#3451a1] text-[2.5rem] md:text-[3.5rem] font-display font-bold uppercase leading-[0.85] mb-6">Le Nostre Salse</h3>
                <div className="retro-card p-6">
                  <p className="text-[#3451a1]/90 text-base leading-relaxed">{salse}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Checkerboard Divider ===== */}
      <div className="checkerboard h-[50px]" />

      {/* ===== CHI SIAMO — Giant Title + Horizontal Scrolling Photos ===== */}
      <section id="chi-siamo" ref={chiSiamoRef} className="bg-[#3451a1] relative overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#f5e6c8 1px, transparent 1px), linear-gradient(90deg, #f5e6c8 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Giant overlapping title — RIGHT aligned */}
        <div className="relative pt-20 md:pt-32 px-6 md:px-10 lg:px-16 text-right">
          <span className="retro-badge-outline text-[#f5e6c8] border-[#f5e6c8] text-xs tracking-[0.3em] mb-4 inline-block reveal-section">
            La nostra storia
          </span>
          <h2 className="overlap-title text-[#f5e6c8] text-[4rem] md:text-[7rem] lg:text-[10rem] xl:text-[12rem] font-display font-bold uppercase leading-[0.85] relative z-20 mb-[-2rem] md:mb-[-4rem] lg:mb-[-6rem]">
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
              <motion.div
                key={i}
                className={`flex-shrink-0 w-[280px] md:w-[350px] lg:w-[400px] ${item.h}`}
                whileHover={{ scale: 1.03, zIndex: 20 }}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded-2xl border-4 border-[#f5e6c8]/30"
                  loading="lazy"
                  style={{ boxShadow: '6px 6px 0 rgba(245,230,200,0.2)' }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Text content */}
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pt-12 md:pt-20 pb-20 md:pb-32">
          <div className="max-w-2xl reveal-section">
            <div className="space-y-6 text-[#f5e6c8]/90 text-lg md:text-xl leading-relaxed">
              <p>
                <strong className="text-[#f5e6c8]">3 Smash</strong> è nato dalla passione per lo street food autentico americano, reinterpretato con l'anima siciliana.
              </p>
              <p>
                La tecnica dello smash è semplice ma perfetta: una palla di carne fresca schiacciata sul griddle rovente crea quella crosticina caramellata unica.
              </p>
              <p>
                Ci trovi al <strong className="text-[#f5e6c8]">Mercato San Lorenzo</strong>, il cuore di Palermo.
              </p>
            </div>

            <motion.a
              href="https://instagram.com/3smashpalermo"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn retro-btn-cream inline-flex items-center gap-4 mt-12 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span>Seguici</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ===== Checkerboard Divider ===== */}
      <div className="checkerboard h-[50px]" />

      {/* ===== INSTAGRAM — Overlapping Title on Grid ===== */}
      <section className="bg-[#faf3e3] relative overflow-hidden">
        <div className="relative pt-16 md:pt-24 px-6 md:px-10 lg:px-16 text-center">
          {/* Giant title — CENTERED */}
          <h2 className="overlap-title text-[#3451a1] text-[3rem] md:text-[5rem] lg:text-[7rem] xl:text-[9rem] font-display font-bold uppercase leading-[0.85] relative z-20 mb-[-1rem] md:mb-[-2.5rem] lg:mb-[-4rem]">
            @3smash<br className="md:hidden" />palermo
          </h2>
        </div>

        <div className="px-6 md:px-10 lg:px-16 relative z-10 pb-16 md:pb-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[content5, content2, content3, content7, content4, content6].map((img, i) => (
              <motion.a
                key={i}
                href="https://instagram.com/3smashpalermo"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden rounded-2xl group border-3 border-[#3451a1]"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                style={{ boxShadow: '4px 4px 0 #3451a1' }}
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
              </motion.a>
            ))}
          </div>
          <p className="text-[#3451a1]/80 mt-6 text-lg">Seguici per novità e offerte esclusive</p>
        </div>
      </section>

      {/* ===== Checkerboard Divider ===== */}
      <div className="checkerboard h-[50px]" />

      {/* ===== CONTATTI — Overlapping Title on Map ===== */}
      <section id="contatti" className="bg-[#faf3e3] relative overflow-hidden">
        <div className="px-6 md:px-10 lg:px-16">
          {/* Giant title — RIGHT aligned */}
          <div className="relative pt-20 md:pt-32 text-right">
            <span className="retro-badge text-xs tracking-[0.3em] mb-4 inline-block reveal-section">Ti aspettiamo</span>
            <h2 className="overlap-title text-[#3451a1] text-[3.5rem] md:text-[6rem] lg:text-[9rem] xl:text-[11rem] font-display font-bold uppercase leading-[0.85] relative z-20 mb-[-1.5rem] md:mb-[-3rem] lg:mb-[-5rem]">
              Vieni a<br />Trovarci
            </h2>
          </div>

          {/* Map that title overlaps onto */}
          <motion.div
            className="relative z-10 rounded-2xl overflow-hidden h-80 md:h-[450px] border-4 border-[#3451a1]"
            style={{ boxShadow: '8px 8px 0 #3451a1' }}
            whileHover={{ y: -4 }}
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
          </motion.div>

          {/* Contact info - inline below map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 md:pt-16 pb-20 md:pb-32 reveal-section">
            {[
              { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Dove', info: ['Mercato San Lorenzo', 'Palermo'] },
              { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Quando', info: ['Mar — Dom: 11:00 — 22:00', 'Lunedì: Chiuso'] },
              { title: 'Social', info: ['@3smashpalermo'], isInstagram: true },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#3451a1] rounded-full flex items-center justify-center flex-shrink-0">
                  {item.isInstagram ? (
                    <svg className="w-5 h-5 text-[#f5e6c8]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-[#f5e6c8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-[#3451a1] text-xl font-display font-bold uppercase mb-1">{item.title}</h3>
                  {item.info.map((line, j) => (
                    item.isInstagram ? (
                      <a key={j} href="https://instagram.com/3smashpalermo" target="_blank" rel="noopener noreferrer" className="text-[#3451a1]/80 hover:text-[#3451a1] transition-colors block font-medium">
                        {line}
                      </a>
                    ) : (
                      <p key={j} className="text-[#3451a1]/80">{line}</p>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#3451a1] relative overflow-hidden">
        <div className="checkerboard-cream h-[50px]" />
        <div className="py-12 px-6 md:px-10 lg:px-16 relative z-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <motion.img
                src={logo}
                alt="3 Smash Palermo - Logo"
                title="3 Smash Palermo - Smash Burger Artigianali"
                className="h-10 opacity-70 hover:opacity-100 transition-opacity invert"
                whileHover={{ scale: 1.05 }}
                width="40"
                height="40"
              />
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <p className="text-[#f5e6c8]/80 text-sm">{siteData.address.full}</p>
                <a href={`mailto:${siteData.contact.email}`} className="text-[#f5e6c8]/80 hover:text-[#f5e6c8] text-sm transition-colors">{siteData.contact.email}</a>
                <a href={`tel:${siteData.contact.phone}`} className="text-[#f5e6c8]/80 hover:text-[#f5e6c8] text-sm transition-colors">{siteData.contact.phoneFormatted}</a>
              </div>
              <motion.a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5e6c8]/80 hover:text-[#f5e6c8] transition-colors text-sm uppercase tracking-wider font-bold"
                whileHover={{ scale: 1.1 }}
              >
                {siteData.social.instagramHandle}
              </motion.a>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#f5e6c8]/15">
              <p className="text-[#f5e6c8]/70 text-sm">
                © {new Date().getFullYear()} {siteData.name}. Tutti i diritti riservati.
              </p>
              <div className="flex gap-6">
                <Link to="/privacy-policy" className="text-[#f5e6c8]/80 hover:text-[#f5e6c8] text-sm transition-colors" onClick={() => window.scrollTo(0, 0)}>
                  Privacy Policy
                </Link>
                <Link to="/cookie-policy" className="text-[#f5e6c8]/80 hover:text-[#f5e6c8] text-sm transition-colors" onClick={() => window.scrollTo(0, 0)}>
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
