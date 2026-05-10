import React, { useState } from 'react';
import { Sliders, Search, ToggleLeft, ToggleRight, Shield, Filter, Clock, Users, ChevronDown, ChevronRight, Check, X, AlertTriangle } from 'lucide-react';
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

export const FeatureFlagsPage: React.FC<FeatureFlagsPageProps> = ({ setPage, t, tff, tffd, tffc }) => {
  const [flags, setFlags] = useState<FeatureFlag[]>(initialFlags);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [auditLog, setAuditLog] = useState<{ flag: string; action: string; time: string }[]>([]);

  const flagCategories: string[] = Array.from(new Set(flags.map(f => f.category)));

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
          <p className="page-subtitle">{t('featureFlagsSubtitle')} {flags.length} {t('flagsTotal')}.</p>
        </div>
        <div className="page-actions">
          <button className="btn-outline" onClick={() => setPage('dash')}>← {t('dashboard')}</button>
          <button className="btn-outline" onClick={() => setShowAuditLog(!showAuditLog)}>
            <Clock size={14}/> {t('auditLog')} {auditLog.length > 0 && `(${auditLog.length})`}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flags-stats">
        <div className="flag-stat enabled">
          <ToggleRight size={20}/>
          <div>
            <strong>{totalEnabled}</strong>
            <span>{t('enabled')}</span>
          </div>
        </div>
        <div className="flag-stat disabled">
          <ToggleLeft size={20}/>
          <div>
            <strong>{totalDisabled}</strong>
            <span>{t('disabled')}</span>
          </div>
        </div>
        <div className="flag-stat total">
          <Sliders size={20}/>
          <div>
            <strong>{flags.length}</strong>
            <span>{t('totalFlags')}</span>
          </div>
        </div>
        <div className="flag-bulk-actions">
          <button className="btn-sm-primary" onClick={enableAll}><Check size={12}/> {t('enableAll')}</button>
          <button className="btn-sm-danger" onClick={disableAll}><X size={12}/> {t('disableAll')}</button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flags-toolbar">
        <div className="flags-search">
          <Search size={16}/>
          <input placeholder={t('searchFlags')} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flags-filter">
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="All">{t('allCategories')}</option>
            {flagCategories.map(c => <option key={c} value={c}>{t(c)}</option>)}
          </select>
        </div>
      </div>

      {/* Audit Log Panel */}
      {showAuditLog && auditLog.length > 0 && (
        <div className="audit-log-panel">
          <h3><Clock size={16}/> {t('recentChanges')}</h3>
          <div className="audit-log-items">
            {auditLog.slice(0, 10).map((entry, i) => (
              <div key={i} className="audit-log-item">
                <span className={`audit-action ${entry.action === 'Enabled' ? 'enabled' : 'disabled'}`}>{entry.action === 'Enabled' ? t('enabled') : t('disabled')}</span>
                <span className="audit-flag">{entry.flag}</span>
                <span className="audit-time">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flags Grid */}
      <div className="flags-grid">
        {Object.entries(grouped).map(([cat, catFlags]) => (
          <div key={cat} className="flag-category">
            <button className="flag-category-header" onClick={() => setExpandedCategory(expandedCategory === cat ? null : cat)}>
              <div className="flag-category-info">
                <h3>{t(cat)}</h3>
                <span>{catFlags.filter(f => f.enabled).length}/{catFlags.length} {t('enabled')}</span>
              </div>
              {expandedCategory === cat ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
            </button>
            {(expandedCategory === cat || expandedCategory === null) && (
              <div className="flag-items">
                {catFlags.map(f => (
                  <div key={f.id} className={`flag-item${f.enabled ? ' enabled' : ' disabled'}`}>
                    <div className="flag-info">
                      <h4>{t(f.name)}</h4>
                      <p>{t(f.description)}</p>
                      <code className="flag-id">{f.id}</code>
                    </div>
                    <button className={`flag-toggle${f.enabled ? ' on' : ' off'}`} onClick={() => toggleFlag(f.id)}>
                      {f.enabled ? <ToggleRight size={28}/> : <ToggleLeft size={28}/>}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
