import React from 'react';
import { SlidersHorizontal, Maximize2, Minimize2, Type } from 'lucide-react';

export default function Toolbar({ fontSize, onFontSize, wide, onToggleWide }) {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
          <SlidersHorizontal size={16} />
          <span className="text-sm">Customize</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm border border-neutral-200 dark:border-neutral-800 rounded-md px-2 py-1">
            <Type size={14} className="text-neutral-500" />
            <span className="hidden sm:block text-neutral-600 dark:text-neutral-300">Font</span>
            <select
              value={fontSize}
              onChange={(e) => onFontSize(e.target.value)}
              className="bg-transparent outline-none text-neutral-700 dark:text-neutral-200"
            >
              <option value="text-sm">Small</option>
              <option value="text-base">Medium</option>
              <option value="text-lg">Large</option>
            </select>
          </label>
          <button
            onClick={onToggleWide}
            className="inline-flex items-center gap-2 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          >
            {wide ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span className="hidden sm:block">{wide ? 'Standard width' : 'Wide mode'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
