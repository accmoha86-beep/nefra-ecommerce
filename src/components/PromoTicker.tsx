import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PromoMessage, TFunc } from '../types';

interface PromoTickerProps {
  messages: PromoMessage[];
  t: TFunc;
  lang: string;
}

export const PromoTicker: React.FC<PromoTickerProps> = ({ messages, t, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const activeMessages = messages.filter(m => m.enabled);
  const isRTL = lang === 'ar';

  useEffect(() => {
    if (activeMessages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % activeMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeMessages.length]);

  if (dismissed || activeMessages.length === 0) return null;
  const msg = activeMessages[currentIndex];

  return (
    <div className="promo-ticker" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="promo-ticker-inner">
        {activeMessages.length > 1 && (
          <button className="promo-ticker-arrow" onClick={() => setCurrentIndex(prev => (prev - 1 + activeMessages.length) % activeMessages.length)}>
            {isRTL ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
        <div className="promo-ticker-content">
          <span className="promo-ticker-emoji">{msg.emoji}</span>
          <span className="promo-ticker-text">{t(msg.textKey)}</span>
          <span className="promo-ticker-emoji">{msg.emoji}</span>
        </div>
        {activeMessages.length > 1 && (
          <button className="promo-ticker-arrow" onClick={() => setCurrentIndex(prev => (prev + 1) % activeMessages.length)}>
            {isRTL ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        <div className="promo-ticker-dots">
          {activeMessages.map((_, i) => (
            <span key={i} className={`promo-dot ${i === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(i)} />
          ))}
        </div>
      </div>
      <button className="promo-ticker-close" onClick={() => setDismissed(true)}>
        <X size={12} />
      </button>
    </div>
  );
};
