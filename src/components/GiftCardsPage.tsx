import React, { useState } from 'react';
import { Gift, CreditCard, Search, Send, Check, ChevronRight } from 'lucide-react';
import { Page } from '../types';
import { giftCardDesigns } from '../data';

interface GiftCardsPageProps {
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
  formatPrice: (n: number) => string;
}

export const GiftCardsPage: React.FC<GiftCardsPageProps> = ({ setPage, t, formatPrice }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [customValue, setCustomValue] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [checkCode, setCheckCode] = useState('');
  const [showBalance, setShowBalance] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const values = [50, 100, 250, 500, 1000];
  const finalValue = selectedValue || parseInt(customValue) || 0;

  return (
    <div className="page-container">
      <div className="page-header center">
        <h1 className="page-title"><Gift size={24}/> {t('giftCards')}</h1>
        <p className="page-subtitle">{t('giftCardsSubtitle')}</p>
      </div>

      {purchased ? (
        <div className="gift-success">
          <div className="gift-success-icon"><Check size={48}/></div>
          <h2>{t('giftCardPurchased')}</h2>
          <p>{t('giftCardSentTo').replace('{amount}', formatPrice(finalValue)).replace('{email}', recipientEmail)}</p>
          <button className="btn-primary" onClick={() => setPurchased(false)}>{t('buyAnother')}</button>
        </div>
      ) : (
        <div className="gift-layout">
          <div className="gift-builder">
            <div className="gift-step">
              <h3>{t('chooseDesign')}</h3>
              <div className="gift-designs">
                {giftCardDesigns.map((d, i) => (
                  <button key={d.id} className={`gift-design-card${selectedDesign === i ? ' active' : ''}`}
                    onClick={() => setSelectedDesign(i)}>
                    <span className="gift-design-emoji">{d.emoji}</span>
                    <span>{t('giftDesign.' + d.design)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="gift-step">
              <h3>{t('selectAmount')}</h3>
              <div className="gift-values">
                {values.map(v => (
                  <button key={v} className={`gift-value-btn${selectedValue === v ? ' active' : ''}`}
                    onClick={() => { setSelectedValue(v); setCustomValue(''); }}>
                    {formatPrice(v)}
                  </button>
                ))}
              </div>
              <div className="gift-custom">
                <span>{t('orEnterCustomAmount')}</span>
                <input type="number" placeholder={t('customAmountPlaceholder')} value={customValue}
                  onChange={e => { setCustomValue(e.target.value); setSelectedValue(null); }}
                  className="form-input" min="10" max="10000" />
              </div>
            </div>

            <div className="gift-step">
              <h3>{t('recipientDetails')}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('recipientName')}</label>
                  <input type="text" placeholder={t('enterName')} value={recipientName}
                    onChange={e => setRecipientName(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                  <label>{t('recipientEmail')}</label>
                  <input type="email" placeholder={t('emailPlaceholder')} value={recipientEmail}
                    onChange={e => setRecipientEmail(e.target.value)} className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <label>{t('personalMessageOptional')}</label>
                <textarea placeholder={t('addPersonalMessage')} value={message}
                  onChange={e => setMessage(e.target.value)} className="form-textarea" rows={3} />
              </div>
            </div>

            <button className="btn-primary btn-lg" disabled={!finalValue || !recipientEmail}
              onClick={() => setPurchased(true)}>
              <Send size={16}/> {t('sendGiftCard')} — {finalValue ? formatPrice(finalValue) : formatPrice(0)}
            </button>
          </div>

          <div className="gift-preview-panel">
            <h3>{t('preview')}</h3>
            <div className="gift-card-preview">
              <div className="gift-card-visual">
                <span className="gift-card-logo">● NEFRA</span>
                <span className="gift-card-emoji-big">{giftCardDesigns[selectedDesign]?.emoji || '🎁'}</span>
                <span className="gift-card-amount">{finalValue ? formatPrice(finalValue) : '—'}</span>
                <span className="gift-card-type">{t('giftDesign.' + (giftCardDesigns[selectedDesign]?.design || 'premium'))}</span>
              </div>
              {recipientName && <p className="gift-card-to">{t('to')}: {recipientName}</p>}
              {message && <p className="gift-card-message">"{message}"</p>}
            </div>

            <div className="gift-balance-check">
              <h4>{t('checkGiftCardBalance')}</h4>
              <div className="gift-balance-form">
                <input placeholder={t('enterGiftCardCode')} value={checkCode}
                  onChange={e => setCheckCode(e.target.value)} className="form-input" />
                <button className="btn-outline" onClick={() => setShowBalance(true)}>{t('checkBalance')}</button>
              </div>
              {showBalance && checkCode && (
                <div className="gift-balance-result">
                  <CreditCard size={20}/>
                  <div>
                    <strong>{t('giftCard.currentBalance')}: {formatPrice(350)}</strong>
                    <p>{t('validUntil')} Dec 31, 2026</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
