import React, { useState } from 'react';
import { Page, TFunc, Country } from '../types';
import { HelpCircle, ChevronDown, ChevronUp, Search, CreditCard, Truck, RotateCcw, Shield, Globe } from 'lucide-react';

interface FAQPageProps { lang: string; setPage: (p: Page) => void; t: TFunc; country: Country; }

export const FAQPage: React.FC<FAQPageProps> = ({ lang, setPage, t, country }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const isRTL = lang === 'ar';
  
  const countryName = lang === 'ar' ? country.nameAr : lang === 'it' ? country.nameIt : country.name;

  const categories = [
    { id: 'all', label: t('faqPage.cat.all'), icon: HelpCircle },
    { id: 'orders', label: t('faqPage.cat.orders'), icon: Truck },
    { id: 'payments', label: t('faqPage.cat.payments'), icon: CreditCard },
    { id: 'returns', label: t('faqPage.cat.returns'), icon: RotateCcw },
    { id: 'security', label: t('faqPage.cat.account'), icon: Shield },
    { id: 'country', label: t('faq.countrySpecific', { country: countryName }), icon: Globe },
  ];

  const faqs = [
    { id: 'q1', cat: 'orders', q: t('faqPage.q1'), a: t('faqPage.a1') },
    { id: 'q2', cat: 'orders', q: t('faqPage.q2'), a: t('faqPage.a2') },
    { id: 'q3', cat: 'orders', q: t('faqPage.q3'), a: t('faqPage.a3') },
    { id: 'q4', cat: 'payments', q: t('faqPage.q4'), a: t('faqPage.a4') },
    { id: 'q5', cat: 'payments', q: t('faqPage.q5'), a: t('faqPage.a5') },
    { id: 'q6', cat: 'returns', q: t('faqPage.q6'), a: t('faqPage.a6') },
    { id: 'q7', cat: 'returns', q: t('faqPage.q7'), a: t('faqPage.a7') },
    { id: 'q8', cat: 'security', q: t('faqPage.q8'), a: t('faqPage.a8') },
    { id: 'q9', cat: 'security', q: t('faqPage.q9'), a: t('faqPage.a9') },
    { id: 'q10', cat: 'security', q: t('faqPage.q10'), a: t('faqPage.a10') },
    { id: 'qc1', cat: 'country', q: t('faq.paymentQuestion', { country: countryName }), a: t('faq.paymentAnswer', { methods: country.paymentMethods.join(', ') }) },
    { id: 'qc2', cat: 'country', q: t('faq.shippingQuestion', { country: countryName }), a: t('shipping.deliveryTime', { days: '3-7' }) + '. ' + t('shipping.countryProviders', { country: countryName }) + ': ' + country.shippingCompanies.join(', ') },
    { id: 'qc3', cat: 'country', q: t('faq.returnQuestion', { country: countryName }), a: t('faq.returnAnswer', { days: String(country.returnDays) }) + (country.code === 'IT' ? '. ' + t('returns.euRights') : '') },
    { id: 'qc4', cat: 'country', q: t('faq.taxQuestion', { country: countryName }), a: country.taxRate > 0 ? t('faq.taxAnswer', { taxName: country.taxName, rate: String(country.taxRate) }) : t('faq.noTax') },
  ];

  const filtered = faqs.filter(f => {
    const matchCat = activeCat === 'all' || f.cat === activeCat;
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="info-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="info-page-header">
        <button className="back-btn" onClick={() => setPage('home')}>← {t('common.backToHome')}</button>
        <h1><HelpCircle size={28} /> {t('faqPage.title')}</h1>
        <p className="info-page-subtitle">{t('faqPage.subtitle')}</p>
      </div>

      {/* Search */}
      <div className="faq-search">
        <Search size={18} />
        <input type="text" placeholder={t('faqPage.search')} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Categories */}
      <div className="faq-categories">
        {categories.map(c => (
          <button key={c.id} className={`faq-cat-btn ${activeCat === c.id ? 'active' : ''}`} onClick={() => setActiveCat(c.id)}>
            <c.icon size={16} /> {c.label}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="faq-list">
        {filtered.map(f => (
          <div key={f.id} className={`faq-item ${openId === f.id ? 'open' : ''} ${f.cat === 'country' ? 'country-faq' : ''}`}>
            <button className="faq-question" onClick={() => setOpenId(openId === f.id ? null : f.id)}>
              <span>{f.q}</span>
              {openId === f.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {openId === f.id && <div className="faq-answer">{f.a}</div>}
          </div>
        ))}
        {filtered.length === 0 && <p className="no-results">{t('faqPage.noResults')}</p>}
      </div>

      <div className="info-page-footer">
        <p>{t('faqPage.stillNeedHelp')}</p>
        <button className="btn-primary" onClick={() => setPage('contact')}>{t('faqPage.contactTeam')}</button>
      </div>
    </div>
  );
};
