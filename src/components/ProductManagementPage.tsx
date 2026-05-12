import React, { useState } from 'react';
import { Package, Plus, Pencil, Trash2, X, Check, Search, Tag, FolderOpen, Eye, EyeOff, ArrowLeft, Save, ChevronDown, ChevronUp, Image, DollarSign, Layers, ToggleLeft, ToggleRight, AlertTriangle } from 'lucide-react';
import { Product, FeatureFlag, CategoryInfo, Country } from '../types';

interface ProductManagementPageProps {
  products: Product[];
  setProducts: (p: Product[]) => void;
  categories: CategoryInfo[];
  setCategories: (c: CategoryInfo[]) => void;
  featureFlags: FeatureFlag[];
  t: (key: string) => string;
  lang: string;
  formatPrice: (n: number) => string;
  country: Country;
  setPage: (p: any) => void;
}

export const ProductManagementPage: React.FC<ProductManagementPageProps> = ({
  products, setProducts, categories, setCategories, featureFlags, t, lang, formatPrice, country, setPage
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<CategoryInfo | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  const ff = (id: string) => featureFlags.find(f => f.id === id)?.enabled !== false;

  // ========== PRODUCT FORM STATE ==========
  const emptyProduct: Partial<Product> = {
    id: Math.max(0, ...products.map(p => p.id)) + 1,
    name: '', nameAr: '', nameIt: '',
    cat: categories[0]?.name || 'Electronics',
    brand: '', price: 0, old: 0, rating: 0, reviews: 0,
    badge: '', emoji: '📦', img: '',
    desc: '', descAr: '', descIt: '',
    stock: 0, specs: [], specsAr: [], specsIt: [],
    attributes: {},
    countryStock: { SA: 0, AE: 0, QA: 0, EG: 0, IT: 0 },
    countryPrices: { SA: 0, AE: 0, QA: 0, EG: 0, IT: 0 },
    grad: 'from-gray-500 to-gray-700'
  };

  const [formProduct, setFormProduct] = useState<Partial<Product>>(emptyProduct);

  const emptyCategory: CategoryInfo = { name: '', nameAr: '', nameIt: '', emoji: '📦', enabled: true };
  const [formCategory, setFormCategory] = useState<CategoryInfo>(emptyCategory);

  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  // ========== PRODUCT ACTIONS ==========
  const handleEditProduct = (p: Product) => {
    setFormProduct({ ...p });
    setEditingProduct(p);
    setShowAddProduct(true);
  };

  const handleSaveProduct = () => {
    if (!formProduct.name) return;
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formProduct } as Product : p));
    } else {
      setProducts([...products, { ...emptyProduct, ...formProduct, id: Math.max(0, ...products.map(p => p.id)) + 1 } as Product]);
    }
    setShowAddProduct(false);
    setEditingProduct(null);
    setFormProduct(emptyProduct);
    flash();
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    setConfirmDelete(null);
    flash();
  };

  const toggleProductVisibility = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, hidden: !p.hidden } as any : p));
    flash();
  };

  // ========== CATEGORY ACTIONS ==========
  const handleEditCategory = (c: CategoryInfo) => {
    setFormCategory({ ...c });
    setEditingCategory(c);
    setShowAddCategory(true);
  };

  const handleSaveCategory = () => {
    if (!formCategory.name) return;
    if (editingCategory) {
      setCategories(categories.map(c => c.name === editingCategory.name ? { ...formCategory } : c));
      // Update products with old category name
      if (formCategory.name !== editingCategory.name) {
        setProducts(products.map(p => p.cat === editingCategory.name ? { ...p, cat: formCategory.name } : p));
      }
    } else {
      setCategories([...categories, { ...formCategory }]);
    }
    setShowAddCategory(false);
    setEditingCategory(null);
    setFormCategory(emptyCategory);
    flash();
  };

  const handleDeleteCategory = (name: string) => {
    setCategories(categories.filter(c => c.name !== name));
    setConfirmDelete(null);
    flash();
  };

  const toggleCategoryVisibility = (name: string) => {
    setCategories(categories.map(c => c.name === name ? { ...c, enabled: !c.enabled } : c));
    flash();
  };

  // ========== FILTERED PRODUCTS ==========
  const filtered = products.filter(p => {
    const matchSearch = !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.nameAr && p.nameAr.includes(searchTerm)) ||
      (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCat = filterCat === 'all' || p.cat === filterCat;
    return matchSearch && matchCat;
  });

  const getProductName = (p: Product) => lang === 'ar' ? (p.nameAr || p.name) : lang === 'it' ? (p.nameIt || p.name) : p.name;

  const badges = ['', 'Best Seller', 'New', 'Premium', 'Limited', 'Popular', 'Pro', 'Hot', 'Trending', 'Luxury', 'Exclusive'];

  const countryFlags: Record<string, string> = { SA: '🇸🇦', AE: '🇦🇪', QA: '🇶🇦', EG: '🇪🇬', IT: '🇮🇹' };
  const countryCurrencies: Record<string, string> = { SA: 'SAR', AE: 'AED', QA: 'QAR', EG: 'EGP', IT: 'EUR' };

  return (
    <div className="page-fade-in" style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
          <button className="btn-outline" onClick={() => setPage('dashboard')} style={{ padding:'0.5rem' }}>
            <ArrowLeft size={18}/>
          </button>
          <h1 style={{ fontSize:'1.5rem', fontWeight:700 }}>
            <Package size={24} style={{ verticalAlign:'middle', marginRight:8 }}/> {t('productManagement') || 'Product Management'}
          </h1>
        </div>
        {saved && (
          <div style={{ background:'var(--clr-accent)', color:'#fff', padding:'0.5rem 1rem', borderRadius:8, display:'flex', alignItems:'center', gap:6, animation:'fadeIn 0.3s' }}>
            <Check size={16}/> {t('saved') || 'Saved!'}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="admin-tabs" style={{ marginBottom:'1.5rem' }}>
        <button className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
          <Package size={16}/> {t('productsTab') || 'Products'} <span className="tab-count">{products.length}</span>
        </button>
        <button className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>
          <FolderOpen size={16}/> {t('categoriesTab') || 'Categories'} <span className="tab-count">{categories.length}</span>
        </button>
      </div>

      {/* ==================== PRODUCTS TAB ==================== */}
      {activeTab === 'products' && (
        <div>
          {/* Toolbar */}
          <div style={{ display:'flex', gap:'1rem', marginBottom:'1.5rem', flexWrap:'wrap', alignItems:'center' }}>
            <div style={{ position:'relative', flex:'1', minWidth:200 }}>
              <Search size={16} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', opacity:0.5 }}/>
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                placeholder={t('searchProducts') || 'Search products...'}
                className="form-input" style={{ paddingLeft:36, width:'100%' }}/>
            </div>
            <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
              className="form-input" style={{ minWidth:150 }}>
              <option value="all">{t('allCategories') || 'All Categories'}</option>
              {categories.map(c => (
                <option key={c.name} value={c.name}>{c.emoji} {lang === 'ar' ? (c.nameAr || c.name) : lang === 'it' ? (c.nameIt || c.name) : c.name}</option>
              ))}
            </select>
            <button className="btn-primary" onClick={() => { setFormProduct(emptyProduct); setEditingProduct(null); setShowAddProduct(true); }}>
              <Plus size={16}/> {t('addProduct') || 'Add Product'}
            </button>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'1rem', marginBottom:'1.5rem' }}>
            <div className="stat-card-mini">
              <Package size={18}/> <strong>{products.length}</strong> {t('totalProducts') || 'Total Products'}
            </div>
            <div className="stat-card-mini">
              <Tag size={18}/> <strong>{categories.filter(c => c.enabled).length}</strong> {t('activeCategories') || 'Active Categories'}
            </div>
            <div className="stat-card-mini">
              <AlertTriangle size={18}/> <strong>{products.filter(p => p.stock <= 10).length}</strong> {t('lowStockItems') || 'Low Stock'}
            </div>
            <div className="stat-card-mini">
              <DollarSign size={18}/> <strong>{formatPrice(products.reduce((s, p) => s + p.price * p.stock, 0))}</strong> {t('inventoryValue') || 'Inventory Value'}
            </div>
          </div>

          {/* Product List */}
          <div className="product-mgmt-list">
            {/* Table Header */}
            <div className="product-mgmt-header">
              <div style={{ width:60 }}>{t('image') || 'Image'}</div>
              <div style={{ flex:2 }}>{t('productName') || 'Product'}</div>
              <div style={{ flex:1 }}>{t('category') || 'Category'}</div>
              <div style={{ width:100, textAlign:'right' }}>{t('price') || 'Price'}</div>
              <div style={{ width:70, textAlign:'center' }}>{t('stock') || 'Stock'}</div>
              <div style={{ width:90, textAlign:'center' }}>{t('badge') || 'Badge'}</div>
              <div style={{ width:60, textAlign:'center' }}>{t('status') || 'Status'}</div>
              <div style={{ width:130, textAlign:'center' }}>{t('actions') || 'Actions'}</div>
            </div>

            {filtered.map(p => (
              <React.Fragment key={p.id}>
                <div className={`product-mgmt-row ${(p as any).hidden ? 'hidden-product' : ''}`}>
                  <div style={{ width:60 }}>
                    <div className="product-mgmt-thumb">
                      <img src={p.img} alt="" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        style={{ width:44, height:44, objectFit:'cover', borderRadius:6 }}/>
                      <span className="product-mgmt-emoji">{p.emoji}</span>
                    </div>
                  </div>
                  <div style={{ flex:2, minWidth:0 }}>
                    <div style={{ fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {getProductName(p)}
                    </div>
                    <div style={{ fontSize:'0.75rem', opacity:0.6 }}>{p.brand}</div>
                  </div>
                  <div style={{ flex:1 }}>
                    <span className="category-pill">{categories.find(c => c.name === p.cat)?.emoji || '📦'} {p.cat}</span>
                  </div>
                  <div style={{ width:100, textAlign:'right' }}>
                    <div style={{ fontWeight:600 }}>{formatPrice(p.price)}</div>
                    {p.old && p.old > p.price && <div style={{ fontSize:'0.75rem', textDecoration:'line-through', opacity:0.5 }}>{formatPrice(p.old)}</div>}
                  </div>
                  <div style={{ width:70, textAlign:'center' }}>
                    <span className={`stock-indicator ${p.stock <= 3 ? 'critical' : p.stock <= 10 ? 'low' : 'ok'}`}>
                      {p.stock}
                    </span>
                  </div>
                  <div style={{ width:90, textAlign:'center' }}>
                    {p.badge ? <span className={`mini-badge badge-${p.badge.toLowerCase().replace(/\s/g,'')}`}>{p.badge}</span> : <span style={{ opacity:0.3 }}>—</span>}
                  </div>
                  <div style={{ width:60, textAlign:'center' }}>
                    <button className="icon-btn" onClick={() => toggleProductVisibility(p.id)} title={(p as any).hidden ? 'Show' : 'Hide'}>
                      {(p as any).hidden ? <EyeOff size={16} style={{ color:'#ef4444' }}/> : <Eye size={16} style={{ color:'#22c55e' }}/>}
                    </button>
                  </div>
                  <div style={{ width:130, textAlign:'center', display:'flex', gap:4, justifyContent:'center' }}>
                    <button className="icon-btn" onClick={() => setExpandedProduct(expandedProduct === p.id ? null : p.id)} title="Details">
                      {expandedProduct === p.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </button>
                    <button className="icon-btn edit" onClick={() => handleEditProduct(p)} title="Edit">
                      <Pencil size={16}/>
                    </button>
                    {confirmDelete === p.id ? (
                      <>
                        <button className="icon-btn danger" onClick={() => handleDeleteProduct(p.id)} title="Confirm Delete">
                          <Check size={16}/>
                        </button>
                        <button className="icon-btn" onClick={() => setConfirmDelete(null)} title="Cancel">
                          <X size={16}/>
                        </button>
                      </>
                    ) : (
                      <button className="icon-btn danger" onClick={() => setConfirmDelete(p.id)} title="Delete">
                        <Trash2 size={16}/>
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedProduct === p.id && (
                  <div className="product-mgmt-expanded">
                    <div className="expanded-grid">
                      <div className="expanded-section">
                        <h4>📝 {t('descriptions') || 'Descriptions'}</h4>
                        <div className="expanded-field"><strong>🇬🇧 EN:</strong> {p.desc}</div>
                        <div className="expanded-field"><strong>🇸🇦 AR:</strong> {p.descAr || '—'}</div>
                        <div className="expanded-field"><strong>🇮🇹 IT:</strong> {p.descIt || '—'}</div>
                      </div>
                      <div className="expanded-section">
                        <h4>🌍 {t('countryPrices') || 'Country Prices'}</h4>
                        {Object.entries(p.countryPrices || {}).map(([code, price]) => (
                          <div key={code} className="expanded-field">
                            {countryFlags[code]} {code}: <strong>{price} {countryCurrencies[code]}</strong>
                            <span style={{ opacity:0.5, marginLeft:8 }}>Stock: {(p.countryStock || {} as any)[code] || 0}</span>
                          </div>
                        ))}
                      </div>
                      <div className="expanded-section">
                        <h4>📋 {t('specifications') || 'Specifications'}</h4>
                        <div className="expanded-specs">
                          {(p.specs || []).map((s, i) => <span key={i} className="spec-tag">{s}</span>)}
                        </div>
                      </div>
                      <div className="expanded-section">
                        <h4>🏷️ {t('attributes') || 'Attributes'}</h4>
                        {Object.entries(p.attributes || {}).map(([k, v]) => (
                          <div key={k} className="expanded-field"><strong>{k}:</strong> {v}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}

            {filtered.length === 0 && (
              <div style={{ padding:'3rem', textAlign:'center', opacity:0.5 }}>
                <Package size={40} style={{ marginBottom:8 }}/>
                <div>{t('noProductsFound') || 'No products found'}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== CATEGORIES TAB ==================== */}
      {activeTab === 'categories' && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem' }}>
            <div style={{ fontSize:'0.9rem', opacity:0.7 }}>
              {categories.length} {t('totalCategories') || 'total categories'} · {categories.filter(c => c.enabled).length} {t('active') || 'active'}
            </div>
            <button className="btn-primary" onClick={() => { setFormCategory(emptyCategory); setEditingCategory(null); setShowAddCategory(true); }}>
              <Plus size={16}/> {t('addCategory') || 'Add Category'}
            </button>
          </div>

          <div className="categories-grid">
            {categories.map(c => (
              <div key={c.name} className={`category-mgmt-card ${!c.enabled ? 'disabled-cat' : ''}`}>
                <div className="cat-card-header">
                  <span className="cat-emoji">{c.emoji}</span>
                  <div className="cat-card-info">
                    <div style={{ fontWeight:700, fontSize:'1rem' }}>{lang === 'ar' ? (c.nameAr || c.name) : lang === 'it' ? (c.nameIt || c.name) : c.name}</div>
                    <div style={{ fontSize:'0.75rem', opacity:0.6 }}>
                      {products.filter(p => p.cat === c.name).length} {t('products') || 'products'}
                    </div>
                  </div>
                </div>
                <div className="cat-card-names">
                  <div>🇬🇧 {c.name}</div>
                  <div>🇸🇦 {c.nameAr || '—'}</div>
                  <div>🇮🇹 {c.nameIt || '—'}</div>
                </div>
                <div className="cat-card-actions">
                  <button className="icon-btn" onClick={() => toggleCategoryVisibility(c.name)} title={c.enabled ? 'Disable' : 'Enable'}>
                    {c.enabled ? <ToggleRight size={20} style={{ color:'var(--clr-accent)' }}/> : <ToggleLeft size={20} style={{ opacity:0.4 }}/>}
                  </button>
                  <button className="icon-btn edit" onClick={() => handleEditCategory(c)} title="Edit">
                    <Pencil size={16}/>
                  </button>
                  {confirmDelete === c.name ? (
                    <>
                      <button className="icon-btn danger" onClick={() => handleDeleteCategory(c.name)} title="Confirm">
                        <Check size={16}/>
                      </button>
                      <button className="icon-btn" onClick={() => setConfirmDelete(null)} title="Cancel">
                        <X size={16}/>
                      </button>
                    </>
                  ) : (
                    <button className="icon-btn danger" onClick={() => setConfirmDelete(c.name)} title="Delete">
                      <Trash2 size={16}/>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================== PRODUCT FORM MODAL ==================== */}
      {showAddProduct && (
        <div className="modal-overlay" onClick={() => setShowAddProduct(false)}>
          <div className="modal-content product-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? (t('editProduct') || 'Edit Product') : (t('addProduct') || 'Add Product')}</h2>
              <button className="icon-btn" onClick={() => setShowAddProduct(false)}><X size={20}/></button>
            </div>
            <div className="modal-body">
              {/* Basic Info */}
              <div className="form-section">
                <h3><Package size={16}/> {t('basicInfo') || 'Basic Information'}</h3>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>🇬🇧 {t('nameEN') || 'Name (English)'} *</label>
                    <input className="form-input" value={formProduct.name || ''} onChange={e => setFormProduct({...formProduct, name: e.target.value})} placeholder="Product name..."/>
                  </div>
                  <div className="form-group">
                    <label>🇸🇦 {t('nameAR') || 'Name (Arabic)'}</label>
                    <input className="form-input" dir="rtl" value={formProduct.nameAr || ''} onChange={e => setFormProduct({...formProduct, nameAr: e.target.value})} placeholder="...اسم المنتج"/>
                  </div>
                  <div className="form-group">
                    <label>🇮🇹 {t('nameIT') || 'Name (Italian)'}</label>
                    <input className="form-input" value={formProduct.nameIt || ''} onChange={e => setFormProduct({...formProduct, nameIt: e.target.value})} placeholder="Nome del prodotto..."/>
                  </div>
                </div>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>🇬🇧 {t('descEN') || 'Description (EN)'}</label>
                    <textarea className="form-input" rows={2} value={formProduct.desc || ''} onChange={e => setFormProduct({...formProduct, desc: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label>🇸🇦 {t('descAR') || 'Description (AR)'}</label>
                    <textarea className="form-input" dir="rtl" rows={2} value={formProduct.descAr || ''} onChange={e => setFormProduct({...formProduct, descAr: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label>🇮🇹 {t('descIT') || 'Description (IT)'}</label>
                    <textarea className="form-input" rows={2} value={formProduct.descIt || ''} onChange={e => setFormProduct({...formProduct, descIt: e.target.value})}/>
                  </div>
                </div>
              </div>

              {/* Pricing + Category */}
              <div className="form-section">
                <h3><DollarSign size={16}/> {t('pricingCategory') || 'Pricing & Category'}</h3>
                <div className="form-grid-4">
                  <div className="form-group">
                    <label>{t('category') || 'Category'}</label>
                    <select className="form-input" value={formProduct.cat || ''} onChange={e => setFormProduct({...formProduct, cat: e.target.value})}>
                      {categories.map(c => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('brand') || 'Brand'}</label>
                    <input className="form-input" value={formProduct.brand || ''} onChange={e => setFormProduct({...formProduct, brand: e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label>{t('price') || 'Price'} (SAR)</label>
                    <input className="form-input" type="number" value={formProduct.price || 0} onChange={e => setFormProduct({...formProduct, price: Number(e.target.value)})}/>
                  </div>
                  <div className="form-group">
                    <label>{t('oldPrice') || 'Old Price'} (SAR)</label>
                    <input className="form-input" type="number" value={formProduct.old || 0} onChange={e => setFormProduct({...formProduct, old: Number(e.target.value)})}/>
                  </div>
                </div>
                <div className="form-grid-4">
                  <div className="form-group">
                    <label>{t('badge') || 'Badge'}</label>
                    <select className="form-input" value={formProduct.badge || ''} onChange={e => setFormProduct({...formProduct, badge: e.target.value})}>
                      {badges.map(b => <option key={b} value={b}>{b || '— None —'}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('emoji') || 'Emoji'}</label>
                    <input className="form-input" value={formProduct.emoji || ''} onChange={e => setFormProduct({...formProduct, emoji: e.target.value})} style={{ fontSize:'1.2rem' }}/>
                  </div>
                  <div className="form-group">
                    <label>{t('stock') || 'Stock'}</label>
                    <input className="form-input" type="number" value={formProduct.stock || 0} onChange={e => setFormProduct({...formProduct, stock: Number(e.target.value)})}/>
                  </div>
                  <div className="form-group">
                    <label>{t('imageURL') || 'Image URL'}</label>
                    <input className="form-input" value={formProduct.img || ''} onChange={e => setFormProduct({...formProduct, img: e.target.value})} placeholder="./assets/..."/>
                  </div>
                </div>
              </div>

              {/* Country Prices */}
              <div className="form-section">
                <h3><Layers size={16}/> {t('countryPricing') || 'Country Pricing & Stock'}</h3>
                <div className="form-grid-5">
                  {['SA','AE','QA','EG','IT'].map(code => (
                    <div key={code} className="country-price-card">
                      <div className="country-price-header">{countryFlags[code]} {code} ({countryCurrencies[code]})</div>
                      <div className="form-group">
                        <label style={{ fontSize:'0.7rem' }}>{t('price') || 'Price'}</label>
                        <input className="form-input" type="number" value={(formProduct.countryPrices as any)?.[code] || 0}
                          onChange={e => setFormProduct({...formProduct, countryPrices: {...(formProduct.countryPrices || {}), [code]: Number(e.target.value)}})}/>
                      </div>
                      <div className="form-group">
                        <label style={{ fontSize:'0.7rem' }}>{t('stock') || 'Stock'}</label>
                        <input className="form-input" type="number" value={(formProduct.countryStock as any)?.[code] || 0}
                          onChange={e => setFormProduct({...formProduct, countryStock: {...(formProduct.countryStock || {}), [code]: Number(e.target.value)}})}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className="form-section">
                <h3>📋 {t('specifications') || 'Specifications'}</h3>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label>🇬🇧 EN (comma separated)</label>
                    <input className="form-input" value={(formProduct.specs || []).join(', ')}
                      onChange={e => setFormProduct({...formProduct, specs: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}/>
                  </div>
                  <div className="form-group">
                    <label>🇸🇦 AR</label>
                    <input className="form-input" dir="rtl" value={(formProduct.specsAr || []).join('، ')}
                      onChange={e => setFormProduct({...formProduct, specsAr: e.target.value.split(/[,،]/).map(s => s.trim()).filter(Boolean)})}/>
                  </div>
                  <div className="form-group">
                    <label>🇮🇹 IT</label>
                    <input className="form-input" value={(formProduct.specsIt || []).join(', ')}
                      onChange={e => setFormProduct({...formProduct, specsIt: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowAddProduct(false)}>{t('cancel') || 'Cancel'}</button>
              <button className="btn-primary" onClick={handleSaveProduct} disabled={!formProduct.name}>
                <Save size={16}/> {editingProduct ? (t('saveChanges') || 'Save Changes') : (t('addProduct') || 'Add Product')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== CATEGORY FORM MODAL ==================== */}
      {showAddCategory && (
        <div className="modal-overlay" onClick={() => setShowAddCategory(false)}>
          <div className="modal-content category-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? (t('editCategory') || 'Edit Category') : (t('addCategory') || 'Add Category')}</h2>
              <button className="icon-btn" onClick={() => setShowAddCategory(false)}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-grid-3">
                <div className="form-group">
                  <label>🇬🇧 {t('nameEN') || 'Name (English)'} *</label>
                  <input className="form-input" value={formCategory.name} onChange={e => setFormCategory({...formCategory, name: e.target.value})} placeholder="Category name..."/>
                </div>
                <div className="form-group">
                  <label>🇸🇦 {t('nameAR') || 'Name (Arabic)'}</label>
                  <input className="form-input" dir="rtl" value={formCategory.nameAr || ''} onChange={e => setFormCategory({...formCategory, nameAr: e.target.value})} placeholder="...اسم الفئة"/>
                </div>
                <div className="form-group">
                  <label>🇮🇹 {t('nameIT') || 'Name (Italian)'}</label>
                  <input className="form-input" value={formCategory.nameIt || ''} onChange={e => setFormCategory({...formCategory, nameIt: e.target.value})} placeholder="Nome della categoria..."/>
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>{t('emoji') || 'Emoji/Icon'}</label>
                  <input className="form-input" value={formCategory.emoji} onChange={e => setFormCategory({...formCategory, emoji: e.target.value})} style={{ fontSize:'1.5rem', textAlign:'center' }}/>
                </div>
                <div className="form-group">
                  <label>{t('status') || 'Status'}</label>
                  <button className={`toggle-btn ${formCategory.enabled ? 'active' : ''}`} onClick={() => setFormCategory({...formCategory, enabled: !formCategory.enabled})}>
                    {formCategory.enabled ? <><ToggleRight size={20}/> {t('enabled') || 'Enabled'}</> : <><ToggleLeft size={20}/> {t('disabled') || 'Disabled'}</>}
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowAddCategory(false)}>{t('cancel') || 'Cancel'}</button>
              <button className="btn-primary" onClick={handleSaveCategory} disabled={!formCategory.name}>
                <Save size={16}/> {editingCategory ? (t('saveChanges') || 'Save Changes') : (t('addCategory') || 'Add Category')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
