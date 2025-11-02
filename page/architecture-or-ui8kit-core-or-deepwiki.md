# Architecture | ui8kit/core | DeepWiki

Relevant source files

* [.gitignore](https://github.com/ui8kit/core/blob/56a59911/.gitignore)
* [package.json](https://github.com/ui8kit/core/blob/56a59911/package.json)
* [src/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/index.ts)
* [src/registry.json](https://github.com/ui8kit/core/blob/56a59911/src/registry.json)
* [tsconfig.json](https://github.com/ui8kit/core/blob/56a59911/tsconfig.json)

This document provides a comprehensive overview of the @ui8kit/core system architecture, including its layered component organization, module system, build pipeline, and distribution strategy. It covers the internal structure of the library, how components are organized and exported, and how the system integrates into consumer applications.

For information about specific build tools and scripts, see [Build System](broken-reference). For details on TypeScript configuration, see [TypeScript Configuration](typescript-configuration-or-ui8kit-core-or-deepwiki.md). For information about how components are cataloged, see [Component Registry](component-registry-or-ui8kit-core-or-deepwiki.md).

***

## System Overview

The @ui8kit/core library follows a modular, layered architecture designed for tree-shaking, type safety, and flexible consumption. The system is built as an ES module package with TypeScript support and exports a unified API through a single entry point.

### High-Level Architecture Diagram

```
External Consumers

Metadata

Build Artifacts

Entry Point

Source Layer

metadata

core/
variants + utils + ui

ui/
Composite Components

layouts/
Layout Components

themes/
Theme System

hooks/
Custom Hooks

src/index.ts
Public API Aggregator

dist/index.js
Compiled JavaScript

dist/index.d.ts
Type Definitions

package.json
@ui8kit/core v0.1.8

src/registry.json
18 Components Catalog

tsconfig.json
Compilation Config

NPM Registry
Published Package

Consumer Applications
```

Sources: [package.json1-70](https://github.com/ui8kit/core/blob/56a59911/package.json#L1-L70) [src/index.ts1-32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32) [tsconfig.json1-26](https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L1-L26) [src/registry.json1-281](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L281)

### Package Identity and Configuration

The library is distributed as `@ui8kit/core` version 0.1.8, configured as an ES module with TypeScript support. The package is designed with no side effects to enable optimal tree-shaking.

* Package Name: `@ui8kit/core`
* Module Type: `module` (ESM)
* Entry Point: `./dist/index.js`
* Type Definitions: `./dist/index.d.ts`
* Side Effects: `false`
* Target Runtime: ES2022

Sources: [package.json2-3](https://github.com/ui8kit/core/blob/56a59911/package.json#L2-L3) [package.json8](https://github.com/ui8kit/core/blob/56a59911/package.json#L8-L8) [package.json30-37](https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L37)

***

## Layered Component Architecture

The component system is organized in three distinct layers, each with specific responsibilities and dependencies. This separation enables modular consumption and clear dependency management.

### Layer Dependency Diagram

```
Layer 3: Presentation

Layer 2: Composition

Layer 1: Foundation

context

context

core/variants
CVA Definitions

core/utils
Utility Functions

core/ui
13 Base Components

ui/
Composite UI Components

layouts/
Layout Components

themes/ThemeProvider

themes/
skyOSTheme,
modernUITheme,
lesseUITheme
```

Sources: [src/index.ts1-3](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L3) [src/index.ts6-20](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L6-L20) [src/index.ts23-26](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L23-L26) [src/registry.json3-276](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L3-L276)

### Layer 1: Foundation Layer

The foundation layer provides the building blocks for all higher-level components. It consists of:

* Variants (`core/variants`): Class Variance Authority (CVA) definitions for component styling
* Utils (`core/utils`): Helper functions for class name merging and manipulation
* Primitives (`core/ui`): 13 base components that serve as the foundation

The primitives are low-level, unstyled components that provide the structural and behavioral foundation. These include `Block`, `Container`, `Grid`, `Flex`, `Box`, `Stack`, `Component`, `Element`, `Card`, `Button`, `Badge`, `Image`, and `Icon`.

Sources: [src/index.ts1-3](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L3) [src/index.ts6-20](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L6-L20)

### Layer 2: Composition Layer

The composition layer builds upon the foundation to provide feature-complete components with enhanced APIs. This layer includes:

* UI Components (15 components): Full-featured components with prop forwarding, variants, and styling
* Layout Components (3 components): Specialized layout containers and patterns

These components consume the base primitives and add additional functionality, default styling, and composed behaviors.

Sources: [src/index.ts23-26](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L23-L26) [src/registry.json3-276](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L3-L276)

### Layer 3: Presentation Layer

The presentation layer provides theming capabilities through:

* ThemeProvider: Context provider for theme state management
* Themes: Three pre-built themes (`skyOSTheme`, `modernUITheme`, `lesseUITheme`)

The theme system uses React Context to provide theme configuration to all components in the tree.

Sources: [src/index.ts28-29](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L28-L29)

***

## Module System and Exports

The library uses a centralized export strategy through `src/index.ts`, which aggregates all public APIs into a single entry point. This approach provides a clean consumer experience while maintaining internal modularity.

### Export Strategy Diagram

```
Public API

Export Transformation

Internal Modules

core/variants

core/utils

core/ui

ui/

layouts/

themes/

hooks/

src/index.ts

export * from './core/variants'

export * from './core/utils'

export { Block as BaseBlock, ... }

export * from './ui'

export * from './layouts'

export * from './themes'

export * from './hooks'

variants

utils

Base* primitives

UI components

Layout components

Themes

Hooks
```

Sources: [src/index.ts1-32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32)

### Base Prefix Convention

To avoid naming conflicts between primitive components and their enhanced counterparts, the library exports core primitives with a `Base` prefix:

```ts
// Primitives exported with Base prefix
export {
  Block as BaseBlock,
  Container as BaseContainer,
  Grid as BaseGrid,
  Flex as BaseFlex,
  Box as BaseBox,
  Stack as BaseStack,
  Component as BaseComponent,
  Element as BaseElement,
  Card as BaseCard,
  Button as BaseButton,
  Badge as BaseBadge,
  Image as BaseImage,
  Icon as BaseIcon
} from './core/ui';
```

Sources: [src/index.ts6-20](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L6-L20)

### Package Exports Configuration

The package is configured with explicit export mappings for ESM compatibility:

```json
"exports": {
  ".": {
    "import": "./dist/index.js",
    "types": "./dist/index.d.ts"
  }
}
```

This configuration ensures proper module resolution in Node.js and bundlers while providing TypeScript type definitions.

Sources: [package.json33-37](https://github.com/ui8kit/core/blob/56a59911/package.json#L33-L37)

***

## Component Registry System

The registry system maintains a structured catalog of all components, their dependencies, file locations, and metadata. This system powers tooling, documentation generation, and component discovery.

### Registry Structure Diagram

```
Dependency Types

Component Metadata

Component Categories

Registry File

src/registry.json
version: 1.0.0

$schema: buildy.tw/schema

items: Array<18>

version: 1.0.0

lastUpdated

registry: ui

registry:ui
15 components

registry:layout
3 components

name

description

dependencies

files[]
path + target

react

lucide-react

react-resizable-panels
```

Sources: [src/registry.json1-281](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L281)

### Component Categories

The registry organizes components into two types:

| Type            | Count | Components                                                                                                 |
| --------------- | ----- | ---------------------------------------------------------------------------------------------------------- |
| registry:ui     | 15    | Title, Text, Stack, Sheet, Image, Icon, Group, Grid, Container, Card, Button, Box, Block, Badge, Accordion |
| registry:layout | 3     | SplitBlock, LayoutBlock, DashLayout                                                                        |

Sources: [src/registry.json3-276](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L3-L276)

### Dependency Tracking

Each registry entry tracks component-specific dependencies:

* Core dependency: `react`
* Icon dependencies: Sheet and Accordion additionally require `lucide-react`
* Layout dependencies: DashLayout requires both `lucide-react` and `react-resizable-panels`

This granular dependency tracking enables selective installation and tree-shaking.

Sources: [src/registry.json8-10](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L8-L10) [src/registry.json53-56](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L53-L56) [src/registry.json265-268](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L265-L268)

### File Path Mappings

Each component entry specifies:

* path: Source file location (e.g., `src/components/ui/Button/Button.tsx`)
* target: Installation target directory (e.g., `components/ui`)

This enables automated component installation and code generation tooling.

Sources: [src/registry.json12-16](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L12-L16)

***

## Build and Distribution Pipeline

The build system compiles TypeScript source code into distributable JavaScript and type definitions, using both standard TypeScript compilation and custom build tools.

### Build Pipeline Diagram

```
Scripts

Outputs

Build Tools

Configuration

Source

src/
TypeScript Components

package.json
scripts

tsconfig.json
compiler options

tsc
TypeScript Compiler

buildy-ui CLI
Custom Build Tool

dist/index.js
ES2022 Module

dist/index.d.ts
Type Definitions

npm run build
tsc -p tsconfig.json

npm run scan
buildy-ui scan

npm run build:r
buildy-ui build
```

Sources: [package.json21-28](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L28) [tsconfig.json1-26](https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L1-L26)

### Build Scripts

The package defines multiple build-related scripts:

| Script     | Command                       | Purpose                          |
| ---------- | ----------------------------- | -------------------------------- |
| build      | `tsc -p tsconfig.json`        | Standard TypeScript compilation  |
| type-check | `tsc --noEmit`                | Type validation without output   |
| scan       | `bunx buildy-ui@latest scan`  | Component discovery and analysis |
| build:r    | `bunx buildy-ui@latest build` | Custom build with buildy-ui      |

Sources: [package.json22-27](https://github.com/ui8kit/core/blob/56a59911/package.json#L22-L27)

### Compilation Configuration

The TypeScript compiler is configured for modern ES modules with strict type checking:

```json
{
  "target": "ES2022",
  "module": "ES2022",
  "moduleResolution": "Bundler",
  "strict": true,
  "declaration": true,
  "declarationDir": "./dist",
  "outDir": "./dist"
}
```

Sources: [tsconfig.json5-19](https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L5-L19)

### Path Aliases

The TypeScript configuration defines path aliases for internal imports:

| Alias          | Resolution    |
| -------------- | ------------- |
| `@/*`          | `./src/*`     |
| `@ui8kit/core` | `./src/index` |

These aliases enable clean internal imports and support the library's self-reference pattern.

Sources: [tsconfig.json21-24](https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L21-L24)

### Distribution Files

The `files` field in `package.json` specifies which files are included in the published package:

```json
"files": [
  "dist/**/*",
  "README.md",
  "LICENSE"
]
```

This ensures only production-ready artifacts are published, excluding source code and development files.

Sources: [package.json39-43](https://github.com/ui8kit/core/blob/56a59911/package.json#L39-L43)

***

## Dependency Architecture

The library maintains a minimal dependency footprint with clear separation between runtime and peer dependencies.

### Dependency Graph (high level)

* Peer dependencies:
  * react ^18.0.0 || ^19.0.0
  * react-dom ^18.0.0 || ^19.0.0
* Core styling dependencies:
  * class-variance-authority ^0.7.1
  * clsx ^2.1.1
  * tailwind-merge ^3.3.1
* Feature-specific dependencies:
  * lucide-react ^0.525.0
  * react-resizable-panels ^3.0.6

Sources: [package.json48-58](https://github.com/ui8kit/core/blob/56a59911/package.json#L48-L58)

### Dependency Categories

* Peer Dependencies (required by consumer): `react`, `react-dom`
* Core Styling Dependencies: `class-variance-authority`, `clsx`, `tailwind-merge`
* Feature-Specific Dependencies: `lucide-react`, `react-resizable-panels`

Sources: [package.json48-58](https://github.com/ui8kit/core/blob/56a59911/package.json#L48-L58)

***

## Module Resolution and Tree Shaking

The library is optimized for tree-shaking through its ES module architecture and side-effect declarations.

### Tree-Shaking Configuration

```json
{
  "type": "module",
  "sideEffects": false,
  "main": "./dist/index.js",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

The `"sideEffects": false` declaration tells bundlers that all modules are side-effect free and can be safely removed if unused. Combined with the ES module format, this enables optimal tree-shaking in consumer applications.

Sources: [package.json8](https://github.com/ui8kit/core/blob/56a59911/package.json#L8-L8) [package.json30-37](https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L37)

### Import Patterns

Examples of supported import patterns:

```ts
// Named imports (tree-shakeable)
import { Button, Card } from '@ui8kit/core';

// Base component imports
import { BaseButton } from '@ui8kit/core';

// Utility imports
import { cn } from '@ui8kit/core';

// Theme imports
import { ThemeProvider, skyOSTheme } from '@ui8kit/core';
```

All import patterns maintain tree-shaking compatibility due to the side-effect-free architecture.

Sources: [src/index.ts1-32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32) [package.json30](https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L30)

***

## TypeScript Integration

The library provides comprehensive TypeScript support with strict type checking and declaration generation.

### Type System Architecture

```
Consumer Usage

Type Generation

Compiler Configuration

Source TypeScript

src/**/*.tsx
Component Implementations

tsconfig.json

strict: true

jsx: react-jsx

composite: true

declaration: true

dist/index.d.ts
Public Type Definitions

tsconfig.tsbuildinfo
Incremental Cache

Consumer TypeScript

IDE IntelliSense
```

Sources: [tsconfig.json1-26](https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L1-L26)

### Compiler Options (key)

| Option           | Value     | Purpose                                               |
| ---------------- | --------- | ----------------------------------------------------- |
| strict           | true      | Enable all strict type-checking options               |
| declaration      | true      | Generate .d.ts type definition files                  |
| composite        | true      | Enable project references and incremental compilation |
| jsx              | react-jsx | Use React 17+ JSX transform                           |
| target           | ES2022    | Target modern JavaScript features                     |
| moduleResolution | Bundler   | Use bundler-compatible module resolution              |

Sources: [tsconfig.json5-19](https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L5-L19)

### Library Targets

The compilation targets:

```json
{
  "lib": ["DOM", "ESNext", "ES2022"]
}
```

This configuration provides DOM, ESNext, and ES2022 library types.

Sources: [tsconfig.json14](https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L14-L14)

***

## Repository Structure

```
@ui8kit/core/
├── src/                    # Source code
│   ├── core/              # Foundation layer
│   │   ├── variants/      # CVA definitions
│   │   ├── utils/         # Utilities
│   │   └── ui/            # Base components
│   ├── ui/                # UI components
│   ├── layouts/           # Layout components
│   ├── themes/            # Theme system
│   ├── hooks/             # Custom hooks
│   ├── index.ts           # Public API
│   └── registry.json      # Component catalog
├── dist/                  # Build output (gitignored)
├── packages/              # NPM packages (gitignored)
├── node_modules/          # Dependencies (gitignored)
├── package.json           # Package configuration
├── tsconfig.json          # TypeScript configuration
└── .gitignore            # Git ignore rules
```

Sources: [.gitignore1-25](https://github.com/ui8kit/core/blob/56a59911/.gitignore#L1-L25)

### Ignored Artifacts

The `.gitignore` configuration excludes build artifacts and development files:

* Build outputs: `dist/`, `build/`, `packages/`
* Dependencies: `node_modules/`, lock files
* Development: `.vscode/`, `.cursor/`, `.turbo/`
* TypeScript cache: `tsconfig.tsbuildinfo`

Sources: [.gitignore7-13](https://github.com/ui8kit/core/blob/56a59911/.gitignore#L7-L13) [.gitignore15-18](https://github.com/ui8kit/core/blob/56a59911/.gitignore#L15-L18) [.gitignore22-25](https://github.com/ui8kit/core/blob/56a59911/.gitignore#L22-L25)
