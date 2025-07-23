// store/useThemeStore.js
import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "light",  // default theme fallback
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
    // Also update <html data-theme="..."> if needed
    document.documentElement.setAttribute("data-theme", theme);
  }
}));
