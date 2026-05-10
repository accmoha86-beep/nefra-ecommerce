import React from 'react';
import { Home, ChevronRight, ChevronLeft } from 'lucide-react';
import { Page, Product, TFunc } from '../types';

interface BreadcrumbsProps {
  page: Page;
  product?: Product | null;
  t: TFunc;
  tc?: (cat: string) => string;
  lang: string;
  setPage: (p: Page) => void;
  getProductName?: (p: Product) => string;
}

const pageNames: Record<string, string> = {
  home: 'home',
  shop: 'shop',
  detail: 'breadcrumb.productDetail',
  cart: 'cart',
  checkout: 'checkout',
  wishlist: 'wishlist',
  compare: 'compare',
  track: 'trackOrder',
  account: 'account',
  giftcards: 'giftCards',
  dash: 'dashboard',
  flags: 'breadcrumb.featureFlags',
  marketing: 'breadcrumb.marketing',
  countries: 'breadcrumb.countries',
  tax: 'breadcrumb.tax',
  invoices: 'breadcrumb.invoices',
  languages: 'breadcrumb.languages',
  'admin-users': 'breadcrumb.adminUsers',
  'products-admin': 'breadcrumb.productsAdmin',
  faq: 'faq',
  'shipping-info': 'shippingInfo',
  'returns-policy': 'returnsPolicy',
  'size-guide': 'sizeGuide',
  contact: 'contactUs',
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ page, product, t, tc, lang, setPage, getProductName }) => {
  if (page === 'home') return null;
  const isRTL = lang === 'ar';
  const Separator = isRTL ? ChevronLeft : ChevronRight;
  
  const crumbs: { label: string; page?: Page }[] = [{ label: t('home'), page: 'home' }];
  
  const adminPages = ['dash', 'flags', 'marketing', 'countries', 'tax', 'invoices', 'languages', 'admin-users', 'products-admin'];
  if (adminPages.includes(page)) {
    crumbs.push({ label: t('dashboard'), page: 'dash' });
    if (page !== 'dash') {
      crumbs.push({ label: t(pageNames[page] || page) });
    }
  } else if (page === 'detail' && product) {
    crumbs.push({ label: t('shop'), page: 'shop' });
    if (tc) crumbs.push({ label: tc(product.cat), page: 'shop' });
    crumbs.push({ label: getProductName ? getProductName(product) : product.name });
  } else if (page === 'checkout') {
    crumbs.push({ label: t('cart'), page: 'cart' });
    crumbs.push({ label: t('checkout') });
  } else {
    crumbs.push({ label: t(pageNames[page] || page) });
  }

  return (
    <nav className="breadcrumbs" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="breadcrumbs-inner">
        {crumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i === 0 && <Home size={14} className="breadcrumb-home-icon" />}
            {i > 0 && <Separator size={14} className="breadcrumb-separator" />}
            {i < crumbs.length - 1 && crumb.page ? (
              <button className="breadcrumb-link" onClick={() => setPage(crumb.page!)}>{crumb.label}</button>
            ) : (
              <span className="breadcrumb-current">{crumb.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};
