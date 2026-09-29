'use client';

import React from 'react';
import {
  Home,
  ClipboardList,
  User,
  FileText,
  CircleHelp,
  Repeat2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/Dashboard',
  },
  {
    label: 'My Gigs',
    icon: ClipboardList,
    href: '/MyGigs',
  },
  {
    label: 'Applications',
    icon: FileText,
    href: '/Applications',
  },
  {
    label: 'Profile',
    icon: User,
    href: '/Profile',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className='
        group
        fixed
        left-0
        top-0
        z-[60]
        h-screen
        w-[72px]
        overflow-hidden
        border-r
        border-[#E8E1D5]
        bg-white
        shadow-sm
        transition-[width]
        duration-300
        ease-in-out
        hover:w-[260px]
      '
    >
      {/* Logo */}
      <div className='flex h-18 items-center px-5'>
        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F45124]'>
          <Repeat2 size={24} strokeWidth={3} className='text-white' />
        </div>

        <span
          className='
            ml-3
            whitespace-nowrap
            text-lg
            font-bold
            text-[#142235]
            opacity-0
            transition-opacity
            duration-200
            delay-75
            group-hover:opacity-100
          '
        >
          Campus Loop
        </span>
      </div>

      {/* Navigation */}
      <nav className='mt-6 px-3'>
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                mb-2
                flex
                h-11
                items-center
                rounded-xl
                px-3
                transition-all
                duration-200

                ${
                  isActive
                    ? 'bg-[#FFF3EA] text-[#F45124]'
                    : 'text-[#5C6878] hover:bg-[#FFF3EA] hover:text-[#F45124]'
                }
              `}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.8}
                className='shrink-0'
              />

              <span
                className='
                  ml-4
                  whitespace-nowrap
                  text-sm
                  font-medium
                  opacity-0
                  transition-opacity
                  duration-200
                  delay-75
                  group-hover:opacity-100
                '
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Help */}
      <div className='absolute bottom-5 left-0 w-full px-3'>
        <Link
          href='/Help'
          className='
            flex
            h-11
            items-center
            rounded-xl
            px-3
            text-[#5C6878]
            transition-all
            duration-200
            hover:bg-[#FFF3EA]
            hover:text-[#F45124]
          '
        >
          <CircleHelp size={20} strokeWidth={1.8} className='shrink-0' />

          <span
            className='
              ml-4
              whitespace-nowrap
              text-sm
              font-medium
              opacity-0
              transition-opacity
              duration-200
              delay-75
              group-hover:opacity-100
            '
          >
            Help & Support
          </span>
        </Link>
      </div>
    </aside>
  );
}
