import React from 'react';

// A minimal Markdown renderer to avoid external deps
// Supports: #, ##, ###, #### headings, paragraphs, inline code, bold, italic, links, lists, code blocks

function renderInline(text) {
  // Escape HTML
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Links [text](url)
  const parts = [];
  let remaining = text;

  const pushText = (t) => parts.push(t);

  const patterns = [
    { type: 'link', regex: /\[([^\]]+)\]\(([^)]+)\)/ },
    { type: 'code', regex: /`([^`]+)`/ },
    { type: 'bold', regex: /\*\*([^*]+)\*\*/ },
    { type: 'italic', regex: /\*([^*]+)\*/ }
  ];

  // Greedy left-to-right simple parse
  while (remaining.length) {
    let earliest = null;
    let matchInfo = null;
    for (const p of patterns) {
      const m = p.regex.exec(remaining);
      if (m && (earliest === null || m.index < earliest)) {
        earliest = m.index;
        matchInfo = { p, m };
      }
    }
    if (matchInfo === null) {
      pushText(esc(remaining));
      break;
    }
    if (earliest > 0) {
      pushText(esc(remaining.slice(0, earliest)));
    }
    const { p, m } = matchInfo;
    const before = remaining.slice(0, m.index);
    const after = remaining.slice(m.index + m[0].length);
    if (p.type === 'link') {
      parts.push(<a key={parts.length} className="text-indigo-600 dark:text-indigo-400 underline" href={m[2]} target="_blank" rel="noreferrer">{m[1]}</a>);
    } else if (p.type === 'code') {
      parts.push(<code key={parts.length} className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-pink-600 dark:text-pink-400">{m[1]}</code>);
    } else if (p.type === 'bold') {
      parts.push(<strong key={parts.length}>{m[1]}</strong>);
    } else if (p.type === 'italic') {
      parts.push(<em key={parts.length}>{m[1]}</em>);
    }
    remaining = after;
  }

  return parts.map((p, i) => typeof p === 'string' ? <React.Fragment key={i} dangerouslySetInnerHTML={{ __html: p }} /> : React.cloneElement(p, { key: i }));
}

export default function DocRenderer({ markdown, className = '' }) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block ```
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      // skip closing ```
      i++;
      blocks.push(
        <pre key={blocks.length} className="my-4 overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          <code className="block p-4 text-sm leading-relaxed">
            {codeLines.join('\n')}
          </code>
        </pre>
      );
      continue;
    }

    // Headings
    const headingMatch = /^(#{1,4})\s+(.*)/.exec(line);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = headingMatch[2];
      const Tag = `h${Math.min(level, 4)}`;
      const size = level === 1 ? 'text-2xl' : level === 2 ? 'text-xl' : level === 3 ? 'text-lg' : 'text-base';
      blocks.push(
        <Tag key={blocks.length} className={`${size} font-semibold mt-6 mb-2`}>{renderInline(content)}</Tag>
      );
      i++;
      continue;
    }

    // Lists
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      let j = i;
      while (j < lines.length && /^\s*[-*]\s+/.test(lines[j])) {
        items.push(lines[j].replace(/^\s*[-*]\s+/, ''));
        j++;
      }
      blocks.push(
        <ul key={blocks.length} className="list-disc pl-6 my-3 space-y-1">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it)}</li>
          ))}
        </ul>
      );
      i = j;
      continue;
    }

    // Empty line => spacer
    if (line.trim() === '') {
      blocks.push(<div key={blocks.length} className="h-2" />);
      i++;
      continue;
    }

    // Paragraph
    blocks.push(
      <p key={blocks.length} className="my-2 leading-7 text-neutral-800 dark:text-neutral-200">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return (
    <article className={`prose prose-neutral dark:prose-invert max-w-none ${className}`}>
      {blocks}
    </article>
  );
}
