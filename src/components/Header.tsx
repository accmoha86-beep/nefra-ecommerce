import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, Truck, RotateCcw, Shield, Phone, BarChart3, ChevronDown, ChevronRight, Scale, Globe, Menu, X, Home, Package, Gift, MapPin, Settings, Flag, Zap, Globe2, Receipt, FileText, Type } from 'lucide-react';
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
  categories: { name: string; nameAr?: string; nameIt?: string; emoji: string; enabled?: boolean }[];
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
    { label: t('trackOrder'), page: 'track' },
  ];

  const adminPages: Page[] = ['dash', 'flags', 'marketing', 'countries', 'tax', 'invoices', 'languages', 'admin-users', 'products-admin'];
  
  const getCatName = (c: any) => lang === 'ar' ? (c.nameAr || c.name) : lang === 'it' ? (c.nameIt || c.name) : c.name;
  const enabledCats = catList.filter(c => c.enabled !== false);
  const win = window as any;

  return (
    <header className="header" dir={currentLang.direction}>
      <div className="header-inner">
        <button className="logo" onClick={() => setPage('home')}>
          <img src="/assets/logo-v2.png" alt="NEFRA" className="logo-img" />
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
                      <img src={p.img} alt={p.name} className="search-result-img" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
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
            <img src="/assets/logo-v2.png" alt="NEFRA" className="logo-img-mobile" />
          </span>
        </div>
        {/* Main Nav */}
        <button onClick={() => {setPage('home');setMobileMenuOpen(false);}}><Home size={16} style={{marginInlineEnd:'8px'}}/>{t('home')}</button>
        <button onClick={() => {setPage('shop');setMobileMenuOpen(false);}}><Package size={16} style={{marginInlineEnd:'8px'}}/>{t('shop')}</button>
        <button onClick={() => {setPage('giftcards');setMobileMenuOpen(false);}}><Gift size={16} style={{marginInlineEnd:'8px'}}/>{t('giftCards')}</button>
        <button onClick={() => {setPage('track');setMobileMenuOpen(false);}}><MapPin size={16} style={{marginInlineEnd:'8px'}}/>{t('trackOrder')}</button>
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
        {/* Categories in mobile */}
        <div style={{padding:'0.75rem 1rem 0.25rem',fontSize:'0.7rem',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.1em'}}>{t('categories') || 'Categories'}</div>
        {enabledCats.map(c => (
          <button key={c.name} onClick={() => {onCategoryClick(c.name);setPage('shop');setMobileMenuOpen(false);}}>
            <span style={{marginInlineEnd:'8px'}}>{c.emoji}</span>{getCatName(c)}
          </button>
        ))}
      </div>
      <nav className="navbar">
        <div className="nav-inner">
          {navItems.map(n => (
            <button key={n.label} className={`nav-link${n.page === page ? ' active' : ''}`}
              onClick={() => n.page && setPage(n.page)}>{n.label}</button>
          ))}
          {/* Category items merged into main nav */}
          {ff.ff_category_nav !== false && enabledCats.length > 0 && (<>
            <div className="nav-divider" />
            {enabledCats.map(c => (
              <button key={c.name} className={`nav-link nav-cat-link${win.__activeCat === c.name ? ' active' : ''}`}
                onClick={() => { onCategoryClick(c.name); setPage('shop'); }}>
                <span className="nav-cat-emoji">{c.emoji}</span>
                {getCatName(c)}
              </button>
            ))}
          </>)}
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
