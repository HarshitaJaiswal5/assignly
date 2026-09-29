import React from 'react';
import { redirect } from 'next/navigation';
import PrivateNavbar from '@/components/PrivateNavbar/PrivateNavbar';
import Sidebar from '@/components/SideBar/SideBar';
import { auth } from '@/lib/auth/auth';

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }
  return (
    <div className='min-h-screen bg-white'>
      <Sidebar />

      {/* 
        Collapsed sidebar width = 72px.
        Main content permanently reserves only this much space.
      */}
      <div className='ml-[72px] min-h-screen'>
        <PrivateNavbar />

        <main className='pt-18'>{children}</main>
      </div>
    </div>
  );
}
