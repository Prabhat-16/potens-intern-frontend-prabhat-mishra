import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import InstallPrompt from '../components/InstallPrompt';

const MainLayout = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-zinc-900 font-sans selection:bg-zinc-200 selection:text-zinc-900 flex flex-col items-center relative antialiased">
      <header className="w-full bg-white/75 backdrop-blur-md border-b border-zinc-200/60 sticky top-0 z-50">
        <div className="w-full max-w-md mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-zinc-800" strokeWidth={2} />
            <h1 className="font-semibold text-[15px] tracking-tight text-zinc-800">
              {t('appName')}
            </h1>
          </div>
          
          <button
            onClick={toggleLanguage}
            className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors focus:outline-none"
            aria-label="Toggle language"
          >
            {i18n.language === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>
      </header>

      <main className="w-full max-w-md mx-auto flex-1 flex flex-col relative overflow-hidden pb-10 px-1 pt-2">
        <Outlet />
      </main>
      
      <InstallPrompt />
    </div>
  );
};

export default MainLayout;
