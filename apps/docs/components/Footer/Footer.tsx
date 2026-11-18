'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import { ArrowRight, ArrowUp, Check, Mail } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

// Change this to your product name.
const BRAND = 'assignly';

// Space the floating navbar takes up (height + top offset). Adjust if yours differs.
const NAV_CLEARANCE = 120;

// How much of the wordmark must be visible before the letters start (0 to 1).
const WORD_VISIBLE_RATIO = 0.7;

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const columns: FooterColumn[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Browse gigs', href: '#' },
      { label: 'Post a gig', href: '#' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Categories', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help center', href: '#' },
      { label: 'Safety tips', href: '#' },
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms of use', href: '#' },
    ],
  },
];

const socials: { label: string; href: string }[] = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
  { label: 'YouTube', href: '#' },
];

/* ------------------------------------------------------------------ */
/* Scroll-scrubbed reveal helper                                      */
/* ------------------------------------------------------------------ */

/**
 * --p goes 0 → 1 as the footer is uncovered.
 * `start` is the point in that range where this element begins animating,
 * which gives the stagger.
 */
const reveal = (start: number, distance = 48): CSSProperties => {
  const t = `clamp(0, calc((var(--p) - ${start}) * 2.5), 1)`;
  return {
    opacity: t,
    transform: `translateY(calc((1 - ${t}) * ${distance}px))`,
  };
};

/* ------------------------------------------------------------------ */
/* Footer                                                             */
/* ------------------------------------------------------------------ */

export function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [wordVisible, setWordVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  // Drive --p (0 → 1) from how much of the footer has been uncovered,
  // and decide when the wordmark is actually visible on screen.
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      setWordVisible(true);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const remaining =
        doc.scrollHeight - (window.scrollY + window.innerHeight);
      const p = Math.min(1, Math.max(0, 1 - remaining / el.offsetHeight));
      el.style.setProperty('--p', p.toFixed(3));

      // Only pin (curtain effect) if the whole footer fits below the navbar.
      setPinned(el.offsetHeight + NAV_CLEARANCE <= window.innerHeight);

      // Wordmark visibility: how many px of the footer are uncovered
      // (measured from the footer's bottom edge) vs. where the wordmark sits.
      const word = wordRef.current;
      if (word) {
        const uncovered = p * el.offsetHeight;
        const footerBottom = el.getBoundingClientRect().bottom;
        const wordRect = word.getBoundingClientRect();
        const wordFromBottom = footerBottom - wordRect.bottom; // wordmark's bottom edge
        const showAt = wordFromBottom + wordRect.height * WORD_VISIBLE_RATIO;
        const hideAt = wordFromBottom; // fully covered again
        setWordVisible((prev) =>
          prev ? uncovered > hideAt : uncovered >= showAt
        );
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send `email` to your newsletter endpoint.
    setDone(true);
    setEmail('');
  };

  return (
    <footer
      ref={footerRef}
      style={{ '--p': 0 } as CSSProperties}
      className={`relative z-0 flex flex-col justify-between overflow-hidden rounded-t-[2.5rem] bg-[#2a2522] px-6 pt-16 text-white sm:rounded-t-[3.5rem] lg:px-16 ${
        pinned ? 'md:sticky md:bottom-0 md:rounded-t-none' : ''
      }`}
    >
      {/* Decorative glows (scale up as the footer is revealed) */}
      <div
        aria-hidden='true'
        style={{ transform: 'scale(calc(0.6 + var(--p) * 0.4))' }}
        className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F45124]/20 blur-2xl'
      />
      <div
        aria-hidden='true'
        style={{ transform: 'scale(calc(0.6 + var(--p) * 0.4))' }}
        className='pointer-events-none absolute -left-24 bottom-1/3 h-64 w-64 rounded-full bg-[#F45124]/10 blur-2xl'
      />

      {/* ---------- Top: brand + newsletter + links ---------- */}
      <div className='relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.3fr_2fr]'>
        <div>
          <h2
            style={reveal(0)}
            className='text-3xl font-extrabold leading-tight tracking-tight will-change-transform sm:text-4xl'
          >
            Skills in. <br />
            <span className='text-[#F45124]'>Cash out.</span>
          </h2>
          <p
            style={reveal(0.08)}
            className='mt-4 max-w-sm text-sm leading-6 text-white/60 will-change-transform'
          >
            {BRAND} connects students who need a hand with students who have the
            skills. Post a task, pick a peer, get it done.
          </p>

          {/* Newsletter */}
          <form
            onSubmit={onSubmit}
            style={reveal(0.16)}
            className='mt-8 max-w-sm will-change-transform'
          >
            <label htmlFor='footer-email' className='sr-only'>
              Email address
            </label>
            <div className='flex items-center gap-2 rounded-full bg-white/10 p-1.5 pl-4 ring-1 ring-white/10 transition focus-within:ring-[#F45124]/60'>
              <Mail size={16} className='shrink-0 text-white/50' />
              <input
                id='footer-email'
                type='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (done) setDone(false);
                }}
                placeholder='Your college email'
                className='min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none'
              />
              <button
                type='submit'
                aria-label='Subscribe'
                className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F45124] text-white transition hover:scale-105'
              >
                {done ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
            <p
              aria-live='polite'
              className='mt-2 h-4 pl-4 text-xs text-white/50'
            >
              {done
                ? 'Thanks! You are on the list.'
                : 'Weekly gig drops. No spam.'}
            </p>
          </form>
        </div>

        <nav
          aria-label='Footer'
          className='grid grid-cols-2 gap-8 sm:grid-cols-3'
        >
          {columns.map((col, i) => (
            <div
              key={col.title}
              style={reveal(0.12 + i * 0.1)}
              className='will-change-transform'
            >
              <h3 className='text-xs font-semibold uppercase tracking-[0.18em] text-white/40'>
                {col.title}
              </h3>
              <ul className='mt-5 space-y-3'>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className='group relative inline-block text-sm text-white/80 transition-colors hover:text-white'
                    >
                      {link.label}
                      <span className='absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#F45124] transition-transform duration-300 group-hover:scale-x-100' />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* ---------- Bottom: wordmark + legal row ---------- */}
      <div className='relative z-10 mt-16'>
        {/* Wordmark: letters rise one by one once it is visible on screen */}
        <div ref={wordRef} className='overflow-hidden pb-[0.1em]'>
          <p
            aria-hidden='true'
            className='flex select-none justify-center text-[16vw] font-extrabold leading-[0.9] tracking-tighter text-white/[0.08] lg:text-[11rem]'
          >
            {BRAND.split('').map((char, i) => (
              <span
                key={i}
                className='inline-block will-change-transform'
                style={{
                  transform: wordVisible
                    ? 'translateY(0)'
                    : 'translateY(110%)',
                  opacity: wordVisible ? 1 : 0,
                  transition:
                    'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out',
                  transitionDelay: wordVisible ? `${i * 120}ms` : '0ms',
                }}
              >
                {char}
              </span>
            ))}
          </p>
        </div>

        <div
          style={reveal(0.45, 24)}
          className='mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 border-t border-white/10 py-6 will-change-transform sm:flex-row'
        >
          <p className='text-xs text-white/50'>
            © {new Date().getFullYear()} {BRAND}. Made by students, for
            students.
          </p>

          <ul className='flex flex-wrap items-center justify-center gap-5'>
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className='text-xs font-medium text-white/60 transition-colors hover:text-[#F45124]'
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type='button'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20'
          >
            Back to top
            <ArrowUp
              size={14}
              className='transition-transform duration-300 group-hover:-translate-y-0.5'
            />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;