import React from 'react';
import { MapPin, Phone, Mail, CreditCard, Shield, Truck, Award, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { Page, Theme, TFunc, Country, SocialLink, FeatureFlag, FooterLink } from '../types';

interface FooterProps {
  setPage: (p: Page) => void;
  theme?: Theme;
  t: TFunc;
  lang?: string;
  country?: Country;
  socialLinks?: SocialLink[];
  featureFlags?: FeatureFlag[];
  footerLinks?: FooterLink[];
}

const SocialIcon: React.FC<{icon: string; size?: number}> = ({icon, size = 18}) => {
  switch(icon) {
    case 'instagram': return <Instagram size={size}/>;
    case 'facebook': return <Facebook size={size}/>;
    case 'youtube': return <Youtube size={size}/>;
    case 'twitter': return <Twitter size={size}/>;
    default: return <span style={{fontSize: size}}>{icon === 'tiktok' ? '♪' : icon === 'snapchat' ? '👻' : '🔗'}</span>;
  }
};

const PaymentIcon: React.FC<{method: string}> = ({method}) => {
  const m = method.toLowerCase();
  let emoji = '💳';
  if (m.includes('visa') || m.includes('master')) emoji = '💳';
  else if (m.includes('apple')) emoji = '🍎';
  else if (m.includes('mada')) emoji = '🏦';
  else if (m.includes('tabby') || m.includes('tamara')) emoji = '🔄';
  else if (m.includes('stc')) emoji = '📱';
  else if (m.includes('cash')) emoji = '💵';
  else if (m.includes('paypal')) emoji = '🅿️';
  else if (m.includes('stripe') || m.includes('nexi')) emoji = '⚡';
  else if (m.includes('fawry')) emoji = '🏪';
  else if (m.includes('vodafone')) emoji = '📲';
  else if (m.includes('naps') || m.includes('qpay')) emoji = '🏧';
  else if (m.includes('satispay')) emoji = '✅';
  else if (m.includes('paymob')) emoji = '📳';
  return <span className="payment-icon-emoji">{emoji}</span>;
};

export const Footer: React.FC<FooterProps> = ({ setPage, theme = 'elegant-dark', t, lang = 'en', country, socialLinks, featureFlags, footerLinks }) => {
  const logoSrc = './assets/logo-v2.png';
  const phone = country?.phone ? `${country.phone} 800-NEFRA` : '800-123-4567';
  const email = country?.email || 'support@nefra.com';
  const address = country?.address || t('footerAddress');
  const payments = country?.paymentMethods || ['Visa', 'Mastercard', 'Apple Pay'];
  const activeSocials = (socialLinks || []).filter(s => s.enabled);
  const ff = (id: string) => !featureFlags || featureFlags.find(f => f.id === id)?.enabled !== false;

  return (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-grid">
        <div className="footer-col">
          <h3 className="footer-heading"><img src={logoSrc} alt="NEFRA" className="logo-img-footer" /></h3>
          <p className="footer-desc">{t('footerDesc')}</p>
          <div className="footer-contact">
            <span><MapPin size={14}/> {address}</span>
            <span><Phone size={14}/> {phone}</span>
            <span><Mail size={14}/> {email}</span>
          </div>
          {/* Social Media Links */}
          {ff('ff_social_links') && activeSocials.length > 0 && (
            <div className="footer-social">
              {activeSocials.map(s => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link" title={s.platform}>
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">{t('quickLinks')}</h4>
          <button className="footer-link" onClick={() => setPage('shop')}>{t('shopAll')}</button>
          {ff('ff_gift_cards') && <button className="footer-link" onClick={() => setPage('giftcards')}>{t('giftCards')}</button>}
          <button className="footer-link" onClick={() => setPage('account')}>{t('myAccount')}</button>
          {ff('ff_wishlist') && <button className="footer-link" onClick={() => setPage('wishlist')}>{t('wishlist')}</button>}
          {ff('ff_compare') && <button className="footer-link" onClick={() => setPage('compare')}>{t('compare')}</button>}
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">{t('customerService')}</h4>
          {footerLinks && footerLinks.length > 0 ? (
            footerLinks.filter(fl => fl.enabled).map(fl => (
              <button key={fl.id} className="footer-link" onClick={() => setPage(fl.page)}>
                {lang === 'ar' ? fl.labelAr : lang === 'it' ? fl.labelIt : fl.labelEn}
              </button>
            ))
          ) : (<>
            {ff('ff_faq_page') && <button className="footer-link" onClick={() => setPage('faq')}>{t('faq')}</button>}
            {ff('ff_shipping_page') && <button className="footer-link" onClick={() => setPage('shipping-info')}>{t('shippingInfo')}</button>}
            {ff('ff_returns_page') && <button className="footer-link" onClick={() => setPage('returns-policy')}>{t('returnsPolicy')}</button>}
            {ff('ff_size_guide') && <button className="footer-link" onClick={() => setPage('size-guide')}>{t('sizeGuide')}</button>}
            {ff('ff_contact_page') && <button className="footer-link" onClick={() => setPage('contact')}>{t('contactUs')}</button>}
          </>)}
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">{t('weAccept')}</h4>
          {/* Payment Icons */}
          {ff('ff_payment_icons') ? (
            <div className="footer-payments-enhanced">
              {payments.map(p => (
                <span key={p} className="payment-badge-enhanced">
                  <PaymentIcon method={p} />
                  <span className="payment-label">{p}</span>
                </span>
              ))}
            </div>
          ) : (
            <div className="footer-payments">
              {payments.slice(0, 4).map(p => (
                <span key={p} className="payment-badge"><CreditCard size={14}/> {p}</span>
              ))}
            </div>
          )}
          <div className="footer-badges">
            <span><Shield size={14}/> {t('sslSecured')}</span>
            <span><Truck size={14}/> {t('fastDelivery')}</span>
            <span><Award size={14}/> {t('trustedStore')}</span>
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      {ff('ff_newsletter') && (
        <div className="footer-newsletter">
          <h3>{t('newsletter.title')}</h3>
          <p>{t('newsletter.subtitle')}</p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); const inp = (e.target as HTMLFormElement).querySelector('input'); if(inp) { inp.value = ''; } }}>
            <input type="email" placeholder={t('newsletter.placeholder')} required />
            <button type="submit">{t('newsletter.subscribe')}</button>
          </form>
        </div>
      )}

      <div className="footer-bottom">
        <p>{t('copyright')}</p>
        {country && <p className="footer-country-note">{country.flag} {t('servingIn')} {country.name}</p>}
      </div>
    </div>
  </footer>
); };
