import React, { useState, useEffect } from 'react';
import { X, Mail, Gift } from 'lucide-react';
import { TFunc } from '../types';

interface NewsletterPopupProps {
  t: TFunc;
  lang: string;
}

export const NewsletterPopup: React.FC<NewsletterPopupProps> = ({ t, lang }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('nefra_newsletter_dismissed');
    const subscribed = localStorage.getItem('nefra_newsletter_subscribed');
    if (dismissed || subscribed) return;
    const timer = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('nefra_newsletter_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    localStorage.setItem('nefra_newsletter_subscribed', email);
    setTimeout(() => { setShow(false); }, 3000);
  };

  if (!show) return null;

  return (
    <div className="newsletter-overlay" onClick={handleClose}>
      <div className="newsletter-popup" dir={lang === 'ar' ? 'rtl' : 'ltr'} onClick={e => e.stopPropagation()}>
        <button className="newsletter-close" onClick={handleClose}><X size={20}/></button>
        <div className="newsletter-icon"><Gift size={36}/></div>
        {!submitted ? (
          <>
            <h2 className="newsletter-title">{t('newsletter.title')}</h2>
            <p className="newsletter-desc">{t('newsletter.desc')}</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="newsletter-input-wrap">
                <Mail size={18} className="newsletter-mail-icon"/>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')} className="newsletter-input" required />
              </div>
              <button type="submit" className="newsletter-btn">{t('newsletter.subscribe')}</button>
            </form>
            <p className="newsletter-note">{t('newsletter.note')}</p>
          </>
        ) : (
          <div className="newsletter-success">
            <h2 className="newsletter-title">🎉 {t('newsletter.thanks')}</h2>
            <p className="newsletter-desc">{t('newsletter.confirmMsg')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
