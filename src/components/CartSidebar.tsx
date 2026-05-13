import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, Tag, Truck, ArrowRight } from 'lucide-react';
import { CartItem, Page } from '../types';


interface CartSidebarProps {
  cart: CartItem[];
  show: boolean;
  onClose: () => void;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
  formatPrice: (n: number) => string;
  requireAuth?: (page: Page) => void;
  isLoggedIn?: boolean;
  guestCheckoutEnabled?: boolean;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({lang, cart, show, onClose, onUpdateQty, onRemove, setPage, t, formatPrice, requireAuth, isLoggedIn, guestCheckoutEnabled }) => {
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal - discount + shipping;

  return (
    <>
      {show && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-sidebar${show ? ' open' : ''}`}>
        <div className="cart-header">
          <h2><ShoppingBag size={20}/> {t('cart')} ({cart.reduce((s, i) => s + i.qty, 0)})</h2>
          <button onClick={onClose}><X size={20}/></button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={48} style={{opacity:0.3}} />
            <p>{t('cartEmpty')}</p>
            <button className="btn-primary" onClick={() => { onClose(); setPage('shop'); }}>{t('startShopping')}</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img-wrap">
                    <img src={item.img} alt={lang === 'ar' ? (item.nameAr || item.name) : lang === 'it' ? (item.nameIt || item.name) : item.name} className="cart-item-img"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <div className="cart-item-info">
                    <h4>{lang === 'ar' ? (item.nameAr || item.name) : lang === 'it' ? (item.nameIt || item.name) : item.name}</h4>
                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                    <div className="cart-item-qty">
                      <button onClick={() => onUpdateQty(item.id, -1)}><Minus size={12}/></button>
                      <span>{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)}><Plus size={12}/></button>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <span className="cart-item-total">{formatPrice(item.price * item.qty)}</span>
                    <button className="cart-item-remove" onClick={() => onRemove(item.id)}><Trash2 size={14}/></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-coupon">
                <div className="coupon-input-wrap">
                  <Tag size={14}/>
                  <input placeholder={t('couponCode')} value={coupon} onChange={e => setCoupon(e.target.value)} />
                </div>
                <button className="coupon-btn" onClick={() => { if(coupon) setCouponApplied(true); }}>
                  {couponApplied ? t('couponApplied') : t('apply')}
                </button>
              </div>

              <div className="cart-summary">
                <div className="cart-summary-row"><span>{t('subtotal')}</span><span>{formatPrice(subtotal)}</span></div>
                {discount > 0 && <div className="cart-summary-row discount"><span>{t('discount')} (10%)</span><span>-{formatPrice(discount)}</span></div>}
                <div className="cart-summary-row"><span>{t('shipping')}</span><span>{shipping === 0 ? t('free') : formatPrice(shipping)}</span></div>
                <div className="cart-summary-total"><span>{t('total')}</span><span>{formatPrice(total)}</span></div>
              </div>

              {subtotal < 500 && (
                <div className="cart-free-shipping">
                  <Truck size={14}/> {t('addAmountForFreeShipping').replace('{amount}', formatPrice(500 - subtotal))}
                </div>
              )}

              <button className="btn-checkout" onClick={() => { onClose(); if (!isLoggedIn && !guestCheckoutEnabled && requireAuth) { requireAuth('checkout'); } else { setPage('checkout'); } }}>
                {t('checkout')} <ArrowRight size={16}/>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
