export type Theme = 'elegant-dark' | 'modern-soft' | 'royal-premium' | 'pure-minimalist' | 'natural-organic' | 'flag-saudi' | 'flag-uae' | 'flag-qatar' | 'flag-egypt' | 'flag-italy';

export type Page = 
  | 'home' | 'shop' | 'detail' | 'cart' | 'checkout'
  | 'wishlist' | 'compare' | 'blog' | 'blogpost'
  | 'account' | 'giftcards'
  | 'login'
  | 'dash' | 'flags' | 'marketing' | 'countries'
  | 'tax' | 'invoices' | 'languages' | 'admin-users'
  | 'faq' | 'shipping-info' | 'returns-policy' | 'size-guide' | 'contact'
  | 'products-admin';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  flag: string;
  enabled: boolean;
  isDefault: boolean;
}

export interface AddressField {
  key: string;
  label?: string;
  labelKey?: string;
  labelAr: string;
  labelIt: string;
  type: 'text' | 'select' | 'tel' | 'email';
  required: boolean;
  placeholder: string;
  options?: string[];
  validation?: string;
}

export interface TaxConfig {
  id: string;
  countryCode: string;
  countryName: string;
  taxName: string;
  standardRate: number;
  reducedRates: { name: string; rate: number; categories: string[] }[];
  taxNumber: string;
  taxNumberLabel: string;
  displayInclusive: boolean;
  digitalInvoice: boolean;
  invoiceFormat: 'pdf' | 'xml' | 'json';
  taxAuthority: string;
  taxAuthorityApi: string;
  taxApiKey: string;
  autoSubmit: boolean;
  enabled: boolean;
}

export interface Invoice {
  id: string;
  orderRef: string;
  customer: string;
  country: string;
  amount: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'submitted' | 'accepted' | 'rejected';
  date: string;
  dueDate: string;
  format: 'pdf' | 'xml' | 'json';
}

export interface Country {
  code: string;
  name: string;
  nameAr: string;
  nameIt: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  currencyPosition: 'before' | 'after';
  exchangeRate: number;
  taxRate: number;
  taxName: string;
  languages: string[];
  defaultLanguage: string;
  direction: 'ltr' | 'rtl';
  shippingCost: number;
  freeShippingMin: number;
  paymentMethods: string[];
  shippingCompanies: string[];
  enabled: boolean;
  isDefault: boolean;
  phone: string;
  timezone: string;
  addressFields: AddressField[];
  legalRequirements: string[];
  invoiceFormat: 'pdf' | 'xml' | 'json';
  dbName: string;
  returnDays: number;
  email: string;
  address: string;
  addressAr: string;
  addressIt: string;
  supportHours: string;
  supportHoursAr: string;
  supportHoursIt: string;
  whatsappNumber?: string;
  codFeePercent?: number;
  paymentAccountDetails?: Record<string, Record<string, string>>;
}

export interface Product {
  id: number;
  name: string;
  nameAr?: string;
  nameIt?: string;
  cat: string;
  brand: string;
  price: number;
  old?: number;
  rating: number;
  reviews: number;
  badge?: string;
  img: string;
  grad: string;
  desc: string;
  descAr?: string;
  descIt?: string;
  stock: number;
  specs: string[];
  specsAr?: string[];
  specsIt?: string[];
  countryStock?: { [countryCode: string]: number };
  countryPrices?: { [countryCode: string]: number };
  attributes?: Record<string, string>;
  hidden?: boolean;
}

export interface CartItem extends Product {
  qty: number;
}

export interface BlogPost {
  id: number;
  title: string;
  titleAr?: string;
  titleIt?: string;
  excerpt: string;
  excerptAr?: string;
  excerptIt?: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  img: string;
  featured?: boolean;
}

export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'returned';
  date: string;
  items: number;
  country?: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
  description: string;
}

export interface Address {
  id: number;
  label?: string;
  labelKey?: string;
  name: string;
  street: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

export interface Notification {
  id: number;
  title?: string;
  message?: string;
  titleKey?: string;
  messageKey?: string;
  type: 'order' | 'promo' | 'system' | 'loyalty';
  date: string;
  read: boolean;
}

export interface GiftCard {
  id: number;
  value: number;
  design: string;
  emoji: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  nameAr?: string;
  nameIt?: string;
  parentId: string | null;
  level: 1 | 2 | 3;
  enabled: boolean;
  order: number;
  filterType?: string;
  count?: number;
  grad?: string;
}

export interface ChartDataPoint {
  label?: string;
  labelKey?: string;
  value: number;
}

export interface PromoMessage {
  id: string;
  textKey: string;
  emoji: string;
  link?: string;
  enabled: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface Testimonial {
  id: string;
  nameEn: string;
  nameAr: string;
  nameIt: string;
  country: string;
  rating: number;
  textEn: string;
  textAr: string;
  textIt: string;
  enabled: boolean;
}

export interface HeroBannerConfig {
  enabled: boolean;
  imageUrl: string;
  overlayOpacity: number;
}

export interface FooterLink {
  id: string;
  labelEn: string;
  labelAr: string;
  labelIt: string;
  page: Page;
  section: string;
  enabled: boolean;
}

export interface SeoMeta {
  titleEn: string;
  titleAr: string;
  titleIt: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionIt: string;
  keywords: string;
  ogImage: string;
}

export interface SiteSettings {
  socialLinks: SocialLink[];
  testimonials: Testimonial[];
  heroBanner: HeroBannerConfig;
  promoMessages: PromoMessage[];
  footerLinks: FooterLink[];
  seoMeta: SeoMeta;
  whatsappDefaultMessage: Record<string, string>;
  featuredProductIds: number[];
  codFeeLabel: string;
}

export type Translations = Record<string, string>;
export type TFunc = (key: string, replacements?: Record<string, string>) => string;
