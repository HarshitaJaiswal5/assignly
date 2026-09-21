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

      <div className='ml-70 flex min-h-screen flex-col'>
        <PrivateNavbar />

        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
