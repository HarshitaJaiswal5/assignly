'use client';

import HeroPage from './components/HomePage/HomePage';
import {MakeAssign} from './components/MakeAssign/MakeAssign';

export default function Home() {
  // const [loading, setLoading] = useState(true);

  return (
    <>
      {/* <HeroPage /> */}
      <MakeAssign/>
      {/* {loading && <LoaderMain onComplete={() => setLoading(false)} />} */}
    </>
  );
}
