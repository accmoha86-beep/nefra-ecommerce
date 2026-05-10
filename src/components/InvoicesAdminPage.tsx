import React, { useState } from 'react';
import { Invoice, Page, Country } from '../types';

interface Props {
  invoicesData: Invoice[];
  countriesData: Country[];
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
}

export const InvoicesAdminPage: React.FC<Props> = ({lang,  invoicesData, countriesData, setPage, t }) => {
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filtered = invoicesData.filter(inv => 
    (filterCountry === 'all' || inv.country === filterCountry) &&
    (filterStatus === 'all' || inv.status === filterStatus)
  );

  const getCountry = (code: string) => countriesData.find(c => c.code === code);
  const getStatusColor = (s: string) => s === 'accepted' ? 'green' : s === 'sent' ? 'blue' : s === 'submitted' ? 'orange' : s === 'rejected' ? 'red' : 'gray';
  const getStatusIcon = (s: string) => s === 'accepted' ? '✅' : s === 'sent' ? '📨' : s === 'submitted' ? '⏳' : s === 'rejected' ? '❌' : '📝';

  const totalAmount = filtered.reduce((s, i) => s + i.total, 0);
  const totalTax = filtered.reduce((s, i) => s + i.tax, 0);

  if (selectedInvoice) {
    const country = getCountry(selectedInvoice.country);
    return (
      <div className="admin-page">
        <div className="admin-header">
          <div>
            <button className="btn-back" onClick={() => setSelectedInvoice(null)}>← {t('invoices.backToInvoices')}</button>
            <h1>📄 {t('invoices.invoice')} {selectedInvoice.id}</h1>
          </div>
          <div className="admin-actions">
            <span className={`status-badge ${getStatusColor(selectedInvoice.status)}`}>
              {getStatusIcon(selectedInvoice.status)} {selectedInvoice.status.toUpperCase()}
            </span>
            <button className="btn-secondary">📥 {t('invoices.download')} {selectedInvoice.format.toUpperCase()}</button>
            <button className="btn-secondary">📨 {t('invoices.resendToCustomer')}</button>
          </div>
        </div>

        <div className="admin-grid">
          <div className="admin-card">
            <h3>📋 {t('invoices.invoiceDetails')}</h3>
            <div className="invoice-details">
              <div className="inv-row"><span>{t('invoices.invoiceId')}:</span><strong>{selectedInvoice.id}</strong></div>
              <div className="inv-row"><span>{t('invoices.orderReference')}:</span><strong>{selectedInvoice.orderRef}</strong></div>
              <div className="inv-row"><span>{t('invoices.customer')}:</span><strong>{selectedInvoice.customer}</strong></div>
              <div className="inv-row"><span>{t('invoices.country')}:</span><strong>{country?.flag} {country?.name}</strong></div>
              <div className="inv-row"><span>{t('invoices.date')}:</span><strong>{selectedInvoice.date}</strong></div>
              <div className="inv-row"><span>{t('invoices.dueDate')}:</span><strong>{selectedInvoice.dueDate}</strong></div>
              <div className="inv-row"><span>{t('invoices.format')}:</span><strong>{selectedInvoice.format.toUpperCase()}</strong></div>
            </div>
          </div>
          <div className="admin-card">
            <h3>💰 {t('invoices.financialSummary')}</h3>
            <div className="invoice-details">
              <div className="inv-row"><span>{t('subtotal')}:</span><strong>{country?.currencySymbol} {selectedInvoice.amount.toLocaleString()}</strong></div>
              <div className="inv-row"><span>{t('tax')} ({country?.taxName} {country?.taxRate}%):</span><strong>{country?.currencySymbol} {selectedInvoice.tax.toLocaleString()}</strong></div>
              <div className="inv-row total"><span>{t('total')}:</span><strong>{country?.currencySymbol} {selectedInvoice.total.toLocaleString()}</strong></div>
            </div>
          </div>
          <div className="admin-card">
            <h3>📡 {t('invoices.submissionStatus')}</h3>
            <div className="submission-timeline">
              <div className="timeline-item done"><span className="tl-dot" /><span>{t('invoices.invoiceCreated')}</span><span className="tl-date">{selectedInvoice.date}</span></div>
              <div className={`timeline-item ${selectedInvoice.status !== 'draft' ? 'done' : ''}`}><span className="tl-dot" /><span>{t('invoices.sentToCustomer')}</span></div>
              {country?.invoiceFormat !== 'pdf' && (
                <>
                  <div className={`timeline-item ${selectedInvoice.status === 'submitted' || selectedInvoice.status === 'accepted' ? 'done' : selectedInvoice.status === 'rejected' ? 'error' : ''}`}>
                    <span className="tl-dot" /><span>{t('invoices.submittedTo')} {country?.taxName === 'IVA' ? 'SDI' : country?.code === 'EG' ? 'ETA' : 'ZATCA'}</span>
                  </div>
                  <div className={`timeline-item ${selectedInvoice.status === 'accepted' ? 'done' : selectedInvoice.status === 'rejected' ? 'error' : ''}`}>
                    <span className="tl-dot" /><span>{selectedInvoice.status === 'rejected' ? `❌ ${t('invoices.rejectedByAuthority')}` : `✅ ${t('invoices.acceptedByAuthority')}`}</span>
                  </div>
                </>
              )}
            </div>
            {selectedInvoice.status === 'rejected' && (
              <div className="legal-warning">⚠️ {t('invoices.rejectedWarning')} <button className="btn-sm">🔄 {t('invoices.resubmit')}</button></div>
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
          <h1>📄 {t('invoices.electronicInvoices')}</h1>
          <p className="admin-subtitle">{invoicesData.length} {t('invoices.invoicesCount')} — {t('invoices.multiFormat')}: PDF, XML (ZATCA/SDI), JSON (ETA)</p>
        </div>
        <div className="admin-actions">
          <button className="btn-secondary" onClick={() => setPage('tax')}>💰 {t('invoices.taxSettings')}</button>
          <button className="btn-secondary" onClick={() => setPage('countries')}>🌍 {t('countries')}</button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card"><span className="stat-icon">📄</span><div><strong>{filtered.length}</strong><span>{t('invoices.totalInvoices')}</span></div></div>
        <div className="stat-card"><span className="stat-icon">✅</span><div><strong>{filtered.filter(i => i.status === 'accepted').length}</strong><span>{t('invoices.accepted')}</span></div></div>
        <div className="stat-card"><span className="stat-icon">⏳</span><div><strong>{filtered.filter(i => i.status === 'submitted').length}</strong><span>{t('invoices.pending')}</span></div></div>
        <div className="stat-card"><span className="stat-icon">❌</span><div><strong>{filtered.filter(i => i.status === 'rejected').length}</strong><span>{t('invoices.rejected')}</span></div></div>
      </div>

      <div className="admin-card">
        <div className="filter-row">
          <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)}>
            <option value="all">🌍 {t('invoices.allCountries')}</option>
            {countriesData.filter(c => c.enabled).map(c => (
              <option key={c.code} value={c.code}>{c.flag} {lang === 'ar' ? (c.nameAr || c.name) : lang === 'it' ? (c.nameIt || c.name) : c.name}</option>
            ))}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">{t('invoices.allStatuses')}</option>
            <option value="draft">📝 {t('invoices.draft')}</option>
            <option value="sent">📨 {t('invoices.sent')}</option>
            <option value="submitted">⏳ {t('invoices.submitted')}</option>
            <option value="accepted">✅ {t('invoices.accepted')}</option>
            <option value="rejected">❌ {t('invoices.rejected')}</option>
          </select>
        </div>

        <table className="admin-table">
          <thead>
            <tr><th>{t('invoices.invoiceId')}</th><th>{t('invoices.customer')}</th><th>{t('invoices.country')}</th><th>{t('invoices.amount')}</th><th>{t('tax')}</th><th>{t('total')}</th><th>{t('invoices.format')}</th><th>{t('status')}</th><th>{t('actions')}</th></tr>
          </thead>
          <tbody>
            {filtered.map(inv => {
              const c = getCountry(inv.country);
              return (
                <tr key={inv.id}>
                  <td><strong>{inv.id}</strong><br /><small>{inv.date}</small></td>
                  <td>{inv.customer}</td>
                  <td>{c?.flag} {c?.code}</td>
                  <td>{c?.currencySymbol} {inv.amount.toLocaleString()}</td>
                  <td>{c?.currencySymbol} {inv.tax.toLocaleString()}</td>
                  <td><strong>{c?.currencySymbol} {inv.total.toLocaleString()}</strong></td>
                  <td><span className="type-badge">{inv.format.toUpperCase()}</span></td>
                  <td><span className={`status-badge ${getStatusColor(inv.status)}`}>{getStatusIcon(inv.status)} {inv.status}</span></td>
                  <td><button className="btn-sm" onClick={() => setSelectedInvoice(inv)}>{t('invoices.view')}</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
