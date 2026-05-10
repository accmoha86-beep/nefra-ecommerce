import React, { useState } from 'react';
import { Language, Page, Translations } from '../types';

interface Props {
  languagesData: Language[];
  setLanguagesData: (l: Language[]) => void;
  translationsData: Record<string, Translations>;
  setTranslationsData: (t: Record<string, Translations>) => void;
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
}

export const LanguagesAdminPage: React.FC<Props> = ({ languagesData, setLanguagesData, translationsData, setTranslationsData, setPage, t }) => {
  const [editingLang, setEditingLang] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [searchTrans, setSearchTrans] = useState('');

  const toggleLanguage = (code: string) => {
    setLanguagesData(languagesData.map(l => l.code === code ? { ...l, enabled: !l.enabled } : l));
  };

  const setDefault = (code: string) => {
    setLanguagesData(languagesData.map(l => ({ ...l, isDefault: l.code === code })));
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const updateTranslation = (lang: string, key: string, value: string) => {
    setTranslationsData({
      ...translationsData,
      [lang]: { ...translationsData[lang], [key]: value }
    });
  };

  const editLang = languagesData.find(l => l.code === editingLang);

  if (editLang && translationsData[editLang.code]) {
    const trans = translationsData[editLang.code];
    const keys = Object.keys(trans) as string[];
    const filteredKeys = searchTrans ? keys.filter(k => k.toLowerCase().includes(searchTrans.toLowerCase()) || trans[k].toLowerCase().includes(searchTrans.toLowerCase())) : keys;

    const categoryLabels: Record<string, string> = {
      'Homepage': t('languages.catHomepage'),
      'Shop': t('languages.catShop'),
      'Cart & Checkout': t('languages.catCartCheckout'),
      'Account': t('languages.catAccount'),
      'Empty States': t('languages.catEmptyStates'),
      'General': t('languages.catGeneral'),
    };

    const categories: Record<string, string[]> = {};
    filteredKeys.forEach(k => {
      const cat = k.startsWith('hero') || k.startsWith('trust') ? 'Homepage' :
        k.startsWith('filter') || k.startsWith('sort') ? 'Shop' :
        ['cart','checkout','subtotal','total','shipping','tax','placeOrder','orderSummary','paymentMethod','shippingAddress'].includes(k) ? 'Cart & Checkout' :
        ['signIn','signUp','signOut','email','password','phone','name','address','city','country'].includes(k) ? 'Account' :
        ['empty' + k.charAt(0).toUpperCase() + k.slice(1)].some(x => k.startsWith('empty')) || k.startsWith('no') ? 'Empty States' :
        'General';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(k);
    });

    return (
      <div className="admin-page">
        <div className="admin-header">
          <div>
            <button className="btn-back" onClick={() => setEditingLang(null)}>← {t('languages.backToLanguages')}</button>
            <h1>{editLang.flag} {editLang.nativeName} — {t('languages.translations')}</h1>
            <p className="admin-subtitle">{keys.length} {t('languages.translationKeys')}</p>
          </div>
          <div className="admin-actions">
            <button className="btn-save" onClick={handleSave}>💾 {t('languages.saveTranslations')}</button>
          </div>
        </div>
        {saved && <div className="toast-success">✅ {t('languages.translationsSaved')}</div>}

        <div className="admin-card">
          <div className="search-box">
            <input placeholder={`🔍 ${t('languages.searchTranslations')}`} value={searchTrans} onChange={e => setSearchTrans(e.target.value)} />
          </div>
          {Object.entries(categories).map(([cat, catKeys]) => (
            <div key={cat} className="trans-category">
              <h3 className="trans-cat-title">{categoryLabels[cat] || cat} ({catKeys.length})</h3>
              <div className="trans-grid">
                {catKeys.map(k => (
                  <div key={k} className="trans-row">
                    <label className="trans-key">{k}</label>
                    <input className="trans-input" value={trans[k]} onChange={e => updateTranslation(editLang.code, k, e.target.value)}
                      dir={editLang.direction} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>🌐 {t('languages.languageManagement')}</h1>
          <p className="admin-subtitle">{languagesData.filter(l => l.enabled).length} {t('languages.activeLanguagesSubtitle')}</p>
        </div>
        <div className="admin-actions">
          <button className="btn-secondary" onClick={() => setPage('countries')}>🌍 {t('countries')}</button>
          <button className="btn-primary">+ {t('languages.addLanguage')}</button>
        </div>
      </div>

      <div className="languages-grid">
        {languagesData.map(lang => (
          <div key={lang.code} className={`language-card ${lang.enabled ? '' : 'disabled'}`}>
            <div className="lang-card-header">
              <span className="lang-flag-big">{lang.flag}</span>
              <div className={`toggle-switch ${lang.enabled ? 'on' : ''}`} onClick={() => toggleLanguage(lang.code)} />
            </div>
            <h3>{lang.nativeName}</h3>
            <p className="lang-name-en">{lang.name}</p>
            <div className="lang-details">
              <div className="lang-detail"><span>🔤</span> {t('languages.code')}: <strong>{lang.code.toUpperCase()}</strong></div>
              <div className="lang-detail"><span>{lang.direction === 'rtl' ? '⬅️' : '➡️'}</span> {t('languages.direction')}: <strong>{lang.direction.toUpperCase()}</strong></div>
              <div className="lang-detail"><span>📝</span> {translationsData[lang.code] ? Object.keys(translationsData[lang.code]).length : 0} {t('languages.translations')}</div>
            </div>
            <div className="lang-card-actions">
              {lang.isDefault ? (
                <span className="default-badge">⭐ {t('languages.default')}</span>
              ) : lang.enabled ? (
                <button className="btn-sm" onClick={() => setDefault(lang.code)}>{t('languages.setDefault')}</button>
              ) : null}
              <button className="btn-edit" onClick={() => setEditingLang(lang.code)}>✏️ {t('languages.editTranslations')}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card" style={{marginTop:'24px'}}>
        <h3>📊 {t('languages.translationCoverage')}</h3>
        <div className="coverage-grid">
          {languagesData.filter(l => l.enabled).map(lang => {
            const langTrans = translationsData[lang.code] as Record<string, string> | undefined;
            const total = langTrans ? Object.keys(langTrans).length : 0;
            const filled = langTrans ? Object.values(langTrans).filter((v: string) => v && v.length > 0).length : 0;
            const pct = total > 0 ? Math.round((filled / total) * 100) : 0;
            return (
              <div key={lang.code} className="coverage-item">
                <div className="coverage-header">
                  <span>{lang.flag} {lang.nativeName}</span>
                  <strong>{pct}%</strong>
                </div>
                <div className="coverage-bar"><div className="coverage-fill" style={{width:`${pct}%`}} /></div>
                <small>{filled}/{total} {t('languages.keysTranslated')}</small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
