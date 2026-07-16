import { useState, useCallback } from 'react';
import { OrderProvider } from './ordering/OrderContext';
import OrderingModal from './ordering/OrderingModal';
import FloatingCart from './ordering/FloatingCart';
import Cursor from './components/Cursor';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import OvenSection from './components/OvenSection';
import PizzaMenu from './components/PizzaMenu';
import PromotionsSection from './components/PromotionsSection';
import TakeawaySection from './components/TakeawaySection';
import TeamSection from './components/TeamSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomerAccountModal from './components/CustomerAccountModal';
import MenuExperience from './components/MenuExperience';

function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <div className="film-grain bg-charcoal min-h-screen">
      <Cursor />
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Navigation onAccountOpen={() => setAccountOpen(true)} />
        <main>
          <Hero />
          <OvenSection />
          <PizzaMenu />
          <PromotionsSection />
          <TakeawaySection />
          <TeamSection />
          <GallerySection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      <OrderingModal />
      <FloatingCart />
      <CustomerAccountModal isOpen={accountOpen} onClose={() => setAccountOpen(false)} />
    </div>
  );
}

export default function App() {
  if (window.location.pathname === '/menu') return <OrderProvider><Cursor /><MenuExperience /></OrderProvider>;
  return (
    <OrderProvider>
      <HomePage />
    </OrderProvider>
  );
}
