'use client';

import Link from 'next/link';
import { Zap, Compass, Layers, Briefcase } from 'lucide-react';

const links = [
  { href: '#how-it-works', label: 'How it works', Icon: Compass },
  { href: '#categories', label: 'Categories', Icon: Layers },
  { href: '#gigs', label: 'Gigs', Icon: Briefcase },
];

export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 px-4 pt-3'>
      <nav
        className='mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border border-black/5 bg-white/80 px-4 shadow-sm backdrop-blur-md'
        aria-label='Main'
      >
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2.5'>
          <span className='flex h-9 w-9 items-center justify-center rounded-xl border border-primary bg-white text-primary'>
            <Zap size={18} fill='currentColor' strokeWidth={0} />
          </span>
          <span className='text-base font-bold text-primary'>assignly</span>
        </Link>

        {/* Center links (hidden on mobile) */}
        <ul className='hidden items-center gap-8 md:flex'>
          {links.map(({ href, label, Icon }) => (
            <li key={label}>
              <Link
                href={href}
                className='flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground'
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth */}
        <div className='flex items-center gap-4'>
          <Link
            href='/login'
            className='text-sm font-medium text-foreground transition-colors hover:text-primary'
          >
            Log in
          </Link>
          <Link
            href='/signup'
            className='rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
