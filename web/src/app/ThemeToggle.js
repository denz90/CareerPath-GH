"use client";

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check initial theme state of the html element
    const root = window.document.documentElement;
    const isDark = root.classList.contains('dark') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && !root.classList.contains('light'));
    
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer focus:outline-none flex items-center justify-center border border-border/50"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-amber-500 animate-in spin-in-45 duration-300" />
      ) : (
        <Moon size={18} className="text-indigo-600 animate-in spin-in-45 duration-300" />
      )}
    </button>
  );
}
