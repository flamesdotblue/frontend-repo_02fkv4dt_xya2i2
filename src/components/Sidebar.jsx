import React from 'react';
import { FolderTree, FileText } from 'lucide-react';

export default function Sidebar({ docs, activeKey, onSelect }) {
  return (
    <aside className="h-full w-64 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-y-auto">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
        <FolderTree size={18} />
        <span className="text-sm font-medium">Documentation</span>
      </div>
      <nav className="p-2 space-y-4">
        {docs.map((category) => (
          <div key={category.id}>
            <div className="px-2 mb-2 text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{category.title}</div>
            <ul className="space-y-1">
              {category.pages.map((page) => {
                const isActive = activeKey === page.key;
                return (
                  <li key={page.key}>
                    <button
                      onClick={() => onSelect(page.key)}
                      className={
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 " +
                        (isActive ? "bg-neutral-100 dark:bg-neutral-800/70 font-medium" : "")
                      }
                    >
                      <FileText size={16} className="text-neutral-500" />
                      <span>{page.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
