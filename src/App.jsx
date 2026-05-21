import React from 'react';

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center p-4">
      <main className="w-full max-w-md mx-auto flex flex-col items-center justify-center space-y-6 text-center">
        <div className="p-6 bg-white dark:bg-slate-900 shadow-xl rounded-2xl w-full border border-slate-100 dark:border-slate-800 transition-all">
          <h1 className="text-3xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 mb-2">
            Tailwind v4 Setup
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Clean folder structure and modern mobile-first defaults.
          </p>
          <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium rounded-xl transition-colors shadow-sm cursor-pointer">
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
