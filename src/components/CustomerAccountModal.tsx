import { useState, useEffect } from 'react';
import { X, User, MapPin, CreditCard, Clock, Heart, Gift, ChevronRight, LogIn, Chrome } from 'lucide-react';

type AccountTab = 'orders' | 'favorites' | 'addresses' | 'payment' | 'loyalty';

const MOCK_ORDERS = [
  { id: 'BLB-X7F2K1', date: '15 Jul 2026', items: ['Tartufina', 'Bronte', 'Rocher'], total: '€29.00', status: 'Consegnato' },
  { id: 'BLB-M3P9Q2', date: '10 Jul 2026', items: ['Diavola', '5 Formaggi', 'Franziskaner'], total: '€21.00', status: 'Consegnato' },
  { id: 'BLB-A1R5T8', date: '3 Jul 2026', items: ['Bufalina', 'Cheesecake'], total: '€14.00', status: 'Consegnato' },
];

const MOCK_FAVORITES = ['Tartufina', 'Bronte', 'Delizia Irpinia', 'Rocher'];

const MOCK_ADDRESSES = [
  { label: 'Casa', address: 'Via Roma 12, Atripalda (AV)', default: true },
  { label: 'Ufficio', address: 'Corso Italia 5, Avellino (AV)', default: false },
];

const LOYALTY_LEVEL = { name: 'Gold', points: 340, next: 500, badge: '⭐' };

function LoyaltyCard() {
  const pct = Math.round((LOYALTY_LEVEL.points / LOYALTY_LEVEL.next) * 100);
  return (
    <div className="relative overflow-hidden rounded-xl p-5 mb-5"
      style={{ background: 'linear-gradient(135deg, #1a1507, #2a1e08)', border: '1px solid rgba(201,162,39,0.5)', boxShadow: '0 12px 40px rgba(0,0,0,0.3)' }}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #e8c547, transparent)', transform: 'translate(30%, -30%)' }} />
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-geist text-[9px] uppercase tracking-[0.3em] text-gold/60" style={{ fontFamily: "'Geist', sans-serif" }}>Balbi Loyalty</p>
          <h3 className="font-playfair text-gold text-2xl mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{LOYALTY_LEVEL.badge} {LOYALTY_LEVEL.name} Member</h3>
        </div>
        <div className="text-right">
          <p className="font-playfair text-gold text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>{LOYALTY_LEVEL.points}</p>
          <p className="font-geist text-[9px] text-gold/50 uppercase tracking-[0.2em]" style={{ fontFamily: "'Geist', sans-serif" }}>punti</p>
        </div>
      </div>
      <div className="mb-1 flex justify-between">
        <p className="font-geist text-[9px] text-gold/50" style={{ fontFamily: "'Geist', sans-serif" }}>{LOYALTY_LEVEL.points} / {LOYALTY_LEVEL.next} punti al livello Platinum</p>
        <p className="font-geist text-[9px] text-gold/70" style={{ fontFamily: "'Geist', sans-serif" }}>{pct}%</p>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: 'rgba(201,162,39,0.2)' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #b8960c, #e8c547)' }} />
      </div>
    </div>
  );
}

function RewardsGrid() {
  const rewards = [
    { label: '🍕 Pizza Gratis', pts: 500, achieved: false },
    { label: '🎂 Compleanno −20%', pts: 0, achieved: true },
    { label: '🎁 Voucher €5', pts: 200, achieved: true },
    { label: '⭐ VIP Badge', pts: 1000, achieved: false },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 mb-5">
      {rewards.map((r) => (
        <div key={r.label} className="p-3 rounded-lg text-center" style={{ background: r.achieved ? 'rgba(201,162,39,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${r.achieved ? 'rgba(201,162,39,0.4)' : 'rgba(255,255,255,0.08)'}` }}>
          <p className="text-xl mb-1">{r.label.split(' ')[0]}</p>
          <p className="font-geist text-[10px] text-cream/70" style={{ fontFamily: "'Geist', sans-serif" }}>{r.label.slice(2)}</p>
          {r.pts > 0 && <p className="font-geist text-[9px] text-gold/50 mt-1" style={{ fontFamily: "'Geist', sans-serif" }}>{r.pts} punti</p>}
          {r.achieved && <p className="font-geist text-[9px] text-gold mt-1" style={{ fontFamily: "'Geist', sans-serif" }}>Disponibile</p>}
        </div>
      ))}
    </div>
  );
}

type Props = { isOpen: boolean; onClose: () => void };

export default function CustomerAccountModal({ isOpen, onClose }: Props) {
  const [tab, setTab] = useState<AccountTab>('loyalty');
  const [loggedIn] = useState(true); // mock logged in state

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;

  const tabs: { id: AccountTab; label: string; icon: React.ElementType }[] = [
    { id: 'loyalty', label: 'Premi', icon: Gift },
    { id: 'orders', label: 'Ordini', icon: Clock },
    { id: 'favorites', label: 'Preferiti', icon: Heart },
    { id: 'addresses', label: 'Indirizzi', icon: MapPin },
    { id: 'payment', label: 'Pagamenti', icon: CreditCard },
  ];

  return (
    <div className="order-modal-backdrop" onClick={onClose}>
      <div className="account-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="account-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #b8960c, #e8c547)' }}>
              <User size={18} className="text-[#0f0e0d]" />
            </div>
            <div>
              <p className="font-playfair text-cream text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                {loggedIn ? 'Mario Rossi' : 'Il Mio Account'}
              </p>
              <p className="font-geist text-[10px] text-gold/60" style={{ fontFamily: "'Geist', sans-serif" }}>
                {loggedIn ? `${LOYALTY_LEVEL.badge} ${LOYALTY_LEVEL.name} Member` : 'Accedi o Registrati'}
              </p>
            </div>
          </div>
          <button type="button" className="order-close-btn interactive" onClick={onClose} aria-label="Chiudi">
            <X size={18} />
          </button>
        </div>

        {!loggedIn ? (
          <div className="p-6 flex flex-col gap-4">
            <p className="font-playfair text-cream/60 italic text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
              Accedi per vedere i tuoi ordini, preferiti e punti fedeltà.
            </p>
            <button className="btn-gold w-full flex items-center justify-center gap-2 text-sm interactive">
              <Chrome size={16} /> Accedi con Google
            </button>
            <button className="btn-outline-gold w-full flex items-center justify-center gap-2 text-sm interactive">
              <LogIn size={16} /> Accedi con Email
            </button>
          </div>
        ) : (
          <>
            {/* Tab bar */}
            <div className="account-tabs">
              {tabs.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`account-tab interactive${tab === t.id ? ' active' : ''}`}
                    onClick={() => setTab(t.id)}
                  >
                    <Icon size={12} />
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="account-body">
              {tab === 'loyalty' && (
                <div>
                  <LoyaltyCard />
                  <p className="font-geist text-[9px] uppercase tracking-[0.28em] text-gold/60 mb-3" style={{ fontFamily: "'Geist', sans-serif" }}>I Tuoi Premi</p>
                  <RewardsGrid />
                  <div className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,162,39,0.15)' }}>
                    <p className="font-geist text-[10px] text-cream/50 leading-relaxed" style={{ fontFamily: "'Geist', sans-serif" }}>
                      Guadagna <span className="text-gold">10 punti</span> per ogni euro speso. Ogni ordine ti avvicina alla pizza gratis!
                    </p>
                  </div>
                </div>
              )}

              {tab === 'orders' && (
                <div className="flex flex-col gap-3">
                  {MOCK_ORDERS.map((o) => (
                    <div key={o.id} className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,162,39,0.15)' }}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-geist text-[9px] text-gold/60 uppercase tracking-[0.2em]" style={{ fontFamily: "'Geist', sans-serif" }}>{o.id}</p>
                          <p className="font-geist text-cream/50 text-xs mt-0.5" style={{ fontFamily: "'Geist', sans-serif" }}>{o.date}</p>
                        </div>
                        <span className="font-geist text-[9px] uppercase tracking-[0.15em] text-green-400/80 px-2 py-0.5 rounded-full" style={{ background: 'rgba(74,222,128,0.1)', fontFamily: "'Geist', sans-serif" }}>{o.status}</span>
                      </div>
                      <p className="font-geist text-cream/70 text-sm" style={{ fontFamily: "'Geist', sans-serif" }}>{o.items.join(', ')}</p>
                      <div className="flex justify-between items-center mt-3">
                        <p className="font-playfair text-gold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>{o.total}</p>
                        <button className="font-geist text-[10px] text-gold/60 uppercase tracking-[0.18em] flex items-center gap-1 interactive hover:text-gold transition-colors" style={{ fontFamily: "'Geist', sans-serif" }}>
                          Riordina <ChevronRight size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'favorites' && (
                <div className="flex flex-col gap-2">
                  {MOCK_FAVORITES.map((f) => (
                    <div key={f} className="flex items-center justify-between p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,162,39,0.15)' }}>
                      <div className="flex items-center gap-3">
                        <Heart size={14} className="text-gold/60" />
                        <span className="font-playfair text-cream text-base" style={{ fontFamily: "'Playfair Display', serif" }}>{f}</span>
                      </div>
                      <button className="font-geist text-[10px] text-gold/60 uppercase tracking-[0.15em] flex items-center gap-1 interactive hover:text-gold transition-colors" style={{ fontFamily: "'Geist', sans-serif" }}>
                        Ordina <ChevronRight size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'addresses' && (
                <div className="flex flex-col gap-3">
                  {MOCK_ADDRESSES.map((a) => (
                    <div key={a.label} className="p-4 rounded-lg flex items-start gap-3" style={{ background: a.default ? 'rgba(201,162,39,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${a.default ? 'rgba(201,162,39,0.35)' : 'rgba(201,162,39,0.15)'}` }}>
                      <MapPin size={15} className="text-gold/60 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-geist text-[10px] uppercase tracking-[0.2em] text-gold/70" style={{ fontFamily: "'Geist', sans-serif" }}>{a.label}</p>
                          {a.default && <span className="font-geist text-[8px] uppercase tracking-[0.15em] text-gold/50 px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(201,162,39,0.15)', fontFamily: "'Geist', sans-serif" }}>Predefinito</span>}
                        </div>
                        <p className="font-geist text-cream/70 text-sm mt-0.5" style={{ fontFamily: "'Geist', sans-serif" }}>{a.address}</p>
                      </div>
                    </div>
                  ))}
                  <button className="btn-outline-gold w-full text-xs interactive mt-2">+ Aggiungi Indirizzo</button>
                </div>
              )}

              {tab === 'payment' && (
                <div className="flex flex-col gap-3">
                  <div className="p-4 rounded-lg flex items-center gap-3" style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.35)' }}>
                    <CreditCard size={18} className="text-gold" />
                    <div>
                      <p className="font-geist text-[9px] uppercase tracking-[0.2em] text-gold/60" style={{ fontFamily: "'Geist', sans-serif" }}>Visa</p>
                      <p className="font-playfair text-cream text-base" style={{ fontFamily: "'Playfair Display', serif" }}>•••• •••• •••• 4242</p>
                    </div>
                    <span className="ml-auto font-geist text-[9px] uppercase tracking-[0.15em] text-gold/50 px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,162,39,0.15)', fontFamily: "'Geist', sans-serif" }}>Predefinita</span>
                  </div>
                  <p className="font-geist text-cream/30 text-[11px] text-center leading-relaxed" style={{ fontFamily: "'Geist', sans-serif" }}>
                    I metodi di pagamento saranno gestiti in sicurezza tramite Stripe.
                  </p>
                  <button className="btn-outline-gold w-full text-xs interactive mt-1">+ Aggiungi Carta</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
