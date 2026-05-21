import React, { useState, useCallback, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUp, MessageCircle, X, Cookie } from 'lucide-react';
import { Theme, Page, Product, CartItem, Country, Language, TaxConfig, Invoice, Translations, TFunc, Testimonial, FooterLink, SeoMeta, SiteSettings } from './types';
import { products, countries as countriesInitial, languages as languagesInitial, translations as translationsInitial, taxConfigs as taxConfigsInitial, sampleInvoices, orders, featureFlags as ffInit, categories, revenueData, countryRevenueData, giftCards, promoMessages, socialLinks, defaultTestimonials, defaultFooterLinks, defaultSeoMeta, defaultSiteSettings } from './data';
import { TopBar, Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminLayout } from './components/AdminLayout';
import { CategoryPage } from './components/CategoryPage';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartSidebar } from './components/CartSidebar';
import { WishlistPage } from './components/WishlistPage';
import { ComparePage } from './components/ComparePage';
import { AccountPage } from './components/AccountPage';
import { LoginPage } from './components/LoginPage';

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
import { ProductManagementPage } from './components/ProductManagementPage';
import { PromoTicker } from './components/PromoTicker';
import { WhatsAppButton } from './components/WhatsAppButton';
import { NewsletterPopup } from './components/NewsletterPopup';
import { Breadcrumbs } from './components/Breadcrumbs';
import { AppDownloadBanner } from './components/AppDownloadBanner';
import { LoyaltyWidget } from './components/LoyaltyWidget';



// ═══════════════════════════════════════════════════════
// Hash-based URL Routing
// ═══════════════════════════════════════════════════════
const pageToRoute: Record<string, string> = {
  'home': '/', 'shop': '/shop', 'detail': '/product',
  'checkout': '/checkout', 'wishlist': '/wishlist', 'compare': '/compare',
  'account': '/account', 'login': '/login', 'giftcards': '/gift-cards',
  'dash': '/dashboard', 'flags': '/dashboard/flags',
  'marketing': '/dashboard/marketing', 'countries': '/dashboard/countries',
  'tax': '/dashboard/tax', 'invoices': '/dashboard/invoices',
  'languages': '/dashboard/languages', 'admin-users': '/dashboard/users',
  'products-admin': '/dashboard/products', 'faq': '/faq',
  'shipping-info': '/shipping', 'returns-policy': '/returns',
  'size-guide': '/size-guide', 'contact': '/contact',
  'category': '/category',
};

const routeToPage: Record<string, string> = Object.fromEntries(
  Object.entries(pageToRoute).filter(([k]) => k !== 'detail').map(([k, v]) => [v, k])
);

function parseHash(): { page: string; productId?: number; categoryId?: string } {
  const hash = window.location.hash.replace('#', '') || '/';
  // Product detail: /product/42
  const productMatch = hash.match(/^\/product\/(\d+)/);
  if (productMatch) return { page: 'detail', productId: parseInt(productMatch[1]) };
  // Category page: /category/fragrances
  const catMatch = hash.match(/^\/category\/([\w-]+)/);
  if (catMatch) return { page: 'category', categoryId: catMatch[1] };
  // Shop with filter: /shop/category-name
  if (hash.startsWith('/shop/')) return { page: 'shop' };
  return { page: routeToPage[hash] || 'home' };
}

function buildHash(page: string, productId?: number, categoryId?: string): string {
  if (page === 'detail' && productId) return `#/product/${productId}`;
  if (page === 'category' && categoryId) return `#/category/${categoryId}`;
  return `#${pageToRoute[page] || '/'}`;
}

// ═══════════════════════════════════════════════════════
// LocalStorage Persistence — all admin changes saved permanently
// ═══════════════════════════════════════════════════════
const STORAGE_PREFIX = 'nefra_';

function loadState<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(STORAGE_PREFIX + key);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore */ }
  return fallback;
}

function saveState(key: string, value: any): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) { /* ignore */ }
}

const App: React.FC = () => {
  // Core state
  const [theme, setTheme] = useState<Theme>(() => loadState('theme', 'elegant-dark'));
  const [page, setPageRaw] = useState<Page>(() => { const parsed = parseHash(); return parsed.page as Page; });
  const skipHashSync = useRef(false);
  const setPage = useCallback((p: Page) => { setPageRaw(p); }, []);
  const [cart, setCart] = useState<CartItem[]>(() => loadState('cart', []));
  const [wishlist, setWishlist] = useState<number[]>(() => loadState('wishlist', []));
  const [compareList, setCompareList] = useState<number[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeCat, setActiveCat] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categoriesData, setCategoriesData] = useState(() => {
    const saved = loadState('categoriesData', categories);
    // Migration: if old flat categories (no level) OR missing perfumes category, replace
    if (saved.length > 0 && (saved[0].level === undefined || !saved.some((c: any) => c.id === 'fragrances' || c.id === 'makeup-main'))) {
      saveState('categoriesData', categories);
      return categories;
    }
    return saved;
  });
  const [productsData, setProductsData] = useState(() => {
    const saved = loadState('productsData', products);
    // Migration v4: force refresh if perfumes have wrong prices (old price:125 instead of 500)
    const perfumeSample = saved.find((p: any) => p.id === 26);
    if (!saved.some((p: any) => p.id >= 26) || (perfumeSample && perfumeSample.price < 200)) {
      saveState('productsData', products);
      return products;
    }

    // Migration v7: force refresh for new mega menu categories restructure
    const savedCats = loadState('categoriesData', categories);
    if (savedCats && savedCats.length > 0) {
      const hasNewStructure = savedCats.some((c: any) => c.id === 'fragrances' || c.id === 'makeup-main');
      if (!hasNewStructure) {
        console.log('Migration v7: new category structure — refreshing');
        localStorage.removeItem(STORAGE_PREFIX + 'categories');
        localStorage.removeItem(STORAGE_PREFIX + 'products');
        window.location.reload();
        return;
      }
    }
    return saved;
  });
  const [showCookie, setShowCookie] = useState(() => loadState('cookieAccepted', false) ? false : true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(() => loadState('isLoggedIn', false));
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; phone?: string } | null>(() => loadState('currentUser', null));
  const [authRedirect, setAuthRedirect] = useState<Page | null>(null);

  // Multi-country & multi-language state
  const [countriesData, setCountriesData] = useState<Country[]>(() => loadState('countriesData', countriesInitial));
  const [languagesData, setLanguagesData] = useState<Language[]>(() => loadState('languagesData', languagesInitial));
  const [translationsData, setTranslationsData] = useState<Record<string, Translations>>(translationsInitial);
  const [taxData, setTaxData] = useState<TaxConfig[]>(() => loadState('taxData', taxConfigsInitial));
  const [featureFlags, setFeatureFlags] = useState(() => loadState('featureFlags', ffInit));
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => loadState('siteSettings', defaultSiteSettings));
  
  const [currentCountry, setCurrentCountry] = useState<Country>(() => { const saved = loadState<Country|null>('currentCountry', null); const enabledCountries = countriesInitial.filter(c => c.enabled); if (saved && enabledCountries.find(c => c.code === saved.code)) return saved; return enabledCountries.find(c => c.isDefault) || enabledCountries[0] || countriesInitial[0]; });
  const [currentLang, setCurrentLang] = useState<Language>(() => { const saved = loadState<Language|null>('currentLang', null); return saved || languagesInitial.find(l => l.isDefault) || languagesInitial[0]; });

  // Translation function
  // Category translation helper
  const catMap: Record<string, string> = { 'Fragrances': 'catFragrances', 'Womens Perfumes': 'catWomensPerfumes', 'Mens Perfumes': 'catMensPerfumes', 'Unisex Perfumes': 'catUnisexPerfumes', 'Incense': 'catIncense', 'Air Fresheners': 'catAirFresheners', 'Shoes': 'catShoes', 'Womens Shoes': 'catWomensShoes', 'Mens Shoes': 'catMensShoes', 'Kids Shoes': 'catKidsShoes', 'Sports Shoes': 'catSportsShoes', 'Bags': 'catBags', 'Womens Bags': 'catWomensBags', 'Mens Bags': 'catMensBags', 'Wallets': 'catWallets', 'Travel Bags': 'catTravelBags', 'Mobile Accessories': 'catMobileAccessories', 'Phone Cases': 'catPhoneCases', 'Chargers': 'catChargers', 'Headphones': 'catHeadphones', 'Screen Protectors': 'catScreenProtectors', 'Cables': 'catCables', 'Power Banks': 'catPowerBanks', 'Phone Holders': 'catPhoneHolders', 'Makeup': 'catMakeupCat', 'Face': 'catFace', 'Eyes': 'catEyes', 'Lips': 'catLips', 'Nails': 'catNails', 'Makeup Tools': 'catMakeupTools', 'Offers': 'catOffers', 'Discounts': 'catDiscounts', 'Clearance': 'catClearance', 'Seasonal Offers': 'catSeasonalOffers', 'New Arrivals': 'catNewArrivals', 'Newest Products': 'catNewestProducts', 'Best Sellers': 'catBestSellers', 'Kids Toys': 'catKidsToys', 'Educational Toys': 'catEducationalToys', 'Dolls & Plush': 'catDollsPlush', 'RC Cars & Vehicles': 'catRcCars', 'Baby Toys': 'catBabyToys', 'Building Blocks': 'catBuildingBlocks', 'Outdoor Toys': 'catOutdoorToys', 'Home & Furniture': 'catHomeFurniture', 'Sports': 'catSports', 'All': 'all' }
  // Badge translation helper
  const badgeMap: Record<string, string> = { 'Best Seller': 'badgeBestSeller', 'New': 'badgeNew', 'Premium': 'badgePremium', 'Limited': 'badgeLimited', 'Popular': 'badgePopular', 'Pro': 'badgePro', 'Trending': 'badgeTrending', 'Luxury': 'badgeLuxury', 'Hot': 'badgeHot', 'Exclusive': 'badgeExclusive' };
  // Feature flag name map
  const ffNameMap: Record<string, string> = { 'Product Reviews': 'ffProductReviews', 'Wishlist': 'ffWishlist', 'Product Compare': 'ffProductCompare', 'Quick View': 'ffQuickView', 'Recently Viewed': 'ffRecentlyViewed', 'Blog': 'ffBlog', 'Gift Cards': 'ffGiftCards', 'Loyalty Program': 'ffLoyalty', 'Newsletter': 'ffNewsletter', 'Flash Sales': 'ffFlashSales', 'WhatsApp Chat': 'ffWhatsApp', 'Cookie Consent': 'ffCookieConsent', 'Maintenance Mode': 'ffMaintenanceMode', 'Multi-Country': 'ffMultiCountry', 'Multi-Language': 'ffMultiLang', 'E-Invoicing': 'ffEInvoicing', 'Dynamic Tax': 'ffDynamicTax', 'Cash on Delivery': 'ffCOD', 'Installments': 'ffInstallments', 'Guest Checkout': 'ffGuestCheckout', 'Order Tracking': 'ffOrderTracking', 'Returns & Refunds': 'ffReturnsRefunds', 'Multi-Database': 'ffMultiDB', 'Promo Ticker Bar': 'ffPromoTicker', 'Breadcrumbs': 'ffBreadcrumbs', 'Strikethrough Pricing': 'ffStrikethrough', 'Discount Badge': 'ffDiscountBadge', 'Sizes on Cards': 'ffSizesOnCard', 'Advanced Sort': 'ffAdvancedSort', 'Category Quick Chips': 'ffCategoryChips', 'Recommended Products': 'ffRecommended', 'Product Count': 'ffProductCount', 'Social Media Links': 'ffSocialLinks', 'Payment Icons': 'ffPaymentIcons', 'Delivery Accordion': 'ffDeliveryAccordion', 'Brand on Cards': 'ffBrandOnCard', 'Buy Now Pay Later': 'ffBnplBanner' };
  const ffDescMap: Record<string, string> = { 'Customer reviews & ratings': 'ffProductReviewsDesc', 'Save favorite products': 'ffWishlistDesc', 'Compare up to 4 products': 'ffProductCompareDesc', 'Preview product in modal': 'ffQuickViewDesc', 'Track recently viewed products': 'ffRecentlyViewedDesc', 'Blog and articles': 'ffBlogDesc', 'Digital gift cards': 'ffGiftCardsDesc', 'Points and rewards': 'ffLoyaltyDesc', 'Email subscription': 'ffNewsletterDesc', 'Time-limited offers': 'ffFlashSalesDesc', 'WhatsApp floating button': 'ffWhatsAppDesc', 'Cookie consent banner': 'ffCookieConsentDesc', 'Show maintenance page': 'ffMaintenanceModeDesc', 'Multi-country support': 'ffMultiCountryDesc', 'Multi-language support': 'ffMultiLangDesc', 'Electronic invoicing system': 'ffEInvoicingDesc', 'Dynamic tax per country': 'ffDynamicTaxDesc', 'COD payment method': 'ffCODDesc', 'Buy now pay later': 'ffInstallmentsDesc', 'Checkout without account': 'ffGuestCheckoutDesc', 'Public order tracking': 'ffOrderTrackingDesc', 'Online return requests': 'ffReturnsRefundsDesc', 'Separate DB per country': 'ffMultiDBDesc', 'Rotating promotional messages at top of page': 'ffPromoTickerDesc', 'Navigation trail on all pages': 'ffBreadcrumbsDesc', 'Show original price crossed out next to sale price': 'ffStrikethroughDesc', 'Show discount percentage badge on product images': 'ffDiscountBadgeDesc', 'Show available sizes on product cards': 'ffSizesOnCardDesc', 'Multiple sort options: price, newest, discount, rating': 'ffAdvancedSortDesc', 'Horizontal scrollable category tags': 'ffCategoryChipsDesc', 'Show recently viewed products carousel': 'ffRecentlyViewedDesc2', 'Related products on product detail page': 'ffRecommendedDesc', 'Show total product count on shop page': 'ffProductCountDesc', 'Social media links in footer': 'ffSocialLinksDesc', 'Payment method icons in footer': 'ffPaymentIconsDesc', 'Expandable delivery & returns info on product page': 'ffDeliveryAccordionDesc', 'Show brand name on product cards': 'ffBrandOnCardDesc', 'BNPL promotional banner on homepage': 'ffBnplBannerDesc', 'Category links bar below main navigation': 'ffCategoryNavDesc', 'Show/hide product prices': 'ffShowPriceDesc', 'Show/hide product badge (Best Seller, New, etc.)': 'ffShowBadgeDesc', 'Show/hide stock indicator on product cards': 'ffShowStockDesc' };
  const ffCatMap: Record<string, string> = { 'Products': 'ffCatProducts', 'Content': 'ffCatContent', 'Payments': 'ffCatPayments', 'Marketing': 'ffCatMarketing', 'Support': 'ffCatSupport', 'Legal': 'ffCatLegal', 'System': 'ffCatSystem', 'Finance': 'ffCatFinance', 'Checkout': 'ffCatCheckout', 'Orders': 'ffCatOrders', 'Navigation': 'ffCatNavigation', 'Pages': 'ffCatPages' };

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

  // Country → Theme mapping
  const countryThemeMap: Record<string, Theme> = {
    'SA': 'flag-saudi',
    'AE': 'flag-uae',
    'QA': 'flag-qatar',
    'EG': 'flag-egypt',
    'IT': 'flag-italy',
  };

  // Auto-switch language + theme when country changes
  useEffect(() => {
    const countryDefaultLang = languagesData.find(l => l.code === currentCountry.defaultLanguage);
    if (countryDefaultLang && countryDefaultLang.enabled) {
      setCurrentLang(countryDefaultLang);
    }
    // Auto-switch theme to country flag theme
    const countryTheme = countryThemeMap[currentCountry.code];
    if (countryTheme) {
      setTheme(countryTheme);
    }
  }, [currentCountry.code]);

  // Set direction on body
  useEffect(() => {
    document.documentElement.dir = currentLang.direction;
    document.documentElement.lang = currentLang.code;
  }, [currentLang.code]);

  // ═══ URL Hash Routing ═══
  // Sync page state → URL hash
  useEffect(() => {
    if (skipHashSync.current) { skipHashSync.current = false; return; }
    const productId = selectedProduct?.id;
    const newHash = buildHash(page, productId, selectedCategoryId);
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
  }, [page, selectedProduct?.id, selectedCategoryId]);

  // Listen for back/forward browser navigation
  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHash();
      skipHashSync.current = true;
      setPageRaw(parsed.page as Page);
      if (parsed.productId) {
        const prod = productsData.find(p => p.id === parsed.productId);
        if (prod) setSelectedProduct(prod);
      }
      if (parsed.categoryId) setSelectedCategoryId(parsed.categoryId);
    };
    window.addEventListener('hashchange', onHashChange);
    // Handle initial product from URL
    const initial = parseHash();
    if (initial.productId) {
      const prod = productsData.find(p => p.id === initial.productId);
      if (prod) setSelectedProduct(prod);
    }
    if (initial.categoryId) setSelectedCategoryId(initial.categoryId);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [productsData]);

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


  // ═══════════════════════════════════════════════════════
  // Auto-save state to localStorage
  // ═══════════════════════════════════════════════════════
  useEffect(() => { saveState('featureFlags', featureFlags); }, [featureFlags]);
  useEffect(() => { saveState('countriesData', countriesData); }, [countriesData]);
  useEffect(() => { saveState('languagesData', languagesData); }, [languagesData]);
  useEffect(() => { saveState('taxData', taxData); }, [taxData]);
  useEffect(() => { saveState('productsData', productsData); }, [productsData]);
  useEffect(() => { saveState('categoriesData', categoriesData); }, [categoriesData]);
  useEffect(() => { saveState('cart', cart); }, [cart]);
  useEffect(() => { saveState('wishlist', wishlist); }, [wishlist]);
  useEffect(() => { saveState('theme', theme); }, [theme]);
  useEffect(() => { saveState('isLoggedIn', isLoggedIn); }, [isLoggedIn]);
  useEffect(() => { saveState('currentUser', currentUser); }, [currentUser]);
  useEffect(() => { saveState('currentCountry', currentCountry); }, [currentCountry]);
  useEffect(() => { saveState('currentLang', currentLang); }, [currentLang]);
  useEffect(() => { saveState('siteSettings', siteSettings); }, [siteSettings]);

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

  // Category navigation handler
  const handleCategoryClick = useCallback((cat: string) => {
    setActiveCat(cat);
    (window as any).__activeCat = cat;
    // Find L1 category by name — navigate to dedicated category page
    const catInfo = categoriesData.find(c => c.name === cat && c.level === 1);
    if (catInfo) {
      setSelectedCategoryId(catInfo.id);
      setPage('category');
    } else {
      // L2/L3 subcategory — filter in shop
      if (cat) setFilter(cat);
      else setFilter('All');
      setPage('shop');
    }
  }, [categoriesData]);

  // Auth handlers
  const handleLogin = useCallback((user: { name: string; email: string; phone?: string }) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    if (authRedirect) {
      setPage(authRedirect);
      setAuthRedirect(null);
    }
  }, [authRedirect]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setPage('home');
  }, []);

  const requireAuth = useCallback((targetPage: Page) => {
    if (isLoggedIn) {
      setPage(targetPage);
    } else {
      setAuthRedirect(targetPage);
      setPage('login');
    }
  }, [isLoggedIn]);

  const handleGuestCheckout = useCallback(() => {
    setPage('checkout');
  }, []);

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

  const buyNow = useCallback((p: Product, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === p.id);
      if (existing) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...p, qty }];
    });
    setPage('checkout');
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <LoginPage lang={lang} setPage={setPage} t={t} onLogin={handleLogin}
          onGuestCheckout={handleGuestCheckout} fromCheckout={authRedirect === 'checkout'} />;
      case 'home':
        return <HomePage lang={lang} tc={tc} tb={tb} theme={theme} setPage={setPage} setFilter={setFilter} onSelectProduct={selectProduct}
          onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onToggleCompare={toggleCompare}
          wishlist={wishlist} compareList={compareList} recentlyViewed={recentlyViewed}
          t={t} formatPrice={formatPrice} featureFlags={featureFlags}
          testimonials={siteSettings.testimonials} featuredProductIds={siteSettings.featuredProductIds} />;
      case 'shop':
        return <ShopPage lang={lang} getProductName={getProductName} getProductDesc={getProductDesc} tb={tb} filter={filter} setFilter={setFilter} tc={tc} setPage={setPage} onSelectProduct={selectProduct}
          onAddToCart={addToCart} onToggleWishlist={toggleWishlist} onToggleCompare={toggleCompare}
          wishlist={wishlist} compareList={compareList} t={t} formatPrice={formatPrice} featureFlags={featureFlags} />;
      case 'detail':
        return selectedProduct ? (
          <ProductDetailPage tb={tb} tc={tc} lang={lang} product={selectedProduct} onAddToCart={addToCart}
            onBuyNow={buyNow}
            onToggleWishlist={toggleWishlist} onToggleCompare={toggleCompare}
            wishlist={wishlist} compareList={compareList}
            onSelectProduct={selectProduct} setPage={setPage} t={t} formatPrice={formatPrice} isInWishlist={wishlist.includes(selectedProduct.id)} isInCompare={compareList.includes(selectedProduct.id)}
            recentlyViewed={recentlyViewed.map(id => products.find(p => p.id === id)!).filter(Boolean)} featureFlags={featureFlags} />
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

      case 'giftcards':
        return <GiftCardsPage lang={lang} setPage={setPage} t={t} formatPrice={formatPrice} />;
      case 'category':
        return <CategoryPage categoryId={selectedCategoryId} lang={lang} t={t} tc={tc} tb={tb}
          formatPrice={formatPrice} getProductName={getProductName} getProductDesc={getProductDesc}
          setPage={setPage} onSelectProduct={selectProduct} onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist} onToggleCompare={toggleCompare}
          wishlist={wishlist} compareList={compareList} featureFlags={featureFlags}
          productsData={productsData} />;
      case 'dash':
        return <DashboardPage lang={lang} setPage={setPage} theme={theme} setTheme={setTheme} t={t} getProductName={getProductName} formatPrice={(n: number) => formatPrice(n)} siteSettings={siteSettings} setSiteSettings={setSiteSettings} />;
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
      case 'products-admin':
        return <ProductManagementPage lang={lang} setPage={setPage} t={t} formatPrice={formatPrice}
          products={productsData} setProducts={setProductsData}
          categories={categoriesData} setCategories={setCategoriesData}
          featureFlags={featureFlags} country={currentCountry} />;
      default:
        return null;
    }
  };

  return (
    <div className={`app theme-${theme}`} dir={currentLang.direction}>
      {featureFlags.find(f => f.id === 'ff_promo_ticker')?.enabled !== false && (
        <PromoTicker messages={siteSettings.promoMessages} t={t} lang={lang} />
      )}
      <div className="site-header-wrapper">
        <TopBar t={t} currentCountry={currentCountry} getCountryName={getCountryName} />
        <Header getCountryName={getCountryName} theme={theme} cartCount={cartCount} wishlistCount={wishlist.length}
          compareCount={compareList.length} onCart={() => setShowCart(true)} page={page} setPage={setPage}
          t={t} currentCountry={currentCountry} countries={countriesData}
          setCurrentCountry={setCurrentCountry} currentLang={currentLang}
          languages={languagesData} setCurrentLang={setCurrentLang}
          onSearch={(q: string) => { setPage('shop'); }}
          onSelectProduct={(p: any) => { setSelectedProduct(p); setPage('detail'); }}
          formatPrice={formatPrice}
          categories={categoriesData}
          featureFlags={featureFlags.reduce((acc, f) => ({ ...acc, [f.id]: f.enabled }), {} as Record<string, boolean>)}
          onCategoryClick={handleCategoryClick}
          isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} requireAuth={requireAuth} />
      </div>
      
      {featureFlags.find(f => f.id === 'ff_breadcrumbs')?.enabled !== false && (
        <Breadcrumbs page={page} product={selectedProduct} t={t} tc={tc} lang={lang} setPage={setPage} getProductName={getProductName} />
      )}
      <main className="main">{renderPage()}</main>
      <Footer setPage={setPage} theme={theme} t={t} lang={lang} country={currentCountry} socialLinks={siteSettings.socialLinks} featureFlags={featureFlags} footerLinks={siteSettings.footerLinks} />

      {/* Cart Sidebar */}
      {showCart && <CartSidebar lang={lang} cart={cart} show={showCart}
          onUpdateQty={updateQty} onRemove={removeFromCart}
          requireAuth={requireAuth} isLoggedIn={isLoggedIn}
          guestCheckoutEnabled={featureFlags.find(f => f.id === 'ff_guest_checkout')?.enabled ?? true}
          onClose={() => setShowCart(false)} setPage={(p: Page) => { setPage(p); setShowCart(false); }}
          t={t} formatPrice={formatPrice} />}

      {/* Back to Top */}
      {showBackToTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ArrowUp size={20}/>
        </button>
      )}

      {/* WhatsApp Floating Button */}
      {featureFlags.find(f => f.name === 'WhatsApp Chat')?.enabled && (
        <WhatsAppButton t={t} currentCountry={currentCountry} lang={lang} siteSettings={siteSettings} />
      )}

      {featureFlags.find(f => f.name === 'Newsletter')?.enabled && <NewsletterPopup t={t} lang={lang} />}

      {/* Loyalty Widget */}
      {featureFlags.find(f => f.id === 'ff_loyalty_widget')?.enabled !== false && (
        <LoyaltyWidget t={t} lang={lang} />
      )}

      {/* App Download Banner */}
      {featureFlags.find(f => f.id === 'ff_app_banner')?.enabled !== false && (
        <AppDownloadBanner t={t} lang={lang} />
      )}

      {showCookie && featureFlags.find(f => f.id === 'ff_cookies')?.enabled !== false && (
        <div className="cookie-banner">
          <Cookie size={20}/>
          <p>{t('cookieMessage')}</p>
          <div className="cookie-actions">
            <button className="btn-cookie-accept" onClick={() => { setShowCookie(false); saveState('cookieAccepted', true); }}>{t('cookieAcceptAll')}</button>
            <button className="btn-cookie-settings" onClick={() => { setShowCookie(false); saveState('cookieAccepted', true); }}>{t('cookieSettings')}</button>
          </div>
        </div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) createRoot(container).render(<App />);
