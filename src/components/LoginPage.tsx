import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Phone, ArrowRight, ChevronLeft, Check, AlertCircle, ShoppingBag, Shield, X } from 'lucide-react';
import { Page } from '../types';

interface LoginPageProps {
  setPage: (p: Page) => void;
  t: (key: string) => string;
  lang: string;
  onLogin: (user: { name: string; email: string; phone?: string }) => void;
  onGuestCheckout?: () => void;
  fromCheckout?: boolean;
}

type AuthTab = 'login' | 'register';

export const LoginPage: React.FC<LoginPageProps> = ({ setPage, t, lang, onLogin, onGuestCheckout, fromCheckout }) => {
  const [tab, setTab] = useState<AuthTab>('login');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Register form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regConfirmPass, setRegConfirmPass] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

  // Forgot password
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const isRtl = lang === 'ar';

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePass = (pass: string) => pass.length >= 8;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(loginEmail)) { setError(t('auth.invalidEmail')); return; }
    if (!validatePass(loginPass)) { setError(t('auth.passwordTooShort')); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: loginEmail.split('@')[0], email: loginEmail });
      if (fromCheckout) {
        setPage('checkout');
      } else {
        setPage('account');
      }
    }, 1200);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!regName.trim()) { setError(t('auth.nameRequired')); return; }
    if (!validateEmail(regEmail)) { setError(t('auth.invalidEmail')); return; }
    if (!validatePass(regPass)) { setError(t('auth.passwordTooShort')); return; }
    if (regPass !== regConfirmPass) { setError(t('auth.passwordsMismatch')); return; }
    if (!agreeTerms) { setError(t('auth.mustAgreeTerms')); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(t('auth.accountCreated'));
      setTimeout(() => {
        onLogin({ name: regName, email: regEmail, phone: regPhone });
        if (fromCheckout) {
          setPage('checkout');
        } else {
          setPage('account');
        }
      }, 1000);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: provider + ' User', email: `user@${provider.toLowerCase()}.com` });
      if (fromCheckout) {
        setPage('checkout');
      } else {
        setPage('account');
      }
    }, 1500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(forgotEmail)) { setError(t('auth.invalidEmail')); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForgotSent(true);
    }, 1000);
  };

  // Forgot Password View
  if (showForgot) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <button className="auth-back-btn" onClick={() => { setShowForgot(false); setError(''); setForgotSent(false); }}>
            <ChevronLeft size={18}/> {t('auth.backToLogin')}
          </button>
          <div className="auth-header">
            <div className="auth-icon-wrap"><Lock size={28}/></div>
            <h1>{t('auth.forgotPassword')}</h1>
            <p>{t('auth.forgotPasswordDesc')}</p>
          </div>
          {forgotSent ? (
            <div className="auth-success-msg">
              <Check size={24}/>
              <div>
                <strong>{t('auth.emailSent')}</strong>
                <p>{t('auth.checkInbox')}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword}>
              {error && <div className="auth-error"><AlertCircle size={16}/> {error}</div>}
              <div className="auth-field">
                <label>{t('auth.email')}</label>
                <div className="auth-input-wrap">
                  <Mail size={18} className="auth-input-icon"/>
                  <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                    placeholder={t('auth.emailPlaceholder')} autoFocus/>
                </div>
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner"/> : <>{t('auth.sendResetLink')} <ArrowRight size={16}/></>}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Back to shop */}
        <button className="auth-back-btn" onClick={() => setPage('home')}>
          <ChevronLeft size={18}/> {t('auth.backToShop')}
        </button>

        {/* Header */}
        <div className="auth-header">
          <h1>{tab === 'login' ? t('auth.welcomeBack') : t('auth.createAccount')}</h1>
          <p>{tab === 'login' ? t('auth.loginSubtitle') : t('auth.registerSubtitle')}</p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setError(''); setSuccess(''); }}>
            {t('auth.signIn')}
          </button>
          <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setError(''); setSuccess(''); }}>
            {t('auth.signUp')}
          </button>
        </div>

        {/* Error / Success */}
        {error && <div className="auth-error"><AlertCircle size={16}/> {error}</div>}
        {success && <div className="auth-success-msg"><Check size={16}/> {success}</div>}

        {/* Social Login */}
        <div className="auth-social">
          <button className="auth-social-btn google" onClick={() => handleSocialLogin('Google')} disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
          <button className="auth-social-btn apple" onClick={() => handleSocialLogin('Apple')} disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            Apple
          </button>
          <button className="auth-social-btn facebook" onClick={() => handleSocialLogin('Facebook')} disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </button>
        </div>

        <div className="auth-divider">
          <span>{t('auth.orContinueWith')}</span>
        </div>

        {/* LOGIN FORM */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="auth-field">
              <label>{t('auth.email')}</label>
              <div className="auth-input-wrap">
                <Mail size={18} className="auth-input-icon"/>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  placeholder={t('auth.emailPlaceholder')} autoComplete="email"/>
              </div>
            </div>

            <div className="auth-field">
              <label>{t('auth.password')}</label>
              <div className="auth-input-wrap">
                <Lock size={18} className="auth-input-icon"/>
                <input type={showPass ? 'text' : 'password'} value={loginPass} onChange={e => setLoginPass(e.target.value)}
                  placeholder={t('auth.passwordPlaceholder')} autoComplete="current-password"/>
                <button type="button" className="auth-eye-btn" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <label className="auth-checkbox">
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}/>
                <span className="auth-checkmark"/>
                {t('auth.rememberMe')}
              </label>
              <button type="button" className="auth-forgot-btn" onClick={() => { setShowForgot(true); setError(''); }}>
                {t('auth.forgotPassword')}
              </button>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="auth-spinner"/> : <>{t('auth.signIn')} <ArrowRight size={16}/></>}
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="auth-field">
              <label>{t('auth.fullName')}</label>
              <div className="auth-input-wrap">
                <User size={18} className="auth-input-icon"/>
                <input type="text" value={regName} onChange={e => setRegName(e.target.value)}
                  placeholder={t('auth.fullNamePlaceholder')} autoComplete="name"/>
              </div>
            </div>

            <div className="auth-field">
              <label>{t('auth.email')}</label>
              <div className="auth-input-wrap">
                <Mail size={18} className="auth-input-icon"/>
                <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)}
                  placeholder={t('auth.emailPlaceholder')} autoComplete="email"/>
              </div>
            </div>

            <div className="auth-field">
              <label>{t('auth.phone')} <span className="auth-optional">({t('auth.optional')})</span></label>
              <div className="auth-input-wrap">
                <Phone size={18} className="auth-input-icon"/>
                <input type="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)}
                  placeholder={t('auth.phonePlaceholder')} autoComplete="tel"/>
              </div>
            </div>

            <div className="auth-row">
              <div className="auth-field">
                <label>{t('auth.password')}</label>
                <div className="auth-input-wrap">
                  <Lock size={18} className="auth-input-icon"/>
                  <input type={showPass ? 'text' : 'password'} value={regPass} onChange={e => setRegPass(e.target.value)}
                    placeholder={t('auth.createPassword')} autoComplete="new-password"/>
                  <button type="button" className="auth-eye-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>
              <div className="auth-field">
                <label>{t('auth.confirmPassword')}</label>
                <div className="auth-input-wrap">
                  <Lock size={18} className="auth-input-icon"/>
                  <input type={showConfirmPass ? 'text' : 'password'} value={regConfirmPass} onChange={e => setRegConfirmPass(e.target.value)}
                    placeholder={t('auth.confirmPasswordPlaceholder')} autoComplete="new-password"/>
                  <button type="button" className="auth-eye-btn" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                    {showConfirmPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength */}
            {regPass && (
              <div className="auth-password-strength">
                <div className="auth-strength-bar">
                  <div className={`auth-strength-fill ${regPass.length >= 12 ? 'strong' : regPass.length >= 8 ? 'medium' : 'weak'}`}
                    style={{ width: regPass.length >= 12 ? '100%' : regPass.length >= 8 ? '66%' : '33%' }}/>
                </div>
                <span className={regPass.length >= 12 ? 'strong' : regPass.length >= 8 ? 'medium' : 'weak'}>
                  {regPass.length >= 12 ? t('auth.strongPassword') : regPass.length >= 8 ? t('auth.mediumPassword') : t('auth.weakPassword')}
                </span>
              </div>
            )}

            <div className="auth-checkboxes">
              <label className="auth-checkbox">
                <input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)}/>
                <span className="auth-checkmark"/>
                {t('auth.agreeToTerms')} <a href="#" onClick={e => e.preventDefault()}>{t('auth.termsOfService')}</a> & <a href="#" onClick={e => e.preventDefault()}>{t('auth.privacyPolicy')}</a>
              </label>
              <label className="auth-checkbox">
                <input type="checkbox" checked={subscribeNewsletter} onChange={e => setSubscribeNewsletter(e.target.checked)}/>
                <span className="auth-checkmark"/>
                {t('auth.subscribeNewsletter')}
              </label>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="auth-spinner"/> : <>{t('auth.createAccount')} <ArrowRight size={16}/></>}
            </button>
          </form>
        )}

        {/* Guest Checkout */}
        {fromCheckout && (
          <div className="auth-guest">
            <div className="auth-divider"><span>{t('auth.or')}</span></div>
            <button className="auth-guest-btn" onClick={onGuestCheckout}>
              <ShoppingBag size={18}/> {t('auth.continueAsGuest')}
            </button>
            <p className="auth-guest-note">{t('auth.guestNote')}</p>
          </div>
        )}

        {/* Footer */}
        <div className="auth-footer">
          <Shield size={14}/>
          <span>{t('auth.secureEncrypted')}</span>
        </div>
      </div>
    </div>
  );
};
