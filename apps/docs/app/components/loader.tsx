"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

import {
  Camera,
  Home,
  Star,
  ArrowUpRight,
  Heart,
  Bell,
} from "lucide-react";

export default function LoaderMain() {
  const [step, setStep] = useState(0);

  const letters = ["A", "S", "S", "I", "N", "L", "Y"];

  const icons = [
    <Camera size={48} key="camera" />,
    <Home size={48} key="home" />,
    <Star size={48} key="star" />,
    <ArrowUpRight size={48} key="arrow" />,
    <Heart size={48} key="heart" />,
    <Bell size={48} key="bell" />,
    <Bell size={48} key="bell" />,
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial icon reveal
    tl.from(".slot", {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(2)",
    });

    // Small bounce
    tl.to(".slot", {
      y: -15,
      stagger: 0.05,
      repeat: 1,
      yoyo: true,
      duration: 0.25,
    });

    // Sequential transformations
    for (let i = 1; i <= 7; i++) {
      tl.add(() => {
        setStep(i);
      });

      tl.to({}, { duration: 0.3 });
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-yellow-400 flex items-center justify-center">
      <div className="flex gap-10">
        {letters.map((letter, index) => (
          <div
            key={index}
            className="slot relative w-16 h-16 flex items-center justify-center"
          >
            {step <= index ? (
              <div
                className="transition-all duration-500 ease-in-out"
              >
                {icons[index]}
              </div>
            ) : (
              <span
                className="text-6xl font-black transition-all duration-500 ease-in-out"
              >
                {letter}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}