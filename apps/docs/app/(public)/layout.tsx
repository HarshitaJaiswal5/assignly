import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function PublicLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session) {
    redirect('/Dashboard');
  }

  return (
    <div className='min-h-screen bg-[#FFFDF5]'>
      <Navbar />

      <main className='flex-1'>{children}</main>

      <Footer />
    </div>
  );
};

