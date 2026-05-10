import React from 'react';
import { MapPin, Phone, Mail, CreditCard, Shield, Truck, Award } from 'lucide-react';
import { Page, Theme, TFunc } from '../types';

interface FooterProps {
  setPage: (p: Page) => void;
  theme?: Theme;
  t: TFunc;
}

export const Footer: React.FC<FooterProps> = ({ setPage, theme = 'elegant-dark', t }) => {
  const logoSrc = '/assets/logo-v2.png';
  return (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-grid">
        <div className="footer-col">
          <h3 className="footer-heading"><img src={logoSrc} alt="NEFRA" className="logo-img-footer" /></h3>
          <p className="footer-desc">{t('footerDesc')}</p>
          <div className="footer-contact">
            <span><MapPin size={14}/> {t('footerAddress')}</span>
            <span><Phone size={14}/> 800-123-4567</span>
            <span><Mail size={14}/> support@nefra.com</span>
          </div>
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">{t('quickLinks')}</h4>
          <button className="footer-link" onClick={() => setPage('shop')}>{t('shopAll')}</button>
          <button className="footer-link" onClick={() => setPage('giftcards')}>{t('giftCards')}</button>
          <button className="footer-link" onClick={() => setPage('track')}>{t('trackOrder')}</button>
          <button className="footer-link" onClick={() => setPage('account')}>{t('myAccount')}</button>
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">{t('customerService')}</h4>
          <button className="footer-link" onClick={() => setPage('faq')}>{t('faq')}</button>
          <button className="footer-link" onClick={() => setPage('shipping-info')}>{t('shippingInfo')}</button>
          <button className="footer-link" onClick={() => setPage('returns-policy')}>{t('returnsPolicy')}</button>
          <button className="footer-link" onClick={() => setPage('size-guide')}>{t('sizeGuide')}</button>
          <button className="footer-link" onClick={() => setPage('contact')}>{t('contactUs')}</button>
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">{t('weAccept')}</h4>
          <div className="footer-payments">
            <span className="payment-badge"><CreditCard size={14}/> Visa</span>
            <span className="payment-badge"><CreditCard size={14}/> Mastercard</span>
            <span className="payment-badge"><CreditCard size={14}/> Apple Pay</span>
            <span className="payment-badge"><CreditCard size={14}/> Mada</span>
          </div>
          <div className="footer-badges">
            <span><Shield size={14}/> {t('sslSecured')}</span>
            <span><Truck size={14}/> {t('fastDelivery')}</span>
            <span><Award size={14}/> {t('trustedStore')}</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t('copyright')}</p>
      </div>
    </div>
  </footer>
); };
