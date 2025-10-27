import React from 'react';
import { Book, Settings, Sun, Moon } from 'lucide-react';

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-gradient-to-tr from-indigo-500 via-violet-500 to-fuchsia-500 text-white">
            <Book size={18} />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-semibold tracking-tight">Vibe Docs</h1>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:block">A minimal, markdown-first documentation site</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="inline-flex items-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span className="hidden sm:block">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
            <Settings size={16} />
            <span className="text-sm">Highly customizable</span>
          </div>
        </div>
      </div>
    </header>
  );
}
