import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingBag, Scale } from 'lucide-react';
import { Product, TFunc } from '../types';
import { disc } from '../data';

interface ProductCardProps {
  p: Product;
  onSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: number) => void;
  onToggleCompare: (id: number) => void;
  isInWishlist: boolean;
  isInCompare: boolean;
  t: TFunc;
  formatPrice: (n: number) => string;
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

export const ProductCard: React.FC<ProductCardProps> = ({ p, onSelect, onAddToCart, onToggleWishlist, onToggleCompare, isInWishlist, isInCompare, t, tb, lang, formatPrice }) => {
  const [imgError, setImgError] = useState(false);
  const d = disc(p);

  return (
    <div className="pcard" onClick={() => onSelect(p)}>
      <div className="pcard-img-wrap">
        {!imgError ? (
          <img src={p.img} alt={p.name} className="pcard-img" loading="lazy"
            onError={() => setImgError(true)} />
        ) : (
          <div className="pcard-img-fallback" style={{ background: p.grad }}>
            <span className="pcard-emoji">{p.emoji}</span>
          </div>
        )}
        {p.badge && <span className={`pcard-badge badge-${p.badge.toLowerCase().replace(/\s/g,'')}`}>{tb(p.badge)}</span>}
        {d > 0 && <span className="pcard-discount">-{d}%</span>}
        <div className="pcard-actions">
          <button className={`pcard-action-btn${isInWishlist ? ' active' : ''}`}
            onClick={e => { e.stopPropagation(); onToggleWishlist(p.id); }} title={t('wishlist')}>
            <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
          </button>
          <button className={`pcard-action-btn${isInCompare ? ' active' : ''}`}
            onClick={e => { e.stopPropagation(); onToggleCompare(p.id); }} title={t('compare')}>
            <Scale size={16} />
          </button>
          <button className="pcard-action-btn"
            onClick={e => { e.stopPropagation(); onSelect(p); }} title={t('view')}>
            <Eye size={16} />
          </button>
        </div>
      </div>
      <div className="pcard-info">
        <div className="pcard-cat">{p.cat}</div>
        <h3 className="pcard-name">{lang === 'ar' ? (p.nameAr || p.name) : lang === 'it' ? (p.nameIt || p.name) : p.name}</h3>
        <div className="pcard-rating">
          <Stars rating={p.rating} />
          <span className="pcard-reviews">({p.reviews.toLocaleString()})</span>
        </div>
        <div className="pcard-price-row">
          <span className="pcard-price">{formatPrice(p.price)}</span>
          {p.old && <span className="pcard-old">{formatPrice(p.old)}</span>}
        </div>
        <button className="pcard-cart-btn" onClick={e => { e.stopPropagation(); onAddToCart(p); }}>
          <ShoppingBag size={14}/> {t('addToCart')}
        </button>
      </div>
    </div>
  );
};
