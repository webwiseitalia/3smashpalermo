import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

import { Link } from 'react-router-dom';

import logo from '../assets/logo.webp';
import logoHero from '../assets/logo-hero-3smash.webp';
import heroImg from '../assets/pig-smash-hero.webp';
import smashGriddle from '../assets/smash-griddle-cipolla.webp';
import smashSpatola from '../assets/smash-spatola-cipolla.webp';
import burgerPatatine from '../assets/burger-patatine-rosso.webp';
import sendFries from '../assets/send-fries-blu.webp';
import clienteMercato from '../assets/cliente-mercato.webp';
import clientiFelici from '../assets/clienti-felici.webp';
import packaging from '../assets/packaging-brand.webp';
import sidesPatatine from '../assets/sides-patatine-nuggets.webp';
import siteData from '../constants/siteData';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const mainRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text reveal
      gsap.from('.hero-text > *', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      });

      // Hero image entrance
      gsap.from('.hero-image', {
        scale: 0.8,
        opacity: 0,
        rotation: -10,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Floating elements
      gsap.to('.float-element', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Section reveals with rotation
      gsap.utils.toArray('.reveal-section').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 80,
          rotation: 2,
          duration: 1,
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
          y: 60,
          rotation: i % 2 === 0 ? -3 : 3,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        });
      });

      // Parallax images
      gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.to(img, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

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

  const menuItems = [
    { name: "Classic Smash", desc: "Doppio smash, cheddar, cipolla caramellata, salsa speciale", price: "8.50", img: burgerPatatine },
    { name: "Pig Smash", desc: "Smash di maiale, scamorza affumicata, cipolla in agrodolce, BBQ al Nero d'Avola", price: "9.50", img: heroImg },
    { name: "Cheese Lover", desc: "Triplo cheddar fuso, bacon croccante, salsa cheese", price: "10.00", img: smashSpatola },
    { name: "Veggie Smash", desc: "Burger vegetale, verdure grigliate, maionese alle erbe", price: "9.00", img: smashGriddle },
    { name: "BBQ King", desc: "Doppio smash, bacon, cipolla crispy, BBQ house-made", price: "10.50", img: burgerPatatine },
    { name: "Blue Smash", desc: "Gorgonzola DOP, noci tostate, rucola, miele", price: "11.00", img: smashSpatola },
  ];

  const sides = [
    { name: "Smash Fries", price: "4.50" },
    { name: "Sweet Potato Fries", price: "5.00" },
    { name: "Nuggets (8pz)", price: "5.50" },
    { name: "Onion Rings", price: "4.00" },
    { name: "Coca Cola / Fanta", price: "2.50" },
    { name: "Birra Artigianale", price: "5.00" },
    { name: "Acqua", price: "1.50" },
    { name: "Milkshake", price: "4.50" },
  ];

  return (
    <div ref={mainRef} className="bg-[#0a0a0a] overflow-x-hidden">

      {/* Navigation - Broken style */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="flex justify-between items-center px-6 md:px-12 py-6">
          <motion.a
            href="#home"
            className="relative z-10"
            whileHover={{ rotate: -5, scale: 1.1 }}
          >
            <img src={logo} alt="3 Smash Palermo - Logo" title="3 Smash Palermo" className="h-10 md:h-14 invert rounded-xl" width="56" height="56" loading="lazy" />
          </motion.a>

          <div className="hidden md:flex gap-12 text-white text-sm uppercase tracking-[0.3em] font-light">
            {['Menu', 'Chi Siamo', 'Contatti'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative overflow-hidden group"
                whileHover={{ y: -3 }}
                style={{ transform: `rotate(${(i - 1) * 2}deg)` }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-full h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.a>
            ))}
          </div>

          {/* Desktop Social buttons */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="https://instagram.com/3smashpalermo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white p-2.5 border border-white/50 hover:bg-white hover:text-black transition-all duration-500 rounded-lg"
              whileHover={{ rotate: 3, scale: 1.1 }}
              aria-label="Seguici su Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://tiktok.com/@3smashpalermo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white p-2.5 border border-white/50 hover:bg-white hover:text-black transition-all duration-500 rounded-lg"
              whileHover={{ rotate: -3, scale: 1.1 }}
              aria-label="Seguici su TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </motion.a>
          </div>

          {/* Mobile burger button */}
          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="w-7 h-0.5 bg-white block"
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-7 h-0.5 bg-white block"
              animate={mobileMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-7 h-0.5 bg-white block"
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#3451a1] flex flex-col justify-center items-center"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {['Menu', 'Chi Siamo', 'Contatti'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-[#f5e6c8] text-4xl md:text-5xl font-display font-bold uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 40, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: (i - 1) * 3 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                >
                  {item}
                </motion.a>
              ))}

              <motion.a
                href="https://instagram.com/3smashpalermo"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 text-[#f5e6c8] text-lg uppercase tracking-[0.3em] border-2 border-[#f5e6c8] px-8 py-4 hover:bg-[#f5e6c8] hover:text-[#3451a1] transition-all"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                Instagram
              </motion.a>
            </nav>

            {/* Decorative elements */}
            <div className="absolute bottom-10 left-10 text-[#f5e6c8]/20 text-9xl font-black transform -rotate-12" style={{ fontFamily: 'system-ui' }}>
              3
            </div>
            <div className="absolute top-20 right-10 text-[#f5e6c8]/10 text-7xl font-black transform rotate-15" style={{ fontFamily: 'system-ui' }}>
              3
            </div>
            <div className="absolute top-1/3 left-1/4 text-[#f5e6c8]/[0.08] text-6xl font-black transform -rotate-6" style={{ fontFamily: 'system-ui' }}>
              3
            </div>
            <div className="absolute bottom-1/4 right-1/4 text-[#f5e6c8]/15 text-8xl font-black transform rotate-20" style={{ fontFamily: 'system-ui' }}>
              3
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero - Asymmetric Layout */}
      <section id="home" className="min-h-screen bg-[#3451a1] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#f5e6c8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#f5e6c8]/10 rounded-full blur-3xl" />

        {/* Decorative 3s */}
        <div className="absolute top-32 right-[15%] text-[#f5e6c8]/[0.07] text-[20rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(12deg)' }}>3</div>
        <div className="absolute bottom-10 left-[5%] text-[#f5e6c8]/[0.05] text-[15rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-8deg)' }}>3</div>
        <div className="absolute top-[60%] left-[45%] text-[#f5e6c8]/[0.04] text-[12rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(25deg)' }}>3</div>
        <div className="absolute top-[20%] left-[35%] text-[#f5e6c8]/[0.03] text-[8rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-18deg)' }}>3</div>

        <div className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center w-full max-w-[1600px] mx-auto">

            {/* Text - Left side */}
            <div className="lg:col-span-5 hero-text relative z-10">
              <p className="text-[#f5e6c8]/50 text-xs uppercase tracking-[0.5em] mb-8 transform -rotate-2">
                Mercato San Lorenzo — Palermo
              </p>

              <h1 className="mb-0 -ml-4 md:-ml-8 lg:-ml-12">
                <img
                  src={logoHero}
                  alt="3 Smash Palermo"
                  title="3 Smash - Smash Burger Artigianali"
                  className="w-full max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px] h-auto -mb-2"
                />
              </h1>

              <p className="text-[#f5e6c8]/60 text-lg md:text-xl max-w-md leading-relaxed">
                Carne fresca schiacciata sul griddle rovente. Quella crosticina caramellata che non dimentichi.
              </p>

              <div className="flex flex-wrap gap-5 mt-12">
                <motion.a
                  href="#menu"
                  className="bg-[#f5e6c8] text-[#3451a1] px-10 py-5 font-bold uppercase tracking-wider text-sm transform -rotate-2 hover:rotate-0 transition-transform"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Scopri il Menu
                </motion.a>
                <motion.a
                  href="#contatti"
                  className="border-2 border-[#f5e6c8] text-[#f5e6c8] px-10 py-5 font-bold uppercase tracking-wider text-sm transform rotate-2 hover:rotate-0 transition-transform"
                  whileHover={{ scale: 1.05, backgroundColor: '#f5e6c8', color: '#3451a1' }}
                >
                  Dove Siamo
                </motion.a>
              </div>
            </div>

            {/* Image - Right side, overlapping */}
            <div className="lg:col-span-7 lg:col-start-6 hero-image relative">
              <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <img
                  src={heroImg}
                  alt="Pig Smash - Il nostro burger best seller"
                  title="Pig Smash di 3 Smash Palermo"
                  className="w-full max-w-2xl mx-auto lg:max-w-none rounded-3xl shadow-2xl"
                  width="800"
                  height="600"
                  loading="eager"
                />
                {/* Floating price tag */}
                <motion.div
                  className="float-element absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-[#f5e6c8] text-[#3451a1] px-8 py-4 font-display text-2xl md:text-3xl uppercase font-bold shadow-xl transform -rotate-6 rounded-2xl"
                >
                  €9.50
                </motion.div>
                {/* Floating label */}
                <motion.div
                  className="float-element absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-[#0a0a0a] text-[#f5e6c8] px-6 py-3 font-display text-sm uppercase tracking-wider shadow-xl transform rotate-12 rounded-xl flex items-center gap-2"
                  style={{ animationDelay: '0.5s' }}
                >
                  <span className="font-black text-lg" style={{ fontFamily: 'system-ui' }}>3</span>
                  Best Seller
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-[#f5e6c8]/50 to-transparent" />
        </motion.div>
      </section>

      {/* Scrolling Text Banner */}
      <section className="scroll-text-container py-8 bg-[#f5e6c8] overflow-hidden">
        <div className="scroll-text flex gap-12 whitespace-nowrap text-[#3451a1] text-4xl md:text-6xl font-display font-bold uppercase">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex gap-12 items-center">
              <span>Smash Burger</span>
              <span className="text-[#3451a1]/50 font-black" style={{ fontFamily: 'system-ui', transform: 'rotate(-5deg)', display: 'inline-block' }}>3</span>
              <span>Palermo</span>
              <span className="text-[#3451a1]/50 font-black" style={{ fontFamily: 'system-ui', transform: 'rotate(5deg)', display: 'inline-block' }}>3</span>
              <span>Dal 2020</span>
              <span className="text-[#3451a1]/50 font-black" style={{ fontFamily: 'system-ui', transform: 'rotate(-3deg)', display: 'inline-block' }}>3</span>
            </span>
          ))}
        </div>
      </section>

      {/* Gallery Strip - Tilted */}
      <section className="py-16 bg-[#0a0a0a] overflow-hidden transform -rotate-1 relative">
        {/* Decorative 3s */}
        <div className="absolute top-4 left-[20%] text-[#3451a1]/15 text-[6rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-10deg)' }}>3</div>
        <div className="absolute bottom-4 right-[25%] text-[#f5e6c8]/[0.06] text-[7rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(15deg)' }}>3</div>
        <div className="absolute top-1/2 left-[60%] text-[#3451a1]/10 text-[5rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(8deg) translateY(-50%)' }}>3</div>
        <div className="flex gap-6 animate-marquee relative z-10">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 flex-shrink-0">
              {[smashGriddle, burgerPatatine, clienteMercato, smashSpatola, sendFries, clientiFelici, packaging].map((img, i) => (
                <motion.div
                  key={`${setIndex}-${i}`}
                  className="relative group"
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                  style={{ transform: `rotate(${(i % 3 - 1) * 3}deg)` }}
                >
                  <img
                    src={img}
                    alt="3 Smash Palermo - Galleria"
                    title="Smash burger e momenti al Mercato San Lorenzo"
                    className="h-40 md:h-56 w-auto object-cover rounded-xl shadow-lg"
                    loading="lazy"
                    width="300"
                    height="224"
                  />
                  <div className="absolute inset-0 bg-[#3451a1]/0 group-hover:bg-[#3451a1]/20 transition-colors rounded-xl" />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Menu - Broken Grid */}
      <section id="menu" className="py-24 md:py-40 bg-[#0a0a0a] relative">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#3451a1]/5 transform skew-x-12" />

        {/* Decorative 3s */}
        <div className="absolute top-20 left-[8%] text-[#3451a1]/10 text-[18rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-15deg)' }}>3</div>
        <div className="absolute bottom-40 right-[10%] text-[#f5e6c8]/[0.03] text-[25rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(20deg)' }}>3</div>

        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto relative z-10">
          {/* Header - Asymmetric */}
          <div className="reveal-section mb-20 md:mb-32">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <span className="text-[#3451a1] text-xs uppercase tracking-[0.5em] block mb-6 transform -rotate-2">
                  Cosa offriamo
                </span>
                <h2 className="text-[#f5e6c8] text-5xl md:text-6xl lg:text-8xl font-display font-bold uppercase leading-[0.9] relative">
                  <span className="absolute -left-4 md:-left-8 -top-4 text-3xl md:text-4xl lg:text-5xl font-black text-[#3451a1] opacity-70" style={{ fontFamily: 'system-ui', transform: 'rotate(-12deg)' }}>3</span>
                  <span className="block transform -rotate-1">Il Nostro</span>
                  <span className="block transform rotate-1 ml-8 md:ml-16">Menu</span>
                </h2>
              </div>
              <p className="text-[#f5e6c8]/50 max-w-md text-lg transform rotate-1 lg:text-right">
                Ogni burger è preparato al momento con ingredienti freschi. Carne 100% italiana, pane artigianale.
              </p>
            </div>
          </div>

          {/* Burgers Grid - Broken layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-12 mb-24">
            {menuItems.map((item, i) => (
              <motion.div
                key={i}
                className={`menu-card group relative ${i === 1 ? 'lg:mt-16' : ''} ${i === 2 ? 'lg:-mt-8' : ''} ${i === 4 ? 'lg:mt-12' : ''}`}
                whileHover={{ y: -10, rotate: 0 }}
                style={{ transform: `rotate(${(i % 3 - 1) * 2}deg)` }}
              >
                <div className="overflow-hidden rounded-2xl mb-6 relative">
                  <img
                    src={item.img}
                    alt={`${item.name} - Smash burger di 3 Smash Palermo`}
                    title={`${item.name} - ${item.desc}`}
                    className="w-full h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width="400"
                    height="320"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Price tag */}
                  <div className="absolute bottom-4 right-4 bg-[#f5e6c8] text-[#3451a1] px-5 py-2 font-display text-xl font-bold transform rotate-3 shadow-lg">
                    €{item.price}
                  </div>
                </div>
                <h3 className="text-[#f5e6c8] text-2xl md:text-3xl font-display font-bold uppercase mb-3 group-hover:text-[#3451a1] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[#f5e6c8]/40 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sides & Drinks - Split design with image */}
          <div className="reveal-section border-t border-[#f5e6c8]/10 pt-20 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Image side - creative positioning */}
              <div className="relative order-2 lg:order-1">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Background shape */}
                  <div className="absolute -inset-4 bg-[#3451a1]/20 rounded-3xl transform -rotate-3" />

                  <img
                    src={sidesPatatine}
                    alt="Sides e contorni - Patatine, nuggets e onion rings"
                    title="I nostri contorni croccanti - 3 Smash Palermo"
                    className="relative w-full rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                    loading="lazy"
                    width="600"
                    height="400"
                  />

                  {/* Floating badges */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-[#f5e6c8] text-[#3451a1] px-5 py-3 font-display text-base uppercase font-bold shadow-xl transform rotate-12"
                    whileHover={{ rotate: 0, scale: 1.1 }}
                  >
                    Crispy!
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-[#3451a1] text-[#f5e6c8] px-5 py-3 font-display text-base uppercase font-bold shadow-xl transform -rotate-6"
                    whileHover={{ rotate: 0, scale: 1.1 }}
                  >
                    Fresh
                  </motion.div>
                </motion.div>
              </div>

              {/* Content side */}
              <div className="order-1 lg:order-2">
                <h3 className="text-[#f5e6c8] text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase mb-4 leading-[0.9] relative">
                  <span className="absolute -left-3 md:-left-5 -top-2 text-2xl md:text-3xl font-black text-[#3451a1] opacity-60" style={{ fontFamily: 'system-ui', transform: 'rotate(-10deg)' }}>3</span>
                  <span className="block transform -rotate-2">Sides</span>
                  <span className="block transform rotate-1 text-[#3451a1] ml-4">&</span>
                  <span className="block transform -rotate-1 ml-8">Drinks</span>
                </h3>
                <p className="text-[#f5e6c8]/50 mb-10 text-lg transform rotate-1">
                  Il contorno perfetto per il tuo smash
                </p>

                {/* Items list - vertical style */}
                <div className="space-y-3">
                  {sides.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex justify-between items-center py-4 border-b border-[#f5e6c8]/10 group"
                      whileHover={{ x: 10 }}
                      style={{ transform: `rotate(${(i % 3 - 1) * 0.5}deg)` }}
                    >
                      <span className="text-[#f5e6c8] text-lg group-hover:text-[#3451a1] transition-colors">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="h-px w-12 bg-[#f5e6c8]/20 group-hover:w-20 group-hover:bg-[#3451a1] transition-all" />
                        <span className="text-[#f5e6c8] font-display font-bold text-xl">
                          €{item.price}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About - Overlapping images */}
      <section id="chi-siamo" className="py-24 md:py-40 bg-[#3451a1] relative overflow-hidden">
        {/* Background decorative */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#f5e6c8]/5 rounded-full blur-3xl" />

        {/* Decorative 3s */}
        <div className="absolute top-10 right-[5%] text-[#f5e6c8]/[0.06] text-[22rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(10deg)' }}>3</div>
        <div className="absolute bottom-20 left-[3%] text-[#f5e6c8]/[0.04] text-[16rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-12deg)' }}>3</div>

        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Images - Stacked/Overlapping */}
            <div className="reveal-section relative h-[500px] md:h-[600px] lg:h-[700px] order-2 lg:order-1">
              <motion.img
                src={smashGriddle}
                alt="Smash burger in preparazione sul griddle rovente"
                title="La tecnica smash - 3 Smash Palermo"
                className="parallax-img absolute top-0 left-0 w-3/5 h-64 md:h-80 object-cover rounded-2xl shadow-2xl transform -rotate-6"
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                loading="lazy"
                width="350"
                height="320"
              />
              <motion.img
                src={clientiFelici}
                alt="Clienti felici al Mercato San Lorenzo"
                title="I nostri clienti - 3 Smash Palermo"
                className="parallax-img absolute top-20 right-0 w-3/5 h-56 md:h-72 object-cover rounded-2xl shadow-2xl transform rotate-3"
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                loading="lazy"
                width="350"
                height="288"
              />
              <motion.img
                src={packaging}
                alt="Packaging brandizzato 3 Smash Palermo"
                title="Il nostro packaging - 3 Smash Palermo"
                className="parallax-img absolute bottom-20 left-10 w-1/2 h-48 md:h-64 object-cover rounded-2xl shadow-2xl transform rotate-6"
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                loading="lazy"
                width="300"
                height="256"
              />
              <motion.img
                src={clienteMercato}
                alt="Esperienza al Mercato San Lorenzo di Palermo"
                title="Al Mercato San Lorenzo - 3 Smash Palermo"
                className="parallax-img absolute bottom-0 right-5 w-2/5 h-52 md:h-60 object-cover rounded-2xl shadow-2xl transform -rotate-3"
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                loading="lazy"
                width="250"
                height="240"
              />
            </div>

            {/* Text */}
            <div className="reveal-section order-1 lg:order-2">
              <span className="text-[#f5e6c8]/50 text-xs uppercase tracking-[0.5em] block mb-6 transform rotate-2">
                La nostra storia
              </span>
              <h2 className="text-[#f5e6c8] text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase leading-[0.9] mb-10 relative">
                <span className="absolute -left-4 md:-left-6 -top-2 text-2xl md:text-3xl lg:text-4xl font-black opacity-60" style={{ fontFamily: 'system-ui', transform: 'rotate(-8deg)' }}>3</span>
                <span className="block transform rotate-1">Chi</span>
                <span className="block transform -rotate-2 ml-12">Siamo</span>
              </h2>

              <div className="space-y-6 text-[#f5e6c8]/70 text-lg md:text-xl leading-relaxed">
                <p className="transform -rotate-1">
                  <strong className="text-[#f5e6c8]">3 Smash</strong> è nato dalla passione per lo street food autentico americano, reinterpretato con l'anima siciliana.
                </p>
                <p className="transform rotate-1">
                  La tecnica dello smash è semplice ma perfetta: una palla di carne fresca schiacciata sul griddle rovente crea quella crosticina caramellata unica.
                </p>
                <p className="transform -rotate-1">
                  Ci trovi al <strong className="text-[#f5e6c8]">Mercato San Lorenzo</strong>, il cuore di Palermo.
                </p>
              </div>

              <motion.a
                href="https://instagram.com/3smashpalermo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 mt-12 border-2 border-[#f5e6c8] text-[#f5e6c8] px-10 py-5 uppercase tracking-wider text-sm font-bold hover:bg-[#f5e6c8] hover:text-[#3451a1] transition-all duration-500 transform rotate-2 hover:rotate-0"
                whileHover={{ scale: 1.05 }}
              >
                <span>Seguici</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed - Mosaic */}
      <section className="py-20 md:py-32 bg-[#f5e6c8] relative overflow-hidden">
        {/* Decorative 3s */}
        <div className="absolute top-8 left-[8%] text-[#3451a1]/[0.08] text-[12rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-12deg)' }}>3</div>
        <div className="absolute bottom-12 right-[6%] text-[#3451a1]/[0.06] text-[14rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(18deg)' }}>3</div>
        <div className="absolute top-1/2 right-[40%] text-[#3451a1]/[0.04] text-[8rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-5deg)' }}>3</div>
        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto relative z-10">
          <div className="reveal-section text-center mb-16">
            <h2 className="text-[#3451a1] text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase transform -rotate-1">
              @3smashpalermo
            </h2>
            <p className="text-[#3451a1]/50 mt-4 text-lg">Seguici per novità e offerte esclusive</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[smashGriddle, heroImg, clienteMercato, sendFries, burgerPatatine, clientiFelici].map((img, i) => (
              <motion.a
                key={i}
                href="https://instagram.com/3smashpalermo"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden rounded-2xl group"
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                style={{ transform: `rotate(${(i % 3 - 1) * 3}deg)` }}
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
        </div>
      </section>

      {/* Contact - Split design */}
      <section id="contatti" className="py-24 md:py-40 bg-[#0a0a0a] relative overflow-hidden">
        {/* Decorative 3s */}
        <div className="absolute top-16 left-[6%] text-[#3451a1]/10 text-[14rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-8deg)' }}>3</div>
        <div className="absolute bottom-32 right-[8%] text-[#f5e6c8]/[0.04] text-[18rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(15deg)' }}>3</div>
        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="reveal-section text-center mb-20">
            <span className="text-[#3451a1] text-xs uppercase tracking-[0.5em] block mb-6">Ti aspettiamo</span>
            <h2 className="text-[#f5e6c8] text-5xl md:text-6xl lg:text-8xl font-display font-bold uppercase relative inline-block">
              <span className="absolute -left-6 md:-left-10 -top-4 text-3xl md:text-4xl lg:text-5xl font-black text-[#3451a1] opacity-70" style={{ fontFamily: 'system-ui', transform: 'rotate(-10deg)' }}>3</span>
              <span className="block transform rotate-1">Vieni a</span>
              <span className="block transform -rotate-2 ml-8">Trovarci</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
            {[
              { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Dove', info: ['Mercato San Lorenzo', 'Palermo'] },
              { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Quando', info: ['Mar — Dom: 11:00 — 22:00', 'Lunedì: Chiuso'] },
              { title: 'Social', info: ['@3smashpalermo'], isInstagram: true },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                style={{ transform: `rotate(${(i - 1) * 3}deg)` }}
              >
                <div className="w-20 h-20 bg-[#3451a1] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {item.isInstagram ? (
                    <svg className="w-9 h-9 text-[#f5e6c8]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ) : (
                    <svg className="w-9 h-9 text-[#f5e6c8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  )}
                </div>
                <h3 className="text-[#f5e6c8] text-2xl font-display font-bold uppercase mb-3">{item.title}</h3>
                {item.info.map((line, j) => (
                  item.isInstagram ? (
                    <a key={j} href="https://instagram.com/3smashpalermo" target="_blank" rel="noopener noreferrer" className="text-[#f5e6c8]/50 hover:text-[#f5e6c8] transition-colors block">
                      {line}
                    </a>
                  ) : (
                    <p key={j} className="text-[#f5e6c8]/50">{line}</p>
                  )
                ))}
              </motion.div>
            ))}
          </div>

          {/* Map - Tilted */}
          <motion.div
            className="rounded-3xl overflow-hidden h-80 md:h-[450px] shadow-2xl transform rotate-1"
            whileHover={{ rotate: 0 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.4!2d13.3623!3d38.1157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDA2JzU2LjUiTiAxM8KwMjEnNDQuMyJF!5e0!3m2!1sit!2sit!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              title="Mappa 3 Smash Palermo"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 bg-[#0a0a0a] border-t border-[#f5e6c8]/10 relative overflow-hidden">
        {/* Decorative 3s */}
        <div className="absolute top-4 right-[15%] text-[#3451a1]/10 text-[8rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(10deg)' }}>3</div>
        <div className="absolute bottom-2 left-[10%] text-[#f5e6c8]/[0.03] text-[10rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-8deg)' }}>3</div>
        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto relative z-10">
          <div className="flex flex-col gap-8">
            {/* Top row */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <motion.img
                src={logo}
                alt="3 Smash Palermo - Logo"
                title="3 Smash Palermo - Smash Burger Artigianali"
                className="h-10 opacity-50 hover:opacity-100 transition-opacity"
                whileHover={{ rotate: -5 }}
                width="40"
                height="40"
              />
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <p className="text-[#f5e6c8]/50 text-sm">
                  {siteData.address.full}
                </p>
                <a href={`mailto:${siteData.contact.email}`} className="text-[#f5e6c8]/50 hover:text-[#f5e6c8] text-sm transition-colors">
                  {siteData.contact.email}
                </a>
                <a href={`tel:${siteData.contact.phone}`} className="text-[#f5e6c8]/50 hover:text-[#f5e6c8] text-sm transition-colors">
                  {siteData.contact.phoneFormatted}
                </a>
              </div>
              <motion.a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5e6c8]/30 hover:text-[#f5e6c8] transition-colors text-sm uppercase tracking-wider"
                whileHover={{ rotate: 3, scale: 1.1 }}
              >
                {siteData.social.instagramHandle}
              </motion.a>
            </div>
            {/* Bottom row */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#f5e6c8]/5">
              <p className="text-[#f5e6c8]/30 text-sm">
                © {new Date().getFullYear()} {siteData.name}. Tutti i diritti riservati.
              </p>
              <div className="flex gap-6">
                <Link
                  to="/privacy-policy"
                  className="text-[#f5e6c8]/40 hover:text-[#f5e6c8] text-sm transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/cookie-policy"
                  className="text-[#f5e6c8]/40 hover:text-[#f5e6c8] text-sm transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
