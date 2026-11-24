'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { LoaderMain } from '@/components/Loader/LoaderMain';

export default function PublicLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {loading && (
        <div className="fixed inset-0 z-[9999]">
          <LoaderMain onComplete={() => setLoading(false)} />
        </div>
      )}

      <div className={`${loading ? 'invisible' : 'visible'}`}>
        <Navbar />
        <main className="relative z-10 w-full flex-1 bg-white md:rounded-b-[3.5rem]">
          {children}
        </main>
      <Footer />
      </div>
    </div>
  );
}