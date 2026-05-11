import React, { useState } from 'react';
import { Country, Page } from '../types';

interface Props { 
  countriesData: Country[]; 
  setCountriesData: (c: Country[]) => void;
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
}

export const CountriesAdminPage: React.FC<Props> = ({ countriesData, setCountriesData, setPage, t }) => {
  const [editingCountry, setEditingCountry] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<'overview' | 'address' | 'shipping' | 'payment' | 'paymentDetails' | 'legal'>('overview');

  const toggleCountry = (code: string) => {
    setCountriesData(countriesData.map(c => c.code === code ? { ...c, enabled: !c.enabled } : c));
  };

  const setDefault = (code: string) => {
    setCountriesData(countriesData.map(c => ({ ...c, isDefault: c.code === code })));
  };

  const updateField = (code: string, field: string, value: any) => {
    setCountriesData(countriesData.map(c => c.code === code ? { ...c, [field]: value } : c));
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const editCountry = countriesData.find(c => c.code === editingCountry);

  if (editCountry) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <div>
            <button className="btn-back" onClick={() => setEditingCountry(null)}>← {t('countries.backToCountries')}</button>
            <h1>{editCountry.flag} {editCountry.name} {t('storeSettings')}</h1>
            <p className="admin-subtitle">{t('countries.database')}: <strong>{editCountry.dbName}</strong></p>
          </div>
          <div className="admin-actions">
            <span className={`status-badge ${editCountry.enabled ? 'active' : 'inactive'}`}>
              {editCountry.enabled ? `● ${t('active')}` : `○ ${t('inactive')}`}
            </span>
            <button className="btn-save" onClick={handleSave}>💾 {t('saveChanges')}</button>
          </div>
        </div>
        {saved && <div className="toast-success">✅ {t('countries.changesSaved')}</div>}

        <div className="detail-tabs">
          {(['overview','address','shipping','payment','paymentDetails','legal'] as const).map(tb => (
            <button key={tb} className={`detail-tab ${tab === tb ? 'active' : ''}`} onClick={() => setTab(tb)}>
              {tb === 'overview' ? `⚙️ ${t('countries.general')}` : tb === 'address' ? `📍 ${t('countries.addressFormat')}` : tb === 'shipping' ? `🚚 ${t('countries.shipping')}` : tb === 'payment' ? `💳 ${t('countries.payment')}` : tb === 'paymentDetails' ? `🏦 Payment Details` : `⚖️ ${t('countries.legal')}`}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="admin-grid">
            <div className="admin-card">
              <h3>🌐 {t('countries.basicInfo')}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('countries.countryNameEN')}</label>
                  <input value={editCountry.name} onChange={e => updateField(editCountry.code, 'name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>الاسم بالعربي</label>
                  <input value={editCountry.nameAr} onChange={e => updateField(editCountry.code, 'nameAr', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('nameInItalian')}</label>
                  <input value={editCountry.nameIt} onChange={e => updateField(editCountry.code, 'nameIt', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('countries.phoneCode')}</label>
                  <input value={editCountry.phone} onChange={e => updateField(editCountry.code, 'phone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('countries.timezone')}</label>
                  <input value={editCountry.timezone} onChange={e => updateField(editCountry.code, 'timezone', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('countries.defaultLanguage')}</label>
                  <select value={editCountry.defaultLanguage} onChange={e => updateField(editCountry.code, 'defaultLanguage', e.target.value)}>
                    {editCountry.languages.map(l => <option key={l} value={l}>{l === 'ar' ? 'العربية' : l === 'en' ? 'English' : 'Italiano'}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="admin-card">
              <h3>💰 {t('countries.currencyAndTax')}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('countries.currency')}</label>
                  <input value={editCountry.currency} onChange={e => updateField(editCountry.code, 'currency', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('countries.symbol')}</label>
                  <input value={editCountry.currencySymbol} onChange={e => updateField(editCountry.code, 'currencySymbol', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('countries.exchangeRate')}</label>
                  <input type="number" step="0.001" value={editCountry.exchangeRate} onChange={e => updateField(editCountry.code, 'exchangeRate', parseFloat(e.target.value))} />
                </div>
                <div className="form-group">
                  <label>{t('countries.taxRatePercent')}</label>
                  <input type="number" value={editCountry.taxRate} onChange={e => updateField(editCountry.code, 'taxRate', parseFloat(e.target.value))} />
                </div>
                <div className="form-group">
                  <label>{t('countries.taxName')}</label>
                  <input value={editCountry.taxName} onChange={e => updateField(editCountry.code, 'taxName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t('countries.invoiceFormat')}</label>
                  <select value={editCountry.invoiceFormat} onChange={e => updateField(editCountry.code, 'invoiceFormat', e.target.value)}>
                    <option value="pdf">PDF</option>
                    <option value="xml">XML (ZATCA/SDI)</option>
                    <option value="json">JSON (ETA)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="admin-card">
              <h3>🗄️ {t('countries.database')}</h3>
              <div className="db-info">
                <div className="db-status">
                  <span className="db-icon">🗄️</span>
                  <div>
                    <strong>{editCountry.dbName}</strong>
                    <p>{t('countries.isolatedDatabaseFor')} {editCountry.name}</p>
                  </div>
                  <span className="status-badge active">● {t('countries.connected')}</span>
                </div>
                <div className="db-stats">
                  <div className="db-stat"><span>{t('countries.customers')}</span><strong>{Math.floor(Math.random() * 5000 + 500)}</strong></div>
                  <div className="db-stat"><span>{t('countries.orders')}</span><strong>{Math.floor(Math.random() * 2000 + 200)}</strong></div>
                  <div className="db-stat"><span>{t('countries.products')}</span><strong>{editCountry.code === 'IT' ? 10 : 12}</strong></div>
                  <div className="db-stat"><span>{t('countries.size')}</span><strong>{Math.floor(Math.random() * 500 + 100)} MB</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'address' && (
          <div className="admin-card">
            <h3>📍 {t('countries.addressFormFieldsFor')} {editCountry.name}</h3>
            <p className="admin-subtitle">{t('countries.addressFieldsDescription')}</p>
            <table className="admin-table">
              <thead><tr><th>{t('countries.field')}</th><th>{t('countries.labelEN')}</th><th>{t('countries.labelAR')}</th><th>{t('countries.labelIT')}</th><th>{t('countries.type')}</th><th>{t('countries.required')}</th></tr></thead>
              <tbody>
                {editCountry.addressFields.map((f, i) => (
                  <tr key={i}>
                    <td><code>{f.key}</code></td>
                    <td>{f.label}</td>
                    <td style={{direction:'rtl'}}>{f.labelAr}</td>
                    <td>{f.labelIt}</td>
                    <td><span className="type-badge">{f.type}</span></td>
                    <td>{f.required ? '✅' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'shipping' && (
          <div className="admin-grid">
            <div className="admin-card">
              <h3>🚚 {t('countries.shippingSettings')}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('countries.baseShippingCost')} ({editCountry.currencySymbol})</label>
                  <input type="number" value={editCountry.shippingCost} onChange={e => updateField(editCountry.code, 'shippingCost', parseFloat(e.target.value))} />
                </div>
                <div className="form-group">
                  <label>{t('countries.freeShippingAbove')} ({editCountry.currencySymbol})</label>
                  <input type="number" value={editCountry.freeShippingMin} onChange={e => updateField(editCountry.code, 'freeShippingMin', parseFloat(e.target.value))} />
                </div>
              </div>
            </div>
            <div className="admin-card">
              <h3>📦 {t('countries.shippingCompanies')}</h3>
              <div className="chip-list">
                {editCountry.shippingCompanies.map((sc, i) => (
                  <span key={i} className="chip active">{sc} ✕</span>
                ))}
                <button className="chip add-chip">+ {t('countries.addCompany')}</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'payment' && (
          <div className="admin-card">
            <h3>💳 {t('countries.paymentMethodsFor')} {editCountry.name}</h3>
            <p className="admin-subtitle">{t('countries.paymentMethodsDescription')}</p>
            <div className="payment-methods-grid">
              {editCountry.paymentMethods.map((pm, i) => (
                <div key={i} className="payment-method-card active">
                  <div className="pm-icon">{pm.includes('Visa') ? '💳' : pm.includes('Apple') ? '🍎' : pm.includes('Cash') ? '💵' : pm.includes('PayPal') ? '🅿️' : pm.includes('Fawry') ? '🏪' : pm.includes('Vodafone') ? '📱' : '💰'}</div>
                  <span>{pm}</span>
                  <div className="toggle-switch on" />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'paymentDetails' && (
          <div className="admin-grid">
            <div className="admin-card">
              <h3>📱 WhatsApp & COD</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>WhatsApp Number</label>
                  <input value={editCountry.whatsappNumber || ''} onChange={e => updateField(editCountry.code, 'whatsappNumber', e.target.value)} placeholder="e.g. 201000000000" />
                </div>
                <div className="form-group">
                  <label>COD Fee %</label>
                  <input type="number" step="0.5" value={editCountry.codFeePercent ?? 2} onChange={e => updateField(editCountry.code, 'codFeePercent', parseFloat(e.target.value) || 0)} />
                </div>
              </div>
            </div>
            {editCountry.paymentMethods.some(pm => pm === 'InstaPay') && (
              <div className="admin-card">
                <h3>📲 InstaPay Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>IPA Address</label>
                    <input value={editCountry.paymentAccountDetails?.instapay?.ipaAddress || ''} onChange={e => {
                      const pad = { ...(editCountry.paymentAccountDetails || {}), instapay: { ...(editCountry.paymentAccountDetails?.instapay || {}), ipaAddress: e.target.value } };
                      updateField(editCountry.code, 'paymentAccountDetails', pad);
                    }} placeholder="nefra@instapay" />
                  </div>
                </div>
              </div>
            )}
            {editCountry.paymentMethods.some(pm => pm === 'Bank Transfer') && (
              <div className="admin-card">
                <h3>🏦 Bank Transfer Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Bank Name</label>
                    <input value={editCountry.paymentAccountDetails?.bankTransfer?.bankName || ''} onChange={e => {
                      const pad = { ...(editCountry.paymentAccountDetails || {}), bankTransfer: { ...(editCountry.paymentAccountDetails?.bankTransfer || {}), bankName: e.target.value } };
                      updateField(editCountry.code, 'paymentAccountDetails', pad);
                    }} />
                  </div>
                  <div className="form-group">
                    <label>Account Name</label>
                    <input value={editCountry.paymentAccountDetails?.bankTransfer?.accountName || ''} onChange={e => {
                      const pad = { ...(editCountry.paymentAccountDetails || {}), bankTransfer: { ...(editCountry.paymentAccountDetails?.bankTransfer || {}), accountName: e.target.value } };
                      updateField(editCountry.code, 'paymentAccountDetails', pad);
                    }} />
                  </div>
                  <div className="form-group">
                    <label>Account Number</label>
                    <input value={editCountry.paymentAccountDetails?.bankTransfer?.accountNumber || ''} onChange={e => {
                      const pad = { ...(editCountry.paymentAccountDetails || {}), bankTransfer: { ...(editCountry.paymentAccountDetails?.bankTransfer || {}), accountNumber: e.target.value } };
                      updateField(editCountry.code, 'paymentAccountDetails', pad);
                    }} />
                  </div>
                  <div className="form-group">
                    <label>IBAN</label>
                    <input value={editCountry.paymentAccountDetails?.bankTransfer?.iban || ''} onChange={e => {
                      const pad = { ...(editCountry.paymentAccountDetails || {}), bankTransfer: { ...(editCountry.paymentAccountDetails?.bankTransfer || {}), iban: e.target.value } };
                      updateField(editCountry.code, 'paymentAccountDetails', pad);
                    }} />
                  </div>
                </div>
              </div>
            )}
            {editCountry.paymentMethods.some(pm => pm === 'Vodafone Cash') && (
              <div className="admin-card">
                <h3>📱 Vodafone Cash Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input value={editCountry.paymentAccountDetails?.vodafoneCash?.phoneNumber || ''} onChange={e => {
                      const pad = { ...(editCountry.paymentAccountDetails || {}), vodafoneCash: { ...(editCountry.paymentAccountDetails?.vodafoneCash || {}), phoneNumber: e.target.value } };
                      updateField(editCountry.code, 'paymentAccountDetails', pad);
                    }} placeholder="010 XXXX XXXX" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'legal' && (
          <div className="admin-card">
            <h3>⚖️ {t('countries.legalRequirements')} — {editCountry.name}</h3>
            <div className="legal-list">
              {editCountry.legalRequirements.map((req, i) => (
                <div key={i} className="legal-item">
                  <span className="legal-icon">📋</span>
                  <span>{req}</span>
                  <span className="status-badge active">✅ {t('countries.compliant')}</span>
                </div>
              ))}
            </div>
            {editCountry.code === 'IT' && (
              <div className="legal-warning">
                ⚠️ <strong>{t('countries.gdprNotice')}:</strong> {t('countries.gdprDescription')} 
                {t('countries.dataStoredIn')} <code>{editCountry.dbName}</code>.
                {t('countries.gdprRequirements')}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>🌍 {t('countries.countryManagement')}</h1>
          <p className="admin-subtitle">{countriesData.filter(c => c.enabled).length} {t('countries.activeCountries')} — {t('countries.eachWithOwnDatabase')}</p>
        </div>
        <div className="admin-actions">
          <button className="btn-secondary" onClick={() => setPage('tax')}>💰 {t('countries.taxSettings')}</button>
          <button className="btn-secondary" onClick={() => setPage('invoices')}>📄 {t('invoices')}</button>
          <button className="btn-secondary" onClick={() => setPage('languages')}>🌐 {t('languages')}</button>
        </div>
      </div>

      <div className="countries-grid">
        {countriesData.map(country => (
          <div key={country.code} className={`country-card ${country.enabled ? '' : 'disabled'} ${country.isDefault ? 'default' : ''}`}>
            <div className="country-card-header">
              <span className="country-flag-big">{country.flag}</span>
              <div className="toggle-switch-container">
                <div className={`toggle-switch ${country.enabled ? 'on' : ''}`} onClick={() => toggleCountry(country.code)} />
              </div>
            </div>
            <h3>{country.name}</h3>
            <p className="country-name-ar">{country.nameAr}</p>
            <div className="country-details">
              <div className="country-detail"><span>💰</span><span>{country.currency} ({country.currencySymbol})</span></div>
              <div className="country-detail"><span>📊</span><span>{country.taxName} {country.taxRate}%</span></div>
              <div className="country-detail"><span>🗄️</span><span>{country.dbName}</span></div>
              <div className="country-detail"><span>🌐</span><span>{country.languages.join(', ').toUpperCase()}</span></div>
              <div className="country-detail"><span>🚚</span><span>{country.shippingCompanies.length} {t('countries.carriers')}</span></div>
              <div className="country-detail"><span>💳</span><span>{country.paymentMethods.length} {t('countries.methods')}</span></div>
            </div>
            <div className="country-card-actions">
              {country.isDefault ? (
                <span className="default-badge">⭐ {t('countries.defaultCountry')}</span>
              ) : country.enabled ? (
                <button className="btn-sm" onClick={() => setDefault(country.code)}>{t('countries.setAsDefault')}</button>
              ) : null}
              <button className="btn-edit" onClick={() => { setEditingCountry(country.code); setTab('overview'); }}>⚙️ {t('storeSettings')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
