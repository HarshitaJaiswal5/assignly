"use client";

import Image from "next/image";
import googleLogo from "@/public/googleLogo.png";
import { authService } from "../../services/authServices";

interface SignInModalProps {
  onClose: () => void;
}

export const AuthCard = ({ onClose }: SignInModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#142235]/30 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* AUTH CARD */}
      <div
        className="relative w-full max-w-md rounded-2xl border border-[#E8E1D5] bg-[#FFFDF5] p-8 shadow-[0_20px_60px_rgba(20,34,53,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-2xl text-[#8A8F98] transition hover:text-[#142235]"
        >
          ×
        </button>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[#142235]">
            Welcome back
          </h2>

          <p className="mt-2 text-[#5C6878]">
            Sign in to continue
          </p>

          <p className="mt-6 text-sm leading-6 text-[#7A8491]">
            Find nearby work and keep every handoff in one place.
          </p>
        </div>

        {/* Google */}
        <button
          onClick={() => authService.signInWithGoogle()}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-[#DDD8CE] bg-white px-5 py-4 text-sm font-semibold text-[#142235] shadow-sm transition hover:border-[#F45124] hover:bg-[#FFF8F4]"
        >
          <Image
            src={googleLogo}
            alt="Google"
            width={22}
            height={22}
          />

          Continue with Google
        </button>

        {/* Terms */}
        <p className="mt-6 text-center text-xs leading-5 text-[#8A8F98]">
          By continuing, you agree to our{" "}
          <span className="text-[#142235] underline underline-offset-2">
            Terms of Use
          </span>{" "}
          and{" "}
          <span className="text-[#142235] underline underline-offset-2">
            Privacy Policy
          </span>
        </p>

        {/* Divider */}

    
        
      </div>
    </div>
  );
};
