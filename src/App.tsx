import { useState, useCallback } from 'react';
import Cursor from './components/Cursor';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import OvenSection from './components/OvenSection';
import PizzaMenu from './components/PizzaMenu';
import TakeawaySection from './components/TakeawaySection';
import TeamSection from './components/TeamSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import MenuExperience from './components/MenuExperience';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  if (window.location.pathname === '/menu') return <MenuExperience />;
  return (
    <div className="film-grain bg-charcoal min-h-screen">
      <Cursor />
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <Navigation />
        <main>
          <Hero />
          <OvenSection />
          <PizzaMenu />
          <TakeawaySection />
          <TeamSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
