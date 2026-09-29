'use client';

import React, { useEffect, useState } from 'react';
import { Bell, ChevronDown, ArrowLeft, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function PrivateNavbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar when user reaches the top
      if (currentScrollY <= 10) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Scrolling down → hide
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      // Scrolling up → show
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  if (status === 'loading') {
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <header
      className={`
    fixed
    left-[72px]
    right-0
    top-0
    z-50
    h-18
    bg-white/95
    px-6
    backdrop-blur-md
    transition-transform
    duration-300
    ease-in-out
    ${isVisible ? 'translate-y-0' : '-translate-y-full'}
    after:absolute
    after:bottom-0
    after:left-0
    after:right-0
    after:h-px
    after:bg-[#E8E1D5]
    after:content-['']
  `}
    >
      <div className='flex h-full items-center justify-between'>
        {/* Back button */}
        <button
          type='button'
          onClick={handleBack}
          className='
            group
            flex
            items-center
            gap-2
            rounded-lg
            px-3
            py-2
            text-sm
            font-medium
            text-[#F45124]
            transition-all
            duration-200
            hover:bg-[#FFF3EA]
          '
        >
          <ArrowLeft
            size={18}
            className='
              transition-transform
              duration-200
              group-hover:-translate-x-1
            '
          />

          <span>Back to Make & Earn</span>
        </button>

        {/* Right section */}
        <div className='flex items-center gap-5'>
          {/* Notification */}
          <button
            type='button'
            aria-label='Notifications'
            className='
              relative
              rounded-full
              p-2
              text-[#142235]
              transition
              duration-200
              hover:bg-[#FFF3EA]
            '
          >
            <Bell size={21} strokeWidth={1.8} />

            <span
              className='
                absolute
                -right-0.5
                -top-0.5
                flex
                h-4
                w-4
                items-center
                justify-center
                rounded-full
                bg-[#F45124]
                text-[9px]
                font-semibold
                text-white
              '
            >
              2
            </span>
          </button>

          {/* Profile */}
          <button
            type='button'
            aria-label='Profile menu'
            className='
              flex
              items-center
              gap-2
              rounded-xl
              px-2
              py-1.5
              transition
              duration-200
              hover:bg-[#F8F7F4]
            '
          >
            <div
              className='
                relative
                h-9
                w-9
                overflow-hidden
                rounded-full
                bg-[#142235]
              '
            >
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? 'Profile'}
                  fill
                  className='object-cover'
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center text-white'>
                  <User size={18} />
                </div>
              )}
            </div>

            <ChevronDown size={16} className='text-[#5C6878]' />
          </button>
        </div>
      </div>
    </header>
  );
}
