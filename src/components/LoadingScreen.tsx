import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const steps = [15, 35, 55, 75, 90, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 700);
        }, 400);
      }
    }, 260);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0f0e0d] transition-opacity duration-700"
      style={{ opacity: exiting ? 0 : 1, pointerEvents: exiting ? 'none' : 'all' }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <div
            className="text-6xl md:text-8xl font-playfair italic text-cream tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Balbi
          </div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-full text-center">
            <span
              className="text-[9px] uppercase tracking-[0.4em] text-gold font-geist font-light"
              style={{ fontFamily: "'Geist', sans-serif" }}
            >
              Pizzeria
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="divider-gold w-16" />
          <span
            className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-geist"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Atripalda
          </span>
          <div className="divider-gold w-16" />
        </div>

        <div className="w-48 h-px bg-white/10 relative overflow-hidden rounded-full">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#b8960c] to-[#e8c547] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p
          className="text-[10px] uppercase tracking-[0.3em] text-cream/30 font-geist"
          style={{ fontFamily: "'Geist', sans-serif" }}
        >
          {progress < 100 ? 'Preparazione in corso...' : 'Benvenuto'}
        </p>
      </div>
    </div>
  );
}
