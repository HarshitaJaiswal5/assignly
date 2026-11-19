import React from 'react';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { auth } from '@/lib/auth/auth';

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session) {
    redirect('/Dashboard');
  }

  return (
    <div className='min-h-screen w-full flex flex-col'>
      <Navbar />
      <main className='relative z-10 w-full flex-1 bg-white md:rounded-b-[3.5rem] md:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
