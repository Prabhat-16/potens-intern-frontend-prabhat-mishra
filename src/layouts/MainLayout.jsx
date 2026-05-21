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
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col items-center relative">
      <header className="w-full bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="w-full max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-700" strokeWidth={2.5} />
            <h1 className="font-semibold text-lg tracking-tight text-zinc-800">
              {t('appName')}
            </h1>
          </div>
          
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 text-sm font-medium rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Toggle language"
          >
            {i18n.language === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>
      </header>

      <main className="w-full max-w-md mx-auto flex-1 flex flex-col relative overflow-hidden pb-8">
        <Outlet />
      </main>
      
      <InstallPrompt />
    </div>
  );
};

export default MainLayout;
