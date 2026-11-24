import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth';
import PublicLayoutClient from '@/app/(public)/publicLayoutClient';

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session) {
    redirect('/Dashboard');
  }

  return <PublicLayoutClient>{children}</PublicLayoutClient>;
}