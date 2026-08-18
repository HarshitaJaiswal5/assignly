'use client';

import { useState } from 'react';
import Image from 'next/image';
import googleLogo from '../../../public/googleLogo.png';

export default function HeroMain() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <section
      id='hero'
      className='relative h-screen flex items-center justify-center bg-white'
    >
      {/* ASSINLY */}
      <button onClick={() => setShowAuth(true)} className='cursor-pointer'>
        <h1 className='hero-title text-black text-8xl font-black'>ASSINLY</h1>
      </button>

      {/* POPUP */}
      {showAuth && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center
                     bg-black/20 backdrop-blur-sm px-4'
          onClick={() => setShowAuth(false)}
        >
          {/* AUTH CARD */}
          <div
            className='relative w-full max-w-md rounded-2xl
                       border border-gray-200 bg-white
                       p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)]'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowAuth(false)}
              className='absolute right-5 top-4 text-2xl
                         text-gray-400 transition hover:text-black'
            >
              ×
            </button>

            {/* Heading */}
            <div className='text-center'>
              <h2 className='text-3xl font-semibold tracking-tight text-gray-900'>
                Welcome back
              </h2>

              <p className='mt-2 text-gray-500'>Sign in to continue</p>

              <p className='mt-6 text-sm leading-6 text-gray-400'>
                Find nearby work and keep every handoff in one place.
              </p>
            </div>

            {/* Google */}
            <button
              onClick={() => console.log('Google clicked')}
              className='mt-8 flex w-full items-center justify-center
                         gap-3 rounded-xl border border-gray-200
                         bg-white px-5 py-4
                         text-sm font-medium text-gray-800
                         shadow-sm transition
                         hover:bg-gray-50 hover:border-gray-300'
            >
              <Image src={googleLogo} alt='Google' width={22} height={22} />
              Continue with Google
            </button>

            {/* Terms */}
            <p className='mt-6 text-center text-xs leading-5 text-gray-400'>
              By continuing, you agree to our{' '}
              <span className='text-gray-600 underline underline-offset-2'>
                Terms of Use
              </span>{' '}
              and{' '}
              <span className='text-gray-600 underline underline-offset-2'>
                Privacy Policy
              </span>
            </p>

            {/* Divider */}
            <div className='my-7 h-px bg-gray-100' />

            {/* Signup */}
            <p className='text-center text-sm text-gray-500'>
              Don't have an account?{' '}
              <button className='font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600'>
                Sign up
              </button>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
