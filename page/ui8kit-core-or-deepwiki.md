# ui8kit/core | DeepWiki

Relevant source files

* [.gitignore](https://github.com/ui8kit/core/blob/56a59911/.gitignore)
* [package.json](https://github.com/ui8kit/core/blob/56a59911/package.json)
* [src/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/index.ts)
* [src/registry.json](https://github.com/ui8kit/core/blob/56a59911/src/registry.json)

This document provides a high-level introduction to the `@ui8kit/core` library, describing its purpose, architecture, and key features. For installation and usage instructions, see [Getting Started](getting-started-or-ui8kit-core-or-deepwiki.md). For detailed architectural explanations, see [Architecture](architecture-or-ui8kit-core-or-deepwiki.md). For component documentation, see [Component Library](component-library-or-ui8kit-core-or-deepwiki.md).

## Purpose and Scope

`@ui8kit/core` is an open-source React UI component library that provides 18 production-ready components built with Tailwind CSS. The library combines utility-first styling with semantic class names, enabling rapid UI development while maintaining design consistency. It is distributed as an NPM package with full TypeScript support and includes a built-in theming system with dark mode support.

**Sources:** [package.json1-70](https://github.com/ui8kit/core/blob/56a59911/package.json#L1-L70)

## Library Identity

| Property            | Value                                                            |
| ------------------- | ---------------------------------------------------------------- |
| Package Name        | `@ui8kit/core`                                                   |
| Current Version     | `0.1.8`                                                          |
| License             | GPL-3.0                                                          |
| Repository          | [https://github.com/ui8kit/core](https://github.com/ui8kit/core) |
| Homepage            | [https://buildy.tw/](https://buildy.tw/)                         |
| Module System       | ESM (ES Modules)                                                 |
| React Compatibility | \`^18.0.0                                                        |

The library is designed as a peer-dependency-based package, requiring consumers to provide their own React installation. This approach minimizes bundle size and prevents version conflicts in consuming applications.

**Sources:** [package.json1-58](https://github.com/ui8kit/core/blob/56a59911/package.json#L1-L58)

## Key Features

### Component Catalog

The library provides 18 cataloged components organized into two categories:

| Category          | Count | Components                                                                                                 |
| ----------------- | ----: | ---------------------------------------------------------------------------------------------------------- |
| `registry:ui`     |    15 | Title, Text, Stack, Sheet, Image, Icon, Group, Grid, Container, Card, Button, Box, Block, Badge, Accordion |
| `registry:layout` |     3 | SplitBlock, LayoutBlock, DashLayout                                                                        |

Each component is registered in [src/registry.json1-281](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L281) with metadata including dependencies, file paths, and type classifications.

**Sources:** [src/registry.json1-281](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L281)

### Styling Architecture

{% stepper %}
{% step %}
### Class Variance Authority (CVA)

Type-safe component variants defined in [src/core/variants](https://github.com/ui8kit/core/blob/56a59911/src/core/variants)
{% endstep %}

{% step %}
### Utility Classes

Tailwind-based design tokens exported from [src/core/utils](https://github.com/ui8kit/core/blob/56a59911/src/core/utils)
{% endstep %}

{% step %}
### Semantic Layer

High-level components in [src/ui/](https://github.com/ui8kit/core/blob/56a59911/src/ui/) and [src/layouts/](https://github.com/ui8kit/core/blob/56a59911/src/layouts/)
{% endstep %}
{% endstepper %}

For detailed information about the styling system, see [Styling Architecture](styling-architecture-or-ui8kit-core-or-deepwiki.md).

**Sources:** [src/index.ts1-32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32)

### Built-in Theming

Three pre-built themes are included:

* `skyOSTheme` — Sky operating system aesthetic
* `modernUITheme` — Contemporary minimal design
* `lesseUITheme` — Simplified interface style

The `ThemeProvider` component manages theme state, dark mode toggling, and accessibility preferences. For theme documentation, see [Theming System](theming-system-or-ui8kit-core-or-deepwiki.md).

**Sources:** Package Diagram 5 from context

## Package Distribution

The library is distributed through NPM with the following entry points:

```
NPM Package

Distribution Artifacts

Export Layer

Source Organization

src/core/variants
src/core/utils
src/core/ui

src/ui/

src/layouts/

src/themes/

src/hooks/

src/index.ts
Main Export File

dist/index.js
ES Module

dist/index.d.ts
TypeScript Types

@ui8kit/core
package.json main

package.json exports field
```

**Distribution Configuration**

The [package.json30-43](https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L43) defines the package structure:

* **Main Entry**: `./dist/index.js` — Compiled ES module
* **Type Definitions**: `./dist/index.d.ts` — TypeScript declarations
* **Side Effects**: `false` — Enables tree-shaking optimization
* **Included Files**: `dist/**/*`, `README.md`, `LICENSE`

**Sources:** [package.json30-43](https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L43)

## Component Organization and Export Strategy

The library uses a layered export architecture to separate internal primitives from public APIs:

```
Public API Layer

Export Mapping in src/index.ts

Core Layer

src/core/ui/
Internal Primitives

Block

Container

Grid

Flex

Box

Stack

Component

Element

Card

Button

Badge

Image

Icon

BaseBlock, BaseContainer
BaseGrid, BaseFlex, BaseBox
BaseStack, BaseComponent
BaseElement, BaseCard
BaseButton, BaseBadge
BaseImage, BaseIcon

src/ui/*
Composite Components

src/layouts/*
Layout Components

Public API
```

### Aliasing Strategy

Core primitives are exported with a `Base` prefix to prevent naming conflicts with composite components. For example:

* `Block` from [src/core/ui](https://github.com/ui8kit/core/blob/56a59911/src/core/ui) → exported as `BaseBlock`
* `Button` from [src/core/ui](https://github.com/ui8kit/core/blob/56a59911/src/core/ui) → exported as `BaseButton`
* `Container` from [src/core/ui](https://github.com/ui8kit/core/blob/56a59911/src/core/ui) → exported as `BaseContainer`

Composite components from [src/ui/](https://github.com/ui8kit/core/blob/56a59911/src/ui/) are exported without prefixes, representing the primary public API.

**Sources:** [src/index.ts5-20](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L5-L20)

## Dependency Architecture

The library has minimal external dependencies to maintain a small footprint:

| Dependency                 | Purpose                               | Type    |
| -------------------------- | ------------------------------------- | ------- |
| `class-variance-authority` | Component variant management          | Runtime |
| `clsx`                     | Conditional class name construction   | Runtime |
| `tailwind-merge`           | Tailwind class deduplication          | Runtime |
| `lucide-react`             | Icon library (selective components)   | Runtime |
| `react-resizable-panels`   | Layout panel system (DashLayout only) | Runtime |
| `react`                    | UI framework                          | Peer    |
| `react-dom`                | DOM rendering                         | Peer    |

Only 2 components require `lucide-react` (Sheet, Accordion), and only 1 requires `react-resizable-panels` (DashLayout), as documented in [src/registry.json50-276](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L50-L276)

**Sources:** [package.json48-58](https://github.com/ui8kit/core/blob/56a59911/package.json#L48-L58) [src/registry.json50-276](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L50-L276)

## Build and Development Tooling

```
Generated Artifacts

Build Tools

Development Scripts

npm run type-check
npm run lint

npm run build
tsc -p tsconfig.json

npm run scan
bunx buildy-ui scan

npm run build:r
bunx buildy-ui build

TypeScript Compiler
tsconfig.json

buildy-ui CLI
Component Scanner

dist/index.js
dist/index.d.ts

src/registry.json
Component Metadata
```

### Available Scripts

The [package.json21-29](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L29) defines the following development commands:

| Script       | Command                           | Purpose                                  |
| ------------ | --------------------------------- | ---------------------------------------- |
| `build`      | `tsc -p tsconfig.json`            | Compile TypeScript to JavaScript         |
| `type-check` | `tsc --noEmit`                    | Validate TypeScript types without output |
| `lint`       | `eslint src --ext .ts,.tsx`       | Check code quality                       |
| `lint:fix`   | `eslint src --ext .ts,.tsx --fix` | Auto-fix linting issues                  |
| `scan`       | `bunx buildy-ui@latest scan`      | Scan and analyze components              |
| `build:r`    | `bunx buildy-ui@latest build`     | Build with buildy-ui tool                |

The `buildy-ui` CLI is a custom tool that generates and maintains the component registry. For details on the build system, see [Build System](broken-reference).

**Sources:** [package.json21-29](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L29)

## Integration Patterns

The library supports multiple integration patterns:

### NPM Package Installation

Standard installation via package managers:

```
npm install @ui8kit/core
bun add @ui8kit/core
```

See [Installation](installation-or-ui8kit-core-or-deepwiki.md) for detailed setup instructions.

### Monorepo Submodule Pattern

The library can be included as a Git submodule in monorepo architectures using Turbo, Bun, and Vite. The [.gitignore7-8](https://github.com/ui8kit/core/blob/56a59911/.gitignore#L7-L8) excludes `packages/` and includes turbo configuration, indicating support for this pattern. See [Monorepo Integration](broken-reference) for implementation details.

**Sources:** [.gitignore1-26](https://github.com/ui8kit/core/blob/56a59911/.gitignore#L1-L26) Package Diagram 3 from context

## Component Registry System

The [src/registry.json1-281](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L281) file serves as the single source of truth for component metadata:

* **Version Tracking**: Current version `1.0.0`
* **Type Classification**: Components categorized as `registry:ui` or `registry:layout`
* **Dependency Mapping**: Explicit dependencies for each component
* **File Locations**: Source file paths for automated tooling

The registry powers documentation generation, dependency analysis, and component scanning tools. For detailed information, see [Component Registry](component-registry-or-ui8kit-core-or-deepwiki.md).

**Sources:** [src/registry.json1-281](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L281)

## Module System and Tree-Shaking

The library is configured for optimal tree-shaking:

* **Module Type**: `"type": "module"` in [package.json8](https://github.com/ui8kit/core/blob/56a59911/package.json#L8-L8)
* **Side Effects**: `"sideEffects": false` in [package.json30](https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L30)
* **Export Maps**: Explicit exports field in [package.json33-38](https://github.com/ui8kit/core/blob/56a59911/package.json#L33-L38)

This configuration ensures that bundlers like Webpack, Rollup, and Vite can eliminate unused code from production builds.

**Sources:** [package.json8-38](https://github.com/ui8kit/core/blob/56a59911/package.json#L8-L38)

## Next Steps

* For installation instructions, see [Getting Started](getting-started-or-ui8kit-core-or-deepwiki.md)
* For architectural deep-dives, see [Architecture](architecture-or-ui8kit-core-or-deepwiki.md)
* For component documentation, see [Component Library](component-library-or-ui8kit-core-or-deepwiki.md)
* For theming and customization, see [Theming System](theming-system-or-ui8kit-core-or-deepwiki.md)
* For contributing to the library, see [Development Guide](broken-reference)
