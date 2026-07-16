import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Home, Clock, MapPin, Banknote, CreditCard, Smartphone } from 'lucide-react';

const WHATSAPP_TAKEAWAY =
  'https://wa.me/393773727225?text=Ciao%21+Vorrei+ordinare+per+asporto+alla+Pizzeria+Balbi.';
const WHATSAPP_DELIVERY =
  'https://wa.me/393773727225?text=Ciao%21+Vorrei+ordinare+con+consegna+a+domicilio+dalla+Pizzeria+Balbi.';

const paymentMethods = [
  { icon: Banknote, label: 'Contanti' },
  { icon: CreditCard, label: 'Carta' },
  { icon: Smartphone, label: 'Apple Pay' },
  { icon: Smartphone, label: 'Google Pay' },
];

const infoItems = [
  { icon: Clock, label: 'Attesa media', value: '20 – 35 min' },
  { icon: MapPin, label: 'Zona consegna', value: 'Atripalda e dintorni' },
  { icon: Clock, label: 'Orario servizio', value: '19:00 – 23:00' },
];

type CardProps = {
  icon: React.ElementType;
  label: string;
  sub: string;
  description: string;
  cta: string;
  href: string;
  accent: string;
  delay: number;
  visible: boolean;
};

function TakeawayCard({ icon: Icon, label, sub, description, cta, href, accent, delay, visible }: CardProps) {
  return (
    <div
      className="takeaway-card interactive"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay * 0.15}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay * 0.15}s`,
      }}
    >
      <div
        className="takeaway-card-icon"
        style={{
          background: `linear-gradient(135deg, ${accent}28, ${accent}0e)`,
          borderColor: `${accent}55`,
        }}
      >
        <Icon size={22} style={{ color: accent }} />
      </div>

      <div className="mt-5">
        <p
          className="font-geist text-[9px] uppercase tracking-[0.32em]"
          style={{ fontFamily: "'Geist', sans-serif", color: `${accent}bb` }}
        >
          {sub}
        </p>
        <h3
          className="font-playfair text-cream mt-1"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {label}
        </h3>
      </div>

      <p
        className="font-geist text-cream/50 text-sm leading-relaxed mt-4"
        style={{ fontFamily: "'Geist', sans-serif" }}
      >
        {description}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="interactive takeaway-cta-btn mt-auto pt-6"
        style={{
          background: `linear-gradient(135deg, ${accent}ee, ${accent})`,
          boxShadow: `0 10px 28px ${accent}55`,
        }}
      >
        {cta}
      </a>
    </div>
  );
}

export default function TakeawaySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="ordina" className="relative py-24 sm:py-32 bg-charcoal overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 25% 60%, rgba(201,162,39,0.07) 0%, transparent 52%), radial-gradient(ellipse at 75% 20%, rgba(201,162,39,0.05) 0%, transparent 48%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(201,162,39,0.35) 0.6px, transparent 0.6px)',
          backgroundSize: '22px 22px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="text-center mb-14">
          <p
            className={`reveal ${visible ? 'visible' : ''} font-geist text-[10px] uppercase tracking-[0.5em] text-gold`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Ordina Ora
          </p>
          <h2
            className={`reveal reveal-delay-1 ${visible ? 'visible' : ''} font-playfair text-cream mt-4`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
            }}
          >
            Takeaway &amp;<br />
            <em className="italic text-gold">Consegna a Casa</em>
          </h2>
          <p
            className={`reveal reveal-delay-2 ${visible ? 'visible' : ''} font-geist text-sm text-cream/50 mt-4 max-w-xs mx-auto leading-relaxed`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Le pizze di Balbi — dove vuoi tu, quando vuoi tu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <TakeawayCard
            icon={ShoppingBag}
            label="Takeaway"
            sub="Ritiro in Pizzeria"
            description="Ordina in anticipo via WhatsApp, passa a ritirare. La tua pizza sarà pronta — calda, fragrante, appena sfornata."
            cta="Ordina per Asporto"
            href={WHATSAPP_TAKEAWAY}
            accent="#c9a227"
            delay={0}
            visible={visible}
          />
          <TakeawayCard
            icon={Home}
            label="Delivery"
            sub="Consegna a Domicilio"
            description="Goditi le nostre pizze napoletane comodamente a casa tua. Consegniamo direttamente a domicilio nell'area di Atripalda."
            cta="Ordina con Consegna"
            href={WHATSAPP_DELIVERY}
            accent="#e8c547"
            delay={1}
            visible={visible}
          />
        </div>

        <div className={`reveal reveal-delay-3 ${visible ? 'visible' : ''} mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4`}>
          {infoItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="glass rounded-sm p-5 flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: 'rgba(201,162,39,0.1)',
                    border: '1px solid rgba(201,162,39,0.3)',
                  }}
                >
                  <Icon size={15} className="text-gold" />
                </div>
                <div>
                  <p
                    className="font-geist text-[8px] uppercase tracking-[0.28em] text-cream/35"
                    style={{ fontFamily: "'Geist', sans-serif" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-playfair text-cream text-base mt-0.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`reveal reveal-delay-4 ${visible ? 'visible' : ''} mt-5`}>
          <div className="glass rounded-sm p-5 sm:p-6">
            <p
              className="font-geist text-[8px] uppercase tracking-[0.32em] text-gold/65 mb-4"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Metodi di Pagamento Accettati
            </p>
            <div className="flex flex-wrap gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{
                      background: 'rgba(201,162,39,0.07)',
                      border: '1px solid rgba(201,162,39,0.22)',
                    }}
                  >
                    <Icon size={13} className="text-gold" />
                    <span
                      className="font-geist text-[10px] uppercase tracking-[0.18em] text-cream/65"
                      style={{ fontFamily: "'Geist', sans-serif" }}
                    >
                      {method.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
