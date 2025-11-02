# Development Workflow | ui8kit/core | DeepWiki

Relevant source files

* [README.md](https://github.com/ui8kit/core/blob/56a59911/README.md)
* [package.json](https://github.com/ui8kit/core/blob/56a59911/package.json)

This document explains the development workflow for contributors working on the `@ui8kit/core` library. It covers the development cycle, available scripts, code quality standards, and testing procedures for making changes to the component library.

For information about the build tools and compilation process, see [Build Tools](broken-reference). For the publishing and versioning process, see [Publishing](publishing-or-ui8kit-core-or-deepwiki.md).

***

## Development Environment Setup

### Prerequisites

The library requires the following tools:

| Tool       | Version    | Purpose                         |
| ---------- | ---------- | ------------------------------- |
| Node.js    | 18+ or 20+ | JavaScript runtime              |
| Bun        | 1.1.30+    | Package manager and task runner |
| Git        | 2.40+      | Version control                 |
| TypeScript | 5.6.3+     | Type checking and compilation   |

### Initial Setup

Clone the repository and install dependencies:

```
git clone https://github.com/ui8kit/core.git
cd core
bun install
```

The repository uses a flat package structure with source files in `src/` and compiled output in `dist/`.

**Sources:** [README.md1-16](https://github.com/ui8kit/core/blob/56a59911/README.md#L1-L16) [package.json59-66](https://github.com/ui8kit/core/blob/56a59911/package.json#L59-L66)

***

## Development Cycle

{% stepper %}
{% step %}
Edit source files in `src/`.
{% endstep %}

{% step %}
Type check:

```
npm run type-check
```
{% endstep %}

{% step %}
Lint code:

```
npm run lint
```
{% endstep %}

{% step %}
Build distribution:

```
npm run build
```
{% endstep %}

{% step %}
Test in consumer app (via submodule or linked package).
{% endstep %}

{% step %}
Commit changes.
{% endstep %}
{% endstepper %}

**Sources:** [package.json21-28](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L28)

***

## Available Scripts

The [package.json21-28](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L28) file defines the following npm scripts for development:

| Script       | Command                           | Purpose                                                | When to Use                               |
| ------------ | --------------------------------- | ------------------------------------------------------ | ----------------------------------------- |
| `type-check` | `tsc --noEmit`                    | Verify TypeScript types without generating output      | Before committing, during development     |
| `lint`       | `eslint src --ext .ts,.tsx`       | Check code quality and style                           | Before committing                         |
| `lint:fix`   | `eslint src --ext .ts,.tsx --fix` | Auto-fix linting issues                                | When fixing code quality issues           |
| `build`      | `tsc -p tsconfig.json`            | Compile TypeScript to JavaScript with type definitions | Before testing changes, before publishing |
| `scan`       | `bunx buildy-ui@latest scan`      | Analyze component registry                             | When adding/modifying components          |
| `build:r`    | `bunx buildy-ui@latest build`     | Build with buildy-ui tool                              | Alternative build process                 |

### Type Checking

Type checking runs without emitting files, validating TypeScript correctness:

```
npm run type-check
```

This command uses the TypeScript compiler (`tsc`) with the `--noEmit` flag, checking types against the configuration in `tsconfig.json` without generating output files. It validates all source files under `src/` for type safety.

**Sources:** [package.json23](https://github.com/ui8kit/core/blob/56a59911/package.json#L23-L23)

### Linting

ESLint checks code quality and enforces style conventions:

```
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

ESLint scans all `.ts` and `.tsx` files in the `src/` directory. The configuration ensures consistent code style across the library.

**Sources:** [package.json24-25](https://github.com/ui8kit/core/blob/56a59911/package.json#L24-L25)

### Building

The build process compiles TypeScript source files to JavaScript with type definitions:

```
npm run build
```

This executes the TypeScript compiler with the project configuration at [tsconfig.json](https://github.com/ui8kit/core/blob/56a59911/tsconfig.json) generating output in the `dist/` directory. The build produces:

* `dist/index.js` - Main JavaScript bundle
* `dist/index.d.ts` - TypeScript type definitions
* Additional compiled modules and types

**Sources:** [package.json22](https://github.com/ui8kit/core/blob/56a59911/package.json#L22-L22) [package.json31-32](https://github.com/ui8kit/core/blob/56a59911/package.json#L31-L32)

***

## Code Quality Standards

### TypeScript Configuration

The library enforces strict TypeScript settings for type safety. Key compiler options include:

* Strict Mode: Enabled for maximum type safety
* Module Resolution: Uses `bundler` mode for modern bundler compatibility
* Target: ES2022 for modern JavaScript features
* Path Aliases: Maps `@/` to internal paths for clean imports

All source files must pass type checking without errors.

**Sources:** [package.json63](https://github.com/ui8kit/core/blob/56a59911/package.json#L63-L63)

### ESLint Rules

ESLint enforces code quality standards across `.ts` and `.tsx` files. The linter checks:

* Code style consistency
* Import organization
* React-specific patterns
* TypeScript best practices

Use `npm run lint:fix` to automatically resolve fixable issues before committing.

**Sources:** [package.json24-25](https://github.com/ui8kit/core/blob/56a59911/package.json#L24-L25)

### File Organization

Components follow a structured organization:

```
src/
├── core/
│   ├── ui/           # Base primitive components (13 components)
│   ├── variants/     # CVA variant definitions
│   └── utils/        # Utility functions
├── ui/               # Composite UI components
├── layouts/          # Layout components
├── themes/           # Theme system
├── hooks/            # React hooks
└── index.ts          # Public API exports
```

All public exports must be declared in [src/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/index.ts) to be included in the distribution.

**Sources:** High-level diagrams (Diagram 2)

***

## Testing Changes Locally

### Integration with Consumer Applications

The recommended approach for testing library changes is to use the library as a Git submodule in a consumer application. A typical setup:

* Add `@ui8kit/core` as a git submodule under `packages/@ui8kit/core`
* Use a Vite app under `apps/web/` configured with `preserveSymlinks: true`
* Point path aliases to `../../packages/@ui8kit/core/src`
* Use `workspace:*` dependency for `@ui8kit/core`
* Make changes in `packages/@ui8kit/core/src/`, run `npm run build` in core, and see changes in the Vite app with hot reload

### Monorepo Setup for Testing

{% stepper %}
{% step %}
Initialize monorepo:

```
mkdir test-monorepo && cd test-monorepo
git init
```
{% endstep %}

{% step %}
Add core as submodule:

```
git submodule add https://github.com/ui8kit/core.git packages/@ui8kit/core
```
{% endstep %}

{% step %}
Create Vite app in `apps/web/`:

* Configure `vite.config.ts` with `preserveSymlinks: true`
* Set up path aliases to `../../packages/@ui8kit/core/src`
* Add `workspace:*` dependency for `@ui8kit/core`
{% endstep %}

{% step %}
Test changes:

* Make changes in `packages/@ui8kit/core/src/`
* Run `npm run build` in the core directory
* See changes reflected in the Vite app with hot reload
{% endstep %}
{% endstepper %}

**Sources:** [README.md1-711](https://github.com/ui8kit/core/blob/56a59911/README.md#L1-L711)

### Direct Testing

For quick testing without a full monorepo setup:

```
# In the core repository
npm run build

# In a consumer project
npm link /path/to/core
```

This creates a symbolic link allowing the consumer application to use the local version of the library.

**Sources:** [README.md612-624](https://github.com/ui8kit/core/blob/56a59911/README.md#L612-L624)

***

## Git Workflow

### Branch Strategy

Standard practices apply:

* Main Branch: `main` — stable, production-ready code
* Feature Branches: `feature/component-name` — for new features
* Fix Branches: `fix/issue-description` — for bug fixes

### Making Changes

{% stepper %}
{% step %}
Clone repository
{% endstep %}

{% step %}
Create feature branch
{% endstep %}

{% step %}
Develop & test
{% endstep %}

{% step %}
Type check & lint
{% endstep %}

{% step %}
Build distribution
{% endstep %}

{% step %}
Commit changes
{% endstep %}

{% step %}
Push branch and open pull request
{% endstep %}
{% endstepper %}

### Commit Workflow

Before committing changes, run the quality checks:

```
# Type check
npm run type-check

# Lint and fix
npm run lint:fix

# Build to verify compilation
npm run build
```

All three commands must succeed before committing.

**Sources:** [package.json21-28](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L28)

### Submodule Updates

When working in a monorepo setup, update the submodule pointer after making changes:

```
# In packages/@ui8kit/core
git fetch
git checkout main
git pull --ff-only

# In monorepo root
git add packages/@ui8kit/core
git commit -m "chore(submodule): bump @ui8kit/core"
```

**Sources:** [README.md627-637](https://github.com/ui8kit/core/blob/56a59911/README.md#L627-L637)

***

## Component Development Workflow

{% stepper %}
{% step %}
Create/Edit component in `src/ui/` or `src/layouts/`
{% endstep %}

{% step %}
Define CVA variants in `core/variants/`
{% endstep %}

{% step %}
Export from `src/index.ts`
{% endstep %}

{% step %}
Validate: run type-check and lint

```
npm run type-check
npm run lint
```
{% endstep %}

{% step %}
Build and test:

```
npm run build
npm run scan
```

Test in consumer app
{% endstep %}
{% endstepper %}

### Steps for Component Changes

{% stepper %}
{% step %}
Create or edit component:

* Add component file in `src/ui/` or `src/layouts/`
* Define component props and implementation
* Use CVA for variants in `core/variants/`
{% endstep %}

{% step %}
Export component:

* Add export to [src/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/index.ts)
* Ensure proper naming (avoid conflicts with base components)
{% endstep %}

{% step %}
Validate code:

```
npm run type-check
npm run lint:fix
```
{% endstep %}

{% step %}
Update registry:

```
npm run scan
```

This updates `registry.json` with component metadata.
{% endstep %}

{% step %}
Build and test:

```
npm run build
```

Test in a consumer application via submodule setup.
{% endstep %}
{% endstepper %}

**Sources:** [package.json21-28](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L28)

***

## Pre-Release Checklist

Before preparing changes for release, verify all quality gates:

| Check           | Command              | Expected Result           |
| --------------- | -------------------- | ------------------------- |
| Type Safety     | `npm run type-check` | No errors                 |
| Code Quality    | `npm run lint`       | No errors                 |
| Build Success   | `npm run build`      | Clean build in `dist/`    |
| Registry Update | `npm run scan`       | `registry.json` updated   |
| Consumer Test   | Test in monorepo     | Components work correctly |

### Verification Script

Run all checks in sequence:

```
npm run type-check && \
npm run lint && \
npm run build && \
npm run scan
```

If all commands succeed, the changes are ready for commit and pull request.

**Sources:** [package.json21-28](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L28)

***

## Continuous Integration

While CI configuration files are not present in the provided codebase, the workflow supports CI/CD integration. A typical CI pipeline would:

1. Clone repository with submodules:

```
git submodule update --init --recursive
```

2. Install dependencies:

```
bun install
```

3. Run quality checks:

```
npm run type-check
npm run lint
npm run build
```

4. Verify build artifacts exist in `dist/`

**Sources:** [README.md688](https://github.com/ui8kit/core/blob/56a59911/README.md#L688-L688) [package.json21-28](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L28)

***

## Development Tips

### Fast Iteration

* Use `npm run type-check` for quick validation (faster than full build)
* Run `npm run lint:fix` to auto-resolve style issues
* Use the monorepo submodule setup for live testing

### Debugging Build Issues

1. Check TypeScript errors:

```
npm run type-check
```

2. Verify all exports in [src/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/index.ts)
3. Ensure path aliases are correct in `tsconfig.json`
4. Clear `dist/` and rebuild:

```
rm -rf dist && npm run build
```

### Working with Multiple Components

1. Define shared variants in [core/variants/](https://github.com/ui8kit/core/blob/56a59911/core/variants/)
2. Use utility functions from [core/utils/](https://github.com/ui8kit/core/blob/56a59911/core/utils/)
3. Export all components from [src/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/index.ts)
4. Run `npm run scan` to update registry after adding components

**Sources:** [package.json21-28](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L28)

***
