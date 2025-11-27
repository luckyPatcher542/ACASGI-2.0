import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/index';

interface LanguageContextType {
  language: 'es' | 'en' | 'pt';
  setLanguage: (lang: 'es' | 'en' | 'pt') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<'es' | 'en' | 'pt'>('es');
  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar idioma guardado al iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage') as 'es' | 'en' | 'pt';
    const langToUse = savedLanguage || 'es';
    setLanguageState(langToUse);
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: 'es' | 'en' | 'pt') => {
    setLanguageState(lang);
    localStorage.setItem('appLanguage', lang);
    // Disparar evento personalizado para que otros listeners se enteren
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {isInitialized && children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }
  return context;
}
