# Installation | ui8kit/core | DeepWiki

Relevant source files

* https://github.com/ui8kit/core/blob/56a59911/package.json

This page provides instructions for installing the `@ui8kit/core` package and configuring its dependencies. It covers standard package manager installation, dependency requirements, and basic verification steps.

For guidance on using the library after installation, see https://deepwiki.com/ui8kit/core/2.2-quick-start-guide. For integrating the library into a monorepo development environment using Git submodules, see https://deepwiki.com/ui8kit/core/2.3-monorepo-integration.

***

## Prerequisites

Before installing `@ui8kit/core`, ensure your environment meets the following requirements:

| Requirement  | Version            | Notes                         |
| ------------ | ------------------ | ----------------------------- |
| React        | ^18.0.0 or ^19.0.0 | Peer dependency               |
| React DOM    | ^18.0.0 or ^19.0.0 | Peer dependency               |
| Node.js      | ≥ 14.0.0           | Required for package managers |
| Tailwind CSS | ≥ 3.0.0            | Required for styling system   |

The library is built as an ES module (`"type": "module"` in https://github.com/ui8kit/core/blob/56a59911/package.json#L8-L8) and requires a modern JavaScript environment that supports ES2020+ features.

Sources: https://github.com/ui8kit/core/blob/56a59911/package.json#L55-L58

***

## Installation Methods

### Standard Package Manager Installation

Install `@ui8kit/core` using your preferred package manager.

{% tabs %}
{% tab title="npm" %}
```bash
npm install @ui8kit/core
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @ui8kit/core
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm add @ui8kit/core
```
{% endtab %}
{% endtabs %}

(Alternative: `bun add @ui8kit/core` — also supported.)

This will install version `0.1.8` (or the latest published version) from the NPM registry along with all required dependencies.

Sources: https://github.com/ui8kit/core/blob/56a59911/package.json#L2-L3, https://github.com/ui8kit/core/blob/56a59911/package.json#L67-L69

### Alternative: Git Submodule Integration

For monorepo development workflows using Turbo and Vite, the library can be integrated as a Git submodule. This approach enables local development and faster iteration cycles. See https://deepwiki.com/ui8kit/core/2.3-monorepo-integration for detailed instructions.

***

## Dependency Resolution

The following illustrates how dependencies are resolved during installation:

```
Installation Outcome

package.json Configuration

Package Installation

requires

npm install @ui8kit/core

NPM Registry
@ui8kit/Unsupported markdown: link

peerDependencies
react: ^18.0.0 || ^19.0.0
react-dom: ^18.0.0 || ^19.0.0

dependencies
class-variance-authority: ^0.7.1
clsx: ^2.1.1
lucide-react: ^0.525.0
react-resizable-panels: ^3.0.6
tailwind-merge: ^3.3.1

Peer Dependency Check
Must be in host project

Automatic Installation
All dependencies installed

Host Project
node_modules/react
node_modules/react-dom

node_modules/@ui8kit/core
node_modules/class-variance-authority
node_modules/clsx
node_modules/lucide-react
node_modules/react-resizable-panels
node_modules/tailwind-merge
```

Sources: https://github.com/ui8kit/core/blob/56a59911/package.json#L48-L58

### Peer Dependencies

The library declares React and React DOM as peer dependencies, meaning they must be installed separately in your project. Package managers will check for these dependencies and warn if they are missing or incompatible.

```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0"
}
```

Both React 18 and React 19 are supported. If peer dependencies are missing, install them manually:

```bash
npm install react react-dom
```

Sources: https://github.com/ui8kit/core/blob/56a59911/package.json#L55-L58

### Required Dependencies

The following dependencies are automatically installed with the package:

| Package                    | Version  | Purpose                                         |
| -------------------------- | -------- | ----------------------------------------------- |
| `class-variance-authority` | ^0.7.1   | CVA pattern for component variants              |
| `clsx`                     | ^2.1.1   | Conditional className utility                   |
| `tailwind-merge`           | ^3.3.1   | Tailwind class deduplication                    |
| `lucide-react`             | ^0.525.0 | Icon library for Sheet and Accordion components |
| `react-resizable-panels`   | ^3.0.6   | Resizable layout system for DashLayout          |

Note that `lucide-react` and `react-resizable-panels` are only used by specific components (Sheet, Accordion, and DashLayout). Despite this, they are included as regular dependencies to simplify installation. The library's tree-shaking support (`"sideEffects": false` in https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L30) ensures unused code is eliminated in production builds.

Sources: https://github.com/ui8kit/core/blob/56a59911/package.json#L48-L54, https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L30

***

## Package Exports Configuration

The library uses modern module exports to provide proper type definitions and ESM support:

```
Resolved Paths

Module Resolution

package.json Export Fields

main: ./dist/index.js

types: ./dist/index.d.ts

exports: .

import { Button } from '@ui8kit/core'

dist/index.js
Runtime code

dist/index.d.ts
TypeScript definitions
```

The `exports` field in https://github.com/ui8kit/core/blob/56a59911/package.json#L33-L38 ensures proper resolution for both JavaScript runtime and TypeScript type checking. The `main` field (https://github.com/ui8kit/core/blob/56a59911/package.json#L31-L31) provides fallback support for older module resolution algorithms.

Sources: https://github.com/ui8kit/core/blob/56a59911/package.json#L31-L38

***

## Verification

After installation, verify that the package is correctly installed and accessible.

### Check Package Installation

```bash
# List installed package
npm list @ui8kit/core

# Expected output:

# └── @ui8kit/core@0.1.8
```

### Verify Import Resolution

Create a test file to verify the package can be imported:

```ts
// test-import.ts
import { Button, ThemeProvider } from '@ui8kit/core';

console.log('✓ @ui8kit/core installed successfully');
console.log('Button:', typeof Button);
console.log('ThemeProvider:', typeof ThemeProvider);
```

Run the test:

```bash
npx tsx test-import.ts

# or
node --loader ts-node/esm test-import.ts
```

Expected output:

```
✓ @ui8kit/core installed successfully
Button: function
ThemeProvider: function
```

### Verify TypeScript Types

If using TypeScript, verify that type definitions are accessible:

```ts
import type { ButtonProps } from '@ui8kit/core';

// TypeScript should provide autocomplete and type checking
const props: ButtonProps = {
  variant: 'primary',
  size: 'md',
  children: 'Test Button'
};
```

The TypeScript compiler should resolve types from `dist/index.d.ts` without errors.

Sources: https://github.com/ui8kit/core/blob/56a59911/package.json#L32-L32, https://github.com/ui8kit/core/blob/56a59911/package.json#L36-L36

***

## Distribution Files

The installed package includes the following files, as defined in the `files` field of https://github.com/ui8kit/core/blob/56a59911/package.json#L39-L43:

```
node_modules/@ui8kit/core/
├── dist/
│   ├── index.js          # Compiled JavaScript (ESM)
│   ├── index.d.ts        # TypeScript type definitions
│   └── [...]             # Additional compiled files
├── README.md             # Package documentation
└── LICENSE               # GPL-3.0 license
```

Only the `dist/` directory, `README.md`, and `LICENSE` are included in the published package. Source files from `src/` are not distributed to reduce package size.

Sources: https://github.com/ui8kit/core/blob/56a59911/package.json#L39-L43

***

## Troubleshooting

<details>

<summary>Peer Dependency Warnings</summary>

If you receive peer dependency warnings during installation:

```
npm WARN @ui8kit/core@0.1.8 requires a peer of react@^18.0.0 || ^19.0.0 but none is installed.
```

Install the missing peer dependencies:

```bash
npm install react@^19.1.0 react-dom@^19.1.0
```

Sources: https://github.com/ui8kit/core/blob/56a59911/package.json#L55-L58

</details>

<details>

<summary>Module Resolution Errors</summary>

If imports fail with "Cannot find module '@ui8kit/core'":

1. Verify the package is installed: `npm list @ui8kit/core`
2. Check `node_modules/@ui8kit/core` exists
3. Clear package manager cache: `npm cache clean --force`
4. Reinstall: `npm install`

</details>

<details>

<summary>TypeScript Type Errors</summary>

If TypeScript cannot find type definitions:

1. Verify `dist/index.d.ts` exists in the installed package
2. Check `tsconfig.json` includes `node_modules` in `typeRoots`
3. Restart the TypeScript language server

Sources: https://github.com/ui8kit/core/blob/56a59911/package.json#L55-L58, https://github.com/ui8kit/core/blob/56a59911/package.json#L32-L32

</details>

***

## Next Steps

After successful installation, proceed to:

* https://deepwiki.com/ui8kit/core/2.2-quick-start-guide - Learn basic usage patterns and import components
* https://deepwiki.com/ui8kit/core/5.1-theme-provider - Configure theming for your application
* https://deepwiki.com/ui8kit/core/4-component-library - Explore available components

For advanced setup in monorepo environments, see https://deepwiki.com/ui8kit/core/2.3-monorepo-integration.

Sources: https://github.com/ui8kit/core/blob/56a59911/package.json#L1-L70
