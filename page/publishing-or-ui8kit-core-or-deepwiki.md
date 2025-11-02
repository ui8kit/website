# Publishing | ui8kit/core | DeepWiki

Relevant source files

* [package.json](https://github.com/ui8kit/core/blob/56a59911/package.json)

## Purpose and Scope

This document covers the process of publishing the `@ui8kit/core` library to the NPM registry, including package configuration, versioning strategy, and the publishing workflow. This guide is intended for maintainers who have publishing rights to the package.

For information about the build process that generates publishable artifacts, see [Build Tools](broken-reference). For general development workflow and contribution guidelines, see [Development Workflow](development-workflow-or-ui8kit-core-or-deepwiki.md).

***

## Package Configuration

The library is configured as a public NPM package with the following metadata:

| Configuration   | Value                                                                    |
| --------------- | ------------------------------------------------------------------------ |
| Package Name    | `@ui8kit/core`                                                           |
| Current Version | `0.1.8`                                                                  |
| License         | GPL-3.0                                                                  |
| Homepage        | [https://buildy.tw/](https://buildy.tw/)                                 |
| Repository      | [https://github.com/ui8kit/core.git](https://github.com/ui8kit/core.git) |
| Access          | Public (scoped package)                                                  |

### Publishing Settings

The package includes a `publishConfig` section that ensures the scoped package is published with public access:

[package.json67-69](https://github.com/ui8kit/core/blob/56a59911/package.json#L67-L69)

This configuration is necessary because scoped packages (those with `@` prefix) default to restricted access on NPM, but this library is open source and requires public visibility.

### Module Configuration

The package is configured as an ES module with the following entry points:

[package.json8](https://github.com/ui8kit/core/blob/56a59911/package.json#L8-L8) - Module type declaration

[package.json31-37](https://github.com/ui8kit/core/blob/56a59911/package.json#L31-L37) - Main entry point and exports definition

The `"type": "module"` declaration ensures proper ES module handling in Node.js environments. The dual exports specification provides both CommonJS-compatible (`main`) and explicit import/types paths.

**Sources:** [package.json1-70](https://github.com/ui8kit/core/blob/56a59911/package.json#L1-L70)

***

## Distribution Artifacts

### Included Files

The `files` array in package.json defines which files are included in the published package:

[package.json39-43](https://github.com/ui8kit/core/blob/56a59911/package.json#L39-L43)

This configuration ensures that only the following artifacts are published:

* `dist/**/*` - All compiled JavaScript and TypeScript declaration files
* `README.md` - Package documentation
* `LICENSE` - GPL-3.0 license file

Notably, the following are excluded from publication:

* Source TypeScript files (`src/`)
* Build configuration files (`tsconfig.json`)
* Component registry metadata (`registry.json`)
* Development scripts (`scripts/`)
* Build tools and development dependencies

### Build Artifacts Structure

The `dist/` directory contains the compiled output:

```
dist/
├── index.js        # Compiled JavaScript (main entry point)
├── index.d.ts      # TypeScript type declarations
└── ...             # Additional compiled modules
```

The `sideEffects` declaration at [package.json30](https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L30) indicates that the package has no side effects, enabling aggressive tree-shaking optimizations in bundlers.

**Sources:** [package.json30-43](https://github.com/ui8kit/core/blob/56a59911/package.json#L30-L43)

***

## Publishing Workflow

### Publishing Script

The library uses a custom publishing script defined in package.json:

[package.json28](https://github.com/ui8kit/core/blob/56a59911/package.json#L28-L28)

```
updates

creates

npm run publish

cd packages/registry

npm version patch

npm publish

NPM Registry
@ui8kit/core

package.json
version field

Git tag
v0.1.x
```

Publishing pipeline components:

| Step | Command                | Purpose                                    |
| ---- | ---------------------- | ------------------------------------------ |
| 1    | `cd packages/registry` | Navigate to registry subdirectory          |
| 2    | `npm version patch`    | Increment patch version and create git tag |
| 3    | `npm publish`          | Upload package to NPM registry             |

### Version Increment Behavior

The `npm version patch` command performs three operations:

* Increments the patch version number (e.g., `0.1.8` → `0.1.9`)
* Updates the `version` field in package.json
* Creates a git tag with the new version (e.g., `v0.1.9`)

**Sources:** [package.json28](https://github.com/ui8kit/core/blob/56a59911/package.json#L28-L28)

***

## Pre-publish Build Process

Before publishing, the package must be built to generate distribution artifacts:

```
validates

validates

defines

configures

src/
TypeScript Source

tsc -p tsconfig.json

dist/
Compiled JS + .d.ts

npm run type-check

npm run lint

npm run publish

NPM Registry

package.json

tsconfig.json
```

### Build Commands

| Command              | Script                      | Purpose                            |
| -------------------- | --------------------------- | ---------------------------------- |
| `npm run build`      | `tsc -p tsconfig.json`      | Compile TypeScript to JavaScript   |
| `npm run type-check` | `tsc --noEmit`              | Validate TypeScript without output |
| `npm run lint`       | `eslint src --ext .ts,.tsx` | Check code quality                 |

### Pre-publish Checklist

{% stepper %}
{% step %}
### Run type checking

`npm run type-check`
{% endstep %}

{% step %}
### Run linting

`npm run lint` (or `npm run lint:fix` for auto-fixes)
{% endstep %}

{% step %}
### Build the package

`npm run build`
{% endstep %}

{% step %}
### Verify build output

Check that `dist/` contains expected files
{% endstep %}

{% step %}
### Test in consumer project

Verify the package works as expected
{% endstep %}

{% step %}
### Review version increment

Ensure patch/minor/major is appropriate
{% endstep %}

{% step %}
### Commit all changes

Ensure working directory is clean
{% endstep %}
{% endstepper %}

**Sources:** [package.json21-27](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L27)

***

## Versioning Strategy

### Current Versioning Scheme

The library follows semantic versioning (semver) principles:

```
0.1.8
│ │ │
│ │ └─ Patch: Bug fixes, non-breaking changes
│ └─── Minor: New features, backward compatible
└───── Major: Breaking changes
```

The current version `0.1.8` indicates:

* Major version `0`: Pre-release/unstable API
* Minor version `1`: First feature set
* Patch version `8`: Eighth patch release

### Version Management Commands

While the default publish script uses `npm version patch`, maintainers can manually control version increments:

```
# Patch version (0.1.8 → 0.1.9)
npm version patch

# Minor version (0.1.8 → 0.2.0)
npm version minor

# Major version (0.1.8 → 1.0.0)
npm version major

# Specific version
npm version 1.0.0
```

Each command updates package.json and creates a corresponding git tag.

**Sources:** [package.json3](https://github.com/ui8kit/core/blob/56a59911/package.json#L3-L3) [package.json28](https://github.com/ui8kit/core/blob/56a59911/package.json#L28-L28)

***

## Dependencies and Peer Dependencies

### Runtime Dependencies

The published package includes the following runtime dependencies:

[package.json48-54](https://github.com/ui8kit/core/blob/56a59911/package.json#L48-L54)

These dependencies are bundled with the package and do not require separate installation by consumers.

### Peer Dependencies

The package declares React as a peer dependency:

[package.json55-58](https://github.com/ui8kit/core/blob/56a59911/package.json#L55-L58)

Peer dependencies must be installed by the consuming application. The library supports both React 18 and React 19, providing flexibility for consumer projects.

**Sources:** [package.json48-58](https://github.com/ui8kit/core/blob/56a59911/package.json#L48-L58)

***

## Post-publish Verification

### Verification Steps

After publishing, verify the release succeeded:

```
npm view @ui8kit/core
```

Verify version:

```
npm view @ui8kit/core version
```

Inspect package contents:

```
npm view @ui8kit/core
```

Test installation:

```
npm install @ui8kit/core@latest
```

### Published Package Contents

The published package structure on NPM:

```
@ui8kit/core@0.1.8
├── dist/
│   ├── index.js
│   ├── index.d.ts
│   └── ...
├── README.md
├── LICENSE
└── package.json
```

### NPM Package Page

After publishing, the package is available at:

* Package page: [https://www.npmjs.com/package/@ui8kit/core](https://www.npmjs.com/package/@ui8kit/core)
* Repository link: [https://github.com/ui8kit/core.git](https://github.com/ui8kit/core.git)
* Homepage: [https://buildy.tw/](https://buildy.tw/)

**Sources:** [package.json1-70](https://github.com/ui8kit/core/blob/56a59911/package.json#L1-L70)

***

## Publishing Permissions

### Access Requirements

Publishing requires:

* NPM account with publishing rights to the `@ui8kit` scope
* Authentication via `npm login`
* Write access to the GitHub repository (for git tags)

### Authentication

Before first publish, authenticate with NPM:

```
npm login
```

Verify authentication:

```
npm whoami
```

**Sources:** [package.json2](https://github.com/ui8kit/core/blob/56a59911/package.json#L2-L2) [package.json67-69](https://github.com/ui8kit/core/blob/56a59911/package.json#L67-L69)

***

## Troubleshooting

### Common Publishing Issues

<details>

<summary>"You must be logged in to publish"</summary>

Cause: Not authenticated with NPM Solution: Run \`npm login\`

</details>

<details>

<summary>"Version already exists"</summary>

Cause: Version already published Solution: Increment version with \`npm version\`

</details>

<details>

<summary>"Permission denied"</summary>

Cause: No publish rights to scope Solution: Contact scope administrator

</details>

<details>

<summary>"dist/ not found"</summary>

Cause: Build not executed Solution: Run \`npm run build\` first

</details>

### Publishing Dry Run

To test the publishing process without actually publishing:

```
npm publish --dry-run
```

This shows what would be published without uploading to NPM.

**Sources:** [package.json28](https://github.com/ui8kit/core/blob/56a59911/package.json#L28-L28) [package.json67-69](https://github.com/ui8kit/core/blob/56a59911/package.json#L67-L69)

***

## Summary Diagram

```
Publishing

Build Artifacts

Pre-publish

Version Management

updates

package.json
version: 0.1.8

npm version patch

Git tag
v0.1.x

src/
Source Code

type-check

lint

build

dist/index.js
dist/index.d.ts

README.md

LICENSE

npm publish

NPM Registry
@ui8kit/core
```

**Sources:** [package.json1-70](https://github.com/ui8kit/core/blob/56a59911/package.json#L1-L70)
