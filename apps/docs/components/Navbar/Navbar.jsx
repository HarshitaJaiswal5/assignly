import Link from 'next/link';
import Image from 'next/image';
import { Repeat2 } from 'lucide-react';

export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 bg-white px-10'>
      <nav className='tracking-wider font-[family-name:var(--font-rethink-sans)] flex h-16 max-w-7xl items-center justify-between px-6'>
        <div className='flex gap-1.5 items-center justify-center'>
          <Repeat2
            strokeWidth={4}
            size={25}
            color='#F45124'
            absoluteStrokeWidth
          />
          <Link href='/' className='text-2xl font-bold'>
            CampusLoop
          </Link>
        </div>

        <div className='hidden items-center gap-8 md:flex text-md font-bold '>
          <Link href='#how-it-works'>How it works</Link>

          <Link href='#how-it-works'>About</Link>

          <Link href='/signin' className='text-orange-500'>
            Sign in
          </Link>

          <Link
            href='/signup'
            className='rounded-lg bg-[#F45124] px-5 py-2 text-white tracking-wider'
          >
            Create account
          </Link>
        </div>
      </nav>
    </header>
  );
}
