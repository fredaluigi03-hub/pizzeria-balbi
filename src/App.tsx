import { useState, useCallback } from 'react';
import Cursor from './components/Cursor';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import OvenSection from './components/OvenSection';
import PizzaMenu from './components/PizzaMenu';
import DessertsSection from './components/DessertsSection';
import BeersSection from './components/BeersSection';
import TeamSection from './components/TeamSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

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
          <DessertsSection />
          <BeersSection />
          <TeamSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
