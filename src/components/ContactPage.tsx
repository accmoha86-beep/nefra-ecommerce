import React, { useState } from 'react';
import { Page, TFunc, Country } from '../types';
import { Mail, Phone, MapPin, Clock, Send, Globe, MessageCircle, Headphones } from 'lucide-react';

interface ContactPageProps { lang: string; setPage: (p: Page) => void; t: TFunc; country: Country; }

export const ContactPage: React.FC<ContactPageProps> = ({ lang, setPage, t, country }) => {
  const isRTL = lang === 'ar';
  const countryName = lang === 'ar' ? country.nameAr : lang === 'it' ? country.nameIt : country.name;
  const address = lang === 'ar' ? country.addressAr : lang === 'it' ? country.addressIt : country.address;
  const hours = lang === 'ar' ? country.supportHoursAr : lang === 'it' ? country.supportHoursIt : country.supportHours;

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const contactCards = [
    { icon: Phone, label: t('contact.localPhone'), value: country.phone, accent: true },
    { icon: Mail, label: t('contact.countryEmail', { country: countryName }), value: country.email, accent: false },
    { icon: MapPin, label: t('contact.officeAddress'), value: address, accent: false },
    { icon: Clock, label: t('contact.workingHours'), value: hours, accent: false },
    { icon: MessageCircle, label: t('contactPage.liveChat'), value: t('contactPage.liveChatDesc'), accent: true },
    { icon: Headphones, label: t('contact.emergencySupport'), value: t('contactPage.emergencyDesc'), accent: false },
  ];

  return (
    <div className="info-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="info-page-header">
        <button className="back-btn" onClick={() => setPage('home')}>← {t('common.backToHome')}</button>
        <h1><Mail size={28} /> {t('contactPage.title')}</h1>
        <p className="info-page-subtitle">{t('contactPage.subtitle')}</p>
      </div>

      {/* Country office indicator */}
      <div className="country-indicator">
        <Globe size={16} /> {t('contact.countryOffice', { country: countryName })} {country.flag}
      </div>

      <div className="contact-layout">
        {/* Contact info cards */}
        <div className="contact-cards-grid">
          {contactCards.map((c, i) => (
            <div key={i} className={`contact-info-card ${c.accent ? 'accent' : ''}`}>
              <c.icon size={22} />
              <div>
                <span className="contact-label">{c.label}</span>
                <span className="contact-value">{c.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="contact-form-section">
          <h2>{t('contactPage.sendMessage')}</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>{t('contactPage.name')}</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder={t('contactPage.namePlaceholder')} required />
              </div>
              <div className="form-group">
                <label>{t('contactPage.email')}</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder={t('contactPage.emailPlaceholder')} required />
              </div>
            </div>
            <div className="form-group">
              <label>{t('contactPage.subject')}</label>
              <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder={t('contactPage.subjectPlaceholder')} required />
            </div>
            <div className="form-group">
              <label>{t('contactPage.message')}</label>
              <textarea rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder={t('contactPage.messagePlaceholder')} required />
            </div>
            <button type="submit" className="btn-primary submit-btn">
              {sent ? '✓ ' + t('contactPage.sent') : <><Send size={16} /> {t('contactPage.send')}</>}
            </button>
          </form>
        </div>
      </div>

      {/* Payment methods available in this country */}
      <div className="country-payments-section">
        <h3>{t('faq.paymentQuestion', { country: countryName })}</h3>
        <div className="payment-methods-list">
          {country.paymentMethods.map((pm, i) => (
            <span key={i} className="payment-method-tag">{pm}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
