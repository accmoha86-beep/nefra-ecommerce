import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ChevronDown, X, RotateCcw, Sparkles } from 'lucide-react';
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
  const filtersRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Reset dynamic attribute filters when category changes
  useEffect(() => {
    setSelectedAttrs({});
  }, [filter]);

  // ─── DYNAMIC ATTRIBUTES ENGINE ─────────────────────────────────
  const dynamicAttributes = useMemo(() => {
    const attrMap: Record<string, string[]> = {};
    const pool = filter !== 'All' ? products.filter(p => p.cat === filter) : products;
    pool.forEach(p => {
      if (p.attributes) {
        Object.entries(p.attributes).forEach(([key, val]) => {
          if (!attrMap[key]) attrMap[key] = [];
          if (!attrMap[key].includes(val)) attrMap[key].push(val);
        });
      }
    });
    Object.keys(attrMap).forEach(k => {
      attrMap[k].sort((a, b) => {
        const numA = parseFloat(a), numB = parseFloat(b);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return a.localeCompare(b);
      });
    });
    return attrMap;
  }, [filter]);

  const toggleAttr = (key: string, val: string) => {
    setSelectedAttrs(prev => ({ ...prev, [key]: prev[key] === val ? '' : val }));
  };

  // ─── FILTERED PRODUCTS ─────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...products];
    if (filter !== 'All') result = result.filter(p => p.cat === filter);
    if (selectedBrand !== 'All') result = result.filter(p => p.brand === selectedBrand);
    if (search) result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase())
    );
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);
    if (stockFilter === 'in') result = result.filter(p => p.stock > 0);
    if (stockFilter === 'out') result = result.filter(p => p.stock === 0);

    Object.entries(selectedAttrs).forEach(([key, val]) => {
      if (val) result = result.filter(p => p.attributes?.[key] === val);
    });

    switch (sort) {
      case 'price-low': return result.sort((a, b) => a.price - b.price);
      case 'price-high': return result.sort((a, b) => b.price - a.price);
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      case 'reviews': return result.sort((a, b) => b.reviews - a.reviews);
      case 'discount': return result.sort((a, b) => {
        const dA = a.old ? ((a.old - a.price) / a.old) : 0;
        const dB = b.old ? ((b.old - b.price) / b.old) : 0;
        return dB - dA;
      });
      case 'newest': return result.reverse();
      default: return result;
    }
  }, [filter, search, sort, priceRange, selectedBrand, minRating, stockFilter, selectedAttrs]);

  const attrFilterCount = Object.values(selectedAttrs).filter(Boolean).length;
  const activeFilterCount = [
    filter !== 'All',
    selectedBrand !== 'All',
    minRating > 0,
    stockFilter !== 'all',
    priceRange[1] < 20000,
  ].filter(Boolean).length + attrFilterCount;

  const resetAll = () => {
    setFilter('All');
    setSelectedBrand('All');
    setMinRating(0);
    setStockFilter('all');
    setPriceRange([0, 20000]);
    setSearch('');
    setSelectedAttrs({});
    setOpenDropdown(null);
  };

  const countForAttrValue = (key: string, val: string) => {
    const pool = filter !== 'All' ? products.filter(p => p.cat === filter) : products;
    return pool.filter(p => p.attributes?.[key] === val).length;
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const getDropdownLabel = (id: string): string => {
    switch (id) {
      case 'category': return filter !== 'All' ? tc(filter) : t('category');
      case 'brand': return selectedBrand !== 'All' ? selectedBrand : t('brand');
      case 'price': return priceRange[1] < 20000 ? `${t('priceRange')}: ${formatPrice ? formatPrice(priceRange[1]) : priceRange[1]}` : t('priceRange');
      case 'rating': return minRating > 0 ? `${'★'.repeat(minRating)} ${t('andUp')}` : t('rating');
      case 'stock': return stockFilter !== 'all' ? (stockFilter === 'in' ? t('inStock') : t('outOfStock')) : t('availability');
      default: {
        const val = selectedAttrs[id];
        const label = t('attr.' + id) !== 'attr.' + id ? t('attr.' + id) : id;
        return val ? `${label}: ${val}` : label;
      }
    }
  };

  const isFilterActive = (id: string): boolean => {
    switch (id) {
      case 'category': return filter !== 'All';
      case 'brand': return selectedBrand !== 'All';
      case 'price': return priceRange[1] < 20000;
      case 'rating': return minRating > 0;
      case 'stock': return stockFilter !== 'all';
      default: return !!selectedAttrs[id];
    }
  };

  // Collect all dropdown filter IDs
  const filterIds = ['category', 'brand', 'price', 'rating', 'stock', ...Object.keys(dynamicAttributes)];

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <div className="shop-header-left">
          <h1 className="shop-title">{filter === 'All' ? t('allProducts') : tc(filter)}</h1>
          <span className="shop-count">{filtered.length} {t('heroStatProducts')}</span>
        </div>
        <div className="shop-header-right">
          <div className="shop-search">
            <Search size={16} />
            <input placeholder={t('search')} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="shop-sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="featured">{t('featured')}</option>
            <option value="newest">{t('newest')}</option>
            <option value="price-low">{t('priceLowHigh')}</option>
            <option value="price-high">{t('priceHighLow')}</option>
            <option value="rating">{t('topRated')}</option>
            <option value="reviews">{t('mostReviews')}</option>
            <option value="discount">{t('biggestDiscount')}</option>
          </select>
        </div>
      </div>

      {/* Dropdown Filters Bar */}
      <div className="shop-dropdown-filters" ref={filtersRef}>
        <div className="dropdown-filters-row">
          {filterIds.map(id => (
            <div key={id} className={`filter-dropdown ${openDropdown === id ? 'open' : ''} ${isFilterActive(id) ? 'active' : ''}`}>
              <button className="filter-dropdown-btn" onClick={() => toggleDropdown(id)}>
                <span className="filter-dropdown-label">{getDropdownLabel(id)}</span>
                {isFilterActive(id) && (
                  <span className="filter-dropdown-clear" onClick={(e) => {
                    e.stopPropagation();
                    if (id === 'category') setFilter('All');
                    else if (id === 'brand') setSelectedBrand('All');
                    else if (id === 'price') setPriceRange([0, 20000]);
                    else if (id === 'rating') setMinRating(0);
                    else if (id === 'stock') setStockFilter('all');
                    else toggleAttr(id, selectedAttrs[id]);
                  }}><X size={12} /></span>
                )}
                <ChevronDown size={14} className={`filter-dropdown-arrow ${openDropdown === id ? 'rotated' : ''}`} />
              </button>

              {openDropdown === id && (
                <div className="filter-dropdown-panel">
                  {/* Category Dropdown */}
                  {id === 'category' && (
                    <div className="dropdown-options">
                      {cats.map(c => (
                        <button key={c} className={`dropdown-option ${filter === c ? 'selected' : ''}`}
                          onClick={() => { setFilter(c); setOpenDropdown(null); }}>
                          <span>{c === 'All' ? t('allItems') : tc(c)}</span>
                          <span className="dropdown-option-count">
                            {c === 'All' ? products.length : products.filter(p => p.cat === c).length}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Brand Dropdown */}
                  {id === 'brand' && (
                    <div className="dropdown-options">
                      {brands.map(b => (
                        <button key={b} className={`dropdown-option ${selectedBrand === b ? 'selected' : ''}`}
                          onClick={() => { setSelectedBrand(b); setOpenDropdown(null); }}>
                          <span>{b === 'All' ? t('allBrands') : b}</span>
                          <span className="dropdown-option-count">
                            {b === 'All' ? products.length : products.filter(p => p.brand === b).length}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Price Dropdown */}
                  {id === 'price' && (
                    <div className="dropdown-options dropdown-price">
                      <input type="range" min="0" max="20000" step="100" value={priceRange[1]}
                        onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="price-slider" />
                      <div className="price-labels">
                        <span>{formatPrice ? formatPrice(0) : '0'}</span>
                        <span>{formatPrice ? formatPrice(priceRange[1]) : priceRange[1].toString()}</span>
                      </div>
                    </div>
                  )}

                  {/* Rating Dropdown */}
                  {id === 'rating' && (
                    <div className="dropdown-options">
                      {[4, 3, 2, 1].map(r => (
                        <button key={r} className={`dropdown-option ${minRating === r ? 'selected' : ''}`}
                          onClick={() => { setMinRating(minRating === r ? 0 : r); setOpenDropdown(null); }}>
                          <span>{'★'.repeat(r)}{'☆'.repeat(5-r)} {t('andUp')}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Stock Dropdown */}
                  {id === 'stock' && (
                    <div className="dropdown-options">
                      {(['all', 'in', 'out'] as const).map(s => (
                        <button key={s} className={`dropdown-option ${stockFilter === s ? 'selected' : ''}`}
                          onClick={() => { setStockFilter(s); setOpenDropdown(null); }}>
                          <span>{s === 'all' ? t('allItems') : s === 'in' ? t('inStock') : t('outOfStock')}</span>
                          <span className="dropdown-option-count">
                            {s === 'all' ? products.length : s === 'in' ? products.filter(p => p.stock > 0).length : products.filter(p => p.stock === 0).length}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Dynamic Attribute Dropdown */}
                  {dynamicAttributes[id] && (
                    <div className="dropdown-options">
                      {dynamicAttributes[id].map(val => (
                        <button key={val} className={`dropdown-option ${selectedAttrs[id] === val ? 'selected' : ''}`}
                          onClick={() => { toggleAttr(id, val); setOpenDropdown(null); }}>
                          <span>{val}</span>
                          <span className="dropdown-option-count">{countForAttrValue(id, val)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Reset All Button */}
          {activeFilterCount > 0 && (
            <button className="filter-reset-btn" onClick={resetAll}>
              <RotateCcw size={14} /> {t('resetFilters')}
            </button>
          )}
        </div>

        {/* Active Filters Tags */}
        {activeFilterCount > 0 && (
          <div className="active-filters-bar">
            <span className="active-filters-label">{t('activeFilters')}:</span>
            {filter !== 'All' && (
              <span className="active-filter-tag" onClick={() => setFilter('All')}>
                {tc(filter)} <X size={12}/>
              </span>
            )}
            {selectedBrand !== 'All' && (
              <span className="active-filter-tag" onClick={() => setSelectedBrand('All')}>
                {selectedBrand} <X size={12}/>
              </span>
            )}
            {minRating > 0 && (
              <span className="active-filter-tag" onClick={() => setMinRating(0)}>
                {'★'.repeat(minRating)} {t('andUp')} <X size={12}/>
              </span>
            )}
            {stockFilter !== 'all' && (
              <span className="active-filter-tag" onClick={() => setStockFilter('all')}>
                {stockFilter === 'in' ? t('inStock') : t('outOfStock')} <X size={12}/>
              </span>
            )}
            {priceRange[1] < 20000 && (
              <span className="active-filter-tag" onClick={() => setPriceRange([0, 20000])}>
                {t('priceRange')} <X size={12}/>
              </span>
            )}
            {(Object.entries(selectedAttrs) as [string, string][]).map(([key, val]) => val ? (
              <span key={key} className="active-filter-tag" onClick={() => toggleAttr(key, val)}>
                {t('attr.' + key) !== 'attr.' + key ? t('attr.' + key) : key}: {val} <X size={12}/>
              </span>
            ) : null)}
          </div>
        )}
      </div>

      {/* Products Grid — full width now, no sidebar */}
      <div className="shop-grid-full">
        {/* Category Quick Chips — hidden when category nav bar is active */}
        {(!featureFlags || featureFlags.find(f => f.id === 'ff_category_nav')?.enabled !== true) &&
         (!featureFlags || featureFlags.find(f => f.id === 'ff_category_chips')?.enabled !== false) && (
          <div className="category-quick-chips">
            {categories.map(cat => (
              <button key={cat.name} className={`quick-chip${filter === cat.name ? ' active' : ''}`}
                onClick={() => setFilter(filter === cat.name ? 'All' : cat.name)}>
                <span className="quick-chip-emoji">{cat.emoji}</span>
                <span>{tc(cat.name)}</span>
                <span className="quick-chip-count">{cat.count}</span>
              </button>
            ))}
          </div>
        )}
        {filtered.length === 0 ? (
          <div className="shop-empty">
            <h3>{t('noProductsFound')}</h3>
            <p>{t('adjustFilters')}</p>
            <button className="btn-primary" onClick={resetAll}>{t('clearFilters')}</button>
          </div>
        ) : (
          <div className="products-grid products-grid-full">
            {filtered.map(p => (
              <ProductCard key={p.id} p={p} onSelect={onSelectProduct} onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist} onToggleCompare={onToggleCompare}
                isInWishlist={wishlist.includes(p.id)} isInCompare={compareList.includes(p.id)}
                t={t} tb={tb} lang={lang} formatPrice={formatPrice} featureFlags={featureFlags} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
