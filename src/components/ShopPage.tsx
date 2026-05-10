import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw, Sparkles } from 'lucide-react';
import { Product, Page, TFunc } from '../types';
import { products, cats, brands } from '../data';
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
}

export const ShopPage: React.FC<ShopPageProps> = ({
  filter, setFilter, onSelectProduct, onAddToCart,
  onToggleWishlist, onToggleCompare, wishlist, compareList,
  t, tc, tb, lang, formatPrice
}) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [stockFilter, setStockFilter] = useState('all');
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>({});

  // Reset dynamic attribute filters when category changes
  useEffect(() => {
    setSelectedAttrs({});
  }, [filter]);

  // ─── DYNAMIC ATTRIBUTES ENGINE ─────────────────────────────────
  // Scans ALL products (or category-filtered) and extracts unique attribute keys + values.
  // When a new product with new attributes is added → filters auto-appear!
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
    // Sort values naturally (numbers first, then alpha)
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
    setSelectedAttrs(prev => ({
      ...prev,
      [key]: prev[key] === val ? '' : val
    }));
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

    // Dynamic attribute filtering
    Object.entries(selectedAttrs).forEach(([key, val]) => {
      if (val) result = result.filter(p => p.attributes?.[key] === val);
    });

    switch (sort) {
      case 'price-low': return result.sort((a, b) => a.price - b.price);
      case 'price-high': return result.sort((a, b) => b.price - a.price);
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      case 'reviews': return result.sort((a, b) => b.reviews - a.reviews);
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
  };

  // Count products matching a specific attribute value (respects current category)
  const countForAttrValue = (key: string, val: string) => {
    const pool = filter !== 'All' ? products.filter(p => p.cat === filter) : products;
    return pool.filter(p => p.attributes?.[key] === val).length;
  };

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
          <button className={`shop-filter-toggle${showFilters ? ' active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal size={16}/> {t('filterBy')}
            {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
          </button>
          <select className="shop-sort" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="featured">{t('featured')}</option>
            <option value="newest">{t('newest')}</option>
            <option value="price-low">{t('priceLowHigh')}</option>
            <option value="price-high">{t('priceHighLow')}</option>
            <option value="rating">{t('topRated')}</option>
            <option value="reviews">{t('mostReviews')}</option>
          </select>
        </div>
      </div>

      {/* Active Filters Bar */}
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
          {/* Dynamic attribute active tags */}
          {(Object.entries(selectedAttrs) as [string, string][]).map(([key, val]) => val ? (
            <span key={key} className="active-filter-tag" onClick={() => toggleAttr(key, val)}>
              {t('attr.' + key)}: {val} <X size={12}/>
            </span>
          ) : null)}
          <button className="reset-filters-btn" onClick={resetAll}>
            <RotateCcw size={12}/> {t('resetFilters')}
          </button>
        </div>
      )}

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className={`shop-sidebar${showFilters ? ' open' : ''}`}>
          {/* Category Filter */}
          <div className="filter-section">
            <h3 className="filter-title">{t('category')}</h3>
            <div className="filter-options">
              {cats.map(c => (
                <button key={c} className={`filter-chip${filter === c ? ' active' : ''}`}
                  onClick={() => setFilter(c)}>
                  {c === 'All' ? t('allItems') : tc(c)}
                  <span className="filter-chip-count">
                    {c === 'All' ? products.length : products.filter(p => p.cat === c).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="filter-section">
            <h3 className="filter-title">{t('brand')}</h3>
            <div className="filter-options">
              {brands.map(b => (
                <button key={b} className={`filter-chip${selectedBrand === b ? ' active' : ''}`}
                  onClick={() => setSelectedBrand(b)}>
                  {b === 'All' ? t('allBrands') : b}
                  <span className="filter-chip-count">
                    {b === 'All' ? products.length : products.filter(p => p.brand === b).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <h3 className="filter-title">{t('priceRange')}</h3>
            <div className="price-range">
              <input type="range" min="0" max="20000" step="100" value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="price-slider" />
              <div className="price-labels">
                <span>{formatPrice ? formatPrice(0) : '0'}</span>
                <span>{formatPrice ? formatPrice(priceRange[1]) : priceRange[1].toString()}</span>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-section">
            <h3 className="filter-title">{t('rating')}</h3>
            <div className="filter-options">
              {[4, 3, 2].map(r => (
                <button key={r} className={`filter-chip${minRating === r ? ' active' : ''}`}
                  onClick={() => setMinRating(minRating === r ? 0 : r)}>
                  {'★'.repeat(r)}{'☆'.repeat(5-r)} {t('andUp')}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="filter-section">
            <h3 className="filter-title">{t('availability')}</h3>
            <div className="filter-options">
              {(['all', 'in', 'out'] as const).map(s => (
                <button key={s} className={`filter-chip${stockFilter === s ? ' active' : ''}`}
                  onClick={() => setStockFilter(s)}>
                  {s === 'all' ? t('allItems') : s === 'in' ? t('inStock') : t('outOfStock')}
                  {s === 'all' && <span className="filter-chip-count">{products.length}</span>}
                  {s === 'in' && <span className="filter-chip-count">{products.filter(p => p.stock > 0).length}</span>}
                  {s === 'out' && <span className="filter-chip-count">{products.filter(p => p.stock === 0).length}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* ═══ DYNAMIC SMART FILTERS ═══ */}
          {Object.keys(dynamicAttributes).length > 0 && (
            <div className="smart-filters-divider">
              <Sparkles size={14} />
              <span>{t('dynamicFilters')}</span>
              <div className="divider-line" />
            </div>
          )}

          {(Object.entries(dynamicAttributes) as [string, string[]][]).map(([attrKey, values]) => (
            <div className="filter-section" key={attrKey}>
              <h3 className="filter-title filter-title-smart">
                {t('attr.' + attrKey) !== 'attr.' + attrKey ? t('attr.' + attrKey) : attrKey}
              </h3>
              <div className="filter-options">
                {values.map(val => (
                  <button key={val}
                    className={`filter-chip${selectedAttrs[attrKey] === val ? ' active' : ''}`}
                    onClick={() => toggleAttr(attrKey, val)}>
                    {val}
                    <span className="filter-chip-count">
                      {countForAttrValue(attrKey, val)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Reset Button */}
          {activeFilterCount > 0 && (
            <button className="btn-outline" style={{width:'100%',marginTop:'0.5rem'}} onClick={resetAll}>
              <RotateCcw size={14}/> {t('resetFilters')}
            </button>
          )}
        </aside>

        {/* Products Grid */}
        <div className="shop-grid-area">
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
                  t={t} tb={tb} lang={lang} formatPrice={formatPrice} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
