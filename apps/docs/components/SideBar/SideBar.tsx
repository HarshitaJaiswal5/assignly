'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Compass,
  CirclePlus,
  Users,
  Send,
  Laptop,
  Bell,
  User,
  Rocket,
  Zap,
  type LucideIcon,
} from 'lucide-react';

type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: number;
};

const navigation: NavItem[] = [
  { label: 'Dashboard', icon: Home, href: '/Dashboard' },
  { label: 'Explore gigs', icon: Compass, href: '/Explore' },
  { label: 'Post a gig', icon: CirclePlus, href: '/Upload' },
  { label: 'Applicants', icon: Users, href: '/Applicants' },
  { label: 'My applications', icon: Send, href: '/Applications' },
  { label: 'Active work', icon: Laptop, href: '/ActiveWork' },
  { label: 'Notifications', icon: Bell, href: '/Notifications', badge: 3 },
  { label: 'Profile', icon: User, href: '/Profile' },
];

type SidebarProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ expanded, setExpanded }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col overflow-hidden bg-white shadow-sm transition-all duration-300 ease-in-out ${
        expanded ? 'w-[250px]' : 'w-[72px]'
      }`}
    >
      {/* Logo */}
      <Link
        href='/Dashboard'
        className='flex h-16 w-full shrink-0 items-center gap-3 overflow-hidden px-[18px]'
      >
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/30'>
          <Zap size={18} fill='currentColor' strokeWidth={0} />
        </span>

        <span
          className={`whitespace-nowrap text-lg font-bold text-foreground transition-all duration-200 ${
            expanded
              ? 'translate-x-0 opacity-100'
              : 'pointer-events-none -translate-x-2 opacity-0'
          }`}
        >
          Assignly
        </span>
      </Link>

      {/* Navigation */}
      <nav className='mt-4 flex-1 overflow-y-auto overflow-x-hidden px-3'>
        {navigation.map(({ label, icon: Icon, href, badge }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={label}
              href={href}
              title={!expanded ? label : undefined}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`mb-1 flex h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-background text-primary'
                  : 'text-foreground/60 hover:bg-background hover:text-primary'
              }`}
            >
              <span className='relative flex shrink-0 items-center justify-center'>
                <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />

                {badge && !expanded && (
                  <span className='absolute -right-1 -top-1 h-2 w-2 rounded-full border border-white bg-primary' />
                )}
              </span>

              <span
                className={`min-w-0 flex-1 whitespace-nowrap transition-all duration-200 ${
                  expanded
                    ? 'translate-x-0 opacity-100 delay-100'
                    : 'pointer-events-none -translate-x-2 opacity-0'
                }`}
              >
                {label}
              </span>

              {badge && (
                <span
                  className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white transition-all duration-200 ${
                    expanded
                      ? 'translate-x-0 opacity-100 delay-100'
                      : 'pointer-events-none -translate-x-2 opacity-0'
                  }`}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className='relative h-[140px] shrink-0'>
        {/* Collapsed icon */}
        <Link
          href='/PostGig'
          aria-label='Post a gig'
          className={`absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-primary transition-all duration-200 ${
            expanded
              ? 'pointer-events-none scale-90 opacity-0'
              : 'scale-100 opacity-100'
          }`}
        >
          <Rocket size={20} />
        </Link>

        {/* Expanded card */}
        <div
          className={`pointer-events-none absolute inset-x-3 bottom-3 transition-all duration-200 ease-out ${
            expanded
              ? 'translate-y-0 opacity-100 delay-100'
              : 'translate-y-2 opacity-0'
          }`}
        >
          <div className='relative overflow-hidden rounded-2xl bg-foreground p-4'>
            <div
              aria-hidden
              className='absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/40'
            />

            <div className='relative'>
              <Rocket size={18} className='text-primary' />

              <p className='mt-3 whitespace-nowrap text-sm font-bold text-white'>
                Got a task?
              </p>

              <Link
                href='/PostGig'
                className='pointer-events-auto mt-3 block whitespace-nowrap rounded-full bg-primary py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-primary-dark'
              >
                Post a gig
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
