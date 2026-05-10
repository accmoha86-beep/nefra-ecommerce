import React, { useState } from 'react';
import { Search, Package, Truck, Check, MapPin, Clock, Box } from 'lucide-react';
import { Page } from '../types';

interface TrackOrderPageProps {
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ setPage, t }) => {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(false);

  const handleTrack = () => {
    if (orderId) setTracking(true);
  };

  return (
    <div className="page-container">
      <div className="page-header center">
        <h1 className="page-title"><Package size={24}/> {t('trackYourOrder')}</h1>
        <p className="page-subtitle">{t('trackOrderSubtitle')}</p>
      </div>

      <div className="track-search-box">
        <div className="track-input-wrap">
          <Search size={18}/>
          <input placeholder={t('enterOrderNumber')} value={orderId}
            onChange={e => setOrderId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleTrack()} />
        </div>
        <button className="btn-primary" onClick={handleTrack}>{t('trackOrder')}</button>
      </div>

      {tracking && (
        <div className="track-result">
          <div className="track-header">
            <div>
              <h2>{t('order')} #{orderId || 'ORD-7291'}</h2>
              <p>{t('estimatedDelivery')}: 2026/05/08</p>
            </div>
            <span className="order-status status-shipped">{t('inTransit')}</span>
          </div>

          <div className="track-timeline">
            <div className="track-step done">
              <div className="track-step-icon"><Check size={16}/></div>
              <div className="track-step-content">
                <h4>{t('orderPlaced')}</h4>
                <p>2026/05/02 — 10:30</p>
                <span>{t('orderPlacedDesc')}</span>
              </div>
            </div>
            <div className="track-step done">
              <div className="track-step-icon"><Check size={16}/></div>
              <div className="track-step-content">
                <h4>{t('paymentConfirmed')}</h4>
                <p>2026/05/02 — 10:31</p>
                <span>{t('paymentConfirmedDesc')}</span>
              </div>
            </div>
            <div className="track-step done">
              <div className="track-step-icon"><Check size={16}/></div>
              <div className="track-step-content">
                <h4>{t('packedAndShipped')}</h4>
                <p>2026/05/03 — 14:15</p>
                <span>{t('packedAndShippedDesc')}</span>
              </div>
            </div>
            <div className="track-step active">
              <div className="track-step-icon"><Truck size={16}/></div>
              <div className="track-step-content">
                <h4>{t('inTransit')}</h4>
                <p>2026/05/05 — 08:00</p>
                <span>{t('inTransitDesc')}</span>
              </div>
            </div>
            <div className="track-step">
              <div className="track-step-icon"><Box size={16}/></div>
              <div className="track-step-content">
                <h4>{t('outForDelivery')}</h4>
                <p>{t('estimated')}: 2026/05/07</p>
              </div>
            </div>
            <div className="track-step">
              <div className="track-step-icon"><MapPin size={16}/></div>
              <div className="track-step-content">
                <h4>{t('delivered')}</h4>
                <p>{t('estimated')}: 2026/05/08</p>
              </div>
            </div>
          </div>

          <div className="track-details">
            <div className="track-detail-card">
              <h4><MapPin size={16}/> {t('shippingAddress')}</h4>
              <p>Mohamed Mansour<br/>123 King Fahd Road, Al Olaya<br/>Riyadh</p>
            </div>
            <div className="track-detail-card">
              <h4><Truck size={16}/> {t('shippingMethod')}</h4>
              <p>{t('track.expressDelivery')} — Aramex<br/>{t('trackingNumber')}: ARX-98765432<br/>{t('estimated')}: 3-5 {t('businessDays')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
