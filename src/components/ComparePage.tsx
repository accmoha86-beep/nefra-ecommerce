import React, { useState } from 'react';
import { Scale, X, ShoppingBag, Star, Check, Minus } from 'lucide-react';
import { Product, Page } from '../types';
import { products } from '../data';
import { Stars } from './ProductCard';

interface ComparePageProps {
  compareList: number[];
  onToggleCompare: (id: number) => void;
  onAddToCart: (p: Product) => void;
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
  tb: (badge: string) => string;
  formatPrice: (n: number) => string;
}

export const ComparePage: React.FC<ComparePageProps> = ({ compareList, onToggleCompare, onAddToCart, setPage, t, lang, tb , formatPrice }) => {
  const compareProducts = products.filter(p => compareList.includes(p.id));

  const rows: { label: string; getValue: (p: Product) => string }[] = [
    { label: t('category'), getValue: p => p.cat },
    { label: t('price'), getValue: p => formatPrice(p.price, p) },
    { label: t('rating'), getValue: p => `${p.rating} / 5` },
    { label: t('reviews'), getValue: p => p.reviews.toLocaleString() },
    { label: t('stock'), getValue: p => p.stock > 0 ? `${p.stock} ${t('available')}` : t('outOfStock') },
    ...([0,1,2,3].map(i => ({
      label: `${t('feature')} ${i + 1}`,
      getValue: (p: Product) => p.specs[i] || '—'
    }))),
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title"><Scale size={24}/> {t('compareProducts')}</h1>
          <p className="page-subtitle">{compareProducts.length} {t('ofMaxProductsSelected')}</p>
        </div>
      </div>

      {compareProducts.length === 0 ? (
        <div className="empty-state">
          <Scale size={64} style={{opacity:0.2}} />
          <h3>{t('noProductsToCompare')}</h3>
          <p>{t('compareEmptyDescription')}</p>
          <button className="btn-primary" onClick={() => setPage('shop')}>{t('browseProducts')}</button>
        </div>
      ) : (
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="compare-label-col">{t('product')}</th>
                {compareProducts.map(p => (
                  <th key={p.id} className="compare-product-col">
                    <div className="compare-product-header">
                      <button className="compare-remove" onClick={() => onToggleCompare(p.id)}><X size={14}/></button>
                      <img src={p.img} alt={p.name} className="compare-img" loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      <h4>{lang === 'ar' ? (p.nameAr || p.name) : lang === 'it' ? (p.nameIt || p.name) : p.name}</h4>
                      <Stars rating={p.rating} size={12} />
                      <span className="compare-price">{formatPrice(p.price, p)}</span>
                      <button className="btn-sm-primary" onClick={() => onAddToCart(p)}>
                        <ShoppingBag size={12}/> {t('addToCart')}
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="compare-label">{row.label}</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="compare-value">{row.getValue(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
