import React, { useState } from 'react';
import { Sliders, Search, ToggleLeft, ToggleRight, Shield, Filter, Clock, ChevronDown, ChevronRight, Check, X, Package, Eye, ShoppingCart, Globe, Zap, Palette, Bell, CreditCard, Truck } from 'lucide-react';
import { FeatureFlag, Page } from '../types';
import { featureFlags as initialFlags } from '../data';

interface FeatureFlagsPageProps {
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
  tff: (name: string) => string;
  tffd: (desc: string) => string;
  tffc: (cat: string) => string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Products': <Package size={16}/>,
  'UI & Display': <Eye size={16}/>,
  'Cart & Checkout': <ShoppingCart size={16}/>,
  'Localization': <Globe size={16}/>,
  'Marketing': <Zap size={16}/>,
  'Engagement': <Bell size={16}/>,
  'Payments': <CreditCard size={16}/>,
  'Shipping': <Truck size={16}/>,
  'Appearance': <Palette size={16}/>,
  'Security': <Shield size={16}/>,
};

export const FeatureFlagsPage: React.FC<FeatureFlagsPageProps> = ({ setPage, t, tff, tffd, tffc }) => {
  const [flags, setFlags] = useState<FeatureFlag[]>(initialFlags);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [auditLog, setAuditLog] = useState<{ flag: string; action: string; time: string }[]>([]);

  const flagCategories: string[] = Array.from(new Set(flags.map(f => f.category)));

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  };

  const expandAll = () => setExpandedCategories(new Set(flagCategories));
  const collapseAll = () => setExpandedCategories(new Set());

  const toggleFlag = (id: string) => {
    setFlags(prev => prev.map(f => {
      if (f.id === id) {
        const newState = !f.enabled;
        setAuditLog(log => [{ flag: f.name, action: newState ? t('enabled') : t('disabled'), time: t('justNow') }, ...log]);
        return { ...f, enabled: newState };
      }
      return f;
    }));
  };

  const enableAll = () => {
    setFlags(prev => prev.map(f => ({ ...f, enabled: true })));
    setAuditLog(log => [{ flag: t('allFeatures'), action: t('enabled'), time: t('justNow') }, ...log]);
  };

  const disableAll = () => {
    setFlags(prev => prev.map(f => ({ ...f, enabled: false })));
    setAuditLog(log => [{ flag: t('allFeatures'), action: t('disabled'), time: t('justNow') }, ...log]);
  };

  const toggleCategoryFlags = (cat: string, enable: boolean) => {
    setFlags(prev => prev.map(f => f.category === cat ? { ...f, enabled: enable } : f));
    setAuditLog(log => [{ flag: cat, action: enable ? t('enabled') : t('disabled'), time: t('justNow') }, ...log]);
  };

  const filtered = flags.filter(f => {
    if (categoryFilter !== 'All' && f.category !== categoryFilter) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const grouped: Record<string, FeatureFlag[]> = {};
  flagCategories.forEach(cat => {
    const catFlags = filtered.filter(f => f.category === cat);
    if (catFlags.length > 0) grouped[cat] = catFlags;
  });

  const totalEnabled = flags.filter(f => f.enabled).length;
  const totalDisabled = flags.filter(f => !f.enabled).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title"><Sliders size={24}/> {t('featureFlags')}</h1>
          <p className="page-subtitle">{flags.length} {t('flagsTotal')}</p>
        </div>
        <div className="page-actions">
          <button className="btn-outline" onClick={() => setPage('dash')}>← {t('dashboard')}</button>
        </div>
      </div>

      {/* Compact Stats Bar */}
      <div className="ff-stats-bar">
        <div className="ff-stat ff-stat-on"><ToggleRight size={16}/> <strong>{totalEnabled}</strong> {t('enabled')}</div>
        <div className="ff-stat ff-stat-off"><ToggleLeft size={16}/> <strong>{totalDisabled}</strong> {t('disabled')}</div>
        <div className="ff-stat ff-stat-total"><Sliders size={16}/> <strong>{flags.length}</strong> {t('totalFlags')}</div>
        <div className="ff-actions-bar">
          <button className="ff-btn-sm ff-btn-green" onClick={enableAll}><Check size={12}/> {t('enableAll')}</button>
          <button className="ff-btn-sm ff-btn-red" onClick={disableAll}><X size={12}/> {t('disableAll')}</button>
          <button className="ff-btn-sm ff-btn-ghost" onClick={expandAll}>▾ {t('expandAll') || 'فتح الكل'}</button>
          <button className="ff-btn-sm ff-btn-ghost" onClick={collapseAll}>▸ {t('collapseAll') || 'إغلاق الكل'}</button>
          <button className="ff-btn-sm ff-btn-ghost" onClick={() => setShowAuditLog(!showAuditLog)}>
            <Clock size={12}/> {t('auditLog')} {auditLog.length > 0 && `(${auditLog.length})`}
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="ff-toolbar">
        <div className="ff-search">
          <Search size={14}/>
          <input placeholder={t('searchFlags')} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="ff-filter-select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="All">{t('allCategories')}</option>
          {flagCategories.map(c => <option key={c} value={c}>{t(c)}</option>)}
        </select>
      </div>

      {/* Audit Log */}
      {showAuditLog && auditLog.length > 0 && (
        <div className="ff-audit">
          <h4><Clock size={14}/> {t('recentChanges')}</h4>
          {auditLog.slice(0, 8).map((entry, i) => (
            <div key={i} className="ff-audit-item">
              <span className={`ff-audit-badge ${entry.action === t('enabled') ? 'on' : 'off'}`}>{entry.action}</span>
              <span>{entry.flag}</span>
              <span className="ff-audit-time">{entry.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* Category Accordion Grid */}
      <div className="ff-categories">
        {Object.entries(grouped).map(([cat, catFlags]) => {
          const isOpen = expandedCategories.has(cat);
          const enabledCount = catFlags.filter(f => f.enabled).length;
          const allEnabled = enabledCount === catFlags.length;
          return (
            <div key={cat} className={`ff-cat${isOpen ? ' ff-cat-open' : ''}`}>
              <div className="ff-cat-header" onClick={() => toggleCategory(cat)}>
                <div className="ff-cat-left">
                  {isOpen ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
                  <span className="ff-cat-icon">{categoryIcons[cat] || <Filter size={14}/>}</span>
                  <span className="ff-cat-name">{t(cat)}</span>
                </div>
                <div className="ff-cat-right">
                  <span className={`ff-cat-badge${allEnabled ? ' ff-all-on' : enabledCount === 0 ? ' ff-all-off' : ''}`}>
                    {enabledCount}/{catFlags.length}
                  </span>
                  <button className="ff-cat-toggle-btn" onClick={e => { e.stopPropagation(); toggleCategoryFlags(cat, !allEnabled); }}
                    title={allEnabled ? t('disableAll') : t('enableAll')}>
                    {allEnabled ? <ToggleRight size={18} style={{color: 'var(--accent)'}}/> : <ToggleLeft size={18} style={{opacity:0.5}}/>}
                  </button>
                </div>
              </div>
              {isOpen && (
                <div className="ff-items">
                  {catFlags.map(f => (
                    <div key={f.id} className={`ff-item${f.enabled ? ' ff-on' : ' ff-off'}`}>
                      <div className="ff-item-info">
                        <span className="ff-item-name">{t(f.name)}</span>
                        <code className="ff-item-id">{f.id}</code>
                      </div>
                      <button className={`ff-toggle${f.enabled ? ' ff-toggle-on' : ''}`} onClick={() => toggleFlag(f.id)}>
                        {f.enabled ? <ToggleRight size={22}/> : <ToggleLeft size={22}/>}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
