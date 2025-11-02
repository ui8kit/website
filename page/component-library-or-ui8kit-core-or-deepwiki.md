# Component Library | ui8kit/core | DeepWiki

Relevant source files

* [.gitignore](https://github.com/ui8kit/core/blob/56a59911/.gitignore)
* [src/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/index.ts)
* [src/registry.json](https://github.com/ui8kit/core/blob/56a59911/src/registry.json)

This document provides a comprehensive overview of all components available in `@ui8kit/core`. It covers the component organization structure, registry system, dependency relationships, and public API exports. For detailed documentation of specific component types, see [Base Components](base-components-or-ui8kit-core-or-deepwiki.md), [UI Components](ui-components-or-ui8kit-core-or-deepwiki.md), and [Layout Components](layout-components-or-ui8kit-core-or-deepwiki.md).

## Component Organization

The component library is organized in a three-tier architecture that separates concerns and enables progressive composition:

* Tier 1: Core Primitives (foundational building blocks)
* Tier 2: Composite UI Components (feature-rich components)
* Tier 3: Layout Factories (high-level layout composition)

Structure (high-level):

* core/ui/ — 13 base components (exported with `Base` prefix)
* ui/ — 15 composite UI components (registry:ui)
* layouts/ — 3 layout components (registry:layout)
* src/index.ts — exports with prefixes/aliases
* src/registry.json — 18 components cataloged

Tier details:

* Tier 1: Core Primitives — Located in [src/core/ui](https://github.com/ui8kit/core/blob/56a59911/src/core/ui). Exported with a `Base` prefix to avoid naming conflicts (e.g., `BaseBlock`, `BaseButton`). Low-level rendering primitives.
* Tier 2: Composite UI Components — Located in [src/ui](https://github.com/ui8kit/core/blob/56a59911/src/ui). Feature-rich components like `Accordion`, `Card`, and `Sheet`.
* Tier 3: Layout Factories — Located in [src/layouts](https://github.com/ui8kit/core/blob/56a59911/src/layouts). High-level layouts like `DashLayout` and `SplitBlock`.

Sources: [src/index.ts#L1-L32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32), [src/registry.json#L1-L281](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L281)

***

## Component Registry System

The library uses `registry.json` as a single source of truth for component metadata. This file powers build tools, documentation generation, and component discovery.

### Registry Structure

| Field         | Type   | Purpose                              |
| ------------- | ------ | ------------------------------------ |
| `$schema`     | string | JSON schema reference for validation |
| `items`       | array  | Array of component definitions       |
| `version`     | string | Registry version (currently 1.0.0)   |
| `lastUpdated` | string | ISO timestamp of last update         |
| `registry`    | string | Registry type identifier ("ui")      |

### Component Definition Schema

Each component in the registry follows this structure:

* name — Component identifier
* type — `registry:ui` or `registry:layout`
* description — Optional docs
* dependencies — Runtime dependencies
* files — Source paths + targets

Source: [src/registry.json#L1-L10](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L10)

***

## Complete Component Catalog

### Registry Type: `registry:ui` (15 components)

| Component | File Path                                   | External Dependencies |
| --------- | ------------------------------------------- | --------------------- |
| Title     | `src/components/ui/Title/Title.tsx`         | react                 |
| Text      | `src/components/ui/Text/Text.tsx`           | react                 |
| Stack     | `src/components/ui/Stack/Stack.tsx`         | react                 |
| Sheet     | `src/components/ui/Sheet/Sheet.tsx`         | react, lucide-react   |
| Image     | `src/components/ui/Image/Image.tsx`         | react                 |
| Icon      | `src/components/ui/Icon/Icon.tsx`           | react                 |
| Group     | `src/components/ui/Group/Group.tsx`         | react                 |
| Grid      | `src/components/ui/Grid/Grid.tsx`           | react                 |
| Container | `src/components/ui/Container/Container.tsx` | react                 |
| Card      | `src/components/ui/Card/Card.tsx`           | react                 |
| Button    | `src/components/ui/Button/Button.tsx`       | react                 |
| Box       | `src/components/ui/Box/Box.tsx`             | react                 |
| Block     | `src/components/ui/Block/Block.tsx`         | react                 |
| Badge     | `src/components/ui/Badge/Badge.tsx`         | react                 |
| Accordion | `src/components/ui/Accordion/Accordion.tsx` | react, lucide-react   |

### Registry Type: `registry:layout` (3 components)

| Component   | File Path                     | External Dependencies                | Description                               |
| ----------- | ----------------------------- | ------------------------------------ | ----------------------------------------- |
| SplitBlock  | `src/layouts/SplitBlock.tsx`  | react                                | Content hook system for replaceable parts |
| LayoutBlock | `src/layouts/LayoutBlock.tsx` | react                                | Layout types definition                   |
| DashLayout  | `src/layouts/DashLayout.tsx`  | lucide-react, react-resizable-panels | Resizable dashboard layout                |

Sources: [src/registry.json#L3-L276](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L3-L276)

***

## Dependency Architecture

Most components depend only on React. External libraries are used selectively:

* react — peer dependency for most components
* lucide-react — optional, used by `Sheet`, `Accordion`, `DashLayout`
* react-resizable-panels — optional, used by `DashLayout`

Dependency categories:

* Zero External Dependencies — 13 components depend only on React (peer dependency), making them lightweight and tree-shakeable.
* Icon Library Integration — `Sheet` and `Accordion` use `lucide-react` for icons (e.g., chevrons, close).
* Advanced Layout System — `DashLayout` uses `react-resizable-panels` for resizable panels and `lucide-react` for navigation icons.

Sources: [src/registry.json#L8-L9](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L8-L9), [src/registry.json#L53-L56](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L53-L56), [src/registry.json#L219-L222](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L219-L222), [src/registry.json#L265-L268](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L265-L268)

***

## Public API Export Structure

The library exposes a public API through `src/index.ts` that manages naming conflicts and provides clear import paths.

### File System to Export Mapping

* core/variants/ — CVA definitions
* core/utils/ — Styling utilities
* core/ui/ — 13 primitives (aliased with `Base` prefix)
* ui/ — Composite components
* layouts/ — Layout factories
* themes/ — Theme system
* hooks/ — Custom hooks

Key exports (high-level):

* `export * from './core/variants'`
* `export * from './core/utils'`
* Aliased exports for core primitives (e.g., `Block as BaseBlock`, `Container as BaseContainer`, etc.)
* `export * from './ui'`
* `export * from './layouts'`
* `export * from './themes'`
* `export * from './hooks'`

Sources: [src/index.ts#L1-L32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32)

### Export Strategy

{% stepper %}
{% step %}
### Wildcard Exports

* Exports all variants and utilities without modification.
* Example: `export * from './core/variants'`, `export * from './core/utils'`.

Source: [src/index.ts#L2-L3](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L2-L3)
{% endstep %}

{% step %}
### Aliased Exports

* Core primitives are exported with a `Base` prefix to avoid conflicts with composite components.
* Example: `Block` exported as `BaseBlock`, `Button` exported as `BaseButton`.

Source: [src/index.ts#L6-L20](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L6-L20)
{% endstep %}

{% step %}
### Composite Exports

* UI components are exported from the `ui` directory and may share names with base primitives (e.g., `Block` vs `BaseBlock`, `Button` vs `BaseButton`).
* Consumers can import either the base primitive or the composite component as needed.

Source: [src/index.ts#L23](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L23-L23)
{% endstep %}
{% endstepper %}

***

## Core Primitive Aliasing

All core primitives are exported with a `Base` prefix to prevent naming conflicts. This enables simultaneous use of low-level primitives and higher-level composite components.

| Original Name (core/ui) | Aliased Export Name | Purpose                                        |
| ----------------------- | ------------------- | ---------------------------------------------- |
| Block                   | BaseBlock           | Use primitive vs. composite Block              |
| Container               | BaseContainer       | Low-level container vs. feature-rich Container |
| Grid                    | BaseGrid            | Grid primitive vs. composite Grid layouts      |
| Flex                    | BaseFlex            | Flexbox primitive                              |
| Box                     | BaseBox             | Box model primitive vs. composite Box          |
| Stack                   | BaseStack           | Stack primitive vs. enhanced Stack             |
| Component               | BaseComponent       | Generic component wrapper                      |
| Element                 | BaseElement         | Element primitive                              |
| Card                    | BaseCard            | Card primitive vs. composite Card              |
| Button                  | BaseButton          | Button primitive vs. composite Button          |
| Badge                   | BaseBadge           | Badge primitive vs. styled Badge               |
| Image                   | BaseImage           | Image primitive vs. enhanced Image             |
| Icon                    | BaseIcon            | Icon primitive vs. icon wrapper                |

Source: [src/index.ts#L6-L20](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L6-L20)

***

## Component File Locations

Direct file path mapping for UI components:

* Accordion — src/components/ui/Accordion/Accordion.tsx
* Badge — src/components/ui/Badge/Badge.tsx
* Block — src/components/ui/Block/Block.tsx
* Box — src/components/ui/Box/Box.tsx
* Button — src/components/ui/Button/Button.tsx
* Card — src/components/ui/Card/Card.tsx
* Container — src/components/ui/Container/Container.tsx
* Grid — src/components/ui/Grid/Grid.tsx
* Group — src/components/ui/Group/Group.tsx
* Icon — src/components/ui/Icon/Icon.tsx
* Image — src/components/ui/Image/Image.tsx
* Sheet — src/components/ui/Sheet/Sheet.tsx
* Stack — src/components/ui/Stack/Stack.tsx
* Text — src/components/ui/Text/Text.tsx
* Title — src/components/ui/Title/Title.tsx

Layout components mapping:

* SplitBlock — src/layouts/SplitBlock.tsx
* LayoutBlock — src/layouts/LayoutBlock.tsx
* DashLayout — src/layouts/DashLayout.tsx

Sources: registry entries in [src/registry.json](https://github.com/ui8kit/core/blob/56a59911/src/registry.json)

***

## Component Target Directories

The registry specifies target directories for component installation (used by the `buildy-ui` CLI):

| Registry Type     | Target Directory | Used For                      |
| ----------------- | ---------------- | ----------------------------- |
| `registry:ui`     | `components/ui`  | UI component installation     |
| `registry:layout` | `layouts`        | Layout component installation |

All 15 UI components target `components/ui`, while all 3 layout components target `layouts`.

Sources: [src/registry.json#L15](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L15), [src/registry.json#L242](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L242)

***

## Registry Schema and Validation

* Schema URL: `https://buildy.tw/schema/registry.json`
* Current Version: 1.0.0
* Last Updated: 2025-10-30T13:21:21.408Z
* Registry Type: `"ui"`

This schema enables IDE autocompletion, validation, and ensures consistency across component definitions.

Sources: [src/registry.json#L2](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L2), [src/registry.json#L278-L280](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L278-L280)

***

## Component Discovery Workflow

Typical workflow to discover and use components:

* Check `registry.json` for component list and metadata.
* Import from the main package entry point `@ui8kit/core` (recommended for tree-shaking and module resolution).
  * Composite component: `import { Button } from '@ui8kit/core'`
  * Base primitive: `import { BaseButton } from '@ui8kit/core'`
* Alternatively import a specific file path: `import { Button } from '@ui8kit/core/ui/Button'`

Source: [src/index.ts#L1-L32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32), [src/registry.json#L1-L281](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L281)

***

## Summary

* 18 cataloged components organized into three tiers:
  * 13 Base Primitives exported with `Base` prefix from `core/ui`
  * 15 UI Components (composite)
  * 3 Layout Components (layout factories)
* Components are registered in `registry.json` with metadata (file paths, dependencies, types).
* Public API in `src/index.ts` uses aliasing (Base\*) and wildcard exports to prevent naming conflicts and enable flexible imports.
* Most components depend only on React; `lucide-react` and `react-resizable-panels` are used selectively.

For detailed documentation of specific components, see:

* [Base Components](base-components-or-ui8kit-core-or-deepwiki.md)
* [UI Components](ui-components-or-ui8kit-core-or-deepwiki.md)
* [Layout Components](layout-components-or-ui8kit-core-or-deepwiki.md)

Sources: [src/index.ts#L1-L32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32), [src/registry.json#L1-L281](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L281)
