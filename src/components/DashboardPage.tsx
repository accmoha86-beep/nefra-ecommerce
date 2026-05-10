import React, { useState } from 'react';
import { TrendingUp, Users, Package, DollarSign, Eye, ShoppingBag, ArrowUp, ArrowDown, BarChart3, Settings, Sliders, Megaphone, Palette, Globe, Bell, Shield, Truck, CreditCard, Mail, Image, Type, MapPin, Clock, ToggleLeft, ToggleRight, Check, ChevronRight } from 'lucide-react';
import { Page, Theme } from '../types';
import { sampleOrders, chartData } from '../data';

interface DashboardPageProps {
  setPage: (p: Page) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: (key: string) => string;
  lang: string;
  getProductName: (p: any) => string;
  formatPrice: (n: number) => string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({lang, setPage, theme, setTheme, t, getProductName, formatPrice }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [storeName, setStoreName] = useState('MAISON Store');
  const [storeEmail, setStoreEmail] = useState('info@maison-store.com');
  const [storePhone, setStorePhone] = useState('+966 50 123 4567');
  const [currency, setCurrency] = useState('SAR');
  const [language, setLanguage] = useState('ar');
  const [freeShipMin, setFreeShipMin] = useState('500');
  const [enableReviews, setEnableReviews] = useState(true);
  const [enableWishlist, setEnableWishlist] = useState(true);
  const [enableCompare, setEnableCompare] = useState(true);
  const [enableBlog, setEnableBlog] = useState(true);
  const [enableGiftCards, setEnableGiftCards] = useState(true);
  const [enableLoyalty, setEnableLoyalty] = useState(true);
  const [enableNewsletter, setEnableNewsletter] = useState(true);
  const [enableWhatsApp, setEnableWhatsApp] = useState(true);
  const [enableCookieBar, setEnableCookieBar] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const maxChart = Math.max(...chartData.map(d => d.value));

  const stats = [
    { label: t('totalRevenue'), value: formatPrice(847230), change: '+12.5%', up: true, icon: <DollarSign size={20}/> },
    { label: t('orders'), value: '1,284', change: '+8.2%', up: true, icon: <ShoppingBag size={20}/> },
    { label: t('customers'), value: '3,621', change: '+15.3%', up: true, icon: <Users size={20}/> },
    { label: t('conversionRate'), value: '3.42%', change: '-0.8%', up: false, icon: <TrendingUp size={20}/> },
  ];

  const statusColor = (s: string) => {
    switch(s) {
      case 'delivered': return 'status-delivered';
      case 'shipped': return 'status-shipped';
      case 'pending': return 'status-pending';
      case 'returned': return 'status-returned';
      default: return '';
    }
  };

  const themeOptions: { id: Theme; name: string; desc: string; emoji: string; colors: string[] }[] = [
    { id: 'elegant-dark', name: t('theme.elegantDark'), desc: t('theme.elegantDarkDesc'), emoji: '🖤', colors: ['#1A1A1A', '#D4A020', '#FFFFFF'] },
    { id: 'modern-soft', name: t('theme.modernSoft'), desc: t('theme.modernSoftDesc'), emoji: '🌊', colors: ['#3D4F5F', '#4DB8C7', '#FAFBFC'] },
    { id: 'royal-premium', name: t('theme.royalPremium'), desc: t('theme.royalPremiumDesc'), emoji: '👑', colors: ['#1E2A4A', '#C8962D', '#FFFFFF'] },
    { id: 'pure-minimalist', name: t('theme.pureMinimalist'), desc: t('theme.pureMinimalistDesc'), emoji: '⬛', colors: ['#000000', '#FFFFFF', '#F5F5F5'] },
    { id: 'natural-organic', name: t('theme.naturalOrganic'), desc: t('theme.naturalOrganicDesc'), emoji: '🌿', colors: ['#0D8674', '#48BC64', '#FFF9F5'] },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const ToggleSwitch: React.FC<{ on: boolean; onToggle: () => void; label: string }> = ({ on, onToggle, label }) => (
    <div className="settings-toggle-row">
      <span className="settings-toggle-label">{label}</span>
      <button className={`settings-toggle ${on ? 'on' : 'off'}`} onClick={onToggle}>
        <span className="settings-toggle-track">
          <span className="settings-toggle-thumb" />
        </span>
        <span className="settings-toggle-text">{on ? t('toggleOn') : t('toggleOff')}</span>
      </button>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title"><BarChart3 size={24}/> {t('adminDashboard')}</h1>
          <p className="page-subtitle">{t('dashboardSubtitle')}</p>
        </div>
        <div className="page-actions">
          <button className={`btn-outline ${activeTab === 'overview' ? 'btn-active' : ''}`} onClick={() => setActiveTab('overview')}>
            <BarChart3 size={14}/> {t('overview')}
          </button>
          <button className={`btn-outline ${activeTab === 'settings' ? 'btn-active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={14}/> {t('storeSettings')}
          </button>
          <button className="btn-outline" onClick={() => setPage('flags')}>
            <Sliders size={14}/> {t('featureFlags')}
          </button>
          <button className="btn-outline" onClick={() => setPage('marketing')}>
            <Megaphone size={14}/> {t('marketing')}
          </button>
          <button className="btn-outline" onClick={() => setPage('admin-users')}>
            <Shield size={16}/> {t('adminUsers')}
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-info">
                  <span className="stat-label">{s.label}</span>
                  <span className="stat-value">{s.value}</span>
                  <span className={`stat-change ${s.up ? 'up' : 'down'}`}>
                    {s.up ? <ArrowUp size={12}/> : <ArrowDown size={12}/>} {s.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="dash-grid">
            {/* Revenue Chart */}
            <div className="dash-card wide">
              <div className="dash-card-header">
                <h3>{t('revenueOverview')}</h3>
                <select className="dash-select">
                  <option>{t('last12Months')}</option>
                  <option>{t('last6Months')}</option>
                  <option>{t('last30Days')}</option>
                </select>
              </div>
              <div className="chart">
                {chartData.map((d, i) => (
                  <div key={i} className="chart-col">
                    <div className="chart-bar-wrap">
                      <div className="chart-bar" style={{ height: `${(d.value / maxChart) * 100}%` }}>
                        <span className="chart-tooltip">{d.value}K</span>
                      </div>
                    </div>
                    <span className="chart-label">{t('month.' + d.label.toLowerCase()) || d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="dash-card">
              <div className="dash-card-header">
                <h3>{t('recentOrders')}</h3>
                <button className="dash-link">{t('viewAll')}</button>
              </div>
              <div className="dash-orders">
                {sampleOrders.slice(0, 5).map(order => (
                  <div key={order.id} className="dash-order-row">
                    <div className="dash-order-info">
                      <strong>{order.id}</strong>
                      <span>{order.customer}</span>
                    </div>
                    <div className="dash-order-right">
                      <span className="dash-order-amount">{formatPrice(order.amount)}</span>
                      <span className={`order-status-sm ${statusColor(order.status)}`}>{t('status.' + order.status)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="dash-card">
              <div className="dash-card-header">
                <h3>{t('topProducts')}</h3>
                <button className="dash-link">{t('viewAll')}</button>
              </div>
              <div className="dash-top-products">
                {[
                  { name: getProductName({name:'iPhone 16 Pro Max',nameAr:'آيفون 16 برو ماكس',nameIt:'iPhone 16 Pro Max'}), sales: 156, revenue: formatPrice(810444) },
                  { name: getProductName({name:'MacBook Pro 16" M3 Max',nameAr:'ماك بوك برو 16 M3 Max',nameIt:'MacBook Pro 16" M3 Max'}), sales: 89, revenue: formatPrice(1334911) },
                  { name: getProductName({name:'AirPods Pro 2',nameAr:'إيربودز برو 2',nameIt:'AirPods Pro 2'}), sales: 234, revenue: formatPrice(222066) },
                  { name: getProductName({name:'Nike Air Max 90',nameAr:'نايك إير ماكس 90',nameIt:'Nike Air Max 90'}), sales: 178, revenue: formatPrice(117302) },
                  { name: getProductName({name:'Tom Ford Oud Wood',nameAr:'توم فورد عود وود',nameIt:'Tom Ford Oud Wood'}), sales: 95, revenue: formatPrice(118750) },
                ].map((p, i) => (
                  <div key={i} className="dash-product-row">
                    <span className="dash-product-rank">#{i + 1}</span>
                    <div className="dash-product-info">
                      <strong>{p.name}</strong>
                      <span>{p.sales} {t('sold')}</span>
                    </div>
                    <span className="dash-product-revenue">{p.revenue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ========== STORE SETTINGS ========== */
        <div className="settings-container">
          {saved && (
            <div className="settings-saved-toast">
              <Check size={16}/> {t('settingsSaved')}
            </div>
          )}

          {/* Theme Selection */}
          <div className="settings-section">
            <div className="settings-section-header">
              <Palette size={20}/>
              <div>
                <h3>{t('storeTheme')}</h3>
                <p>{t('chooseThemeDesc')}</p>
              </div>
            </div>
            <div className="theme-selector-grid">
              {themeOptions.map(thm => (
                <button key={thm.id} className={`theme-selector-card ${theme === thm.id ? 'selected' : ''}`}
                  onClick={() => setTheme(thm.id)}>
                  <div className="theme-selector-preview">
                    {thm.colors.map((c, i) => (
                      <div key={i} className="theme-color-swatch" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="theme-selector-info">
                    <span className="theme-selector-emoji">{thm.emoji}</span>
                    <strong>{thm.name}</strong>
                    <span className="theme-selector-desc">{thm.desc}</span>
                  </div>
                  {theme === thm.id && <div className="theme-selector-check"><Check size={16}/></div>}
                </button>
              ))}
            </div>
          </div>

          {/* General Settings */}
          <div className="settings-section">
            <div className="settings-section-header">
              <Settings size={20}/>
              <div>
                <h3>{t('generalSettings')}</h3>
                <p>{t('basicStoreInfo')}</p>
              </div>
            </div>
            <div className="settings-form-grid">
              <div className="settings-field">
                <label>{t('storeName')}</label>
                <input type="text" value={storeName} onChange={e => setStoreName(e.target.value)} />
              </div>
              <div className="settings-field">
                <label>{t('contactEmail')}</label>
                <input type="email" value={storeEmail} onChange={e => setStoreEmail(e.target.value)} />
              </div>
              <div className="settings-field">
                <label>{t('phoneNumber')}</label>
                <input type="tel" value={storePhone} onChange={e => setStorePhone(e.target.value)} />
              </div>
              <div className="settings-field">
                <label>{t('currencyLabel')}</label>
                <select value={currency} onChange={e => setCurrency(e.target.value)}>
                  <option value="SAR">{t('currencySar')}</option>
                  <option value="USD">{t('currencyUsd')}</option>
                  <option value="EUR">{t('currencyEur')}</option>
                  <option value="AED">{t('currencyAed')}</option>
                  <option value="EGP">{t('currencyEgp')}</option>
                </select>
              </div>
              <div className="settings-field">
                <label>{t('defaultLanguage')}</label>
                <select value={language} onChange={e => setLanguage(e.target.value)}>
                  <option value="ar">{t('langArabic')}</option>
                  <option value="en">{t('langEnglish')}</option>
                  <option value="fr">{t('langFrench')}</option>
                </select>
              </div>
              <div className="settings-field">
                <label>{t('freeShippingMinimum')}</label>
                <input type="number" value={freeShipMin} onChange={e => setFreeShipMin(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="settings-section">
            <div className="settings-section-header">
              <Sliders size={20}/>
              <div>
                <h3>{t('featureControls')}</h3>
                <p>{t('featureControlsDesc')}</p>
              </div>
            </div>
            <div className="settings-toggles-grid">
              <ToggleSwitch on={enableReviews} onToggle={() => setEnableReviews(!enableReviews)} label={t('productReviewsRatings')} />
              <ToggleSwitch on={enableWishlist} onToggle={() => setEnableWishlist(!enableWishlist)} label={t('wishlist')} />
              <ToggleSwitch on={enableCompare} onToggle={() => setEnableCompare(!enableCompare)} label={t('productCompare')} />
              <ToggleSwitch on={enableBlog} onToggle={() => setEnableBlog(!enableBlog)} label={t('blogContent')} />
              <ToggleSwitch on={enableGiftCards} onToggle={() => setEnableGiftCards(!enableGiftCards)} label={t('giftCards')} />
              <ToggleSwitch on={enableLoyalty} onToggle={() => setEnableLoyalty(!enableLoyalty)} label={t('loyaltyProgram')} />
              <ToggleSwitch on={enableNewsletter} onToggle={() => setEnableNewsletter(!enableNewsletter)} label={t('newsletterSignup')} />
              <ToggleSwitch on={enableWhatsApp} onToggle={() => setEnableWhatsApp(!enableWhatsApp)} label={t('whatsAppChatButton')} />
              <ToggleSwitch on={enableCookieBar} onToggle={() => setEnableCookieBar(!enableCookieBar)} label={t('cookieConsentBanner')} />
              <ToggleSwitch on={maintenanceMode} onToggle={() => setMaintenanceMode(!maintenanceMode)} label={t('maintenanceMode')} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="settings-section">
            <div className="settings-section-header">
              <ChevronRight size={20}/>
              <div>
                <h3>{t('advancedSettings')}</h3>
                <p>{t('moreConfigOptions')}</p>
              </div>
            </div>
            <div className="settings-links-grid">
              <button className="settings-link-card" onClick={() => setPage('flags')}>
                <Sliders size={20}/> <span>{t('featureFlags')}</span> <span className="settings-link-count">{t('flagsCount')}</span>
              </button>
              <button className="settings-link-card" onClick={() => setPage('marketing')}>
                <Megaphone size={20}/> <span>{t('marketingTools')}</span> <span className="settings-link-count">{t('toolsCount')}</span>
              </button>
              <button className="settings-link-card" onClick={() => setPage('admin-users')}>
                <Shield size={20}/> <span>{t('adminUsers')}</span> <span className="settings-link-count">8</span>
              </button>
              <button className="settings-link-card">
                <CreditCard size={20}/> <span>{t('paymentMethods')}</span> <span className="settings-link-count">{t('activePayments')}</span>
              </button>
              <button className="settings-link-card">
                <Truck size={20}/> <span>{t('shippingZones')}</span> <span className="settings-link-count">{t('zonesCount')}</span>
              </button>
              <button className="settings-link-card">
                <Shield size={20}/> <span>{t('securityPrivacy')}</span> <span className="settings-link-count">{t('allSecure')}</span>
              </button>
              <button className="settings-link-card">
                <Mail size={20}/> <span>{t('emailTemplates')}</span> <span className="settings-link-count">{t('templatesCount')}</span>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="settings-save-bar">
            <button className="btn-primary btn-lg" onClick={handleSave}>
              <Check size={16}/> {t('saveAllSettings')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
