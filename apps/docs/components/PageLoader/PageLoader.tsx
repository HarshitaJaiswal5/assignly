'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Zap,
  Palette,
  Laptop,
  Database,
  Code2,
  Briefcase,
  FileText,
  Bell,
  Rocket,
  type LucideIcon,
} from 'lucide-react';

interface PageLoaderProps {
  /** Called after the loader has slid away. */
  onComplete?: () => void;
  /** Seconds the progress bar takes to fill. */
  duration?: number;
}

/* Status line: shown while the bar passes each threshold (percent) */
const MESSAGES: { from: number; text: string; icon: LucideIcon }[] = [
  { from: 0, text: 'Loading your gigs', icon: Briefcase },
  { from: 30, text: 'Fetching applications', icon: FileText },
  { from: 60, text: 'Checking notifications', icon: Bell },
  { from: 85, text: 'Almost there', icon: Rocket },
];

/* Orbiting tiles: angle on the ring (deg), icon, color */
const ORBIT: { angle: number; icon: LucideIcon; color: string }[] = [
  { angle: 0, icon: Database, color: 'text-purple-500' },
  { angle: 90, icon: Palette, color: 'text-pink-500' },
  { angle: 180, icon: Laptop, color: 'text-green-500' },
  { angle: 270, icon: Code2, color: 'text-primary' },
];

const RING = 210; // orbit diameter (px)
const TILE = 40; // orbit tile size (px)

export function PageLoader({ onComplete, duration = 4 }: PageLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [msgIndex, setMsgIndex] = useState(0);

  // Keep the latest callback without restarting the animation
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    setMsgIndex(0);

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // gsap.context reverts everything on cleanup (Strict Mode safe)
    const ctx = gsap.context(() => {
      const orbit = root.querySelector('[data-orbit]');
      const tiles = gsap.utils.toArray<HTMLElement>('[data-tile]');
      const logo = root.querySelector('[data-logo]');
      const glow = root.querySelector('[data-glow]');
      const bar = root.querySelector('[data-bar]');

      gsap.set(bar, { scaleX: 0 });

      if (reduceMotion) {
        gsap.set(bar, { scaleX: 1 });
        setMsgIndex(MESSAGES.length - 1);
        gsap.delayedCall(0.8, () => onCompleteRef.current?.());
        return;
      }

      /* ---------- Looping motion ---------- */
      const SPIN = 9;

      gsap.to(orbit, { rotation: 360, duration: SPIN, ease: 'none', repeat: -1 });

      // Counter-rotate each tile so its icon stays upright
      tiles.forEach((tile, i) => {
        const start = -(ORBIT[i]?.angle ?? 0);
        gsap.fromTo(
          tile,
          { rotation: start },
          { rotation: start - 360, duration: SPIN, ease: 'none', repeat: -1 }
        );
      });

      gsap.to(logo, {
        scale: 1.05,
        duration: 1.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.fromTo(
        glow,
        { scale: 0.9, opacity: 0.5 },
        {
          scale: 1.25,
          opacity: 0.15,
          duration: 1.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      );

      /* ---------- Progress, then exit ---------- */
      const progress = { value: 0 };
      let shown = 0;

      const tl = gsap.timeline({ onComplete: () => onCompleteRef.current?.() });

      tl.fromTo(
        root.querySelectorAll('[data-intro]'),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );

      tl.to(
        progress,
        {
          value: 100,
          duration,
          ease: 'power1.inOut',
          onUpdate: () => {
            gsap.set(bar, { scaleX: progress.value / 100 });

            // Pick the last message whose threshold we have passed
            let next = 0;
            MESSAGES.forEach((m, i) => {
              if (progress.value >= m.from) next = i;
            });
            if (next !== shown) {
              shown = next;
              setMsgIndex(next);
            }
          },
        },
        '-=0.2'
      );

      tl.to({}, { duration: 0.35 });
      tl.to(root, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' });
    }, root);

    return () => ctx.revert();
  }, [duration]);

  // Fade the status line in whenever the message changes
  useEffect(() => {
    const el = rootRef.current?.querySelector('[data-status]');
    if (!el) return;
    gsap.fromTo(
      el,
      { y: 6, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
    );
  }, [msgIndex]);

  const message = MESSAGES[msgIndex] ?? MESSAGES[0]!;
  const MessageIcon = message.icon;

  return (
    <div
      ref={rootRef}
      role='status'
      aria-live='polite'
      aria-label='Loading Assignly'
      className='fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-background'
      style={{ fontFamily: 'var(--font-rethink-sans), sans-serif' }}
    >
      {/* ============ Background decoration ============ */}
      <div
        aria-hidden
        className='absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/60'
      />
      <div
        aria-hidden
        className='absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-accent/70'
      />
      <div
        aria-hidden
        className='absolute right-10 top-10 hidden h-28 w-28 bg-[radial-gradient(circle,rgba(244,81,36,0.25)_1.4px,transparent_1.8px)] bg-[size:14px_14px] sm:block'
      />
      <div
        aria-hidden
        className='absolute bottom-10 left-10 hidden h-28 w-28 bg-[radial-gradient(circle,rgba(244,81,36,0.25)_1.4px,transparent_1.8px)] bg-[size:14px_14px] sm:block'
      />

      {/* ============ Center ============ */}
      <div className='relative flex flex-col items-center'>
        {/* Logo + orbit */}
        <div
          className='relative flex items-center justify-center'
          style={{ width: RING, height: RING }}
        >
          {/* Dashed orbit ring */}
          <div
            aria-hidden
            className='absolute inset-0 rounded-full border border-dashed border-primary/25'
          />

          {/* Pulsing glow */}
          <div
            data-glow
            aria-hidden
            className='absolute h-32 w-32 rounded-full bg-primary/20 blur-xl'
          />

          {/* Orbiting tiles */}
          <div data-orbit aria-hidden className='absolute inset-0'>
            {ORBIT.map(({ angle, icon: Icon, color }) => (
              <div
                key={angle}
                className='absolute inset-0'
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <span
                  data-tile
                  className='absolute flex items-center justify-center rounded-xl bg-white shadow-lg shadow-primary/15'
                  style={{
                    width: TILE,
                    height: TILE,
                    left: `calc(50% - ${TILE / 2}px)`,
                    top: -TILE / 2,
                  }}
                >
                  <Icon size={17} className={color} strokeWidth={2.4} />
                </span>
              </div>
            ))}
          </div>

          {/* Logo tile */}
          <div
            data-logo
            className='relative flex h-[88px] w-[88px] items-center justify-center rounded-[26px] bg-gradient-to-br from-primary to-primary-dark text-white shadow-xl shadow-primary/40'
          >
            <Zap size={38} fill='currentColor' strokeWidth={0} />
          </div>
        </div>

        {/* Brand name */}
        <p
          data-intro
          className='mt-7 text-xl font-extrabold tracking-tight text-foreground'
        >
          Assignly
        </p>

        {/* Progress bar */}
        <div
          data-intro
          role='progressbar'
          aria-label='Loading progress'
          className='mt-3 h-1 w-32 overflow-hidden rounded-full bg-accent'
        >
          <div
            data-bar
            className='h-full w-full origin-left rounded-full bg-primary'
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Status line */}
        <p
          data-intro
          className='mt-3 flex h-5 items-center gap-1.5 text-xs font-semibold text-foreground/60'
        >
          <span data-status className='flex items-center gap-1.5'>
            <MessageIcon size={13} className='text-primary' />
            {message.text}
          </span>
        </p>
      </div>
    </div>
  );
}

export default PageLoader;