import React, { useState, useEffect } from 'react';
import { X, Smartphone, Download } from 'lucide-react';
import { TFunc } from '../types';

interface AppDownloadBannerProps {
  t: TFunc;
  lang: string;
}

export const AppDownloadBanner: React.FC<AppDownloadBannerProps> = ({ t, lang }) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const wasDismissed = localStorage.getItem('nefra_app_banner_dismissed');
    if (wasDismissed) { setDismissed(true); return; }
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem('nefra_app_banner_dismissed', 'true');
  };

  if (dismissed || !visible) return null;

  return (
    <div className="app-download-banner">
      <div className="app-download-inner">
        <button className="app-download-close" onClick={handleDismiss}><X size={18}/></button>
        <div className="app-download-icon"><Smartphone size={32}/></div>
        <div className="app-download-content">
          <h3>{t('appBanner.title')}</h3>
          <p>{t('appBanner.desc')}</p>
        </div>
        <div className="app-download-buttons">
          <button className="app-store-btn" onClick={handleDismiss}>
            <Download size={14}/> {t('appBanner.appStore')}
          </button>
          <button className="app-store-btn" onClick={handleDismiss}>
            <Download size={14}/> {t('appBanner.playStore')}
          </button>
        </div>
      </div>
    </div>
  );
};
