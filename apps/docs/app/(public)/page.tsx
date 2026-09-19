'use client';

import React, {useState} from 'react';
import { HomePage }  from '@/components/HomePage/HomePage';
import { LoaderMain } from '@/components/Loader/LoaderMain';

export default function PublicHomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <HomePage />
      {/* {loading && <LoaderMain onComplete={() => setLoading(false)} />} */}
    </>
  );
}
