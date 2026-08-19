import { redirect } from "next/navigation";
import Sidebar from "@/components/SideBar/SideBar";
import PrivateNavbar from "@/components/PrivateNavbar/PrivateNavbar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-[#fafafa]">
      <div className="flex h-full">
        {/* SIDEBAR — never scrolls */}
        <aside className="h-full w-[250px] shrink-0 overflow-hidden border-r bg-white">
          <Sidebar />
        </aside>

        {/* RIGHT SIDE */}
        <div className="flex min-w-0 flex-1 flex-col">
          
          {/* NAVBAR — never scrolls */}
          <div className="shrink-0">
            <PrivateNavbar />
          </div>

          {/* ONLY THIS SCROLLS */}
          <main className="min-h-0 flex-1 overflow-y-auto">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}