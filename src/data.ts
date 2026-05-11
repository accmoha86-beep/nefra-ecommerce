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
    enabled: true, isDefault: true, phone: '+966', timezone: 'Asia/Riyadh',
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
    enabled: true, isDefault: false, phone: '+971', timezone: 'Asia/Dubai',
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
    enabled: true, isDefault: false, phone: '+974', timezone: 'Asia/Qatar',
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
    enabled: true, isDefault: false, phone: '+20', timezone: 'Africa/Cairo',
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
    enabled: true, isDefault: false, phone: '+39', timezone: 'Europe/Rome',
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
  { id:1, name:'Sony WH-1000XM5 Headphones', nameAr:'سماعات سوني WH-1000XM5', nameIt:'Cuffie Sony WH-1000XM5', cat:'Electronics', brand:'Sony', price:1349, old:1599, rating:4.8, reviews:2847, badge:'Best Seller', emoji:'🎧', img:'./assets/headphones.jpg', grad:'from-blue-500 to-purple-600', desc:'Industry-leading noise cancellation with Auto NC Optimizer.', descAr:'أفضل عزل للضوضاء مع تقنية Auto NC Optimizer.', descIt:'Cancellazione del rumore leader del settore con Auto NC Optimizer.', stock:45, specs:['30hr Battery','Multipoint','LDAC','Speak-to-Chat'], specsAr: ['بطارية 30 ساعة','اتصال متعدد','LDAC','تحدث للإيقاف'], specsIt: ['Batteria 30h','Multipoint','LDAC','Speak-to-Chat'], countryStock: { SA: 45, AE: 30, QA: 15, EG: 25, IT: 40 }, countryPrices: { SA: 1349, AE: 1323, QA: 1308, EG: 17807, IT: 330 }, attributes: { color: 'Black', connectivity: 'Wireless' } },
  { id:2, name:'Omega Seamaster Diver 300M', nameAr:'أوميغا سيماستر دايفر 300M', nameIt:'Omega Seamaster Diver 300M', cat:'Accessories', brand:'Omega', price:8750, old:9200, rating:4.9, reviews:1523, badge:'Premium', emoji:'⌚', img:'./assets/watch.jpg', grad:'from-amber-600 to-yellow-500', desc:'Professional dive watch with Co-Axial Master Chronometer.', descAr:'ساعة غوص احترافية مع كرونومتر Co-Axial.', descIt:'Orologio subacqueo professionale con Co-Axial Master Chronometer.', stock:12, specs:['300m Water Resistant','Ceramic Bezel','Helium Valve','42mm'], specsAr: ['مقاوم للماء 300م','إطار سيراميك','صمام هيليوم','42 مم'], specsIt: ['300m Impermeabile','Lunetta Ceramica','Valvola Elio','42mm'], countryStock: { SA: 12, AE: 8, QA: 5, EG: 3, IT: 10 }, countryPrices: { SA: 8750, AE: 8575, QA: 8487, EG: 115500, IT: 2143 }, attributes: { color: 'Silver', material: 'Stainless Steel', watchSize: '42mm' } },
  { id:3, name:'iPhone 16 Pro Max 256GB', nameAr:'آيفون 16 برو ماكس 256 جيجا', nameIt:'iPhone 16 Pro Max 256GB', cat:'Electronics', brand:'Apple', price:5199, old:5499, rating:4.9, reviews:8934, badge:'New', emoji:'📱', img:'./assets/iphone.jpg', grad:'from-gray-700 to-gray-900', desc:'A18 Pro chip, 48MP camera system, Titanium design.', descAr:'شريحة A18 Pro، نظام كاميرا 48MP، تصميم تيتانيوم.', descIt:'Chip A18 Pro, sistema fotocamera 48MP, design in Titanio.', stock:78, specs:['A18 Pro','6.9" Display','48MP Camera','Titanium'], specsAr: ['شريحة A18 Pro','شاشة 6.9 بوصة','كاميرا 48MP','تيتانيوم'], specsIt: ['A18 Pro','Display 6.9"','Fotocamera 48MP','Titanio'], countryStock: { SA: 78, AE: 55, QA: 20, EG: 40, IT: 65 }, countryPrices: { SA: 5199, AE: 5095, QA: 5043, EG: 68627, IT: 1273 }, attributes: { color: 'Natural Titanium', storage: '256GB' } },
  { id:4, name:'Cashmere Overcoat — Italian Wool', nameAr:'معطف كشمير — صوف إيطالي', nameIt:'Cappotto in Cashmere — Lana Italiana', cat:'Fashion', brand:'NEFRA', price:2890, old:3400, rating:4.7, reviews:456, badge:'Limited', emoji:'🧥', img:'./assets/overcoat.jpg', grad:'from-stone-600 to-stone-800', desc:'Handcrafted Italian cashmere wool, timeless elegance.', descAr:'صوف كشمير إيطالي مصنوع يدوياً، أناقة خالدة.', descIt:'Lana cashmere italiana lavorata a mano, eleganza senza tempo.', stock:8, specs:['100% Cashmere','Italian Made','Slim Fit','Dry Clean'], specsAr: ['100% كشمير','صناعة إيطالية','قصة ضيقة','تنظيف جاف'], specsIt: ['100% Cashmere','Made in Italy','Slim Fit','Lavaggio a Secco'], countryStock: { SA: 8, AE: 6, QA: 3, EG: 5, IT: 15 }, countryPrices: { SA: 2890, AE: 2832, QA: 2803, EG: 38148, IT: 708 }, attributes: { color: 'Camel', clothingSize: 'L', material: 'Cashmere' } },
  { id:5, name:'Tom Ford — Oud Wood EDP 100ml', nameAr:'توم فورد — عود وود 100 مل', nameIt:'Tom Ford — Oud Wood EDP 100ml', cat:'Beauty', brand:'Tom Ford', price:1250, old:1450, rating:4.8, reviews:3201, badge:'Popular', emoji:'✨', img:'./assets/perfume.jpg', grad:'from-amber-700 to-red-800', desc:'Rare oud, sandalwood, and vetiver. Luxury in a bottle.', descAr:'عود نادر، خشب الصندل، والفيتيفر. فخامة في زجاجة.', descIt:'Oud raro, sandalo e vetiver. Lusso in una bottiglia.', stock:34, specs:['100ml','EDP','Unisex','Long Lasting'], specsAr: ['100 مل','عطر مركّز','للجنسين','يدوم طويلاً'], specsIt: ['100ml','Eau de Parfum','Unisex','Lunga Durata'], countryStock: { SA: 34, AE: 25, QA: 12, EG: 18, IT: 28 }, countryPrices: { SA: 1250, AE: 1225, QA: 1212, EG: 16500, IT: 306 }, attributes: { volume: '100ml', gender: 'Unisex' } },
  { id:6, name:'MacBook Pro 16" M3 Max', nameAr:'ماك بوك برو 16 بوصة M3 Max', nameIt:'MacBook Pro 16" M3 Max', cat:'Electronics', brand:'Apple', price:14999, old:15999, rating:4.9, reviews:4567, badge:'Pro', emoji:'💻', img:'./assets/macbook.jpg', grad:'from-gray-800 to-black', desc:'M3 Max chip, 36GB RAM, 1TB SSD. Ultimate performance.', descAr:'شريحة M3 Max، 36 جيجا رام، 1 تيرا SSD. أداء فائق.', descIt:'Chip M3 Max, 36GB RAM, 1TB SSD. Prestazioni al top.', stock:23, specs:['M3 Max','36GB RAM','1TB SSD','21hr Battery'], specsAr: ['شريحة M3 Max','36 جيجا رام','1 تيرا SSD','بطارية 21 ساعة'], specsIt: ['Chip M3 Max','36GB RAM','1TB SSD','Batteria 21h'], countryStock: { SA: 23, AE: 18, QA: 8, EG: 12, IT: 20 }, countryPrices: { SA: 14999, AE: 14699, QA: 14549, EG: 197987, IT: 3674 }, attributes: { color: 'Space Black', storage: '1TB', ram: '36GB' } },
  { id:7, name:'Ray-Ban Aviator Classic', nameAr:'راي بان أفياتور كلاسيك', nameIt:'Ray-Ban Aviator Classic', cat:'Accessories', brand:'Ray-Ban', price:780, old:850, rating:4.6, reviews:12456, badge:'', emoji:'🕶️', img:'./assets/sunglasses.jpg', grad:'from-yellow-500 to-orange-500', desc:'Iconic pilot shape with crystal green G-15 lenses.', descAr:'تصميم طيار أيقوني مع عدسات G-15 خضراء كريستال.', descIt:'Forma pilota iconica con lenti crystal green G-15.', stock:156, specs:['UV400','Crystal Lens','Gold Frame','58mm'], specsAr: ['حماية UV400','عدسات كريستال','إطار ذهبي','58 مم'], specsIt: ['UV400','Lenti Crystal','Montatura Oro','58mm'], countryStock: { SA: 156, AE: 120, QA: 45, EG: 80, IT: 200 }, countryPrices: { SA: 780, AE: 764, QA: 756, EG: 10296, IT: 191 }, attributes: { color: 'Gold', lensType: 'Polarized' } },
  { id:8, name:'Nike Air Max 90', nameAr:'نايكي اير ماكس 90', nameIt:'Nike Air Max 90', cat:'Fashion', brand:'Nike', price:659, old:749, rating:4.7, reviews:8723, badge:'Trending', emoji:'👟', img:'./assets/sneakers.jpg', grad:'from-red-500 to-pink-500', desc:'The icon returns. Max Air cushioning, classic style.', descAr:'الأيقونة تعود. وسادة Max Air، ستايل كلاسيكي.', descIt:'L\'icona ritorna. Ammortizzazione Max Air, stile classico.', stock:89, specs:['Max Air','Leather','Rubber Sole','Cushioned'], specsAr: ['تقنية Max Air','جلد طبيعي','نعل مطاطي','مبطّن'], specsIt: ['Max Air','Pelle','Suola in Gomma','Ammortizzato'], countryStock: { SA: 89, AE: 65, QA: 30, EG: 50, IT: 75 }, countryPrices: { SA: 659, AE: 645, QA: 639, EG: 8698, IT: 161 }, attributes: { color: 'White', shoeSize: '42', material: 'Leather' } },
  { id:9, name:'La Mer — The Concentrate Serum', nameAr:'لا مير — سيروم ذا كونسنتريت', nameIt:'La Mer — The Concentrate Serum', cat:'Beauty', brand:'La Mer', price:1680, old:1890, rating:4.8, reviews:2341, badge:'Luxury', emoji:'🧴', img:'./assets/serum.jpg', grad:'from-emerald-400 to-teal-600', desc:'Miracle Broth™ infused serum for visible renewal.', descAr:'سيروم بتقنية Miracle Broth™ لتجديد مرئي.', descIt:'Siero infuso con Miracle Broth™ per un rinnovamento visibile.', stock:19, specs:['30ml','Miracle Broth','Anti-Aging','All Skin Types'], specsAr: ['30 مل','Miracle Broth','مضاد للشيخوخة','لجميع أنواع البشرة'], specsIt: ['30ml','Miracle Broth','Anti-Età','Tutti i Tipi di Pelle'], countryStock: { SA: 19, AE: 15, QA: 7, EG: 10, IT: 22 }, countryPrices: { SA: 1680, AE: 1646, QA: 1629, EG: 22176, IT: 411 }, attributes: { volume: '30ml', skinType: 'All Skin Types' } },
  { id:10, name:'AirPods Pro 2 (USB-C)', nameAr:'إيربودز برو 2 (USB-C)', nameIt:'AirPods Pro 2 (USB-C)', cat:'Electronics', brand:'Apple', price:949, old:1049, rating:4.8, reviews:15678, badge:'Hot', emoji:'🎵', img:'./assets/airpods.jpg', grad:'from-white to-gray-200', desc:'Adaptive Audio, Personalized Spatial Audio, USB-C.', descAr:'صوت تكيفي، صوت مكاني مخصص، USB-C.', descIt:'Audio Adattivo, Audio Spaziale Personalizzato, USB-C.', stock:234, specs:['ANC','Spatial Audio','USB-C','6hr Battery'], specsAr: ['عزل ضوضاء نشط','صوت مكاني','USB-C','بطارية 6 ساعات'], specsIt: ['ANC','Audio Spaziale','USB-C','Batteria 6h'], countryStock: { SA: 234, AE: 180, QA: 60, EG: 100, IT: 150 }, countryPrices: { SA: 949, AE: 930, QA: 920, EG: 12526, IT: 232 }, attributes: { color: 'White', connectivity: 'Wireless' } },
  { id:11, name:'Louis Vuitton Neverfull MM', nameAr:'لويس فيتون نيفرفول MM', nameIt:'Louis Vuitton Neverfull MM', cat:'Accessories', brand:'Louis Vuitton', price:6850, old:7200, rating:4.9, reviews:5678, badge:'Exclusive', emoji:'👜', img:'./assets/handbag.jpg', grad:'from-amber-700 to-amber-900', desc:'Monogram canvas, natural cowhide trim. Timeless luxury.', descAr:'قماش مونوغرام، حواف جلد طبيعي. فخامة خالدة.', descIt:'Tela monogram, finiture in pelle naturale. Lusso senza tempo.', stock:5, specs:['Monogram Canvas','Cowhide','Textile Lining','31x28x14cm'], specsAr: ['قماش مونوغرام','جلد بقري','بطانة نسيجية','31×28×14 سم'], specsIt: ['Tela Monogram','Pelle Bovina','Fodera Tessile','31x28x14cm'], countryStock: { SA: 5, AE: 4, QA: 2, EG: 3, IT: 8 }, countryPrices: { SA: 6850, AE: 6713, QA: 6644, EG: 90420, IT: 1678 }, attributes: { color: 'Monogram Brown', bagSize: 'MM' } },
  { id:12, name:'Bose SoundLink Max Speaker', nameAr:'بوز ساوند لينك ماكس', nameIt:'Bose SoundLink Max Speaker', cat:'Electronics', brand:'Bose', price:1199, old:1399, rating:4.7, reviews:3456, badge:'', emoji:'🔊', img:'./assets/speaker.jpg', grad:'from-indigo-500 to-blue-700', desc:'Massive sound, deep bass. 20hr battery, waterproof.', descAr:'صوت ضخم، بيس عميق. 20 ساعة بطارية، مقاوم للماء.', descIt:'Suono potente, bassi profondi. 20 ore di batteria, impermeabile.', stock:67, specs:['20hr Battery','IP67','Bluetooth 5.3','Party Mode'], specsAr: ['بطارية 20 ساعة','مقاوم للماء IP67','بلوتوث 5.3','وضع الحفلات'], specsIt: ['Batteria 20h','IP67','Bluetooth 5.3','Modalità Party'], countryStock: { SA: 67, AE: 50, QA: 20, EG: 35, IT: 45 }, countryPrices: { SA: 1199, AE: 1175, QA: 1163, EG: 15827, IT: 293 }, attributes: { color: 'Black', connectivity: 'Bluetooth 5.3' } },
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
  { id: 't1', nameEn: 'Sara Al-Ahmad', nameAr: 'سارة الأحمد', nameIt: 'Sara Al-Ahmad', country: '🇸🇦', rating: 5, textEn: 'Exceptional quality and fast delivery. NEFRA has become my go-to for premium products!', textAr: 'جودة استثنائية وتوصيل سريع. نفرا أصبح وجهتي الأولى للمنتجات الفاخرة!', textIt: 'Qualità eccezionale e consegna rapida. NEFRA è diventato il mio punto di riferimento!', enabled: true },
  { id: 't2', nameEn: 'Mohammed Al-Rashid', nameAr: 'محمد الراشد', nameIt: 'Mohammed Al-Rashid', country: '🇦🇪', rating: 5, textEn: 'The best online shopping experience in the region. Amazing customer service!', textAr: 'أفضل تجربة تسوق إلكتروني في المنطقة. خدمة عملاء مذهلة!', textIt: 'La migliore esperienza di shopping online nella regione. Servizio clienti straordinario!', enabled: true },
  { id: 't3', nameEn: 'Fatma Hassan', nameAr: 'فاطمة حسن', nameIt: 'Fatma Hassan', country: '🇪🇬', rating: 5, textEn: 'Love the variety and authentic products. Shipping to Egypt is surprisingly fast!', textAr: 'أحب التنوع والمنتجات الأصلية. الشحن لمصر سريع بشكل مفاجئ!', textIt: 'Adoro la varietà e i prodotti autentici. La spedizione in Egitto è sorprendentemente veloce!', enabled: true },
  { id: 't4', nameEn: 'Marco Rossi', nameAr: 'ماركو روسي', nameIt: 'Marco Rossi', country: '🇮🇹', rating: 4, textEn: 'Elegant products with a Middle Eastern touch. The Italian support is fantastic!', textAr: 'منتجات أنيقة بلمسة شرق أوسطية. الدعم الإيطالي رائع!', textIt: 'Prodotti eleganti con un tocco mediorientale. Il supporto italiano è fantastico!', enabled: true },
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
  featuredProductIds: [1, 2, 3, 4],
  codFeeLabel: '2%',
};

// ============ ADDRESSES ============
export const addresses: Address[] = [
  { id:1, labelKey:'address.home', name:'Mohamed Ahmed', street:'King Fahd Road, Al Narjis District', city:'Riyadh', phone:'+966 55 XXX XXXX', isDefault:true },
  { id:2, labelKey:'address.office', name:'Mohamed Ahmed', street:'Olaya Street, Al Sahafa', city:'Riyadh', phone:'+966 55 XXX XXXX', isDefault:false },
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
  { name:'Electronics', nameAr:'إلكترونيات', nameIt:'Elettronica', emoji:'📱', count:5, grad:'from-blue-500 to-indigo-600', enabled:true },
  { name:'Fashion', nameAr:'أزياء', nameIt:'Moda', emoji:'👗', count:2, grad:'from-pink-500 to-rose-600', enabled:true },
  { name:'Beauty', nameAr:'جمال', nameIt:'Bellezza', emoji:'✨', count:2, grad:'from-purple-500 to-fuchsia-600', enabled:true },
  { name:'Accessories', nameAr:'إكسسوارات', nameIt:'Accessori', emoji:'⌚', count:3, grad:'from-amber-500 to-orange-600', enabled:true },
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
export const fmt = (n: number, symbol: string = 'ر.س'): string => `${n.toLocaleString()} ${symbol}`;
export const disc = (price: number, old?: number): number => old ? Math.round(((old - price) / old) * 100) : 0;
