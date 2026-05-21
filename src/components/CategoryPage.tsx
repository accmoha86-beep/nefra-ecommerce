import React, { useState, useMemo } from 'react';
import { Product, CategoryInfo, FeatureFlag, Page } from '../types';
import { categories, products as allProductsData } from '../data';
import { ShoppingCart, Heart, Eye, ArrowLeft, ArrowRight, Star, ChevronDown, ChevronUp, Grid, List, SlidersHorizontal } from 'lucide-react';

interface CategoryPageProps {
  categoryId: string;
  lang: string;
  t: (k: string) => string;
  tc: (cat: string) => string;
  tb: (badge: string) => string;
  formatPrice: (n: number) => string;
  getProductName: (p: Product) => string;
  getProductDesc: (p: Product) => string;
  setPage: (p: Page) => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (id: string) => void;
  wishlist: string[];
  compareList: string[];
  featureFlags: FeatureFlag[];
  productsData?: Product[];
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId, lang, t, tc, tb, formatPrice, getProductName, getProductDesc,
  setPage, onSelectProduct, onAddToCart, onToggleWishlist, onToggleCompare,
  wishlist, compareList, featureFlags, productsData
}) => {
  const [selectedSubCat, setSelectedSubCat] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 99999]);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const isRTL = lang === 'ar';
  const products = productsData || allProductsData;

  const ff = (id: string) => featureFlags.find(f => f.id === id)?.enabled ?? false;

  // Get category info
  const category = useMemo(() => categories.find(c => c.id === categoryId && c.level === 1), [categoryId]);
  const subCategories = useMemo(() =>
    categories.filter(c => c.parentId === categoryId && c.level === 2 && c.enabled).sort((a, b) => a.order - b.order),
    [categoryId]
  );

  // Get category name by lang
  const getCatName = (c: CategoryInfo) => lang === 'ar' ? c.nameAr : lang === 'it' ? (c.nameIt || c.name) : c.name;

  // Get products for this category
  const categoryProducts = useMemo(() => {
    if (!category) return [];
    // Special filter-based categories
    if (category.filterType === 'offers') return products.filter(p => p.isOnSale && !p.hidden);
    if (category.filterType === 'new') return products.filter(p => (p.isNew || p.isBestSeller) && !p.hidden);

    // Normal categories — get all L2 subcategory names
    const subNames = subCategories.map(s => s.name);
    return products.filter(p => !p.hidden && subNames.includes(p.cat));
  }, [category, products, subCategories]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts;
    if (selectedSubCat) {
      const subCat = subCategories.find(s => s.id === selectedSubCat);
      if (subCat) filtered = filtered.filter(p => p.cat === subCat.name);
    }
    if (selectedBrand !== 'all') filtered = filtered.filter(p => p.brand === selectedBrand);
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc': return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...filtered].sort((a, b) => b.price - a.price);
      case 'name': return [...filtered].sort((a, b) => getProductName(a).localeCompare(getProductName(b)));
      case 'rating': return [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest': return [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default: return filtered;
    }
  }, [categoryProducts, selectedSubCat, sortBy, selectedBrand, priceRange, subCategories]);

  // Get brands in this category
  const brandsInCategory = useMemo(() => {
    const brands = [...new Set(categoryProducts.map(p => p.brand).filter(Boolean))];
    return brands.sort();
  }, [categoryProducts]);

  // Product count per subcategory
  const subCatCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    subCategories.forEach(sc => {
      counts[sc.id] = categoryProducts.filter(p => p.cat === sc.name).length;
    });
    return counts;
  }, [subCategories, categoryProducts]);

  if (!category) return <div className="cat-page-empty"><p>{t('categoryNotFound') || 'Category not found'}</p></div>;

  return (
    <div className="category-page">
      {/* ═══ HERO SECTION ═══ */}
      <div className="cat-hero">
        <div className="cat-hero-bg" />
        <div className="cat-hero-content">
          <h1 className="cat-hero-title">{getCatName(category)}</h1>
          <p className="cat-hero-count">
            {categoryProducts.length} {lang === 'ar' ? 'منتج' : lang === 'it' ? 'prodotti' : 'products'}
          </p>
          <div className="cat-hero-breadcrumb">
            <button onClick={() => setPage('home')}>{t('home')}</button>
            <span className="cat-bc-sep">/</span>
            <span>{getCatName(category)}</span>
          </div>
        </div>
      </div>

      {/* ═══ SUBCATEGORY CARDS ═══ */}
      {subCategories.length > 0 && (
        <div className="cat-subcategories">
          <div className="cat-sub-grid">
            <button
              className={`cat-sub-card ${!selectedSubCat ? 'active' : ''}`}
              onClick={() => setSelectedSubCat(null)}
            >
              <span className="cat-sub-name">{lang === 'ar' ? 'الكل' : lang === 'it' ? 'Tutti' : 'All'}</span>
              <span className="cat-sub-count">{categoryProducts.length}</span>
            </button>
            {subCategories.map(sub => {
              const count = subCatCounts[sub.id] || 0;
              return (
                <button
                  key={sub.id}
                  className={`cat-sub-card ${selectedSubCat === sub.id ? 'active' : ''} ${count === 0 ? 'empty' : ''}`}
                  onClick={() => count > 0 ? setSelectedSubCat(sub.id === selectedSubCat ? null : sub.id) : null}
                >
                  <span className="cat-sub-name">{getCatName(sub)}</span>
                  {count > 0 ? (
                    <span className="cat-sub-count">{count}</span>
                  ) : (
                    <span className="cat-sub-soon">{lang === 'ar' ? 'قريبًا' : lang === 'it' ? 'Presto' : 'Soon'}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ TOOLBAR ═══ */}
      <div className="cat-toolbar">
        <div className="cat-toolbar-start">
          <span className="cat-result-count">
            {filteredProducts.length} {lang === 'ar' ? 'منتج' : lang === 'it' ? 'prodotti' : 'products'}
          </span>
          <button className="cat-filter-btn" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal size={16} />
            <span>{lang === 'ar' ? 'فلترة' : lang === 'it' ? 'Filtri' : 'Filter'}</span>
            {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
        <div className="cat-toolbar-end">
          <select className="cat-sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="default">{lang === 'ar' ? 'الترتيب الافتراضي' : lang === 'it' ? 'Ordine predefinito' : 'Default'}</option>
            <option value="price-asc">{lang === 'ar' ? 'السعر: الأقل' : lang === 'it' ? 'Prezzo: crescente' : 'Price: Low'}</option>
            <option value="price-desc">{lang === 'ar' ? 'السعر: الأعلى' : lang === 'it' ? 'Prezzo: decrescente' : 'Price: High'}</option>
            <option value="rating">{lang === 'ar' ? 'التقييم' : lang === 'it' ? 'Valutazione' : 'Rating'}</option>
            <option value="newest">{lang === 'ar' ? 'الأحدث' : lang === 'it' ? 'Più recenti' : 'Newest'}</option>
            <option value="name">{lang === 'ar' ? 'الاسم' : lang === 'it' ? 'Nome' : 'Name'}</option>
          </select>
          <div className="cat-view-toggle">
            <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><Grid size={16} /></button>
            <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><List size={16} /></button>
          </div>
        </div>
      </div>

      {/* ═══ FILTER BAR (Expandable) ═══ */}
      {showFilters && (
        <div className="cat-filter-bar">
          {brandsInCategory.length > 1 && (
            <div className="cat-filter-group">
              <label>{lang === 'ar' ? 'البراند' : lang === 'it' ? 'Marca' : 'Brand'}</label>
              <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
                <option value="all">{lang === 'ar' ? 'الكل' : lang === 'it' ? 'Tutti' : 'All'}</option>
                {brandsInCategory.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          )}
          <div className="cat-filter-group">
            <label>{lang === 'ar' ? 'الترتيب' : lang === 'it' ? 'Ordina' : 'Sort'}</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="default">{lang === 'ar' ? 'افتراضي' : 'Default'}</option>
              <option value="price-asc">{lang === 'ar' ? 'الأقل سعرًا' : 'Price ↑'}</option>
              <option value="price-desc">{lang === 'ar' ? 'الأعلى سعرًا' : 'Price ↓'}</option>
              <option value="rating">{lang === 'ar' ? 'التقييم' : 'Rating'}</option>
            </select>
          </div>
          <button className="cat-filter-reset" onClick={() => { setSelectedBrand('all'); setSortBy('default'); setPriceRange([0, 99999]); setSelectedSubCat(null); }}>
            {lang === 'ar' ? 'إعادة ضبط' : lang === 'it' ? 'Reimposta' : 'Reset'}
          </button>
        </div>
      )}

      {/* ═══ PRODUCTS GRID / LIST ═══ */}
      <div className={`cat-products ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
        {filteredProducts.length === 0 ? (
          <div className="cat-empty">
            <p>{lang === 'ar' ? 'لا توجد منتجات حاليًا' : lang === 'it' ? 'Nessun prodotto al momento' : 'No products currently'}</p>
          </div>
        ) : (
          filteredProducts.map(product => {
            const inWishlist = wishlist.includes(product.id);
            const inCompare = compareList.includes(product.id);
            return (
              <div key={product.id} className={`cat-product-card ${viewMode}`}>
                <div className="cat-prod-img-wrap" onClick={() => { onSelectProduct(product); setPage('detail'); }}>
                  <img src={product.image} alt={getProductName(product)} className="cat-prod-img" loading="lazy" />
                  {product.badge && ff('ff_badges') !== false && (
                    <span className="cat-prod-badge">{tb(product.badge)}</span>
                  )}
                  <div className="cat-prod-actions">
                    {ff('ff_wishlist') && (
                      <button className={`cat-prod-action ${inWishlist ? 'active' : ''}`} onClick={e => { e.stopPropagation(); onToggleWishlist(product.id); }}>
                        <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
                      </button>
                    )}
                    {ff('ff_compare') && (
                      <button className={`cat-prod-action ${inCompare ? 'active' : ''}`} onClick={e => { e.stopPropagation(); onToggleCompare(product.id); }}>
                        <Eye size={16} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="cat-prod-info">
                  {ff('ff_brand_card') && product.brand && (
                    <span className="cat-prod-brand">{product.brand}</span>
                  )}
                  <h3 className="cat-prod-name" onClick={() => { onSelectProduct(product); setPage('detail'); }}>
                    {getProductName(product)}
                  </h3>
                  {viewMode === 'list' && (
                    <p className="cat-prod-desc">{getProductDesc(product)}</p>
                  )}
                  <div className="cat-prod-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < Math.floor(product.rating || 4) ? 'var(--accent)' : 'transparent'} stroke="var(--accent)" />
                    ))}
                    <span>({product.reviews || 0})</span>
                  </div>
                  <div className="cat-prod-price-row">
                    <span className="cat-prod-price">{formatPrice(product.price)}</span>
                    <button className="cat-prod-cart-btn" onClick={() => onAddToCart(product)}>
                      <ShoppingCart size={16} />
                      <span>{lang === 'ar' ? 'أضف' : lang === 'it' ? 'Aggiungi' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
