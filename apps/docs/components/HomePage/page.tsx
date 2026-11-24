'use client';

import { CSSProperties, Fragment, useEffect, useRef } from 'react';
import Image, { type StaticImageData } from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  Plus,
  ShieldCheck,
  IndianRupee,
  UserRoundCheck,
  FilePlus2,
  CircleCheck,
  ChevronRight,
  Star,
  GraduationCap,
  type LucideIcon,
  Dot,
  Laptop,
  Trophy,
  Send,
  Code,
  Coffee,
  AppWindow,
  Terminal,
  Database,
  Palette,
  PenTool,
  ArrowRight,
  CreditCard,
  Code2,
  MapPin,
  CalendarDays,
  Users,
} from 'lucide-react';

import aBadge from '@/public/aBadge.png';
import bgBanner from '@/public/bgBanner.png';
import dummy from '@/public/dummy.png';
import earningCard from '@/public/earningsCard.png';
import gigCard from '@/public/gigCard.png';
import lightningBadge from '@/public/lightningBadge.png';
import { useGigs } from '@/hooks/assignment/useAssignment';
import { GigCategory } from '@/types/dashboard.types';
import GigCard, { GigCardSkeleton } from '../GigCard/GigCard';

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClass: string;
  bgClass: string;
};

type Step = {
  title: string;
  lines: string[];
  icon: LucideIcon;
  iconClass: string;
  bgClass: string;
};

const features: Feature[] = [
  {
    title: 'Clear expectations',
    description:
      'Every gig lists the task, deadline, and pay up front, so both sides know exactly what to expect.',
    icon: ShieldCheck,
    iconClass: 'text-[#F45124]',
    bgClass: 'bg-[#fff0ea]',
  },
  {
    title: 'Fair, visible pay',
    description:
      'The reward is shown before anyone accepts, so there are no surprises once the work is done.',
    icon: IndianRupee,
    iconClass: 'text-[#d99a19]',
    bgClass: 'bg-[#fff6e5]',
  },
  {
    title: 'One accepted helper',
    description:
      'Each gig goes to a single student, which keeps responsibility and communication simple.',
    icon: UserRoundCheck,
    iconClass: 'text-[#4d9d88]',
    bgClass: 'bg-[#eaf7f3]',
  },
];

const steps: Step[] = [
  {
    title: 'Post or browse',
    lines: ['Start with a clear task,', 'pay, and deadline.'],
    icon: FilePlus2,
    iconClass: 'text-[#F45124]',
    bgClass: 'bg-[#fff0ea]',
  },
  {
    title: 'Match with confidence',
    lines: ['Review the details and', 'connect with the right', 'student.'],
    icon: UserRoundCheck,
    iconClass: 'text-[#d99a19]',
    bgClass: 'bg-[#fff6e5]',
  },
  {
    title: 'Finish smoothly',
    lines: ['Track the handoff and', 'confirm the work is', 'complete.'],
    icon: CircleCheck,
    iconClass: 'text-[#4d9d88]',
    bgClass: 'bg-[#eaf7f3]',
  },
];

const avatarColors: string[] = [
  'bg-orange-300',
  'bg-blue-300',
  'bg-purple-300',
  'bg-pink-300',
];

type Tap = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClass: string;
  bgClass: string;
  cardClass: string;
};

const taps: Tap[] = [
  {
    title: 'Post',
    description: 'Describe your task',
    icon: Plus,
    iconClass: 'text-[#F45124]',
    bgClass: 'bg-white',
    cardClass: 'bg-[#fff4ee] border-[#ffd9c8]',
  },
  {
    title: 'Apply',
    description: 'Peers send offers',
    icon: Send,
    iconClass: 'text-[#3b82f6]',
    bgClass: 'bg-white',
    cardClass: 'bg-[#eef5ff] border-[#cfe0ff]',
  },
  {
    title: 'Work',
    description: 'Accept and submit',
    icon: Laptop,
    iconClass: 'text-[#a855f7]',
    bgClass: 'bg-white',
    cardClass: 'bg-[#f7f1ff] border-[#e3d1ff]',
  },
  {
    title: 'Earn',
    description: 'Get rewarded',
    icon: Trophy,
    iconClass: 'text-[#16a34a]',
    bgClass: 'bg-white',
    cardClass: 'bg-[#eefaf2] border-[#c9ecd6]',
  },
];

/*
 * Hero illustration stage (right side).
 * The stage is a 977 x 793 canvas. The dummy image fills it, and the
 * four floating pieces are positioned on it with x / y / w canvas pixels.
 */

const STAGE_W = 977;
const STAGE_H = 793;

type StagePiece = {
  id: string;
  image: StaticImageData;
  alt: string;
  x: number;
  y: number;
  w: number;
};

const floatingPieces: StagePiece[] = [
  {
    id: 'a-badge',
    image: aBadge,
    alt: 'Achievement badge',
    x: 98,
    y: 122,
    w: 110,
  },
  {
    id: 'earnings',
    image: earningCard,
    alt: 'Earned this week: $126.00',
    x: 668,
    y: 74,
    w: 278,
  },
  {
    id: 'gig',
    image: gigCard,
    alt: 'Gig completed: poster design',
    x: 6,
    y: 600,
    w: 290,
  },
  {
    id: 'lightning',
    image: lightningBadge,
    alt: 'Quick task badge',
    x: 818,
    y: 600,
    w: 120,
  },
];

const badgeTexts: string[] = [
  'Students helping students',
  'Post a task in minutes',
  'Pick a peer you trust',
  'Get it done, get paid',
];

const placeStyle = ({ x, y, w }: StagePiece) => ({
  left: `${(x / STAGE_W) * 100}%`,
  top: `${(y / STAGE_H) * 100}%`,
  width: `${(w / STAGE_W) * 100}%`,
});

type Skill = {
  label: string;
  icon: LucideIcon;
  iconClass: string;
  bgClass: string;
};

const skills: Skill[] = [
  {
    label: 'DSA',
    icon: Code,
    iconClass: 'text-[#F45124]',
    bgClass: 'bg-[#fff0ea]',
  },
  {
    label: 'Web Dev',
    icon: AppWindow,
    iconClass: 'text-[#3b82f6]',
    bgClass: 'bg-[#eaf2ff]',
  },
  {
    label: 'Coding',
    icon: Terminal,
    iconClass: 'text-[#16a34a]',
    bgClass: 'bg-[#eaf8ef]',
  },
  {
    label: 'Database',
    icon: Database,
    iconClass: 'text-[#a855f7]',
    bgClass: 'bg-[#f6efff]',
  },
  {
    label: 'Design',
    icon: Palette,
    iconClass: 'text-[#ec4899]',
    bgClass: 'bg-[#ffeaf4]',
  },
  {
    label: 'Writing',
    icon: PenTool,
    iconClass: 'text-[#F45124]',
    bgClass: 'bg-[#fff0ea]',
  },
  {
    label: 'Others',
    icon: Coffee,
    iconClass: 'text-[#d97706]',
    bgClass: 'bg-[#fff6e0]',
  },
];

const categoryConfig: Record<
  GigCategory,
  { icon: LucideIcon; iconColor: string; iconBg: string }
> = {
  [GigCategory.DSA]: {
    icon: Code2,
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50',
  },
  [GigCategory.WEB_DEV]: {
    icon: Laptop,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
  },
  [GigCategory.CODING]: {
    icon: Terminal,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50',
  },
  [GigCategory.DATABASE]: {
    icon: Database,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-50',
  },
  [GigCategory.DESIGN]: {
    icon: Palette,
    iconColor: 'text-pink-500',
    iconBg: 'bg-pink-50',
  },
  [GigCategory.WRITING]: {
    icon: PenTool,
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50',
  },
  [GigCategory.OTHERS]: {
    icon: AppWindow,
    iconColor: 'text-gray-500',
    iconBg: 'bg-gray-50',
  },
};

const formatGigDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return 'Date unavailable';

  return parsedDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
};

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

export function HomePage() {
  const mainRef = useRef<HTMLElement>(null);
  const filters = {
    search: '',
    subject: '',
    radius: 0,
    college: '',
    address: '',
    coordinates: null,
    startDate: null,
    endDate: null,
  };

  const {
    data: gigs = [],
    isLoading: gigsLoading,
    isError: gigsError,
  } = useGigs(filters);

  console.log(gigs);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = mainRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Skills section: heading fades up, cards pop in from the center outward.
      const skillsSection = root.querySelector<HTMLElement>('.skills-section');
      const skillCards = gsap.utils.toArray<HTMLElement>('.skill-card', root);
      const skillsHead = gsap.utils.toArray<HTMLElement>('.skills-head', root);
      const skillsCircle = root.querySelector<HTMLElement>('.skills-circle');

      if (skillsSection && skillCards.length > 0 && !reduceMotion) {
        gsap.set(skillsHead, { y: 24, autoAlpha: 0 });
        gsap.set(skillCards, { y: 50, scale: 0.8, autoAlpha: 0 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: skillsSection,
              start: 'top 75%',
              once: true,
            },
          })
          .to(skillsHead, {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
          })
          .to(
            skillCards,
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'back.out(1.7)',
              stagger: { each: 0.07, from: 'center' },
            },
            '-=0.3'
          );

        // Decorative circle drifts slowly while the section scrolls past.
        if (skillsCircle) {
          gsap.to(skillsCircle, {
            y: 70,
            ease: 'none',
            scrollTrigger: {
              trigger: skillsSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }

      const howSection = root.querySelector<HTMLElement>('.how-section');
      const howRow = root.querySelector<HTMLElement>('.how-row');
      const howBar = root.querySelector<HTMLElement>('.how-bar');
      const howCount = root.querySelector<HTMLElement>('.how-count');
      const howCards = gsap.utils.toArray<HTMLElement>('.how-card', root);
      const howLinks = gsap.utils.toArray<HTMLElement>('.how-link', root);

      if (howSection && howRow && howCards.length > 0 && !reduceMotion) {
        const STAGGER = 0.5; // next card starts when the previous is halfway
        const DUR = 1;
        const total = (howCards.length - 1) * STAGGER + DUR;
        const landings = howCards.map((_, i) => (i * STAGGER + DUR) / total);

        if (howBar) gsap.set(howBar, { scaleX: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: howSection,
            start: 'top top',
            end: () => `+=${window.innerHeight * 2.5}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: [0, ...landings],
              duration: { min: 0.2, max: 0.5 },
              ease: 'power2.inOut',
            },
            onUpdate: (self) => {
              if (howBar) gsap.set(howBar, { scaleX: self.progress });
              if (howCount) {
                const landed = landings.filter(
                  (l) => self.progress >= l - 0.01
                ).length;
                howCount.textContent = `Step ${Math.max(1, landed)} of ${howCards.length}`;
              }
            },
          },
        });

        howCards.forEach((card, i) => {
          tl.fromTo(
            card,
            {
              x: () =>
                window.innerWidth -
                (howRow.getBoundingClientRect().left + card.offsetLeft),
              autoAlpha: 0,
              rotate: 6,
            },
            {
              x: 0,
              autoAlpha: 1,
              rotate: 0,
              duration: DUR,
              ease: 'power2.out',
            },
            i * STAGGER
          );
        });

        howLinks.forEach((link, i) => {
          tl.fromTo(
            link,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.25, ease: 'none' },
            (i + 1) * STAGGER + 0.75
          );
        });
      }

      // Feature cards slide in from alternating sides as they enter view.
      gsap.utils
        .toArray<HTMLElement>('.feature-card', root)
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              x: index % 2 === 0 ? -80 : 80,
              autoAlpha: 0,
            },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true,
              },
            }
          );
        });

      // Animate each floating illustration independently.
      gsap.utils
        .toArray<HTMLElement>('.float-item', root)
        .forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: 0, force3D: true },
            {
              y: index % 2 === 0 ? -16 : 16,
              duration: 2.2 + index * 0.45,
              delay: index * 0.2,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            }
          );
        });

      // Rotating badge text: new line drops in from above, old one exits downward.
      const badgeItems = gsap.utils.toArray<HTMLElement>('.badge-text', root);

      if (badgeItems.length > 1) {
        const hold = 1.8;
        const dur = 0.8;
        const wrap = gsap.utils.wrap(badgeItems);

        gsap.set(badgeItems, {
          yPercent: -110,
          autoAlpha: 0,
          filter: 'blur(3px)',
        });
        gsap.set(wrap(0), { yPercent: 0, autoAlpha: 1, filter: 'blur(0px)' });

        const tl = gsap.timeline({ repeat: -1 });

        badgeItems.forEach((item, i) => {
          const next = wrap(i + 1);

          tl.to(
            item,
            {
              yPercent: 110,
              autoAlpha: 0,
              filter: 'blur(3px)',
              duration: dur,
              ease: 'power3.inOut',
            },
            `+=${hold}`
          ).fromTo(
            next,
            { yPercent: -110, autoAlpha: 0, filter: 'blur(3px)' },
            {
              yPercent: 0,
              autoAlpha: 1,
              filter: 'blur(0px)',
              duration: dur,
              ease: 'power3.inOut',
              immediateRender: false,
            },
            '<'
          );
        });
      }
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className='min-h-screen overflow-hidden bg-[#fffdf9] font-[family-name:var(--font-rethink-sans)]'
    >
      {/* ============================ HERO ============================ */}
      <section className='relative isolate min-h-[650px] overflow-hidden bg-background'>
        {/* Background banner */}
        <Image
          src={bgBanner}
          alt=''
          aria-hidden='true'
          fill
          priority
          sizes='100vw'
          className='pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center'
        />

        {/* Text on the left, illustration on the right */}
        <div className='relative z-10 mx-auto grid max-w-[1300px] items-center gap-12 px-6 pb-28 pt-16 lg:min-h-[680px] lg:grid-cols-2 lg:gap-6 lg:px-16'>
          {/* LEFT: text */}
          <div className='max-w-[640px]'>
            <span className='inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-3 pr-4 text-xs font-semibold text-foreground shadow-sm'>
              {/* Light blue dot with a soft pulse */}
              <span className='relative flex h-2.5 w-2.5'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-70' />
                <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-sky-200 to-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.6)]' />
              </span>

              {/* All phrases stacked in one grid cell, so the pill width never jumps */}
              <span className='grid h-5 overflow-hidden leading-5'>
                {badgeTexts.map((text, i) => (
                  <span
                    key={text}
                    className='badge-text col-start-1 row-start-1 whitespace-nowrap'
                    style={i === 0 ? undefined : { opacity: 0 }}
                  >
                    {text}
                  </span>
                ))}
              </span>
            </span>

            <h1 className='mt-6 text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]'>
              Turn your skills into <br className='hidden sm:block' />
              <span className='relative inline-block text-primary'>
                cash
                <svg
                  viewBox='0 0 120 12'
                  preserveAspectRatio='none'
                  aria-hidden='true'
                  className='absolute -bottom-2 left-0 h-3 w-full'
                >
                  <path
                    d='M2 8 C 30 2, 70 2, 118 7'
                    stroke='#F9C7B3'
                    strokeWidth='4'
                    fill='none'
                    strokeLinecap='round'
                  />
                </svg>
              </span>{' '}
              on campus.
            </h1>

            <p className='mt-6 text-base text-foreground/60 sm:text-lg'>
              Post a task. Pick a peer. Get it done.
            </p>

            <div className='mt-8 flex flex-wrap gap-4'>
              <button
                type='button'
                className='flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5'
              >
                <Search size={16} />
                Explore gigs
              </button>

              <button
                type='button'
                className='flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground shadow-md transition-all hover:-translate-y-0.5'
              >
                <Plus size={16} />
                Post a gig
              </button>
            </div>

            <div className='mt-8 flex items-center gap-3'>
              <div className='flex -space-x-2.5'>
                {avatarColors.map((color, index) => (
                  <div
                    key={index}
                    className={`h-9 w-9 rounded-full border-2 border-white ${color}`}
                  />
                ))}
              </div>

              <div>
                <div className='flex gap-0.5 text-amber-400'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={12}
                      fill='currentColor'
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p className='text-sm font-semibold text-foreground'>
                  2,400+{' '}
                  <span className='font-medium text-foreground/50'>
                    students earning
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: dummy person + 4 floating items */}
          <div className='relative mx-auto aspect-[977/793] w-full max-w-[620px] lg:ml-auto'>
            <Image
              src={dummy}
              alt='Student earning on a laptop'
              priority
              sizes='(min-width: 1024px) 620px, 100vw'
              className='absolute inset-0 z-10 h-full w-full object-contain'
            />

            {floatingPieces.map((piece) => (
              <div
                key={piece.id}
                className='float-item absolute z-20 will-change-transform'
                style={placeStyle(piece)}
              >
                <Image
                  src={piece.image}
                  alt={piece.alt}
                  sizes='(min-width: 1024px) 300px, 50vw'
                  className='h-auto w-full object-contain'
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================= */}
      <section
        id='how-it-works'
        className='how-section relative flex h-screen items-center overflow-hidden border-y border-black/[0.05] bg-white'
      >
        <div className='mx-auto w-full max-w-6xl px-6 lg:px-10'>
          {/* Fixed heading */}
          <div className='text-center'>
            <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-primary'>
              How it works
            </p>
            <h2 className='mt-3 text-3xl font-extrabold tracking-tight text-[#152330] sm:text-4xl'>
              Four taps to done
            </h2>
          </div>

          {/* Cards: all four sit in a row; each one flies in from the right */}
          <div className='how-row relative mt-12 grid grid-cols-2 gap-6 md:grid-cols-4'>
            {taps.map((tap, index) => {
              const Icon = tap.icon;

              return (
                <div
                  key={tap.title}
                  className='how-card relative will-change-transform'
                >
                  <div
                    className={`group rounded-3xl border px-6 py-9 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${tap.cardClass}`}
                  >
                    <div className='relative mx-auto h-16 w-16'>
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${tap.bgClass}`}
                      >
                        <Icon
                          size={26}
                          strokeWidth={2}
                          className={tap.iconClass}
                        />
                      </div>
                      <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white shadow'>
                        {index + 1}
                      </span>
                    </div>
                    <h3 className='mt-6 text-lg font-bold text-[#152330]'>
                      {tap.title}
                    </h3>
                    <p className='mt-1.5 text-sm text-[#68727d]'>
                      {tap.description}
                    </p>
                  </div>

                  {/* Dashed connector to the next card (desktop only) */}
                  {index < taps.length - 1 && (
                    <div
                      aria-hidden='true'
                      className='how-link absolute left-full top-1/2 hidden h-0 w-6 origin-left border-t-2 border-dashed border-primary/40 md:block'
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress */}
          <div className='mt-12 flex flex-col items-center gap-3'>
            <div className='h-1 w-48 overflow-hidden rounded-full bg-black/10'>
              <div className='how-bar h-full origin-left rounded-full bg-primary' />
            </div>
            <p className='how-count text-xs font-medium text-[#68727d]'>
              Step 1 of {taps.length}
            </p>
          </div>
        </div>
      </section>

      {/* ============================ SKILLS ============================ */}
      <section className='skills-section relative overflow-hidden bg-[#fff1e8] px-6 py-16'>
        {/* Decorative circle */}
        <div
          aria-hidden='true'
          className='skills-circle pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#ffdccb]'
        />

        <div className='relative z-10 mx-auto max-w-6xl'>
          <div className='flex items-end justify-between gap-4'>
            <div className='skills-head'>
              <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-primary'>
                Categories
              </p>
              <h2 className='mt-2 text-3xl font-extrabold tracking-tight text-[#152330]'>
                Pick your skill
              </h2>
            </div>

            <a
              href='#'
              className='skills-head group flex items-center gap-1.5 text-sm font-semibold text-primary'
            >
              All gigs
              <ArrowRight
                size={16}
                className='transition-transform duration-300 group-hover:translate-x-1'
              />
            </a>
          </div>

          <div className='mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7'>
            {skills.map((skill) => {
              const Icon = skill.icon;

              return (
                // Outer div is animated by GSAP; inner button handles hover.
                <div key={skill.label} className='skill-card'>
                  <button
                    type='button'
                    className='group flex w-full flex-col items-center gap-3 rounded-2xl bg-white px-4 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg'
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${skill.bgClass}`}
                    >
                      <Icon
                        size={20}
                        strokeWidth={2}
                        className={skill.iconClass}
                      />
                    </span>
                    <span className='text-xs font-semibold text-[#152330]'>
                      {skill.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ FRESH GIGS ============================ */}
      <section className='w-full border-t border-orange-100 bg-white px-5 py-14'>
        <div className='mx-auto max-w-6xl'>
          {/* Heading */}
          <div className='mb-7 text-center'>
            <p className='mb-2 text-[10px] font-semibold tracking-wide text-[#F45124]'>
              LIVE NOW
            </p>

            <h2 className='text-2xl font-bold tracking-tight text-[#152330]'>
              Fresh gigs near you
            </h2>
          </div>

          {/* Gigs */}
          {gigsLoading ? (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 3 }).map((_, index) => (
                <GigCardSkeleton key={index} />
              ))}
            </div>
          ) : gigsError ? (
            <div className='py-12 text-center'>
              <p className='text-sm font-medium text-red-500'>
                Unable to load gigs. Please try again later.
              </p>
            </div>
          ) : gigs.length === 0 ? (
            <div className='py-12 text-center'>
              <p className='text-sm font-medium text-gray-600'>
                No gigs available right now.
              </p>
              <p className='mt-1 text-xs text-gray-400'>
                Check back later for new opportunities.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {gigs.slice(0, 3).map((gig, index) => (
                <GigCard key={gig.id} gig={gig} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
