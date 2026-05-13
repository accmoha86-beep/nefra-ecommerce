import React, { useState } from 'react';
import { User, Package, MapPin, RotateCcw, Bell, Settings, Award, ChevronRight, Star, Edit2, Trash2, Plus, Check, X, Eye, Truck, Clock, Box, ArrowLeft, CreditCard, Copy, CheckCircle } from 'lucide-react';
import { Page, Address, Notification, Order } from '../types';
import { sampleOrders, sampleAddresses, sampleNotifications, products } from '../data';

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Map orders to product items for detail view
  const orderItemsMap: Record<string, {name:string, img:string, qty:number, price:number}[]> = {
    'ORD-SA-2024-001': [
      { name: products[0]?.name || 'Sony WH-1000XM5', img: products[0]?.img || '', qty: 1, price: 1299 },
      { name: products[9]?.name || 'AirPods Pro 2', img: products[9]?.img || '', qty: 1, price: 999 },
    ],
    'ORD-SA-2024-002': [
      { name: products[2]?.name || 'iPhone 16 Pro Max', img: products[2]?.img || '', qty: 1, price: 5199 },
    ],
    'ORD-AE-2024-001': [
      { name: products[6]?.name || 'Ray-Ban Aviator', img: products[6]?.img || '', qty: 1, price: 650 },
      { name: products[7]?.name || 'Nike Air Max 90', img: products[7]?.img || '', qty: 2, price: 549 },
    ],
    'ORD-EG-2024-001': [
      { name: products[5]?.name || 'MacBook Pro 16"', img: products[5]?.img || '', qty: 1, price: 17999 },
      { name: products[9]?.name || 'AirPods Pro 2', img: products[9]?.img || '', qty: 1, price: 999 },
    ],
    'ORD-EG-2024-002': [
      { name: products[4]?.name || 'Tom Ford Oud Wood', img: products[4]?.img || '', qty: 2, price: 1350 },
      { name: products[8]?.name || 'La Mer Serum', img: products[8]?.img || '', qty: 1, price: 2850 },
      { name: products[3]?.name || 'Cashmere Overcoat', img: products[3]?.img || '', qty: 1, price: 4500 },
    ],
    'ORD-IT-2024-001': [
      { name: products[6]?.name || 'Ray-Ban Aviator', img: products[6]?.img || '', qty: 1, price: 350 },
    ],
    'ORD-IT-2024-002': [
      { name: products[1]?.name || 'Omega Seamaster', img: products[1]?.img || '', qty: 1, price: 1299 },
    ],
    'ORD-QA-2024-001': [
      { name: products[0]?.name || 'Sony WH-1000XM5', img: products[0]?.img || '', qty: 1, price: 1299 },
    ],
  };

  const getTrackingSteps = (order: Order) => {
    const steps = [
      { key: 'orderPlaced', icon: <Package size={16}/>, date: order.date + ' — 10:30', descKey: 'orderPlacedDesc' },
      { key: 'paymentConfirmed', icon: <CreditCard size={16}/>, date: order.date + ' — 10:31', descKey: 'paymentConfirmedDesc' },
      { key: 'packedAndShipped', icon: <Box size={16}/>, date: '', descKey: 'packedAndShippedDesc' },
      { key: 'inTransit', icon: <Truck size={16}/>, date: '', descKey: 'inTransitDesc' },
      { key: 'outForDelivery', icon: <Truck size={16}/>, date: '', descKey: 'outForDeliveryDesc' },
      { key: 'delivered', icon: <CheckCircle size={16}/>, date: '', descKey: 'deliveredDesc' },
    ];
    const statusStep: Record<string, number> = { pending: 1, shipped: 3, delivered: 5, returned: 5 };
    const activeIdx = statusStep[order.status] ?? 0;
    return steps.map((s, i) => ({ ...s, done: i < activeIdx, active: i === activeIdx }));
  };

  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

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

          {tab === 'orders' && !selectedOrder && (
            <div className="account-section">
              <h2>{t('account.myOrders')}</h2>
              <div className="orders-filter-bar">
                <button className="orders-filter-btn active">{t('allOrders')}</button>
                <button className="orders-filter-btn">{t('status.pending')}</button>
                <button className="orders-filter-btn">{t('status.shipped')}</button>
                <button className="orders-filter-btn">{t('status.delivered')}</button>
              </div>
              <div className="orders-list">
                {sampleOrders.map(order => (
                  <div key={order.id} className="order-card" onClick={() => setSelectedOrder(order)} style={{cursor:'pointer'}}>
                    <div className="order-card-header">
                      <div>
                        <strong>{order.id}</strong>
                        <span className="order-date">{order.date}</span>
                      </div>
                      <span className={`order-status ${statusColor(order.status)}`}>{t('status.' + order.status)}</span>
                    </div>
                    <div className="order-card-items-preview">
                      {(orderItemsMap[order.id] || []).slice(0, 3).map((item, i) => (
                        <div key={i} className="order-item-mini">
                          {item.img && <img src={item.img} alt={item.name} className="order-item-mini-img" loading="lazy"/>}
                          <span className="order-item-mini-name">{item.name}</span>
                          <span className="order-item-mini-qty">×{item.qty}</span>
                        </div>
                      ))}
                      {(orderItemsMap[order.id] || []).length > 3 && (
                        <span className="order-items-more">+{(orderItemsMap[order.id]?.length || 0) - 3} {t('more')}</span>
                      )}
                    </div>
                    <div className="order-card-body">
                      <div><span className="order-label">{t('account.items')}:</span> {order.items}</div>
                      <div><span className="order-label">{t('total')}:</span> {formatPrice(order.amount)}</div>
                    </div>
                    <div className="order-card-actions">
                      <button className="btn-sm-outline" onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}><Eye size={12}/> {t('account.track')}</button>
                      {order.status === 'delivered' && <button className="btn-sm-outline" onClick={(e) => e.stopPropagation()}><RotateCcw size={12}/> {t('account.return')}</button>}
                      <button className="btn-sm-outline" onClick={(e) => e.stopPropagation()}><Package size={12}/> {t('account.reorder')}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'orders' && selectedOrder && (
            <div className="account-section order-detail-view">
              <button className="btn-back" onClick={() => setSelectedOrder(null)}>
                <ArrowLeft size={16}/> {t('account.backToOrders')}
              </button>

              <div className="order-detail-header">
                <div className="order-detail-id-row">
                  <h2>{t('order')} {selectedOrder.id}</h2>
                  <button className="btn-copy-id" onClick={() => copyOrderId(selectedOrder.id)} title={t('copyOrderId')}>
                    {copiedId ? <Check size={14}/> : <Copy size={14}/>}
                  </button>
                  <span className={`order-status ${statusColor(selectedOrder.status)}`}>{t('status.' + selectedOrder.status)}</span>
                </div>
                <p className="order-detail-date">{t('orderDate')}: {selectedOrder.date}</p>
              </div>

              {/* Order Items */}
              <div className="order-detail-section">
                <h3><Package size={18}/> {t('orderItems')}</h3>
                <div className="order-items-list">
                  {(orderItemsMap[selectedOrder.id] || []).map((item, i) => (
                    <div key={i} className="order-item-row">
                      <div className="order-item-img-wrap">
                        {item.img ? <img src={item.img} alt={item.name}/> : <Box size={32}/>}
                      </div>
                      <div className="order-item-info">
                        <strong>{item.name}</strong>
                        <span>{t('qty')}: {item.qty}</span>
                      </div>
                      <div className="order-item-price">{formatPrice(item.price * item.qty)}</div>
                    </div>
                  ))}
                </div>
                <div className="order-summary-row">
                  <div className="order-summary-line">
                    <span>{t('subtotal')}</span>
                    <span>{formatPrice(selectedOrder.amount * 0.87)}</span>
                  </div>
                  <div className="order-summary-line">
                    <span>{t('shipping')}</span>
                    <span>{t('freeShipping')}</span>
                  </div>
                  <div className="order-summary-line">
                    <span>{t('tax')}</span>
                    <span>{formatPrice(selectedOrder.amount * 0.13)}</span>
                  </div>
                  <div className="order-summary-line total">
                    <span>{t('total')}</span>
                    <span>{formatPrice(selectedOrder.amount)}</span>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="order-detail-section">
                <h3><Truck size={18}/> {t('trackingTimeline')}</h3>
                <div className="track-timeline">
                  {getTrackingSteps(selectedOrder).map((step, i) => (
                    <div key={i} className={`track-step ${step.done ? 'done' : ''} ${step.active ? 'active' : ''}`}>
                      <div className="track-step-icon">{step.done ? <Check size={16}/> : step.icon}</div>
                      <div className="track-step-content">
                        <h4>{t(step.key)}</h4>
                        {step.date && <p>{step.date}</p>}
                        {(step.done || step.active) && <span>{t(step.descKey)}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Payment Info */}
              <div className="order-detail-cards">
                <div className="order-detail-card">
                  <h4><MapPin size={16}/> {t('shippingAddress')}</h4>
                  <p>Mohamed Mansour<br/>123 King Fahd Road, Al Olaya<br/>Riyadh, Saudi Arabia</p>
                </div>
                <div className="order-detail-card">
                  <h4><Truck size={16}/> {t('shippingMethod')}</h4>
                  <p>{t('track.expressDelivery')} — Aramex<br/>{t('trackingNumber')}: ARX-{selectedOrder.id.slice(-3)}98765<br/>{t('estimated')}: 3-5 {t('businessDays')}</p>
                </div>
                <div className="order-detail-card">
                  <h4><CreditCard size={16}/> {t('paymentMethod')}</h4>
                  <p>Visa •••• 4242<br/>{t('paid')}: {formatPrice(selectedOrder.amount)}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="order-detail-actions">
                {selectedOrder.status === 'delivered' && (
                  <button className="btn-sm-outline"><RotateCcw size={14}/> {t('account.return')}</button>
                )}
                <button className="btn-sm-outline"><Package size={14}/> {t('account.reorder')}</button>
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
