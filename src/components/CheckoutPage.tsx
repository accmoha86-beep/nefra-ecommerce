import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, Truck, Shield, Check, Lock } from 'lucide-react';
import { CartItem, Page } from '../types';


interface CheckoutPageProps {
  cart: CartItem[];
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
  formatPrice: (n: number) => string;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({lang,  cart, setPage, t , formatPrice }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + shipping + tax;

  if (orderPlaced) {
    return (
      <div className="page-container">
        <div className="checkout-success">
          <div className="checkout-success-icon"><Check size={48}/></div>
          <h2>{t('orderPlacedSuccessfully')}</h2>
          <p>{t('orderNumber')}: #ORD-7292 — {t('thankYouForPurchase')}</p>
          <p className="checkout-success-detail">{t('confirmationEmailSentTo')} acc.moha86@gmail.com</p>
          <div className="checkout-success-actions">
            <button className="btn-primary" onClick={() => setPage('track')}>{t('trackOrder')}</button>
            <button className="btn-outline" onClick={() => setPage('shop')}>{t('continueShopping')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button className="back-btn" onClick={() => setPage('cart')}>
        <ArrowLeft size={16}/> {t('backToCart')}
      </button>

      <h1 className="page-title" style={{marginBottom: '1.5rem'}}>{t('checkout')}</h1>

      <div className="checkout-steps">
        {[t('shipping'), t('payment'), t('review')].map((s, i) => (
          <div key={s} className={`checkout-step${step > i + 1 ? ' done' : step === i + 1 ? ' active' : ''}`}>
            <span className="step-num">{step > i + 1 ? <Check size={14}/> : i + 1}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-form">
          {step === 1 && (
            <div className="checkout-section">
              <h3><MapPin size={18}/> {t('shippingAddress')}</h3>
              <div className="form-grid">
                <div className="form-group"><label>{t('fullName')}</label><input className="form-input" defaultValue="Mohamed Mansour" /></div>
                <div className="form-group"><label>{t('phone')}</label><input className="form-input" defaultValue="+966 50 123 4567" /></div>
                <div className="form-group full"><label>{t('address')}</label><input className="form-input" defaultValue="123 King Fahd Road, Al Olaya" /></div>
                <div className="form-group"><label>{t('city')}</label><input className="form-input" defaultValue="Riyadh" /></div>
                <div className="form-group"><label>{t('postalCode')}</label><input className="form-input" defaultValue="12211" /></div>
              </div>
              <button className="btn-primary" onClick={() => setStep(2)}>{t('continueToPayment')}</button>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-section">
              <h3><CreditCard size={18}/> {t('paymentMethod')}</h3>
              <div className="payment-options">
                {[
                  { id: 'card', label: t('creditDebitCard'), desc: t('creditDebitCardDesc') },
                  { id: 'apple', label: t('applePay'), desc: t('applePayDesc') },
                  { id: 'cod', label: t('cashOnDelivery'), desc: t('codFee') },
                  { id: 'installments', label: t('tabbyPayIn4'), desc: t('tabbyPayIn4Desc') },
                ].map(pm => (
                  <label key={pm.id} className={`payment-option${paymentMethod === pm.id ? ' active' : ''}`}>
                    <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id)} />
                    <div>
                      <strong>{pm.label}</strong>
                      <span>{pm.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
              {paymentMethod === 'card' && (
                <div className="card-form">
                  <div className="form-group full"><label>{t('cardNumber')}</label><input className="form-input" placeholder={t('cardNumberPlaceholder')} /></div>
                  <div className="form-grid">
                    <div className="form-group"><label>{t('expiryDate')}</label><input className="form-input" placeholder={t('expiryDatePlaceholder')} /></div>
                    <div className="form-group"><label>{t('cvv')}</label><input className="form-input" placeholder={t('cvvPlaceholder')} /></div>
                  </div>
                </div>
              )}
              <div className="checkout-nav">
                <button className="btn-outline" onClick={() => setStep(1)}>{t('back')}</button>
                <button className="btn-primary" onClick={() => setStep(3)}>{t('reviewOrder')}</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="checkout-section">
              <h3>{t('orderReview')}</h3>
              <div className="checkout-review-items">
                {cart.map(item => (
                  <div key={item.id} className="checkout-review-item">
                    <span>{item.emoji} {lang === 'ar' ? (item.nameAr || item.name) : lang === 'it' ? (item.nameIt || item.name) : item.name} x{item.qty}</span>
                    <span>{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="checkout-nav">
                <button className="btn-outline" onClick={() => setStep(2)}>{t('back')}</button>
                <button className="btn-primary btn-lg" onClick={() => setOrderPlaced(true)}>
                  <Lock size={16}/> {t('placeOrder')} — {formatPrice(total)}
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="checkout-summary">
          <h3>{t('orderSummary')}</h3>
          <div className="cart-summary">
            <div className="cart-summary-row"><span>{t('subtotal')} ({cart.reduce((s,i) => s + i.qty, 0)} {t('items')})</span><span>{formatPrice(subtotal)}</span></div>
            <div className="cart-summary-row"><span>{t('shipping')}</span><span>{shipping === 0 ? t('free') : formatPrice(shipping)}</span></div>
            <div className="cart-summary-row"><span>{t('vat')} (15%)</span><span>{formatPrice(tax)}</span></div>
            <div className="cart-summary-total"><span>{t('total')}</span><span>{formatPrice(total)}</span></div>
          </div>
          <div className="checkout-secure">
            <Shield size={14}/> <span>{t('secureCheckout')}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};
