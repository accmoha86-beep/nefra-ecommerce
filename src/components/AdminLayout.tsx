import React, { useState } from 'react';
import { Settings, Flag, Zap, Globe2, Receipt, FileText, Type, Shield, Package, PanelLeftClose, PanelLeftOpen, Home, ChevronLeft } from 'lucide-react';
import { Page } from '../types';

interface AdminNavItem {
  id: Page;
  icon: any;
  labelKey: string;
}

const adminNavItems: AdminNavItem[] = [
  { id: 'dash', icon: Settings, labelKey: 'dashboard' },
  { id: 'products-admin', icon: Package, labelKey: 'productsManagement' },
  { id: 'flags', icon: Flag, labelKey: 'featureFlags' },
  { id: 'marketing', icon: Zap, labelKey: 'marketing' },
  { id: 'countries', icon: Globe2, labelKey: 'countries' },
  { id: 'tax', icon: Receipt, labelKey: 'taxManagement' },
  { id: 'invoices', icon: FileText, labelKey: 'invoices' },
  { id: 'languages', icon: Type, labelKey: 'languages' },
  { id: 'admin-users', icon: Shield, labelKey: 'adminUsers' },
];

interface AdminLayoutProps {
  page: Page;
  setPage: (p: Page) => void;
  t: (k: string) => string;
  lang: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ page, setPage, t, lang, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`admin-layout ${collapsed ? 'admin-collapsed' : ''}`}>
      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="admin-sidebar-header">
          {!collapsed && <span className="admin-sidebar-title">{t('adminPanel')}</span>}
          <button className="admin-sidebar-toggle" onClick={() => setCollapsed(!collapsed)} title={collapsed ? 'Expand' : 'Collapse'}>
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          {adminNavItems.map(item => {
            const Icon = item.icon;
            const isActive = page === item.id;
            return (
              <button
                key={item.id}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setPage(item.id)}
                title={collapsed ? t(item.labelKey) : undefined}
              >
                <Icon size={18} />
                {!collapsed && <span className="admin-nav-label">{t(item.labelKey) || item.labelKey}</span>}
                {isActive && <span className="admin-nav-indicator" />}
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-nav-item back-to-store" onClick={() => setPage('home')} title={t('home')}>
            <Home size={18} />
            {!collapsed && <span className="admin-nav-label">{t('backToStore') || 'العودة للمتجر'}</span>}
          </button>
        </div>
      </aside>

      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};
