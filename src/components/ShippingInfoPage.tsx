import React from 'react';
import { Page, TFunc, Country } from '../types';
import { Truck, Zap, Clock, Package, Shield, MapPin, Globe } from 'lucide-react';

interface ShippingInfoPageProps { lang: string; setPage: (p: Page) => void; t: TFunc; formatPrice: (n: number) => string; country: Country; }

export const ShippingInfoPage: React.FC<ShippingInfoPageProps> = ({ lang, setPage, t, formatPrice, country }) => {
  const isRTL = lang === 'ar';
  const countryName = lang === 'ar' ? country.nameAr : lang === 'it' ? country.nameIt : country.name;

  const methods = [
    { icon: Truck, title: 'standard', desc: 'standardDesc', price: country.shippingCost > 0 ? formatPrice(country.shippingCost) : t('shippingPage.free'), badge: country.shippingCost === 0 ? t('shippingPage.free') : null, accent: false, days: '5-7' },
    { icon: Zap, title: 'express', desc: 'expressDesc', price: formatPrice(country.shippingCost * 2.5), badge: null, accent: true, days: '2-3' },
    { icon: Clock, title: 'sameDay', desc: 'sameDayDesc', price: formatPrice(country.shippingCost * 4), badge: null, accent: true, days: '1' },
  ];

  return (
    <div className="info-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="info-page-header">
        <button className="back-btn" onClick={() => setPage('home')}>← {t('common.backToHome')}</button>
        <h1><Truck size={28} /> {t('shippingPage.title')}</h1>
        <p className="info-page-subtitle">{t('shippingPage.subtitle')}</p>
      </div>

      {/* Country indicator */}
      <div className="country-indicator">
        <Globe size={16} /> {countryName} {country.flag}
      </div>

      {/* Free shipping threshold */}
      <div className="shipping-banner">
        <Package size={20} />
        <span>{t('shippingPage.freeAbove')} <strong>{formatPrice(country.freeShippingMin)}</strong></span>
      </div>

      {/* Shipping Methods */}
      <h2 className="section-title">{t('shippingPage.methods')}</h2>
      <div className="shipping-methods-grid">
        {methods.map((m, i) => (
          <div key={i} className={`shipping-method-card ${m.accent ? 'accent' : ''}`}>
            <div className="method-icon"><m.icon size={24} /></div>
            <h3>{t(`shippingPage.${m.title}`)}</h3>
            <p className="method-desc">{t(`shippingPage.${m.desc}`)}</p>
            <div className="method-details">
              <span className="method-price">{m.price}</span>
              {m.badge && <span className="method-badge">{m.badge}</span>}
            </div>
            <span className="method-days">{t('shipping.deliveryTime', { days: m.days })}</span>
          </div>
        ))}
      </div>

      {/* Country shipping partners */}
      <h2 className="section-title">{t('shipping.countryProviders', { country: countryName })}</h2>
      <div className="shipping-partners">
        {country.shippingCompanies.map((company, i) => (
          <div key={i} className="partner-card">
            <Truck size={18} />
            <span>{company}</span>
          </div>
        ))}
      </div>

      {/* Coverage areas */}
      <div className="shipping-features">
        {[
          { icon: MapPin, key: 'coverage' },
          { icon: Shield, key: 'insurance' },
          { icon: Package, key: 'packaging' },
        ].map((f, i) => (
          <div key={i} className="shipping-feature-card">
            <f.icon size={22} />
            <h4>{t(`shippingPage.${f.key}`)}</h4>
            <p>{t(`shippingPage.${f.key}Desc`)}</p>
          </div>
        ))}
      </div>

      <div className="shipping-note">
        <p>{t('shipping.countryNote', { country: countryName })}</p>
      </div>

      <div className="info-page-footer">
        <p>{t('shippingPage.questions')}</p>
        <button className="btn-primary" onClick={() => setPage('contact')}>{t('shippingPage.contactUs')}</button>
      </div>
    </div>
  );
};
