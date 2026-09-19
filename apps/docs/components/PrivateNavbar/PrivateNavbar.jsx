"use client";

import { Bell, ChevronDown, ArrowLeft, User } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function PrivateNavbar() {
    const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <header className="flex h-18 items-center justify-between border-b border-[#E8E1D5] bg-[#FFFDF5] px-6">
      <button className="flex items-center gap-2 text-sm font-medium text-[#F45124] transition hover:opacity-80">
        <ArrowLeft size={18} />
        <span>Back to Make & Earn</span>
      </button>

      <div className="flex items-center gap-5">
        <button className="relative text-[#142235] transition hover:opacity-70">
          <Bell size={21} />
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F45124] text-[9px] font-semibold text-white">
            2
          </span>
        </button>

        <button className="flex items-center gap-2">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-[#142235]">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "Profile"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-white">
                <User size={18} />
              </div>
            )}
          </div>

          <ChevronDown size={16} className="text-[#5C6878]" />
        </button>
      </div>
    </header>
  );
}