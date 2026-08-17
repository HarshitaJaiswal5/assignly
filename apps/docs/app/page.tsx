'use client';

import HeroPage from './components/HomePage/HomePage';

export default function Home() {
  // const [loading, setLoading] = useState(true);

  return (
    <>
      <HeroPage />

      {/* {loading && <LoaderMain onComplete={() => setLoading(false)} />} */}
    </>
  );
}
