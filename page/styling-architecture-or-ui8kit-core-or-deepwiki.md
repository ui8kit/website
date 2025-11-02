# Styling Architecture | ui8kit/core | DeepWiki

Relevant source files

* [package.json](https://github.com/ui8kit/core/blob/56a59911/package.json)
* [scripts/cva-extractor.ts](https://github.com/ui8kit/core/blob/56a59911/scripts/cva-extractor.ts)
* [src/lib/core-classes.json](https://github.com/ui8kit/core/blob/56a59911/src/lib/core-classes.json)
* [src/lib/cva-classes.json](https://github.com/ui8kit/core/blob/56a59911/src/lib/cva-classes.json)

This document provides an overview of the styling system architecture in `@ui8kit/core`, including the utility-first approach, variant management, and class extraction pipeline. For theme system details, see [Theming System](theming-system-or-ui8kit-core-or-deepwiki.md). For information on specific variant definitions, see [Variant System](broken-reference). For utility class reference, see [Utility Classes](utility-classes-or-ui8kit-core-or-deepwiki.md). For class extraction tooling, see [CVA Class Extraction](broken-reference).

## Overview

The styling architecture combines Tailwind CSS utility classes with Class Variance Authority (CVA) for type-safe component variants. The system extracts all CSS classes from CVA definitions to generate whitelists for optimization and validation, resulting in a highly optimized, tree-shakeable styling system.

**Sources:** [package.json (lines 1–70)](https://github.com/ui8kit/core/blob/56a59911/package.json#L1-L70)

## Core Dependencies

The styling system relies on three primary dependencies:

| Package                    | Version | Purpose                            |
| -------------------------- | ------- | ---------------------------------- |
| `class-variance-authority` | ^0.7.1  | Type-safe variant management       |
| `clsx`                     | ^2.1.1  | Conditional class name composition |
| `tailwind-merge`           | ^3.3.1  | Intelligent class deduplication    |

These work together to provide a composable, conflict-free styling API where variants are defined once and can be combined without duplication or specificity issues.

**Sources:** [package.json (lines 48–54)](https://github.com/ui8kit/core/blob/56a59911/package.json#L48-L54)

## Styling Architecture Overview

Runtime utilities, component usage, an extraction pipeline, CVA pattern and variant definitions form the end-to-end flow:

* Runtime Utilities
* Component Usage
* Extraction Pipeline
* CVA Pattern
* Variant Definitions
* Validation targets: variant files under `src/core/variants/` (e.g. `badge.ts`, `button.ts`, `colors.ts`, ...)

Diagram (textual):

```
End-to-end styling architecture from variant definitions to component usage
- Variant definitions (src/core/variants/)
- cva() calls produce base + variant class strings
- SimpleCVAExtractor scans sources and extracts classes
- Outputs: cva-classes.json (metadata) and core-classes.json (whitelist)
- Runtime: clsx + twMerge via cn() to compose final className
```

**Sources:** [package.json (lines 48–54)](https://github.com/ui8kit/core/blob/56a59911/package.json#L48-L54), [scripts/cva-extractor.ts (lines 1–339)](https://github.com/ui8kit/core/blob/56a59911/scripts/cva-extractor.ts#L1-L339), [src/lib/cva-classes.json (lines 1–2258)](https://github.com/ui8kit/core/blob/56a59911/src/lib/cva-classes.json#L1-L2258)

## Variant Organization

Component variants are organized into 13 separate files under `src/core/variants/`, each focused on a specific styling concern:

* Typography & Interaction
  * `typography.ts` — Font, text, alignment
  * `index.ts` — Opacity, cursor, select
* Layout & Spacing
  * `layout.ts` — Display, position, size
  * `flex.ts` — Flexbox & Grid
  * `spacing.ts` — Margin & padding
  * `sizing.ts` — Width & height
* Visual Properties
  * `colors.ts` — Semantic color tokens
  * `border.ts` — Border styles
  * `rounded.ts` — Border radius
  * `shadow.ts` — Shadow utilities
  * `image.ts` — Object fit/position
* Component-Specific
  * `badge.ts` — Badge variants
  * `button.ts` — Button variants

Each file exports CVA definitions that can be imported and composed in component implementations. The extraction process scans all files recursively to build a complete class inventory.

**Sources:** [src/lib/cva-classes.json (lines \~625–2252)](https://github.com/ui8kit/core/blob/56a59911/src/lib/cva-classes.json#L625-L2252)

## Class Extraction Pipeline

The CVA extractor analyzes variant definitions to generate a complete whitelist of all CSS classes used in the library.

Use the stepper below to summarize the pipeline steps:

{% stepper %}
{% step %}
### Recursive file scan

Scan `src/core/variants/` and other component files to find CVA definitions.
{% endstep %}

{% step %}
### Babel AST parsing

Parse TypeScript + JSX using @babel/parser to produce an AST.
{% endstep %}

{% step %}
### Locate cva() calls

Traverse the AST to find CallExpression nodes with `callee.name === 'cva'`.
{% endstep %}

{% step %}
### Extract base classes

Read the first argument string passed to `cva()` for base classes.
{% endstep %}

{% step %}
### Extract variant classes

Recursively traverse object properties representing variants, compound variants, and defaults to collect option values.
{% endstep %}

{% step %}
### Split, deduplicate, sort

Split values on whitespace, collect into a Set, deduplicate, then alphabetical sort into arrays.
{% endstep %}

{% step %}
### Output generation

Produce `cva-classes.json` (metadata + classes) and `core-classes.json` (whitelist array).
{% endstep %}
{% endstepper %}

**Sources:** [scripts/cva-extractor.ts (lines 10–279)](https://github.com/ui8kit/core/blob/56a59911/scripts/cva-extractor.ts#L10-L279)

## Extraction Statistics

The extraction process generates comprehensive metadata about the styling system:

| Metric                   | Value               |
| ------------------------ | ------------------- |
| Total variant files      | 13                  |
| Total components scanned | 13                  |
| Unique classes extracted | 618                 |
| Base classes             | Varies by component |
| Variant classes          | Varies by component |

The extraction captures classes from:

* Base class strings (first argument to `cva()`)
* Variant option values (object properties)
* Compound variants (conditional combinations)
* Default variants (specified defaults)

**Sources:** [src/lib/cva-classes.json (lines 2253–2258)](https://github.com/ui8kit/core/blob/56a59911/src/lib/cva-classes.json#L2253-L2258), [src/lib/core-classes.json (lines 622–623)](https://github.com/ui8kit/core/blob/56a59911/src/lib/core-classes.json#L622-L623)

## Class Categories

The 618 extracted classes span multiple Tailwind utility categories. Categories include (non-exhaustive list):

* Responsive Classes (md:, lg:, xl: grid/cols)
* Interactive Classes (hover:, cursor, select, opacity)
* Grid Classes (grid-cols-, grid-rows-, col-start-, row-start-)
* Flexbox Classes (flex-row/col, items-_, justify-_, flex-wrap)
* Typography Classes (text-_, font-_, text alignment, transform)
* Visual Classes (bg-_, text-_, border-_, rounded-_, shadow-\*)
* Spacing Classes (m-, p-, gap-, space-\*)
* Layout Classes (display, position, sizing, overflow)

**Sources:** [src/lib/core-classes.json (lines 1–624)](https://github.com/ui8kit/core/blob/56a59911/src/lib/core-classes.json#L1-L624)

## Variant Definition Pattern

All component variants follow the CVA pattern for type-safe, composable styling:

* Base Classes: always applied
* Variants Object: named variant props
* Compound Variants: conditional combinations
* Default Variants: initial values
* Component Props: variant, size, etc.
* CVA Resolution: compute final classes using the generated variant function
* Runtime Composition: `clsx` for conditional logic, `tailwind-merge` to resolve conflicts
* Final className: string applied to element

Variants are defined using the `cva()` function from `class-variance-authority`, which returns a type-safe variant function that can be called with props to generate the appropriate class string.

**Sources:** [package.json (line 49)](https://github.com/ui8kit/core/blob/56a59911/package.json#L49-L49), [src/lib/cva-classes.json (lines \~625–701)](https://github.com/ui8kit/core/blob/56a59911/src/lib/cva-classes.json#L625-L701)

## Semantic Color Tokens

The color system uses semantic tokens that map to theme-specific values. Example token categories and classes:

| Token Category | Example Classes                       | Purpose              |
| -------------- | ------------------------------------- | -------------------- |
| Background     | `bg-background`, `bg-foreground`      | Main surface colors  |
| Primary        | `bg-primary`, `text-primary`          | Primary brand color  |
| Secondary      | `bg-secondary`, `text-secondary`      | Secondary actions    |
| Muted          | `bg-muted`, `text-muted-foreground`   | Subdued content      |
| Accent         | `bg-accent`, `text-accent-foreground` | Highlighted elements |
| Destructive    | `bg-destructive`, `text-destructive`  | Error/danger states  |
| Border         | `border-border`, `border-input`       | Border colors        |
| Card/Popover   | `bg-card`, `bg-popover`               | Elevated surfaces    |

These tokens are defined in the `colors.ts` variant file and are consistent across built-in themes (skyOS, modernUI, lesseUI).

**Sources:** [src/lib/cva-classes.json (lines \~878–993)](https://github.com/ui8kit/core/blob/56a59911/src/lib/cva-classes.json#L878-L993)

## Utility Composition Pattern

Components compose utilities using `clsx` for conditional logic and `tailwind-merge` for deduplication:

```
Input sources:
- CVA variant classes
- className prop
- Conditional classes

Composition:
- clsx(...) to concatenate/filter
- cn() utility (clsx + twMerge) as a single API
- twMerge() resolves conflicting Tailwind utilities

Output:
- Final className string with no duplicates/conflicts
```

The `cn()` utility function (typically defined in `src/core/utils/`) wraps `clsx` and `twMerge` to provide a single API for combining class names with proper conflict resolution.

**Sources:** [package.json (lines 49–53)](https://github.com/ui8kit/core/blob/56a59911/package.json#L49-L53)

## Extractor Implementation

The `SimpleCVAExtractor` class implements the extraction pipeline. Key responsibilities:

* Constructor: initialize Sets & Maps
* extractAllCVAClasses(): entry point
* getAllComponentFiles(): recursive scan
* extractFromFile(): parse single file
* extractFromObject(): recurse variants
* extractClassesFromString(): split & collect classes

Data structures:

* extractedClasses: Set (unique class names)
* componentData: Record (per-component metadata)

Parsing/traversal uses:

* @babel/parser for parse()
* @babel/traverse for traverse()
* Locate CallExpression where callee.name === 'cva'

**Sources:** [scripts/cva-extractor.ts (lines 11–279)](https://github.com/ui8kit/core/blob/56a59911/scripts/cva-extractor.ts#L11-L279)

## Extraction Output Format

The extractor generates two JSON files with distinct purposes:

* cva-classes.json — full metadata and classes
  * fields: classes (string\[]), count (number), timestamp, allClasses, componentData, summary, filePath, baseClasses, variantClasses
* core-classes.json — simplified whitelist (array) for validation/optimization tools
  * fields: classes: string\[] (618 sorted classes), count, timestamp, metadata

**Sources:** [src/lib/cva-classes.json (lines 1–11)](https://github.com/ui8kit/core/blob/56a59911/src/lib/cva-classes.json#L1-L11), [src/lib/core-classes.json (lines 1–624)](https://github.com/ui8kit/core/blob/56a59911/src/lib/core-classes.json#L1-L624), [scripts/cva-extractor.ts (lines 266–277)](https://github.com/ui8kit/core/blob/56a59911/scripts/cva-extractor.ts#L266-L277)

## Build Integration

Scripts referenced in the repository:

| Script  | Command                        | Purpose                     |
| ------- | ------------------------------ | --------------------------- |
| Extract | `bun scripts/cva-extractor.ts` | Regenerate class whitelists |
| Build   | `npm run build`                | TypeScript compilation      |
| Scan    | `npm run scan`                 | Component registry update   |

The extraction is typically run when variant definitions change to keep the whitelists synchronized with the codebase.

**Sources:** [package.json (lines 21–29)](https://github.com/ui8kit/core/blob/56a59911/package.json#L21-L29), [scripts/cva-extractor.ts (lines 282–337)](https://github.com/ui8kit/core/blob/56a59911/scripts/cva-extractor.ts#L282-L337)

## Optimization Benefits

The styling architecture provides several optimization benefits:

1. Tree-shaking: Only classes actually used in CVA definitions are whitelisted
2. Type safety: CVA provides full TypeScript support for variant props
3. Deduplication: `tailwind-merge` eliminates conflicting utilities at runtime
4. Build-time validation: Whitelist enables static analysis of class usage
5. Zero runtime overhead: CVA compiles to minimal JavaScript

The combination of static extraction and runtime merging ensures optimal bundle size while maintaining developer ergonomics.

**Sources:** [package.json (lines 49–53)](https://github.com/ui8kit/core/blob/56a59911/package.json#L49-L53), [src/lib/cva-classes.json (lines 2253–2258)](https://github.com/ui8kit/core/blob/56a59911/src/lib/cva-classes.json#L2253-L2258)

***

If you want, I can:

* Convert the pipeline stepper into a visual diagram card or embed.
* Extract specific examples from a variant file (e.g., `button.ts`) and render them as code blocks/tabs.
* Add an expandable FAQ for common extractor issues.
