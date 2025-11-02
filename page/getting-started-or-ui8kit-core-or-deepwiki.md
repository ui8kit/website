# Getting Started | ui8kit/core | DeepWiki

Relevant source files

* https://github.com/ui8kit/core/blob/56a59911/README.md
* https://github.com/ui8kit/core/blob/56a59911/package.json
* https://github.com/ui8kit/core/blob/56a59911/src/index.ts

This document guides you through the initial setup and basic usage of `@ui8kit/core`, a React UI component library. It covers integration patterns (NPM installation and Git submodule), dependency requirements, export surface, basic usage, monorepo integration notes, theme initialization, and development commands.

For additional guides:

* Installation: https://deepwiki.com/ui8kit/core/2.1-installation
* Quick Start Guide: https://deepwiki.com/ui8kit/core/2.2-quick-start-guide
* Monorepo Integration: https://deepwiki.com/ui8kit/core/2.3-monorepo-integration

***

## Overview

`@ui8kit/core` can be integrated into your React application through two primary methods:

* NPM Package Installation — install from the NPM registry for production applications
* Git Submodule Integration — include as a submodule in monorepo environments for local development

Both methods provide access to the same component library, theming system, and build artifacts.

Integration pathways (summary):

| Method        | Installation Command                                   | Resolution Path             | Use Case                |
| ------------- | ------------------------------------------------------ | --------------------------- | ----------------------- |
| NPM Package   | `npm install @ui8kit/core`                             | `node_modules/@ui8kit/core` | Production applications |
| Git Submodule | `git submodule add https://github.com/ui8kit/core.git` | `packages/@ui8kit/core`     | Monorepo development    |

Sources: package.json, README.md, src/index.ts

***

## Integration Architecture

High-level layers and artifacts provided by the package:

* Entry point: `src/index.ts` → compiled to `dist/index.js` and `dist/index.d.ts`
* Exported layers:
  * Core variants (`core/variants`) — CVA definitions
  * Core utils (`core/utils`) — helper functions
  * Base components (`core/ui`) — base primitives (aliased as `Base*`)
  * UI components (`ui/`) — Button, Block, Card, Accordion, etc.
  * Layouts (`layouts/`) — DashLayout, LayoutBlock, SplitBlock
  * Themes (`themes/`) — ThemeProvider, skyOSTheme, modernUITheme, lesseUITheme
  * Hooks (`hooks/`) — useTheme

Example import:

```ts
import { Button, ThemeProvider } from '@ui8kit/core'
```

Sources: src/index.ts

***

## Dependency Requirements

Peer and bundled dependencies your project should satisfy:

| Category          | Dependencies                                         | Version Constraint                                                                     | Purpose                            |
| ----------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------- |
| Peer Dependencies | `react`, `react-dom`                                 | `^18.0.0` or `^19.0.0`                                                                 | Core framework (must be installed) |
| Core Utilities    | `class-variance-authority`, `clsx`, `tailwind-merge` | Fixed versions                                                                         | Styling and variant management     |
| UI Enhancements   | `lucide-react`, `react-resizable-panels`             | Fixed versions                                                                         | Icons and layout components        |
| Build Tools       | `tailwindcss`, `postcss`, `autoprefixer`             | Consumer-managed (`tailwindcss ^3.4.1+`, `postcss ^8.4.35+`, `autoprefixer ^10.4.18+`) | CSS processing pipeline            |

Sources: package.json, README.md

***

## Component Export Structure

Public API (examples):

* `export * from './core/variants'` — CVA definitions
* `export * from './core/utils'` — helper utilities
* `export { Component as BaseComponent }` — BaseBlock, BaseButton, BaseBadge
* `export * from './ui'` — UI components (Button, Block, Card, Accordion)
* `export * from './layouts'` — layout components
* `export * from './themes'` — ThemeProvider and themes
* `export * from './hooks'` — useTheme

Compiled output: `dist/index.js` and type definitions in `dist/index.d.ts`.

Sources: src/index.ts, package.json

***

## Basic Usage Pattern

Minimal setup consists of installation, TypeScript path configuration (optional for source resolution), Tailwind content configuration, wrapping your app with the theme provider, and using components.

{% stepper %}
{% step %}
### Package installation

Choose your package manager:

{% tabs %}
{% tab title="npm" %}
```bash
npm install @ui8kit/core react react-dom
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @ui8kit/core react react-dom
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add @ui8kit/core react react-dom
```
{% endtab %}
{% endtabs %}

Sources: package.json
{% endstep %}

{% step %}
### TypeScript path configuration (optional)

If you want to map the package to its source (useful for direct edits or monorepo setups), add paths to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@ui8kit/core": ["./node_modules/@ui8kit/core/src"],
      "@ui8kit/core/*": ["./node_modules/@ui8kit/core/src/*"]
    }
  }
}
```

Sources: README.md
{% endstep %}

{% step %}
### Tailwind content configuration

Ensure Tailwind scans your app and the package source:

```js
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@ui8kit/core/src/**/*.{ts,tsx}"
  ]
}
```

Sources: README.md
{% endstep %}

{% step %}
### Application wrapper (ThemeProvider)

Wrap your app with a theme provider:

```tsx
import { ThemeProvider, lesseUITheme } from '@ui8kit/core'

function App() {
  return (
    <ThemeProvider theme={lesseUITheme}>
      {/* Your app content */}
    </ThemeProvider>
  )
}
```

Sources: README.md
{% endstep %}

{% step %}
### Component usage

Example component usage after setup:

```tsx
import { Button, Block, Container, Title } from '@ui8kit/core'

function MyComponent() {
  return (
    <Block variant="section" py="xl">
      <Container>
        <Title size="4xl">Hello World</Title>
        <Button variant="primary">Click Me</Button>
      </Container>
    </Block>
  )
}
```

Sources: README.md
{% endstep %}
{% endstepper %}

***

## Monorepo Configuration Flow

When using a monorepo (Turbo, Bun, Vite) with `@ui8kit/core` as a git submodule, typical layout and important settings:

Example monorepo structure:

```
your-monorepo/
├── package.json              # Root workspace definition
├── turbo.json               # Turbo task configuration
├── tsconfig.json            # Base TypeScript config
├── apps/
│   └── web/                 # Vite application
│       ├── package.json     # Depends on workspace:*
│       ├── tsconfig.json
│       ├── vite.config.ts   # Alias + preserveSymlinks
│       └── tailwind.config.js
└── packages/
    └── @ui8kit/
        └── core/            # Git submodule
            ├── src/         # Source TypeScript files
            ├── dist/        # Compiled output
            └── package.json
```

Key configuration elements for the consumer app (`apps/web`):

| File                          | Configuration                                                    | Purpose                        |
| ----------------------------- | ---------------------------------------------------------------- | ------------------------------ |
| `apps/web/package.json`       | `"@ui8kit/core": "workspace:*"`                                  | Workspace dependency reference |
| `apps/web/tsconfig.json`      | `paths: { "@ui8kit/core": ["../../packages/@ui8kit/core/src"] }` | TypeScript module resolution   |
| `apps/web/vite.config.ts`     | `alias: { "@ui8kit/core": "../../packages/@ui8kit/core/src" }`   | Vite module resolution         |
| `apps/web/vite.config.ts`     | `preserveSymlinks: true`                                         | Preserve symbolic links        |
| `apps/web/vite.config.ts`     | `dedupe: ["react", "react-dom"]`                                 | Prevent React duplication      |
| `apps/web/tailwind.config.js` | `content: ["../../packages/@ui8kit/core/src/**/*.{ts,tsx}"]`     | Scan submodule for classes     |

Sources: README.md

***

## Theme System Initialization

Theme features provided:

* ThemeProvider component accepts a theme object (e.g., `lesseUITheme`)
* `useTheme()` hook exposes `isDarkMode` and `toggleDarkMode`
* Theme toggling updates `document.documentElement.classList` (adds/removes `dark`) and persists to `localStorage`
* CSS variables are used for background, foreground, etc.

Example:

```tsx
import { ThemeProvider, useTheme, lesseUITheme } from '@ui8kit/core'
import { Button, Block } from '@ui8kit/core'

function App() {
  return (
    <ThemeProvider theme={lesseUITheme}>
      <AppContent />
    </ThemeProvider>
  )
}

function AppContent() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <Block variant="section">
      <Button onClick={toggleDarkMode}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </Button>
    </Block>
  )
}
```

Sources: README.md, src/index.ts

***

## Development Commands

Commands available in the library's package.json:

| Command        | Script               | Purpose                                     |
| -------------- | -------------------- | ------------------------------------------- |
| Build          | `npm run build`      | Compile TypeScript to `dist/`               |
| Type Check     | `npm run type-check` | Verify TypeScript types without emit        |
| Lint           | `npm run lint`       | Check code quality with ESLint              |
| Lint Fix       | `npm run lint:fix`   | Auto-fix ESLint issues                      |
| Scan           | `npm run scan`       | Run `buildy-ui scan` for component analysis |
| Build Registry | `npm run build:r`    | Build component registry with `buildy-ui`   |

Sources: package.json

***

## Next Steps

* https://deepwiki.com/ui8kit/core/2.1-installation — Installation
* https://deepwiki.com/ui8kit/core/2.2-quick-start-guide — Quick Start Guide
* https://deepwiki.com/ui8kit/core/2.3-monorepo-integration — Monorepo Integration
* https://deepwiki.com/ui8kit/core/4-component-library — Component Library
* https://deepwiki.com/ui8kit/core/5-theming-system — Theming System
* https://deepwiki.com/ui8kit/core/6-styling-architecture — Styling Architecture

Sources: package.json, README.md, src/index.ts
