import React, { useState } from 'react';
import { ArrowLeft, Heart, Scale, ShoppingBag, Truck, RotateCcw, Shield, Star, Share2, Minus, Plus, Check, Zap } from 'lucide-react';
import { Product, Page } from '../types';
import { products, disc } from '../data';
import { Stars } from './ProductCard';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  setPage: (p: Page) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: number) => void;
  onToggleCompare: (id: number) => void;
  isInWishlist: boolean;
  isInCompare: boolean;
  onSelectProduct: (p: Product) => void;
  wishlist: number[];
  compareList: number[];
  t: (key: string) => string;
  tc?: (cat: string) => string;
  tb: (badge: string) => string;
  lang: string;
  formatPrice?: (price: number, product?: any) => string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product, setPage, onAddToCart, onToggleWishlist, onToggleCompare,
  isInWishlist, isInCompare, onSelectProduct, wishlist, compareList, t, tc, tb, lang, formatPrice
}) => {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [imgError, setImgError] = useState(false);
  const p = product;
  const d = disc(p);
  const related = products.filter(r => r.cat === p.cat && r.id !== p.id).slice(0, 4);

  // Get translated product name
  const getName = () => lang === 'ar' ? (p.nameAr || p.name) : lang === 'it' ? (p.nameIt || p.name) : p.name;
  // Get translated description
  const getDesc = () => lang === 'ar' ? (p.descAr || p.desc) : lang === 'it' ? (p.descIt || p.desc) : p.desc;
  // Get translated specs
  const getSpecs = (): string[] => {
    if (lang === 'ar' && p.specsAr && p.specsAr.length > 0) return p.specsAr;
    if (lang === 'it' && p.specsIt && p.specsIt.length > 0) return p.specsIt;
    return p.specs;
  };
  // Get translated category
  const getCat = () => tc ? tc(p.cat) : p.cat;

  // Sample reviews with translation
  const sampleReviews = [
    { name: lang === 'ar' ? 'أحمد م.' : lang === 'it' ? 'Marco R.' : 'Ahmed M.', rating: 5, date: '2026-04-28', text: t('sampleReview1') },
    { name: lang === 'ar' ? 'سارة ك.' : lang === 'it' ? 'Sara K.' : 'Sara K.', rating: 4, date: '2026-04-20', text: t('sampleReview2') },
    { name: lang === 'ar' ? 'عمر هـ.' : lang === 'it' ? 'Omar H.' : 'Omar H.', rating: 5, date: '2026-04-15', text: t('sampleReview3') },
  ];

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => setPage('shop')}>
        <ArrowLeft size={16}/> {t('backToShop')}
      </button>

      <div className="detail-main">
        <div className="detail-gallery">
          {!imgError ? (
            <img src={p.img} alt={getName()} className="detail-img"
              onError={() => setImgError(true)} />
          ) : (
            <div className="detail-img-fallback" style={{ background: p.grad }}>
              <span className="detail-emoji">{p.emoji}</span>
            </div>
          )}
          {p.badge && <span className={`detail-badge badge-${p.badge.toLowerCase().replace(/\s/g,'')}`}>{tb(p.badge)}</span>}
        </div>

        <div className="detail-info">
          <div className="detail-cat">{getCat()}</div>
          <h1 className="detail-name">{getName()}</h1>
          <div className="detail-rating">
            <Stars rating={p.rating} size={16} />
            <span>{p.rating}</span>
            <span className="detail-reviews">({p.reviews.toLocaleString()} {t('reviews')})</span>
          </div>

          <div className="detail-price-row">
            <span className="detail-price">{formatPrice ? formatPrice(p.price) : p.price}</span>
            {p.old && <span className="detail-old">{formatPrice ? formatPrice(p.old) : p.old}</span>}
            {d > 0 && <span className="detail-save">{t('save')} {d}%</span>}
          </div>

          <p className="detail-desc">{getDesc()}</p>

          <div className="detail-specs-quick">
            {getSpecs().map((s, i) => (
              <span key={i} className="detail-spec-tag"><Check size={12}/> {s}</span>
            ))}
          </div>

          <div className="detail-stock">
            {p.stock > 20 ? (
              <span className="stock-good"><Check size={14}/> {t('inStock')}</span>
            ) : p.stock > 0 ? (
              <span className="stock-low"><Zap size={14}/> {t('onlyXLeft').replace('{count}', String(p.stock))}</span>
            ) : (
              <span className="stock-out">{t('outOfStock')}</span>
            )}
          </div>

          <div className="detail-qty">
            <span>{t('quantity')}:</span>
            <div className="qty-control">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14}/></button>
              <span>{qty}</span>
              <button onClick={() => setQty(Math.min(p.stock, qty + 1))}><Plus size={14}/></button>
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn-add-to-cart" onClick={() => { for(let i = 0; i < qty; i++) onAddToCart(p); }}>
              <ShoppingBag size={18}/> {t('addToCart')} — {formatPrice ? formatPrice(p.price * qty) : p.price * qty}
            </button>
            <button className={`btn-icon${isInWishlist ? ' active' : ''}`}
              onClick={() => onToggleWishlist(p.id)}>
              <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
            <button className={`btn-icon${isInCompare ? ' active' : ''}`}
              onClick={() => onToggleCompare(p.id)}>
              <Scale size={18} />
            </button>
            <button className="btn-icon" title={t('share')}><Share2 size={18}/></button>
          </div>

          <div className="detail-promises">
            <div><Truck size={16}/> {t('freeShippingOver')}</div>
            <div><RotateCcw size={16}/> {t('thirtyDayReturns')}</div>
            <div><Shield size={16}/> {t('twoYearWarranty')}</div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="detail-tabs">
        <div className="tabs-nav">
          {(['desc', 'specs', 'reviews'] as const).map(tab => (
            <button key={tab} className={`tab-btn${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}>
              {tab === 'desc' ? t('description') : tab === 'specs' ? t('specifications') : `${t('reviews')} (${p.reviews.toLocaleString()})`}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {activeTab === 'desc' && (
            <div className="tab-desc">
              <p>{getDesc()}</p>
              <p>{t('productWarrantyDescription')}</p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="tab-specs">
              {getSpecs().map((s, i) => (
                <div key={i} className="spec-row">
                  <span className="spec-label">{t('feature')} {i + 1}</span>
                  <span className="spec-value">{s}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="tab-reviews">
              {sampleReviews.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-header">
                    <div className="review-avatar">{r.name[0]}</div>
                    <div>
                      <div className="review-name">{r.name}</div>
                      <Stars rating={r.rating} size={12} />
                    </div>
                    <span className="review-date">{r.date}</span>
                  </div>
                  <p className="review-text">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <div className="section">
          <div className="section-inner">
            <h2 className="section-title">{t('relatedProducts')}</h2>
            <div className="products-grid">
              {related.map(r => (
                <ProductCard lang={lang} tb={tb} key={r.id} p={r} onSelect={onSelectProduct} onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist} onToggleCompare={onToggleCompare}
                  isInWishlist={wishlist.includes(r.id)} isInCompare={compareList.includes(r.id)} t={t} formatPrice={formatPrice} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
