'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Hand,
  Flame,
  Compass,
  Code2,
  Coins,
  Medal,
  Trophy,
  Send,
  Briefcase,
  Laptop,
  CalendarDays,
  MapPin,
  ArrowRight,
  WandSparkles,
  Clock,
  AppWindow,
  Code,
  Database,
  FileText,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { categoryIcons } from '@/utils/categoryIcon.map';
import { useDashboardOverview } from '@/hooks/dashboard/useDashboardOverview';
import { useGigs } from '@/hooks/assignment/useAssignment';
import GigCard, { GigCardSkeleton } from '@/components/GigCard/GigCard';
import PageLoader from '@/components/PageLoader/PageLoader';

export default function Dashboard() {
  const { data: session } = useSession();
  const {
    data: overview,
    isLoading,
    isError,
    error,
    refetch,
  } = useDashboardOverview();

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

  const firstName = session?.user?.name?.split(' ')[0] ?? 'there';

  if (isLoading) {
    return <PageLoader/>;
  }

  if (isError || !overview) {
    return (
      <div className='p-8 text-center'>
        <p>{error?.message || 'Failed to load dashboard'}</p>
        <button onClick={() => refetch()} className='mt-3 text-primary'>
          Try again
        </button>
      </div>
    );
  }

  const deadlines = overview.weekly.upcomingSubmissions;

  // Top stat cards (was missing -> `stats is not defined`)
  const stats = [
    {
      label: 'Applications',
      value: overview.stats.applications,
      icon: Send,
      iconClass: 'text-blue-500',
      bgClass: 'bg-blue-50',
      quote: 'Your first application is just one click away. Go for it!',
    },
    {
      label: 'Posted gigs',
      value: overview.stats.postedGigs,
      icon: Briefcase,
      iconClass: 'text-primary',
      bgClass: 'bg-primary/10',
      quote: 'Need a hand? Post your first gig and get help today.',
    },
    {
      label: 'Active work',
      value: overview.stats.activeWork,
      icon: Laptop,
      iconClass: 'text-purple-500',
      bgClass: 'bg-purple-50',
      quote: 'Ready when you are. Pick up a gig and start earning!',
    },
    {
      label: 'Completed',
      value: overview.stats.completed,
      icon: Trophy,
      iconClass: 'text-green-600',
      bgClass: 'bg-green-50',
      quote: 'Every expert started at zero. Finish your first gig!',
    },
  ];

  // "This week" rows
  const weeklyRows = [
    {
      icon: Clock,
      wrapper: 'bg-primary/10',
      iconColor: 'text-primary',
      value: overview.weekly.upcomingSubmissions,
      label: 'Upcoming submissions',
    },
    {
      icon: FileText,
      wrapper: 'bg-blue-50',
      iconColor: 'text-blue-600',
      value: overview.weekly.assignmentsTargeted,
      label: 'Assignments targeted',
    },
    {
      icon: Trophy,
      wrapper: 'bg-amber-50',
      iconColor: 'text-amber-500',
      value: `₹${overview.weekly.earnings.toLocaleString('en-IN')}`,
      label: 'Earnings',
    },
    {
      icon: CheckCircle2,
      wrapper: 'bg-green-50',
      iconColor: 'text-green-600',
      value: overview.weekly.completedWork,
      label: 'Completed this week',
    },
  ];

  return (
    <div className='min-h-full px-4 py-6 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-5xl'>
        {/* ============ Banner ============ */}
        <div className='relative overflow-hidden rounded-[28px] bg-gradient-to-br from-primary to-primary-dark px-8 py-9 text-white shadow-lg shadow-primary/20 sm:min-h-[250px]'>
          {/* Decorative circles + dots */}
          <div
            aria-hidden
            className='absolute -right-16 -top-24 h-[340px] w-[340px] rounded-full bg-white/10'
          />
          <div
            aria-hidden
            className='absolute -bottom-16 right-[24%] hidden h-56 w-56 rounded-full bg-white/10 md:block'
          />
          <div
            aria-hidden
            className='absolute left-[50%] top-3 hidden h-24 w-36 bg-[radial-gradient(circle,rgba(255,255,255,0.55)_1.2px,transparent_1.6px)] bg-[size:14px_14px] md:block'
          />

          {/* LEFT: text */}
          <div className='relative z-10'>
            <p className='flex items-center gap-2 text-sm font-semibold text-white/90'>
              <Hand size={16} />
              Welcome back
            </p>

            <h1 className='mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl'>
              Hey {firstName}!
            </h1>

            {deadlines > 0 && (
              <span className='mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold'>
                <Flame
                  size={14}
                  className='text-amber-300'
                  fill='currentColor'
                />
                {deadlines} upcoming submission{deadlines > 1 ? 's' : ''} this
                week
              </span>
            )}

            <div className='mt-5'>
              <Link
                href='/Explore'
                className='inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg'
              >
                <Compass size={16} />
                Find a gig
              </Link>
            </div>
          </div>

          {/* RIGHT: illustration (desktop only) */}
          <div aria-hidden className='pointer-events-none hidden md:block'>
            {/* DSA Help card */}
            <div className='animate-float absolute left-[50%] top-9 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl motion-reduce:animate-none'>
              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-accent/60 text-primary'>
                <Code2 size={18} />
              </span>
              <div>
                <p className='text-sm font-bold leading-tight text-foreground'>
                  DSA Help
                </p>
                <p className='text-xs text-foreground/50'>Due in 2d</p>
              </div>
            </div>

            {/* Earnings pill */}
            <div className='animate-float absolute right-[6%] top-[70px] flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-xl [animation-delay:-1.5s] motion-reduce:animate-none'>
              <Coins size={16} className='text-amber-500' />
              <span className='text-sm font-bold text-foreground'>₹1,850</span>
            </div>

            {/* Medal + trophy tiles */}
            <span className='absolute bottom-11 left-[53%] flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-amber-300'>
              <Medal size={18} />
            </span>
            <span className='absolute bottom-12 right-[3%] flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-amber-300'>
              <Trophy size={20} />
            </span>

            {/* Character */}
            <div className='absolute bottom-0 right-[15%] h-[170px] w-[110px]'>
              {/* Raised arm */}
              <span className='absolute -right-5 top-[62px] h-4 w-12 rotate-[-40deg] rounded-full bg-[#F2B48F]' />
              {/* Head + hair + face */}
              <span className='absolute left-1/2 top-0 h-[66px] w-[66px] -translate-x-1/2 overflow-hidden rounded-full bg-[#F2B48F]'>
                <span className='absolute -top-1 left-0 h-[30px] w-full rounded-b-[40%] bg-[#1c1c1c]' />
                <span className='absolute bottom-3 left-[18px] h-1.5 w-1.5 rounded-full bg-[#1c1c1c]' />
                <span className='absolute bottom-3 right-[18px] h-1.5 w-1.5 rounded-full bg-[#1c1c1c]' />
                <span className='absolute bottom-1.5 left-1/2 h-2 w-4 -translate-x-1/2 rounded-b-full border-b-2 border-[#1c1c1c]' />
              </span>
              {/* Body */}
              <span className='absolute bottom-0 left-1/2 h-[110px] w-[100px] -translate-x-1/2 rounded-t-[50px] rounded-b-[28px] bg-white'>
                <span className='absolute left-3 top-[30px] h-3 w-12 rounded-full bg-accent' />
              </span>
            </div>
          </div>
        </div>

        {/* ============ Stat cards ============ */}
        <div className='mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4'>
          {stats.map(
            ({ label, value, icon: Icon, iconClass, bgClass, quote }) => {
              // Normal card
              if (value !== 0) {
                return (
                  <div
                    key={label}
                    className='rounded-2xl bg-white p-5 shadow-sm ring-1 ring-accent/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10'
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${bgClass}`}
                    >
                      <Icon size={20} className={iconClass} />
                    </span>
                    <p className='mt-4 text-3xl font-extrabold leading-none text-foreground'>
                      {value}
                    </p>
                    <p className='mt-1.5 text-sm font-medium text-foreground/60'>
                      {label}
                    </p>
                  </div>
                );
              }

              // Zero card: flips on hover (or focus/tap on touch devices)
              return (
                <div
                  key={label}
                  tabIndex={0}
                  className='group min-h-[168px] cursor-pointer outline-none [perspective:1000px]'
                >
                  <div className='relative h-full min-h-[168px] w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)] motion-reduce:transition-none'>
                    {/* Front */}
                    <div className='absolute inset-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-accent/60 [backface-visibility:hidden]'>
                      <span
                        className={`flex h-11 w-11 animate-pulse items-center justify-center rounded-xl motion-reduce:animate-none ${bgClass}`}
                      >
                        <Icon size={20} className={iconClass} />
                      </span>
                      <p className='mt-4 text-3xl font-extrabold leading-none text-foreground'>
                        {value}
                      </p>
                      <p className='mt-1.5 text-sm font-medium text-foreground/60'>
                        {label}
                      </p>
                    </div>

                    {/* Back */}
                    <div className='absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-5 text-center text-white shadow-lg shadow-primary/20 [backface-visibility:hidden] [transform:rotateY(180deg)]'>
                      <Icon size={22} className='text-white/90' />
                      <p className='text-sm font-bold leading-snug'>{quote}</p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* ============ In progress + This week ============ */}
        <div className='mt-6 grid gap-5 lg:grid-cols-[1.7fr_1fr]'>
          {/* In progress */}
          <div className='rounded-3xl bg-white p-6 shadow-sm ring-1 ring-accent/60'>
            <div className='flex items-center justify-between'>
              <h2 className='flex items-center gap-2.5 text-base font-bold text-foreground'>
                <Laptop size={18} className='text-primary' />
                In progress
              </h2>
              <Link
                href='/ActiveWork'
                className='group flex items-center gap-1 text-sm font-semibold text-primary'
              >
                View all
                <ArrowRight
                  size={14}
                  className='transition-transform duration-200 group-hover:translate-x-1'
                />
              </Link>
            </div>

            <div className='mt-5 space-y-4'>
              {overview.inProgress.length === 0 && (
                <div className='relative overflow-hidden rounded-2xl bg-background px-6 py-12 text-center'>
                  {/* Decorative background icons */}
                  <div aria-hidden className='pointer-events-none'>
                    <Code
                      size={34}
                      className='animate-float absolute left-[8%] top-[14%] -rotate-12 text-primary/15 motion-reduce:animate-none'
                    />
                    <Database
                      size={30}
                      className='animate-float absolute right-[10%] top-[12%] rotate-12 text-purple-500/15 [animation-delay:-1s] motion-reduce:animate-none'
                    />
                    <AppWindow
                      size={32}
                      className='animate-float absolute bottom-[14%] left-[16%] rotate-6 text-blue-500/15 [animation-delay:-2s] motion-reduce:animate-none'
                    />
                    <Coins
                      size={30}
                      className='animate-float absolute bottom-[16%] right-[16%] -rotate-6 text-amber-500/20 [animation-delay:-1.5s] motion-reduce:animate-none'
                    />
                    <Medal
                      size={26}
                      className='absolute left-[40%] top-[8%] text-amber-500/15'
                    />
                    <Trophy
                      size={28}
                      className='absolute bottom-[8%] left-[56%] rotate-12 text-green-600/15'
                    />
                    <Laptop
                      size={30}
                      className='absolute right-[34%] top-[10%] -rotate-6 text-primary/10'
                    />
                  </div>

                  {/* Foreground content */}
                  <div className='relative z-10 flex flex-col items-center'>
                    <span className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm'>
                      <Laptop size={22} className='text-primary' />
                    </span>
                    <p className='mt-4 text-sm font-bold text-foreground'>
                      No work in progress
                    </p>
                    <p className='mt-1 text-xs text-foreground/60'>
                      Pick up a gig and it will show up here.
                    </p>
                    <Link
                      href='/Explore'
                      className='mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md'
                    >
                      <Compass size={14} />
                      Find a gig
                    </Link>
                  </div>
                </div>
              )}

              {overview.inProgress.map((work) => {
                const Icon =
                  categoryIcons[work.category as keyof typeof categoryIcons] ??
                  Briefcase;

                return (
                  <div
                    key={work.applicationId}
                    className='flex items-center gap-4 rounded-2xl bg-background px-4 py-4'
                  >
                    <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm'>
                      <Icon size={20} className='text-primary' />
                    </span>

                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-sm font-semibold text-foreground'>
                        {work.title}
                      </p>

                      <div
                        role='progressbar'
                        aria-valuenow={work.timeElapsed}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className='mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white'
                      >
                        <div
                          className='h-full rounded-full bg-primary transition-all duration-700'
                          style={{ width: `${work.timeElapsed}%` }}
                        />
                      </div>

                      <p className='mt-1 text-xs text-foreground/50'>
                        {work.daysElapsed} days elapsed
                      </p>
                    </div>

                    <span className='text-sm font-bold text-primary'>
                      {work.timeElapsed}%
                    </span>

                    <span className='flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-foreground shadow-sm'>
                      <Clock size={12} className='text-primary' />
                      {work.daysLeft === 0
                        ? 'Due today'
                        : `${work.daysLeft}d left`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* This week */}
          <div className='rounded-3xl bg-white p-6 shadow-sm ring-1 ring-accent/60'>
            <h2 className='flex items-center gap-2.5 text-base font-bold text-foreground'>
              <Zap size={18} className='text-primary' fill='currentColor' />
              This week
            </h2>

            <ul className='mt-5 space-y-4'>
              {weeklyRows.map(
                ({ icon: Icon, wrapper, iconColor, value, label }) => (
                  <li key={label} className='flex items-center gap-4'>
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-full ${wrapper}`}
                    >
                      <Icon size={18} className={iconColor} />
                    </span>
                    <span className='text-sm font-medium text-foreground'>
                      <span className='font-extrabold'>{value}</span>{' '}
                      <span className='text-foreground/60'>{label}</span>
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <section className='w-full px-5 py-10'>
          <div className='mx-auto max-w-6xl'>
            {/* Heading */}
            <div className='mb-5 flex items-center justify-between'>
              <h2 className='flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#152330]'>
                <WandSparkles size={21} className='text-[#F45124]' />
                For you
              </h2>

              <Link
                href='/Explore'
                className='group flex items-center gap-1.5 text-sm font-semibold text-[#F45124]'
              >
                Explore
                <ArrowRight
                  size={16}
                  className='transition-transform group-hover:translate-x-1'
                />
              </Link>
            </div>

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
      </div>
    </div>
  );
}
