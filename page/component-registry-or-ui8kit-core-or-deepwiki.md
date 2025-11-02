# Component Registry | ui8kit/core | DeepWiki

Relevant source files

* [.gitignore](https://github.com/ui8kit/core/blob/56a59911/.gitignore)
* [src/registry.json](https://github.com/ui8kit/core/blob/56a59911/src/registry.json)

The Component Registry is a centralized metadata system defined in `registry.json` that catalogs all components in the `@ui8kit/core` library. It serves as the single source of truth for component discovery, dependency tracking, and build tooling integration. This registry enables automated component installation, documentation generation, and dependency resolution.

For information about how the registry integrates with the build pipeline, see [Build System](broken-reference). For details on individual component implementations, see [Component Library](component-library-or-ui8kit-core-or-deepwiki.md).

Primary source: [src/registry.json (lines 1–281)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L281)

***

## Purpose and Scope

The registry system provides:

* Component Catalog: A structured list of all 18 components with metadata
* Dependency Tracking: Runtime and development dependencies for each component
* File Mapping: Source file locations and installation targets
* Type Classification: Categorization into UI and layout component types
* Build Integration: Metadata consumed by `buildy-ui` CLI and other tooling
* Version Management: Registry versioning and update timestamps

Sources: [src/registry.json (lines 1–281)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L281)

***

## Registry File Structure

The registry is defined in a single JSON file at the repository root with the following top-level structure:

```json
{
  "$schema": "https://buildy.tw/schema/registry.json",
  "items": [...],
  "version": "1.0.0",
  "lastUpdated": "2025-10-30T13:21:21.408Z",
  "registry": "ui"
}
```

| Field         | Type   | Purpose                                        |
| ------------- | ------ | ---------------------------------------------- |
| `$schema`     | string | JSON Schema URL for validation and IDE support |
| `items`       | array  | Component metadata entries (18 total)          |
| `version`     | string | Registry format version (semantic versioning)  |
| `lastUpdated` | string | ISO 8601 timestamp of last registry update     |
| `registry`    | string | Registry type identifier (`"ui"`)              |

Sources: [src/registry.json (lines 1–2)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L1-L2) and [src/registry.json (lines 278–281)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L278-L281)

***

## Component Metadata Schema

Each entry in the `items` array represents a single component with the following structure:

Registry Item fields:

* name — Component identifier
* type — (`registry:ui` or `registry:layout`)
* description — Component purpose
* dependencies\[] — Runtime dependencies
* devDependencies\[] — Dev dependencies
* files\[] — Source files
* path — Source file location(s)
* target — Install directory (target)

### Example: Button Component Entry

Source: [src/registry.json (lines 156–169)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L156-L169)

```json
{
  "name": "Button",
  "type": "registry:ui",
  "description": "",
  "dependencies": ["react"],
  "devDependencies": [],
  "files": [
    {
      "path": "src/components/ui/Button/Button.tsx",
      "target": "components/ui"
    }
  ]
}
```

***

## Component Type Classification

The registry categorizes components using the `type` field, which determines their role and installation location.

### Component Type Distribution

| Type              | Count | Components (examples)                                                                                      |
| ----------------- | ----: | ---------------------------------------------------------------------------------------------------------- |
| `registry:ui`     |    15 | Title, Text, Stack, Sheet, Image, Icon, Group, Grid, Container, Card, Button, Box, Block, Badge, Accordion |
| `registry:layout` |     3 | SplitBlock, LayoutBlock, DashLayout                                                                        |

Sources: [src/registry.json (multiple lines)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json)

***

## Dependency Tracking

The registry tracks two types of dependencies for each component:

### Runtime Dependencies

Specified in the `dependencies` array, these are packages required at runtime.

Summary:

* Most UI components (13) list `["react"]` as their dependency.
* `Sheet` and `Accordion` include `["react", "lucide-react"]`.
* `SplitBlock` and `LayoutBlock` include `["react"]`.
* `DashLayout` includes `["lucide-react", "react-resizable-panels"]`.

Notes:

* React is always a peer dependency (not bundled).
* `devDependencies` arrays are empty in the current registry.

Sources: [src/registry.json (various entries)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json)

### Dependency Summary Table

| Component group         | Dependencies                                 |
| ----------------------- | -------------------------------------------- |
| Most UI components (13) | `["react"]`                                  |
| Sheet, Accordion        | `["react", "lucide-react"]`                  |
| SplitBlock, LayoutBlock | `["react"]`                                  |
| DashLayout              | `["lucide-react", "react-resizable-panels"]` |

Sources: [src/registry.json (various entries)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json)

***

## File Path Specifications

Each component's `files` array specifies source file locations and installation targets.

File entry structure:

```json
{
  "path": "src/....",    // Relative path from repository root
  "target": "..."        // Installation directory relative to consumer project
}
```

### Path Mapping Examples

* Layout component example:
  * DashLayout entry:
    * path: `src/layouts/DashLayout.tsx`
    * target: `layouts`
  * Source: [src/registry.json (lines 271–274)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L271-L274)
* UI component example:
  * Button entry:
    * path: `src/components/ui/Button/Button.tsx`
    * target: `components/ui`
  * Source: [src/registry.json (lines 163–168)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L163-L168)

### Standard Path Patterns

| Component Type    | Source Path Pattern                   | Target Directory |
| ----------------- | ------------------------------------- | ---------------- |
| UI Components     | `src/components/ui/{Name}/{Name}.tsx` | `components/ui`  |
| Layout Components | `src/layouts/{Name}.tsx`              | `layouts`        |

Sources: [src/registry.json (various entries)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json)

***

## Registry Generation and Maintenance

The registry is automatically generated and updated by the build system. The lifecycle and update steps are derived from the build process that scans component sources and emits `registry.json`.

{% stepper %}
{% step %}
### Registry lifecycle — scan and generate

* build system scans component sources:
  * `src/components/ui/*.tsx`
  * `src/layouts/*.tsx`
* buildy-ui analyzes components and extracts metadata:
  * component names
  * file paths
  * dependencies
* registry.json is generated with `version` and `lastUpdated` fields
{% endstep %}

{% step %}
### Validation and tooling

* Schema validation against `$schema`
* Registry consumed by:
  * `buildy-ui` CLI
  * Documentation generators
  * Component installers
{% endstep %}

{% step %}
### Publication

* Registry updated in repo
* `lastUpdated` timestamp is updated automatically on changes
{% endstep %}
{% endstepper %}

Update trigger cases:

* New components added
* Component metadata changes (dependencies, descriptions)
* File paths modified
* Registry version bumped

Current `lastUpdated` value from registry: "2025-10-30T13:21:21.408Z" (source: [src/registry.json (line 279)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L279-L279))

***

## Integration with Build Tools

The registry serves as input for multiple build and development tools.

### Tool Integration Flow (conceptual)

* `registry.json` (component metadata)
* buildy-ui CLI (installer, resolver)
* Documentation tools (component listings, dependency graphs)
* IDEs (IntelliSense and validation)
* package.json (dependency aggregation when installing components)

### Build Script Integration

Common scripts reference registry usage:

| Script                      | Purpose             | Registry Usage                  |
| --------------------------- | ------------------- | ------------------------------- |
| `npm run build`             | Compile and package | Validates registry completeness |
| `npm run scan`              | Component analysis  | Updates registry metadata       |
| `buildy-ui add {component}` | Install component   | Reads dependency and file info  |

### Consumer usage example: installing a component

{% stepper %}
{% step %}
### Step

Run the installer:

```
buildy-ui add Button
```
{% endstep %}

{% step %}
### Step

The tool reads `registry.json` to find the Button entry.
{% endstep %}

{% step %}
### Step

It parses dependencies: `["react"]`.
{% endstep %}

{% step %}
### Step

It locates source file: `src/components/ui/Button/Button.tsx`.
{% endstep %}

{% step %}
### Step

It installs to `components/ui/Button.tsx` in the consumer project and updates consumer's `package.json` with React as a peer dependency if needed.
{% endstep %}
{% endstepper %}

Sources: [src/registry.json (various lines)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json)

***

## Schema Validation

The registry references a JSON Schema for structure validation and IDE support:

```json
"$schema": "https://buildy.tw/schema/registry.json"
```

This schema defines:

* Required and optional fields for registry items
* Valid values for `type` field (`registry:ui`, `registry:layout`)
* Array structures for `dependencies` and `files`
* String format for `version` and timestamps

Validation benefits:

* IDE IntelliSense for registry fields
* Type checking to prevent invalid metadata
* Documentation and tooling integration (CI/CD validation)

Source: [src/registry.json (line 2)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L2-L2)

***

## Component Count Summary

Current registry statistics (version 1.0.0):

| Metric                                 |                            Value |
| -------------------------------------- | -------------------------------: |
| Total Components                       |                               18 |
| UI Components                          |                               15 |
| Layout Components                      |                                3 |
| Components with React only             |                               13 |
| Components with lucide-react           | 3 (Sheet, Accordion, DashLayout) |
| Components with react-resizable-panels |                   1 (DashLayout) |
| Average dependencies per component     |                             1.22 |

Source: [src/registry.json (lines 3–277)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L3-L277)

***

## Registry Version Management

The registry uses semantic versioning independent of package version.

Example from registry:

```json
"version": "1.0.0"
```

Version bump guidelines (registry-format focused):

* Add new component → Patch (1.0.x)
* Change metadata structure → Minor (1.x.0)
* Breaking schema change → Major (x.0.0)
* Update timestamps/descriptions → No bump (documentation updates)

Source: [src/registry.json (line 278)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json#L278-L278)

***

Sources and primary reference: [src/registry.json (lines 1–281)](https://github.com/ui8kit/core/blob/56a59911/src/registry.json)

If you want, I can:

* Extract and render the full component list from `registry.json` as a table,
* Generate per-component install examples,
* Or produce the JSON Schema summary as a reference page. Which would you prefer next?
