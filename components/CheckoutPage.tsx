import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, Truck, Shield, Check, Lock, Smartphone, Building2, Banknote, Wallet, Copy } from 'lucide-react';
import { CartItem, Page, Country } from '../types';


interface CheckoutPageProps {
  cart: CartItem[];
  setPage: (p: Page) => void;
  setCart?: (c: CartItem[]) => void;
  t: (key: string) => string;
  lang: string;
  formatPrice: (n: number) => string;
  currentCountry: Country;
  guestCheckoutEnabled?: boolean;
}

const paymentMethodConfig: Record<string, { icon: React.ReactNode; id: string }> = {
  'Visa/Mastercard': { icon: <CreditCard size={18}/>, id: 'card' },
  'Credit/Debit Card': { icon: <CreditCard size={18}/>, id: 'card' },
  'Apple Pay': { icon: <Smartphone size={18}/>, id: 'apple' },
  'Cash on Delivery': { icon: <Banknote size={18}/>, id: 'cod' },
  'InstaPay': { icon: <Smartphone size={18}/>, id: 'instapay' },
  'Vodafone Cash': { icon: <Wallet size={18}/>, id: 'vodafone' },
  'Bank Transfer': { icon: <Building2 size={18}/>, id: 'bank' },
  'Fawry': { icon: <Building2 size={18}/>, id: 'fawry' },
  'valU': { icon: <CreditCard size={18}/>, id: 'valu' },
  'Mada': { icon: <CreditCard size={18}/>, id: 'mada' },
  'STC Pay': { icon: <Smartphone size={18}/>, id: 'stcpay' },
  'Tabby': { icon: <CreditCard size={18}/>, id: 'tabby' },
  'Network International': { icon: <CreditCard size={18}/>, id: 'network' },
  'NAPS': { icon: <CreditCard size={18}/>, id: 'naps' },
  'Stripe': { icon: <CreditCard size={18}/>, id: 'stripe' },
  'Nexi': { icon: <CreditCard size={18}/>, id: 'nexi' },
  'PayPal': { icon: <Wallet size={18}/>, id: 'paypal' },
  'Satispay': { icon: <Smartphone size={18}/>, id: 'satispay' },
  'Paymob': { icon: <CreditCard size={18}/>, id: 'paymob' },
};

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ lang, cart, setPage, t, formatPrice, currentCountry }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [copied, setCopied] = useState('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > currentCountry.freeShippingMin ? 0 : currentCountry.shippingCost;
  const taxRate = currentCountry.taxRate / 100;
  const tax = Math.round(subtotal * taxRate);
  const total = subtotal + shipping + tax;
  const codFeeAmount = Math.round(total * 0.02);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  // Build payment options dynamically from country
  const countryPayments = currentCountry.paymentMethods || [];

  if (orderPlaced) {
    return (
      <div className="page-container">
        <div className="checkout-success">
          <div className="checkout-success-icon"><Check size={48}/></div>
          <h2>{t('orderPlacedSuccessfully')}</h2>
          <p>{t('orderNumber')}: #ORD-{Math.floor(Math.random() * 9000 + 1000)} — {t('thankYouForPurchase')}</p>

          {(paymentMethod === 'instapay' || paymentMethod === 'bank' || paymentMethod === 'vodafone') && (
            <div className="checkout-pending-payment">
              <div className="pending-icon">⏳</div>
              <p className="pending-title">{t('pendingPayment')}</p>
              <p className="pending-desc">{t('pendingPaymentDesc')}</p>
            </div>
          )}

          <p className="checkout-success-detail">{t('confirmationEmailSentTo')} acc.moha86@gmail.com</p>
          <div className="checkout-success-actions">
            <button className="btn-primary" onClick={() => setPage('account')}>{t('myOrders')}</button>
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
                <div className="form-group"><label>{t('phone')}</label><input className="form-input" defaultValue={currentCountry.phone + ' XXX XXX XXXX'} /></div>
                <div className="form-group full"><label>{t('address')}</label><input className="form-input" placeholder={t('addressPlaceholder')} /></div>
                <div className="form-group"><label>{t('city')}</label><input className="form-input" /></div>
                <div className="form-group"><label>{t('postalCode')}</label><input className="form-input" /></div>
              </div>
              <button className="btn-primary" onClick={() => setStep(2)}>{t('continueToPayment')}</button>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-section">
              <h3><CreditCard size={18}/> {t('paymentMethod')}</h3>
              <div className="payment-options">
                {countryPayments.map(method => {
                  const config = paymentMethodConfig[method] || { icon: <CreditCard size={18}/>, id: method.toLowerCase().replace(/\s+/g, '') };
                  const pmId = config.id;
                  const pmLabel = t(`pm_${pmId}`) !== `pm_${pmId}` ? t(`pm_${pmId}`) : method;
                  const pmDesc = t(`pm_${pmId}_desc`) !== `pm_${pmId}_desc` ? t(`pm_${pmId}_desc`) : '';
                  return (
                    <label key={pmId} className={`payment-option${paymentMethod === pmId ? ' active' : ''}`}>
                      <input type="radio" name="payment" value={pmId} checked={paymentMethod === pmId}
                        onChange={() => setPaymentMethod(pmId)} />
                      <div className="payment-option-content">
                        <span className="payment-option-icon">{config.icon}</span>
                        <div>
                          <strong>{pmLabel}</strong>
                          <span>{pmDesc}</span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Card form */}
              {(paymentMethod === 'card' || paymentMethod === 'mada' || paymentMethod === 'paymob' || paymentMethod === 'stripe' || paymentMethod === 'nexi' || paymentMethod === 'network') && (
                <div className="card-form">
                  <div className="form-group full"><label>{t('cardNumber')}</label><input className="form-input" placeholder={t('cardNumberPlaceholder')} /></div>
                  <div className="form-grid">
                    <div className="form-group"><label>{t('expiryDate')}</label><input className="form-input" placeholder={t('expiryDatePlaceholder')} /></div>
                    <div className="form-group"><label>{t('cvv')}</label><input className="form-input" placeholder={t('cvvPlaceholder')} /></div>
                  </div>
                </div>
              )}

              {/* InstaPay instructions */}
              {paymentMethod === 'instapay' && (
                <div className="payment-instructions instapay-box">
                  <div className="pi-header">
                    <Smartphone size={20}/>
                    <h4>{t('instapayInstructions')}</h4>
                  </div>
                  <div className="pi-steps">
                    <div className="pi-step"><span className="pi-num">1</span><span>{t('instapayStep1')}</span></div>
                    <div className="pi-step"><span className="pi-num">2</span><span>{t('instapayStep2')}</span></div>
                    <div className="pi-step"><span className="pi-num">3</span><span>{t('instapayStep3')}</span></div>
                  </div>
                  <div className="pi-detail-row">
                    <span className="pi-label">{t('instapayTo')}</span>
                    <span className="pi-value">nefra@instapay</span>
                    <button className="copy-btn" onClick={() => copyToClipboard('nefra@instapay', 'ipa')}>
                      {copied === 'ipa' ? <Check size={14}/> : <Copy size={14}/>}
                    </button>
                  </div>
                  <div className="pi-detail-row">
                    <span className="pi-label">{t('amount')}</span>
                    <span className="pi-value pi-amount">{formatPrice(total)}</span>
                  </div>
                  <p className="pi-note">⚠️ {t('instapayNote')}</p>
                </div>
              )}

              {/* Bank Transfer instructions */}
              {paymentMethod === 'bank' && (
                <div className="payment-instructions bank-box">
                  <div className="pi-header">
                    <Building2 size={20}/>
                    <h4>{t('bankTransferInstructions')}</h4>
                  </div>
                  <div className="pi-details">
                    <div className="pi-detail-row">
                      <span className="pi-label">{t('bankName')}</span>
                      <span className="pi-value">CIB — Commercial International Bank</span>
                    </div>
                    <div className="pi-detail-row">
                      <span className="pi-label">{t('accountName')}</span>
                      <span className="pi-value">NEFRA Store</span>
                    </div>
                    <div className="pi-detail-row">
                      <span className="pi-label">{t('accountNumber')}</span>
                      <span className="pi-value">1234567890123</span>
                      <button className="copy-btn" onClick={() => copyToClipboard('1234567890123', 'acct')}>
                        {copied === 'acct' ? <Check size={14}/> : <Copy size={14}/>}
                      </button>
                    </div>
                    <div className="pi-detail-row">
                      <span className="pi-label">IBAN</span>
                      <span className="pi-value">EG12 0036 0002 1234 5678 9012 3</span>
                      <button className="copy-btn" onClick={() => copyToClipboard('EG1200360002123456789012 3', 'iban')}>
                        {copied === 'iban' ? <Check size={14}/> : <Copy size={14}/>}
                      </button>
                    </div>
                    <div className="pi-detail-row">
                      <span className="pi-label">{t('amount')}</span>
                      <span className="pi-value pi-amount">{formatPrice(total)}</span>
                    </div>
                  </div>
                  <p className="pi-note">⚠️ {t('bankTransferNote')}</p>
                </div>
              )}

              {/* Vodafone Cash instructions */}
              {paymentMethod === 'vodafone' && (
                <div className="payment-instructions vodafone-box">
                  <div className="pi-header">
                    <Wallet size={20}/>
                    <h4>{t('vodafoneCashInstructions')}</h4>
                  </div>
                  <div className="pi-steps">
                    <div className="pi-step"><span className="pi-num">1</span><span>{t('vodafoneStep1')}</span></div>
                    <div className="pi-step"><span className="pi-num">2</span><span>{t('vodafoneStep2')}</span></div>
                    <div className="pi-step"><span className="pi-num">3</span><span>{t('vodafoneStep3')}</span></div>
                  </div>
                  <div className="pi-detail-row">
                    <span className="pi-label">{t('vodafoneNumber')}</span>
                    <span className="pi-value">010 XXXX XXXX</span>
                    <button className="copy-btn" onClick={() => copyToClipboard('010XXXXXXXX', 'vf')}>
                      {copied === 'vf' ? <Check size={14}/> : <Copy size={14}/>}
                    </button>
                  </div>
                  <div className="pi-detail-row">
                    <span className="pi-label">{t('amount')}</span>
                    <span className="pi-value pi-amount">{formatPrice(total)}</span>
                  </div>
                  <p className="pi-note">⚠️ {t('vodafoneNote')}</p>
                </div>
              )}

              {/* Fawry instructions */}
              {paymentMethod === 'fawry' && (
                <div className="payment-instructions fawry-box">
                  <div className="pi-header">
                    <Building2 size={20}/>
                    <h4>{t('fawryInstructions')}</h4>
                  </div>
                  <p className="pi-desc">{t('fawryDesc')}</p>
                  <div className="pi-detail-row">
                    <span className="pi-label">{t('fawryCode')}</span>
                    <span className="pi-value pi-amount">{Math.floor(Math.random() * 900000000 + 100000000)}</span>
                  </div>
                  <div className="pi-detail-row">
                    <span className="pi-label">{t('amount')}</span>
                    <span className="pi-value pi-amount">{formatPrice(total)}</span>
                  </div>
                  <p className="pi-note">⚠️ {t('fawryNote')}</p>
                </div>
              )}

              {/* COD notice */}
              {paymentMethod === 'cod' && (
                <div className="payment-instructions cod-box">
                  <div className="pi-header">
                    <Banknote size={20}/>
                    <h4>{t('codInstructions')}</h4>
                  </div>
                  <p className="pi-desc">{t('codDesc')}</p>
                  <div className="pi-detail-row">
                    <span className="pi-label">{t('codFeeLabel')}</span>
                    <span className="pi-value">{formatPrice(codFeeAmount)} (2%)</span>
                  </div>
                  <div className="pi-detail-row">
                    <span className="pi-label">{t('totalWithCOD')}</span>
                    <span className="pi-value pi-amount">{formatPrice(total + codFeeAmount)}</span>
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
              <div className="checkout-review-payment">
                <span>{t('paymentMethod')}:</span>
                <strong>{t(`pm_${paymentMethod}`) !== `pm_${paymentMethod}` ? t(`pm_${paymentMethod}`) : paymentMethod}</strong>
              </div>
              <div className="checkout-nav">
                <button className="btn-outline" onClick={() => setStep(2)}>{t('back')}</button>
                <button className="btn-primary btn-lg" onClick={() => setOrderPlaced(true)}>
                  <Lock size={16}/> {t('placeOrder')} — {formatPrice(paymentMethod === 'cod' ? total + codFeeAmount : total)}
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
            <div className="cart-summary-row"><span>{currentCountry.taxName} ({currentCountry.taxRate}%)</span><span>{formatPrice(tax)}</span></div>
            {paymentMethod === 'cod' && (
              <div className="cart-summary-row"><span>{t('codFeeLabel')}</span><span>{formatPrice(codFeeAmount)}</span></div>
            )}
            <div className="cart-summary-total"><span>{t('total')}</span><span>{formatPrice(paymentMethod === 'cod' ? total + codFeeAmount : total)}</span></div>
          </div>
          <div className="checkout-secure">
            <Shield size={14}/> <span>{t('secureCheckout')}</span>
          </div>
          <div className="checkout-shipping-info">
            <Truck size={14}/>
            <span>{t('freeShippingOver')} {formatPrice(currentCountry.freeShippingMin)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};
