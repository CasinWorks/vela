import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';

type View = 'home' | 'about';

function pathToView(): View {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return hash === 'about' ? 'about' : 'home';
}

export default function App() {
  const [view, setView] = useState<View>(() => pathToView());

  useEffect(() => {
    const onHash = () => setView(pathToView());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goHome = () => {
    setView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goAbout = () => {
    setView('about');
    window.location.hash = '#/about';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goContact = () => {
    goHome();
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  return (
    <div className="min-h-screen bg-[#080B0E] text-[#F3F4F6] flex flex-col justify-between selection:bg-[#C5A880] selection:text-[#080B0E]">
      <Navigation
        activeView={view}
        onGoHome={goHome}
        onOpenAbout={goAbout}
        onOpenContact={goContact}
      />
      <main className="flex-1">
        {view === 'home' && <HomeView />}
        {view === 'about' && <AboutView onBackHome={goHome} onContact={goContact} />}
      </main>
      <Footer onOpenAbout={goAbout} />
    </div>
  );
}
