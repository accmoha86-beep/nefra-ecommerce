import { Product, BlogPost, Order, FeatureFlag, Address, Notification, GiftCard, CategoryInfo, ChartDataPoint, Country, Language, TaxConfig, Invoice, Translations, PromoMessage, SocialLink, Testimonial, FooterLink, SeoMeta, SiteSettings, HeroBannerConfig, Page } from './types';
import { allTranslations } from './i18n';

// ============ LANGUAGES ============
export const languages: Language[] = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', flag: '🇸🇦', enabled: true, isDefault: true },
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr', flag: '🇬🇧', enabled: true, isDefault: false },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr', flag: '🇮🇹', enabled: true, isDefault: false },
];

// ============ TRANSLATIONS (from i18n.ts) ============
export const translations = allTranslations;


// ============ COUNTRIES ============
export const countries: Country[] = [
  {
    code: 'SA', name: 'Saudi Arabia', nameAr: 'السعودية', nameIt: 'Arabia Saudita',
    flag: '🇸🇦', currency: 'SAR', currencySymbol: 'ر.س', currencyPosition: 'after',
    exchangeRate: 1, taxRate: 15, taxName: 'VAT',
    languages: ['ar', 'en'], defaultLanguage: 'ar', direction: 'rtl',
    shippingCost: 25, freeShippingMin: 300,
    whatsappNumber: '966500000000', codFeePercent: 2, paymentAccountDetails: {},
    paymentMethods: ['Visa/Mastercard', 'Apple Pay', 'Mada', 'Tabby', 'Tamara', 'STC Pay', 'Cash on Delivery'],
    shippingCompanies: ['Aramex', 'SMSA', 'DHL', 'Saudi Post', 'FedEx', 'J&T Express'],
    enabled: false, isDefault: false, phone: '+966', timezone: 'Asia/Riyadh',
    dbName: 'db_saudi',
    returnDays: 7, email: 'support-sa@nefra.com',
    address: 'Riyadh, King Fahd Road, Tower 1, Floor 15',
    addressAr: 'الرياض، طريق الملك فهد، برج 1، الطابق 15',
    addressIt: 'Riyadh, King Fahd Road, Torre 1, Piano 15',
    supportHours: 'Sun-Thu 9:00 AM - 10:00 PM',
    supportHoursAr: 'الأحد - الخميس 9:00 ص - 10:00 م',
    supportHoursIt: 'Dom-Gio 9:00 - 22:00',
    legalRequirements: ['سجل تجاري', 'رقم ضريبي (VAT)', 'شهادة ZATCA'],
    invoiceFormat: 'xml',
    addressFields: [
      { key: 'name', label: 'Full Name', labelAr: 'الاسم الكامل', labelIt: 'Nome Completo', type: 'text', required: true, placeholder: 'محمد أحمد' },
      { key: 'phone', label: 'Phone', labelAr: 'رقم الجوال', labelIt: 'Telefono', type: 'tel', required: true, placeholder: '+966 5XX XXX XXXX', validation: '^\\+966[0-9]{9}$' },
      { key: 'region', label: 'Region', labelAr: 'المنطقة', labelIt: 'Regione', type: 'select', required: true, placeholder: '', options: ['الرياض', 'مكة المكرمة', 'المنطقة الشرقية', 'المدينة المنورة', 'القصيم', 'عسير', 'تبوك', 'حائل', 'الحدود الشمالية', 'جازان', 'نجران', 'الباحة', 'الجوف'] },
      { key: 'city', label: 'City', labelAr: 'المدينة', labelIt: 'Città', type: 'text', required: true, placeholder: 'الرياض' },
      { key: 'district', label: 'District', labelAr: 'الحي', labelIt: 'Quartiere', type: 'text', required: true, placeholder: 'حي النرجس' },
      { key: 'street', label: 'Street', labelAr: 'الشارع', labelIt: 'Via', type: 'text', required: true, placeholder: 'شارع الملك فهد' },
      { key: 'building', label: 'Building No.', labelAr: 'رقم المبنى', labelIt: 'N. Edificio', type: 'text', required: false, placeholder: '1234' },
      { key: 'zip', label: 'Postal Code', labelAr: 'الرمز البريدي', labelIt: 'CAP', type: 'text', required: false, placeholder: '12345' },
      { key: 'notes', label: 'Delivery Notes', labelAr: 'ملاحظات التوصيل', labelIt: 'Note di Consegna', type: 'text', required: false, placeholder: 'بجانب مسجد...' },
    ],
  },
  {
    code: 'AE', name: 'United Arab Emirates', nameAr: 'الإمارات', nameIt: 'Emirati Arabi',
    flag: '🇦🇪', currency: 'AED', currencySymbol: 'د.إ', currencyPosition: 'after',
    exchangeRate: 0.98, taxRate: 5, taxName: 'VAT',
    languages: ['ar', 'en'], defaultLanguage: 'ar', direction: 'rtl',
    shippingCost: 30, freeShippingMin: 350,
    whatsappNumber: '971500000000', codFeePercent: 2, paymentAccountDetails: {},
    paymentMethods: ['Visa/Mastercard', 'Apple Pay', 'Tabby', 'Tamara', 'Cash on Delivery'],
    shippingCompanies: ['Aramex', 'Emirates Post', 'DHL', 'FedEx', 'Fetchr'],
    enabled: false, isDefault: false, phone: '+971', timezone: 'Asia/Dubai',
    dbName: 'db_uae',
    returnDays: 7, email: 'support-ae@nefra.com',
    address: 'Dubai, Downtown, Business Bay, Tower B, Floor 22',
    addressAr: 'دبي، داون تاون، بزنس باي، برج B، الطابق 22',
    addressIt: 'Dubai, Downtown, Business Bay, Torre B, Piano 22',
    supportHours: 'Sun-Thu 9:00 AM - 10:00 PM',
    supportHoursAr: 'الأحد - الخميس 9:00 ص - 10:00 م',
    supportHoursIt: 'Dom-Gio 9:00 - 22:00',
    legalRequirements: ['رخصة تجارية', 'رقم ضريبي TRN', 'شهادة FTA'],
    invoiceFormat: 'pdf',
    addressFields: [
      { key: 'name', label: 'Full Name', labelAr: 'الاسم الكامل', labelIt: 'Nome Completo', type: 'text', required: true, placeholder: 'محمد أحمد' },
      { key: 'phone', label: 'Phone', labelAr: 'رقم الجوال', labelIt: 'Telefono', type: 'tel', required: true, placeholder: '+971 5X XXX XXXX', validation: '^\\+971[0-9]{9}$' },
      { key: 'emirate', label: 'Emirate', labelAr: 'الإمارة', labelIt: 'Emirato', type: 'select', required: true, placeholder: '', options: ['أبوظبي', 'دبي', 'الشارقة', 'عجمان', 'أم القيوين', 'رأس الخيمة', 'الفجيرة'] },
      { key: 'area', label: 'Area', labelAr: 'المنطقة', labelIt: 'Zona', type: 'text', required: true, placeholder: 'البرشاء' },
      { key: 'street', label: 'Street', labelAr: 'الشارع', labelIt: 'Via', type: 'text', required: true, placeholder: 'شارع الشيخ زايد' },
      { key: 'building', label: 'Building/Villa', labelAr: 'المبنى/الفيلا', labelIt: 'Edificio/Villa', type: 'text', required: true, placeholder: 'برج خليفة' },
      { key: 'floor', label: 'Floor/Apt', labelAr: 'الطابق/الشقة', labelIt: 'Piano/App', type: 'text', required: false, placeholder: 'الطابق 5 - شقة 501' },
      { key: 'landmark', label: 'Landmark', labelAr: 'علامة مميزة', labelIt: 'Punto di Riferimento', type: 'text', required: false, placeholder: 'بجانب دبي مول' },
    ],
  },
  {
    code: 'QA', name: 'Qatar', nameAr: 'قطر', nameIt: 'Qatar',
    flag: '🇶🇦', currency: 'QAR', currencySymbol: 'ر.ق', currencyPosition: 'after',
    exchangeRate: 0.97, taxRate: 0, taxName: 'N/A',
    languages: ['ar', 'en'], defaultLanguage: 'ar', direction: 'rtl',
    shippingCost: 35, freeShippingMin: 400,
    whatsappNumber: '97400000000', codFeePercent: 2, paymentAccountDetails: {},
    paymentMethods: ['Visa/Mastercard', 'Apple Pay', 'QPay', 'NAPS', 'Cash on Delivery'],
    shippingCompanies: ['Q-Post', 'Aramex', 'DHL', 'FedEx'],
    enabled: false, isDefault: false, phone: '+974', timezone: 'Asia/Qatar',
    dbName: 'db_qatar',
    returnDays: 7, email: 'support-qa@nefra.com',
    address: 'Doha, West Bay, Al Dafna Tower, Floor 10',
    addressAr: 'الدوحة، الخليج الغربي، برج الدفنة، الطابق 10',
    addressIt: 'Doha, West Bay, Al Dafna Tower, Piano 10',
    supportHours: 'Sun-Thu 8:00 AM - 9:00 PM',
    supportHoursAr: 'الأحد - الخميس 8:00 ص - 9:00 م',
    supportHoursIt: 'Dom-Gio 8:00 - 21:00',
    legalRequirements: ['سجل تجاري', 'رخصة وزارة التجارة'],
    invoiceFormat: 'pdf',
    addressFields: [
      { key: 'name', label: 'Full Name', labelAr: 'الاسم الكامل', labelIt: 'Nome Completo', type: 'text', required: true, placeholder: 'محمد أحمد' },
      { key: 'phone', label: 'Phone', labelAr: 'رقم الجوال', labelIt: 'Telefono', type: 'tel', required: true, placeholder: '+974 XXXX XXXX', validation: '^\\+974[0-9]{8}$' },
      { key: 'zone', label: 'Zone', labelAr: 'المنطقة (Zone)', labelIt: 'Zona', type: 'select', required: true, placeholder: '', options: ['الدوحة', 'الوكرة', 'الخور', 'الريان', 'أم صلال', 'الظعاين', 'الشمال', 'الشحانية'] },
      { key: 'street', label: 'Street No.', labelAr: 'رقم الشارع', labelIt: 'N. Via', type: 'text', required: true, placeholder: 'شارع 15' },
      { key: 'building', label: 'Building No.', labelAr: 'رقم المبنى', labelIt: 'N. Edificio', type: 'text', required: true, placeholder: '250' },
      { key: 'qid', label: 'QID (for customs)', labelAr: 'رقم الهوية (للجمارك)', labelIt: 'QID (per dogana)', type: 'text', required: false, placeholder: '28XXXXXXXXX' },
    ],
  },
  {
    code: 'EG', name: 'Egypt', nameAr: 'مصر', nameIt: 'Egitto',
    flag: '🇪🇬', currency: 'EGP', currencySymbol: 'ج.م', currencyPosition: 'after',
    exchangeRate: 13.2, taxRate: 14, taxName: 'VAT',
    languages: ['ar', 'en'], defaultLanguage: 'ar', direction: 'rtl',
    shippingCost: 150, freeShippingMin: 2000,
    whatsappNumber: '201000000000', codFeePercent: 2,
    paymentAccountDetails: {
      instapay: { ipaAddress: 'nefra@instapay' },
      bankTransfer: { bankName: 'CIB — Commercial International Bank', accountName: 'NEFRA Store', accountNumber: '1234567890123', iban: 'EG12 0036 0002 1234 5678 9012 3' },
      vodafoneCash: { phoneNumber: '010 XXXX XXXX' },
    },
    paymentMethods: ['Cash on Delivery', 'InstaPay', 'Vodafone Cash', 'Bank Transfer', 'Fawry', 'Visa/Mastercard', 'valU'],
    shippingCompanies: ['Bosta', 'Egypt Post', 'Aramex', 'DHL', 'J&T Express', 'Mylerz'],
    enabled: true, isDefault: true, phone: '+20', timezone: 'Africa/Cairo',
    dbName: 'db_egypt',
    returnDays: 14, email: 'support-eg@nefra.com',
    address: 'Cairo, New Cairo, 5th Settlement, Business Park, Building 7',
    addressAr: 'القاهرة، القاهرة الجديدة، التجمع الخامس، بزنس بارك، مبنى 7',
    addressIt: 'Il Cairo, Nuovo Cairo, 5° Insediamento, Business Park, Edificio 7',
    supportHours: 'Sun-Thu 9:00 AM - 11:00 PM',
    supportHoursAr: 'الأحد - الخميس 9:00 ص - 11:00 م',
    supportHoursIt: 'Dom-Gio 9:00 - 23:00',
    legalRequirements: ['سجل تجاري', 'بطاقة ضريبية', 'تسجيل منظومة ETA'],
    invoiceFormat: 'json',
    addressFields: [
      { key: 'name', label: 'Full Name', labelAr: 'الاسم الكامل', labelIt: 'Nome Completo', type: 'text', required: true, placeholder: 'محمد أحمد' },
      { key: 'phone', label: 'Phone', labelAr: 'رقم الموبايل', labelIt: 'Telefono', type: 'tel', required: true, placeholder: '+20 1XX XXXX XXXX', validation: '^\\+20[0-9]{10,11}$' },
      { key: 'governorate', label: 'Governorate', labelAr: 'المحافظة', labelIt: 'Governatorato', type: 'select', required: true, placeholder: '', options: ['القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'الشرقية', 'المنوفية', 'القليوبية', 'البحيرة', 'الغربية', 'كفر الشيخ', 'المنيا', 'أسيوط', 'سوهاج', 'الفيوم', 'بني سويف', 'الأقصر', 'أسوان', 'البحر الأحمر', 'شمال سيناء', 'جنوب سيناء', 'مطروح', 'الإسماعيلية', 'السويس', 'بورسعيد', 'دمياط', 'الوادي الجديد', 'قنا'] },
      { key: 'city', label: 'City/District', labelAr: 'المدينة/المركز', labelIt: 'Città/Distretto', type: 'text', required: true, placeholder: 'مدينة نصر' },
      { key: 'area', label: 'Area/Neighborhood', labelAr: 'المنطقة/الحي', labelIt: 'Zona/Quartiere', type: 'text', required: true, placeholder: 'الحي السابع' },
      { key: 'street', label: 'Street', labelAr: 'الشارع', labelIt: 'Via', type: 'text', required: true, placeholder: 'شارع مصطفى النحاس' },
      { key: 'building', label: 'Building/Floor/Apt', labelAr: 'العمارة/الدور/الشقة', labelIt: 'Palazzo/Piano/App', type: 'text', required: true, placeholder: 'عمارة 5 - الدور 3 - شقة 12' },
      { key: 'zip', label: 'Postal Code', labelAr: 'الرمز البريدي', labelIt: 'CAP', type: 'text', required: false, placeholder: '11765' },
      { key: 'landmark', label: 'Landmark', labelAr: 'علامة مميزة', labelIt: 'Punto di Riferimento', type: 'text', required: false, placeholder: 'أمام مسجد الصديق' },
      { key: 'nationalId', label: 'National ID (optional)', labelAr: 'الرقم القومي (اختياري)', labelIt: 'ID Nazionale (opz.)', type: 'text', required: false, placeholder: '2XXXXXXXXXXXXX' },
    ],
  },
  {
    code: 'IT', name: 'Italy', nameAr: 'إيطاليا', nameIt: 'Italia',
    flag: '🇮🇹', currency: 'EUR', currencySymbol: '€', currencyPosition: 'before',
    exchangeRate: 0.245, taxRate: 22, taxName: 'IVA',
    languages: ['it', 'en'], defaultLanguage: 'it', direction: 'ltr',
    shippingCost: 10, freeShippingMin: 80,
    whatsappNumber: '393000000000', codFeePercent: 0, paymentAccountDetails: {},
    paymentMethods: ['Visa/Mastercard', 'PayPal', 'Satispay', 'PostePay', 'Scalapay', 'Klarna', 'Bonifico Bancario'],
    shippingCompanies: ['Poste Italiane', 'BRT/Bartolini', 'GLS', 'DHL', 'UPS', 'TNT'],
    enabled: false, isDefault: false, phone: '+39', timezone: 'Europe/Rome',
    dbName: 'db_italy',
    returnDays: 14, email: 'support-it@nefra.com',
    address: 'Milan, Via Monte Napoleone 8, 20121',
    addressAr: 'ميلانو، فيا مونتي نابوليوني 8، 20121',
    addressIt: 'Milano, Via Monte Napoleone 8, 20121',
    supportHours: 'Mon-Fri 9:00 AM - 7:00 PM',
    supportHoursAr: 'الإثنين - الجمعة 9:00 ص - 7:00 م',
    supportHoursIt: 'Lun-Ven 9:00 - 19:00',
    legalRequirements: ['Partita IVA', 'Camera di Commercio', 'Fattura Elettronica SDI', 'GDPR Compliance'],
    invoiceFormat: 'xml',
    addressFields: [
      { key: 'name', label: 'Full Name', labelAr: 'الاسم الكامل', labelIt: 'Nome e Cognome', type: 'text', required: true, placeholder: 'Mario Rossi' },
      { key: 'phone', label: 'Phone', labelAr: 'رقم الهاتف', labelIt: 'Telefono', type: 'tel', required: true, placeholder: '+39 3XX XXX XXXX', validation: '^\\+39[0-9]{9,10}$' },
      { key: 'codiceFiscale', label: 'Codice Fiscale', labelAr: 'الرمز الضريبي', labelIt: 'Codice Fiscale', type: 'text', required: true, placeholder: 'RSSMRA85M01H501Z' },
      { key: 'regione', label: 'Region', labelAr: 'الإقليم', labelIt: 'Regione', type: 'select', required: true, placeholder: '', options: ['Lombardia', 'Lazio', 'Campania', 'Sicilia', 'Veneto', 'Emilia-Romagna', 'Piemonte', 'Puglia', 'Toscana', 'Calabria', 'Sardegna', 'Liguria', 'Marche', 'Abruzzo', 'Friuli-Venezia Giulia', 'Trentino-Alto Adige', 'Umbria', 'Basilicata', 'Molise', "Valle d'Aosta"] },
      { key: 'provincia', label: 'Province', labelAr: 'المقاطعة', labelIt: 'Provincia', type: 'text', required: true, placeholder: 'MI (Milano)' },
      { key: 'comune', label: 'Municipality', labelAr: 'البلدية', labelIt: 'Comune', type: 'text', required: true, placeholder: 'Milano' },
      { key: 'via', label: 'Street Address', labelAr: 'العنوان', labelIt: 'Via/Piazza', type: 'text', required: true, placeholder: 'Via Roma, 25' },
      { key: 'cap', label: 'Postal Code (CAP)', labelAr: 'الرمز البريدي', labelIt: 'CAP', type: 'text', required: true, placeholder: '20121', validation: '^[0-9]{5}$' },
      { key: 'citofono', label: 'Intercom/Doorbell', labelAr: 'الجرس', labelIt: 'Citofono', type: 'text', required: false, placeholder: 'Rossi - Scala B' },
      { key: 'partitaIva', label: 'Partita IVA (B2B)', labelAr: 'رقم ضريبي (للشركات)', labelIt: 'Partita IVA (B2B)', type: 'text', required: false, placeholder: '12345678901' },
      { key: 'pec', label: 'PEC Email (for invoicing)', labelAr: 'بريد PEC (للفوترة)', labelIt: 'PEC (per fatturazione)', type: 'email', required: false, placeholder: 'info@pec.azienda.it' },
      { key: 'sdi', label: 'SDI Code (for invoicing)', labelAr: 'رمز SDI (للفوترة)', labelIt: 'Codice SDI', type: 'text', required: false, placeholder: 'A1B2C3D' },
    ],
  },
];

// ============ TAX CONFIGS ============
export const taxConfigs: TaxConfig[] = [
  {
    id: 'tax_sa', countryCode: 'SA', countryName: 'Saudi Arabia', taxName: 'VAT (ضريبة القيمة المضافة)',
    standardRate: 15, reducedRates: [], taxNumber: '300XXXXXXXXX0003', taxNumberLabel: 'VAT Number (ZATCA)',
    displayInclusive: true, digitalInvoice: true, invoiceFormat: 'xml',
    taxAuthority: 'ZATCA (هيئة الزكاة والضريبة والجمارك)', taxAuthorityApi: 'https://api.zatca.gov.sa',
    taxApiKey: '', autoSubmit: true, enabled: true,
  },
  {
    id: 'tax_ae', countryCode: 'AE', countryName: 'United Arab Emirates', taxName: 'VAT',
    standardRate: 5, reducedRates: [{ name: 'Zero-Rated', rate: 0, categories: ['Education', 'Healthcare'] }],
    taxNumber: '100XXXXXXXXX003', taxNumberLabel: 'TRN (Tax Registration Number)',
    displayInclusive: true, digitalInvoice: false, invoiceFormat: 'pdf',
    taxAuthority: 'FTA (Federal Tax Authority)', taxAuthorityApi: 'https://tax.gov.ae/api',
    taxApiKey: '', autoSubmit: false, enabled: true,
  },
  {
    id: 'tax_qa', countryCode: 'QA', countryName: 'Qatar', taxName: 'N/A',
    standardRate: 0, reducedRates: [], taxNumber: '', taxNumberLabel: 'N/A',
    displayInclusive: true, digitalInvoice: false, invoiceFormat: 'pdf',
    taxAuthority: 'General Tax Authority', taxAuthorityApi: '',
    taxApiKey: '', autoSubmit: false, enabled: false,
  },
  {
    id: 'tax_eg', countryCode: 'EG', countryName: 'Egypt', taxName: 'VAT (ضريبة القيمة المضافة)',
    standardRate: 14, reducedRates: [{ name: 'Table Tax', rate: 5, categories: ['Beverages', 'Tobacco'] }],
    taxNumber: '', taxNumberLabel: 'Tax Card Number',
    displayInclusive: true, digitalInvoice: true, invoiceFormat: 'json',
    taxAuthority: 'ETA (مصلحة الضرائب المصرية)', taxAuthorityApi: 'https://api.invoicing.eta.gov.eg',
    taxApiKey: '', autoSubmit: true, enabled: true,
  },
  {
    id: 'tax_it', countryCode: 'IT', countryName: 'Italy', taxName: 'IVA (Imposta sul Valore Aggiunto)',
    standardRate: 22, reducedRates: [
      { name: 'Reduced', rate: 10, categories: ['Food', 'Tourism', 'Renovation'] },
      { name: 'Super Reduced', rate: 4, categories: ['Essential Food', 'Books', 'Medical'] },
      { name: 'Zero', rate: 0, categories: ['Intra-EU B2B', 'Exports'] },
    ],
    taxNumber: '', taxNumberLabel: 'Partita IVA',
    displayInclusive: true, digitalInvoice: true, invoiceFormat: 'xml',
    taxAuthority: 'Agenzia delle Entrate (SDI)', taxAuthorityApi: 'https://ivaservizi.agenziaentrate.gov.it',
    taxApiKey: '', autoSubmit: true, enabled: true,
  },
];

// ============ SAMPLE INVOICES ============
export const sampleInvoices: Invoice[] = [
  { id: 'INV-SA-2024-001', orderRef: 'ORD-SA-001', customer: 'محمد أحمد', country: 'SA', amount: 1349, tax: 202.35, total: 1551.35, status: 'accepted', date: '2024-03-15', dueDate: '2024-04-15', format: 'xml' },
  { id: 'INV-SA-2024-002', orderRef: 'ORD-SA-002', customer: 'فاطمة علي', country: 'SA', amount: 5199, tax: 779.85, total: 5978.85, status: 'sent', date: '2024-03-16', dueDate: '2024-04-16', format: 'xml' },
  { id: 'INV-AE-2024-001', orderRef: 'ORD-AE-001', customer: 'خالد محمد', country: 'AE', amount: 1323, tax: 66.15, total: 1389.15, status: 'sent', date: '2024-03-14', dueDate: '2024-04-14', format: 'pdf' },
  { id: 'INV-EG-2024-001', orderRef: 'ORD-EG-001', customer: 'أحمد حسن', country: 'EG', amount: 17807, tax: 2492.98, total: 20299.98, status: 'submitted', date: '2024-03-13', dueDate: '2024-04-13', format: 'json' },
  { id: 'INV-EG-2024-002', orderRef: 'ORD-EG-002', customer: 'سارة محمود', country: 'EG', amount: 8694, tax: 1217.16, total: 9911.16, status: 'accepted', date: '2024-03-12', dueDate: '2024-04-12', format: 'json' },
  { id: 'INV-IT-2024-001', orderRef: 'ORD-IT-001', customer: 'Marco Bianchi', country: 'IT', amount: 330.55, tax: 72.72, total: 403.27, status: 'accepted', date: '2024-03-11', dueDate: '2024-04-11', format: 'xml' },
  { id: 'INV-IT-2024-002', orderRef: 'ORD-IT-002', customer: 'Giulia Romano', country: 'IT', amount: 1272.25, tax: 279.90, total: 1552.15, status: 'rejected', date: '2024-03-10', dueDate: '2024-04-10', format: 'xml' },
  { id: 'INV-QA-2024-001', orderRef: 'ORD-QA-001', customer: 'عبدالله حمد', country: 'QA', amount: 1308.53, tax: 0, total: 1308.53, status: 'sent', date: '2024-03-09', dueDate: '2024-04-09', format: 'pdf' },
];

// ============ PRODUCTS ============
export const products: Product[] = [
  { id:1, name:'Brushia 15-Piece Brush Set', nameAr:'طقم فرش براشيا 15 قطعة', nameIt:'Set 15 Pennelli Brushia', cat:'Brush Sets', brand:'Brushia', price:57, old:76, rating:4.9, reviews:3847, badge:'Best Seller', img:'./assets/brushia-15-brush-set.webp', grad:'from-pink-400 to-rose-600', desc:'Premium 15-piece face & eye brush set with rose gold handles in luxury leather case.', descAr:'طقم فرش 15 قطعة للوجه والعيون بمقابض روز جولد في حقيبة جلد فاخرة.', descIt:'Set 15 pennelli viso e occhi con manici in oro rosa in custodia in pelle.', stock:200, specs:['15 Pieces','Rose Gold Handles','Soft Synthetic','Leather Case'], specsAr:['15 قطعة','مقابض روز جولد','شعر صناعي ناعم','حقيبة جلد'], specsIt:['15 Pezzi','Manici Oro Rosa','Sintetico Morbido','Custodia in Pelle'], countryStock:{SA:50,AE:40,QA:20,EG:200,IT:30}, countryPrices:{SA:57,AE:56,QA:55,EG:750,IT:14}, attributes:{pieces:'15',material:'Synthetic',handleColor:'Rose Gold'} },
  { id:2, name:'Brushia 21-Piece Eye Brush Set', nameAr:'طقم فرش عيون براشيا 21 قطعة', nameIt:'Set 21 Pennelli Occhi Brushia', cat:'Brush Sets', brand:'Brushia', price:72, old:95, rating:4.8, reviews:2156, badge:'Pro', img:'./assets/brushia-21-brush-set.webp', grad:'from-purple-400 to-pink-600', desc:'Professional 21-piece eye brush set for flawless blending, shading & detail work.', descAr:'طقم فرش عيون احترافي 21 قطعة للدمج والتظليل والتفاصيل.', descIt:'Set professionale 21 pennelli occhi per sfumatura e dettagli perfetti.', stock:150, specs:['21 Pieces','Eye Specialist','Precision Tips','Travel Pouch'], specsAr:['21 قطعة','متخصص للعيون','رؤوس دقيقة','حقيبة سفر'], specsIt:['21 Pezzi','Specialista Occhi','Punte Precise','Pochette Viaggio'], countryStock:{SA:40,AE:30,QA:15,EG:150,IT:25}, countryPrices:{SA:72,AE:71,QA:70,EG:950,IT:18}, attributes:{pieces:'21',material:'Synthetic',type:'Eye Brushes'} },
  { id:3, name:'Brushia 12-Piece Double Brush Set', nameAr:'طقم فرش براشيا دابل 12 قطعة', nameIt:'Set 12 Pennelli Doppi Brushia', cat:'Brush Sets', brand:'Brushia', price:19, old:30, rating:4.7, reviews:4523, badge:'Value', img:'./assets/brushia-12-brush-set.webp', grad:'from-rose-400 to-fuchsia-600', desc:'Compact 12-piece double-ended brush set — perfect for travel. Two tips per brush!', descAr:'طقم فرش دابل 12 قطعة مدمج — مثالي للسفر. رأسين في كل فرشة!', descIt:'Set compatto 12 pennelli doppi — perfetto per viaggiare. Due punte per pennello!', stock:300, specs:['12 Double-Ended','24 Functions','Compact','Travel Pouch'], specsAr:['12 فرشة دابل','24 وظيفة','مدمج','حقيبة سفر'], specsIt:['12 Doppi','24 Funzioni','Compatto','Pochette Viaggio'], countryStock:{SA:80,AE:60,QA:30,EG:300,IT:40}, countryPrices:{SA:19,AE:19,QA:18,EG:250,IT:5}, attributes:{pieces:'12',type:'Double-Ended',material:'Synthetic'} },
  { id:4, name:'Brushia Signature Eye Brush Set', nameAr:'طقم فرش العيون المميز من براشيا', nameIt:'Set Pennelli Occhi Signature Brushia', cat:'Brush Sets', brand:'Brushia', price:34, old:45, rating:4.9, reviews:5678, badge:'Signature', img:'./assets/brushia-signature-set.webp', grad:'from-amber-400 to-rose-500', desc:'Our #1 best seller! 7 essential eye brushes in a premium magnetic box.', descAr:'الأكثر مبيعاً! 7 فرش عيون أساسية في علبة مغناطيسية فاخرة.', descIt:'Il nostro bestseller! 7 pennelli occhi essenziali in cofanetto magnetico.', stock:250, specs:['7 Pieces','Best Seller','Magnetic Box','Pro Quality'], specsAr:['7 قطع','الأكثر مبيعاً','علبة مغناطيسية','جودة احترافية'], specsIt:['7 Pezzi','Bestseller','Cofanetto Magnetico','Qualità Pro'], countryStock:{SA:60,AE:50,QA:25,EG:250,IT:35}, countryPrices:{SA:34,AE:33,QA:33,EG:450,IT:8}, attributes:{pieces:'7',type:'Eye Essentials',material:'Premium Synthetic'} },
  { id:5, name:'Brushia Eyebrow Brush', nameAr:'فرشة حواجب براشيا', nameIt:'Pennello Sopracciglia Brushia', cat:'Brush Sets', brand:'Brushia', price:9, old:12, rating:4.8, reviews:8934, badge:'Top Rated', img:'./assets/brushia-eyebrow-brush.webp', grad:'from-stone-400 to-stone-600', desc:'The #1 eyebrow brush in Egypt! Angled tip + spoolie for perfect brows every time.', descAr:'فرشة الحواجب رقم 1 في مصر! رأس مائل + فرشة تمشيط لحواجب مثالية.', descIt:'Il pennello sopracciglia #1 in Egitto! Punta angolata + spoolie per sopracciglia perfette.', stock:500, specs:['Angled Tip','Spoolie End','Dual Purpose','Rose Gold'], specsAr:['رأس مائل','فرشة تمشيط','ثنائي الاستخدام','روز جولد'], specsIt:['Punta Angolata','Spoolie','Doppio Uso','Oro Rosa'], countryStock:{SA:100,AE:80,QA:40,EG:500,IT:50}, countryPrices:{SA:9,AE:9,QA:9,EG:120,IT:2}, attributes:{type:'Eyebrow',dualEnded:'Yes'} },
  { id:6, name:'Brushia Foundation Brush', nameAr:'فرشة فاونديشن براشيا', nameIt:'Pennello Fondotinta Brushia', cat:'Brush Sets', brand:'Brushia', price:11, old:15, rating:4.7, reviews:3456, badge:'', img:'./assets/brushia-foundation-brush.webp', grad:'from-rose-300 to-pink-500', desc:'Large fluffy foundation brush for seamless full-coverage application.', descAr:'فرشة فاونديشن كبيرة وناعمة لتغطية كاملة بدون خطوط.', descIt:"Grande pennello fondotinta per un'applicazione uniforme a copertura totale.", stock:400, specs:['Full Coverage','Ultra Soft','Rose Gold Handle','Synthetic'], specsAr:['تغطية كاملة','ناعمة جداً','مقبض روز جولد','شعر صناعي'], specsIt:['Copertura Totale','Ultra Morbido','Manico Oro Rosa','Sintetico'], countryStock:{SA:80,AE:60,QA:30,EG:400,IT:40}, countryPrices:{SA:11,AE:11,QA:11,EG:150,IT:3}, attributes:{type:'Foundation',coverage:'Full'} },
  { id:7, name:'Brushia Glow Highlighter 30ml', nameAr:'جلو براشيا هايلايتر 30 مل', nameIt:'Illuminante Glow Brushia 30ml', cat:'Face', brand:'Brushia', price:27, old:34, rating:4.9, reviews:6789, badge:'Viral', img:'./assets/brushia-glow-highlighter.webp', grad:'from-yellow-300 to-amber-500', desc:'The glow that broke Egypt! Liquid highlighter with golden shimmer for a dewy goddess look.', descAr:'الجلو اللي عامل قلبان في مصر! هايلايتر سائل بلمعة ذهبية لإطلالة إلهية.', descIt:"L'illuminante che ha conquistato l'Egitto! Highlighter liquido con shimmer dorato.", stock:180, specs:['30ml','Golden Shimmer','Dewy Finish','Dropper Bottle'], specsAr:['30 مل','لمعة ذهبية','فينيش ندي','زجاجة بقطّارة'], specsIt:['30ml','Shimmer Dorato','Finish Luminoso','Flacone con Contagocce'], countryStock:{SA:40,AE:35,QA:15,EG:180,IT:25}, countryPrices:{SA:27,AE:26,QA:26,EG:350,IT:7}, attributes:{volume:'30ml',finish:'Dewy',shade:'Golden'} },
  { id:8, name:'Brushia Glow Highlighter Mini 5ml', nameAr:'جلو براشيا ميني 5 مل', nameIt:'Mini Illuminante Glow Brushia 5ml', cat:'Face', brand:'Brushia', price:11, old:15, rating:4.8, reviews:4321, badge:'Mini', img:'./assets/brushia-glow-mini.webp', grad:'from-amber-300 to-yellow-500', desc:'Travel-size version of our viral glow! Perfect to try or carry everywhere.', descAr:'النسخة المصغرة من الجلو الشهير! مثالي للتجربة أو السفر.', descIt:'Versione travel del nostro glow virale! Perfetto da provare o portare ovunque.', stock:350, specs:['5ml','Travel Size','Golden Shimmer','Try Me Size'], specsAr:['5 مل','حجم سفر','لمعة ذهبية','حجم تجربة'], specsIt:['5ml','Travel Size','Shimmer Dorato','Formato Prova'], countryStock:{SA:70,AE:55,QA:30,EG:350,IT:40}, countryPrices:{SA:11,AE:11,QA:11,EG:150,IT:3}, attributes:{volume:'5ml',finish:'Dewy',shade:'Golden'} },
  { id:9, name:'Brushia 3D Mink Lashes', nameAr:'رموش براشيا 3D مينك', nameIt:'Ciglia Finte 3D Mink Brushia', cat:'Lashes', brand:'Brushia', price:8, old:11, rating:4.7, reviews:12456, badge:'Popular', img:'./assets/brushia-3d-lashes.webp', grad:'from-stone-500 to-stone-700', desc:'Natural-dramatic 3D mink lashes. Lightweight, reusable up to 25 times.', descAr:'رموش 3D مينك طبيعية-درامية. خفيفة الوزن، قابلة لإعادة الاستخدام حتى 25 مرة.', descIt:'Ciglia 3D mink naturali-drammatiche. Leggere, riutilizzabili fino a 25 volte.', stock:800, specs:['3D Mink','Reusable 25x','Lightweight','Natural Look'], specsAr:['3D مينك','25 مرة استخدام','خفيفة','مظهر طبيعي'], specsIt:['3D Mink','Riutilizzabili 25x','Leggere','Look Naturale'], countryStock:{SA:150,AE:120,QA:60,EG:800,IT:70}, countryPrices:{SA:8,AE:8,QA:7,EG:100,IT:2}, attributes:{style:'Natural-Dramatic',reusable:'25 times',material:'Mink'} },
  { id:10, name:'Brushia 5D Volume Lashes', nameAr:'رموش براشيا 5D فوليوم', nameIt:'Ciglia Volume 5D Brushia', cat:'Lashes', brand:'Brushia', price:10, old:14, rating:4.8, reviews:8723, badge:'Glam', img:'./assets/brushia-5d-lashes.webp', grad:'from-gray-600 to-gray-800', desc:'Extra-volume 5D lashes for a full glam look. Premium magnetic case included.', descAr:'رموش 5D فوليوم إضافي لإطلالة جلام كاملة. علبة مغناطيسية فاخرة.', descIt:'Ciglia 5D extra volume per un look glam completo. Custodia magnetica inclusa.', stock:600, specs:['5D Volume','Magnetic Case','Extra Fluffy','Dramatic Look'], specsAr:['5D فوليوم','علبة مغناطيسية','كثافة إضافية','مظهر درامي'], specsIt:['Volume 5D','Custodia Magnetica','Extra Fluffy','Look Drammatico'], countryStock:{SA:120,AE:100,QA:50,EG:600,IT:60}, countryPrices:{SA:10,AE:10,QA:10,EG:130,IT:2}, attributes:{style:'Dramatic-Volume',reusable:'20 times',material:'Mink'} },
  { id:11, name:'Brushia Glitter Eyeshadow Palette', nameAr:'باليت جليتر براشيا', nameIt:'Palette Glitter Brushia', cat:'Eyes', brand:'Brushia', price:23, old:30, rating:4.8, reviews:5678, badge:'New', img:'./assets/brushia-glitter-palette.webp', grad:'from-pink-500 to-purple-600', desc:'12-shade shimmer & matte palette in warm tones. Pigmented, blendable, long-lasting.', descAr:'باليت 12 لون شيمر ومات بدرجات دافئة. بيجمنت عالي، سهلة الدمج، تدوم طويلاً.', descIt:'Palette 12 tonalità shimmer e matte in toni caldi. Pigmentata, sfumabile, lunga durata.', stock:250, specs:['12 Shades','Shimmer + Matte','Mirror Included','Long Lasting'], specsAr:['12 لون','شيمر + مات','مرآة مدمجة','تدوم طويلاً'], specsIt:['12 Tonalità','Shimmer + Matte','Specchio Incluso','Lunga Durata'], countryStock:{SA:50,AE:40,QA:20,EG:250,IT:30}, countryPrices:{SA:23,AE:22,QA:22,EG:300,IT:6}, attributes:{shades:'12',type:'Shimmer + Matte',finish:'Warm Tones'} },
  { id:12, name:'Brushia Deep Liner', nameAr:'ديب لاينر براشيا', nameIt:'Deep Liner Brushia', cat:'Eyes', brand:'Brushia', price:9, old:12, rating:4.7, reviews:9876, badge:'', img:'./assets/brushia-deep-liner.webp', grad:'from-gray-700 to-black', desc:'Intense black waterproof kohl eyeliner. Smudge-proof, lasts all day.', descAr:'كحل أسود كثيف مقاوم للماء. لا يتلطخ، يدوم طول اليوم.', descIt:'Eyeliner kohl nero intenso waterproof. Anti-sbavatura, dura tutto il giorno.', stock:600, specs:['Waterproof','Intense Black','Smudge-proof','12hr Wear'], specsAr:['مقاوم للماء','أسود كثيف','لا يتلطخ','يدوم 12 ساعة'], specsIt:['Waterproof','Nero Intenso','Anti-Sbavatura','12 Ore'], countryStock:{SA:120,AE:100,QA:50,EG:600,IT:60}, countryPrices:{SA:9,AE:9,QA:9,EG:120,IT:2}, attributes:{color:'Black',waterproof:'Yes',wearTime:'12 Hours'} },
  { id:13, name:'Brushia Full Coverage Concealer', nameAr:'كونسيلر براشيا فل كفرج', nameIt:'Correttore Full Coverage Brushia', cat:'Face', brand:'Brushia', price:15, old:20, rating:4.7, reviews:4567, badge:'', img:'./assets/brushia-concealer.webp', grad:'from-orange-200 to-rose-300', desc:'Creamy full-coverage concealer with doe-foot applicator. Available in multiple shades.', descAr:'كونسيلر كريمي تغطية كاملة بفرشة ناعمة. متوفر بعدة درجات.', descIt:'Correttore cremoso a copertura totale con applicatore. Disponibile in più tonalità.', stock:350, specs:['Full Coverage','Creamy Formula','Doe-foot','Multi Shades'], specsAr:['تغطية كاملة','تركيبة كريمية','فرشة ناعمة','عدة درجات'], specsIt:['Copertura Totale','Formula Cremosa','Applicatore','Multi Tonalità'], countryStock:{SA:70,AE:55,QA:25,EG:350,IT:35}, countryPrices:{SA:15,AE:15,QA:15,EG:200,IT:4}, attributes:{coverage:'Full',shades:'6',finish:'Natural'} },
  { id:14, name:'Brushia Lip Liner Set', nameAr:'طقم محدد شفاه براشيا', nameIt:'Set Matite Labbra Brushia', cat:'Lips', brand:'Brushia', price:8, old:11, rating:4.6, reviews:3456, badge:'', img:'./assets/brushia-lip-liner.webp', grad:'from-red-400 to-rose-600', desc:'Long-lasting retractable lip liner in 6 gorgeous shades from nude to berry.', descAr:'محدد شفاه يدوم طويلاً بـ 6 درجات رائعة من النيود للتوتي.', descIt:'Matita labbra retrattile lunga durata in 6 splendide tonalità dal nude al berry.', stock:400, specs:['6 Shades','Retractable','Long Lasting','Creamy'], specsAr:['6 درجات','قابل للسحب','يدوم طويلاً','كريمي'], specsIt:['6 Tonalità','Retrattile','Lunga Durata','Cremoso'], countryStock:{SA:80,AE:60,QA:30,EG:400,IT:40}, countryPrices:{SA:8,AE:7,QA:7,EG:100,IT:2}, attributes:{shades:'6',type:'Retractable',finish:'Matte'} },
  { id:15, name:'Brushia Lip Tint Gloss', nameAr:'ليب تنت جلوس براشيا', nameIt:'Lip Tint Gloss Brushia', cat:'Lips', brand:'Brushia', price:9, old:13, rating:4.8, reviews:7654, badge:'Trending', img:'./assets/brushia-lip-tint.webp', grad:'from-pink-400 to-rose-500', desc:'Hydrating lip tint with glossy finish. 3 stunning shades: Rose, Coral & Berry.', descAr:'ليب تنت مرطب بلمعة لامعة. 3 درجات: روز، كورال وتوتي.', descIt:'Lip tint idratante con finish glossy. 3 tonalità: Rosa, Corallo e Berry.', stock:350, specs:['3 Shades','Hydrating','Glossy Finish','Heart Applicator'], specsAr:['3 درجات','مرطب','لمعة لامعة','فرشة قلب'], specsIt:['3 Tonalità','Idratante','Finish Glossy','Applicatore Cuore'], countryStock:{SA:70,AE:55,QA:25,EG:350,IT:35}, countryPrices:{SA:9,AE:9,QA:9,EG:120,IT:2}, attributes:{shades:'3',finish:'Glossy',hydrating:'Yes'} },
  { id:16, name:'Brushia Beauty Blender Set', nameAr:'طقم بيوتي بليندر براشيا', nameIt:'Set Beauty Blender Brushia', cat:'Tools & Accessories', brand:'Brushia', price:11, old:15, rating:4.7, reviews:6543, badge:'', img:'./assets/brushia-beauty-blender.webp', grad:'from-pink-300 to-pink-500', desc:'4-piece beauty sponge set in different shapes for foundation, concealer & powder.', descAr:'طقم 4 إسفنجات تجميل بأشكال مختلفة للفاونديشن والكونسيلر والبودرة.', descIt:'Set 4 spugnette trucco in forme diverse per fondotinta, correttore e cipria.', stock:400, specs:['4 Shapes','Latex-Free','Soft & Bouncy','Multi-Purpose'], specsAr:['4 أشكال','خالي من اللاتكس','ناعم ومرن','متعدد الاستخدام'], specsIt:['4 Forme','Senza Lattice','Morbido ed Elastico','Multi-Uso'], countryStock:{SA:80,AE:60,QA:30,EG:400,IT:40}, countryPrices:{SA:11,AE:11,QA:11,EG:150,IT:3}, attributes:{pieces:'4',material:'Latex-Free Sponge',type:'Multi-Shape'} },
  { id:17, name:'Brushia Makeup Gloves', nameAr:'قفازات مكياج براشيا', nameIt:'Guanti Trucco Brushia', cat:'Tools & Accessories', brand:'Brushia', price:14, old:19, rating:4.6, reviews:2345, badge:'Unique', img:'./assets/brushia-makeup-gloves.webp', grad:'from-rose-300 to-pink-400', desc:'First of its kind in Egypt! Fingerless satin gloves for makeup artists. Grip pads on fingertips.', descAr:'أول منتج من نوعه في مصر! قفازات ساتان بدون أصابع لفنانات المكياج.', descIt:'Primo nel suo genere in Egitto! Guanti in raso senza dita per makeup artist.', stock:150, specs:['Fingerless Satin','Grip Pads','First in Egypt','One Size'], specsAr:['ساتان بدون أصابع','وسادات ثبات','الأول في مصر','مقاس واحد'], specsIt:['Raso Senza Dita','Pad Antiscivolo','Primo in Egitto','Taglia Unica'], countryStock:{SA:30,AE:25,QA:10,EG:150,IT:20}, countryPrices:{SA:14,AE:13,QA:13,EG:180,IT:3}, attributes:{material:'Satin',type:'Fingerless',size:'One Size'} },
  { id:18, name:'Brushia Full Professional Kit', nameAr:'طقم براشيا الاحترافي الكامل', nameIt:'Kit Professionale Completo Brushia', cat:'Brush Sets', brand:'Brushia', price:439, old:530, rating:4.9, reviews:890, badge:'Pro Kit', img:'./assets/brushia-pro-set.webp', grad:'from-rose-600 to-purple-700', desc:'The ultimate makeup artist kit! 30+ brushes, palettes & tools in a premium hard case.', descAr:'الطقم الكامل لفنانات المكياج! 30+ فرشة وباليت وأدوات في حقيبة صلبة فاخرة.', descIt:'Il kit definitivo per makeup artist! 30+ pennelli, palette e strumenti in custodia rigida.', stock:30, specs:['30+ Pieces','Hard Case','Complete Kit','Pro Grade'], specsAr:['30+ قطعة','حقيبة صلبة','طقم كامل','جودة احترافية'], specsIt:['30+ Pezzi','Custodia Rigida','Kit Completo','Qualità Pro'], countryStock:{SA:8,AE:6,QA:3,EG:30,IT:5}, countryPrices:{SA:439,AE:430,QA:426,EG:5800,IT:108}, attributes:{pieces:'30+',type:'Complete Kit',caseType:'Hard Case'} },
  { id:19, name:'Brushia Mix & Fix Setting Spray', nameAr:'مثبت مكياج ميكس اند فيكس براشيا', nameIt:'Spray Fissante Mix & Fix Brushia', cat:'Face', brand:'Brushia', price:19, old:25, rating:4.8, reviews:4320, badge:'New', img:'./assets/mix-fix.webp', grad:'from-blue-400 to-indigo-500', desc:'Multi-use setting spray & mixing medium. Intensifies color, sets makeup for 16 hours.', descAr:'سبراي تثبيت مكياج متعدد الاستخدام. يكثف الألوان ويثبت المكياج 16 ساعة.', descIt:'Spray fissante e medium multi-uso. Intensifica il colore, fissa il trucco per 16 ore.', stock:300, specs:['100ml','16hr Hold','Multi-Use','Mist Nozzle'], specsAr:['100 مل','ثبات 16 ساعة','متعدد الاستخدام','بخاخ رذاذ'], specsIt:['100ml','Tenuta 16 Ore','Multi-Uso','Nebulizzatore'], countryStock:{SA:60,AE:50,QA:25,EG:300,IT:30}, countryPrices:{SA:19,AE:19,QA:19,EG:250,IT:6}, attributes:{size:'100ml',type:'Setting Spray',wearTime:'16 Hours'} },
  { id:20, name:'Brushia HD Foundation', nameAr:'فاونديشن HD براشيا', nameIt:'Fondotinta HD Brushia', cat:'Face', brand:'Brushia', price:30, old:42, rating:4.7, reviews:3210, badge:'', img:'./assets/foundation-hd.webp', grad:'from-amber-300 to-orange-400', desc:'Medium to full coverage HD foundation with natural finish. Buildable, lightweight formula.', descAr:'فاونديشن HD تغطية متوسطة لكاملة بلمسة طبيعية. تركيبة خفيفة قابلة للبناء.', descIt:'Fondotinta HD copertura medio-alta con finish naturale. Formula leggera e costruibile.', stock:250, specs:['30ml','HD Finish','Medium-Full Coverage','6 Shades'], specsAr:['30 مل','لمسة HD','تغطية متوسطة-كاملة','6 درجات'], specsIt:['30ml','Finish HD','Copertura Medio-Alta','6 Tonalità'], countryStock:{SA:50,AE:40,QA:20,EG:250,IT:30}, countryPrices:{SA:30,AE:30,QA:30,EG:400,IT:10}, attributes:{coverage:'Medium-Full',shades:'6',finish:'Natural HD',size:'30ml'} },
  { id:21, name:'Brushia Compact Powder', nameAr:'بودرة مضغوطة براشيا', nameIt:'Cipria Compatta Brushia', cat:'Face', brand:'Brushia', price:42, old:55, rating:4.6, reviews:2890, badge:'', img:'./assets/compact-powder.webp', grad:'from-yellow-200 to-amber-300', desc:'Silky-smooth pressed powder for a flawless matte finish. Oil control up to 10 hours.', descAr:'بودرة مضغوطة ناعمة كالحرير لإنهاء مات مثالي. تتحكم في الزيوت حتى 10 ساعات.', descIt:'Cipria compatta setosa per un finish matte impeccabile. Controllo sebo fino a 10 ore.', stock:200, specs:['10g','Matte Finish','Oil Control 10hr','Mirror + Puff'], specsAr:['10 جرام','لمسة مات','تحكم بالزيوت 10 ساعات','مرآة + باف'], specsIt:['10g','Finish Matte','Controllo Sebo 10 Ore','Specchio + Piumino'], countryStock:{SA:40,AE:35,QA:15,EG:200,IT:25}, countryPrices:{SA:42,AE:41,QA:41,EG:550,IT:13}, attributes:{size:'10g',finish:'Matte',type:'Pressed Powder',oilControl:'10 Hours'} },
  { id:22, name:'Brushia Halo Glow Filter', nameAr:'فلتر هالو جلو براشيا', nameIt:'Filtro Halo Glow Brushia', cat:'Face', brand:'Brushia', price:27, old:35, rating:4.9, reviews:5430, badge:'Best Seller', img:'./assets/halo-glow.webp', grad:'from-yellow-300 to-pink-300', desc:'Liquid illuminating filter for a dewy glass-skin glow. Mix with foundation or wear alone.', descAr:'فلتر سائل مضيء لبشرة ندية كالزجاج. يمزج مع الفاونديشن أو يستخدم لوحده.', descIt:'Filtro illuminante liquido per un effetto glass-skin luminoso. Da solo o con fondotinta.', stock:280, specs:['30ml','Glass Skin','Buildable Glow','All Skin Types'], specsAr:['30 مل','بشرة زجاجية','إضاءة قابلة للبناء','لجميع أنواع البشرة'], specsIt:['30ml','Glass Skin','Luminosità Costruibile','Tutti i Tipi di Pelle'], countryStock:{SA:55,AE:45,QA:20,EG:280,IT:30}, countryPrices:{SA:27,AE:26,QA:26,EG:350,IT:8}, attributes:{size:'30ml',type:'Illuminating Filter',finish:'Dewy Glass Skin'} },
  { id:23, name:'Brushia Fox Mink Lash Book', nameAr:'لاش بوك فوكس مينك براشيا', nameIt:'Lash Book Fox Mink Brushia', cat:'Lashes', brand:'Brushia', price:27, old:42, rating:4.8, reviews:3670, badge:'Value Pack', img:'./assets/lash-book.webp', grad:'from-stone-500 to-stone-700', desc:'Premium lash book with 14 pairs of fox mink lashes in different styles. Your daily lash wardrobe!', descAr:'لاش بوك فاخر 14 زوج رموش فوكس مينك بستايلات مختلفة. خزانة رموشك اليومية!', descIt:'Lash book premium con 14 paia di ciglia fox mink in stili diversi. Il tuo guardaroba ciglia!', stock:150, specs:['14 Pairs','Fox Mink','Book Format','Mixed Styles'], specsAr:['14 زوج','فوكس مينك','شكل كتاب','ستايلات متنوعة'], specsIt:['14 Paia','Fox Mink','Formato Libro','Stili Misti'], countryStock:{SA:30,AE:25,QA:12,EG:150,IT:15}, countryPrices:{SA:27,AE:26,QA:26,EG:350,IT:8}, attributes:{pairs:'14',material:'Fox Mink',format:'Book',styles:'Mixed'} },
  { id:24, name:'Brushia Soft Dust Eyeshadow Palette', nameAr:'باليت آيشادو سوفت داست براشيا', nameIt:'Palette Ombretti Soft Dust Brushia', cat:'Eyes', brand:'Brushia', price:30, old:40, rating:4.8, reviews:4120, badge:'', img:'./assets/eyeshadow-palette.webp', grad:'from-rose-500 to-mauve-600', desc:'18-shade versatile palette with matte, shimmer & glitter finishes. Nude to bold shades.', descAr:'باليت 18 لون متنوعة بلمسات مات وشيمر وجليتر. من النيود للجريء.', descIt:'Palette versatile 18 tonalità matte, shimmer e glitter. Dai nude ai toni audaci.', stock:180, specs:['18 Shades','Matte+Shimmer+Glitter','Large Mirror','Blendable'], specsAr:['18 لون','مات+شيمر+جليتر','مرآة كبيرة','سهلة الدمج'], specsIt:['18 Tonalità','Matte+Shimmer+Glitter','Grande Specchio','Sfumabile'], countryStock:{SA:35,AE:30,QA:15,EG:180,IT:20}, countryPrices:{SA:30,AE:30,QA:30,EG:400,IT:10}, attributes:{shades:'18',type:'Matte + Shimmer + Glitter',finish:'Mixed'} },
  { id:25, name:'Brushia Charming Lipstick', nameAr:'ليب ستيك تشارمينج براشيا', nameIt:'Rossetto Charming Brushia', cat:'Lips', brand:'Brushia', price:14, old:19, rating:4.7, reviews:6780, badge:'Trending', img:'./assets/lipstick.webp', grad:'from-red-500 to-rose-600', desc:'Rich, creamy lipstick in the iconic Charming Red shade. Long-wearing satin finish.', descAr:'ليب ستيك غني وكريمي بدرجة الأحمر المميزة تشارمينج. ثبات طويل ولمسة ساتان.', descIt:'Rossetto ricco e cremoso nella iconica tonalità Charming Red. Lunga tenuta finish satinato.', stock:320, specs:['Satin Finish','Long Wearing','Creamy Formula','Iconic Red'], specsAr:['لمسة ساتان','ثبات طويل','تركيبة كريمية','أحمر مميز'], specsIt:['Finish Satinato','Lunga Tenuta','Formula Cremosa','Rosso Iconico'], countryStock:{SA:65,AE:50,QA:25,EG:320,IT:35}, countryPrices:{SA:14,AE:13,QA:13,EG:180,IT:4}, attributes:{shade:'Charming Red',finish:'Satin',type:'Bullet Lipstick'} },

  // === Al Jazeera Perfumes (24 products) ===
  { id:26, name:'Magic Barcelona', nameAr:'ماجيك برشلونة', nameIt:'Magic Barcellona', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.7, reviews:1200, badge:'Best Seller', img:'./assets/perfume-magic-barcelona.webp', grad:'from-purple-400 to-violet-600', desc:'Luxurious Mediterranean fragrance with citrus and warm spice notes.', descAr:'عطر فاخر بنفحات البحر الأبيض المتوسط مع مزيج من الحمضيات والتوابل الدافئة.', descIt:'Profumo lussuoso con note mediterranee, agrumi e spezie calde.', stock:100, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:30,AE:25,QA:15,EG:100,IT:10}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:27, name:'Magic Paris', nameAr:'ماجيك باريس', nameIt:'Magic Parigi', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.8, reviews:1350, badge:'', img:'./assets/perfume-magic-paris.webp', grad:'from-purple-400 to-violet-600', desc:'Elegant Paris-inspired fragrance with rose and vanilla notes.', descAr:'عطر أنيق مستوحى من أناقة باريس مع نفحات الورد والفانيليا.', descIt:'Elegante fragranza ispirata a Parigi con rose e vaniglia.', stock:105, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:31,AE:26,QA:16,EG:105,IT:11}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:28, name:'Spring Oud', nameAr:'سبرنج عود', nameIt:'Spring Oud', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:150, old:180, rating:4.9, reviews:1500, badge:'Premium', img:'./assets/perfume-spring-oud.webp', grad:'from-purple-400 to-violet-600', desc:'Unique spring oud combining premium oud with fresh spring florals.', descAr:'عطر عود ربيعي فريد يجمع بين العود الفاخر ونضارة الأزهار الربيعية.', descIt:'Fragranza unica di oud primaverile con fiori freschi.', stock:110, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:32,AE:27,QA:17,EG:110,IT:12}, countryPrices:{SA:600,AE:590,QA:600,EG:7800,IT:150}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:29, name:'FIFA Elite', nameAr:'فيفا إليت', nameIt:'FIFA Elite', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.7, reviews:1650, badge:'', img:'./assets/perfume-fifa-elite.webp', grad:'from-purple-400 to-violet-600', desc:'Premium sports fragrance from the FIFA collection with fresh energetic notes.', descAr:'عطر رياضي فاخر من مجموعة فيفا بنفحات منعشة وحيوية.', descIt:'Fragranza sportiva di lusso dalla collezione FIFA.', stock:115, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:33,AE:28,QA:18,EG:115,IT:13}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:30, name:'FIFA Canada', nameAr:'فيفا كندا', nameIt:'FIFA Canada', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.8, reviews:1800, badge:'', img:'./assets/perfume-fifa-canada.webp', grad:'from-purple-400 to-violet-600', desc:'Fresh fragrance inspired by Canadian nature with woody amber notes.', descAr:'عطر منعش مستوحى من الطبيعة الكندية مع نفحات خشبية وعنبرية.', descIt:'Fragranza fresca ispirata alla natura canadese con note legnose.', stock:120, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:34,AE:29,QA:19,EG:120,IT:14}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:31, name:'FIFA USA', nameAr:'فيفا يو اس ايه', nameIt:'FIFA USA', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.9, reviews:1950, badge:'', img:'./assets/perfume-fifa-usa.webp', grad:'from-purple-400 to-violet-600', desc:'Bold dynamic fragrance inspired by American spirit with citrus musk notes.', descAr:'عطر جريء وديناميكي مستوحى من روح أمريكا بنفحات حمضية ومسكية.', descIt:'Fragranza audace ispirata allo spirito americano.', stock:125, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:35,AE:30,QA:20,EG:125,IT:15}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:32, name:'FIFA Mexico', nameAr:'فيفا مكسيكو', nameIt:'FIFA Messico', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.7, reviews:2100, badge:'', img:'./assets/perfume-fifa-mexico.webp', grad:'from-purple-400 to-violet-600', desc:'Warm vibrant fragrance inspired by Mexico with spice and vanilla notes.', descAr:'عطر دافئ وحيوي مستوحى من المكسيك بنفحات التوابل والفانيليا.', descIt:'Fragranza calda ispirata al Messico con spezie e vaniglia.', stock:130, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:36,AE:31,QA:21,EG:130,IT:16}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:33, name:'Onyx', nameAr:'أونيكس', nameIt:'Onice', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.8, reviews:2250, badge:'', img:'./assets/perfume-onyx.webp', grad:'from-purple-400 to-violet-600', desc:'Mysterious alluring fragrance with dark oud, amber and black musk.', descAr:'عطر غامض وجذاب بنفحات العود الداكن والعنبر والمسك الأسود.', descIt:'Fragranza misteriosa con oud scuro, ambra e muschio nero.', stock:135, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:37,AE:32,QA:22,EG:135,IT:17}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:34, name:'Malachite', nameAr:'مالاكيت', nameIt:'Malachite', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.9, reviews:2400, badge:'', img:'./assets/perfume-malachite.webp', grad:'from-purple-400 to-violet-600', desc:'Elegant malachite-inspired fragrance with green and woody premium notes.', descAr:'عطر أنيق مستوحى من حجر الملاكيت بنفحات خضراء وخشبية فاخرة.', descIt:'Elegante fragranza ispirata alla malachite con note verdi e legnose.', stock:140, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:38,AE:33,QA:23,EG:140,IT:18}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:35, name:'Magic', nameAr:'ماجيك', nameIt:'Magic', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.7, reviews:2550, badge:'Exclusive', img:'./assets/perfume-magic.webp', grad:'from-purple-400 to-violet-600', desc:'Enchanting fragrance captivating the senses with oriental florals and royal oud.', descAr:'عطر ساحر يأسر الحواس بمزيج من الأزهار الشرقية والعود الملكي.', descIt:'Fragranza incantevole con fiori orientali e oud reale.', stock:145, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:39,AE:34,QA:24,EG:145,IT:19}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:36, name:'Damascus', nameAr:'دمشق', nameIt:'Damasco', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.8, reviews:2700, badge:'', img:'./assets/perfume-damascus.webp', grad:'from-purple-400 to-violet-600', desc:'Classic fragrance inspired by famous Damascus rose with deep floral notes.', descAr:'عطر كلاسيكي مستوحى من ورد دمشق الشهير بنفحات وردية عميقة.', descIt:'Fragranza classica ispirata alla rosa di Damasco.', stock:150, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:40,AE:35,QA:25,EG:150,IT:20}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:37, name:'Palace', nameAr:'بالاس', nameIt:'Palace', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.9, reviews:2850, badge:'', img:'./assets/perfume-palace.webp', grad:'from-purple-400 to-violet-600', desc:'Royal luxurious fragrance with oud, incense and amber reflecting palace grandeur.', descAr:'عطر ملكي فاخر بنفحات العود والبخور والعنبر، يعكس فخامة القصور.', descIt:'Fragranza reale con oud, incenso e ambra dal lusso dei palazzi.', stock:155, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:41,AE:36,QA:26,EG:155,IT:21}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:38, name:'Granada', nameAr:'غرناطة', nameIt:'Granada', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.7, reviews:3000, badge:'', img:'./assets/perfume-granada.webp', grad:'from-purple-400 to-violet-600', desc:'Fragrance inspired by historic Granada with oriental Andalusian notes.', descAr:'عطر مستوحى من تاريخ غرناطة العريق بنفحات شرقية وأندلسية.', descIt:'Fragranza ispirata alla storica Granada con note orientali e andaluse.', stock:160, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:42,AE:37,QA:27,EG:160,IT:22}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:39, name:'Venice', nameAr:'فينيس', nameIt:'Venezia', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.8, reviews:3150, badge:'', img:'./assets/perfume-venice.webp', grad:'from-purple-400 to-violet-600', desc:'Romantic Italian fragrance inspired by Venice charm with aquatic floral notes.', descAr:'عطر إيطالي رومانسي مستوحى من سحر فينيسيا بنفحات مائية وزهرية.', descIt:'Romantica fragranza ispirata al fascino di Venezia con note acquatiche e floreali.', stock:165, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:43,AE:38,QA:28,EG:165,IT:23}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:40, name:'97 Elysees', nameAr:'97 إليزيه', nameIt:'97 Élysées', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.9, reviews:3300, badge:'', img:'./assets/perfume-97-elysees.webp', grad:'from-purple-400 to-violet-600', desc:'Luxurious Parisian fragrance inspired by the Champs-Élysées.', descAr:'عطر باريسي فاخر مستوحى من شارع الشانزليزيه بنفحات راقية.', descIt:'Lussuosa fragranza parigina ispirata agli Champs-Élysées.', stock:170, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:44,AE:39,QA:29,EG:170,IT:24}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:41, name:'555', nameAr:'555', nameIt:'555', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.7, reviews:3450, badge:'', img:'./assets/perfume-555.webp', grad:'from-purple-400 to-violet-600', desc:'Distinctive fragrance combining power and elegance with oud and amber notes.', descAr:'عطر مميز برقم مميز، يجمع بين القوة والأناقة بنفحات عودية وعنبرية.', descIt:'Fragranza distintiva che unisce forza ed eleganza con oud e ambra.', stock:175, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:45,AE:40,QA:30,EG:175,IT:25}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:42, name:'18K', nameAr:'18 قيراط', nameIt:'18K', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.8, reviews:3600, badge:'', img:'./assets/perfume-18-k.webp', grad:'from-purple-400 to-violet-600', desc:'Luxurious as 18K gold with warm metallic premium notes.', descAr:'عطر فاخر كالذهب عيار 18 قيراط، بنفحات دافئة ومعدنية راقية.', descIt:'Fragranza lussuosa come loro 18K con note calde e metalliche.', stock:180, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:46,AE:41,QA:31,EG:180,IT:26}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:43, name:'Elegant', nameAr:'إليجانت', nameIt:'Elegant', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.9, reviews:3750, badge:'', img:'./assets/perfume-elegant.webp', grad:'from-purple-400 to-violet-600', desc:'Quintessentially elegant fragrance reflecting refined taste with woody musk notes.', descAr:'عطر أنيق بامتياز، يعكس الذوق الرفيع بنفحات خشبية ومسكية.', descIt:'Fragranza elegante per eccellenza con note legnose e muschiate.', stock:185, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:47,AE:42,QA:32,EG:185,IT:27}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:44, name:'Style', nameAr:'ستايل', nameIt:'Style', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.7, reviews:3900, badge:'', img:'./assets/perfume-style.webp', grad:'from-purple-400 to-violet-600', desc:'Modern fragrance reflecting distinctive style with fresh citrus floral notes.', descAr:'عطر عصري يعكس الأسلوب المميز بنفحات حمضية وزهرية منعشة.', descIt:'Fragranza moderna che riflette uno stile distintivo con note agrumate e floreali.', stock:190, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:48,AE:43,QA:33,EG:190,IT:28}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:45, name:'Capri', nameAr:'كابري', nameIt:'Capri', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.8, reviews:4050, badge:'', img:'./assets/perfume-capri.webp', grad:'from-purple-400 to-violet-600', desc:'Italian fragrance inspired by Capri island with marine Mediterranean citrus notes.', descAr:'عطر إيطالي مستوحى من جزيرة كابري بنفحات بحرية وحمضيات متوسطية.', descIt:'Fragranza italiana ispirata all isola di Capri con note marine e agrumi.', stock:195, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:49,AE:44,QA:34,EG:195,IT:29}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:46, name:'Al Bairaq Set', nameAr:'طقم البيرق', nameIt:'Set Al Bairaq', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.9, reviews:4200, badge:'Gift Set', img:'./assets/perfume-al-bairaq-set.webp', grad:'from-purple-400 to-violet-600', desc:'Premium Al Bairaq perfume set, complete collection of finest fragrances.', descAr:'طقم عطور البيرق الفاخر، مجموعة متكاملة من أرقى العطور.', descIt:'Set di profumi Al Bairaq di lusso, collezione completa di fragranze pregiate.', stock:200, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:50,AE:45,QA:35,EG:200,IT:30}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:47, name:'Al Rayyan Set', nameAr:'طقم الريان', nameIt:'Set Al Rayyan', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.7, reviews:4350, badge:'Gift Set', img:'./assets/perfume-al-rayyan-set.webp', grad:'from-purple-400 to-violet-600', desc:'Al Rayyan perfume set, luxury collection for every occasion.', descAr:'طقم عطور الريان، مجموعة فاخرة تناسب جميع المناسبات.', descIt:'Set di profumi Al Rayyan, collezione di lusso per ogni occasione.', stock:205, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:51,AE:46,QA:36,EG:205,IT:31}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:48, name:'Smoky Amber', nameAr:'سموكي عنبر', nameIt:'Smoky Amber', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.8, reviews:4500, badge:'', img:'./assets/perfume-smoky-amber.webp', grad:'from-purple-400 to-violet-600', desc:'Warm rich fragrance with smoky amber and oriental incense notes.', descAr:'عطر دافئ وغني بنفحات العنبر المدخن والبخور الشرقي.', descIt:'Fragranza calda e ricca con ambra affumicata e incenso orientale.', stock:210, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:52,AE:47,QA:37,EG:210,IT:32}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
  { id:49, name:'Jade', nameAr:'جيد', nameIt:'Giada', cat:'Al Jazeera Perfumes', brand:'Al Jazeera', price:125, old:155, rating:4.9, reviews:4650, badge:'', img:'./assets/perfume-jade.webp', grad:'from-purple-400 to-violet-600', desc:'Serene refined fragrance inspired by jade stone with calming green notes.', descAr:'عطر هادئ وراقي مستوحى من حجر اليشم بنفحات خضراء مهدئة.', descIt:'Fragranza serena ispirata alla giada con note verdi rilassanti.', stock:215, specs:['50ml','EDP','Long Lasting','Unisex'], specsAr:['50 مل','او دو بارفان','يدوم طويلاً','للجنسين'], specsIt:['50ml','EDP','Lunga Durata','Unisex'], countryStock:{SA:53,AE:48,QA:38,EG:215,IT:33}, countryPrices:{SA:500,AE:490,QA:500,EG:6500,IT:125}, attributes:{type:'EDP',size:'50ml',concentration:'Eau de Parfum',gender:'Unisex'} },
];

// ============ BLOG POSTS ============
export const blogPosts: BlogPost[] = [
  { id:1, title:'Top 10 Tech Gadgets for 2024', titleAr:'أفضل 10 أجهزة تقنية في 2024', titleIt:'I 10 Migliori Gadget Tech del 2024', excerpt:'Discover the must-have gadgets that are defining this year.', excerptAr:'اكتشف الأجهزة الضرورية التي تعرّف هذا العام.', excerptIt:'Scopri i gadget imperdibili che stanno definendo quest\'anno.', category:'Technology', author:'Ahmed K.', date:'Mar 15, 2024', readTime:'8 min', img:'./assets/macbook.jpg', featured:true },
  { id:2, title:'The Art of Luxury Perfumes', titleAr:'فن العطور الفاخرة', titleIt:'L\'Arte dei Profumi di Lusso', excerpt:'Understanding notes, longevity, and choosing your signature scent.', excerptAr:'فهم المكونات، الثبات، واختيار عطرك المميز.', excerptIt:'Capire le note, la longevità e scegliere la tua fragranza.', category:'Lifestyle', author:'Sara M.', date:'Mar 12, 2024', readTime:'6 min', img:'./assets/perfume.jpg' },
  { id:3, title:'Summer Fashion Trends Guide', titleAr:'دليل صيحات الموضة الصيفية', titleIt:'Guida alle Tendenze Moda Estive', excerpt:'From minimalist chic to bold statements — what to wear this season.', excerptAr:'من الأناقة البسيطة إلى الجرأة — ماذا ترتدي هذا الموسم.', excerptIt:'Dal minimalismo chic al bold — cosa indossare questa stagione.', category:'Fashion', author:'Lina A.', date:'Mar 10, 2024', readTime:'5 min', img:'./assets/overcoat.jpg' },
  { id:4, title:'Apple iPhone 16 Pro Max Review', titleAr:'مراجعة آيفون 16 برو ماكس', titleIt:'Recensione iPhone 16 Pro Max', excerpt:'Is it worth the upgrade? We test camera, battery, and performance.', excerptAr:'هل يستحق الترقية؟ نختبر الكاميرا والبطارية والأداء.', excerptIt:'Vale l\'aggiornamento? Testiamo fotocamera, batteria e prestazioni.', category:'Technology', author:'Omar H.', date:'Mar 8, 2024', readTime:'10 min', img:'./assets/iphone.jpg' },
  { id:5, title:'Skincare Routine Essentials', titleAr:'أساسيات العناية بالبشرة', titleIt:'Essenziali per la Routine Skincare', excerpt:'Build the perfect skincare routine with expert-approved products.', excerptAr:'ابنِ روتين العناية المثالي بمنتجات موصى بها من الخبراء.', excerptIt:'Costruisci la routine skincare perfetta con prodotti approvati.', category:'Beauty', author:'Noor R.', date:'Mar 5, 2024', readTime:'7 min', img:'./assets/serum.jpg' },
  { id:6, title:'Best Wireless Audio 2024', titleAr:'أفضل صوتيات لاسلكية 2024', titleIt:'Il Miglior Audio Wireless 2024', excerpt:'Headphones and speakers that deliver premium sound quality.', excerptAr:'سماعات ومكبرات صوت تقدم جودة صوت متميزة.', excerptIt:'Cuffie e speaker che offrono qualità audio premium.', category:'Technology', author:'Faisal T.', date:'Mar 3, 2024', readTime:'6 min', img:'./assets/headphones.jpg' },
];

// ============ ORDERS ============
export const orders: Order[] = [
  { id:'ORD-SA-2024-001', customer:'محمد أحمد', amount: 1551.35, status:'delivered', date:'2024-03-15', items:2, country:'SA' },
  { id:'ORD-SA-2024-002', customer:'فاطمة علي', amount: 5978.85, status:'shipped', date:'2024-03-16', items:1, country:'SA' },
  { id:'ORD-AE-2024-001', customer:'خالد محمد', amount: 1389.15, status:'shipped', date:'2024-03-14', items:3, country:'AE' },
  { id:'ORD-EG-2024-001', customer:'أحمد حسن', amount: 20299.98, status:'pending', date:'2024-03-13', items:2, country:'EG' },
  { id:'ORD-EG-2024-002', customer:'سارة محمود', amount: 9911.16, status:'delivered', date:'2024-03-12', items:4, country:'EG' },
  { id:'ORD-IT-2024-001', customer:'Marco Bianchi', amount: 403.27, status:'delivered', date:'2024-03-11', items:1, country:'IT' },
  { id:'ORD-IT-2024-002', customer:'Giulia Romano', amount: 1552.15, status:'shipped', date:'2024-03-10', items:2, country:'IT' },
  { id:'ORD-QA-2024-001', customer:'عبدالله حمد', amount: 1308.53, status:'pending', date:'2024-03-09', items:1, country:'QA' },
];

// ============ FEATURE FLAGS ============
export const featureFlags: FeatureFlag[] = [
  { id:'ff_reviews', name:'Product Reviews', category:'Products', enabled:true, description:'Customer reviews & ratings' },
  { id:'ff_wishlist', name:'Wishlist', category:'Products', enabled:true, description:'Save favorite products' },
  { id:'ff_compare', name:'Product Compare', category:'Products', enabled:true, description:'Compare up to 4 products' },
  { id:'ff_quick_view', name:'Quick View', category:'Products', enabled:true, description:'Preview product in modal' },
  { id:'ff_recently', name:'Recently Viewed', category:'Products', enabled:true, description:'Track recently viewed products' },
  { id:'ff_blog', name:'Blog', category:'Content', enabled:true, description:'Blog and articles' },
  { id:'ff_gift_cards', name:'Gift Cards', category:'Payments', enabled:true, description:'Digital gift cards' },
  { id:'ff_loyalty', name:'Loyalty Program', category:'Marketing', enabled:true, description:'Points and rewards' },
  { id:'ff_newsletter', name:'Newsletter', category:'Marketing', enabled:true, description:'Email subscription' },
  { id:'ff_flash_sale', name:'Flash Sales', category:'Marketing', enabled:false, description:'Time-limited offers' },
  { id:'ff_whatsapp', name:'WhatsApp Chat', category:'Support', enabled:true, description:'WhatsApp floating button' },
  { id:'ff_cookies', name:'Cookie Consent', category:'Legal', enabled:true, description:'Cookie consent banner' },
  { id:'ff_maintenance', name:'Maintenance Mode', category:'System', enabled:false, description:'Show maintenance page' },
  { id:'ff_multi_country', name:'Multi-Country', category:'System', enabled:true, description:'Multi-country support' },
  { id:'ff_multi_lang', name:'Multi-Language', category:'System', enabled:true, description:'Multi-language support' },
  { id:'ff_invoicing', name:'E-Invoicing', category:'Finance', enabled:true, description:'Electronic invoicing system' },
  { id:'ff_dynamic_tax', name:'Dynamic Tax', category:'Finance', enabled:true, description:'Dynamic tax per country' },
  { id:'ff_cod', name:'Cash on Delivery', category:'Payments', enabled:true, description:'COD payment method' },
  { id:'ff_installments', name:'Installments', category:'Payments', enabled:true, description:'Buy now pay later' },
  { id:'ff_guest_checkout', name:'Guest Checkout', category:'Checkout', enabled:true, description:'Checkout without account' },
  { id:'ff_track_order', name:'Order Tracking', category:'Orders', enabled:true, description:'Public order tracking' },
  { id:'ff_returns', name:'Returns & Refunds', category:'Orders', enabled:true, description:'Online return requests' },
  { id:'ff_multi_db', name:'Multi-Database', category:'System', enabled:true, description:'Separate DB per country' },
  { id:'ff_faq_page', name:'FAQ Page', category:'Pages', enabled:true, description:'Frequently Asked Questions page' },
  { id:'ff_shipping_page', name:'Shipping Info Page', category:'Pages', enabled:true, description:'Shipping information page' },
  { id:'ff_returns_page', name:'Returns Policy Page', category:'Pages', enabled:true, description:'Returns and exchanges policy page' },
  { id:'ff_size_guide', name:'Size Guide Page', category:'Pages', enabled:true, description:'Size guide with measurement charts' },
  { id:'ff_contact_page', name:'Contact Us Page', category:'Pages', enabled:true, description:'Contact form and information' },
  // ===== NEW: Sports Direct inspired features =====
  { id:'ff_promo_ticker', name:'Promo Ticker Bar', category:'Marketing', enabled:false, description:'Rotating promotional messages at top of page' },
  { id:'ff_breadcrumbs', name:'Breadcrumbs', category:'Navigation', enabled:true, description:'Navigation trail on all pages' },
  { id:'ff_strikethrough', name:'Strikethrough Pricing', category:'Products', enabled:false, description:'Show original price crossed out next to sale price' },
  { id:'ff_discount_badge', name:'Discount Badge', category:'Products', enabled:false, description:'Show discount percentage badge on product images' },
  { id:'ff_sizes_on_card', name:'Sizes on Cards', category:'Products', enabled:true, description:'Show available sizes on product cards' },
  { id:'ff_sort_options', name:'Advanced Sort', category:'Products', enabled:true, description:'Multiple sort options: price, newest, discount, rating' },
  { id:'ff_category_chips', name:'Category Quick Chips', category:'Navigation', enabled:true, description:'Horizontal scrollable category tags' },
  { id:'ff_recently_viewed', name:'Recently Viewed', category:'Products', enabled:true, description:'Show recently viewed products carousel' },
  { id:'ff_recommended', name:'Recommended Products', category:'Products', enabled:true, description:'Related products on product detail page' },
  { id:'ff_product_count', name:'Product Count', category:'Products', enabled:true, description:'Show total product count on shop page' },
  { id:'ff_social_links', name:'Social Media Links', category:'Marketing', enabled:true, description:'Social media links in footer' },
  { id:'ff_payment_icons', name:'Payment Icons', category:'Payments', enabled:true, description:'Payment method icons in footer' },
  { id:'ff_delivery_accordion', name:'Delivery Accordion', category:'Products', enabled:true, description:'Expandable delivery & returns info on product page' },
  { id:'ff_brand_on_card', name:'Brand on Cards', category:'Products', enabled:true, description:'Show brand name on product cards' },
  { id:'ff_bnpl_banner', name:'Buy Now Pay Later', category:'Marketing', enabled:true, description:'BNPL promotional banner on homepage' },
  { id:'ff_category_nav', name:'Category Navigation Bar', category:'Navigation', enabled:true, description:'Category links bar below main navigation' },
  { id:'ff_show_price', name:'Show Product Price', category:'Products', enabled:true, description:'Show/hide product prices on cards and detail page' },
  { id:'ff_product_badges', name:'Product Badges', category:'Products', enabled:true, description:'Show product badges (Best Seller, New, Premium, etc.)' },
  { id:'ff_best_seller_badge', name:'Best Seller Badge', category:'Products', enabled:true, description:'Highlight best seller products with special badge' },
  { id:'ff_product_stock', name:'Show Stock Level', category:'Products', enabled:true, description:'Show stock availability on product pages' },
  { id:'ff_product_management', name:'Product Management', category:'Admin', enabled:true, description:'Enable product CRUD from admin dashboard' },
  { id:'ff_category_management', name:'Category Management', category:'Admin', enabled:true, description:'Enable category management from admin dashboard' },
  { id:'ff_hero_banner', name:'Hero Banner', category:'UI', enabled:true, description:'Show hero/flash sale banner on homepage' },
  // ===== NEW: BiOrganic-inspired features =====
  { id:'ff_buy_now', name:'Buy Now Button', category:'Products', enabled:true, description:'Direct purchase button skipping cart' },
  { id:'ff_sticky_cart', name:'Sticky Add to Cart', category:'Products', enabled:true, description:'Fixed bottom bar on product detail page' },
  { id:'ff_share_tools', name:'Product Share Tools', category:'Products', enabled:true, description:'Share product via link, WhatsApp, social media' },
  { id:'ff_app_banner', name:'App Download Banner', category:'Marketing', enabled:true, description:'Promotional banner to download mobile app' },
  { id:'ff_loyalty_widget', name:'Loyalty Widget', category:'Marketing', enabled:true, description:'Floating loyalty points widget' },
  { id:'ff_referral', name:'Referral Program', category:'Marketing', enabled:true, description:'Invite friends and earn rewards' },
  { id:'ff_engagement_banners', name:'Engagement Banners', category:'Marketing', enabled:true, description:'Loyalty, Gift Cards, Spin & Win cards' },
  { id:'ff_brand_carousel', name:'Brand Carousel', category:'UI', enabled:true, description:'Auto-scrolling brand logos strip' },
];

// ============ PROMO MESSAGES (Admin-controlled) ============
export const promoMessages: PromoMessage[] = [
  { id: 'promo_1', textKey: 'promo.freeShipping', emoji: '🚚', enabled: true },
  { id: 'promo_2', textKey: 'promo.newArrivals', emoji: '✨', enabled: true },
  { id: 'promo_3', textKey: 'promo.bnpl', emoji: '💳', enabled: true },
  { id: 'promo_4', textKey: 'promo.loyalty', emoji: '🏆', enabled: true },
  { id: 'promo_5', textKey: 'promo.flashSale', emoji: '⚡', enabled: true },
];

// ============ SOCIAL LINKS (Admin-controlled) ============
export const socialLinks: SocialLink[] = [
  { id: 'social_ig', platform: 'Instagram', url: 'https://instagram.com/nefra', icon: 'instagram', enabled: true },
  { id: 'social_tw', platform: 'Twitter/X', url: 'https://x.com/nefra', icon: 'twitter', enabled: true },
  { id: 'social_fb', platform: 'Facebook', url: 'https://facebook.com/nefra', icon: 'facebook', enabled: true },
  { id: 'social_yt', platform: 'YouTube', url: 'https://youtube.com/nefra', icon: 'youtube', enabled: false },
  { id: 'social_tk', platform: 'TikTok', url: 'https://tiktok.com/@nefra', icon: 'tiktok', enabled: true },
  { id: 'social_sc', platform: 'Snapchat', url: 'https://snapchat.com/add/nefra', icon: 'snapchat', enabled: true },
];

// ============ TESTIMONIALS (Admin-controlled) ============
export const defaultTestimonials: Testimonial[] = [
  { id: 't1', nameEn: 'Sara Ahmed', nameAr: 'سارة أحمد', nameIt: 'Sara Ahmed', country: '🇪🇬', rating: 5, textEn: 'The 15-piece brush set is incredible! The quality rivals brands 5x the price. My clients always ask what brushes I use!', textAr: 'طقم الفرش الـ 15 قطعة مذهل! الجودة تنافس براندات بخمس أضعاف السعر. عميلاتي دايماً يسألوني بتستخدمي إيه!', textIt: 'Il set da 15 pennelli è incredibile! La qualità rivaleggia con marchi 5 volte più costosi.', enabled: true },
  { id: 't2', nameEn: 'Nour El-Din', nameAr: 'نور الدين', nameIt: 'Nour El-Din', country: '🇪🇬', rating: 5, textEn: 'The glow highlighter is literally viral for a reason! One drop gives you the most beautiful dewy look. 100% worth it.', textAr: 'الجلو الهايلايتر ده بجد يستاهل الضجة! نقطة واحدة بتديكي أحلى لمعة. يستاهل 100%.', textIt: "L'illuminante glow è virale per un motivo! Una goccia dà un look luminoso bellissimo.", enabled: true },
  { id: 't3', nameEn: 'Layla Hassan', nameAr: 'ليلى حسن', nameIt: 'Layla Hassan', country: '🇪🇬', rating: 5, textEn: 'Best lashes I\'ve ever tried! So lightweight you forget you\'re wearing them. Already on my 20th use!', textAr: 'أحسن رموش جربتها في حياتي! خفيفة لدرجة إنك بتنسي إنك لابساها. وصلت للمرة الـ 20!', textIt: 'Le migliori ciglia che abbia mai provato! Così leggere che dimentichi di indossarle.', enabled: true },
];

// ============ FOOTER LINKS (Admin-controlled) ============
export const defaultFooterLinks: FooterLink[] = [
  { id: 'fl1', labelEn: 'FAQ', labelAr: 'الأسئلة الشائعة', labelIt: 'FAQ', page: 'faq' as Page, section: 'help', enabled: true },
  { id: 'fl2', labelEn: 'Shipping Info', labelAr: 'معلومات الشحن', labelIt: 'Spedizione', page: 'shipping-info' as Page, section: 'help', enabled: true },
  { id: 'fl3', labelEn: 'Returns Policy', labelAr: 'سياسة الإرجاع', labelIt: 'Resi', page: 'returns-policy' as Page, section: 'help', enabled: true },
  { id: 'fl4', labelEn: 'Size Guide', labelAr: 'دليل المقاسات', labelIt: 'Guida Taglie', page: 'size-guide' as Page, section: 'help', enabled: true },
  { id: 'fl5', labelEn: 'Contact Us', labelAr: 'اتصل بنا', labelIt: 'Contattaci', page: 'contact' as Page, section: 'help', enabled: true },
];

// ============ SEO DEFAULTS ============
export const defaultSeoMeta: SeoMeta = {
  titleEn: 'NEFRA — Everything. Elevated.',
  titleAr: 'نفرا — كل شيء. بمستوى أعلى.',
  titleIt: 'NEFRA — Tutto. Elevato.',
  descriptionEn: 'Premium e-commerce platform for the Middle East and Mediterranean. Shop electronics, fashion, beauty and more.',
  descriptionAr: 'منصة تسوق إلكتروني فاخرة للشرق الأوسط والبحر المتوسط. تسوق الإلكترونيات والأزياء والجمال والمزيد.',
  descriptionIt: 'Piattaforma e-commerce premium per il Medio Oriente e il Mediterraneo. Acquista elettronica, moda, bellezza e altro.',
  keywords: 'NEFRA, premium shopping, e-commerce, Middle East, luxury, electronics, fashion',
  ogImage: './assets/logo-v2.png',
};

// ============ SITE SETTINGS (Admin-controlled) ============
export const defaultSiteSettings: SiteSettings = {
  socialLinks: socialLinks,
  testimonials: defaultTestimonials,
  heroBanner: { enabled: true, imageUrl: '', overlayOpacity: 0.6 },
  promoMessages: promoMessages,
  footerLinks: defaultFooterLinks,
  seoMeta: defaultSeoMeta,
  whatsappDefaultMessage: {
    en: 'Hello! I would like to inquire about your products',
    ar: 'مرحباً! أريد الاستفسار عن منتجاتكم',
    it: 'Ciao! Vorrei informazioni sui vostri prodotti',
  },
  featuredProductIds: [1, 4, 7, 11],
  codFeeLabel: '2%',
};

// ============ ADDRESSES ============
export const addresses: Address[] = [
  { id:1, labelKey:'address.home', name:'Mohamed Ahmed', street:'شارع فؤاد، سموحة', city:'الإسكندرية', phone:'+20 10 XXX XXXX', isDefault:true },
  { id:2, labelKey:'address.office', name:'Mohamed Ahmed', street:'شارع التحرير، وسط البلد', city:'القاهرة', phone:'+20 12 XXX XXXX', isDefault:false },
];

// ============ NOTIFICATIONS ============
export const notifications: Notification[] = [
  { id:1, titleKey:'notif.orderShipped', messageKey:'notif.orderShippedMsg', type:'order', date:'2024-03-16', read:false },
  { id:2, titleKey:'notif.flashSale', messageKey:'notif.flashSaleMsg', type:'promo', date:'2024-03-15', read:false },
  { id:3, titleKey:'notif.newCountry', messageKey:'notif.newCountryMsg', type:'system', date:'2024-03-14', read:true },
  { id:4, titleKey:'notif.pointsEarned', messageKey:'notif.pointsEarnedMsg', type:'loyalty', date:'2024-03-13', read:true },
];

// ============ GIFT CARDS ============
export const giftCards: GiftCard[] = [
  { id:1, value:100, design:'birthday', emoji:'🎂' },
  { id:2, value:250, design:'celebration', emoji:'🎉' },
  { id:3, value:500, design:'love', emoji:'❤️' },
  { id:4, value:1000, design:'premium', emoji:'⭐' },
];

// ============ CATEGORIES ============
export const categories: CategoryInfo[] = [
  // ═══ Level 1 — Main Categories ═══
  { id:'health-beauty', name:'Health & Beauty', nameAr:'الصحة والجمال', nameIt:'Salute e Bellezza', parentId:null, level:1, enabled:true, order:1, grad:'from-pink-400 to-rose-600' },
  { id:'fashion', name:'Fashion', nameAr:'الأزياء', nameIt:'Moda', parentId:null, level:1, enabled:false, order:2, grad:'from-purple-400 to-indigo-600' },
  { id:'electronics', name:'Electronics', nameAr:'الإلكترونيات', nameIt:'Elettronica', parentId:null, level:1, enabled:false, order:3, grad:'from-blue-400 to-cyan-600' },
  { id:'home-furniture', name:'Home & Furniture', nameAr:'المنزل والأثاث', nameIt:'Casa e Arredamento', parentId:null, level:1, enabled:false, order:4, grad:'from-amber-400 to-orange-600' },
  { id:'sports', name:'Sports', nameAr:'الرياضة', nameIt:'Sport', parentId:null, level:1, enabled:false, order:5, grad:'from-green-400 to-emerald-600' },
  { id:'grocery', name:'Groceries', nameAr:'البقالة', nameIt:'Alimentari', parentId:null, level:1, enabled:false, order:6, grad:'from-yellow-400 to-amber-500' },
  { id:'baby', name:'Baby Products', nameAr:'منتجات الأطفال', nameIt:'Prodotti per Bambini', parentId:null, level:1, enabled:false, order:7, grad:'from-sky-300 to-blue-500' },
  { id:'appliances', name:'Appliances', nameAr:'أجهزة منزلية', nameIt:'Elettrodomestici', parentId:null, level:1, enabled:false, order:8, grad:'from-slate-400 to-gray-600' },
  // === عطور (Perfumes) - Level 1 ===
  { id:'perfumes-main', name:'Perfumes', nameAr:'عطور', nameIt:'Profumi', parentId:null, level:1, enabled:true, order:2, grad:'from-purple-400 to-violet-600' },


  // ═══ Level 2 — Under Health & Beauty ═══
  { id:'makeup', name:'Makeup', nameAr:'مكياج', nameIt:'Trucco', parentId:'health-beauty', level:2, enabled:true, order:1, grad:'from-pink-400 to-rose-600' },
  { id:'skincare', name:'Skincare', nameAr:'العناية بالبشرة', nameIt:'Cura della Pelle', parentId:'health-beauty', level:2, enabled:false, order:2, grad:'from-green-300 to-teal-500' },
  { id:'haircare', name:'Hair Care', nameAr:'العناية بالشعر', nameIt:'Cura dei Capelli', parentId:'health-beauty', level:2, enabled:false, order:3, grad:'from-amber-300 to-yellow-500' },
  { id:'perfumes', name:'Perfumes', nameAr:'العطور', nameIt:'Profumi', parentId:'health-beauty', level:2, enabled:false, order:4, grad:'from-purple-300 to-violet-500' },
  { id:'personal-care', name:'Personal Care', nameAr:'العناية الشخصية', nameIt:'Cura Personale', parentId:'health-beauty', level:2, enabled:false, order:5, grad:'from-blue-300 to-sky-500' },
  // === Perfumes Level 2 & 3 ===
  { id:'luxury-perfumes', name:'Luxury Perfumes', nameAr:'عطور فاخرة', nameIt:'Profumi di Lusso', parentId:'perfumes-main', level:2, enabled:true, order:1, grad:'from-purple-400 to-violet-600' },
  { id:'aj-perfumes', name:'Al Jazeera Perfumes', nameAr:'عطور الجزيرة', nameIt:'Profumi Al Jazeera', parentId:'luxury-perfumes', level:3, enabled:true, order:1, count:24, grad:'from-purple-400 to-violet-600' },


  // ═══ Level 2 — Under Fashion (disabled but ready) ═══
  { id:'womens-fashion', name:"Women's Fashion", nameAr:'أزياء نسائية', nameIt:'Moda Donna', parentId:'fashion', level:2, enabled:false, order:1, grad:'from-pink-300 to-fuchsia-500' },
  { id:'mens-fashion', name:"Men's Fashion", nameAr:'أزياء رجالية', nameIt:'Moda Uomo', parentId:'fashion', level:2, enabled:false, order:2, grad:'from-blue-400 to-indigo-600' },
  { id:'kids-fashion', name:"Kids' Fashion", nameAr:'أزياء أطفال', nameIt:'Moda Bambini', parentId:'fashion', level:2, enabled:false, order:3, grad:'from-yellow-300 to-orange-400' },
  { id:'shoes', name:'Shoes', nameAr:'أحذية', nameIt:'Scarpe', parentId:'fashion', level:2, enabled:false, order:4, grad:'from-stone-400 to-stone-600' },
  { id:'bags', name:'Bags', nameAr:'حقائب', nameIt:'Borse', parentId:'fashion', level:2, enabled:false, order:5, grad:'from-amber-400 to-brown-500' },

  // ═══ Level 3 — Under Makeup (active products) ═══
  { id:'brush-sets', name:'Brush Sets', nameAr:'أطقم فرش', nameIt:'Set Pennelli', parentId:'makeup', level:3, enabled:true, order:1, count:6, grad:'from-pink-400 to-rose-600' },
  { id:'lashes', name:'Lashes', nameAr:'رموش', nameIt:'Ciglia', parentId:'makeup', level:3, enabled:true, order:2, count:2, grad:'from-gray-500 to-gray-700' },
  { id:'face', name:'Face', nameAr:'الوجه', nameIt:'Viso', parentId:'makeup', level:3, enabled:true, order:3, count:3, grad:'from-amber-400 to-yellow-500' },
  { id:'eyes', name:'Eyes', nameAr:'العيون', nameIt:'Occhi', parentId:'makeup', level:3, enabled:true, order:4, count:2, grad:'from-purple-400 to-pink-600' },
  { id:'lips', name:'Lips', nameAr:'الشفاه', nameIt:'Labbra', parentId:'makeup', level:3, enabled:true, order:5, count:2, grad:'from-red-400 to-rose-600' },
  { id:'tools-accessories', name:'Tools & Accessories', nameAr:'أدوات وإكسسوارات', nameIt:'Strumenti e Accessori', parentId:'makeup', level:3, enabled:true, order:6, count:2, grad:'from-pink-300 to-pink-500' },

  // ═══ Level 3 — Under Skincare (ready for expansion) ═══
  { id:'moisturizers', name:'Moisturizers', nameAr:'مرطبات', nameIt:'Idratanti', parentId:'skincare', level:3, enabled:false, order:1, grad:'from-green-300 to-teal-400' },
  { id:'cleansers', name:'Cleansers', nameAr:'غسول ومنظفات', nameIt:'Detergenti', parentId:'skincare', level:3, enabled:false, order:2, grad:'from-blue-200 to-sky-400' },
  { id:'serums', name:'Serums', nameAr:'سيروم', nameIt:'Sieri', parentId:'skincare', level:3, enabled:false, order:3, grad:'from-violet-300 to-purple-500' },
  { id:'sunscreen', name:'Sunscreen', nameAr:'واقي شمس', nameIt:'Protezione Solare', parentId:'skincare', level:3, enabled:false, order:4, grad:'from-yellow-300 to-orange-400' },
  { id:'masks', name:'Masks', nameAr:'ماسكات', nameIt:'Maschere', parentId:'skincare', level:3, enabled:false, order:5, grad:'from-emerald-300 to-green-500' },
];

// ============ CHART DATA ============
export const revenueData: ChartDataPoint[] = [
  { label: 'Jan', value: 45000 }, { label: 'Feb', value: 52000 }, { label: 'Mar', value: 61000 },
  { label: 'Apr', value: 48000 }, { label: 'May', value: 73000 }, { label: 'Jun', value: 68000 },
];

export const countryRevenueData: ChartDataPoint[] = [
  { label: '🇸🇦 SA', value: 285000 }, { label: '🇦🇪 AE', value: 156000 },
  { label: '🇶🇦 QA', value: 72000 }, { label: '🇪🇬 EG', value: 198000 },
  { label: '🇮🇹 IT', value: 94000 },
];

// ============ COMPATIBILITY ALIASES ============
export const sampleOrders = orders;
export const sampleAddresses = addresses;
export const sampleNotifications = notifications;
export const chartData = revenueData;
export const giftCardDesigns = giftCards;
export const cats: string[] = ['All', ...new Set(products.map(p => p.cat))];
export const brands: string[] = ['All', ...new Set(products.map(p => p.brand).filter(Boolean))];


// ============ HELPER FUNCTIONS ============
// ============ BRAND LOGOS DATA ============
export const brandLogos: { name: string; letter: string }[] = [
  { name: 'Brushia', letter: 'B' },
  { name: 'MAC', letter: 'M' },
  { name: 'NYX', letter: 'N' },
  { name: 'Maybelline', letter: 'M' },
  { name: "L'Oréal", letter: 'L' },
  { name: 'Huda Beauty', letter: 'H' },
  { name: 'Fenty Beauty', letter: 'F' },
  { name: 'Charlotte Tilbury', letter: 'CT' },
  { name: 'Too Faced', letter: 'TF' },
  { name: 'Urban Decay', letter: 'UD' },
];

export const fmt = (n: number, symbol: string = 'ر.س'): string => `${n.toLocaleString()} ${symbol}`;
export const disc = (price: number, old?: number): number => old ? Math.round(((old - price) / old) * 100) : 0;
