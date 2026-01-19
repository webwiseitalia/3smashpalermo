import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import SplitType from 'split-type';
import { motion } from 'framer-motion';

import logo from './assets/logo.webp';
import heroImg from './assets/pig-smash-hero.webp';
import smashGriddle from './assets/smash-griddle-cipolla.webp';
import smashSpatola from './assets/smash-spatola-cipolla.webp';
import burgerPatatine from './assets/burger-patatine-rosso.webp';
import sendFries from './assets/send-fries-blu.webp';
import clienteMercato from './assets/cliente-mercato.webp';
import clientiFelici from './assets/clienti-felici.webp';
import packaging from './assets/packaging-brand.webp';
import sidesPatatine from './assets/sides-patatine-nuggets.webp';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroImageRef = useRef(null);
  const menuTitleRef = useRef(null);
  const aboutTitleRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Hero title split animation
    if (heroTitleRef.current) {
      const split = new SplitType(heroTitleRef.current, { types: 'chars, words' });
      gsap.from(split.chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      });
    }

    // Hero image parallax
    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        yPercent: 30,
        rotation: 5,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }

    // Menu title reveal
    if (menuTitleRef.current) {
      const menuSplit = new SplitType(menuTitleRef.current, { types: 'chars' });
      gsap.from(menuSplit.chars, {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -50 : 50),
        rotateY: 90,
        stagger: { each: 0.03, from: 'center' },
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: menuTitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // About section parallax images
    gsap.utils.toArray('.about-img').forEach((img, i) => {
      gsap.to(img, {
        yPercent: i % 2 === 0 ? -20 : 20,
        rotation: i % 2 === 0 ? -3 : 3,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });

    // Menu items stagger
    gsap.utils.toArray('.menu-item').forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        y: 80,
        rotation: i % 2 === 0 ? -5 : 5,
        scale: 0.9,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        delay: i * 0.1,
      });
    });

    // Horizontal scroll for gallery
    const galleryTrack = document.querySelector('.gallery-track');
    if (galleryTrack) {
      gsap.to(galleryTrack, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gallery-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
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
  ];

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="flex justify-between items-center px-[4vw] py-6">
          <motion.a
            href="#home"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <img src={logo} alt="3 Smash" className="h-[8vw] md:h-[4vw] max-h-16 invert" />
          </motion.a>
          <div className="hidden md:flex gap-[3vw] text-[1.1vw] uppercase tracking-[0.3em] text-white font-light">
            {['Menu', 'Chi Siamo', 'Contatti'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <motion.a
            href="https://instagram.com/3smashpalermo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-[2.5vw] md:text-[1vw] uppercase tracking-[0.2em] border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-colors duration-500"
            whileHover={{ scale: 1.05 }}
          >
            IG
          </motion.a>
        </div>
      </nav>

      {/* Hero - Asymmetric */}
      <section id="home" className="min-h-screen relative">
        <div className="absolute inset-0 bg-[#3451a1]" />
        <div className="relative z-10 min-h-screen flex flex-col justify-end pb-[8vh] px-[4vw]">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-7 lg:col-start-1">
              <p className="text-[#f5e6c8]/60 text-[2.5vw] md:text-[1vw] uppercase tracking-[0.5em] mb-[2vh]">
                Mercato San Lorenzo — Palermo
              </p>
              <h1
                ref={heroTitleRef}
                className="text-[#f5e6c8] text-[12vw] md:text-[8vw] leading-[0.85] font-display font-bold uppercase"
                style={{ perspective: '1000px' }}
              >
                Smash<br />
                <span className="ml-[15vw]">Burger</span><br />
                <span className="text-[8vw] md:text-[5vw] font-light normal-case italic">artigianali</span>
              </h1>
            </div>
            <div className="col-span-10 col-start-2 lg:col-span-4 lg:col-start-8 mt-[-20vh] lg:mt-0">
              <div ref={heroImageRef} className="relative">
                <img
                  src={heroImg}
                  alt="Pig Smash"
                  className="w-full rounded-[2vw] shadow-2xl rotate-3"
                />
                <div className="absolute -bottom-8 -left-8 bg-[#f5e6c8] text-[#3451a1] px-8 py-4 font-display text-[4vw] md:text-[1.5vw] uppercase">
                  Dal 2020
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-[4vh] right-[4vw] flex flex-col items-end">
            <span className="text-[#f5e6c8]/40 text-[1vw] uppercase tracking-[0.3em] mb-2">Scroll</span>
            <div className="w-px h-[8vh] bg-[#f5e6c8]/40" />
          </div>
        </div>
      </section>

      {/* Gallery Strip - Horizontal */}
      <section className="gallery-section h-[40vh] bg-[#f5e6c8] overflow-hidden flex items-center">
        <div className="gallery-track flex gap-[2vw] whitespace-nowrap">
          {[...Array(3)].map((_, setIndex) => (
            [smashGriddle, burgerPatatine, clienteMercato, smashSpatola, sendFries, clientiFelici, packaging].map((img, i) => (
              <div
                key={`${setIndex}-${i}`}
                className="relative flex-shrink-0"
                style={{ transform: `rotate(${(i % 3 - 1) * 3}deg)` }}
              >
                <img
                  src={img}
                  alt=""
                  className="h-[30vh] w-auto object-cover"
                />
              </div>
            ))
          ))}
        </div>
      </section>

      {/* Menu - Broken Grid */}
      <section id="menu" className="py-[15vh] bg-[#0a0a0a] relative">
        <div className="absolute top-[10vh] left-[4vw]">
          <span className="text-[#3451a1]/20 text-[25vw] font-display font-bold uppercase leading-none">
            Menu
          </span>
        </div>
        <div className="relative z-10 px-[4vw]">
          <div className="flex justify-end mb-[10vh]">
            <h2
              ref={menuTitleRef}
              className="text-[#f5e6c8] text-[8vw] md:text-[5vw] font-display font-bold uppercase text-right"
            >
              Il Nostro<br />Menu
            </h2>
          </div>

          {/* Irregular menu grid */}
          <div className="grid grid-cols-12 gap-y-[8vh]">
            {menuItems.map((item, i) => {
              const positions = [
                'col-span-12 md:col-span-5 md:col-start-1',
                'col-span-12 md:col-span-5 md:col-start-7',
                'col-span-12 md:col-span-6 md:col-start-4',
                'col-span-12 md:col-span-5 md:col-start-2',
                'col-span-12 md:col-span-5 md:col-start-8',
                'col-span-12 md:col-span-6 md:col-start-3',
              ];
              const rotations = [-2, 1, -1, 2, -1.5, 1.5];

              return (
                <div
                  key={i}
                  className={`menu-item ${positions[i]}`}
                  style={{ transform: `rotate(${rotations[i]}deg)` }}
                >
                  <div className="group relative">
                    <div className="overflow-hidden rounded-[1vw]">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-[40vh] object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="mt-4 flex justify-between items-end">
                      <div>
                        <h3 className="text-[#f5e6c8] text-[5vw] md:text-[2vw] font-display font-bold uppercase">
                          {item.name}
                        </h3>
                        <p className="text-[#f5e6c8]/50 text-[3vw] md:text-[1vw] max-w-[30ch] mt-2">
                          {item.desc}
                        </p>
                      </div>
                      <span className="text-[#3451a1] bg-[#f5e6c8] px-4 py-2 font-display text-[4vw] md:text-[1.5vw] font-bold">
                        €{item.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sides - Scattered */}
          <div className="mt-[20vh] relative">
            <h3 className="text-[#f5e6c8]/20 text-[15vw] font-display font-bold uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              Sides
            </h3>
            <div className="relative z-10 flex flex-wrap justify-center gap-[3vw]">
              {sides.map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-[#3451a1] px-[3vw] py-[2vh] text-[#f5e6c8]"
                  style={{ transform: `rotate(${(i % 3 - 1) * 5}deg)` }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                >
                  <span className="font-display text-[3vw] md:text-[1.2vw] uppercase">{item.name}</span>
                  <span className="ml-4 font-bold">€{item.price}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-[10vh]">
              <img
                src={sidesPatatine}
                alt="Sides"
                className="w-[60vw] md:w-[30vw] rounded-[2vw] -rotate-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About - Overlap Layout */}
      <section id="chi-siamo" className="py-[15vh] bg-[#3451a1] relative overflow-hidden">
        <div className="px-[4vw]">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-5 lg:col-start-2">
              <h2
                ref={aboutTitleRef}
                className="text-[#f5e6c8] text-[10vw] md:text-[6vw] font-display font-bold uppercase leading-[0.9] mb-[8vh]"
              >
                Chi<br />
                <span className="ml-[10vw]">Siamo</span>
              </h2>
              <div className="space-y-[4vh] text-[#f5e6c8]/80 text-[4vw] md:text-[1.3vw] leading-relaxed max-w-[50ch]">
                <p>
                  <strong className="text-[#f5e6c8]">3 Smash</strong> è nato dalla passione per lo street food autentico americano, reinterpretato con l'anima e i sapori della Sicilia.
                </p>
                <p>
                  La tecnica dello smash è semplice ma perfetta: una palla di carne fresca schiacciata sul griddle rovente crea quella crosticina caramellata che rende ogni morso indimenticabile.
                </p>
                <p>
                  Ci trovi al <strong className="text-[#f5e6c8]">Mercato San Lorenzo</strong>, il cuore pulsante di Palermo.
                </p>
              </div>
              <motion.a
                href="https://instagram.com/3smashpalermo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-[6vh] border-2 border-[#f5e6c8] text-[#f5e6c8] px-8 py-4 text-[3vw] md:text-[1vw] uppercase tracking-[0.3em] hover:bg-[#f5e6c8] hover:text-[#3451a1] transition-all duration-500"
                whileHover={{ x: 10 }}
              >
                @3smashpalermo
              </motion.a>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8 relative mt-[8vh] lg:mt-0">
              <div className="relative">
                <img
                  src={smashGriddle}
                  alt=""
                  className="about-img w-[70%] rounded-[1vw] relative z-10"
                />
                <img
                  src={clientiFelici}
                  alt=""
                  className="about-img absolute top-[30%] left-[40%] w-[60%] rounded-[1vw] z-20"
                />
                <img
                  src={packaging}
                  alt=""
                  className="about-img absolute top-[60%] left-[10%] w-[50%] rounded-[1vw] z-30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact - Minimal */}
      <section id="contatti" className="py-[20vh] bg-[#0a0a0a]">
        <div className="px-[4vw]">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3">
              <h2 className="text-[#f5e6c8] text-[12vw] md:text-[8vw] font-display font-bold uppercase leading-[0.85] mb-[10vh]">
                Vieni a<br />
                <span className="ml-[20vw]">Trovarci</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[8vh] md:gap-[4vw]">
                <div>
                  <span className="text-[#3451a1] text-[2.5vw] md:text-[0.8vw] uppercase tracking-[0.3em] block mb-4">Dove</span>
                  <p className="text-[#f5e6c8] text-[4vw] md:text-[1.5vw] font-display">
                    Mercato San Lorenzo<br />Palermo
                  </p>
                </div>
                <div>
                  <span className="text-[#3451a1] text-[2.5vw] md:text-[0.8vw] uppercase tracking-[0.3em] block mb-4">Quando</span>
                  <p className="text-[#f5e6c8] text-[4vw] md:text-[1.5vw] font-display">
                    Mar — Dom<br />11:00 — 22:00
                  </p>
                </div>
                <div>
                  <span className="text-[#3451a1] text-[2.5vw] md:text-[0.8vw] uppercase tracking-[0.3em] block mb-4">Social</span>
                  <a
                    href="https://instagram.com/3smashpalermo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f5e6c8] text-[4vw] md:text-[1.5vw] font-display hover:text-[#3451a1] transition-colors"
                  >
                    @3smashpalermo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-[4vh] bg-[#0a0a0a] border-t border-[#f5e6c8]/10">
        <div className="px-[4vw] flex flex-col md:flex-row justify-between items-center gap-4">
          <img src={logo} alt="3 Smash" className="h-8 invert opacity-50" />
          <p className="text-[#f5e6c8]/30 text-[2.5vw] md:text-[0.8vw]">
            © 2024 3 Smash Palermo
          </p>
          <a
            href="https://instagram.com/3smashpalermo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f5e6c8]/30 hover:text-[#f5e6c8] transition-colors text-[2.5vw] md:text-[0.8vw] uppercase tracking-[0.2em]"
          >
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
