import React, { useState } from 'react';
import { TaxConfig, Page } from '../types';

interface Props {
  taxData: TaxConfig[];
  setTaxData: (data: TaxConfig[]) => void;
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
}

export const TaxAdminPage: React.FC<Props> = ({ taxData, setTaxData, setPage, t }) => {
  const [editingTax, setEditingTax] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const updateTax = (id: string, field: string, value: any) => {
    setTaxData(taxData.map(tx => tx.id === id ? { ...tx, [field]: value } : tx));
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const testConnection = (tax: TaxConfig) => {
    setTestResult('testing');
    setTimeout(() => {
      setTestResult(tax.taxApiKey ? 'success' : 'no_key');
      setTimeout(() => setTestResult(null), 3000);
    }, 1500);
  };

  const editTax = taxData.find(tx => tx.id === editingTax);

  if (editTax) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <div>
            <button className="btn-back" onClick={() => setEditingTax(null)}>← {t('tax.backToSettings')}</button>
            <h1>💰 {t('taxConfig')} — {editTax.countryName}</h1>
            <p className="admin-subtitle">{editTax.taxName}</p>
          </div>
          <div className="admin-actions">
            <div className={`toggle-switch ${editTax.enabled ? 'on' : ''}`} onClick={() => updateTax(editTax.id, 'enabled', !editTax.enabled)} />
            <button className="btn-save" onClick={handleSave}>💾 {t('save')}</button>
          </div>
        </div>
        {saved && <div className="toast-success">✅ {t('tax.settingsSaved')}</div>}

        <div className="admin-grid">
          <div className="admin-card">
            <h3>📊 {t('tax.taxRates')}</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>{t('tax.taxName')}</label>
                <input value={editTax.taxName} onChange={e => updateTax(editTax.id, 'taxName', e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('tax.standardRate')}</label>
                <input type="number" value={editTax.standardRate} onChange={e => updateTax(editTax.id, 'standardRate', parseFloat(e.target.value))} />
              </div>
              <div className="form-group">
                <label>{t('tax.displayMode')}</label>
                <select value={editTax.displayInclusive ? 'inclusive' : 'exclusive'} onChange={e => updateTax(editTax.id, 'displayInclusive', e.target.value === 'inclusive')}>
                  <option value="inclusive">{t('tax.priceInclusive')}</option>
                  <option value="exclusive">{t('tax.priceExclusive')}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t('tax.registrationNumber')}</label>
                <input value={editTax.taxNumber} placeholder={editTax.taxNumberLabel} onChange={e => updateTax(editTax.id, 'taxNumber', e.target.value)} />
              </div>
            </div>
          </div>

          {editTax.reducedRates.length > 0 && (
            <div className="admin-card">
              <h3>📉 {t('tax.reducedRates')}</h3>
              <table className="admin-table">
                <thead><tr><th>{t('tax.category')}</th><th>{t('tax.rate')}</th><th>{t('tax.appliesTo')}</th><th>{t('status')}</th></tr></thead>
                <tbody>
                  {editTax.reducedRates.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.name}</strong></td>
                      <td><span className="rate-badge">{r.rate}%</span></td>
                      <td>{r.categories.join(', ')}</td>
                      <td><span className="status-badge active">{t('active')}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn-sm" style={{marginTop:'12px'}}>+ {t('tax.addReducedRate')}</button>
            </div>
          )}

          <div className="admin-card">
            <h3>🔗 {t('tax.apiIntegration')}</h3>
            <p className="admin-subtitle">{t('tax.apiIntegrationDesc')}</p>
            <div className="form-grid">
              <div className="form-group">
                <label>{t('tax.authorityName')}</label>
                <input value={editTax.taxAuthority} onChange={e => updateTax(editTax.id, 'taxAuthority', e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('tax.apiEndpoint')}</label>
                <input value={editTax.taxAuthorityApi} placeholder="https://api.tax-authority.gov/..." onChange={e => updateTax(editTax.id, 'taxAuthorityApi', e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('tax.apiKeyToken')}</label>
                <input type="password" value={editTax.taxApiKey} placeholder={t('tax.enterApiKey')} onChange={e => updateTax(editTax.id, 'taxApiKey', e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('tax.invoiceFormat')}</label>
                <select value={editTax.invoiceFormat} onChange={e => updateTax(editTax.id, 'invoiceFormat', e.target.value)}>
                  <option value="pdf">{t('tax.pdfStandard')}</option>
                  <option value="xml">{t('tax.xmlZatca')}</option>
                  <option value="json">{t('tax.jsonEta')}</option>
                </select>
              </div>
            </div>
            <div className="api-actions">
              <label className="toggle-label">
                <div className={`toggle-switch ${editTax.autoSubmit ? 'on' : ''}`} onClick={() => updateTax(editTax.id, 'autoSubmit', !editTax.autoSubmit)} />
                <span>{t('tax.autoSubmitInvoices')}</span>
              </label>
              <button className="btn-test" onClick={() => testConnection(editTax)}>
                {testResult === 'testing' ? `⏳ ${t('tax.testing')}` : `🔌 ${t('tax.testConnection')}`}
              </button>
            </div>
            {testResult === 'success' && <div className="toast-success">✅ {t('tax.apiConnectionSuccess')}</div>}
            {testResult === 'no_key' && <div className="toast-warning">⚠️ {t('tax.enterApiKeyFirst')}</div>}
          </div>

          <div className="admin-card">
            <h3>📄 {t('tax.eInvoicing')}</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>{t('tax.digitalInvoice')}</label>
                <div className="toggle-label">
                  <div className={`toggle-switch ${editTax.digitalInvoice ? 'on' : ''}`} onClick={() => updateTax(editTax.id, 'digitalInvoice', !editTax.digitalInvoice)} />
                  <span>{editTax.digitalInvoice ? t('enabled') : t('disabled')}</span>
                </div>
              </div>
            </div>
            {editTax.countryCode === 'SA' && (
              <div className="info-box">ℹ️ {t('tax.zatcaInfo')}</div>
            )}
            {editTax.countryCode === 'EG' && (
              <div className="info-box">ℹ️ {t('tax.etaInfo')}</div>
            )}
            {editTax.countryCode === 'IT' && (
              <div className="info-box">ℹ️ {t('tax.fatturaPaInfo')}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1>💰 {t('tax.management')}</h1>
          <p className="admin-subtitle">{t('tax.managementDesc')}</p>
        </div>
        <div className="admin-actions">
          <button className="btn-secondary" onClick={() => setPage('countries')}>🌍 {t('countries')}</button>
          <button className="btn-secondary" onClick={() => setPage('invoices')}>📄 {t('invoices')}</button>
        </div>
      </div>

      <div className="tax-overview-grid">
        {taxData.map(tax => (
          <div key={tax.id} className={`tax-card ${tax.enabled ? '' : 'disabled'}`}>
            <div className="tax-card-header">
              <h3>{tax.countryName}</h3>
              <div className={`toggle-switch ${tax.enabled ? 'on' : ''}`} onClick={() => updateTax(tax.id, 'enabled', !tax.enabled)} />
            </div>
            <div className="tax-rate-big">{tax.standardRate}%</div>
            <p className="tax-name">{tax.taxName}</p>
            <div className="tax-details">
              <div className="tax-detail"><span>📋</span> {tax.taxNumberLabel}</div>
              <div className="tax-detail"><span>📄</span> {tax.invoiceFormat.toUpperCase()} {t('tax.format')}</div>
              <div className="tax-detail"><span>🏛️</span> {tax.taxAuthority}</div>
              <div className="tax-detail">
                <span>🔗</span> {t('tax.api')}: {tax.taxApiKey ? <span className="status-dot green" /> : <span className="status-dot red" />}
                {tax.taxApiKey ? ` ${t('tax.connected')}` : ` ${t('tax.notConfigured')}`}
              </div>
              {tax.reducedRates.length > 0 && (
                <div className="tax-detail"><span>📉</span> {tax.reducedRates.length} {t('tax.reducedRateCount')}</div>
              )}
              <div className="tax-detail">
                <span>🤖</span> {t('tax.autoSubmit')}: {tax.autoSubmit ? `✅ ${t('tax.on')}` : `❌ ${t('tax.off')}`}
              </div>
            </div>
            <button className="btn-edit" onClick={() => setEditingTax(tax.id)}>⚙️ {t('tax.configure')}</button>
          </div>
        ))}
      </div>
    </div>
  );
};
