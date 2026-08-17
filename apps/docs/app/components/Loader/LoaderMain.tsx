'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import { Camera, Home, Star, ArrowUpRight, Heart, Bell } from 'lucide-react';

interface LoaderMainProps {
  onComplete: () => void;
}

const letters = ['A', 'S', 'S', 'I', 'N', 'L', 'Y'];

export default function LoaderMain({ onComplete }: LoaderMainProps) {
  const [step, setStep] = useState(0);

  const loaderRef = useRef(null);

  const icons = [
    <Camera size={48} key='camera' />,
    <Home size={48} key='home' />,
    <Star size={48} key='star' />,
    <ArrowUpRight size={48} key='arrow' />,
    <Heart size={48} key='heart' />,
    <Bell size={48} key='bell1' />,
    <Bell size={48} key='bell2' />,
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Icon entry
    tl.from('.slot', {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'back.out(2)',
    });

    // Bounce
    tl.to('.slot', {
      y: -15,
      stagger: 0.05,
      repeat: 1,
      yoyo: true,
      duration: 0.25,
    });

    // Icon -> Letter
    for (let i = 1; i <= letters.length; i += 1) {
      tl.add(() => setStep(i));
      tl.to({}, { duration: 0.25 });
    }

    // Hold final logo
    tl.to({}, { duration: 0.8 });

    // Reveal Hero
    tl.to('#hero', {
      opacity: 1,
      duration: 0.2,
    });

    tl.from(
      '.hero-title',
      {
        y: 120,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      },
      '<'
    );

    // Curtain Slide
    tl.to(
      loaderRef.current,
      {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
      },
      '<'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className='fixed inset-0 z-[999] bg-yellow-400 flex items-center justify-center'
    >
      <div className='flex gap-10'>
        {letters.map((letter, index) => (
          <div
            key={index}
            className='slot relative w-16 h-16 flex items-center justify-center'
          >
            {step <= index ? (
              <div className='transition-all duration-500'>{icons[index]}</div>
            ) : (
              <span className='text-6xl font-black'>{letter}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
