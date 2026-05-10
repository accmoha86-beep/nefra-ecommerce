import React, { useState } from 'react';
import { Shield, UserPlus, Edit2, Trash2, Eye, EyeOff, Search, Filter, ChevronLeft, Check, X, Users, Crown, Building2, Package, FileText, Headphones, Truck, History, AlertTriangle } from 'lucide-react';

type TFunc = (key: string) => string;

interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'super_admin' | 'country_admin' | 'inventory_mgr' | 'finance_mgr' | 'support_agent' | 'shipping_mgr';
  countries: string[];
  status: 'active' | 'suspended' | 'invited';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
}

interface AuditEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  country: string;
  timestamp: string;
  details: string;
}

const roleConfig: Record<string, { icon: any; color: string; permissions: string[] }> = {
  super_admin: { icon: Crown, color: '#D4A020', permissions: ['all'] },
  country_admin: { icon: Building2, color: '#4DB8C7', permissions: ['orders', 'inventory', 'invoices', 'customers', 'shipping', 'reports', 'settings'] },
  inventory_mgr: { icon: Package, color: '#6C8EBF', permissions: ['inventory', 'products', 'stock'] },
  finance_mgr: { icon: FileText, color: '#C8962D', permissions: ['invoices', 'payments', 'tax', 'reports'] },
  support_agent: { icon: Headphones, color: '#7BC67E', permissions: ['orders', 'customers', 'returns'] },
  shipping_mgr: { icon: Truck, color: '#E07B53', permissions: ['shipping', 'tracking', 'delivery'] },
};

const allPermissions = [
  'orders', 'inventory', 'products', 'stock', 'invoices', 'payments',
  'tax', 'customers', 'shipping', 'tracking', 'delivery', 'returns',
  'reports', 'settings', 'users', 'themes', 'languages', 'countries'
];

const countryFlags: Record<string, string> = {
  SA: '\u{1F1F8}\u{1F1E6}', AE: '\u{1F1E6}\u{1F1EA}', QA: '\u{1F1F6}\u{1F1E6}', EG: '\u{1F1EA}\u{1F1EC}', IT: '\u{1F1EE}\u{1F1F9}'
};

const initialUsers: AdminUser[] = [
  { id: '1', name: 'Mohamed Mansour', email: 'mohamed@nefra.com', avatar: 'M', role: 'super_admin', countries: ['SA', 'AE', 'QA', 'EG', 'IT'], status: 'active', lastLogin: '2026-05-06 22:30', createdAt: '2025-01-01', permissions: ['all'] },
  { id: '2', name: 'Ahmed Al-Rashid', email: 'ahmed@nefra.com', avatar: 'A', role: 'country_admin', countries: ['SA', 'AE', 'QA'], status: 'active', lastLogin: '2026-05-06 18:15', createdAt: '2025-03-15', permissions: ['orders', 'inventory', 'invoices', 'customers', 'shipping', 'reports', 'settings'] },
  { id: '3', name: 'Marco Rossi', email: 'marco@nefra.com', avatar: 'MR', role: 'country_admin', countries: ['IT'], status: 'active', lastLogin: '2026-05-06 14:20', createdAt: '2025-04-10', permissions: ['orders', 'inventory', 'invoices', 'customers', 'shipping', 'reports', 'settings'] },
  { id: '4', name: 'Fatma Hassan', email: 'fatma@nefra.com', avatar: 'F', role: 'country_admin', countries: ['EG'], status: 'active', lastLogin: '2026-05-05 09:45', createdAt: '2025-06-01', permissions: ['orders', 'inventory', 'invoices', 'customers', 'shipping', 'reports', 'settings'] },
  { id: '5', name: 'Omar Khalid', email: 'omar@nefra.com', avatar: 'O', role: 'inventory_mgr', countries: ['SA', 'AE'], status: 'active', lastLogin: '2026-05-06 20:00', createdAt: '2025-07-20', permissions: ['inventory', 'products', 'stock'] },
  { id: '6', name: 'Sara Ali', email: 'sara@nefra.com', avatar: 'S', role: 'finance_mgr', countries: ['SA', 'EG'], status: 'active', lastLogin: '2026-05-04 11:30', createdAt: '2025-08-05', permissions: ['invoices', 'payments', 'tax', 'reports'] },
  { id: '7', name: 'Giulia Bianchi', email: 'giulia@nefra.com', avatar: 'G', role: 'support_agent', countries: ['IT'], status: 'active', lastLogin: '2026-05-06 16:45', createdAt: '2025-09-12', permissions: ['orders', 'customers', 'returns'] },
  { id: '8', name: 'Khalid Nasser', email: 'khalid@nefra.com', avatar: 'K', role: 'shipping_mgr', countries: ['QA', 'AE'], status: 'invited', lastLogin: '-', createdAt: '2026-05-01', permissions: ['shipping', 'tracking', 'delivery'] },
];

const initialAudit: AuditEntry[] = [
  { id: 'a1', userId: '1', userName: 'Mohamed Mansour', action: 'user.create', target: 'Khalid Nasser', country: 'QA', timestamp: '2026-05-06 22:00', details: 'Invited new shipping manager' },
  { id: 'a2', userId: '2', userName: 'Ahmed Al-Rashid', action: 'order.update', target: 'Order #SA-4521', country: 'SA', timestamp: '2026-05-06 18:10', details: 'Changed status to shipped' },
  { id: 'a3', userId: '3', userName: 'Marco Rossi', action: 'invoice.generate', target: 'INV-IT-0089', country: 'IT', timestamp: '2026-05-06 14:15', details: 'Generated FatturaPA XML' },
  { id: 'a4', userId: '4', userName: 'Fatma Hassan', action: 'inventory.update', target: 'iPhone 16 Pro Max', country: 'EG', timestamp: '2026-05-06 09:30', details: 'Stock +50 units' },
  { id: 'a5', userId: '6', userName: 'Sara Ali', action: 'tax.update', target: 'VAT Rate', country: 'SA', timestamp: '2026-05-05 15:00', details: 'Updated VAT to 15%' },
  { id: 'a6', userId: '5', userName: 'Omar Khalid', action: 'product.update', target: 'MacBook Pro 16"', country: 'AE', timestamp: '2026-05-05 12:20', details: 'Price updated to 9,999' },
  { id: 'a7', userId: '7', userName: 'Giulia Bianchi', action: 'return.approve', target: 'Return #IT-0034', country: 'IT', timestamp: '2026-05-04 16:40', details: 'Approved 14-day return (GDPR)' },
  { id: 'a8', userId: '1', userName: 'Mohamed Mansour', action: 'settings.theme', target: 'elegant-dark', country: '-', timestamp: '2026-05-04 10:00', details: 'Changed theme to Elegant Dark' },
];

interface Props {
  setPage: (p: string) => void;
  t: TFunc;
  lang: string;
}

export function AdminUsersPage({ setPage, t, lang }: Props) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [audit] = useState<AuditEntry[]>(initialAudit);
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'permissions' | 'audit'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState<AdminUser['role']>('country_admin');
  const [formCountries, setFormCountries] = useState<string[]>([]);
  const [formPermissions, setFormPermissions] = useState<string[]>([]);

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchCountry = countryFilter === 'all' || u.countries.includes(countryFilter);
    return matchSearch && matchRole && matchCountry;
  });

  const openAddModal = () => {
    setEditingUser(null);
    setFormName(''); setFormEmail(''); setFormRole('country_admin'); setFormCountries([]); setFormPermissions(roleConfig.country_admin.permissions);
    setShowAddModal(true);
  };

  const openEditModal = (user: AdminUser) => {
    setEditingUser(user);
    setFormName(user.name); setFormEmail(user.email); setFormRole(user.role); setFormCountries([...user.countries]); setFormPermissions([...user.permissions]);
    setShowAddModal(true);
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name: formName, email: formEmail, role: formRole, countries: formCountries, permissions: formPermissions } : u));
    } else {
      const newUser: AdminUser = {
        id: String(Date.now()), name: formName, email: formEmail, avatar: formName.split(' ').map(n => n[0]).join('').slice(0, 2),
        role: formRole, countries: formCountries, status: 'invited', lastLogin: '-', createdAt: new Date().toISOString().split('T')[0], permissions: formPermissions
      };
      setUsers([...users, newUser]);
    }
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    setShowDeleteConfirm(null);
  };

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
  };

  const toggleCountry = (code: string) => {
    setFormCountries(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);
  };

  const togglePermission = (perm: string) => {
    setFormPermissions(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    invited: users.filter(u => u.status === 'invited').length,
  };

  const getActionColor = (action: string) => {
    if (action.includes('create') || action.includes('generate')) return '#7BC67E';
    if (action.includes('update') || action.includes('theme')) return '#4DB8C7';
    if (action.includes('delete') || action.includes('suspend')) return '#E05C5C';
    if (action.includes('approve')) return '#C8962D';
    return 'var(--text-muted)';
  };

  return (
    <div className="admin-page">
      <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.25rem'}}>
        <button className="btn-outline" onClick={() => setPage('dash')} style={{padding:'0.4rem'}}><ChevronLeft size={18}/></button>
        <div>
          <h1 className="admin-page-title"><Shield size={24}/> {t('adminUsers')}</h1>
          <p className="admin-page-subtitle">{t('adminUsersDesc')}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{marginBottom:'1.5rem'}}>
        <div className="stat-card"><div className="stat-number">{stats.total}</div><div className="stat-label">{t('totalAdmins')}</div></div>
        <div className="stat-card"><div className="stat-number" style={{color:'#7BC67E'}}>{stats.active}</div><div className="stat-label">{t('activeAdmins')}</div></div>
        <div className="stat-card"><div className="stat-number" style={{color:'#E05C5C'}}>{stats.suspended}</div><div className="stat-label">{t('suspendedAdmins')}</div></div>
        <div className="stat-card"><div className="stat-number" style={{color:'#C8962D'}}>{stats.invited}</div><div className="stat-label">{t('pendingInvites')}</div></div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:'0.5rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
        {(['users', 'roles', 'permissions', 'audit'] as const).map(tab => (
          <button key={tab} className={`btn-outline ${activeTab === tab ? 'btn-active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'users' && <><Users size={14}/> {t('teamMembers')}</>}
            {tab === 'roles' && <><Shield size={14}/> {t('rolesConfig')}</>}
            {tab === 'permissions' && <><Eye size={14}/> {t('permissionMatrix')}</>}
            {tab === 'audit' && <><History size={14}/> {t('auditLog')}</>}
          </button>
        ))}
      </div>

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <>
          <div style={{display:'flex',gap:'0.75rem',marginBottom:'1rem',flexWrap:'wrap',alignItems:'center'}}>
            <div style={{position:'relative',flex:1,minWidth:'200px'}}>
              <Search size={16} style={{position:'absolute',left:'0.75rem',top:'50%',transform:'translateY(-50%)',color:'var(--text-muted)'}}/>
              <input type="text" placeholder={t('searchAdmins')} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{width:'100%',padding:'0.6rem 0.6rem 0.6rem 2.25rem',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--card-bg)',color:'var(--text-primary)',fontSize:'0.85rem'}} />
            </div>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
              style={{padding:'0.6rem',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--card-bg)',color:'var(--text-primary)',fontSize:'0.85rem'}}>
              <option value="all">{t('allRoles')}</option>
              <option value="super_admin">{t('superAdmin')}</option>
              <option value="country_admin">{t('countryAdmin')}</option>
              <option value="inventory_mgr">{t('inventoryManager')}</option>
              <option value="finance_mgr">{t('financeManager')}</option>
              <option value="support_agent">{t('supportAgent')}</option>
              <option value="shipping_mgr">{t('shippingManager')}</option>
            </select>
            <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)}
              style={{padding:'0.6rem',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--card-bg)',color:'var(--text-primary)',fontSize:'0.85rem'}}>
              <option value="all">{t('allCountries')}</option>
              {Object.entries(countryFlags).map(([code, flag]) => (
                <option key={code} value={code}>{flag} {code}</option>
              ))}
            </select>
            <button className="btn-primary" onClick={openAddModal}><UserPlus size={16}/> {t('addAdmin')}</button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{t('adminName')}</th>
                  <th>{t('role')}</th>
                  <th>{t('countries')}</th>
                  <th>{t('status')}</th>
                  <th>{t('lastLogin')}</th>
                  <th>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => {
                  const rc = roleConfig[user.role];
                  const RoleIcon = rc.icon;
                  return (
                    <tr key={user.id}>
                      <td>
                        <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                          <div style={{width:'36px',height:'36px',borderRadius:'50%',background:`${rc.color}22`,color:rc.color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'0.75rem'}}>
                            {user.avatar}
                          </div>
                          <div>
                            <div style={{fontWeight:600,fontSize:'0.85rem'}}>{user.name}</div>
                            <div style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{display:'inline-flex',alignItems:'center',gap:'0.35rem',padding:'0.25rem 0.6rem',borderRadius:'var(--radius)',background:`${rc.color}18`,color:rc.color,fontSize:'0.75rem',fontWeight:600}}>
                          <RoleIcon size={13}/> {t(user.role)}
                        </span>
                      </td>
                      <td>
                        <div style={{display:'flex',gap:'0.25rem',flexWrap:'wrap'}}>
                          {user.role === 'super_admin' ? (
                            <span style={{fontSize:'0.75rem',color:'var(--accent)',fontWeight:600}}>{t('allCountriesAccess')}</span>
                          ) : (
                            user.countries.map(c => (
                              <span key={c} style={{fontSize:'1rem'}} title={c}>{countryFlags[c]}</span>
                            ))
                          )}
                        </div>
                      </td>
                      <td>
                        <span style={{display:'inline-flex',alignItems:'center',gap:'0.25rem',padding:'0.2rem 0.5rem',borderRadius:'var(--radius)',fontSize:'0.7rem',fontWeight:600,
                          background: user.status === 'active' ? '#7BC67E22' : user.status === 'suspended' ? '#E05C5C22' : '#C8962D22',
                          color: user.status === 'active' ? '#7BC67E' : user.status === 'suspended' ? '#E05C5C' : '#C8962D'
                        }}>
                          {user.status === 'active' ? <Check size={12}/> : user.status === 'suspended' ? <X size={12}/> : <AlertTriangle size={12}/>}
                          {t(user.status)}
                        </span>
                      </td>
                      <td><span style={{fontSize:'0.8rem',color:'var(--text-muted)'}}>{user.lastLogin}</span></td>
                      <td>
                        <div style={{display:'flex',gap:'0.35rem'}}>
                          <button className="btn-outline" style={{padding:'0.3rem'}} onClick={() => openEditModal(user)} title={t('edit')}><Edit2 size={14}/></button>
                          <button className="btn-outline" style={{padding:'0.3rem'}} onClick={() => toggleStatus(user.id)} title={user.status === 'active' ? t('suspend') : t('activate')}>
                            {user.status === 'active' ? <EyeOff size={14}/> : <Eye size={14}/>}
                          </button>
                          {user.role !== 'super_admin' && (
                            <button className="btn-outline" style={{padding:'0.3rem',color:'#E05C5C'}} onClick={() => setShowDeleteConfirm(user.id)} title={t('delete')}>
                              <Trash2 size={14}/>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ROLES TAB */}
      {activeTab === 'roles' && (
        <div className="admin-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1rem'}}>
          {Object.entries(roleConfig).map(([roleKey, config]) => {
            const RIcon = config.icon;
            const count = users.filter(u => u.role === roleKey).length;
            return (
              <div key={roleKey} className="card" style={{padding:'1.25rem',border:`1px solid ${config.color}33`}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'1rem'}}>
                  <div style={{width:'44px',height:'44px',borderRadius:'50%',background:`${config.color}22`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <RIcon size={22} color={config.color}/>
                  </div>
                  <div>
                    <h3 style={{fontSize:'0.95rem',fontWeight:700,margin:0}}>{t(roleKey)}</h3>
                    <span style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{count} {t('members')}</span>
                  </div>
                </div>
                <div style={{fontSize:'0.8rem',color:'var(--text-secondary)',marginBottom:'0.75rem'}}>{t(roleKey + 'Desc')}</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'0.3rem'}}>
                  {config.permissions.map(p => (
                    <span key={p} style={{fontSize:'0.65rem',padding:'0.15rem 0.4rem',borderRadius:'var(--radius)',background:`${config.color}15`,color:config.color,fontWeight:600}}>
                      {t(p)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PERMISSIONS MATRIX TAB */}
      {activeTab === 'permissions' && (
        <div className="admin-table-container">
          <table className="admin-table" style={{fontSize:'0.75rem'}}>
            <thead>
              <tr>
                <th style={{position:'sticky',left:0,background:'var(--card-bg)',zIndex:2}}>{t('permission')}</th>
                {Object.keys(roleConfig).map(r => {
                  const RC = roleConfig[r].icon;
                  return <th key={r} style={{textAlign:'center',minWidth:'80px'}}><div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'0.25rem'}}><RC size={14} color={roleConfig[r].color}/><span>{t(r)}</span></div></th>;
                })}
              </tr>
            </thead>
            <tbody>
              {allPermissions.map(perm => (
                <tr key={perm}>
                  <td style={{position:'sticky',left:0,background:'var(--card-bg)',zIndex:1,fontWeight:600}}>{t(perm)}</td>
                  {Object.entries(roleConfig).map(([role, config]) => (
                    <td key={role} style={{textAlign:'center'}}>
                      {config.permissions.includes('all') || config.permissions.includes(perm) ? (
                        <Check size={16} color="#7BC67E"/>
                      ) : (
                        <X size={14} color="var(--text-muted)" style={{opacity:0.3}}/>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* AUDIT LOG TAB */}
      {activeTab === 'audit' && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('timestamp')}</th>
                <th>{t('user')}</th>
                <th>{t('action')}</th>
                <th>{t('target')}</th>
                <th>{t('country')}</th>
                <th>{t('details')}</th>
              </tr>
            </thead>
            <tbody>
              {audit.map(entry => (
                <tr key={entry.id}>
                  <td><span style={{fontSize:'0.8rem',color:'var(--text-muted)',whiteSpace:'nowrap'}}>{entry.timestamp}</span></td>
                  <td><span style={{fontWeight:600,fontSize:'0.85rem'}}>{entry.userName}</span></td>
                  <td>
                    <span style={{display:'inline-flex',alignItems:'center',gap:'0.25rem',padding:'0.2rem 0.5rem',borderRadius:'var(--radius)',fontSize:'0.7rem',fontWeight:600,background:`${getActionColor(entry.action)}18`,color:getActionColor(entry.action)}}>
                      {entry.action}
                    </span>
                  </td>
                  <td><span style={{fontSize:'0.85rem'}}>{entry.target}</span></td>
                  <td>{entry.country !== '-' ? <span style={{fontSize:'1rem'}}>{countryFlags[entry.country] || entry.country}</span> : <span style={{color:'var(--text-muted)'}}>-</span>}</td>
                  <td><span style={{fontSize:'0.8rem',color:'var(--text-secondary)'}}>{entry.details}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {showAddModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}} onClick={() => setShowAddModal(false)}>
          <div style={{background:'var(--card-bg)',borderRadius:'var(--radius)',padding:'1.5rem',width:'100%',maxWidth:'500px',maxHeight:'85vh',overflowY:'auto',border:'1px solid var(--border)'}} onClick={e => e.stopPropagation()}>
            <h2 style={{fontSize:'1.1rem',fontWeight:700,marginBottom:'1rem'}}>{editingUser ? t('editAdmin') : t('addAdmin')}</h2>

            <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
              <div>
                <label style={{fontSize:'0.8rem',fontWeight:600,marginBottom:'0.25rem',display:'block'}}>{t('adminName')}</label>
                <input type="text" value={formName} onChange={e => setFormName(e.target.value)} placeholder="John Doe"
                  style={{width:'100%',padding:'0.6rem',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--bg)',color:'var(--text-primary)',fontSize:'0.85rem'}} />
              </div>

              <div>
                <label style={{fontSize:'0.8rem',fontWeight:600,marginBottom:'0.25rem',display:'block'}}>{t('email')}</label>
                <input type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="admin@nefra.com"
                  style={{width:'100%',padding:'0.6rem',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--bg)',color:'var(--text-primary)',fontSize:'0.85rem'}} />
              </div>

              <div>
                <label style={{fontSize:'0.8rem',fontWeight:600,marginBottom:'0.25rem',display:'block'}}>{t('role')}</label>
                <select value={formRole} onChange={e => { const r = e.target.value as AdminUser['role']; setFormRole(r); setFormPermissions(roleConfig[r].permissions); }}
                  style={{width:'100%',padding:'0.6rem',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--bg)',color:'var(--text-primary)',fontSize:'0.85rem'}}>
                  {Object.keys(roleConfig).map(r => <option key={r} value={r}>{t(r)}</option>)}
                </select>
              </div>

              {formRole !== 'super_admin' && (
                <div>
                  <label style={{fontSize:'0.8rem',fontWeight:600,marginBottom:'0.5rem',display:'block'}}>{t('assignCountries')}</label>
                  <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
                    {Object.entries(countryFlags).map(([code, flag]) => (
                      <button key={code} onClick={() => toggleCountry(code)}
                        style={{padding:'0.4rem 0.75rem',borderRadius:'var(--radius)',border:`2px solid ${formCountries.includes(code) ? 'var(--accent)' : 'var(--border)'}`,
                          background: formCountries.includes(code) ? 'var(--accent-bg)' : 'transparent',cursor:'pointer',fontSize:'0.85rem',display:'flex',alignItems:'center',gap:'0.35rem',color:'var(--text-primary)'}}>
                        {flag} {code} {formCountries.includes(code) && <Check size={14} color="var(--accent)"/>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {formRole !== 'super_admin' && (
                <div>
                  <label style={{fontSize:'0.8rem',fontWeight:600,marginBottom:'0.5rem',display:'block'}}>{t('permissions')}</label>
                  <div style={{display:'flex',gap:'0.35rem',flexWrap:'wrap'}}>
                    {allPermissions.map(perm => (
                      <button key={perm} onClick={() => togglePermission(perm)}
                        style={{padding:'0.25rem 0.5rem',borderRadius:'var(--radius)',border:`1px solid ${formPermissions.includes(perm) ? 'var(--accent)' : 'var(--border)'}`,
                          background: formPermissions.includes(perm) ? 'var(--accent-bg)' : 'transparent',cursor:'pointer',fontSize:'0.7rem',fontWeight:600,color: formPermissions.includes(perm) ? 'var(--accent)' : 'var(--text-muted)'}}>
                        {t(perm)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{display:'flex',gap:'0.5rem',justifyContent:'flex-end',marginTop:'1.25rem'}}>
              <button className="btn-outline" onClick={() => setShowAddModal(false)}>{t('cancel')}</button>
              <button className="btn-primary" onClick={handleSave} disabled={!formName || !formEmail}>
                {editingUser ? t('saveChanges') : t('sendInvite')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {showDeleteConfirm && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:1001,display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}} onClick={() => setShowDeleteConfirm(null)}>
          <div style={{background:'var(--card-bg)',borderRadius:'var(--radius)',padding:'1.5rem',width:'100%',maxWidth:'380px',border:'1px solid var(--border)'}} onClick={e => e.stopPropagation()}>
            <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'1rem',color:'#E05C5C'}}>
              <AlertTriangle size={20}/> <h3 style={{margin:0,fontSize:'1rem'}}>{t('confirmDelete')}</h3>
            </div>
            <p style={{fontSize:'0.85rem',color:'var(--text-secondary)',marginBottom:'1rem'}}>{t('deleteAdminWarning')}</p>
            <div style={{display:'flex',gap:'0.5rem',justifyContent:'flex-end'}}>
              <button className="btn-outline" onClick={() => setShowDeleteConfirm(null)}>{t('cancel')}</button>
              <button style={{padding:'0.5rem 1rem',borderRadius:'var(--radius)',background:'#E05C5C',color:'#fff',border:'none',cursor:'pointer',fontWeight:600,fontSize:'0.85rem'}}
                onClick={() => handleDelete(showDeleteConfirm)}>{t('deleteConfirm')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
