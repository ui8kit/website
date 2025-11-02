# Package Structure | ui8kit/core | DeepWiki

Relevant source files

* [package.json](https://github.com/ui8kit/core/blob/56a59911/package.json)
* [src/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/index.ts)

This document explains the `package.json` configuration, module system setup, distribution configuration, and public API exports for `@ui8kit/core`. It covers how the package is structured for publication to NPM, how dependencies are organized, and how the component library exposes its functionality to consumers.

For information about the TypeScript compilation configuration, see [TypeScript Configuration](typescript-configuration-or-ui8kit-core-or-deepwiki.md). For details about the build pipeline and tooling, see [Build System](broken-reference).

## Package Metadata

The library is published to NPM as `@ui8kit/core` under the GPL-3.0 license. The package metadata defines the library's identity and discoverability on the NPM registry.

| Property      | Value                                      | Purpose                                           |
| ------------- | ------------------------------------------ | ------------------------------------------------- |
| `name`        | `@ui8kit/core`                             | Scoped package name under the ui8kit organization |
| `version`     | `0.1.8`                                    | Current semantic version                          |
| `description` | Open source React UI components library... | Package description for NPM search                |
| `homepage`    | [https://buildy.tw/](https://buildy.tw/)   | Project homepage                                  |
| `license`     | GPL-3.0                                    | Open source license identifier                    |
| `author`      | buildy-ui                                  | Package maintainer                                |

The `keywords` array [package.json9-20](https://github.com/ui8kit/core/blob/56a59911/package.json#L9-L20) contains search terms for NPM discovery: `components`, `design`, `frontend`, `library`, `tailwind`, `utility-first`, `semantic`, `react`, `ui`, `ui8kit`.

Sources: [package.json1-20](https://github.com/ui8kit/core/blob/56a59911/package.json#L1-L20)

## Module System Configuration

The package is configured as an ECMAScript module with explicit entry points and type definitions.

Output artifacts and entry-point configuration:

* Module type: `type: 'module'`
* `main`: `./dist/index.js`
* `types`: `./dist/index.d.ts`
* `exports['.']`:
  * `import`: `./dist/index.js`
  * `types`: `./dist/index.d.ts`
* Dist artifacts: `dist/index.js`, `dist/index.d.ts`

The package uses `"type": "module"` [package.json8](https://github.com/ui8kit/core/blob/56a59911/package.json#L8-L8) indicating that all `.js` files are treated as ES modules. This enables `import`/`export` syntax without requiring `.mjs` extensions.

Entry Points

* `main`: Points to `./dist/index.js` [package.json31](https://github.com/ui8kit/core/blob/56a59911/package.json#L31-L31) for legacy module resolution
* `types`: Points to `./dist/index.d.ts` [package.json32](https://github.com/ui8kit/core/blob/56a59911/package.json#L32-L32) for TypeScript type definitions
* `exports`: Provides an explicit exports map [package.json33-38](https://github.com/ui8kit/core/blob/56a59911/package.json#L33-L38) with both `import` and `types` conditions

The exports map takes precedence in modern Node.js and bundler environments, while `main` and `types` provide fallback compatibility.

Sources: [package.json8](https://github.com/ui8kit/core/blob/56a59911/package.json#L8-L8) [package.json31-38](https://github.com/ui8kit/core/blob/56a59911/package.json#L31-L38)

## Distribution Configuration

The distribution configuration controls which files are included in the published package and how tree-shaking is handled.

| Property      | Value                                   | Purpose                                     |
| ------------- | --------------------------------------- | ------------------------------------------- |
| `sideEffects` | `false`                                 | Enables aggressive tree-shaking by bundlers |
| `files`       | `["dist/**/*", "README.md", "LICENSE"]` | Whitelist of files included in package      |

The `sideEffects: false` declaration [package.json30](https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L30) signals to bundlers that no module in the package performs side effects upon import, allowing unused exports to be safely eliminated during tree-shaking.

The `files` array [package.json39-43](https://github.com/ui8kit/core/blob/56a59911/package.json#L39-L43) explicitly defines package contents:

* `dist/**/*`: All compiled JavaScript and TypeScript declarations
* `README.md`: Documentation
* `LICENSE`: License text

Sources: [package.json30](https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L30) [package.json39-43](https://github.com/ui8kit/core/blob/56a59911/package.json#L39-L43)

## Dependency Architecture

Dependencies are structured into three categories: runtime dependencies, peer dependencies, and development dependencies.

Runtime Dependencies

The library bundles five runtime dependencies [package.json48-54](https://github.com/ui8kit/core/blob/56a59911/package.json#L48-L54):

1. `class-variance-authority`: Provides the CVA pattern for type-safe component variants
2. `clsx`: Utility for conditionally joining class names
3. `tailwind-merge`: Intelligently merges Tailwind CSS classes, resolving conflicts
4. `lucide-react`: Icon library used by Sheet and Accordion components
5. `react-resizable-panels`: Layout system used by DashLayout component

Peer Dependencies

React and React DOM are declared as peer dependencies [package.json55-58](https://github.com/ui8kit/core/blob/56a59911/package.json#L55-L58) with flexible version ranges (`^18.0.0 || ^19.0.0`). This means:

* Consumer applications must provide their own React installation
* The library supports both React 18 and React 19
* Avoids duplicate React installations in consumer bundles

Development Dependencies

Development dependencies [package.json59-66](https://github.com/ui8kit/core/blob/56a59911/package.json#L59-L66) include:

* React 19 for local development and testing
* TypeScript 5.6.3 for compilation
* Babel parser and traverse for AST analysis in build tools
* Bun types for runtime type checking during development

Sources: [package.json48-66](https://github.com/ui8kit/core/blob/56a59911/package.json#L48-L66)

## Build and Development Scripts

The package defines several npm scripts for development, building, and publishing workflows.

| Script       | Command                                                    | Purpose                                                |
| ------------ | ---------------------------------------------------------- | ------------------------------------------------------ |
| `build`      | `tsc -p tsconfig.json`                                     | Compile TypeScript to JavaScript with type definitions |
| `type-check` | `tsc --noEmit`                                             | Validate TypeScript types without emitting output      |
| `lint`       | `eslint src --ext .ts,.tsx`                                | Check code quality and style                           |
| `lint:fix`   | `eslint src --ext .ts,.tsx --fix`                          | Auto-fix linting issues                                |
| `scan`       | `bunx buildy-ui@latest scan`                               | Scan components and update registry.json               |
| `build:r`    | `bunx buildy-ui@latest build`                              | Build component registry package                       |
| `publish`    | `cd packages/registry && npm version patch && npm publish` | Publish to NPM with version bump                       |

Primary Build Pipeline

The `build` script [package.json22](https://github.com/ui8kit/core/blob/56a59911/package.json#L22-L22) uses the TypeScript compiler with the project's `tsconfig.json` to generate:

* Compiled JavaScript files in `dist/`
* Type declaration files (`.d.ts`) for TypeScript consumers

Quality Assurance

The `type-check` and `lint` scripts [package.json23-25](https://github.com/ui8kit/core/blob/56a59911/package.json#L23-L25) run during development to catch errors:

* Type checking validates TypeScript correctness without file emission
* ESLint enforces code style and catches common mistakes

Registry Management

The `scan` and `build:r` scripts [package.json26-27](https://github.com/ui8kit/core/blob/56a59911/package.json#L26-L27) use the external `buildy-ui` CLI tool to:

* Analyze component source code
* Generate/update `registry.json` metadata
* Build registry packages for component tooling

Sources: [package.json21-29](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L29)

## Public API Structure

The public API is defined in `src/index.ts`, which aggregates and re-exports functionality from multiple internal modules. The export strategy uses namespacing and aliasing to prevent naming conflicts.

Hierarchy (source files referenced)

* `src/index.ts`
* Internal modules:
  * `./core/variants`
  * `./core/utils`
  * `./core/ui`
  * `./ui`
  * `./layouts`
  * `./themes`
  * `./hooks`

Export overview (from `src/index.ts`):

* `export * from './core/variants'`
* `export * from './core/utils'`
* Aliased exports from `./core/ui` with `Base` prefix
* `export * from './ui'`
* `export * from './layouts'`
* `export * from './themes'`
* `export * from './hooks'`

Export Categories

The index file organizes exports into six categories [src/index.ts1-32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32):

1. Core Variants and Utilities [src/index.ts1-3](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L3): Wildcard exports from `./core/variants` and `./core/utils`
2. Base Components [src/index.ts5-20](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L5-L20): Aliased exports from `./core/ui` with `Base` prefix
3. Composite Components [src/index.ts22-23](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L22-L23): Wildcard exports from `./ui`
4. Layout Components [src/index.ts25-26](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L25-L26): Wildcard exports from `./layouts`
5. Theme System [src/index.ts28-29](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L28-L29): Wildcard exports from `./themes`
6. Hooks [src/index.ts31-32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L31-L32): Wildcard exports from `./hooks`

Aliasing Strategy

Base components are aliased with a `Base` prefix to avoid naming conflicts [src/index.ts6-20](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L6-L20):

* Block → BaseBlock
* Container → BaseContainer
* Grid → BaseGrid
* Flex → BaseFlex
* Box → BaseBox
* Stack → BaseStack
* Component → BaseComponent
* Element → BaseElement
* Card → BaseCard
* Button → BaseButton
* Badge → BaseBadge
* Image → BaseImage
* Icon → BaseIcon

This allows the library to export both primitive components (e.g., `BaseButton`) and higher-level composite components (e.g., `Button`) without collision. Consumers can choose the appropriate abstraction level.

Sources: [src/index.ts1-32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32)

## Export Resolution Flow

The following diagram describes how consumer imports resolve through the package configuration to actual files:

* Source modules compiled to the dist directory
* `src/index.ts` aggregates and re-exports public API
* `dist/index.js` is the compiled single entry point
* `dist/index.d.ts` contains TypeScript declarations
* Consumers import from `@ui8kit/core`, package resolution points to `dist/index.js` and TypeScript reads `dist/index.d.ts`

Resolution steps:

{% stepper %}
{% step %}
### Step 1

Consumer imports from `@ui8kit/core`.
{% endstep %}

{% step %}
### Step 2

Package manager resolves to package root.
{% endstep %}

{% step %}
### Step 3

Exports map [package.json33-38](https://github.com/ui8kit/core/blob/56a59911/package.json#L33-L38) points to `dist/index.js`.
{% endstep %}

{% step %}
### Step 4

TypeScript reads `dist/index.d.ts` for type information.
{% endstep %}

{% step %}
### Step 5

Runtime executes compiled JavaScript from `dist/`.
{% endstep %}
{% endstepper %}

The `dist/index.js` file is the compiled output of `src/index.ts`, which aggregates all public exports. This single-entry-point architecture simplifies consumption and enables efficient tree-shaking.

Sources: [package.json33-38](https://github.com/ui8kit/core/blob/56a59911/package.json#L33-L38) [src/index.ts1-32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32)

## Repository and Publishing Configuration

The package includes metadata for source control and NPM publishing.

| Property               | Value                                                                    | Purpose                    |
| ---------------------- | ------------------------------------------------------------------------ | -------------------------- |
| `repository.url`       | [https://github.com/ui8kit/core.git](https://github.com/ui8kit/core.git) | GitHub repository location |
| `repository.type`      | git                                                                      | Version control system     |
| `publishConfig.access` | public                                                                   | NPM package visibility     |

The `publishConfig` [package.json67-69](https://github.com/ui8kit/core/blob/56a59911/package.json#L67-L69) ensures the scoped package is published publicly rather than restricted to organization members. This is necessary for scoped packages (`@ui8kit/core`), which default to private access.

Sources: [package.json44-47](https://github.com/ui8kit/core/blob/56a59911/package.json#L44-L47) [package.json67-69](https://github.com/ui8kit/core/blob/56a59911/package.json#L67-L69)
