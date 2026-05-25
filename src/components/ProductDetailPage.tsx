import React, { useState } from 'react';
import { ArrowLeft, Heart, Scale, ShoppingBag, Truck, RotateCcw, Shield, Star, Share2, Minus, Plus, Check, Zap, ChevronDown, ChevronUp, Package, Clock, CreditCard, Link2, Copy, MessageCircle, Eye, TrendingUp, AlertTriangle } from 'lucide-react';
import { Product, Page, FeatureFlag } from '../types';
import { products, disc } from '../data';
import { Stars } from './ProductCard';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  setPage: (p: Page) => void;
  onAddToCart: (p: Product) => void;
  onQuickView?: (p: Product) => void;
  onToggleWishlist: (id: number) => void;
  onToggleCompare: (id: number) => void;
  isInWishlist: boolean;
  isInCompare: boolean;
  onSelectProduct: (p: Product) => void;
  wishlist: number[];
  compareList: number[];
  t: (key: string) => string;
  tc?: (cat: string) => string;
  tb: (badge: string) => string;
  lang: string;
  formatPrice?: (price: number, product?: any) => string;
  onBuyNow?: (p: Product, qty: number) => void;
  recentlyViewed?: Product[];
  featureFlags?: FeatureFlag[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product, setPage, onAddToCart, onToggleWishlist, onToggleCompare,
  isInWishlist, isInCompare, onSelectProduct, wishlist, compareList, t, tc, tb, lang, formatPrice,
  onBuyNow, recentlyViewed, featureFlags
}) => {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [imgError, setImgError] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [viewingNow] = useState(() => Math.floor(Math.random() * 18) + 5);
  const [purchasedThisWeek] = useState(() => Math.floor(Math.random() * 40) + 8);
  const p = product;
  const d = disc(p.price, p.old);
  const related = products.filter(r => r.cat === p.cat && r.id !== p.id).slice(0, 4);
  const recommended = products.filter(r => r.cat !== p.cat && r.id !== p.id).sort((a, b) => b.rating - a.rating).slice(0, 4);
  const recentFiltered = (recentlyViewed || []).filter(r => r.id !== p.id).slice(0, 4);

  const ff = (id: string) => !featureFlags || featureFlags.find(f => f.id === id)?.enabled !== false;

  const getName = () => lang === 'ar' ? (p.nameAr || p.name) : lang === 'it' ? (p.nameIt || p.name) : p.name;
  const getDesc = () => lang === 'ar' ? (p.descAr || p.desc) : lang === 'it' ? (p.descIt || p.desc) : p.desc;
  const getSpecs = (): string[] => {
    if (lang === 'ar' && p.specsAr && p.specsAr.length > 0) return p.specsAr;
    if (lang === 'it' && p.specsIt && p.specsIt.length > 0) return p.specsIt;
    return p.specs;
  };

  // Attribute label translations
  const attrLabels: Record<string, Record<string, string>> = {
    en: {
      type:'Type', size:'Size', concentration:'Concentration', gender:'For',
      pieces:'Pieces', material:'Material', handleColor:'Handle Color',
      volume:'Volume', finish:'Finish', shade:'Shade', shades:'Shades',
      coverage:'Coverage', color:'Color', waterproof:'Waterproof',
      wearTime:'Wear Time', style:'Style', styles:'Styles', reusable:'Reusable',
      dualEnded:'Dual Ended', pairs:'Pairs', format:'Format',
      hydrating:'Hydrating', oilControl:'Oil Control', caseType:'Case',
      sole:'Sole', closure:'Closure', heel:'Heel', cardSlots:'Card Slots',
      laptop:'Laptop', capacity:'Capacity', antiTheft:'Anti-Theft',
      season:'Season', occasion:'Occasion', chainStrap:'Chain Strap',
      compatibility:'Compatibility', connectivity:'Connectivity', battery:'Battery', power:'Power', ports:'Ports', technology:'Technology', length:'Length', connector:'Connector', hardness:'Hardness', standard:'Standard', rotation:'Rotation', mount:'Mount', foldable:'Foldable', protection:'Protection', kickstand:'Kickstand', driver:'Driver'
    },
    ar: {
      type:'النوع', size:'الحجم', concentration:'التركيز', gender:'الفئة',
      pieces:'القطع', material:'الخامة', handleColor:'لون المقبض',
      volume:'الحجم', finish:'اللمسة', shade:'الدرجة', shades:'الدرجات',
      coverage:'التغطية', color:'اللون', waterproof:'مقاوم للماء',
      wearTime:'مدة الثبات', style:'الستايل', styles:'الستايلات', reusable:'إعادة الاستخدام',
      dualEnded:'ثنائي الرأس', pairs:'الأزواج', format:'الشكل',
      hydrating:'مرطب', oilControl:'التحكم بالزيوت', caseType:'الحقيبة',
      sole:'النعل', closure:'الإغلاق', heel:'الكعب', cardSlots:'فتحات البطاقات',
      laptop:'اللابتوب', capacity:'السعة', antiTheft:'مضاد للسرقة',
      season:'الموسم', occasion:'المناسبة', chainStrap:'سلسلة الحمل',
      compatibility:'التوافق', connectivity:'الاتصال', battery:'البطارية', power:'القوة', ports:'المنافذ', technology:'التقنية', length:'الطول', connector:'الموصل', hardness:'الصلابة', standard:'المعيار', rotation:'الدوران', mount:'التثبيت', foldable:'قابل للطي', protection:'الحماية', kickstand:'المسند', driver:'السماعة'
    },
    it: {
      type:'Tipo', size:'Dimensione', concentration:'Concentrazione', gender:'Per',
      pieces:'Pezzi', material:'Materiale', handleColor:'Colore Manico',
      volume:'Volume', finish:'Finitura', shade:'Tonalità', shades:'Tonalità',
      coverage:'Copertura', color:'Colore', waterproof:'Waterproof',
      wearTime:'Durata', style:'Stile', styles:'Stili', reusable:'Riutilizzabile',
      dualEnded:'Doppia Punta', pairs:'Paia', format:'Formato',
      hydrating:'Idratante', oilControl:'Controllo Sebo', caseType:'Custodia',
      sole:'Suola', closure:'Chiusura', heel:'Tacco', cardSlots:'Slot Carte',
      laptop:'Laptop', capacity:'Capacit\u00e0', antiTheft:'Antifurto',
      season:'Stagione', occasion:'Occasione', chainStrap:'Catena',
      compatibility:'Compatibilit\u00e0', connectivity:'Connettivit\u00e0', battery:'Batteria', power:'Potenza', ports:'Porte', technology:'Tecnologia', length:'Lunghezza', connector:'Connettore', hardness:'Durezza', standard:'Standard', rotation:'Rotazione', mount:'Montaggio', foldable:'Pieghevole', protection:'Protezione', kickstand:'Supporto', driver:'Driver'
    }
  };

  const getAttrLabel = (key: string) => {
    return attrLabels[lang]?.[key] || attrLabels['en']?.[key] || key;
  };

  const getAttrValue = (key: string, val: string) => {
    // Translate common values
    const valMap: Record<string, Record<string, string>> = {
      ar: {
        'Unisex':'للجنسين', 'Men':'رجالي', 'Women':'نسائي',
        'Yes':'نعم', 'No':'لا',
        'Eau de Parfum':'او دو بارفان', 'Parfum':'بارفان', 'EDP':'او دو بارفان',
        'Gift Set':'طقم هدايا',
        'Synthetic':'صناعي', 'Premium Synthetic':'صناعي فاخر',
        'Mink':'مينك', 'Fox Mink':'فوكس مينك',
        'Latex-Free Sponge':'إسفنج خالي من اللاتكس', 'Satin':'ساتان',
        'Full':'كاملة', 'Medium-Full':'متوسطة-كاملة', 'Natural':'طبيعي',
        'Matte':'مات', 'Dewy':'ندي', 'Satin':'ساتان', 'Glossy':'لامع',
        'Natural HD':'طبيعي HD', 'Dewy Glass Skin':'ندي زجاجي',
        'Rose Gold':'روز جولد',
        'Natural-Dramatic':'طبيعي-درامي', 'Dramatic-Volume':'درامي-فوليوم',
        'Shimmer + Matte':'شيمر + مات', 'Matte + Shimmer + Glitter':'مات + شيمر + جليتر',
        'Warm Tones':'درجات دافئة', 'Mixed':'متنوع',
        'Eye Brushes':'فرش عيون', 'Eye Essentials':'أساسيات العيون',
        'Eyebrow':'حواجب', 'Foundation':'فاونديشن',
        'Double-Ended':'ثنائي الرأس', 'Complete Kit':'طقم كامل',
        'Multi-Shape':'متعدد الأشكال', 'Fingerless':'بدون أصابع',
        'One Size':'مقاس واحد', 'Hard Case':'حقيبة صلبة',
        'Setting Spray':'سبراي تثبيت', 'Pressed Powder':'بودرة مضغوطة',
        'Illuminating Filter':'فلتر مضيء', 'Bullet Lipstick':'ليب ستيك',
        'Retractable':'قابل للسحب', 'Book':'كتاب',
        'Charming Red':'أحمر تشارمينج', 'Golden':'ذهبي', 'Black':'أسود',
        'Sneaker':'رياضي', 'Running':'جري', 'Formal':'رسمي', 'Sandal':'صندل',
        'Boot':'بوت', 'Training':'تمارين', 'Loafer':'سليب أون', 'Walking':'مشي', 'Pump':'كعب',
        'Casual':'كاجوال',
        'Handbag':'شنطة يد', 'Backpack':'حقيبة ظهر', 'Crossbody':'كروس بودي',
        'Wallet':'محفظة', 'Travel Duffle':'شنطة سفر', 'Laptop Bag':'شنطة لابتوب',
        'Clutch':'كلاتش', 'Tote':'توت', 'Duffle':'حقيبة رياضية',
        'Shoulder Bag':'شنطة كتف', 'Mini Backpack':'حقيبة ظهر صغيرة',
        'Mesh + Rubber':'شبكة + مطاط', 'Flyknit':'فلاي نيت',
        'Genuine Leather':'جلد طبيعي', 'Suede':'شمواه',
        'Leather + Fur':'جلد + فرو', 'Synthetic Mesh':'شبكة صناعية',
        'Premium Textile':'نسيج فاخر', 'Canvas + Leather':'قماش + جلد',
        'Breathable Mesh':'شبكة تهوية', 'Synthetic Leather':'جلد صناعي',
        'Cushioned':'مبطن', 'Responsive Foam':'فوم متجاوب',
        'Leather':'جلدي', 'Flexible Rubber':'مطاط مرن',
        'Grip Rubber':'مطاط محكم', 'Air Cushion':'وسادة هوائية',
        'Memory Foam':'ميموري فوم',
        'Zipper':'سحاب', 'Slip-On':'سليب أون', 'Zipper + Magnetic':'سحاب + مغناطيسي',
        'Summer':'صيف', 'Evening':'سهرة',
        'PU Leather':'جلد صناعي PU', 'Nylon':'نايلون',
        'Oxford Fabric':'قماش أكسفورد', 'Satin + Crystal':'ساتان + كريستال',
        'Vegan Leather':'جلد نباتي', 'Polyester':'بوليستر',
        'Quilted Leather':'جلد مبطن', 'Nylon + Leather':'نايلون + جلد',
        'Flat':'مسطح', 'Medium 7cm':'متوسط 7 سم',
        'Up to 15.6"':'حتى 15.6 بوصة', '15.6"':'15.6 بوصة',
        'Gold':'ذهبية', '45L':'45 لتر', '35L':'35 لتر',
        '8':'8', '12':'12',
      },
      it: {
        'Unisex':'Unisex', 'Men':'Uomo', 'Women':'Donna',
        'Yes':'Sì', 'No':'No',
        'Eau de Parfum':'Eau de Parfum', 'Parfum':'Parfum', 'EDP':'EDP',
        'Gift Set':'Set Regalo',
        'Synthetic':'Sintetico', 'Premium Synthetic':'Sintetico Premium',
        'Full':'Totale', 'Medium-Full':'Medio-Alta',
        'Sneaker':'Sneaker', 'Running':'Corsa', 'Formal':'Formale', 'Sandal':'Sandalo',
        'Boot':'Stivale', 'Training':'Allenamento', 'Loafer':'Mocassino', 'Walking':'Passeggio', 'Pump':'Pump',
        'Casual':'Casual',
        'Handbag':'Borsa a Mano', 'Backpack':'Zaino', 'Crossbody':'Tracolla',
        'Wallet':'Portafoglio', 'Travel Duffle':'Borsa Viaggio', 'Laptop Bag':'Borsa Laptop',
        'Clutch':'Pochette', 'Tote':'Tote', 'Duffle':'Borsone',
        'Shoulder Bag':'Borsa a Spalla', 'Mini Backpack':'Mini Zaino',
        'Genuine Leather':'Vera Pelle', 'Suede':'Camoscio',
        'Cushioned':'Ammortizzata', 'Memory Foam':'Memory Foam',
        'Zipper':'Cerniera', 'Slip-On':'Slip-On',
        'Summer':'Estate', 'Evening':'Sera',
        'Flat':'Piatto', 'Medium 7cm':'Medio 7cm',
        'Gold':'Dorata',
        'Matte':'Matte', 'Dewy':'Luminoso', 'Satin':'Satinato',
      }
    };
    if (lang === 'en') return val;
    return valMap[lang]?.[val] || val;
  };

  const getCat = () => tc ? tc(p.cat) : p.cat;

  const sampleReviews = [
    { name: lang === 'ar' ? 'أحمد م.' : lang === 'it' ? 'Marco R.' : 'Ahmed M.', rating: 5, date: '2026-04-28', text: t('sampleReview1') },
    { name: lang === 'ar' ? 'سارة ك.' : lang === 'it' ? 'Sara K.' : 'Sara K.', rating: 4, date: '2026-04-20', text: t('sampleReview2') },
    { name: lang === 'ar' ? 'عمر هـ.' : lang === 'it' ? 'Omar H.' : 'Omar H.', rating: 5, date: '2026-04-15', text: t('sampleReview3') },
  ];

  const toggleAccordion = (id: string) => setOpenAccordion(openAccordion === id ? null : id);

  // Sticky bar: show when scrolled past main add-to-cart
  React.useEffect(() => {
    if (!ff('ff_sticky_cart')) return;
    const handleScroll = () => {
      const btn = document.querySelector('.btn-add-to-cart');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [featureFlags]);

  const handleShareCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(getName());

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => setPage('shop')}>
        <ArrowLeft size={16}/> {t('backToShop')}
      </button>

      <div className="detail-main">
        <div className="detail-gallery">
          {!imgError ? (
            <img src={p.img} alt={getName()} className="detail-img"
              onClick={() => setShowLightbox(true)}
              onError={() => setImgError(true)} />
          ) : (
            <div className="detail-img-fallback" style={{ background: p.grad }}>            </div>
          )}
          {p.badge && <span className={`detail-badge badge-${p.badge.toLowerCase().replace(/\s/g,'')}`}>{tb(p.badge)}</span>}
          {ff('ff_discount_badge') && d > 0 && <span className="detail-discount-badge">-{d}%</span>}
        </div>

        <div className="detail-info">
          {ff('ff_brand_on_card') && p.brand && <div className="detail-brand">{p.brand}</div>}
          <div className="detail-cat">{getCat()}</div>
          <h1 className="detail-name">{getName()}</h1>
          <div className="detail-rating">
            <Stars rating={p.rating} size={16} />
            <span>{p.rating}</span>
            <span className="detail-reviews">({p.reviews.toLocaleString()} {t('reviews')})</span>
          </div>

          <div className="detail-price-row">
            <span className="detail-price">{formatPrice ? formatPrice(p.price, p) : p.price}</span>
            {ff('ff_strikethrough') && p.old && <span className="detail-old">{formatPrice ? formatPrice(p.old || 0, p) : p.old}</span>}
            {d > 0 && <span className="detail-save">{t('save')} {d}%</span>}
          </div>

          <p className="detail-desc">{getDesc()}</p>

          <div className="detail-specs-quick">
            {getSpecs().map((s, i) => (
              <span key={i} className="detail-spec-tag"><Check size={12}/> {s}</span>
            ))}
          </div>

          <div className="detail-stock">
            {p.stock > 20 ? (
              <span className="stock-good"><Check size={14}/> {t('inStock')}</span>
            ) : p.stock > 0 ? (
              <span className="stock-low"><Zap size={14}/> {t('onlyXLeft').replace('{count}', String(p.stock))}</span>
            ) : (
              <span className="stock-out">{t('outOfStock')}</span>
            )}
          </div>

          {/* URGENCY TRIGGERS — Social Proof */}
          {ff('ff_social_proof') && (
            <div className="detail-urgency">
              <div className="urgency-item viewing">
                <Eye size={14}/>
                <span>{t('urgency.viewingNow').replace('{count}', String(viewingNow))}</span>
              </div>
              <div className="urgency-item purchased">
                <TrendingUp size={14}/>
                <span>{t('urgency.purchasedWeek').replace('{count}', String(purchasedThisWeek))}</span>
              </div>
              {ff('ff_urgency_stock') && p.stock <= 10 && p.stock > 0 && (
                <div className="urgency-item low-stock-urgent">
                  <AlertTriangle size={14}/>
                  <span>{t('urgency.onlyLeft').replace('{count}', String(p.stock))}</span>
                </div>
              )}
            </div>
          )}


          {/* SIZE SELECTOR - for shoes */}
          {ff('ff_size_selector') && (p.cat === 'Shoes') && (
            <div className="detail-size-selector">
              <span className="size-label">{t('selectSize')}:</span>
              <div className="size-buttons">
                {['38','39','40','41','42','43','44','45'].map(s => (
                  <button key={s} className={`size-btn${selectedSize === s ? ' active' : ''}`}
                    onClick={() => setSelectedSize(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}
          <div className="detail-qty">
            <span>{t('quantity')}:</span>
            <div className="qty-control">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14}/></button>
              <span>{qty}</span>
              <button onClick={() => setQty(Math.min(p.stock, qty + 1))}><Plus size={14}/></button>
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn-add-to-cart" onClick={() => { for(let i = 0; i < qty; i++) onAddToCart(p); }}>
              <ShoppingBag size={18}/> {t('addToCart')} — {formatPrice ? formatPrice(p.price * qty, p) : p.price * qty}
            </button>
            {ff('ff_buy_now') && onBuyNow && (
              <button className="btn-buy-now" onClick={() => onBuyNow(p, qty)}>
                <Zap size={18}/> {t('buyNow')}
              </button>
            )}
            <button className={`btn-icon${isInWishlist ? ' active' : ''}`}
              onClick={() => onToggleWishlist(p.id)}>
              <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
            <button className={`btn-icon${isInCompare ? ' active' : ''}`}
              onClick={() => onToggleCompare(p.id)}>
              <Scale size={18} />
            </button>
            {ff('ff_share_tools') ? (
              <div className="share-tools-wrap">
                <button className="btn-icon" onClick={() => setShowShareMenu(!showShareMenu)} title={t('share')}><Share2 size={18}/></button>
                {showShareMenu && (
                  <div className="share-dropdown">
                    <button className="share-option" onClick={handleShareCopy}>
                      {shareCopied ? <><Check size={14}/> {t('share.copied')}</> : <><Copy size={14}/> {t('share.copy')}</>}
                    </button>
                    <a className="share-option" href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={14}/> {t('share.whatsapp')}
                    </a>
                    <a className="share-option" href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                      <Share2 size={14}/> {t('share.facebook')}
                    </a>
                    <a className="share-option" href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                      <Link2 size={14}/> {t('share.twitter')}
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn-icon" title={t('share')}><Share2 size={18}/></button>
            )}
          </div>


          {/* TRUST BADGES */}
          {ff('ff_trust_badges') && (
            <div className="trust-badges">
              <div className="trust-badge">
                <Truck size={20}/>
                <div className="trust-text">
                  <span className="trust-title">{t('trust.fastShipping')}</span>
                  <span className="trust-desc">{t('trust.fastShippingDesc')}</span>
                </div>
              </div>
              <div className="trust-badge">
                <Shield size={20}/>
                <div className="trust-text">
                  <span className="trust-title">{t('trust.quality')}</span>
                  <span className="trust-desc">{t('trust.qualityDesc')}</span>
                </div>
              </div>
              <div className="trust-badge">
                <RotateCcw size={20}/>
                <div className="trust-text">
                  <span className="trust-title">{t('trust.easyReturns')}</span>
                  <span className="trust-desc">{t('trust.easyReturnsDesc')}</span>
                </div>
              </div>
            </div>
          )}

          {/* ASK A QUESTION */}
          {ff('ff_ask_question') && (
            <div className="ask-question">
              <MessageCircle size={16}/>
              <span>{t('askQuestion')}</span>
              <a href={`https://wa.me/201234567890?text=${encodeURIComponent(getName())}`} target="_blank" rel="noopener noreferrer" className="ask-question-btn">
                {t('askQuestionCta')}
              </a>
            </div>
          )}
          {/* DELIVERY & RETURNS ACCORDION */}
          {ff('ff_delivery_accordion') && (
            <div className="delivery-accordion">
              <div className={`accordion-item${openAccordion === 'delivery' ? ' open' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion('delivery')}>
                  <div className="accordion-header-left"><Truck size={16}/> {t('delivery.title')}</div>
                  {openAccordion === 'delivery' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                {openAccordion === 'delivery' && (
                  <div className="accordion-body">
                    <div className="accordion-row"><Package size={14}/> {t('delivery.standard')}</div>
                    <div className="accordion-row"><Zap size={14}/> {t('delivery.express')}</div>
                    <div className="accordion-row"><Truck size={14}/> {t('delivery.freeOver')}</div>
                  </div>
                )}
              </div>
              <div className={`accordion-item${openAccordion === 'returns' ? ' open' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion('returns')}>
                  <div className="accordion-header-left"><RotateCcw size={16}/> {t('delivery.returnsTitle')}</div>
                  {openAccordion === 'returns' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                {openAccordion === 'returns' && (
                  <div className="accordion-body">
                    <div className="accordion-row"><Clock size={14}/> {t('delivery.returnDays')}</div>
                    <div className="accordion-row"><Package size={14}/> {t('delivery.returnFree')}</div>
                    <div className="accordion-row"><CreditCard size={14}/> {t('delivery.refundMethod')}</div>
                  </div>
                )}
              </div>
              <div className={`accordion-item${openAccordion === 'payment' ? ' open' : ''}`}>
                <button className="accordion-header" onClick={() => toggleAccordion('payment')}>
                  <div className="accordion-header-left"><CreditCard size={16}/> {t('delivery.paymentTitle')}</div>
                  {openAccordion === 'payment' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                {openAccordion === 'payment' && (
                  <div className="accordion-body">
                    <div className="accordion-row"><CreditCard size={14}/> {t('delivery.paymentCards')}</div>
                    <div className="accordion-row"><Shield size={14}/> {t('delivery.paymentSecure')}</div>
                    <div className="accordion-row"><Clock size={14}/> {t('delivery.paymentBnpl')}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="detail-tabs">
        <div className="tabs-nav">
          {(['desc', 'specs', ...(ff('ff_reviews') ? ['reviews'] : [])] as const).map(tab => (
            <button key={tab} className={`tab-btn${activeTab === tab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab as any)}>
              {tab === 'desc' ? t('description') : tab === 'specs' ? t('specifications') : `${t('reviews')} (${p.reviews.toLocaleString()})`}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {activeTab === 'desc' && (
            <div className="tab-desc">
              <p>{getDesc()}</p>
              <p>{t('productWarrantyDescription')}</p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="tab-specs">
              {p.attributes && Object.keys(p.attributes).length > 0 ? (
                Object.entries(p.attributes).map(([key, val], i) => (
                  <div key={i} className="spec-row">
                    <span className="spec-label">{getAttrLabel(key)}</span>
                    <span className="spec-value">{getAttrValue(key, String(val))}</span>
                  </div>
                ))
              ) : (
                getSpecs().map((s, i) => (
                  <div key={i} className="spec-row">
                    <span className="spec-label">{t('feature')} {i + 1}</span>
                    <span className="spec-value">{s}</span>
                  </div>
                ))
              )}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="tab-reviews">
              {sampleReviews.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-header">
                    <div className="review-avatar">{r.name[0]}</div>
                    <div>
                      <div className="review-name">{r.name}</div>
                      <Stars rating={r.rating} size={12} />
                    </div>
                    <span className="review-date">{r.date}</span>
                  </div>
                  <p className="review-text">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <div className="section">
          <div className="section-inner">
            <h2 className="section-title">{t('relatedProducts')}</h2>
            <div className="products-grid">
              {related.map(r => (
                <ProductCard lang={lang} tb={tb} key={r.id} p={r} onSelect={onSelectProduct} onAddToCart={onAddToCart} onQuickView={onQuickView}
                  onToggleWishlist={onToggleWishlist} onToggleCompare={onToggleCompare}
                  isInWishlist={wishlist.includes(r.id)} isInCompare={compareList.includes(r.id)} t={t} formatPrice={formatPrice} featureFlags={featureFlags} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RECOMMENDED FOR YOU */}
      {ff('ff_recommended') && recommended.length > 0 && (
        <div className="section">
          <div className="section-inner">
            <h2 className="section-title">{t('recommendedForYou')}</h2>
            <div className="products-grid">
              {recommended.map(r => (
                <ProductCard lang={lang} tb={tb} key={r.id} p={r} onSelect={onSelectProduct} onAddToCart={onAddToCart} onQuickView={onQuickView}
                  onToggleWishlist={onToggleWishlist} onToggleCompare={onToggleCompare}
                  isInWishlist={wishlist.includes(r.id)} isInCompare={compareList.includes(r.id)} t={t} formatPrice={formatPrice} featureFlags={featureFlags} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RECENTLY VIEWED */}
      {ff('ff_recently_viewed') && recentFiltered.length > 0 && (
        <div className="section">
          <div className="section-inner">
            <h2 className="section-title">{t('recentlyViewed')}</h2>
            <div className="products-grid">
              {recentFiltered.map(r => (
                <ProductCard lang={lang} tb={tb} key={r.id} p={r} onSelect={onSelectProduct} onAddToCart={onAddToCart} onQuickView={onQuickView}
                  onToggleWishlist={onToggleWishlist} onToggleCompare={onToggleCompare}
                  isInWishlist={wishlist.includes(r.id)} isInCompare={compareList.includes(r.id)} t={t} formatPrice={formatPrice} featureFlags={featureFlags} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* IMAGE LIGHTBOX MODAL */}
      {showLightbox && !imgError && (
        <div className="lightbox-overlay" onClick={() => setShowLightbox(false)}
          onKeyDown={(e) => e.key === 'Escape' && setShowLightbox(false)} tabIndex={0} ref={(el) => el?.focus()}>
          <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); setShowLightbox(false); }}>✕</button>
          <img src={p.img} alt={getName()} className="lightbox-img" onClick={(e) => e.stopPropagation()} />
          <span className="lightbox-hint">{lang === 'ar' ? 'اضغط في أي مكان للإغلاق' : lang === 'it' ? 'Clicca ovunque per chiudere' : 'Click anywhere to close'}</span>
        </div>
      )}

      {/* STICKY ADD-TO-CART BAR */}
      {ff('ff_sticky_cart') && showStickyBar && (
        <div className="sticky-cart-bar">
          <div className="sticky-cart-inner">
            <div className="sticky-cart-info">
              <span className="sticky-cart-name">{getName().length > 30 ? getName().slice(0, 30) + '…' : getName()}</span>
              <span className="sticky-cart-price">{formatPrice ? formatPrice(p.price, p) : p.price}</span>
            </div>
            <button className="sticky-cart-btn" onClick={() => { for(let i = 0; i < qty; i++) onAddToCart(p); }}>
              <ShoppingBag size={16}/> {t('stickyCart.addToCart')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
