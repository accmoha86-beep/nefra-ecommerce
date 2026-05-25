import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Zap, Eye, Heart, TrendingUp, AlertTriangle } from 'lucide-react';
import { Product, FeatureFlag, TFunc } from '../types';
import { Stars } from './ProductCard';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
  onBuyNow?: (p: Product, qty: number) => void;
  onViewDetails: (p: Product) => void;
  onToggleWishlist: (id: number) => void;
  isInWishlist: boolean;
  t: TFunc;
  lang: string;
  formatPrice: (n: number, product?: any) => string;
  featureFlags?: FeatureFlag[];
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product, onClose, onAddToCart, onBuyNow, onViewDetails, onToggleWishlist,
  isInWishlist, t, lang, formatPrice, featureFlags
}) => {
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [viewingNow] = useState(() => Math.floor(Math.random() * 18) + 5);
  const [purchasedThisWeek] = useState(() => Math.floor(Math.random() * 40) + 8);
  const [isVisible, setIsVisible] = useState(false);

  const ff = (id: string) => !featureFlags || featureFlags.find(f => f.id === id)?.enabled !== false;

  const getName = () => lang === 'ar' ? (product.nameAr || product.name) : lang === 'it' ? (product.nameIt || product.name) : product.name;
  const getDesc = () => lang === 'ar' ? (product.descAr || product.desc) : lang === 'it' ? (product.descIt || product.desc) : product.desc;

  // Animate in + close on ESC
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 250);
  };

  return (
    <div className={`qv-overlay${isVisible ? ' visible' : ''}`} onClick={handleClose}>
      <div className={`qv-modal${isVisible ? ' visible' : ''}`} onClick={e => e.stopPropagation()}>
        <button className="qv-close" onClick={handleClose}><X size={20}/></button>

        <div className="qv-content">
          {/* Image */}
          <div className="qv-image-wrap">
            {!imgError ? (
              <img src={product.img} alt={getName()} className="qv-image"
                onError={() => setImgError(true)} />
            ) : (
              <div className="qv-image-fallback" style={{ background: product.grad }}></div>
            )}
            {product.badge && <span className={`qv-badge badge-${product.badge.toLowerCase().replace(/\s/g,'')}`}>{product.badge}</span>}
          </div>

          {/* Info */}
          <div className="qv-info">
            {product.brand && <div className="qv-brand">{product.brand}</div>}
            <h2 className="qv-name">{getName()}</h2>

            <div className="qv-rating">
              <Stars rating={product.rating} size={14} />
              <span className="qv-reviews">({product.reviews.toLocaleString()} {t('reviews')})</span>
            </div>

            <div className="qv-price-row">
              <span className="qv-price">{formatPrice(product.price, product)}</span>
              {ff('ff_strikethrough') && product.old && (
                <span className="qv-old-price">{formatPrice(product.old, product)}</span>
              )}
            </div>

            <p className="qv-desc">{getDesc().length > 160 ? getDesc().slice(0, 160) + '...' : getDesc()}</p>

            {/* Urgency Triggers */}
            {ff('ff_social_proof') && (
              <div className="qv-urgency">
                <div className="urgency-item viewing">
                  <Eye size={14}/>
                  <span>{t('urgency.viewingNow').replace('{count}', String(viewingNow))}</span>
                </div>
                <div className="urgency-item purchased">
                  <TrendingUp size={14}/>
                  <span>{t('urgency.purchasedWeek').replace('{count}', String(purchasedThisWeek))}</span>
                </div>
              </div>
            )}

            {/* Low Stock Warning */}
            {ff('ff_urgency_stock') && product.stock <= 10 && product.stock > 0 && (
              <div className="urgency-item low-stock-urgent">
                <AlertTriangle size={14}/>
                <span>{t('urgency.onlyLeft').replace('{count}', String(product.stock))}</span>
              </div>
            )}

            {/* Qty + Actions */}
            <div className="qv-action-row">
              <div className="qv-qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14}/></button>
                <span>{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock || 99, qty + 1))}><Plus size={14}/></button>
              </div>
              <button className="qv-add-cart" onClick={() => { for(let i=0;i<qty;i++) onAddToCart(product); handleClose(); }}>
                <ShoppingBag size={16}/> {t('addToCart')}
              </button>
              <button className={`qv-wishlist-btn${isInWishlist ? ' active' : ''}`}
                onClick={() => onToggleWishlist(product.id)}>
                <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {ff('ff_buy_now') && onBuyNow && (
              <button className="qv-buy-now" onClick={() => { onBuyNow(product, qty); handleClose(); }}>
                <Zap size={16}/> {t('buyNow')}
              </button>
            )}

            <button className="qv-view-details" onClick={() => { onViewDetails(product); handleClose(); }}>
              {t('quickView.viewDetails')} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
