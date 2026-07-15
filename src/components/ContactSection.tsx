import { useEffect, useRef, useState } from 'react';
import { Phone, Instagram, MapPin, Send } from 'lucide-react';

export default function ContactSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', date: '', note: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Ciao Pizzeria Balbi! Vorrei prenotare un tavolo.\n\nNome: ${form.name}\nTelefono: ${form.phone}\nData: ${form.date}\nNote: ${form.note}`
    );
    window.open(`https://wa.me/393773727225?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contatti" className="relative py-32 bg-charcoal-mid">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div
            className={`reveal ${headerVisible ? 'visible' : ''} font-geist text-[10px] uppercase tracking-[0.5em] text-gold`}
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Vieni a Trovarci
          </div>
          <h2
            className={`reveal reveal-delay-1 ${headerVisible ? 'visible' : ''} font-playfair text-cream mt-4`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            }}
          >
            Prenota il Tuo
            <br />
            <span className="italic text-gold">Tavolo</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Form */}
          <div className={`reveal ${headerVisible ? 'visible' : ''}`}>
            <h3
              className="font-playfair text-cream text-2xl mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Prenotazione
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {[
                { key: 'name', label: 'Il tuo nome', type: 'text', placeholder: 'Mario Rossi' },
                { key: 'phone', label: 'Telefono', type: 'tel', placeholder: '+39 333 000 0000' },
                { key: 'date', label: 'Data e ora desiderata', type: 'text', placeholder: 'Es: Sabato 20 luglio, ore 20:30' },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-2">
                  <label
                    className="text-[10px] uppercase tracking-[0.3em] text-cream/50 font-geist"
                    style={{ fontFamily: "'Geist', sans-serif" }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="interactive bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-cream font-geist text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-cream/20"
                    style={{ fontFamily: "'Geist', sans-serif" }}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label
                  className="text-[10px] uppercase tracking-[0.3em] text-cream/50 font-geist"
                  style={{ fontFamily: "'Geist', sans-serif" }}
                >
                  Note (opzionale)
                </label>
                <textarea
                  rows={3}
                  placeholder="Numero di persone, allergie, occasione speciale..."
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="interactive bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-cream font-geist text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-cream/20 resize-none"
                  style={{ fontFamily: "'Geist', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                className="interactive btn-gold flex items-center justify-center gap-2 mt-2"
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                <Send size={14} />
                {sent ? 'Messaggio inviato!' : 'Invia via WhatsApp'}
              </button>
            </form>
          </div>

          {/* Right: Info + Map */}
          <div className={`reveal reveal-delay-2 ${headerVisible ? 'visible' : ''} flex flex-col gap-8`}>
            {/* Contact links */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: <Phone size={16} />,
                  label: 'Telefono',
                  value: '+39 377 372 7225',
                  href: 'tel:+393773727225',
                },
                {
                  icon: <Instagram size={16} />,
                  label: 'Instagram',
                  value: '@pizzeriabalbi',
                  href: 'https://instagram.com/pizzeriabalbi',
                },
                {
                  icon: <MapPin size={16} />,
                  label: 'Indirizzo',
                  value: 'Via Salita Palazzo SNC, 83042 Atripalda (AV)',
                  href: 'https://maps.google.com/?q=Pizzeria+Balbi+Atripalda',
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="interactive glass rounded-sm p-4 flex items-center gap-4 group hover:border-gold/30 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: 'rgba(201,162,39,0.1)',
                      color: '#c9a227',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-[0.3em] text-cream/40 font-geist"
                      style={{ fontFamily: "'Geist', sans-serif" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-cream font-geist text-sm mt-0.5 group-hover:text-gold transition-colors"
                      style={{ fontFamily: "'Geist', sans-serif" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/393773727225"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive flex items-center gap-2 px-5 py-3 rounded-sm text-[11px] uppercase tracking-[0.2em] font-geist font-medium whatsapp-btn"
                style={{
                  fontFamily: "'Geist', sans-serif",
                  background: '#25d366',
                  color: '#fff',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="tel:+393773727225"
                className="interactive btn-outline-gold flex items-center gap-2 text-xs"
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                <Phone size={13} />
                Chiama
              </a>
            </div>

            {/* Map */}
            <div className="rounded-sm overflow-hidden" style={{ height: '240px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.3!2d14.8296!3d40.9199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133bcb4c4c4c4c4c%3A0x0!2zUGl6emVyaWEgQmFsYmksIEF0cmlwYWxkYQ!5e0!3m2!1sit!2sit!4v1234567890"
                width="100%"
                height="240"
                style={{ border: 0, filter: 'grayscale(80%) contrast(1.1) brightness(0.7)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Pizzeria Balbi Atripalda"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
