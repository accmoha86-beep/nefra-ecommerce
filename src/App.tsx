import React, { useState, useCallback, useEffect } from 'react';

import { ArrowUp, MessageCircle, X, Cookie } from 'lucide-react';
import { Theme, Page, Product, CartItem, Country, Language, TaxConfig, Invoice, Translations, TFunc } from './types';
import { products, countries as countriesInitial, languages as languagesInitial, translations as translationsInitial, taxConfigs as taxConfigsInitial, sampleInvoices, orders, featureFlags as ffInit, categories, revenueData, countryRevenueData, giftCards } from './data';
import { TopBar, Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartSidebar } from './components/CartSidebar';
import { WishlistPage } from './components/WishlistPage';
import { ComparePage } from './components/ComparePage';
import { AccountPage } from './components/AccountPage';
import { TrackOrderPage } from './components/TrackOrderPage';
import { GiftCardsPage } from './components/GiftCardsPage';
import { CheckoutPage } from './components/CheckoutPage';
import { DashboardPage } from './components/DashboardPage';
import { FeatureFlagsPage } from './components/FeatureFlagsPage';
import { MarketingPage } from './components/MarketingPage';
import { CountriesAdminPage } from './components/CountriesAdminPage';
import { TaxAdminPage } from './components/TaxAdminPage';
import { InvoicesAdminPage } from './components/InvoicesAdminPage';
import { LanguagesAdminPage } from './components/LanguagesAdminPage';
import { AdminUsersPage } from './components/AdminUsersPage';
import { FAQPage } from './components/FAQPage';
import { ShippingInfoPage } from './components/ShippingInfoPage';
import { ReturnsPolicyPage } from './components/ReturnsPolicyPage';
import { SizeGuidePage } from './components/SizeGuidePage';
import { ContactPage } from './components/ContactPage';

const App: React.FC = () => {
  // Core state
  const [theme, setTheme] = useState<Theme>('elegant-dark');
  const [page, setPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [filter, setFilter] = useState('All');
  const [showCookie, setShowCookie] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Multi-country & multi-language state
  const [countriesData, setCountriesData] = useState<Country[]>(countriesInitial);
  const [languagesData, setLanguagesData] = useState<Language[]>(languagesInitial);
  const [translationsData, setTranslationsData] = useState<Record<string, Translations>>(translationsInitial);
  const [taxData, setTaxData] = useState<TaxConfig[]>(taxConfigsInitial);
  const [featureFlags, setFeatureFlags] = useState(ffInit);
  
  const [currentCountry, setCurrentCountry] = useState<Country>(countriesInitial.find(c => c.isDefault) || countriesInitial[0]);
  const [currentLang, setCurrentLang] = useState<Language>(languagesInitial.find(l => l.isDefault) || languagesInitial[0]);

  // Translation function
  // Category translation helper
  const catMap: Record<string, string> = { 'Electronics': 'catElectronics', 'Fashion': 'catFashion', 'Beauty': 'catBeauty', 'Accessories': 'catAccessories', 'Technology': 'catTechnology', 'Lifestyle': 'catLifestyle', 'All': 'all' };
  // Badge translation helper
  const badgeMap: Record<string, string> = { 'Best Seller': 'badgeBestSeller', 'New': 'badgeNew', 'Premium': 'badgePremium', 'Limited': 'badgeLimited', 'Popular': 'badgePopular', 'Pro': 'badgePro', 'Trending': 'badgeTrending', 'Luxury': 'badgeLuxury', 'Hot': 'badgeHot', 'Exclusive': 'badgeExclusive' };
  // Feature flag name map
  const ffNameMap: Record<string, string> = { 'Product Reviews': 'ffProductReviews', 'Wishlist': 'ffWishlist', 'Product Compare': 'ffProductCompare', 'Quick View': 'ffQuickView', 'Recently Viewed': 'ffRecentlyViewed', 'Blog': 'ffBlog', 'Gift Cards': 'ffGiftCards', 'Loyalty Program': 'ffLoyalty', 'Newsletter': 'ffNewsletter', 'Flash Sales': 'ffFlashSales', 'WhatsApp Chat': 'ffWhatsApp', 'Cookie Consent': 'ffCookieConsent', 'Maintenance Mode': 'ffMaintenanceMode', 'Multi-Country': 'ffMultiCountry', 'Multi-Language': 'ffMultiLang', 'E-Invoicing': 'ffEInvoicing', 'Dynamic Tax': 'ffDynamicTax', 'Cash on Delivery': 'ffCOD', 'Installments': 'ffInstallments', 'Guest Checkout': 'ffGuestCheckout', 'Order Tracking': 'ffOrderTracking', 'Returns & Refunds': 'ffReturnsRefunds', 'Multi-Database': 'ffMultiDB' };
  const ffDescMap: Record<string, string> = { 'Customer reviews & ratings': 'ffProductReviewsDesc', 'Save favorite products': 'ffWishlistDesc', 'Compare up to 4 products': 'ffProductCompareDesc', 'Preview product in modal': 'ffQuickViewDesc', 'Track recently viewed products': 'ffRecentlyViewedDesc', 'Blog and articles': 'ffBlogDesc', 'Digital gift cards': 'ffGiftCardsDesc', 'Points and rewards': 'ffLoyaltyDesc', 'Email subscription': 'ffNewsletterDesc', 'Time-limited offers': 'ffFlashSalesDesc', 'WhatsApp floating button': 'ffWhatsAppDesc', 'Cookie consent banner': 'ffCookieConsentDesc', 'Show maintenance page': 'ffMaintenanceModeDesc', 'Multi-country support': 'ffMultiCountryDesc', 'Multi-language support': 'ffMultiLangDesc', 'Electronic invoicing system': 'ffEInvoicingDesc', 'Dynamic tax per country': 'ffDynamicTaxDesc', 'COD payment method': 'ffCODDesc', 'Buy now pay later': 'ffInstallmentsDesc', 'Checkout without account': 'ffGuestCheckoutDesc', 'Public order tracking': 'ffOrderTrackingDesc', 'Online return requests': 'ffReturnsRefundsDesc', 'Separate DB per country': 'ffMultiDBDesc' };
  const ffCatMap: Record<string, string> = { 'Products': 'ffCatProducts', 'Content': 'ffCatContent', 'Payments': 'ffCatPayments', 'Marketing': 'ffCatMarketing', 'Support': 'ffCatSupport', 'Legal': 'ffCatLegal', 'System': 'ffCatSystem', 'Finance': 'ffCatFinance', 'Checkout': 'ffCatCheckout', 'Orders': 'ffCatOrders' };

  const t: TFunc = useCallback((key: string, replacements?: Record<string, string>) => {
    let text = translationsData[currentLang.code]?.[key] || translationsData['en']?.[key] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => { text = text.replace(`{${k}}`, v); });
    }
    return text;
  }, [currentLang.code, translationsData]);

  // Translation helpers for dynamic content
  const tc = (cat: string): string => { const k = catMap[cat]; return k ? t(k) : cat; };
  const tb = (badge: string): string => { const k = badgeMap[badge]; return k ? t(k) : badge; };
  const tff = (name: string): string => { const k = ffNameMap[name]; return k ? t(k) : name; };
  const tffd = (desc: string): string => { const k = ffDescMap[desc]; return k ? t(k) : desc; };

  // Language-aware name helpers
  const lang = currentLang.code;
  const getCountryName = (c: any): string => lang === 'ar' ? (c.nameAr || c.name) : lang === 'it' ? (c.nameIt || c.name) : c.name;
  const getProductName = (p: any): string => lang === 'ar' ? (p.nameAr || p.name) : lang === 'it' ? (p.nameIt || p.name) : p.name;
  const getProductDesc = (p: any): string => lang === 'ar' ? (p.descAr || p.desc) : lang === 'it' ? (p.descIt || p.desc) : p.desc;

  const tffc = (cat: string): string => { const k = ffCatMap[cat]; return k ? t(k) : cat; };

  // Auto-switch language when country changes
  useEffect(() => {
    const countryDefaultLang = languagesData.find(l => l.code === currentCountry.defaultLanguage);
    if (countryDefaultLang && countryDefaultLang.enabled) {
      setCurrentLang(countryDefaultLang);
    }
  }, [currentCountry.code]);

  // Set direction on body
  useEffect(() => {
    document.documentElement.dir = currentLang.direction;
    document.documentElement.lang = currentLang.code;
  }, [currentLang.code]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Price formatting based on current country
  const formatPrice = useCallback((price: number, product?: Product) => {
    let localPrice = price;
    if (product?.countryPrices?.[currentCountry.code]) {
      localPrice = product.countryPrices[currentCountry.code];
    } else if (currentCountry.exchangeRate !== 1) {
      localPrice = Math.round(price * currentCountry.exchangeRate);
    }
    const formatted = localPrice.toLocaleString();
    return currentCountry.currencyPosition === 'before' 
      ? `${currentCountry.currencySymbol}${formatted}` 
      : `${formatted} ${currentCountry.currencySymbol}`;
  }, [currentCountry]);

  const addToCart = useCallback((p: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === p.id);
      if (existing) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }, []);

  const toggleCompare = useCallback((id: number) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  }, []);

  const selectProduct = useCallback((p: Product) => {
    setSelectedProduct(p);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== p.id);
      return [p.id, ...filtered].slice(0, 6);
    });
    setPage('detail');
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage lang={lang} tc={tc} tb={tb} theme={theme} setPage={setPage} setFilter={setFilter} onSelectProduct={selectProduct}
          onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onToggleCompare={toggleCompare}
          wishlist={wishlist} compareList={compareList} recentlyViewed={recentlyViewed}
          t={t} formatPrice={formatPrice} />;
      case 'shop':
        return <ShopPage lang={lang} getProductName={getProductName} getProductDesc={getProductDesc} tb={tb} filter={filter} setFilter={setFilter} tc={tc} setPage={setPage} onSelectProduct={selectProduct}
          onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onToggleCompare={toggleCompare}
          wishlist={wishlist} compareList={compareList} t={t} formatPrice={formatPrice} />;
      case 'detail':
        return selectedProduct ? (
          <ProductDetailPage tb={tb} tc={tc} lang={lang} product={selectedProduct} onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist} onToggleCompare={toggleCompare}
            wishlist={wishlist} compareList={compareList}
            onSelectProduct={selectProduct} setPage={setPage} t={t} formatPrice={formatPrice} isInWishlist={wishlist.includes(selectedProduct.id)} isInCompare={compareList.includes(selectedProduct.id)} />
        ) : null;
      case 'checkout':
        return <CheckoutPage lang={lang} cart={cart} setPage={setPage} setCart={setCart} t={t} formatPrice={formatPrice}
          currentCountry={currentCountry} />;
      case 'wishlist':
        return <WishlistPage lang={lang} tb={tb} wishlist={wishlist} setPage={setPage} onToggleWishlist={toggleWishlist}
          onAddToCart={addToCart} onSelectProduct={selectProduct} onToggleCompare={toggleCompare}
          compareList={compareList} t={t} formatPrice={formatPrice} />;
      case 'compare':
        return <ComparePage lang={lang} tb={tb} compareList={compareList} setPage={setPage} onToggleCompare={toggleCompare}
          onAddToCart={addToCart} onSelectProduct={selectProduct} t={t} formatPrice={formatPrice} />;
      case 'account':
        return <AccountPage lang={lang} setPage={setPage} t={t} formatPrice={(n: number) => formatPrice(n)} />;
      case 'track':
        return <TrackOrderPage lang={lang} setPage={setPage} t={t} />;
      case 'giftcards':
        return <GiftCardsPage lang={lang} setPage={setPage} t={t} formatPrice={formatPrice} />;
      case 'dash':
        return <DashboardPage lang={lang} setPage={setPage} theme={theme} setTheme={setTheme} t={t} getProductName={getProductName} formatPrice={(n: number) => formatPrice(n)} />;
      case 'flags':
        return <FeatureFlagsPage lang={lang} featureFlags={featureFlags} setFeatureFlags={setFeatureFlags} setPage={setPage} t={t} />;
      case 'marketing':
        return <MarketingPage lang={lang} setPage={setPage} t={t} tc={tc} formatPrice={(n: number) => formatPrice(n)} />;
      case 'countries':
        return <CountriesAdminPage lang={lang} countriesData={countriesData} setCountriesData={setCountriesData} setPage={setPage} t={t} />;
      case 'tax':
        return <TaxAdminPage lang={lang} taxData={taxData} setTaxData={setTaxData} setPage={setPage} t={t} />;
      case 'invoices':
        return <InvoicesAdminPage lang={lang} invoicesData={sampleInvoices} countriesData={countriesData} setPage={setPage} t={t} />;
      case 'languages':
        return <LanguagesAdminPage lang={lang} languagesData={languagesData} setLanguagesData={setLanguagesData} setPage={setPage}
          translationsData={translationsData} setTranslationsData={setTranslationsData} t={t} />;
      case 'admin-users':
        return <AdminUsersPage lang={lang} setPage={setPage} t={t} />;
      case 'faq':
        return <FAQPage lang={lang} setPage={setPage} t={t} country={currentCountry} />;
      case 'shipping-info':
        return <ShippingInfoPage lang={lang} setPage={setPage} t={t} formatPrice={formatPrice} country={currentCountry} />;
      case 'returns-policy':
        return <ReturnsPolicyPage lang={lang} setPage={setPage} t={t} country={currentCountry} />;
      case 'size-guide':
        return <SizeGuidePage lang={lang} setPage={setPage} t={t} country={currentCountry} />;
      case 'contact':
        return <ContactPage lang={lang} setPage={setPage} t={t} country={currentCountry} />;
      default:
        return null;
    }
  };

  return (
    <div className={`app theme-${theme}`} dir={currentLang.direction}>
      <div className="site-header-wrapper">
        <TopBar t={t} currentCountry={currentCountry} />
        <Header getCountryName={getCountryName} theme={theme} cartCount={cartCount} wishlistCount={wishlist.length}
          compareCount={compareList.length} onCart={() => setShowCart(true)} page={page} setPage={setPage}
          t={t} currentCountry={currentCountry} countries={countriesData}
          setCurrentCountry={setCurrentCountry} currentLang={currentLang}
          languages={languagesData} setCurrentLang={setCurrentLang} />
      </div>
      
      <main className="main">{renderPage()}</main>
      <Footer setPage={setPage} theme={theme} t={t} />

      {/* Cart Sidebar */}
      {showCart && <CartSidebar lang={lang} cart={cart} updateQty={updateQty} removeFromCart={removeFromCart}
        onClose={() => setShowCart(false)} setPage={(p) => { setPage(p); setShowCart(false); }}
        t={t} formatPrice={formatPrice} />}

      {/* WhatsApp */}
      <a className="whatsapp-fab" href="#" onClick={e => e.preventDefault()} title="WhatsApp">
        <MessageCircle size={24}/>
      </a>

      {/* Back to Top */}
      {showBackToTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ArrowUp size={20}/>
        </button>
      )}

      {/* Cookie Consent */}
      {showCookie && (
        <div className="cookie-banner">
          <Cookie size={20}/>
          <p>{t('cookieMessage')}</p>
          <div className="cookie-actions">
            <button className="btn-cookie-accept" onClick={() => setShowCookie(false)}>{t('cookieAcceptAll')}</button>
            <button className="btn-cookie-settings" onClick={() => setShowCookie(false)}>{t('cookieSettings')}</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default App;
