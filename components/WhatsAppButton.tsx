import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Country } from '../types';

interface WhatsAppButtonProps {
  t: (key: string) => string;
  currentCountry: Country;
  lang: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ t, currentCountry, lang }) => {
  const [open, setOpen] = useState(false);

  const whatsappNumber = '201000000000'; // Egypt default — change per country
  const message = lang === 'ar' 
    ? 'مرحباً! أريد الاستفسار عن منتجاتكم' 
    : lang === 'it' 
    ? 'Ciao! Vorrei informazioni sui vostri prodotti' 
    : 'Hello! I would like to inquire about your products';
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="whatsapp-float">
      {open && (
        <div className="whatsapp-popup">
          <div className="whatsapp-popup-header">
            <div className="whatsapp-avatar">N</div>
            <div>
              <strong>NEFRA {currentCountry.flag}</strong>
              <span className="whatsapp-status">{t('waOnline')}</span>
            </div>
            <button className="whatsapp-close" onClick={() => setOpen(false)}><X size={16}/></button>
          </div>
          <div className="whatsapp-popup-body">
            <div className="whatsapp-bubble">
              {t('waGreeting')} 👋
              <br/>{t('waHelp')}
            </div>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-send-btn">
            <MessageCircle size={16}/>
            {t('waStartChat')}
          </a>
        </div>
      )}
      <button 
        className="whatsapp-fab" 
        onClick={() => setOpen(!open)}
        aria-label="WhatsApp"
      >
        {open ? <X size={28}/> : <MessageCircle size={28}/>}
        {!open && <span className="whatsapp-badge">1</span>}
      </button>
    </div>
  );
};
