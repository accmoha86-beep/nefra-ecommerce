import React from 'react';
import { Star, Gift, Gamepad2 } from 'lucide-react';
import { TFunc, Page } from '../types';

interface EngagementBannersProps {
  t: TFunc;
  setPage: (p: Page) => void;
}

export const EngagementBanners: React.FC<EngagementBannersProps> = ({ t, setPage }) => {
  const banners = [
    { icon: <Star size={28}/>, titleKey: 'engage.loyaltyTitle', descKey: 'engage.loyaltyDesc', ctaKey: 'engage.loyaltyCta', emoji: '🏅', action: () => {} },
    { icon: <Gift size={28}/>, titleKey: 'engage.giftTitle', descKey: 'engage.giftDesc', ctaKey: 'engage.giftCta', emoji: '🎁', action: () => setPage('giftcards') },
    { icon: <Gamepad2 size={28}/>, titleKey: 'engage.spinTitle', descKey: 'engage.spinDesc', ctaKey: 'engage.spinCta', emoji: '🎰', action: () => {} },
  ];
  return (
    <section className="section engagement-section">
      <div className="section-inner">
        <div className="engagement-grid">
          {banners.map((b, i) => (
            <div key={i} className="engagement-card">
              <div className="engagement-emoji">{b.emoji}</div>
              <h3 className="engagement-title">{t(b.titleKey)}</h3>
              <p className="engagement-desc">{t(b.descKey)}</p>
              <button className="engagement-cta" onClick={b.action}>{t(b.ctaKey)}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
