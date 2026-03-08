import { useState, useEffect, useRef } from 'react';
import logoNormal from '../assets/animation/logo-non-smashed.webp';
import logoSmashed from '../assets/animation/logo-smashed.webp';
import pol1 from '../assets/content/content-1.webp';
import pol2 from '../assets/content/content-5.webp';
import pol3 from '../assets/content/content-3.webp';
import pol4 from '../assets/content/content-7.webp';

const polaroids = [
  { src: pol1, top: '10%',  left: '5%',   rotate: -8,  size: 340 },
  { src: pol2, bottom: '10%', left: '6%', rotate: 6,   size: 323 },
  { src: pol3, top: '8%',   right: '5%',  rotate: 10,  size: 332 },
  { src: pol4, bottom: '8%', right: '6%', rotate: -6,  size: 315 },
];

const TIMINGS = {
  idle: 1000,
  pressing: 1500,
  covered: 600,
  lifting: 1000,
  fadeOut: 500,
};

// All sizes relative to plate width for consistent proportions
const PLATE_W = 320;       // plate width (reference)
const PLATE_H = 50;        // plate height
const BODY_W = 80;         // press body width
const BODY_H = 140;        // press body height
const HANDLE_W = 0;        // handle removed
const HANDLE_H = 0;        // handle removed
const LOGO_W = PLATE_W - 40; // logo slightly narrower than plate
const BAR_H = 14;          // loading bar height

// Total press height (handle + body + plate)
const PRESS_H = HANDLE_H + BODY_H + PLATE_H;

export default function LoadingScreen({ onFinished }) {
  const [phase, setPhase] = useState('idle');
  const [visible, setVisible] = useState(true);
  const [percent, setPercent] = useState(0);
  const phaseStartRef = useRef(null);

  // Animate percentage counter in sync with phases
  useEffect(() => {
    const targets = { idle: 0, pressing: 50, covered: 70, lifting: 100, smashed: 100 };
    const durations = { idle: 0, pressing: TIMINGS.pressing, covered: TIMINGS.covered, lifting: TIMINGS.lifting, smashed: 0 };

    const startVal = percent;
    const endVal = targets[phase];
    const duration = durations[phase];

    if (duration === 0) {
      setPercent(endVal);
      return;
    }

    phaseStartRef.current = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - phaseStartRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(startVal + (endVal - startVal) * progress);
      setPercent(current);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    const t = setTimeout(() => setPhase('pressing'), TIMINGS.idle);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === 'pressing') {
      const t = setTimeout(() => setPhase('covered'), TIMINGS.pressing);
      return () => clearTimeout(t);
    }
    if (phase === 'covered') {
      const t = setTimeout(() => setPhase('lifting'), TIMINGS.covered);
      return () => clearTimeout(t);
    }
    if (phase === 'lifting') {
      const t = setTimeout(() => setPhase('smashed'), TIMINGS.lifting);
      return () => clearTimeout(t);
    }
    if (phase === 'smashed') {
      const t = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => onFinished?.(), TIMINGS.fadeOut);
      return () => clearTimeout(t);
    }
  }, [visible]);

  // The press starts just above the visible area — only handle peeks out
  // When pressing, the plate bottom must land exactly on the bar
  // Container height = 400, bar at bottom (height BAR_H)
  // Press landing: pressTop + PRESS_H = CONTAINER_H - BAR_H
  const CONTAINER_H = 400;
  const pressTopIdle = -PRESS_H + 30; // just the bottom of the plate peeks in
  const pressTopDown = CONTAINER_H - BAR_H - PRESS_H;

  const pressTop = (() => {
    if (phase === 'idle') return pressTopIdle;
    if (phase === 'pressing' || phase === 'covered') return pressTopDown;
    return pressTopIdle;
  })();

  const pressTransition = (() => {
    if (phase === 'pressing') return `top ${TIMINGS.pressing}ms cubic-bezier(0.55, 0, 1, 0.45)`;
    if (phase === 'lifting' || phase === 'smashed') return `top ${TIMINGS.lifting}ms ease-out`;
    return 'none';
  })();

  const logoScale = (() => {
    if (phase === 'pressing' || phase === 'covered') return 0.3;
    return 1;
  })();

  const logoTransition = (() => {
    if (phase === 'pressing') return `transform 400ms cubic-bezier(0.55, 0, 1, 0.45) ${TIMINGS.pressing - 400}ms`;
    if (phase === 'lifting' || phase === 'smashed') return `transform ${TIMINGS.lifting}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
    return 'none';
  })();

  const isSmashed = phase === 'covered' || phase === 'lifting' || phase === 'smashed';

  const barWidth = (() => {
    if (phase === 'idle') return '0%';
    if (phase === 'pressing') return '50%';
    if (phase === 'covered') return '70%';
    if (phase === 'lifting' || phase === 'smashed') return '100%';
    return '0%';
  })();

  const barTransition = (() => {
    if (phase === 'pressing') return `width ${TIMINGS.pressing}ms cubic-bezier(0.55, 0, 1, 0.45)`;
    if (phase === 'covered') return `width ${TIMINGS.covered}ms linear`;
    if (phase === 'lifting' || phase === 'smashed') return `width ${TIMINGS.lifting}ms ease-out`;
    return 'none';
  })();

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#2D2C72',
      opacity: visible ? 1 : 0,
      transition: `opacity ${TIMINGS.fadeOut}ms ease`,
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      {/* Grid texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: 'linear-gradient(#faf3e3 1px, transparent 1px), linear-gradient(90deg, #faf3e3 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Scattered polaroids */}
      {polaroids.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: p.top,
          left: p.left,
          right: p.right,
          bottom: p.bottom,
          transform: `rotate(${p.rotate}deg)`,
          opacity: 1,
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          {/* Thumbtack / Spilletta */}
          <div style={{
            position: 'absolute',
            top: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}>
            {/* Tack head — dome shape */}
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 38% 32%, #5b5acd, #2D2C72, #1a1a45)',
              boxShadow: '0 3px 6px rgba(0,0,0,0.5), inset 0 2px 4px rgba(150,150,255,0.4), inset 0 -2px 3px rgba(0,0,0,0.3)',
              position: 'relative',
            }}>
              {/* Shine highlight */}
              <div style={{
                position: 'absolute',
                top: 5,
                left: 6,
                width: 7,
                height: 5,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.45)',
              }} />
            </div>
            {/* Needle tip visible below head */}
            <div style={{
              width: 3,
              height: 8,
              background: 'linear-gradient(180deg, #999, #666)',
              margin: '-2px auto 0',
              borderRadius: '0 0 2px 2px',
            }} />
            {/* Shadow on polaroid surface */}
            <div style={{
              width: 14,
              height: 5,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.12)',
              margin: '0 auto',
            }} />
          </div>
          {/* Polaroid */}
          <div style={{
            background: '#faf3e3',
            padding: '6px 6px 20px 6px',
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            width: p.size,
          }}>
            <img
              src={p.src}
              alt=""
              style={{
                width: '100%',
                height: p.size - 26,
                objectFit: 'cover',
                display: 'block',
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      ))}

      {/* Scaled container — scales down on small screens */}
      <div style={{
        position: 'relative',
        width: PLATE_W,
        height: CONTAINER_H,
        transform: `scale(${Math.min(1, (window.innerWidth * 0.85) / PLATE_W)})`,
        transformOrigin: 'center center',
      }}>

        {/* Press assembly (handle + body + plate) */}
        <div style={{
          position: 'absolute',
          top: pressTop,
          left: '50%',
          transform: 'translateX(-50%)',
          transition: pressTransition,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {/* Body */}
          <div style={{
            width: BODY_W,
            height: BODY_H,
            background: 'linear-gradient(90deg, #666, #888, #666)',
            borderRadius: '8px 8px 0 0',
          }} />
          {/* Plate */}
          <div style={{
            width: PLATE_W,
            height: PLATE_H,
            background: 'linear-gradient(180deg, #999, #777)',
            borderRadius: '0 0 6px 6px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
          }} />
        </div>

        {/* Logo — sits just above the bar, anchored to bottom */}
        <div style={{
          position: 'absolute',
          bottom: BAR_H,
          left: '50%',
          transform: 'translateX(-50%)',
          width: LOGO_W,
          zIndex: 5,
        }}>
          <img
            src={isSmashed ? logoSmashed : logoNormal}
            alt="3 Smash Palermo"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transform: `scaleY(${logoScale})`,
              transformOrigin: 'bottom center',
              transition: logoTransition,
            }}
          />
        </div>

        {/* Loading bar (the griddle base) */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: PLATE_W,
          height: BAR_H,
          background: '#333',
          borderRadius: 3,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: barWidth,
            background: '#faf3e3',
            borderRadius: 3,
            transition: barTransition,
          }} />
        </div>

        {/* Percentage counter */}
        <div style={{
          position: 'absolute',
          bottom: -95,
          left: 0,
          width: PLATE_W,
          textAlign: 'center',
          fontFamily: "'Besgum', system-ui, sans-serif",
          fontStyle: 'italic',
          fontWeight: 'bold',
          fontSize: 50,
          color: '#faf3e3',
          letterSpacing: '0.1em',
          opacity: 0.8,
        }}>
          {percent}%
        </div>
      </div>
    </div>
  );
}
