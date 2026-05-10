import React from 'react';
import { Page, TFunc, Country } from '../types';
import { RotateCcw, CheckCircle, XCircle, AlertTriangle, Clock, Globe, Shield } from 'lucide-react';

interface ReturnsPolicyPageProps { lang: string; setPage: (p: Page) => void; t: TFunc; country: Country; }

export const ReturnsPolicyPage: React.FC<ReturnsPolicyPageProps> = ({ lang, setPage, t, country }) => {
  const isRTL = lang === 'ar';
  const countryName = lang === 'ar' ? country.nameAr : lang === 'it' ? country.nameIt : country.name;

  const steps = [
    { num: '1', key: 'step1' },
    { num: '2', key: 'step2' },
    { num: '3', key: 'step3' },
    { num: '4', key: 'step4' },
  ];

  return (
    <div className="info-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="info-page-header">
        <button className="back-btn" onClick={() => setPage('home')}>← {t('common.backToHome')}</button>
        <h1><RotateCcw size={28} /> {t('returnsPage.title')}</h1>
        <p className="info-page-subtitle">{t('returnsPage.subtitle')}</p>
      </div>

      {/* Country indicator */}
      <div className="country-indicator">
        <Globe size={16} /> {t('returns.countryPolicy', { country: countryName })} {country.flag}
      </div>

      {/* Return window - dynamic per country */}
      <div className="return-window-banner">
        <Clock size={24} />
        <div>
          <h3>{t('returns.returnWindow', { days: String(country.returnDays) })}</h3>
          <p>{t('returns.returnWindowDesc', { days: String(country.returnDays) })}</p>
        </div>
      </div>

      {/* EU Rights notice (Italy only) */}
      {country.code === 'IT' && (
        <div className="eu-rights-notice">
          <Shield size={20} />
          <div>
            <strong>{t('returns.euRights')}</strong>
            <p>{t('returns.localLaw')}</p>
          </div>
        </div>
      )}

      {/* Conditions */}
      <h2 className="section-title">{t('returnsPage.conditions')}</h2>
      <div className="returns-conditions">
        <div className="condition-card accept">
          <CheckCircle size={20} />
          <div>
            <h4>{t('returnsPage.accepted')}</h4>
            <ul>
              {['cond1', 'cond2', 'cond3', 'cond4'].map(k => (
                <li key={k}>{t(`returnsPage.${k}`)}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="condition-card reject">
          <XCircle size={20} />
          <div>
            <h4>{t('returnsPage.notAccepted')}</h4>
            <ul>
              {['noCond1', 'noCond2', 'noCond3', 'noCond4'].map(k => (
                <li key={k}>{t(`returnsPage.${k}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Legal requirements */}
      {country.legalRequirements.length > 0 && (
        <>
          <h2 className="section-title">{t('returns.localLaw')}</h2>
          <div className="legal-requirements">
            {country.legalRequirements.map((req, i) => (
              <div key={i} className="legal-item">
                <Shield size={16} />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Steps */}
      <h2 className="section-title">{t('returnsPage.howToReturn')}</h2>
      <div className="return-steps">
        {steps.map(s => (
          <div key={s.num} className="return-step">
            <div className="step-number">{s.num}</div>
            <div>
              <h4>{t(`returnsPage.${s.key}Title`)}</h4>
              <p>{t(`returnsPage.${s.key}Desc`)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Damaged items */}
      <div className="damaged-notice">
        <AlertTriangle size={20} />
        <div>
          <h4>{t('returnsPage.damaged')}</h4>
          <p>{t('returnsPage.damagedDesc')}</p>
        </div>
      </div>

      <div className="info-page-footer">
        <p>{t('returnsPage.needHelp')}</p>
        <button className="btn-primary" onClick={() => setPage('contact')}>{t('returnsPage.contactUs')}</button>
      </div>
    </div>
  );
};
