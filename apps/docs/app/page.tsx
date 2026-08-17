'use client';

import { useState } from 'react';
import LoaderMain from './components/Loader/LoaderMain'; // enhance - do @component thing
import HeroPage from './components/HeroPage/HeroPage';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <HeroPage />

      {loading && <LoaderMain onComplete={() => setLoading(false)} />}
    </>
  );
}
