import React, { useState } from 'react';
import { ChevronRight, Truck, RotateCcw, Shield, Headphones, Zap, ArrowRight, Mail } from 'lucide-react';
import { Theme, Page, Product, TFunc } from '../types';
import { products, categories } from '../data';
import { ProductCard } from './ProductCard';

interface HomePageProps {
  theme: Theme;
  setPage: (p: Page) => void;
  setFilter: (c: string) => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: number) => void;
  onToggleCompare: (id: number) => void;
  wishlist: number[];
  compareList: number[];
  recentlyViewed: number[];
  t: TFunc;
  lang: string;
  tc: (cat: string) => string;
  tb: (badge: string) => string;
  formatPrice?: (price: number, product?: any) => string;
}

export const HomePage: React.FC<HomePageProps> = ({
  theme, setPage, setFilter, onSelectProduct, onAddToCart,
  onToggleWishlist, onToggleCompare, wishlist, compareList, recentlyViewed, t, tc, tb, lang, formatPrice
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const heroContent = {
    'elegant-dark': { badge: t('heroTagElegant'), title: t('heroTitleElegant'), desc: t('heroDescElegant'), cta: t('heroCtaElegant') },
    'modern-soft': { badge: t('heroTagModern'), title: t('heroTitleModern'), desc: t('heroDescModern'), cta: t('heroCtaModern') },
    'royal-premium': { badge: t('heroTagRoyal'), title: t('heroTitleRoyal'), desc: t('heroDescRoyal'), cta: t('heroCtaRoyal') },
    'pure-minimalist': { badge: t('heroTagMinimal'), title: t('heroTitleMinimal'), desc: t('heroDescMinimal'), cta: t('heroCtaMinimal') },
    'natural-organic': { badge: t('heroTagNatural'), title: t('heroTitleNatural'), desc: t('heroDescNatural'), cta: t('heroCtaNatural') },
  };
  const hero = heroContent[theme];
  const featured = products.filter(p => p.badge);
  const recentProducts = products.filter(p => recentlyViewed.includes(p.id));

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge"><Zap size={14}/> {hero.badge}</div>
            <h1 className="hero-title" style={{whiteSpace:'pre-line'}}>{hero.title}</h1>
            <p className="hero-desc">{hero.desc}</p>
            <div className="hero-actions">
              <button className="btn-hero-primary" onClick={() => setPage('shop')}>
                {hero.cta} <ChevronRight size={16}/>
              </button>
              <button className="btn-hero-secondary" onClick={() => setPage('shop')}>{t('viewAll')}</button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><strong>12K+</strong><span>{t('heroStatProducts')}</span></div>
              <div className="hero-stat"><strong>50K+</strong><span>{t('heroStatCustomers')}</span></div>
              <div className="hero-stat"><strong>4.9</strong><span>{t('heroStatRating')}</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-product-showcase">
              <img src="/assets/iphone.jpg" alt="Featured" className="hero-showcase-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trustbar">
        <div className="trustbar-inner">
          {[
            { icon: <Truck size={20}/>, title: t('freeShipping'), desc: t('freeShippingDesc') },
            { icon: <RotateCcw size={20}/>, title: t('easyReturns'), desc: t('easyReturnsDesc') },
            { icon: <Shield size={20}/>, title: t('securePayment'), desc: t('securePaymentDesc') },
            { icon: <Headphones size={20}/>, title: t('support247'), desc: t('support247Desc') },
          ].map((item, i) => (
            <div key={i} className="trust-item">
              <div className="trust-icon">{item.icon}</div>
              <div className="trust-text"><h4>{item.title}</h4><p>{item.desc}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <h2 className="section-title">{t('shopByCategory')}</h2>
              <p className="section-subtitle">{t('findExactly')}</p>
            </div>
            <button className="section-link" onClick={() => setPage('shop')}>{t('viewAll')} <ChevronRight size={14}/></button>
          </div>
          <div className="categories-grid">
            {categories.map(c => (
              <button key={c.name} className="cat-card" onClick={() => { setFilter(c.name); setPage('shop'); }}>
                <div className="cat-card-bg" style={{ background: c.grad }} />
                <div className="cat-card-content">
                  <div className="cat-card-emoji">{c.emoji}</div>
                  <div className="cat-card-name">{tc(c.name)}</div>
                  <div className="cat-card-count">{c.count}+ {t('heroStatProducts')}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FLASH SALE BANNER */}
      <section className="flash-sale-banner">
        <div className="flash-sale-inner">
          <div className="flash-sale-text">
            <span className="flash-sale-badge">{t('flashSale')}</span>
            <h2>{t('upTo40Off')}</h2>
            <p>{t('flashSaleDesc')}</p>
          </div>
          <button className="btn-hero-primary" onClick={() => { setFilter('Electronics'); setPage('shop'); }}>
            {t('shop')} {t('sale')} <ArrowRight size={16}/>
          </button>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <h2 className="section-title">{t('featuredProducts')}</h2>
              <p className="section-subtitle">{t('handpicked')}</p>
            </div>
            <button className="section-link" onClick={() => setPage('shop')}>{t('viewAll')} <ChevronRight size={14}/></button>
          </div>
          <div className="products-grid">
            {featured.slice(0, 8).map(p => (
              <ProductCard lang={lang} key={p.id} p={p} onSelect={onSelectProduct} onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist} onToggleCompare={onToggleCompare}
                isInWishlist={wishlist.includes(p.id)} isInCompare={compareList.includes(p.id)} t={t} tb={tb} formatPrice={formatPrice} />
            ))}
          </div>
        </div>
      </section>

      {/* RECENTLY VIEWED */}
      {recentProducts.length > 0 && (
        <section className="section">
          <div className="section-inner">
            <div className="section-header">
              <div>
                <h2 className="section-title">{t('recentlyViewed')}</h2>
                <p className="section-subtitle">{t('continueWhere')}</p>
              </div>
            </div>
            <div className="products-scroll">
              {recentProducts.map(p => (
                <ProductCard lang={lang} key={p.id} p={p} onSelect={onSelectProduct} onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist} onToggleCompare={onToggleCompare}
                  isInWishlist={wishlist.includes(p.id)} isInCompare={compareList.includes(p.id)} t={t} tb={tb} formatPrice={formatPrice} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="newsletter-inner">
          <div className="newsletter-content">
            <Mail size={32} className="newsletter-icon" />
            <h2>{t('stayInLoop')}</h2>
            <p>{t('newsletterDesc')}</p>
            {subscribed ? (
              <div className="newsletter-success">{t('subscribeSuccess')}</div>
            ) : (
              <div className="newsletter-form">
                <input type="email" placeholder={t('enterEmail')} value={email}
                  onChange={e => setEmail(e.target.value)} className="newsletter-input" />
                <button className="newsletter-btn" onClick={() => { if(email) setSubscribed(true); }}>{t('subscribe')}</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
