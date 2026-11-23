"use client";

import React, { useState } from "react";
import PrivateNavbar from "@/components/PrivateNavbar/PrivateNavbar";
import Sidebar from "@/components/SideBar/SideBar";

export default function PrivateLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Sidebar
        expanded={expanded}
        setExpanded={setExpanded}
      />

      <div
        className={`min-h-screen transition-all duration-300 ease-in-out ${
          expanded ? "ml-[250px]" : "ml-[72px]"
        }`}
      >
        <PrivateNavbar />

        <main className="bg-background/95">
          {children}
        </main>
      </div>
    </div>
  );
}