import React, { useState } from 'react';
import { Megaphone, Mail, Zap, ShoppingCart, Users, Gift, Clock, TrendingUp, Eye, Edit2, Trash2, Plus, Check, ToggleRight, ToggleLeft } from 'lucide-react';
import { Page } from '../types';

interface MarketingPageProps {
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
  tc: (cat: string) => string;
  formatPrice: (n: number) => string;
}

type MarketingTab = 'newsletter' | 'flashsales' | 'popups' | 'abandoned' | 'referral';

export const MarketingPage: React.FC<MarketingPageProps> = ({ setPage, t, tc, formatPrice }) => {
  const [tab, setTab] = useState<MarketingTab>('newsletter');

  const tabs: { key: MarketingTab; label: string; icon: React.ReactNode }[] = [
    { key: 'newsletter', label: t('marketing.newsletter'), icon: <Mail size={16}/> },
    { key: 'flashsales', label: t('marketing.flashSales'), icon: <Zap size={16}/> },
    { key: 'popups', label: t('marketing.popups'), icon: <Eye size={16}/> },
    { key: 'abandoned', label: t('marketing.abandonedCart'), icon: <ShoppingCart size={16}/> },
    { key: 'referral', label: t('marketing.referrals'), icon: <Gift size={16}/> },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title"><Megaphone size={24}/> {t('marketing')}</h1>
          <p className="page-subtitle">{t('marketing.subtitle')}</p>
        </div>
        <div className="page-actions">
          <button className="btn-outline" onClick={() => setPage('dash')}>← {t('dashboard')}</button>
        </div>
      </div>

      <div className="marketing-tabs">
        {tabs.map(tb => (
          <button key={tb.key} className={`marketing-tab${tab === tb.key ? ' active' : ''}`}
            onClick={() => setTab(tb.key)}>{tb.icon} {tb.label}</button>
        ))}
      </div>

      <div className="marketing-content">
        {tab === 'newsletter' && (
          <div>
            <div className="marketing-stats">
              <div className="marketing-stat"><strong>2,847</strong><span>{t('marketing.totalSubscribers')}</span></div>
              <div className="marketing-stat"><strong>42.3%</strong><span>{t('marketing.openRate')}</span></div>
              <div className="marketing-stat"><strong>8.7%</strong><span>{t('marketing.clickRate')}</span></div>
              <div className="marketing-stat"><strong>12</strong><span>{t('marketing.campaignsSent')}</span></div>
            </div>
            <div className="marketing-section">
              <div className="section-header-inline">
                <h3>{t('marketing.recentCampaigns')}</h3>
                <button className="btn-sm-primary"><Plus size={14}/> {t('marketing.newCampaign')}</button>
              </div>
              <div className="marketing-table">
                {[
                  { name: t('springSaleAnnouncement'), sent: 'May 1, 2026', recipients: 2847, openRate: '45.2%', clicks: '9.8%' },
                  { name: t('newArrivalsElectronics'), sent: '2026/04/25', recipients: 2102, openRate: '38.7%', clicks: '7.2%' },
                  { name: t('ffLoyalty') + ' — ' + t('recentChanges'), sent: '2026/04/20', recipients: 1856, openRate: '52.1%', clicks: '12.5%' },
                ].map((c, i) => (
                  <div key={i} className="marketing-row">
                    <div className="marketing-row-main">
                      <strong>{c.name}</strong>
                      <span>{c.sent}</span>
                    </div>
                    <div className="marketing-row-stats">
                      <span>{c.recipients} {t('marketing.sent')}</span>
                      <span>{c.openRate} {t('marketing.opened')}</span>
                      <span>{c.clicks} {t('marketing.clicked')}</span>
                    </div>
                    <div className="marketing-row-actions">
                      <button className="btn-sm-outline"><Eye size={12}/></button>
                      <button className="btn-sm-outline"><Edit2 size={12}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'flashsales' && (
          <div>
            <div className="section-header-inline">
              <h3>{t('marketing.activeFlashSales')}</h3>
              <button className="btn-sm-primary"><Plus size={14}/> {t('marketing.createFlashSale')}</button>
            </div>
            <div className="flash-sales-grid">
              {[
                { name: t('electronicsWeekend'), discount: '30%', products: 45, starts: 'May 7', ends: 'May 9', active: true },
                { name: t('fashionFriday'), discount: '25%', products: 32, starts: 'May 10', ends: 'May 11', active: false },
                { name: t('summerClearance'), discount: '50%', products: 120, starts: 'Jun 1', ends: 'Jun 15', active: false },
              ].map((sale, i) => (
                <div key={i} className={`flash-sale-card${sale.active ? ' active' : ''}`}>
                  <div className="flash-sale-header">
                    <h4>{sale.name}</h4>
                    <button className={`flag-toggle${sale.active ? ' on' : ' off'}`}>
                      {sale.active ? <ToggleRight size={24}/> : <ToggleLeft size={24}/>}
                    </button>
                  </div>
                  <div className="flash-sale-details">
                    <span><Zap size={14}/> {sale.discount} {t('marketing.off')}</span>
                    <span>{sale.products} {t('marketing.products')}</span>
                    <span><Clock size={14}/> {sale.starts} — {sale.ends}</span>
                  </div>
                  {sale.active && <span className="flash-sale-live">● {t('marketing.liveNow')}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'popups' && (
          <div>
            <div className="section-header-inline">
              <h3>{t('marketing.marketingPopups')}</h3>
              <button className="btn-sm-primary"><Plus size={14}/> {t('marketing.createPopup')}</button>
            </div>
            <div className="popups-grid">
              {[
                { name: t('marketing.welcomeDiscount'), type: t('marketing.newVisitors'), trigger: t('marketing.triggerAfter5s'), discount: t('marketing.tenPercentOff'), views: 12450, conversions: 1870, active: true },
                { name: t('marketing.exitIntentOffer'), type: t('marketing.exitIntent'), trigger: t('marketing.triggerOnLeave'), discount: t('marketing.fifteenPercentOff'), views: 8230, conversions: 987, active: true },
                { name: t('marketing.cartReminder'), type: t('marketing.cartAbandonment'), trigger: t('marketing.triggerAfter30s'), discount: t('freeShipping'), views: 5620, conversions: 1124, active: false },
              ].map((popup, i) => (
                <div key={i} className={`popup-card${popup.active ? ' active' : ''}`}>
                  <div className="popup-header">
                    <h4>{popup.name}</h4>
                    <button className={`flag-toggle${popup.active ? ' on' : ' off'}`}>
                      {popup.active ? <ToggleRight size={24}/> : <ToggleLeft size={24}/>}
                    </button>
                  </div>
                  <div className="popup-details">
                    <span className="popup-type">{popup.type}</span>
                    <span>{t('marketing.trigger')}: {popup.trigger}</span>
                    <span>{t('marketing.offer')}: {popup.discount}</span>
                  </div>
                  <div className="popup-stats">
                    <div><strong>{popup.views.toLocaleString()}</strong><span>{t('marketing.views')}</span></div>
                    <div><strong>{popup.conversions.toLocaleString()}</strong><span>{t('marketing.conversions')}</span></div>
                    <div><strong>{(popup.conversions / popup.views * 100).toFixed(1)}%</strong><span>{t('marketing.rate')}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'abandoned' && (
          <div>
            <div className="marketing-stats">
              <div className="marketing-stat"><strong>347</strong><span>{t('marketing.abandonedCarts')}</span></div>
              <div className="marketing-stat"><strong>156</strong><span>{t('marketing.emailsSent')}</span></div>
              <div className="marketing-stat"><strong>67</strong><span>{t('marketing.recovered')}</span></div>
              <div className="marketing-stat"><strong>{formatPrice(89340)}</strong><span>{t('marketing.revenueRecovered')}</span></div>
            </div>
            <div className="marketing-section">
              <h3>{t('marketing.recoveryEmailsSequence')}</h3>
              <div className="email-sequence">
                {[
                  { step: 1, delay: t('marketing.oneHour'), subject: t('marketing.emailSubject1'), openRate: '55%', recovery: '23%' },
                  { step: 2, delay: t('marketing.twentyFourHours'), subject: t('marketing.emailSubject2'), openRate: '42%', recovery: '18%' },
                  { step: 3, delay: t('marketing.seventyTwoHours'), subject: t('marketing.emailSubject3'), openRate: '35%', recovery: '12%' },
                ].map(email => (
                  <div key={email.step} className="sequence-step">
                    <div className="sequence-step-num">{email.step}</div>
                    <div className="sequence-step-content">
                      <h4>{email.subject}</h4>
                      <span>{t('marketing.sentAfter')} {email.delay}</span>
                      <div className="sequence-stats">
                        <span>{email.openRate} {t('marketing.openRate')}</span>
                        <span>{email.recovery} {t('marketing.recoveryRate')}</span>
                      </div>
                    </div>
                    <button className="btn-sm-outline"><Edit2 size={12}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'referral' && (
          <div>
            <div className="marketing-stats">
              <div className="marketing-stat"><strong>234</strong><span>{t('marketing.activeReferrers')}</span></div>
              <div className="marketing-stat"><strong>567</strong><span>{t('marketing.referralsMade')}</span></div>
              <div className="marketing-stat"><strong>189</strong><span>{t('marketing.converted')}</span></div>
              <div className="marketing-stat"><strong>{formatPrice(42350)}</strong><span>{t('marketing.revenueGenerated')}</span></div>
            </div>
            <div className="referral-settings">
              <h3>{t('marketing.referralProgramSettings')}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('marketing.referrerReward')}</label>
                  <input className="form-input" defaultValue={`50 ${t("marketing.credit")}`} />
                </div>
                <div className="form-group">
                  <label>{t('marketing.refereeDiscount')}</label>
                  <input className="form-input" defaultValue="15% off first order" />
                </div>
                <div className="form-group">
                  <label>{t('marketing.minOrderAmount')}</label>
                  <input className="form-input" defaultValue={formatPrice(200)} />
                </div>
                <div className="form-group">
                  <label>{t('marketing.maxReferralsPerUser')}</label>
                  <input className="form-input" defaultValue={t('marketing.unlimited')} />
                </div>
              </div>
              <button className="btn-primary" style={{marginTop:'1rem'}}>{t('marketing.saveSettings')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
