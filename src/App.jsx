import React, { useMemo, useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Toolbar from './components/Toolbar.jsx';
import DocRenderer from './components/DocRenderer.jsx';

// Documentation content definition
const docs = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    pages: [
      {
        key: 'choose-os',
        title: 'Choose your OS',
        content: `# Choose your OS

Selecting the right environment ensures a smooth developer experience.

- Windows users: we strongly recommend using Windows Subsystem for Linux (WSL2) for a native-like Linux workflow.
- macOS users: you can follow the Linux guidance; most tools are available via Homebrew.
- Linux users: you already have the ideal setup — just install the required packages.

## Quick recommendations
- Use a modern terminal (Windows Terminal, iTerm2, GNOME Terminal)
- Install a recent Node.js LTS and Python 3.10+
- Prefer package managers (npm, pip) over manual downloads
`
      },
      {
        key: 'windows-wsl',
        title: 'Windows + WSL Guide',
        content: `# Windows + WSL2 Guide

WSL2 gives you a full Linux environment on Windows with near-native performance.

## Install WSL2
1. Open PowerShell as Administrator and run:

```powershell
wsl --install
```

2. Restart your PC when prompted. On first launch, choose a Linux distro (Ubuntu recommended) and create a username/password.

## Essentials inside WSL (Ubuntu)
```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Git, cURL, build tools
sudo apt install -y git curl build-essential

# Install Node.js LTS via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# Install Python and pip
sudo apt install -y python3 python3-pip
```

## VS Code integration
- Install "Remote - WSL" extension
- Open your project from WSL: code .
- Use the integrated terminal (it runs in Linux)

## File locations
- Keep project files in the Linux filesystem, e.g. /home/<you>/projects to avoid performance issues.
`
      },
      {
        key: 'linux-setup',
        title: 'Linux Guide',
        content: `# Linux Setup Guide

Most distributions will work. Commands below are for Debian/Ubuntu; adapt for your distro.

## System packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl build-essential python3 python3-pip
```

## Node.js via nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
```

## Helpful tools
- ripgrep (fast search)
- zsh + oh-my-zsh (shell experience)
- Docker (optional, for services)
`
      }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend: Init & Practices',
    pages: [
      {
        key: 'frontend-init',
        title: 'Initialize Frontend',
        content: `# Initialize a Frontend (Vite + React)

```bash
# Create app
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

## Project hygiene
- Use a component-per-file structure
- Keep components focused and reusable
- Prefer functional components and hooks
- Co-locate styles with components; Tailwind utilities keep it tidy

## Styling practices
- Use semantic HTML and accessible patterns
- Build a small set of primitives (Button, Card, Input)
- Encapsulate variants with classnames or a utility

## Performance tips
- Code-split routes or heavy components
- Memoize expensive renders
- Prefer CSS animations over JS when possible
`
      },
      {
        key: 'frontend-best-practices',
        title: 'Frontend Best Practices',
        content: `# Frontend Best Practices

## State management
- Keep state local when possible
- Lift state only when multiple components need it
- For complex apps, consider tools like Zustand or Redux Toolkit

## API calls
- Create a tiny API client module
- Handle loading, error, and empty states
- Debounce user input for search

## Accessibility
- Keyboard navigation first
- Proper labels and roles
- Sufficient color contrast

## Testing
- Unit test pure logic
- Integration test critical flows
`
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Database',
    pages: [
      {
        key: 'backend-init',
        title: 'Initialize Backend',
        content: `# Initialize a Backend (FastAPI)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn
```

Create a main file and run:

```bash
uvicorn main:app --reload --port 8000
```

## Structure
- Separate routers by domain
- Use Pydantic models for validation
- Keep business logic in services
`
      },
      {
        key: 'database',
        title: 'Database Patterns',
        content: `# Database Patterns

## Choosing a database
- Start with Postgres or a managed document store
- Prefer migrations even for schemaless databases

## Essentials
- Use connection pooling
- Keep queries in repositories
- Validate all inputs at the edge

## Example schema (SQL)
```sql
CREATE TABLE users (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```
`
      }
    ]
  }
];

function findPageContent(key) {
  for (const cat of docs) {
    for (const page of cat.pages) {
      if (page.key === key) return page;
    }
  }
  return null;
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('text-base');
  const [wide, setWide] = useState(true);
  const [activeKey, setActiveKey] = useState('choose-os');

  useEffect(() => {
    const isDark = theme === 'dark';
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  const page = useMemo(() => findPageContent(activeKey), [activeKey]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 flex flex-col">
      <Header theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <div className="flex flex-1 min-h-0">
        <Sidebar docs={docs} activeKey={activeKey} onSelect={setActiveKey} />
        <main className="flex-1 flex flex-col min-w-0">
          <Toolbar
            fontSize={fontSize}
            onFontSize={setFontSize}
            wide={wide}
            onToggleWide={() => setWide((w) => !w)}
          />
          <div className={(wide ? 'max-w-7xl' : 'max-w-3xl') + ' w-full mx-auto px-4 sm:px-6 lg:px-8 py-6'}>
            <div className={`rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm`}> 
              {page ? (
                <div className={fontSize}>
                  <DocRenderer markdown={page.content} />
                </div>
              ) : (
                <p>Choose a page from the sidebar.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
