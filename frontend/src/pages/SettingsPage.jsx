import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { THEMES } from '../constants';

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Settings</h2>
      <p className="text-center mb-6 text-gray-500 dark:text-gray-300">
        Choose a theme for your chat interface
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {THEMES.map((t) => (
          <button
            key={t}
            onClick={() =>setTheme(t)}
            className={`rounded-xl overflow-hidden shadow-md border-2 transition duration-200 ${
              theme === t ? 'border-blue-500 scale-105' : 'border-transparent hover:border-blue-400'
            }`}
          >
            <div data-theme={t} className="p-4 space-y-2">
              <div className="flex justify-between gap-1">
                <div className="w-1/4 h-6 rounded bg-primary" />
                <div className="w-1/4 h-6 rounded bg-secondary" />
                <div className="w-1/4 h-6 rounded bg-accent" />
                <div className="w-1/4 h-6 rounded bg-neutral" />
              </div>
              <div className="text-xs text-center mt-2 font-medium">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
