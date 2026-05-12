import React, { useState } from 'react';
import { ChevronRight, Truck, RotateCcw, Shield, Headphones, Zap, ArrowRight, Mail, Star, Quote } from 'lucide-react';
import { Theme, Page, Product, TFunc, FeatureFlag, Testimonial } from '../types';
import { products, categories, brandLogos } from '../data';
import { ProductCard } from './ProductCard';
import { BrandCarousel } from './BrandCarousel';
import { EngagementBanners } from './EngagementBanners';
import { ReferralBanner } from './ReferralBanner';

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
  featureFlags?: FeatureFlag[];
  testimonials?: Testimonial[];
  featuredProductIds?: number[];
}

export const HomePage: React.FC<HomePageProps> = ({
  theme, setPage, setFilter, onSelectProduct, onAddToCart,
  onToggleWishlist, onToggleCompare, wishlist, compareList, recentlyViewed, t, tc, tb, lang, formatPrice, featureFlags,
  testimonials, featuredProductIds
}) => {
  const ff = (id: string) => featureFlags?.find(f => f.id === id)?.enabled ?? true;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const heroContent = {
    'elegant-dark': { badge: t('heroTagElegant'), title: t('heroTitleElegant'), desc: t('heroDescElegant'), cta: t('heroCtaElegant') },
    'modern-soft': { badge: t('heroTagModern'), title: t('heroTitleModern'), desc: t('heroDescModern'), cta: t('heroCtaModern') },
    'royal-premium': { badge: t('heroTagRoyal'), title: t('heroTitleRoyal'), desc: t('heroDescRoyal'), cta: t('heroCtaRoyal') },
    'pure-minimalist': { badge: t('heroTagMinimal'), title: t('heroTitleMinimal'), desc: t('heroDescMinimal'), cta: t('heroCtaMinimal') },
    'natural-organic': { badge: t('heroTagNatural'), title: t('heroTitleNatural'), desc: t('heroDescNatural'), cta: t('heroCtaNatural') },
    'flag-saudi': { badge: t('heroTagSaudi'), title: t('heroTitleSaudi'), desc: t('heroDescSaudi'), cta: t('heroCtaSaudi') },
    'flag-uae': { badge: t('heroTagUae'), title: t('heroTitleUae'), desc: t('heroDescUae'), cta: t('heroCtaUae') },
    'flag-qatar': { badge: t('heroTagQatar'), title: t('heroTitleQatar'), desc: t('heroDescQatar'), cta: t('heroCtaQatar') },
    'flag-egypt': { badge: t('heroTagEgypt'), title: t('heroTitleEgypt'), desc: t('heroDescEgypt'), cta: t('heroCtaEgypt') },
    'flag-italy': { badge: t('heroTagItaly'), title: t('heroTitleItaly'), desc: t('heroDescItaly'), cta: t('heroCtaItaly') },
  };
  const hero = heroContent[theme] || heroContent['elegant-dark'];
  const featured = featuredProductIds && featuredProductIds.length > 0
    ? [...featuredProductIds.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[], ...products.filter(p => p.badge && !(featuredProductIds || []).includes(p.id))]
    : products.filter(p => p.badge);
  const activeTestimonials = (testimonials || []).filter(t => t.enabled);
  const recentProducts = products.filter(p => recentlyViewed.includes(p.id));

  return (
    <div className="home-page">
      {/* HERO */}
      {ff('ff_hero_banner') && <section className="hero">
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
              <img src="./assets/iphone.jpg" alt="Featured" className="hero-showcase-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>
          </div>
        </div>
      </section>}

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

      {/* CATEGORIES — removed: now merged into main navbar */}

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

      {/* BRAND CAROUSEL */}
      {ff('ff_brand_carousel') && <BrandCarousel t={t} brands={brandLogos} />}

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

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center' }}>
            <div>
              <h2 className="section-title">{t('testimonialsTitle')}</h2>
              <p className="section-subtitle">{t('testimonialsSubtitle')}</p>
            </div>
          </div>
          <div className="testimonials-grid">
            {activeTestimonials.map((review) => (
              <div key={review.id} className="testimonial-card">
                <div className="testimonial-quote"><Quote size={24} /></div>
                <p className="testimonial-text">
                  {lang === 'ar' ? review.textAr : lang === 'it' ? review.textIt : review.textEn}
                </p>
                <div className="testimonial-stars">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} fill={s <= review.rating ? '#f59e0b' : 'none'}
                      strokeWidth={s <= review.rating ? 0 : 1.5}
                      style={{ color: s <= review.rating ? '#f59e0b' : '#6b7280' }} />
                  ))}
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {(lang === 'ar' ? review.nameAr : lang === 'it' ? review.nameIt : review.nameEn)[0]}
                  </div>
                  <div>
                    <div className="testimonial-name">
                      {lang === 'ar' ? review.nameAr : lang === 'it' ? review.nameIt : review.nameEn}
                    </div>
                    <div className="testimonial-country">{review.country} {t('verifiedBuyer')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFERRAL BANNER */}
      {ff('ff_referral') && <ReferralBanner t={t} />}

      {/* ENGAGEMENT BANNERS */}
      {ff('ff_engagement_banners') && <EngagementBanners t={t} setPage={setPage} />}

      {/* BNPL BANNER */}
      <section className="section">
        <div className="section-inner">
          <div className="bnpl-banner">
            <div className="bnpl-content">
              <div className="bnpl-title">💳 {t('bnpl.title')}</div>
              <p className="bnpl-desc">{t('bnpl.desc')}</p>
              <div className="bnpl-icons">
                <div className="bnpl-icon-badge">🔄</div>
                <div className="bnpl-icon-badge">💳</div>
                <div className="bnpl-icon-badge">✅</div>
                <div className="bnpl-icon-badge">🛡️</div>
              </div>
            </div>
            <button className="btn-primary" onClick={() => setPage('shop')}>{t('bnpl.cta')}</button>
          </div>
        </div>
      </section>

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
