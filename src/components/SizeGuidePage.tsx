import React, { useState } from 'react';
import { Page, TFunc, Country } from '../types';
import { Ruler, Globe } from 'lucide-react';

interface SizeGuidePageProps { lang: string; setPage: (p: Page) => void; t: TFunc; country: Country; }

export const SizeGuidePage: React.FC<SizeGuidePageProps> = ({ lang, setPage, t, country }) => {
  const isRTL = lang === 'ar';
  const [activeTab, setActiveTab] = useState('clothing');
  const countryName = lang === 'ar' ? country.nameAr : lang === 'it' ? country.nameIt : country.name;

  const tabs = [
    { id: 'clothing', label: t('sizePage.clothing') },
    { id: 'shoes', label: t('sizePage.shoes') },
    { id: 'watches', label: t('sizePage.watches') },
    { id: 'bags', label: t('sizePage.bags') },
  ];

  // Clothing sizes - EU standard (used across all 5 countries)
  const clothingSizes = [
    { size: 'XS', eu: '42', chest: '84-88', waist: '70-74', hips: '88-92' },
    { size: 'S', eu: '44-46', chest: '88-92', waist: '74-78', hips: '92-96' },
    { size: 'M', eu: '48-50', chest: '96-100', waist: '82-86', hips: '100-104' },
    { size: 'L', eu: '52-54', chest: '104-108', waist: '90-94', hips: '108-112' },
    { size: 'XL', eu: '56-58', chest: '112-116', waist: '98-102', hips: '116-120' },
  ];

  const shoeSizes = [
    { eu: '39', uk: '5.5', us: '6.5', cm: '24.5' },
    { eu: '40', uk: '6.5', us: '7.5', cm: '25.5' },
    { eu: '41', uk: '7', us: '8', cm: '26' },
    { eu: '42', uk: '8', us: '9', cm: '27' },
    { eu: '43', uk: '9', us: '10', cm: '27.5' },
    { eu: '44', uk: '9.5', us: '10.5', cm: '28.5' },
    { eu: '45', uk: '10.5', us: '11.5', cm: '29' },
  ];

  const watchSizes = [
    { name: t('sizePage.small'), mm: '36-38mm', wrist: '14-16 cm' },
    { name: t('sizePage.medium'), mm: '39-41mm', wrist: '16-18 cm' },
    { name: t('sizePage.large'), mm: '42-44mm', wrist: '18-20 cm' },
    { name: t('sizePage.extraLarge'), mm: '45-47mm', wrist: '20-22 cm' },
  ];

  const bagSizes = [
    { type: t('sizePage.mini'), dims: '15×10×5 cm' },
    { type: t('sizePage.small'), dims: '22×15×8 cm' },
    { type: t('sizePage.medium'), dims: '30×22×12 cm' },
    { type: t('sizePage.large'), dims: '40×30×15 cm' },
    { type: t('sizePage.tote'), dims: '33×28×15 cm' },
  ];

  return (
    <div className="info-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="info-page-header">
        <button className="back-btn" onClick={() => setPage('home')}>← {t('common.backToHome')}</button>
        <h1><Ruler size={28} /> {t('sizePage.title')}</h1>
        <p className="info-page-subtitle">{t('sizePage.subtitle')}</p>
      </div>

      {/* Country indicator - sizes may vary */}
      <div className="country-indicator">
        <Globe size={16} /> {countryName} {country.flag} — {t('sizePage.euStandard')}
      </div>

      {/* Tabs */}
      <div className="size-tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`size-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="size-table-container">
        {activeTab === 'clothing' && (
          <table className="size-table">
            <thead>
              <tr>
                <th>{t('sizePage.size')}</th>
                <th>{t('sizePage.euSize')}</th>
                <th>{t('sizePage.chest')} (cm)</th>
                <th>{t('sizePage.waist')} (cm)</th>
                <th>{t('sizePage.hips')} (cm)</th>
              </tr>
            </thead>
            <tbody>
              {clothingSizes.map(s => (
                <tr key={s.size}><td><strong>{s.size}</strong></td><td>{s.eu}</td><td>{s.chest}</td><td>{s.waist}</td><td>{s.hips}</td></tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'shoes' && (
          <table className="size-table">
            <thead>
              <tr><th>EU</th><th>UK</th><th>US</th><th>CM</th></tr>
            </thead>
            <tbody>
              {shoeSizes.map(s => (
                <tr key={s.eu}><td><strong>{s.eu}</strong></td><td>{s.uk}</td><td>{s.us}</td><td>{s.cm}</td></tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'watches' && (
          <table className="size-table">
            <thead>
              <tr><th>{t('sizePage.size')}</th><th>{t('sizePage.caseDiameter')}</th><th>{t('sizePage.wristSize')}</th></tr>
            </thead>
            <tbody>
              {watchSizes.map(s => (
                <tr key={s.name}><td><strong>{s.name}</strong></td><td>{s.mm}</td><td>{s.wrist}</td></tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'bags' && (
          <table className="size-table">
            <thead>
              <tr><th>{t('sizePage.type')}</th><th>{t('sizePage.dimensions')}</th></tr>
            </thead>
            <tbody>
              {bagSizes.map(s => (
                <tr key={s.type}><td><strong>{s.type}</strong></td><td>{s.dims}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="size-tips">
        <h3>{t('sizePage.measurementTips')}</h3>
        <ul>
          {['tip1', 'tip2', 'tip3'].map(k => (
            <li key={k}>{t(`sizePage.${k}`)}</li>
          ))}
        </ul>
      </div>

      <div className="info-page-footer">
        <p>{t('sizePage.needHelp')}</p>
        <button className="btn-primary" onClick={() => setPage('contact')}>{t('sizePage.contactUs')}</button>
      </div>
    </div>
  );
};
