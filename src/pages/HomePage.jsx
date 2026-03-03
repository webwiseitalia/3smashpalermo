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
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
      });

      // Hero image entrance
      gsap.from('.hero-image', {
        scale: 0.85,
        opacity: 0,
        rotation: -8,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Floating elements
      gsap.to('.float-element', {
        y: -15,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
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
    <div ref={mainRef} className="bg-[#faf3e3] overflow-x-hidden">

      {/* ===== NAVBAR - Retro Style ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf3e3] border-b-4 border-[#3451a1]">
        {/* Checkerboard top stripe */}
        <div className="checkerboard-sm h-3" />
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

          {/* Desktop Social buttons */}
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

          {/* Mobile burger button */}
          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="w-7 h-0.5 bg-[#3451a1] block rounded-full"
              animate={mobileMenuOpen ? { rotate: 45, y: 8, backgroundColor: '#faf3e3' } : { rotate: 0, y: 0, backgroundColor: '#3451a1' }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-7 h-0.5 bg-[#3451a1] block rounded-full"
              animate={mobileMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-7 h-0.5 bg-[#3451a1] block rounded-full"
              animate={mobileMenuOpen ? { rotate: -45, y: -8, backgroundColor: '#faf3e3' } : { rotate: 0, y: 0, backgroundColor: '#3451a1' }}
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
            {/* Checkerboard decoration */}
            <div className="absolute top-0 left-0 right-0 checkerboard-cream h-4" />
            <div className="absolute bottom-0 left-0 right-0 checkerboard-cream h-4" />

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

            {/* Decorative 3s */}
            <div className="absolute bottom-10 left-10 text-[#f5e6c8]/20 text-9xl font-black" style={{ fontFamily: 'system-ui' }}>
              3
            </div>
            <div className="absolute top-20 right-10 text-[#f5e6c8]/10 text-7xl font-black" style={{ fontFamily: 'system-ui' }}>
              3
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HERO - Fast Food Retro ===== */}
      <section id="home" className="min-h-screen bg-[#3451a1] relative overflow-hidden pt-20">
        {/* Checkerboard top border */}
        <div className="absolute top-[72px] left-0 right-0 checkerboard-cream h-4 z-10" />

        {/* Background grid paper texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#f5e6c8 1px, transparent 1px), linear-gradient(90deg, #f5e6c8 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        {/* Decorative 3s */}
        <div className="absolute top-32 right-[15%] text-[#f5e6c8]/[0.07] text-[20rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(12deg)' }}>3</div>
        <div className="absolute bottom-10 left-[5%] text-[#f5e6c8]/[0.05] text-[15rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-8deg)' }}>3</div>

        <div className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center w-full max-w-[1600px] mx-auto">

            {/* Text - Left side */}
            <div className="lg:col-span-5 hero-text relative z-10">
              <div className="retro-badge-outline mb-8 text-[#f5e6c8] border-[#f5e6c8] text-xs tracking-[0.3em]">
                Mercato San Lorenzo — Palermo
              </div>

              <h1 className="mb-0 -ml-4 md:-ml-8 lg:-ml-12">
                <img
                  src={logoHero}
                  alt="3 Smash Palermo"
                  title="3 Smash - Smash Burger Artigianali"
                  className="w-full max-w-[500px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1100px] h-auto -mb-2"
                />
              </h1>

              <p className="text-[#f5e6c8]/70 text-lg md:text-xl max-w-md leading-relaxed">
                Carne fresca schiacciata sul griddle rovente. Quella crosticina caramellata che non dimentichi.
              </p>

              <div className="flex flex-wrap gap-5 mt-12">
                <motion.a
                  href="#menu"
                  className="retro-btn retro-btn-cream text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Scopri il Menu
                </motion.a>
                <motion.a
                  href="#contatti"
                  className="retro-btn text-sm border-[#f5e6c8] text-[#f5e6c8] bg-transparent"
                  style={{ boxShadow: '4px 4px 0 #f5e6c8' }}
                  whileHover={{ scale: 1.05 }}
                >
                  Dove Siamo
                </motion.a>
              </div>
            </div>

            {/* Image - Right side */}
            <div className="lg:col-span-7 lg:col-start-6 hero-image relative">
              <div className="relative">
                <img
                  src={heroImg}
                  alt="Pig Smash - Il nostro burger best seller"
                  title="Pig Smash di 3 Smash Palermo"
                  className="w-full max-w-2xl mx-auto lg:max-w-none rounded-3xl border-4 border-[#f5e6c8]/30"
                  width="800"
                  height="600"
                  loading="eager"
                  style={{ boxShadow: '8px 8px 0 rgba(245,230,200,0.2)' }}
                />
                {/* Floating price tag */}
                <motion.div
                  className="float-element absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-[#f5e6c8] text-[#3451a1] px-8 py-4 font-display text-2xl md:text-3xl uppercase font-bold rounded-2xl border-4 border-[#3451a1]"
                  style={{ boxShadow: '5px 5px 0 #1a2d6b' }}
                >
                  €9.50
                </motion.div>
                {/* Floating label */}
                <motion.div
                  className="float-element absolute -top-4 -right-4 md:-top-6 md:-right-6 retro-badge text-sm tracking-wider flex items-center gap-2"
                  style={{ animationDelay: '0.5s' }}
                >
                  <span className="font-black text-lg" style={{ fontFamily: 'system-ui' }}>3</span>
                  Best Seller
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkerboard bottom border */}
        <div className="checkerboard-cream h-4 relative z-10" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-8 h-12 border-3 border-[#f5e6c8]/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#f5e6c8]/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ===== Scrolling Text Banner - Retro Ribbon ===== */}
      <section className="scroll-text-container py-6 bg-[#f5e6c8] overflow-hidden border-b-4 border-[#3451a1]">
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

      {/* ===== Gallery Strip ===== */}
      <section className="py-12 bg-[#faf3e3] overflow-hidden relative">
        <div className="flex gap-6 animate-marquee relative z-10">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 flex-shrink-0">
              {[smashGriddle, burgerPatatine, clienteMercato, smashSpatola, sendFries, clientiFelici, packaging].map((img, i) => (
                <motion.div
                  key={`${setIndex}-${i}`}
                  className="relative group"
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                >
                  <img
                    src={img}
                    alt="3 Smash Palermo - Galleria"
                    title="Smash burger e momenti al Mercato San Lorenzo"
                    className="h-40 md:h-56 w-auto object-cover rounded-2xl border-3 border-[#3451a1] shadow-lg"
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
      </section>

      {/* ===== MENU - Retro Card Style ===== */}
      <section id="menu" className="py-24 md:py-36 bg-[#faf3e3] relative">
        {/* Grid paper background */}
        <div className="absolute inset-0 opacity-[0.3]" style={{
          backgroundImage: 'linear-gradient(#3451a1 1px, transparent 1px), linear-gradient(90deg, #3451a1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.04
        }} />

        {/* Decorative 3s */}
        <div className="absolute top-20 left-[8%] text-[#3451a1]/[0.06] text-[18rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-15deg)' }}>3</div>
        <div className="absolute bottom-40 right-[10%] text-[#3451a1]/[0.04] text-[25rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(20deg)' }}>3</div>

        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto relative z-10">
          {/* Header */}
          <div className="reveal-section mb-20 md:mb-28 text-center">
            <span className="retro-badge text-xs tracking-[0.3em] mb-6 inline-block">
              Cosa offriamo
            </span>
            <h2 className="text-[#3451a1] text-5xl md:text-6xl lg:text-8xl font-display font-bold uppercase leading-[0.9] mt-6">
              Il Nostro Menu
            </h2>
            <p className="text-[#3451a1]/50 max-w-lg mx-auto text-lg mt-6">
              Ogni burger è preparato al momento con ingredienti freschi. Carne 100% italiana, pane artigianale.
            </p>
          </div>

          {/* Burgers Grid - Retro Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-10 mb-24">
            {menuItems.map((item, i) => (
              <motion.div
                key={i}
                className="menu-card retro-card overflow-hidden group"
                whileHover={{ y: -8 }}
              >
                <div className="overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={`${item.name} - Smash burger di 3 Smash Palermo`}
                    title={`${item.name} - ${item.desc}`}
                    className="w-full h-64 md:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width="400"
                    height="320"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3451a1]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Price tag */}
                  <div className="absolute bottom-3 right-3 bg-[#f5e6c8] text-[#3451a1] px-5 py-2 font-display text-xl font-bold rounded-full border-3 border-[#3451a1]" style={{ boxShadow: '3px 3px 0 #3451a1' }}>
                    €{item.price}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[#3451a1] text-2xl md:text-3xl font-display font-bold uppercase mb-2">
                    {item.name}
                  </h3>
                  <p className="text-[#3451a1]/50 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sides & Drinks */}
          <div className="reveal-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Image side */}
              <div className="relative order-2 lg:order-1">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={sidesPatatine}
                    alt="Sides e contorni - Patatine, nuggets e onion rings"
                    title="I nostri contorni croccanti - 3 Smash Palermo"
                    className="relative w-full rounded-2xl border-4 border-[#3451a1]"
                    loading="lazy"
                    width="600"
                    height="400"
                    style={{ boxShadow: '8px 8px 0 #3451a1' }}
                  />

                  {/* Floating badges */}
                  <motion.div
                    className="absolute -top-4 -right-4 retro-badge text-base"
                    whileHover={{ scale: 1.1 }}
                  >
                    Crispy!
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-4 -left-4 retro-badge text-base"
                    style={{ background: '#f5e6c8', color: '#3451a1', borderColor: '#3451a1' }}
                    whileHover={{ scale: 1.1 }}
                  >
                    Fresh
                  </motion.div>
                </motion.div>
              </div>

              {/* Content side */}
              <div className="order-1 lg:order-2">
                <h3 className="text-[#3451a1] text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase mb-4 leading-[0.9]">
                  Sides & Drinks
                </h3>
                <p className="text-[#3451a1]/50 mb-10 text-lg">
                  Il contorno perfetto per il tuo smash
                </p>

                {/* Items list */}
                <div className="retro-card p-6">
                  {sides.map((item, i) => (
                    <motion.div
                      key={i}
                      className={`flex justify-between items-center py-4 group ${i < sides.length - 1 ? 'border-b-2 border-dashed border-[#3451a1]/20' : ''}`}
                      whileHover={{ x: 8 }}
                    >
                      <span className="text-[#3451a1] text-lg font-medium group-hover:font-bold transition-all">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="h-px w-8 bg-[#3451a1]/20 group-hover:w-14 group-hover:bg-[#3451a1] transition-all" />
                        <span className="text-[#3451a1] font-display font-bold text-xl">
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

      {/* ===== Checkerboard Divider ===== */}
      <div className="checkerboard h-6" />

      {/* ===== CHI SIAMO - Retro Style ===== */}
      <section id="chi-siamo" className="py-24 md:py-36 bg-[#3451a1] relative overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#f5e6c8 1px, transparent 1px), linear-gradient(90deg, #f5e6c8 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        {/* Decorative 3s */}
        <div className="absolute top-10 right-[5%] text-[#f5e6c8]/[0.06] text-[22rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(10deg)' }}>3</div>
        <div className="absolute bottom-20 left-[3%] text-[#f5e6c8]/[0.04] text-[16rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-12deg)' }}>3</div>

        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Images - Stacked with retro borders */}
            <div className="reveal-section relative h-[500px] md:h-[600px] lg:h-[700px] order-2 lg:order-1">
              <motion.img
                src={smashGriddle}
                alt="Smash burger in preparazione sul griddle rovente"
                title="La tecnica smash - 3 Smash Palermo"
                className="parallax-img absolute top-0 left-0 w-3/5 h-64 md:h-80 object-cover rounded-2xl border-4 border-[#f5e6c8]"
                whileHover={{ scale: 1.05, zIndex: 20 }}
                loading="lazy"
                width="350"
                height="320"
                style={{ boxShadow: '6px 6px 0 rgba(245,230,200,0.3)' }}
              />
              <motion.img
                src={clientiFelici}
                alt="Clienti felici al Mercato San Lorenzo"
                title="I nostri clienti - 3 Smash Palermo"
                className="parallax-img absolute top-20 right-0 w-3/5 h-56 md:h-72 object-cover rounded-2xl border-4 border-[#f5e6c8]"
                whileHover={{ scale: 1.05, zIndex: 20 }}
                loading="lazy"
                width="350"
                height="288"
                style={{ boxShadow: '6px 6px 0 rgba(245,230,200,0.3)' }}
              />
              <motion.img
                src={packaging}
                alt="Packaging brandizzato 3 Smash Palermo"
                title="Il nostro packaging - 3 Smash Palermo"
                className="parallax-img absolute bottom-20 left-10 w-1/2 h-48 md:h-64 object-cover rounded-2xl border-4 border-[#f5e6c8]"
                whileHover={{ scale: 1.05, zIndex: 20 }}
                loading="lazy"
                width="300"
                height="256"
                style={{ boxShadow: '6px 6px 0 rgba(245,230,200,0.3)' }}
              />
              <motion.img
                src={clienteMercato}
                alt="Esperienza al Mercato San Lorenzo di Palermo"
                title="Al Mercato San Lorenzo - 3 Smash Palermo"
                className="parallax-img absolute bottom-0 right-5 w-2/5 h-52 md:h-60 object-cover rounded-2xl border-4 border-[#f5e6c8]"
                whileHover={{ scale: 1.05, zIndex: 20 }}
                loading="lazy"
                width="250"
                height="240"
                style={{ boxShadow: '6px 6px 0 rgba(245,230,200,0.3)' }}
              />
            </div>

            {/* Text */}
            <div className="reveal-section order-1 lg:order-2">
              <span className="retro-badge-outline text-[#f5e6c8] border-[#f5e6c8] text-xs tracking-[0.3em] mb-6 inline-block">
                La nostra storia
              </span>
              <h2 className="text-[#f5e6c8] text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase leading-[0.9] mb-10 mt-6">
                Chi Siamo
              </h2>

              <div className="space-y-6 text-[#f5e6c8]/70 text-lg md:text-xl leading-relaxed">
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
        </div>
      </section>

      {/* ===== Checkerboard Divider ===== */}
      <div className="checkerboard h-6" />

      {/* ===== Instagram Feed - Retro Mosaic ===== */}
      <section className="py-20 md:py-28 bg-[#faf3e3] relative overflow-hidden">
        {/* Decorative 3s */}
        <div className="absolute top-8 left-[8%] text-[#3451a1]/[0.06] text-[12rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-12deg)' }}>3</div>
        <div className="absolute bottom-12 right-[6%] text-[#3451a1]/[0.04] text-[14rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(18deg)' }}>3</div>

        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto relative z-10">
          <div className="reveal-section text-center mb-16">
            <h2 className="text-[#3451a1] text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase">
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
        </div>
      </section>

      {/* ===== Checkerboard Divider ===== */}
      <div className="checkerboard h-6" />

      {/* ===== CONTATTI - Retro Style ===== */}
      <section id="contatti" className="py-24 md:py-36 bg-[#faf3e3] relative overflow-hidden">
        {/* Decorative 3s */}
        <div className="absolute top-16 left-[6%] text-[#3451a1]/[0.06] text-[14rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(-8deg)' }}>3</div>
        <div className="absolute bottom-32 right-[8%] text-[#3451a1]/[0.04] text-[18rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(15deg)' }}>3</div>

        <div className="px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          <div className="reveal-section text-center mb-20">
            <span className="retro-badge text-xs tracking-[0.3em] mb-6 inline-block">Ti aspettiamo</span>
            <h2 className="text-[#3451a1] text-5xl md:text-6xl lg:text-8xl font-display font-bold uppercase mt-6">
              Vieni a Trovarci
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Dove', info: ['Mercato San Lorenzo', 'Palermo'] },
              { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Quando', info: ['Mar — Dom: 11:00 — 22:00', 'Lunedì: Chiuso'] },
              { title: 'Social', info: ['@3smashpalermo'], isInstagram: true },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="retro-card text-center p-8"
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 bg-[#3451a1] rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.isInstagram ? (
                    <svg className="w-7 h-7 text-[#f5e6c8]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ) : (
                    <svg className="w-7 h-7 text-[#f5e6c8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  )}
                </div>
                <h3 className="text-[#3451a1] text-2xl font-display font-bold uppercase mb-3">{item.title}</h3>
                {item.info.map((line, j) => (
                  item.isInstagram ? (
                    <a key={j} href="https://instagram.com/3smashpalermo" target="_blank" rel="noopener noreferrer" className="text-[#3451a1]/60 hover:text-[#3451a1] transition-colors block font-medium">
                      {line}
                    </a>
                  ) : (
                    <p key={j} className="text-[#3451a1]/60">{line}</p>
                  )
                ))}
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <motion.div
            className="rounded-2xl overflow-hidden h-80 md:h-[450px] border-4 border-[#3451a1]"
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
        </div>
      </section>

      {/* ===== FOOTER - Retro Style ===== */}
      <footer className="bg-[#3451a1] relative overflow-hidden">
        {/* Checkerboard top */}
        <div className="checkerboard-cream h-4" />

        <div className="py-12 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto relative z-10">
          {/* Decorative 3s */}
          <div className="absolute top-4 right-[15%] text-[#f5e6c8]/[0.06] text-[8rem] font-black select-none pointer-events-none" style={{ fontFamily: 'system-ui', transform: 'rotate(10deg)' }}>3</div>

          <div className="flex flex-col gap-8">
            {/* Top row */}
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
                <p className="text-[#f5e6c8]/60 text-sm">
                  {siteData.address.full}
                </p>
                <a href={`mailto:${siteData.contact.email}`} className="text-[#f5e6c8]/60 hover:text-[#f5e6c8] text-sm transition-colors">
                  {siteData.contact.email}
                </a>
                <a href={`tel:${siteData.contact.phone}`} className="text-[#f5e6c8]/60 hover:text-[#f5e6c8] text-sm transition-colors">
                  {siteData.contact.phoneFormatted}
                </a>
              </div>
              <motion.a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5e6c8]/50 hover:text-[#f5e6c8] transition-colors text-sm uppercase tracking-wider font-bold"
                whileHover={{ scale: 1.1 }}
              >
                {siteData.social.instagramHandle}
              </motion.a>
            </div>
            {/* Bottom row */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#f5e6c8]/15">
              <p className="text-[#f5e6c8]/40 text-sm">
                © {new Date().getFullYear()} {siteData.name}. Tutti i diritti riservati.
              </p>
              <div className="flex gap-6">
                <Link
                  to="/privacy-policy"
                  className="text-[#f5e6c8]/50 hover:text-[#f5e6c8] text-sm transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/cookie-policy"
                  className="text-[#f5e6c8]/50 hover:text-[#f5e6c8] text-sm transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Checkerboard bottom */}
        <div className="checkerboard-cream h-4" />
      </footer>
    </div>
  );
}
