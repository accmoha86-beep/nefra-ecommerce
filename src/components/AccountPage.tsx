import React, { useState } from 'react';
import { User, Package, MapPin, RotateCcw, Bell, Settings, Award, ChevronRight, Star, Edit2, Trash2, Plus, Check, X, Eye } from 'lucide-react';
import { Page, Address, Notification } from '../types';
import { sampleOrders, sampleAddresses, sampleNotifications } from '../data';

interface AccountPageProps {
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
  formatPrice: (n: number) => string;
}

type AccountTab = 'profile' | 'orders' | 'addresses' | 'returns' | 'notifications' | 'loyalty';

export const AccountPage: React.FC<AccountPageProps> = ({ setPage, t, formatPrice }) => {
  const [tab, setTab] = useState<AccountTab>('profile');
  const [addresses, setAddresses] = useState<Address[]>(sampleAddresses);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const tabs: { key: AccountTab; label: string; icon: React.ReactNode }[] = [
    { key: 'profile', label: t('account.profile'), icon: <User size={16}/> },
    { key: 'orders', label: t('orderHistory'), icon: <Package size={16}/> },
    { key: 'addresses', label: t('savedAddresses'), icon: <MapPin size={16}/> },
    { key: 'returns', label: t('account.returns'), icon: <RotateCcw size={16}/> },
    { key: 'notifications', label: t('notifications'), icon: <Bell size={16}/> },
    { key: 'loyalty', label: t('account.loyalty'), icon: <Award size={16}/> },
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

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title"><User size={24}/> {t('myAccount')}</h1>
          <p className="page-subtitle">{t('account.manageSubtitle')}</p>
        </div>
      </div>

      <div className="account-layout">
        <aside className="account-sidebar">
          <div className="account-user-card">
            <div className="account-avatar">M</div>
            <div>
              <h3>Mohamed Mansour</h3>
              <p>{t('account.goldMember')}</p>
            </div>
          </div>
          {tabs.map(tb => (
            <button key={tb.key} className={`account-nav-item${tab === tb.key ? ' active' : ''}`}
              onClick={() => setTab(tb.key)}>
              {tb.icon} {tb.label}
              {tb.key === 'notifications' && notifications.filter(n => !n.read).length > 0 && (
                <span className="notif-badge">{notifications.filter(n => !n.read).length}</span>
              )}
            </button>
          ))}
        </aside>

        <main className="account-content">
          {tab === 'profile' && (
            <div className="account-section">
              <h2>{t('personalInfo')}</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('account.fullName')}</label>
                  <input type="text" defaultValue="Mohamed Mansour" className="form-input" />
                </div>
                <div className="form-group">
                  <label>{t('email')}</label>
                  <input type="email" defaultValue="acc.moha86@gmail.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label>{t('phone')}</label>
                  <input type="tel" defaultValue="+966 50 123 4567" className="form-input" />
                </div>
                <div className="form-group">
                  <label>{t('account.dateOfBirth')}</label>
                  <input type="date" defaultValue="1986-03-15" className="form-input" />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn-primary">{t('saveChanges')}</button>
                <button className="btn-outline">{t('changePassword')}</button>
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="account-section">
              <h2>{t('account.myOrders')}</h2>
              <div className="orders-list">
                {sampleOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-card-header">
                      <div>
                        <strong>{order.id}</strong>
                        <span className="order-date">{order.date}</span>
                      </div>
                      <span className={`order-status ${statusColor(order.status)}`}>{t('status.' + order.status)}</span>
                    </div>
                    <div className="order-card-body">
                      <div><span className="order-label">{t('account.items')}:</span> {order.items}</div>
                      <div><span className="order-label">{t('total')}:</span> {formatPrice(order.amount)}</div>
                    </div>
                    <div className="order-card-actions">
                      <button className="btn-sm-outline" onClick={() => setPage('track')}><Eye size={12}/> {t('account.track')}</button>
                      {order.status === 'delivered' && <button className="btn-sm-outline"><RotateCcw size={12}/> {t('account.return')}</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'addresses' && (
            <div className="account-section">
              <div className="section-header-inline">
                <h2>{t('account.myAddresses')}</h2>
                <button className="btn-sm-primary"><Plus size={14}/> {t('account.addAddress')}</button>
              </div>
              <div className="addresses-grid">
                {addresses.map(addr => (
                  <div key={addr.id} className={`address-card${addr.isDefault ? ' default' : ''}`}>
                    {addr.isDefault && <span className="address-default-badge"><Check size={12}/> {t('account.default')}</span>}
                    <h4>{addr.labelKey ? t(addr.labelKey) : addr.label}</h4>
                    <p>{addr.name}</p>
                    <p>{addr.street}</p>
                    <p>{addr.city}</p>
                    <p>{addr.phone}</p>
                    <div className="address-actions">
                      <button className="btn-sm-outline"><Edit2 size={12}/> {t('edit')}</button>
                      {!addr.isDefault && <button className="btn-sm-outline"><Trash2 size={12}/> {t('delete')}</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'returns' && (
            <div className="account-section">
              <h2>{t('account.returnsAndRefunds')}</h2>
              <div className="return-card">
                <div className="return-header">
                  <div>
                    <strong>{t('returnId')} #RET-001</strong>
                    <span className="order-date">{t('orderId')} #ORD-7285</span>
                  </div>
                  <span className="order-status status-pending">{t('processing')}</span>
                </div>
                <p>Bose SoundLink Max Speaker — {t('account.defectiveUnitDesc')}</p>
                <div className="return-timeline">
                  <div className="timeline-step done"><Check size={12}/> {t('account.requestSubmitted')}</div>
                  <div className="timeline-step done"><Check size={12}/> {t('account.approved')}</div>
                  <div className="timeline-step active">{t('account.awaitingShipment')}</div>
                  <div className="timeline-step">{t('account.refundProcessed')}</div>
                </div>
              </div>
              <button className="btn-outline" style={{marginTop:'1rem'}}><Plus size={14}/> {t('account.newReturnRequest')}</button>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="account-section">
              <div className="section-header-inline">
                <h2>{t('notifications')}</h2>
                <button className="btn-sm-outline" onClick={() => setNotifications(ns => ns.map(n => ({...n, read:true})))}>
                  {t('account.markAllRead')}
                </button>
              </div>
              <div className="notifications-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notification-item${n.read ? '' : ' unread'}`}
                    onClick={() => setNotifications(ns => ns.map(x => x.id === n.id ? {...x, read:true} : x))}>
                    <div className={`notification-icon notif-${n.type}`}>
                      {n.type === 'order' ? <Package size={16}/> : n.type === 'promo' ? <Star size={16}/> : n.type === 'loyalty' ? <Award size={16}/> : <Bell size={16}/>}
                    </div>
                    <div className="notification-body">
                      <h4>{n.titleKey ? t(n.titleKey) : n.title}</h4>
                      <p>{n.messageKey ? t(n.messageKey) : n.message}</p>
                      <span className="notification-date">{n.date}</span>
                    </div>
                    {!n.read && <span className="notification-dot" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'loyalty' && (
            <div className="account-section">
              <h2>{t('account.loyaltyProgram')}</h2>
              <div className="loyalty-card">
                <div className="loyalty-header">
                  <Award size={32}/>
                  <div>
                    <h3>{t('account.goldMember')}</h3>
                    <p>{t('account.pointsMultiplier')}</p>
                  </div>
                </div>
                <div className="loyalty-stats">
                  <div className="loyalty-stat">
                    <span className="loyalty-stat-value">2,450</span>
                    <span className="loyalty-stat-label">{t('account.pointsBalance')}</span>
                  </div>
                  <div className="loyalty-stat">
                    <span className="loyalty-stat-value">12,800</span>
                    <span className="loyalty-stat-label">{t('account.totalEarned')}</span>
                  </div>
                  <div className="loyalty-stat">
                    <span className="loyalty-stat-value">10,350</span>
                    <span className="loyalty-stat-label">{t('account.redeemed')}</span>
                  </div>
                </div>
                <div className="loyalty-progress">
                  <div className="loyalty-tiers">
                    <span className="tier-badge tier-done">{t('account.bronze')}</span>
                    <span className="tier-badge tier-done">{t('account.silver')}</span>
                    <span className="tier-badge tier-current">{t('account.gold')}</span>
                    <span className="tier-badge tier-next">{t('account.platinum')}</span>
                  </div>
                  <div className="loyalty-bar">
                    <div className="loyalty-bar-fill" style={{width:'72%'}} />
                  </div>
                  <p className="loyalty-next">{t('account.pointsToNextTier')}</p>
                </div>
              </div>
              <div className="loyalty-actions">
                <button className="btn-primary"><Award size={14}/> {t('account.redeemPoints')}</button>
                <button className="btn-outline">{t('account.viewHistory')}</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
