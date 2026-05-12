import React, { useState } from 'react';
import { Users, Copy, Check, Gift } from 'lucide-react';
import { TFunc } from '../types';

interface ReferralBannerProps {
  t: TFunc;
}

export const ReferralBanner: React.FC<ReferralBannerProps> = ({ t }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'NEFRA-VIP-2024';
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <section className="section referral-section">
      <div className="section-inner">
        <div className="referral-banner">
          <div className="referral-icon"><Users size={36}/></div>
          <div className="referral-content">
            <h3>{t('referral.title')}</h3>
            <p>{t('referral.desc')}</p>
            <div className="referral-code-row">
              <div className="referral-code">{referralCode}</div>
              <button className="referral-copy-btn" onClick={handleCopy}>
                {copied ? <><Check size={14}/> {t('referral.copied')}</> : <><Copy size={14}/> {t('referral.copy')}</>}
              </button>
            </div>
          </div>
          <div className="referral-reward">
            <Gift size={24}/>
            <span>500 {t('loyalty.points')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
