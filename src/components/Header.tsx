import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, Truck, RotateCcw, Shield, Phone, BarChart3, ChevronDown, ChevronRight, Scale, Globe, Menu, X, Home, Package, Gift, Settings, Flag, Zap, Globe2, Receipt, FileText, Type } from 'lucide-react';
import { Theme, Page, Country, Language, Translations, Product } from '../types';
import { products } from '../data';

interface TopBarProps {
  t: (key: string) => string;
  getCountryName: (c: any) => string;
  currentCountry: Country;
}
export const TopBar: React.FC<TopBarProps> = ({ t, currentCountry }) => (
  <div className="topbar">
    <div className="topbar-inner">
      <div className="topbar-marquee">
        <span><Truck size={13}/> {`${t('freeShipping')} · ${currentCountry.freeShippingMin}+ ${currentCountry.currencySymbol}`}</span>
        <span><RotateCcw size={13}/> {t('easyReturns')}</span>
        <span><Shield size={13}/> {t('securePayment')}</span>
      </div>
      <div className="topbar-marquee">
        <span><Phone size={13}/> {currentCountry.phone} 800-123-4567</span>
      </div>
    </div>
  </div>
);

interface HeaderProps {
  theme: Theme;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  onCart: () => void;
  page: Page;
  setPage: (p: Page) => void;
  t: (key: string) => string;
  getCountryName: (c: any) => string;
  currentCountry: Country;
  countries: Country[];
  setCurrentCountry: (c: Country) => void;
  currentLang: Language;
  languages: Language[];
  setCurrentLang: (l: Language) => void;
  onSearch: (query: string) => void;
  onSelectProduct: (p: Product) => void;
  formatPrice: (n: number) => string;
  categories: { id: string; name: string; nameAr?: string; nameIt?: string; parentId: string | null; level: 1 | 2 | 3; enabled: boolean; order: number; count?: number; grad?: string }[];
  featureFlags: Record<string, boolean>;
  onCategoryClick: (cat: string) => void;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
  requireAuth?: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  theme, cartCount, wishlistCount, compareCount, onCart, page, setPage,
  t, currentCountry, countries, setCurrentCountry, currentLang, languages, setCurrentLang,
  onSearch, onSelectProduct, formatPrice, categories: catList, featureFlags: ff, onCategoryClick,
  isLoggedIn, currentUser, onLogout, requireAuth
}) => {
  const lang = currentLang.code;
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchResults = searchQuery.length >= 2 ? products.filter(p => {
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) || (p.nameAr && p.nameAr.includes(searchQuery)) ||
      (p.nameIt && p.nameIt.toLowerCase().includes(q));
  }) : [];

  const navItems: { label: string; page: Page | null }[] = [
    { label: t('home'), page: 'home' },
    { label: t('shop'), page: 'shop' },
    { label: t('giftCards'), page: 'giftcards' },
  ];

  const adminPages: Page[] = ['dash', 'flags', 'marketing', 'countries', 'tax', 'invoices', 'languages', 'admin-users', 'products-admin'];
  
  const getCatName = (c: any) => lang === 'ar' ? (c.nameAr || c.name) : lang === 'it' ? (c.nameIt || c.name) : c.name;
  // Hierarchical category helpers
  const enabledL1 = catList.filter(c => c.level === 1 && c.enabled).sort((a, b) => a.order - b.order);
  const getChildren = (parentId: string) => catList.filter(c => c.parentId === parentId && c.enabled).sort((a, b) => a.order - b.order);
  const enabledL3 = catList.filter(c => c.level === 3 && c.enabled).sort((a, b) => a.order - b.order);
  const win = window as any;

  return (
    <header className="header" dir={currentLang.direction}>
      <div className="header-inner">
        <button className="logo" onClick={() => setPage('home')}>
          <img src="./assets/logo-v2.png" alt="NEFRA" className="logo-img" />
        </button>
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input placeholder={t('searchPlaceholder')} dir={currentLang.direction}
            value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setShowSearchResults(true); }}
            onFocus={() => { if(searchQuery) setShowSearchResults(true); }}
            onKeyDown={e => { if(e.key === 'Enter' && searchQuery) { onSearch(searchQuery); setShowSearchResults(false); setSearchQuery(''); }}} />
          {searchQuery && <button className="search-clear" onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}><X size={14}/></button>}
          {showSearchResults && searchQuery.length >= 2 && (
            <div className="search-results-dropdown">
              {searchResults.length > 0 ? (
                <>
                  <div className="search-results-header">{searchResults.length} {t('resultsFound')}</div>
                  {searchResults.slice(0, 5).map(p => (
                    <button key={p.id} className="search-result-item" onClick={() => { onSelectProduct(p); setSearchQuery(''); setShowSearchResults(false); }}>
                      <img src={p.img} alt={p.name} className="search-result-img" loading="lazy" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      <div className="search-result-info">
                        <span className="search-result-name">{lang === 'ar' ? (p.nameAr || p.name) : lang === 'it' ? (p.nameIt || p.name) : p.name}</span>
                        <span className="search-result-cat">{p.brand} · {p.cat}</span>
                      </div>
                      <span className="search-result-price">{formatPrice(p.price)}</span>
                    </button>
                  ))}
                  {searchResults.length > 5 && (
                    <button className="search-see-all" onClick={() => { onSearch(searchQuery); setSearchQuery(''); setShowSearchResults(false); }}>
                      {t('seeAllResults')} ({searchResults.length}) <ChevronRight size={14}/>
                    </button>
                  )}
                </>
              ) : (
                <div className="search-no-results">{t('noResults')}</div>
              )}
            </div>
          )}
        </div>
        <div className="header-actions">
          {/* Country Selector */}
          <div className="dropdown-wrapper">
            <button className="header-btn country-selector-btn" onClick={() => { setShowCountryPicker(!showCountryPicker); setShowLangPicker(false); }}>
              <span className="country-flag">{currentCountry.flag}</span>
              <span className="header-btn-label">{currentCountry.currency}</span>
              <ChevronDown size={12} />
            </button>
            {showCountryPicker && (
              <div className="dropdown-menu country-dropdown">
                <div className="dropdown-header">{t('selectCountry')}</div>
                {countries.filter(c => c.enabled).map(c => (
                  <button key={c.code} className={`dropdown-item ${c.code === currentCountry.code ? 'active' : ''}`}
                    onClick={() => { setCurrentCountry(c); setShowCountryPicker(false); }}>
                    <span className="country-flag">{c.flag}</span>
                    <div className="dropdown-item-text">
                      <span>{currentLang.code === 'ar' ? c.nameAr : currentLang.code === 'it' ? c.nameIt : c.name}</span>
                      <small>{c.currency} ({c.currencySymbol})</small>
                    </div>
                    {c.code === currentCountry.code && <span className="check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="dropdown-wrapper">
            <button className="header-btn lang-selector-btn" onClick={() => { setShowLangPicker(!showLangPicker); setShowCountryPicker(false); }}>
              <Globe size={16} />
              <span className="header-btn-label">{currentLang.code.toUpperCase()}</span>
              <ChevronDown size={12} />
            </button>
            {showLangPicker && (
              <div className="dropdown-menu lang-dropdown">
                <div className="dropdown-header">{t('selectLanguage')}</div>
                {languages.filter(l => l.enabled).map(l => (
                  <button key={l.code} className={`dropdown-item ${l.code === currentLang.code ? 'active' : ''}`}
                    onClick={() => { setCurrentLang(l); setShowLangPicker(false); }}>
                    <span className="country-flag">{l.flag}</span>
                    <div className="dropdown-item-text">
                      <span>{l.nativeName}</span>
                      <small>{l.name}</small>
                    </div>
                    {l.code === currentLang.code && <span className="check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="header-btn" onClick={() => setPage('dash')} title={t('dashboard')}>
            <BarChart3 size={18}/><span className="header-btn-label">{t('adminPanel')}</span>
          </button>
          <button className="header-btn" onClick={() => requireAuth ? requireAuth('account') : setPage('account')} title={isLoggedIn ? currentUser?.name || t('account') : t('auth.signIn')}>
            {isLoggedIn ? (
              <span className="user-avatar-mini">{(currentUser?.name || 'U')[0].toUpperCase()}</span>
            ) : (
              <User size={18}/>
            )}
          </button>
          <button className="header-btn" onClick={() => setPage('compare')} title={t('compare')}>
            <Scale size={18}/>
            {compareCount > 0 && <span className="cart-count">{compareCount}</span>}
          </button>
          <button className="header-btn" onClick={() => requireAuth ? requireAuth('wishlist') : setPage('wishlist')} title={t('wishlist')}>
            <Heart size={18}/>
            {wishlistCount > 0 && <span className="cart-count">{wishlistCount}</span>}
          </button>
          <button className="header-btn" onClick={onCart} title={t('cart')}>
            <ShoppingBag size={18}/>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          {/* Hamburger Menu Button — visible on mobile only */}
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)} title="Menu">
            <Menu size={22}/>
          </button>
        </div>
      </div>
      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && <div className="mobile-nav-overlay active" onClick={() => setMobileMenuOpen(false)} />}
      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav-drawer${mobileMenuOpen ? ' active' : ''}`}>
        <button className="mobile-nav-close" onClick={() => setMobileMenuOpen(false)}><X size={24}/></button>
        <div style={{padding:'0.5rem 0.5rem 1rem',borderBottom:'1px solid var(--border-light)',marginBottom:'0.5rem'}}>
          <span className="logo" style={{fontSize:'1.1rem'}}>
            <img src="./assets/logo-v2.png" alt="NEFRA" className="logo-img-mobile" />
          </span>
        </div>
        {/* Main Nav */}
        <button onClick={() => {setPage('home');setMobileMenuOpen(false);}}><Home size={16} style={{marginInlineEnd:'8px'}}/>{t('home')}</button>
        <button onClick={() => {setPage('shop');setMobileMenuOpen(false);}}><Package size={16} style={{marginInlineEnd:'8px'}}/>{t('shop')}</button>
        <button onClick={() => {setPage('giftcards');setMobileMenuOpen(false);}}><Gift size={16} style={{marginInlineEnd:'8px'}}/>{t('giftCards')}</button>
        {/* User */}
        <div style={{padding:'0.75rem 1rem 0.25rem',fontSize:'0.7rem',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.1em'}}>{t('account')}</div>
        {isLoggedIn ? (
          <>
            <button onClick={() => {setPage('account');setMobileMenuOpen(false);}}><User size={16} style={{marginInlineEnd:'8px'}}/>{currentUser?.name || t('myAccount')}</button>
            <button onClick={() => {if(onLogout) onLogout(); setMobileMenuOpen(false);}}><X size={16} style={{marginInlineEnd:'8px'}}/>{t('auth.signOut')}</button>
          </>
        ) : (
          <button onClick={() => {requireAuth ? requireAuth('account') : setPage('login');setMobileMenuOpen(false);}}><User size={16} style={{marginInlineEnd:'8px'}}/>{t('auth.signIn')}</button>
        )}
        <button onClick={() => {requireAuth ? requireAuth('wishlist') : setPage('wishlist');setMobileMenuOpen(false);}}><Heart size={16} style={{marginInlineEnd:'8px'}}/>{t('wishlist')} {wishlistCount > 0 && <span className="badge-sm">{wishlistCount}</span>}</button>
        <button onClick={() => {setPage('compare');setMobileMenuOpen(false);}}><Scale size={16} style={{marginInlineEnd:'8px'}}/>{t('compare')} {compareCount > 0 && <span className="badge-sm">{compareCount}</span>}</button>
        <button onClick={() => {onCart();setMobileMenuOpen(false);}}><ShoppingBag size={16} style={{marginInlineEnd:'8px'}}/>{t('cart')} {cartCount > 0 && <span className="badge-sm">{cartCount}</span>}</button>
        {/* Admin */}
        <div style={{padding:'0.75rem 1rem 0.25rem',fontSize:'0.7rem',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.1em'}}>{t('adminPanel')}</div>
        <button onClick={() => {setPage('dash');setMobileMenuOpen(false);}}><Settings size={16} style={{marginInlineEnd:'8px'}}/>{t('dashboard')}</button>
        <button onClick={() => {setPage('flags');setMobileMenuOpen(false);}}><Flag size={16} style={{marginInlineEnd:'8px'}}/>{t('featureFlags')}</button>
        <button onClick={() => {setPage('marketing');setMobileMenuOpen(false);}}><Zap size={16} style={{marginInlineEnd:'8px'}}/>{t('marketing')}</button>
        <button onClick={() => {setPage('countries');setMobileMenuOpen(false);}}><Globe2 size={16} style={{marginInlineEnd:'8px'}}/>{t('countries')}</button>
        <button onClick={() => {setPage('tax');setMobileMenuOpen(false);}}><Receipt size={16} style={{marginInlineEnd:'8px'}}/>{t('taxManagement')}</button>
        <button onClick={() => {setPage('invoices');setMobileMenuOpen(false);}}><FileText size={16} style={{marginInlineEnd:'8px'}}/>{t('invoices')}</button>
        <button onClick={() => {setPage('languages');setMobileMenuOpen(false);}}><Type size={16} style={{marginInlineEnd:'8px'}}/>{t('languages')}</button>
        <button onClick={() => {setPage('admin-users');setMobileMenuOpen(false);}}><Shield size={16} style={{marginInlineEnd:'8px'}}/>{t('adminUsers')}</button>
        <button onClick={() => {setPage('products-admin');setMobileMenuOpen(false);}}><Package size={16} style={{marginInlineEnd:'8px'}}/>{t('productsManagement') || 'Products Management'}</button>
        {/* Hierarchical categories in mobile */}
        {enabledL1.map(l1 => {
          const l2s = getChildren(l1.id);
          return (<React.Fragment key={l1.id}>
            <div style={{padding:'0.75rem 1rem 0.25rem',fontSize:'0.7rem',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.1em'}}>{getCatName(l1)}</div>
            <button onClick={() => {onCategoryClick('All');setPage('shop');setMobileMenuOpen(false);}}>{t('allProducts')}</button>
            {l2s.map(l2 => {
              const l3s = getChildren(l2.id);
              return (<React.Fragment key={l2.id}>
                {l2s.length > 1 && <div style={{padding:'0.5rem 1rem 0.15rem',fontSize:'0.65rem',color:'var(--accent)',fontWeight:600,letterSpacing:'0.05em'}}>{getCatName(l2)}</div>}
                {l3s.map(l3 => (
                  <button key={l3.id} onClick={() => {onCategoryClick(l3.name);setPage('shop');setMobileMenuOpen(false);}} style={l2s.length > 1 ? {paddingInlineStart:'2rem'} : undefined}>{getCatName(l3)}</button>
                ))}
              </React.Fragment>);
            })}
          </React.Fragment>);
        })}
      </div>
      <nav className="navbar">
        <div className="nav-inner">
          {navItems.map(n => (
            <button key={n.label} className={`nav-link${n.page === page ? ' active' : ''}`}
              onClick={() => n.page && setPage(n.page)}>{n.label}</button>
          ))}
          {/* Hierarchical category mega menu */}
          {ff.ff_category_nav !== false && enabledL1.length > 0 && enabledL1.map(l1 => {
            const l2s = getChildren(l1.id);
            // Count products per L3 category
            const countProds = (catName: string) => products.filter(p => p.cat === catName).length;

            return (<React.Fragment key={l1.id}>
              <div className="nav-divider" />
              <div className="nav-beauty-wrap">
                <button className={`nav-link nav-beauty-link${page === 'shop' ? ' active' : ''}`}
                  onClick={() => { onCategoryClick('All'); setPage('shop'); }}>
                  {getCatName(l1)}
                  <ChevronDown size={12} style={{marginInlineStart:'4px',opacity:0.6}}/>
                </button>
                <div className="mega-dropdown simple-list">
                  {l2s.map(l2 => {
                    const l3s = getChildren(l2.id);
                    return l3s.map(l3 => (
                      <button key={l3.id} className={`mega-list-item${win.__activeCat === l3.name ? ' active' : ''}`}
                        onClick={() => { onCategoryClick(l3.name); setPage('shop'); }}>
                        {getCatName(l3)}
                      </button>
                    ));
                  })}
                  <div className="mega-list-divider" />
                  <button className="mega-list-item view-all"
                    onClick={() => { onCategoryClick('All'); setPage('shop'); }}>
                    {t('allProducts')} ({(() => {
                      let count = 0;
                      l2s.forEach(l2 => { getChildren(l2.id).forEach(l3 => { count += countProds(l3.name); }); });
                      return count;
                    })()})
                  </button>
                </div>
              </div>
            </React.Fragment>);
          })}
          <div className="nav-divider" />
          <button className={`nav-link nav-admin${adminPages.includes(page) ? ' active' : ''}`}
            onClick={() => setPage('dash')}>
            {t('adminPanel')} <ChevronDown size={12}/>
          </button>
        </div>
      </nav>
    </header>
  );
};
