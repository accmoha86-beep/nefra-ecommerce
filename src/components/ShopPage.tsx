import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ChevronDown, X, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Product, Page, TFunc, FeatureFlag } from '../types';
import { products, cats, brands, categories } from '../data';
import { ProductCard } from './ProductCard';

interface ShopPageProps {
  filter: string;
  setFilter: (c: string) => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: number) => void;
  onToggleCompare: (id: number) => void;
  wishlist: number[];
  compareList: number[];
  t: TFunc;
  lang: string;
  tc: (cat: string) => string;
  tb: (badge: string) => string;
  formatPrice?: (price: number, product?: any) => string;
  featureFlags?: FeatureFlag[];
}

export const ShopPage: React.FC<ShopPageProps> = ({
  filter, setFilter, onSelectProduct, onAddToCart,
  onToggleWishlist, onToggleCompare, wishlist, compareList,
  t, tc, tb, lang, formatPrice, featureFlags
}) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [stockFilter, setStockFilter] = useState('all');
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setSelectedAttrs({});
  }, [filter]);

  const dynamicAttributes = useMemo(() => {
    const base = filter === 'All' ? products : products.filter(p => p.cat === filter);
    const attrMap: Record<string, string[]> = {};
    base.forEach(p => {
      if (p.attributes) {
        Object.entries(p.attributes).forEach(([key, val]) => {
          if (!attrMap[key]) attrMap[key] = [];
          String(val).split(',').forEach(v => {
            const trimmed = v.trim();
            if (trimmed && !attrMap[key].includes(trimmed)) attrMap[key].push(trimmed);
          });
        });
      }
    });
    Object.keys(attrMap).forEach(key => {
      attrMap[key].sort((a, b) => {
        const numA = parseFloat(a); const numB = parseFloat(b);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return a.localeCompare(b);
      });
    });
    return attrMap;
  }, [filter]);

  const toggleAttr = (key: string, val: string) => {
    setSelectedAttrs(prev => ({ ...prev, [key]: prev[key] === val ? '' : val }));
  };

  const filtered = useMemo(() => {
    let result = filter === 'All' ? [...products] : products.filter(p => p.cat === filter);
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(s) || p.brand?.toLowerCase().includes(s) ||
        p.nameAr?.includes(s) || p.nameIt?.toLowerCase().includes(s));
    }
    if (selectedBrand !== 'All') result = result.filter(p => p.brand === selectedBrand);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);
    if (stockFilter === 'in') result = result.filter(p => p.stock > 0);
    if (stockFilter === 'out') result = result.filter(p => p.stock === 0);
    (Object.entries(selectedAttrs) as [string, string][]).forEach(([key, val]) => {
      if (val) result = result.filter(p => p.attributes && (p.attributes as Record<string, string>)[key]?.includes(val));
    });
    switch (sort) {
      case 'price-low': return result.sort((a, b) => a.price - b.price);
      case 'price-high': return result.sort((a, b) => b.price - a.price);
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      case 'newest': return result.sort((a, b) => b.id - a.id);
      case 'reviews': return result.sort((a, b) => b.reviews - a.reviews);
      default: return result;
    }
  }, [filter, search, sort, selectedBrand, priceRange, minRating, stockFilter, selectedAttrs]);

  const resetAll = () => {
    setFilter('All'); setSelectedBrand('All'); setPriceRange([0, 20000]);
    setMinRating(0); setStockFilter('all'); setSelectedAttrs({}); setSearch('');
  };

  const activeFilterCount = (filter !== 'All' ? 1 : 0) + (selectedBrand !== 'All' ? 1 : 0) +
    (priceRange[1] < 20000 ? 1 : 0) + (minRating > 0 ? 1 : 0) + (stockFilter !== 'all' ? 1 : 0) +
    Object.values(selectedAttrs).filter(Boolean).length;

  const toggleDropdown = (id: string) => setOpenDropdown(prev => prev === id ? null : id);

  const dynamicAttrKeys = Object.keys(dynamicAttributes);

  return (
    <div className="shop-page">
      {/* Top Bar: Title + Search + Sort */}
      <div className="shop-topbar">
        <div className="shop-topbar-left">
          <h1 className="shop-title">{filter === 'All' ? t('allProducts') : tc(filter)}</h1>
          <span className="shop-count">{filtered.length} {t('heroStatProducts')}</span>
        </div>
        <div className="shop-topbar-right">
          <div className="shop-search-box">
            <Search size={16} />
            <input placeholder={t('search')} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="shop-sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="featured">{t('featured')}</option>
            <option value="newest">{t('newest')}</option>
            <option value="price-low">{t('priceLowHigh')}</option>
            <option value="price-high">{t('priceHighLow')}</option>
            <option value="rating">{t('topRated')}</option>
            <option value="reviews">{t('mostReviews')}</option>
          </select>
        </div>
      </div>

      {/* Filters Row */}
      <div className="shop-filters-bar" ref={filtersRef}>
        {/* Category chips */}
        <div className="filter-chips-row">
          {cats.map(c => (
            <button key={c} className={`filter-chip ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}>
              {c === 'All' ? t('allItems') : tc(c)}
              <span className="filter-chip-count">
                {c === 'All' ? products.length : products.filter(p => p.cat === c).length}
              </span>
            </button>
          ))}
        </div>

        {/* Dropdown filters: Brand, Price, Rating, Stock + More */}
        <div className="filter-dropdowns-row">
          {/* Brand */}
          <div className={`fdrop ${openDropdown === 'brand' ? 'open' : ''} ${selectedBrand !== 'All' ? 'active' : ''}`}>
            <button className="fdrop-btn" onClick={() => toggleDropdown('brand')}>
              {selectedBrand !== 'All' ? selectedBrand : t('brand')}
              {selectedBrand !== 'All' && (
                <span className="fdrop-clear" onClick={e => { e.stopPropagation(); setSelectedBrand('All'); }}>
                  <X size={10} />
                </span>
              )}
              <ChevronDown size={13} className={`fdrop-arrow ${openDropdown === 'brand' ? 'rot' : ''}`} />
            </button>
            {openDropdown === 'brand' && (
              <div className="fdrop-panel">
                {brands.map(b => (
                  <button key={b} className={`fdrop-opt ${selectedBrand === b ? 'sel' : ''}`}
                    onClick={() => { setSelectedBrand(b); setOpenDropdown(null); }}>
                    <span>{b === 'All' ? t('allBrands') : b}</span>
                    <span className="fdrop-cnt">{b === 'All' ? products.length : products.filter(p => p.brand === b).length}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price */}
          <div className={`fdrop ${openDropdown === 'price' ? 'open' : ''} ${priceRange[1] < 20000 ? 'active' : ''}`}>
            <button className="fdrop-btn" onClick={() => toggleDropdown('price')}>
              {priceRange[1] < 20000 ? `${t('priceRange')}: ${formatPrice ? formatPrice(priceRange[1]) : priceRange[1]}` : t('priceRange')}
              {priceRange[1] < 20000 && (
                <span className="fdrop-clear" onClick={e => { e.stopPropagation(); setPriceRange([0, 20000]); }}>
                  <X size={10} />
                </span>
              )}
              <ChevronDown size={13} className={`fdrop-arrow ${openDropdown === 'price' ? 'rot' : ''}`} />
            </button>
            {openDropdown === 'price' && (
              <div className="fdrop-panel fdrop-price">
                <input type="range" min="0" max="20000" step="100" value={priceRange[1]}
                  onChange={e => setPriceRange([0, parseInt(e.target.value)])} className="price-slider" />
                <div className="price-labels">
                  <span>{formatPrice ? formatPrice(0) : '0'}</span>
                  <span>{formatPrice ? formatPrice(priceRange[1]) : priceRange[1].toString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className={`fdrop ${openDropdown === 'rating' ? 'open' : ''} ${minRating > 0 ? 'active' : ''}`}>
            <button className="fdrop-btn" onClick={() => toggleDropdown('rating')}>
              {minRating > 0 ? `${'★'.repeat(minRating)} ${t('andUp')}` : t('rating')}
              {minRating > 0 && (
                <span className="fdrop-clear" onClick={e => { e.stopPropagation(); setMinRating(0); }}>
                  <X size={10} />
                </span>
              )}
              <ChevronDown size={13} className={`fdrop-arrow ${openDropdown === 'rating' ? 'rot' : ''}`} />
            </button>
            {openDropdown === 'rating' && (
              <div className="fdrop-panel">
                {[4, 3, 2, 1].map(r => (
                  <button key={r} className={`fdrop-opt ${minRating === r ? 'sel' : ''}`}
                    onClick={() => { setMinRating(minRating === r ? 0 : r); setOpenDropdown(null); }}>
                    {'★'.repeat(r)}{'☆'.repeat(5-r)} {t('andUp')}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stock */}
          <div className={`fdrop ${openDropdown === 'stock' ? 'open' : ''} ${stockFilter !== 'all' ? 'active' : ''}`}>
            <button className="fdrop-btn" onClick={() => toggleDropdown('stock')}>
              {stockFilter === 'in' ? t('inStock') : stockFilter === 'out' ? t('outOfStock') : t('availability')}
              {stockFilter !== 'all' && (
                <span className="fdrop-clear" onClick={e => { e.stopPropagation(); setStockFilter('all'); }}>
                  <X size={10} />
                </span>
              )}
              <ChevronDown size={13} className={`fdrop-arrow ${openDropdown === 'stock' ? 'rot' : ''}`} />
            </button>
            {openDropdown === 'stock' && (
              <div className="fdrop-panel">
                {(['all', 'in', 'out'] as const).map(s => (
                  <button key={s} className={`fdrop-opt ${stockFilter === s ? 'sel' : ''}`}
                    onClick={() => { setStockFilter(s); setOpenDropdown(null); }}>
                    {s === 'all' ? t('allItems') : s === 'in' ? t('inStock') : t('outOfStock')}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* More Filters Button — shows dynamic attributes */}
          {dynamicAttrKeys.length > 0 && (
            <button className={`fdrop-btn fdrop-more ${showMoreFilters ? 'open' : ''} ${Object.values(selectedAttrs).some(Boolean) ? 'active' : ''}`}
              onClick={() => setShowMoreFilters(!showMoreFilters)}>
              <SlidersHorizontal size={14} />
              {t('moreFilters') !== 'moreFilters' ? t('moreFilters') : lang === 'ar' ? 'فلاتر إضافية' : lang === 'it' ? 'Altri filtri' : 'More Filters'}
              {Object.values(selectedAttrs).filter(Boolean).length > 0 && (
                <span className="fdrop-badge">{Object.values(selectedAttrs).filter(Boolean).length}</span>
              )}
            </button>
          )}

          {/* Reset */}
          {activeFilterCount > 0 && (
            <button className="filter-reset-pill" onClick={resetAll}>
              <RotateCcw size={13} />
              {t('resetFilters') !== 'resetFilters' ? t('resetFilters') : lang === 'ar' ? 'إعادة ضبط' : 'Reset'}
            </button>
          )}
        </div>

        {/* Expanded More Filters Panel */}
        {showMoreFilters && dynamicAttrKeys.length > 0 && (
          <div className="more-filters-panel">
            {dynamicAttrKeys.map(key => (
              <div key={key} className="mf-group">
                <span className="mf-label">{t('attr.' + key) !== 'attr.' + key ? t('attr.' + key) : key}</span>
                <div className="mf-options">
                  {dynamicAttributes[key].map(val => (
                    <button key={val} className={`mf-chip ${selectedAttrs[key] === val ? 'active' : ''}`}
                      onClick={() => toggleAttr(key, val)}>
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Active Filters Tags */}
        {activeFilterCount > 0 && (
          <div className="active-tags-row">
            {filter !== 'All' && (
              <span className="active-tag" onClick={() => setFilter('All')}>{tc(filter)} <X size={11}/></span>
            )}
            {selectedBrand !== 'All' && (
              <span className="active-tag" onClick={() => setSelectedBrand('All')}>{selectedBrand} <X size={11}/></span>
            )}
            {minRating > 0 && (
              <span className="active-tag" onClick={() => setMinRating(0)}>{'★'.repeat(minRating)} {t('andUp')} <X size={11}/></span>
            )}
            {stockFilter !== 'all' && (
              <span className="active-tag" onClick={() => setStockFilter('all')}>
                {stockFilter === 'in' ? t('inStock') : t('outOfStock')} <X size={11}/>
              </span>
            )}
            {priceRange[1] < 20000 && (
              <span className="active-tag" onClick={() => setPriceRange([0, 20000])}>
                {formatPrice ? formatPrice(priceRange[1]) : priceRange[1]} {t('maxPrice') !== 'maxPrice' ? t('maxPrice') : 'max'} <X size={11}/>
              </span>
            )}
            {Object.entries(selectedAttrs).map(([k, v]) => v ? (
              <span key={k} className="active-tag" onClick={() => toggleAttr(k, String(v))}>
                {t('attr.' + k) !== 'attr.' + k ? t('attr.' + k) : k}: {String(v)} <X size={11}/>
              </span>
            ) : null)}
          </div>
        )}
      </div>

      {/* Products Grid — Full Width */}
      {filtered.length === 0 ? (
        <div className="shop-empty">
          <h3>{t('noProductsFound')}</h3>
          <p>{t('adjustFilters')}</p>
          <button className="btn-primary" onClick={resetAll}>{t('clearFilters')}</button>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} onSelect={onSelectProduct} onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist} onToggleCompare={onToggleCompare}
              isInWishlist={wishlist.includes(p.id)} isInCompare={compareList.includes(p.id)}
              t={t} tb={tb} lang={lang} formatPrice={formatPrice} featureFlags={featureFlags} />
          ))}
        </div>
      )}

      {/* SEO Text Block */}
      <div className="shop-seo-block">
        <h2 className="shop-seo-title">{t('shop.seo.title')}</h2>
        <p className="shop-seo-text">{t('shop.seo.text')}</p>
      </div>
    </div>
  );
};
