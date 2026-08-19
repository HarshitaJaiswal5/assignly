"use client";

import { Bell, ChevronDown, ArrowLeft } from "lucide-react";

export default function PrivateNavbar() {
  return (
    <header className="flex h-[72px] items-center justify-between bg-white px-6">
      {/* Left */}
      <button className="flex items-center gap-2 text-sm font-medium text-[#d9572b]">
        <ArrowLeft size={18} />
        <span>Back to Make & Earn</span>
      </button>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell size={21} className="text-gray-700" />

          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#d9572b] text-[9px] text-white">
            2
          </span>
        </button>

        <button className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9572b] text-sm text-white">
            AM
          </div>

          <ChevronDown size={16} className="text-gray-600" />
        </button>
      </div>
    </header>
  );
}