import React from 'react';
import { Heart, ShoppingBag, Trash2, Share2 } from 'lucide-react';
import { Product, Page } from '../types';
import { products } from '../data';
import { ProductCard } from './ProductCard';

interface WishlistPageProps {
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  onToggleCompare: (id: number) => void;
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  compareList: number[];
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
  tb: (badge: string) => string;
  formatPrice?: (price: number, product?: any) => string;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlist, onToggleWishlist, onToggleCompare, onAddToCart, onSelectProduct, compareList, setPage, t, lang, tb, formatPrice
}) => {
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title"><Heart size={24}/> {t('myWishlist')}</h1>
          <p className="page-subtitle">{wishlistProducts.length} {t('savedItems')}</p>
        </div>
        {wishlistProducts.length > 0 && (
          <div className="page-actions">
            <button className="btn-outline"><Share2 size={14}/> {t('shareWishlist')}</button>
            <button className="btn-primary" onClick={() => wishlistProducts.forEach(p => onAddToCart(p))}>
              <ShoppingBag size={14}/> {t('addAllToCart')}
            </button>
          </div>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="empty-state">
          <Heart size={64} style={{opacity:0.2}} />
          <h3>{t('wishlistEmpty')}</h3>
          <p>{t('wishlistEmptyDescription')}</p>
          <button className="btn-primary" onClick={() => setPage('shop')}>{t('browseProducts')}</button>
        </div>
      ) : (
        <div className="products-grid">
          {wishlistProducts.map(p => (
            <ProductCard key={p.id} p={p} onSelect={onSelectProduct} onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist} onToggleCompare={onToggleCompare}
              isInWishlist={true} isInCompare={compareList.includes(p.id)} t={t} tb={tb} lang={lang} formatPrice={formatPrice} />
          ))}
        </div>
      )}
    </div>
  );
};
