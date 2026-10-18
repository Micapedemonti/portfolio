import { useEffect, useState } from 'react';
import { Cursor } from '@/components/effects/Cursor';
import { Grain } from '@/components/effects/Grain';
import { Loader } from '@/components/effects/Loader';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { Footer } from '@/components/layout/Footer';
import { Topbar } from '@/components/layout/Topbar';
import { useBodyClass } from '@/hooks/useBodyClass';
import { markIntroSeen, shouldShowIntro } from '@/lib/intro';
import { IntroContext } from '@/lib/introContext';
import { HomePage } from '@/pages/HomePage';

export default function App() {
  const [showLoader, setShowLoader] = useState(shouldShowIntro);
  const [introDone, setIntroDone] = useState(() => !shouldShowIntro());

  useEffect(markIntroSeen, []);
  useBodyClass('loading', !introDone);

  return (
    <IntroContext value={introDone}>
      {showLoader && <Loader onReveal={() => setIntroDone(true)} onExit={() => setShowLoader(false)} />}
      <Grain />
      <Cursor />
      <ScrollProgress />
      <Topbar />
      <HomePage />
      <Footer />
    </IntroContext>
  );
}
