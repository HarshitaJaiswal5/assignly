'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Camera,
  Home,
  Star,
  ArrowUpRight,
  Heart,
  Bell,
  type LucideIcon,
} from 'lucide-react';

interface LoaderMainProps {
  onComplete: () => void;
}

const SLOTS: { letter: string; Icon: LucideIcon }[] = [
  { letter: 'A', Icon: Camera },
  { letter: 'S', Icon: Home },
  { letter: 'S', Icon: Star },
  { letter: 'I', Icon: ArrowUpRight },
  { letter: 'N', Icon: Heart },
  { letter: 'L', Icon: Bell },
  { letter: 'Y', Icon: Camera },
];

const COLORS = {
  background: '#FFF3EA',
  primary: '#F45124',
  accent: '#F9D5C6',
};

export function LoaderMain({ onComplete }: LoaderMainProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Keep the latest callback without re-running the animation effect.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // gsap.context scopes selectors to `root` and reverts every
    // inline style on cleanup, so React Strict Mode's double
    // mount can't leave elements stuck at opacity 0.
    const ctx = gsap.context(() => {
      const slots = gsap.utils.toArray<HTMLElement>('[data-slot]');
      const icons = gsap.utils.toArray<HTMLElement>('[data-icon]');
      const letters = gsap.utils.toArray<HTMLElement>('[data-letter]');

      if (reduceMotion) {
        gsap.set(letters, { opacity: 1 });
        gsap.set(icons, { opacity: 0 });
        gsap.set('[data-progress-bar]', { scaleX: 1 });

        gsap.delayedCall(0.6, () => onCompleteRef.current());
        return;
      }

      // Initial states are set explicitly (no from() tweens).
      gsap.set(slots, { scale: 0, opacity: 0 });
      gsap.set(icons, { opacity: 1, scale: 1 });
      gsap.set(letters, { opacity: 0, scale: 0.4 });
      gsap.set('[data-brand]', { opacity: 0, y: 12 });
      gsap.set('[data-progress-bar]', { scaleX: 0 });

      const tl = gsap.timeline({
        onComplete: () => onCompleteRef.current(),
      });

      // 1. Icons pop in
      tl.to(slots, {
        scale: 1,
        opacity: 1,
        stagger: 0.08,
        duration: 0.45,
        ease: 'back.out(2)',
      });

      tl.to(
        '[data-brand]',
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '<0.2'
      );

      // 2. A small wave across the row
      tl.to(slots, {
        y: -14,
        stagger: 0.05,
        duration: 0.22,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      });

      // 3. Each icon flips into its letter, left to right
      tl.to(
        icons,
        {
          opacity: 0,
          scale: 0.4,
          rotate: -30,
          stagger: 0.2,
          duration: 0.25,
          ease: 'power2.in',
        },
        '+=0.15'
      );
      tl.to(
        letters,
        {
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.35,
          ease: 'back.out(2.5)',
        },
        '<0.15'
      );

      // Progress: spans everything up to here and reaches 100%
      // right as the last letter lands. Written to the DOM directly,
      // so there are no React re-renders.
      const progress = { value: 0 };
      tl.to(
        progress,
        {
          value: 100,
          duration: tl.duration(),
          ease: 'none',
          onUpdate: () => {
            gsap.set('[data-progress-bar]', { scaleX: progress.value / 100 });
          },
        },
        0
      );

      // 4. Hold at 100%, then slide the loader away
      tl.to({}, { duration: 0.7 });
      tl.to(root, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      role='status'
      aria-label='Loading Assignly'
      className='fixed inset-0 z-[999] flex items-center justify-center overflow-hidden'
      style={{
        backgroundColor: COLORS.background,
        fontFamily: 'var(--font-rethink-sans), sans-serif',
      }}
    >
      {/* Soft background glow */}
      <div
        aria-hidden
        className='absolute rounded-full'
        style={{
          width: 420,
          height: 420,
          backgroundColor: COLORS.accent,
          filter: 'blur(120px)',
          opacity: 0.3,
        }}
      />

      {/* Slots: icon and letter stacked, cross-faded by GSAP */}
      <div
        aria-hidden
        className='relative z-10 flex flex-wrap items-center justify-center gap-3 px-5 sm:gap-5'
      >
        {SLOTS.map(({ letter, Icon }, i) => (
          <div
            key={i}
            data-slot
            className='relative flex h-12 w-10 items-center justify-center sm:h-16 sm:w-14'
            style={{ color: COLORS.primary }}
          >
            <span data-icon className='absolute'>
              <Icon size={40} strokeWidth={2} />
            </span>
            <span
              data-letter
              className='absolute text-4xl font-bold leading-none tracking-tighter sm:text-6xl'
            >
              {letter}
            </span>
          </div>
        ))}
      </div>

      {/* Brand mark */}
      <div
        data-brand
        className='absolute bottom-12 flex flex-col items-center gap-2'
      >
        <span
          className='text-xs font-semibold uppercase'
          style={{ color: COLORS.primary, letterSpacing: '0.35em' }}
        >
          Assignly
        </span>
        <div
          role='progressbar'
          aria-valuemin={0}
          aria-valuemax={100}
          className='h-1.5 w-20 overflow-hidden rounded-full sm:w-28'
          style={{ backgroundColor: COLORS.accent }}
        >
          <div
            data-progress-bar
            className='h-full w-full rounded-full'
            style={{
              backgroundColor: COLORS.primary,
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
