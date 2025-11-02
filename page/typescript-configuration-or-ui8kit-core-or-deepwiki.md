# TypeScript Configuration | ui8kit/core | DeepWiki

Relevant source files

* https://github.com/ui8kit/core/blob/56a59911/tsconfig.json

This document details the TypeScript compiler configuration used in `@ui8kit/core`, including compilation targets, module resolution strategies, type generation settings, and path alias mappings. For information about the broader build pipeline, see https://deepwiki.com/ui8kit/core/3.2-build-system. For package distribution configuration, see https://deepwiki.com/ui8kit/core/3.1-package-structure.

## Purpose and Scope

The TypeScript configuration controls how source code in the `src/` directory is compiled into distributable JavaScript and type definition files. The configuration is optimized for library distribution with support for modern JavaScript features, strict type checking, and efficient module resolution for both development and published package consumption.

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L1-L26

## Compilation Targets and Module System

### Target Configuration

The library compiles to ES2022 JavaScript, supporting modern language features while maintaining broad compatibility with contemporary JavaScript runtimes.

| Configuration      | Value               | Purpose                           |
| ------------------ | ------------------- | --------------------------------- |
| `target`           | ES2022              | Output JavaScript version         |
| `module`           | ES2022              | Module format for output          |
| `lib`              | DOM, ESNext, ES2022 | Available runtime APIs            |
| `moduleResolution` | Bundler             | Optimized for bundler consumption |

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L5-L14

### Module Resolution Strategy

The configuration uses `"moduleResolution": "Bundler"` (https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L7-L7) which is optimized for libraries consumed by modern bundlers like Vite, Webpack, and Rollup. This strategy:

* Supports package exports conditions
* Enables extensionless imports
* Resolves TypeScript-specific features without requiring bundler plugins
* Allows both ESM and CommonJS interop via `esModuleInterop: true` (https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L9-L9)

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L5-L10

## Compilation Pipeline from Source to Distribution

{% stepper %}
{% step %}
### TypeScript Compiler (tsc)

Source files:

* src/\*\*/\*.tsx
* src/\*\*/\*.ts

Configuration highlights:

* tsconfig.json
* target: ES2022
* module: ES2022
* moduleResolution: Bundler
* strict: true
* skipLibCheck: true

Output artifacts:

* dist/index.js (ES2022 JavaScript)
* dist/\*\*/\*.d.ts (Type Definitions)

Consumers:

* Consumer bundlers (Vite, Webpack)
* IDEs & type checkers

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L5-L10
{% endstep %}

{% step %}
### Build Integration

The TypeScript compiler runs as part of development (`npm run dev`) and production (`npm run build`) workflows, alongside custom build tools like `buildy-ui` and the CVA extractor. Artifacts include:

* dist/index.js (ES2022 modules)
* dist/\*\*/\*.d.ts (Type definitions)
* registry.json (via buildy-ui)

For complete build tool documentation, see https://deepwiki.com/ui8kit/core/7.1-build-tools

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L1-L26
{% endstep %}
{% endstepper %}

## Type Generation Configuration

### Declaration File Output

The configuration enables comprehensive type definition generation for library consumers:

| Setting          | Value  | Impact                    |
| ---------------- | ------ | ------------------------- |
| `declaration`    | true   | Generate .d.ts files      |
| `declarationDir` | ./dist | Output location for types |
| `composite`      | true   | Enable project references |
| `strict`         | true   | Strictest type checking   |

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L8-L19

### Composite Project Mode

The `"composite": true` setting (https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L16-L16) enables TypeScript project references, allowing:

* Incremental builds in monorepo setups
* Faster type checking across package boundaries
* Explicit dependency graphs between TypeScript projects
* Better IDE performance when working with multiple packages

This supports the monorepo integration pattern: https://deepwiki.com/ui8kit/core/2.3-monorepo-integration

Source: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L16-L16

## Path Alias Configuration

### Internal Path Mappings

The configuration defines path aliases for simplified imports within the library.

Usage patterns shown in source:

* `@/*` → `./src/*`
* `@ui8kit/core` → `./src/index`

Examples from the codebase:

* import { Button } from '@/ui/button'
* import \* as UI8Kit from '@ui8kit/core'

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L20-L24

### Alias Usage Patterns

| Alias Pattern  | Maps To       | Usage Context                                 |
| -------------- | ------------- | --------------------------------------------- |
| `@/*`          | `./src/*`     | Internal component imports during development |
| `@ui8kit/core` | `./src/index` | Self-referencing for testing/examples         |

Example showing replacement of deep relative imports:

```ts
// Instead of:
import { buttonVariants } from '../../../core/variants/button-variants'

// Use absolute import:
import { buttonVariants } from '@/core/variants/button-variants'
```

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L21-L24

## Directory Configuration

### Source and Output Mapping

| Configuration    | Value                 | Purpose                         |
| ---------------- | --------------------- | ------------------------------- |
| `include`        | `["./src"]`           | Only compile source directory   |
| `exclude`        | `["./lib", "./dist"]` | Ignore output directories       |
| `rootDir`        | `"src"`               | Base for output structure       |
| `outDir`         | `"./dist"`            | JavaScript output location      |
| `declarationDir` | `"./dist"`            | Type definition output location |

The `rootDir: "src"` setting (https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L13-L13) ensures the output structure in `dist/` mirrors the source structure without including the `src/` prefix. Example mapping:

* `src/ui/button.tsx` → `dist/ui/button.js` + `dist/ui/button.d.ts`

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L2-L19

## JSX and React Configuration

### JSX Transform Settings

The configuration uses the modern React JSX transform:

```json
{
  "jsx": "react-jsx",
  "lib": ["DOM", "ESNext", "ES2022"]
}
```

The `"jsx": "react-jsx"` setting (https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L15-L15) enables the automatic JSX runtime introduced in React 17, removing the need for `import React from 'react'` in component files.

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L14-L15

## Strict Type Checking

### Type Safety Configuration

| Setting             | Value           | Enforcement                                    |
| ------------------- | --------------- | ---------------------------------------------- |
| `strict`            | true            | All strict mode checks enabled                 |
| `skipLibCheck`      | true            | Skip type checking of declaration files        |
| `resolveJsonModule` | true            | Allow importing JSON files with type inference |
| `types`             | `["bun-types"]` | Include Bun runtime types                      |

The `"strict": true` setting (https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L8-L8) enables strict checks such as `strictNullChecks`, `noImplicitAny`, etc. The `"skipLibCheck": true` setting (https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L10-L10) improves compile performance by skipping type checking of `.d.ts` files in dependencies. `"types": ["bun-types"]` (https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L11-L11) includes Bun runtime type definitions for development.

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L8-L12

## Integration with Build Pipeline

The TypeScript configuration integrates with the broader build system: https://deepwiki.com/ui8kit/core/3.2-build-system

The compiler runs as part of both development and production workflows (`npm run dev`, `npm run build`) and works alongside custom tools such as `buildy-ui` and the CVA extractor to produce the final distribution artifacts.

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L1-L26

## Base URL and Import Resolution

The `"baseUrl": "."` setting (https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L20-L20) establishes the project root as the base for resolving non-relative module imports, enabling the path aliases defined in `paths`. Combined with `"moduleResolution": "Bundler"`, this setup supports consistent import resolution both inside the monorepo and for external consumers of the published package.

Sources: https://github.com/ui8kit/core/blob/56a59911/tsconfig.json#L20-L24
