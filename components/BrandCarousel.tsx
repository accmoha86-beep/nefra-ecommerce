import React from 'react';
import { TFunc } from '../types';

interface BrandCarouselProps {
  t: TFunc;
  brands: { name: string; letter: string; nameAr?: string; count?: number }[];
  lang?: string;
}

export const BrandCarousel: React.FC<BrandCarouselProps> = ({ t, brands, lang }) => {
  const isAr = lang === 'ar';
  return (
    <section className="section brand-carousel-section">
      <div className="section-inner">
        <div className="section-header" style={{ textAlign:'center', justifyContent:'center' }}>
          <div>
            <h2 className="section-title">{t('brands.title')}</h2>
            <p className="section-subtitle">{t('brands.subtitle')}</p>
          </div>
        </div>
        <div className="brand-carousel-track">
          <div className="brand-carousel-scroll">
            {[...brands, ...brands].map((b, i) => (
              <div key={i} className="brand-logo-card">
                <span className="brand-logo-emoji">{b.letter}</span>
                <span className="brand-logo-name">{isAr && b.nameAr ? b.nameAr : b.name}</span>
                {b.count && <span className="brand-product-count">{b.count} {isAr ? 'منتج' : lang === 'it' ? 'prodotti' : 'products'}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
