import React, { useState } from 'react';
import { Star, Award, ChevronRight, X, Gift, TrendingUp } from 'lucide-react';
import { TFunc } from '../types';

interface LoyaltyWidgetProps {
  t: TFunc;
  lang: string;
}

export const LoyaltyWidget: React.FC<LoyaltyWidgetProps> = ({ t, lang }) => {
  const [expanded, setExpanded] = useState(false);
  const points = 450;
  const tier = 'Silver';
  const nextTier = 'Gold';
  const pointsNeeded = 1000;
  const progress = (points / pointsNeeded) * 100;

  return (
    <>
      <button className="loyalty-widget-trigger" onClick={() => setExpanded(!expanded)} title={t('loyalty.title')}>
        <Star size={20} fill="currentColor"/>
        <span className="loyalty-badge-count">{points}</span>
      </button>
      {expanded && (
        <div className="loyalty-widget-panel">
          <div className="loyalty-widget-header">
            <h4><Award size={18}/> {t('loyalty.title')}</h4>
            <button className="loyalty-close" onClick={() => setExpanded(false)}><X size={16}/></button>
          </div>
          <div className="loyalty-widget-body">
            <div className="loyalty-points-display">
              <span className="loyalty-points-number">{points}</span>
              <span className="loyalty-points-label">{t('loyalty.points')}</span>
            </div>
            <div className="loyalty-tier">
              <Award size={16}/> {t('loyalty.tier')}: <strong>{tier}</strong>
            </div>
            <div className="loyalty-progress-wrap">
              <div className="loyalty-progress-bar">
                <div className="loyalty-progress-fill" style={{width: `${progress}%`}}></div>
              </div>
              <div className="loyalty-progress-text">
                <TrendingUp size={12}/> {pointsNeeded - points} {t('loyalty.toNext')} {nextTier}
              </div>
            </div>
            <div className="loyalty-perks">
              <div className="loyalty-perk"><Gift size={14}/> {t('loyalty.perk1')}</div>
              <div className="loyalty-perk"><Star size={14}/> {t('loyalty.perk2')}</div>
            </div>
            <button className="loyalty-cta" onClick={() => setExpanded(false)}>
              {t('loyalty.viewRewards')} <ChevronRight size={14}/>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
