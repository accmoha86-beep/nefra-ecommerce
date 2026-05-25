import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingBag, Scale, Zap } from 'lucide-react';
import { Product, TFunc, FeatureFlag } from '../types';
import { disc } from '../data';

interface ProductCardProps {
  p: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onBuyNow?: (p: Product) => void;
  onQuickView?: (p: Product) => void;
  onToggleWishlist: (id: number) => void;
  onToggleCompare: (id: number) => void;
  isInWishlist: boolean;
  isInCompare: boolean;
  t: TFunc;
  tb?: (badge: string) => string;
  lang?: string;
  formatPrice: (n: number, product?: any) => string;
  featureFlags?: FeatureFlag[];
}

export const Stars: React.FC<{rating: number; size?: number}> = ({ rating, size = 13 }) => (
  <div style={{ display:'flex', gap:1 }}>
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={size} fill={i <= Math.round(rating) ? 'currentColor' : 'none'}
        strokeWidth={i <= Math.round(rating) ? 0 : 1.5}
        style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#6b7280' }} />
    ))}
  </div>
);

const getSizes = (p: Product): string[] => {
  if (!p.attributes) return [];
  const sizeKeys = ['clothingSize', 'shoeSize', 'watchSize', 'bagSize', 'storage'];
  for (const key of sizeKeys) {
    if (p.attributes[key]) return [p.attributes[key]];
  }
  return [];
};

const getAllSizesForCat = (p: Product): string[] => {
  const cat = p.cat;
  if (cat === 'Fashion') {
    if (p.attributes?.shoeSize) return ['38','39','40','41','42','43','44','45'];
    return ['XS','S','M','L','XL','XXL'];
  }
  if (cat === 'Electronics') {
    if (p.attributes?.storage) return ['128GB','256GB','512GB','1TB'];
    return [];
  }
  if (p.attributes?.watchSize) return ['38mm','40mm','42mm','44mm'];
  if (p.attributes?.bagSize) return ['PM','MM','GM'];
  return [];
};

export const ProductCard: React.FC<ProductCardProps> = ({ p, onSelect, onAddToCart, onBuyNow, onQuickView, onToggleWishlist, onToggleCompare, isInWishlist, isInCompare, t, tb, lang, formatPrice, featureFlags }) => {
  const [imgError, setImgError] = useState(false);
  const d = disc(p.price, p.old);

  const ff = (id: string) => !featureFlags || featureFlags.find(f => f.id === id)?.enabled !== false;
  const showBrand = ff('ff_brand_on_card');
  const showDiscount = ff('ff_discount_badge');
  const showStrikethrough = ff('ff_strikethrough');
  const showSizes = ff('ff_sizes_on_card');
  const showPrice = ff('ff_show_price');
  const showBadges = ff('ff_product_badges');
  const showBestSeller = ff('ff_best_seller_badge');
  const showStock = ff('ff_product_stock');
  const sizes = showSizes ? getAllSizesForCat(p) : [];

  return (
    <div className="pcard" onClick={() => onSelect(p)}>
      <div className="pcard-img-wrap">
        {!imgError ? (
          <img src={p.img} alt={p.name} className="pcard-img" loading="lazy"
            onError={() => setImgError(true)} />
        ) : (
          <div className="pcard-img-fallback" style={{ background: p.grad }}>          </div>
        )}
        {showBadges && p.badge && tb && (p.badge !== 'Best Seller' || showBestSeller) && <span className={`pcard-badge badge-${p.badge.toLowerCase().replace(/\s/g,'')}`}>{tb(p.badge)}</span>}
        {showDiscount && d > 0 && <span className="pcard-discount">-{d}%</span>}
        <div className="pcard-actions">
          {ff('ff_wishlist') && <button className={`pcard-action-btn${isInWishlist ? ' active' : ''}`}
            onClick={e => { e.stopPropagation(); onToggleWishlist(p.id); }} title={t('wishlist')}>
            <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>}
          {ff('ff_compare') && <button className={`pcard-action-btn${isInCompare ? ' active' : ''}`}
            onClick={e => { e.stopPropagation(); onToggleCompare(p.id); }} title={t('compare')}>
            <Scale size={16} />
          </button>}
          {ff('ff_quick_view') && <button className="pcard-action-btn"
            onClick={e => { e.stopPropagation(); onQuickView ? onQuickView(p) : onSelect(p); }} title={t('view')}>
            <Eye size={16} />
          </button>}
        </div>
      </div>
      <div className="pcard-info">
        {showBrand && p.brand && <div className="pcard-brand">{p.brand}</div>}
        <h3 className="pcard-name">{lang === 'ar' ? (p.nameAr || p.name) : lang === 'it' ? (p.nameIt || p.name) : p.name}</h3>
        <div className="pcard-rating">
          <Stars rating={p.rating} />
          <span className="pcard-reviews">({p.reviews.toLocaleString()})</span>
        </div>
        {showSizes && sizes.length > 0 && (
          <div className="pcard-sizes">
            {sizes.map(s => (
              <span key={s} className={`pcard-size-tag${p.attributes && Object.values(p.attributes).includes(s) ? ' active' : ''}`}>{s}</span>
            ))}
          </div>
        )}
        {showPrice && (
          <div className="pcard-price-row">
            <span className="pcard-price">{formatPrice(p.price, p)}</span>
            {showStrikethrough && p.old && <span className="pcard-old">{formatPrice(p.old || 0, p)}</span>}
            {showStrikethrough && d > 0 && <span className="pcard-save">{t('product.save')} {d}%</span>}
          </div>
        )}
        {showStock && p.stock <= 10 && (
          <div className={`pcard-stock ${p.stock <= 3 ? 'critical' : 'low'}`}>
            {p.stock <= 3 ? `🔥 ${t('product.onlyLeft').replace('{n}', String(p.stock))}` : `⚡ ${t('product.lowStock')}`}
          </div>
        )}
        <div className="pcard-btn-row">
          <button className="pcard-cart-btn" onClick={e => { e.stopPropagation(); onAddToCart(p); }}>
            <ShoppingBag size={14}/> {t('addToCart')}
          </button>
          {ff('ff_buy_now') && onBuyNow && (
            <button className="pcard-buy-now-btn" onClick={e => { e.stopPropagation(); onBuyNow(p); }}>
              <Zap size={14}/> {t('buyNow')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
