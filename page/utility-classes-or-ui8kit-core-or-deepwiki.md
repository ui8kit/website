# Utility Classes | ui8kit/core | DeepWiki

Relevant source files

* [src/lib/core-classes.json](https://github.com/ui8kit/core/blob/56a59911/src/lib/core-classes.json)

This document details the core utility class system used throughout `@ui8kit/core`. It covers the 618 Tailwind-based utility classes defined in the library, the semantic design token system, and how these classes integrate with the component architecture. For information about component-specific variant definitions using CVA, see [Variant System](broken-reference). For details on the automated class extraction process, see [CVA Class Extraction](broken-reference).

## Overview

The `@ui8kit/core` library maintains a curated set of utility classes in [src/lib/core-classes.json](https://github.com/ui8kit/core/blob/56a59911/%60src/lib/core-classes.json%60)(). This file serves as the canonical whitelist of CSS classes available across all components. The utility class system provides:

* Design token classes: Semantic color and styling tokens (e.g., `bg-primary`, `text-muted-foreground`)
* Layout utilities: Flexbox, grid, spacing, and positioning classes
* Typography utilities: Font sizes, weights, and text styling
* Responsive modifiers: Breakpoint-specific classes (`md:`, `lg:`, `xl:`)
* State modifiers: Hover and selection pseudo-class utilities

The class list contains 618 unique utility classes as of the last extraction timestamp (see `src/lib/core-classes.json`).

Sources: `src/lib/core-classes.json:1-624`

## System Architecture

```
Component Implementation

Utility Class Categories

Design System Layer

Theme Design Tokens
primary, secondary, accent
muted, destructive, etc.

core-classes.json
618 utility classes
Line 1-624

Color Utilities
bg-, text-, border-*

Layout Utilities
flex, grid, positioning

Spacing Utilities
p-, m-, gap-*

Typography Utilities
text-, font-, leading-*

Responsive Modifiers
md:, lg:, xl:*

State Modifiers
hover:, selection:

Base Components
Block, Box, Container

UI Components
Button, Card, Badge

CVA Variants
core/variants
```

The utility class system acts as a bridge between theme design tokens and component implementations. The [core-classes.json](https://github.com/ui8kit/core/blob/56a59911/%60core-classes.json%60)() file provides type safety and validation for all styling operations across the component library.

Sources: `src/lib/core-classes.json:1-624`

## Design Token System

The library implements a semantic design token system through utility classes that reference theme-specific color values. These tokens provide consistency across components and enable theme switching.

```
Border Utilities

Text Utilities

Background Utilities

Semantic Tokens

primary
primary-foreground

secondary
secondary-foreground

accent
accent-foreground

destructive
destructive-foreground

muted
muted-foreground

background
foreground

border
input
ring

bg-primary
Line 40

bg-secondary
Line 43

bg-accent
Line 26

bg-destructive
Line 32

bg-muted
Line 37

bg-background
Line 28

text-primary
Line 571

text-secondary
Line 574

text-accent-foreground
Line 561

text-destructive
Line 564

text-muted-foreground
Line 570

text-foreground
Line 566

border-primary
Line 69

border-secondary
Line 75

border-accent
Line 52

border-destructive
Line 60

border-muted
Line 68

border-input
Line 63
```

Each semantic token maps to multiple utility classes across different CSS properties:

| Semantic Token | Background Classes                                        | Text Classes                                                    | Border Classes             |
| -------------- | --------------------------------------------------------- | --------------------------------------------------------------- | -------------------------- |
| `primary`      | `bg-primary` (L40), `bg-primary-foreground` (L41)         | `text-primary` (L571), `text-primary-foreground` (L572)         | `border-primary` (L69)     |
| `secondary`    | `bg-secondary` (L43), `bg-secondary-foreground` (L44)     | `text-secondary` (L574), `text-secondary-foreground` (L575)     | `border-secondary` (L75)   |
| `accent`       | `bg-accent` (L26), `bg-accent-foreground` (L27)           | `text-accent-foreground` (L561)                                 | `border-accent` (L52)      |
| `destructive`  | `bg-destructive` (L32), `bg-destructive-foreground` (L33) | `text-destructive` (L564), `text-destructive-foreground` (L565) | `border-destructive` (L60) |
| `muted`        | `bg-muted` (L37), `bg-muted-foreground` (L38)             | `text-muted-foreground` (L570)                                  | `border-muted` (L68)       |

Sources: `src/lib/core-classes.json:26-44, 52-75, 561-575`

## Utility Class Categories

### Layout Utilities

The library provides comprehensive layout utilities for flexbox, grid, and positioning systems.

#### Display & Positioning

| Category | Classes                                                                                                                 | Line References                                |
| -------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Display  | `block`, `inline`, `inline-block`, `inline-flex`, `inline-grid`, `flex`, `grid`, `hidden`, `contents`                   | L47, L227-230, L142, L174, L212, L130          |
| Position | `static`, `relative`, `absolute`, `fixed`, `sticky`                                                                     | L555, L463, L3, L141, L556                     |
| Inset    | `inset-0`, `inset-auto`, `top-0`, `top-auto`, `right-0`, `right-auto`, `bottom-0`, `bottom-auto`, `left-0`, `left-auto` | L231-232, L580-581, L464-465, L82-83, L254-255 |

#### Flexbox System

```
Flex Item Properties

Flex Container Properties

Flex Direction
flex-row (L146)
flex-row-reverse (L147)
flex-col (L143)
flex-col-reverse (L144)

Flex Wrap
flex-nowrap (L145)
flex-wrap (L148)
flex-wrap-reverse (L149)

Justify Content
justify-start (L249)
justify-center (L242)
justify-end (L243)
justify-between (L241)
justify-around (L240)
justify-evenly (L244)

Align Items
items-start (L238)
items-center (L236)
items-end (L237)
items-baseline (L235)
items-stretch (L239)

Flex Grow
grow (L194)
grow-0 (L195)

Flex Shrink
shrink (L541)
shrink-0 (L542)

Flex Basis
basis-0 (L22)
basis-auto (L23)
basis-full (L24)
basis-px (L25)

Order
order-first (L386)
order-last (L387)
order-1 to order-12 (L374-385)
order-none (L388)
```

Sources: `src/lib/core-classes.json:143-149, 235-249, 194-195, 541-542, 22-25, 374-388`

#### Grid System

The grid system provides comprehensive utilities for defining grid layouts with column and row configurations:

| Grid Property | Available Classes                                                                                        | Line Range                   |
| ------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Grid Columns  | `grid-cols-1` through `grid-cols-6`, `grid-cols-12`                                                      | L175-181                     |
| Grid Rows     | `grid-rows-1` through `grid-rows-6`, `grid-rows-12`                                                      | L187-193                     |
| Column Span   | `col-start-1` through `col-start-13`, `col-end-1` through `col-end-13`, `col-start-auto`, `col-end-auto` | L109-122, L95-108            |
| Row Span      | `row-start-1` through `row-start-7`, `row-end-1` through `row-end-7`, `row-start-auto`, `row-end-auto`   | L517-524, L509-516           |
| Auto Columns  | `auto-cols-auto`, `auto-cols-fr`, `auto-cols-max`, `auto-cols-min`                                       | L14-17                       |
| Auto Rows     | `auto-rows-auto`, `auto-rows-fr`, `auto-rows-max`, `auto-rows-min`                                       | L18-21                       |
| Grid Flow     | `grid-flow-row`, `grid-flow-col`, `grid-flow-dense`, `grid-flow-row-dense`, `grid-flow-col-dense`        | L185, L182, L184, L186, L183 |

Sources: `src/lib/core-classes.json:14-21, 95-122, 175-193, 182-186, 509-524`

### Spacing Utilities

The spacing system uses a consistent scale for margin, padding, and gap utilities.

#### Spacing Scale

| Scale Value | Pixel Equivalent | Margin Classes                                        | Padding Classes                                       | Gap Classes                   |
| ----------- | ---------------: | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------- |
| `0`         |              0px | `m-0`, `mx-0`, `my-0`, `mt-0`, `mr-0`, `mb-0`, `ml-0` | `p-0`, `px-0`, `py-0`, `pt-0`, `pr-0`, `pb-0`, `pl-0` | `gap-0`, `gap-x-0`, `gap-y-0` |
| `1`         |    0.25rem (4px) | `m-1`, `mx-1`, `my-1`, etc.                           | `p-1`, `px-1`, `py-1`, etc.                           | `gap-1`, `gap-x-1`, `gap-y-1` |
| `2`         |     0.5rem (8px) | `m-2`, `mx-2`, `my-2`, etc.                           | `p-2`, `px-2`, `py-2`, etc.                           | `gap-2`, `gap-x-2`, `gap-y-2` |
| `4`         |      1rem (16px) | `m-4`, `mx-4`, `my-4`, etc.                           | `p-4`, `px-4`, `py-4`, etc.                           | `gap-4`, `gap-x-4`, `gap-y-4` |
| `6`         |    1.5rem (24px) | `m-6`, `mx-6`, `my-6`, etc.                           | `p-6`, `px-6`, `py-6`, etc.                           | `gap-6`, `gap-x-6`, `gap-y-6` |
| `8`         |      2rem (32px) | `m-8`, `mx-8`, `my-8`, etc.                           | `p-8`, `px-8`, `py-8`, etc.                           | `gap-8`, `gap-x-8`, `gap-y-8` |
| `12`        |      3rem (48px) | `m-12`, `mx-12`, `my-12`, etc.                        | `p-12`, `px-12`, `py-12`, etc.                        | `gap-12`                      |
| `auto`      |             auto | `m-auto`, `mx-auto`, `my-auto`, etc.                  | N/A                                                   | N/A                           |

Additional fine-grained spacing utilities include fractional values like `px-1.5` (L445), `px-2.5` (L449), `py-0.5` (L455) for precise control.

Sources: `src/lib/core-classes.json:154-173, 261-346, 404-462`

### Typography Utilities

The typography system provides classes for text sizing, weight, alignment, and styling.

#### Font Sizing

```
Font Size Scale

text-xs
Line 579
0.75rem

text-sm
Line 576
0.875rem

text-base
Line 562
1rem

text-lg
Line 569
1.125rem

text-xl
Line 578
1.25rem

text-2xl
Line 557
1.5rem

text-3xl
Line 558
1.875rem

text-4xl
Line 559
2.25rem

text-5xl
Line 560
3rem
```

#### Typography Utilities Table

| Category        | Classes                                                                                                                             | Line References                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Font Weight     | `font-normal`, `font-medium`, `font-semibold`, `font-bold`                                                                          | L152, L151, L153, L150             |
| Text Alignment  | `text-left`, `text-center`, `text-right`, `text-justify`                                                                            | L568, L563, L573, L567             |
| Text Transform  | `uppercase`, `lowercase`, `capitalize`, `normal-case`                                                                               | L591, L260, L87, L348              |
| Line Height     | `leading-tight`, `leading-normal`, `leading-relaxed`                                                                                | L252, L250, L251                   |
| Letter Spacing  | `tracking-tighter`, `tracking-tight`, `tracking-normal`, `tracking-wide`, `tracking-wider`, `tracking-widest`                       | L584, L583, L582, L585, L586, L587 |
| Text Decoration | `underline`, `underline-offset-4`, `italic`, `truncate`                                                                             | L589, L590, L234, L588             |
| Word Break      | `break-normal`, `break-words`, `break-all`                                                                                          | L85, L86, L84                      |
| White Space     | `whitespace-normal`, `whitespace-nowrap`, `whitespace-pre`, `whitespace-pre-line`, `whitespace-pre-wrap`, `whitespace-break-spaces` | L608, L609, L610, L611, L612, L607 |

Sources: `src/lib/core-classes.json:84-87, 150-153, 234, 250-252, 260, 348, 557-579, 582-612`

### Sizing & Dimension Utilities

The library provides comprehensive sizing utilities for width, height, and constraints.

#### Width & Height Classes

| Property         | Available Classes                                                 | Line References    |
| ---------------- | ----------------------------------------------------------------- | ------------------ |
| Width            | `w-3`, `w-4`, `w-5`, `w-6`, `w-8`, `w-10`, `w-12`                 | L595-599, L593-594 |
| Width (Special)  | `w-auto`, `w-fit`, `w-full`, `w-screen`, `w-min`, `w-max`, `w-px` | L600-606           |
| Height           | `h-3`, `h-4`, `h-5`, `h-6`, `h-8`, `h-9`, `h-10`, `h-11`, `h-12`  | L199-204, L196-198 |
| Height (Special) | `h-auto`, `h-fit`, `h-full`, `h-screen`, `h-min`, `h-max`, `h-px` | L205-211           |

#### Constraint Classes

| Constraint Type     | Available Classes                                                                                | Line References                          |
| ------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| Max Width           | `max-w-sm`, `max-w-md`, `max-w-lg`, `max-w-xl`, `max-w-2xl`, `max-w-4xl`, `max-w-6xl`            | L284, L277, L276, L285, L272, L273, L274 |
| Max Width (Screen)  | `max-w-screen-sm`, `max-w-screen-md`, `max-w-screen-lg`, `max-w-screen-xl`, `max-w-screen-2xl`   | L282, L281, L280, L283, L279             |
| Max Width (Special) | `max-w-none`, `max-w-full`                                                                       | L278, L275                               |
| Max Height          | `max-h-none`, `max-h-full`, `max-h-screen`                                                       | L270, L269, L271                         |
| Min Width           | `min-w-0`, `min-w-min`, `min-w-max`, `min-w-full`                                                | L303, L306, L305, L304                   |
| Min Height          | `min-h-full`, `min-h-screen`, `min-h-[200px]`, `min-h-[300px]`, `min-h-[400px]`, `min-h-[500px]` | L301, L302, L297-300                     |

#### Aspect Ratio Classes

The library includes common aspect ratio utilities with arbitrary value syntax:

* `aspect-square` (L11)
* `aspect-video` (L12)
* `aspect-[16/9]` (L7)
* `aspect-[9/16]` (L10)
* `aspect-[4/3]` (L9)
* `aspect-[3/2]` (L8)

Sources: `src/lib/core-classes.json:7-12, 196-211, 269-306, 593-606`

### Visual Styling Utilities

#### Border Utilities

| Border Property             | Classes                                                                                                         | Line References                                |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Border Width                | `border`, `border-0`, `border-2`, `border-4`                                                                    | L48-51                                         |
| Border Side Width           | `border-t`, `border-r`, `border-b`, `border-l` (with -0, -2, -4 variants)                                       | L77-80, L70-73, L53-56, L64-67                 |
| Border Style                | `border-solid`, `border-dashed`, `border-dotted`                                                                | L76, L59, L61                                  |
| Border Radius               | `rounded`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full` | L476, L501, L493, L492, L508, L477, L478, L485 |
| Border Radius (Directional) | `rounded-t-*`, `rounded-r-*`, `rounded-b-*`, `rounded-l-*` (with sm, md, lg, xl, full, none variants)           | L502-507, L495-500, L479-484, L486-491         |
| Border Color                | See Design Token System section                                                                                 | L52-81                                         |

#### Shadow Utilities

Shadow classes provide depth and elevation:

* `shadow-none` (L538)
* `shadow-sm` (L539)
* `shadow-md` (L537)
* `shadow-lg` (L536)
* `shadow-xl` (L540)
* `shadow-2xl` (L534)
* `shadow-inner` (L535)

#### Ring Utilities

Ring utilities create focus indicators and outlines:

| Ring Property | Classes                                                                             | Line References |
| ------------- | ----------------------------------------------------------------------------------- | --------------- |
| Ring Width    | `ring-0`, `ring-1`, `ring-2`, `ring-4`, `ring-8`                                    | L466-470        |
| Ring Offset   | `ring-offset-0`, `ring-offset-1`, `ring-offset-2`, `ring-offset-4`, `ring-offset-8` | L471-475        |

Sources: `src/lib/core-classes.json:48-81, 466-508, 534-540`

### Color & Opacity Utilities

#### Opacity Scale

The opacity system provides granular control from fully transparent to fully opaque:

| Opacity Value | Class         | Line |
| ------------- | ------------- | ---- |
| 0%            | `opacity-0`   | L359 |
| 5%            | `opacity-5`   | L366 |
| 10%           | `opacity-10`  | L360 |
| 20%           | `opacity-20`  | L362 |
| 25%           | `opacity-25`  | L363 |
| 30%           | `opacity-30`  | L364 |
| 40%           | `opacity-40`  | L365 |
| 50%           | `opacity-50`  | L367 |
| 60%           | `opacity-60`  | L368 |
| 70%           | `opacity-70`  | L369 |
| 75%           | `opacity-75`  | L370 |
| 80%           | `opacity-80`  | L371 |
| 90%           | `opacity-90`  | L372 |
| 95%           | `opacity-95`  | L373 |
| 100%          | `opacity-100` | L361 |

#### Background Color Utilities

In addition to semantic token colors, the library includes utility colors for specific use cases:

* `bg-transparent` (L45)
* `bg-white` (referenced in text as `text-white`, L577)
* `bg-blue-500` (L29), `bg-green-500` (L35), `bg-yellow-500` (L46)

#### Caret & Placeholder Colors

* Caret Colors: `caret-accent`, `caret-current`, `caret-foreground`, `caret-primary`, `caret-secondary`, `caret-transparent` (L88-93)
* Placeholder Colors: `placeholder-foreground`, `placeholder-muted-foreground` (L425-426)

Sources: `src/lib/core-classes.json:29, 35, 45-46, 88-93, 359-373, 425-426, 577`

## Responsive & State Modifiers

### Responsive Breakpoint Modifiers

The library includes responsive utilities for common breakpoints:

```
Responsive Grid Utilities

Base
grid-cols-1
grid-cols-2

md: Breakpoint
md:grid-cols-2 (L295)
md:grid-cols-3 (L296)

lg: Breakpoint
lg:grid-cols-3 (L256)
lg:grid-cols-4 (L257)
lg:grid-cols-5 (L258)
lg:grid-cols-6 (L259)

xl: Breakpoint
xl:grid-cols-4 (L613)
```

The responsive utilities follow a mobile-first approach where base classes apply to all screen sizes, and breakpoint modifiers override for larger screens.

Sources: `src/lib/core-classes.json:256-259, 295-296, 613`

### State Modifiers

The library includes hover and selection state modifiers for interactive elements.

#### Hover State Classes

| Hover Utility                  | Purpose                               | Line |
| ------------------------------ | ------------------------------------- | ---- |
| `hover:bg-accent`              | Accent background on hover            | L213 |
| `hover:bg-primary/80`          | Primary background at 80% opacity     | L218 |
| `hover:bg-primary/90`          | Primary background at 90% opacity     | L219 |
| `hover:bg-secondary/80`        | Secondary background at 80% opacity   | L220 |
| `hover:bg-destructive/80`      | Destructive background at 80% opacity | L215 |
| `hover:bg-destructive/90`      | Destructive background at 90% opacity | L216 |
| `hover:text-accent-foreground` | Accent foreground text on hover       | L222 |
| `hover:underline`              | Underline text on hover               | L223 |
| `hover:bg-blue-600`            | Blue utility color on hover           | L214 |
| `hover:bg-green-600`           | Green utility color on hover          | L217 |
| `hover:bg-yellow-600`          | Yellow utility color on hover         | L221 |

#### Selection State Classes

Selection pseudo-class utilities customize text selection appearance:

* `selection:bg-accent` (L529)
* `selection:bg-primary` (L530)
* `selection:bg-secondary` (L531)
* `selection:text-foreground` (L532)
* `selection:text-primary` (L533)

Sources: `src/lib/core-classes.json:213-223, 529-533`

## Miscellaneous Utilities

### Interaction & Behavior

| Category       | Classes                                                                                                                             | Line References |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Cursor         | `cursor-auto`, `cursor-default`, `cursor-pointer`, `cursor-text`, `cursor-move`, `cursor-help`, `cursor-wait`, `cursor-not-allowed` | L132-139        |
| Pointer Events | `pointer-events-auto`, `pointer-events-none`                                                                                        | L427-428        |
| User Select    | `select-auto`, `select-none`, `select-text`, `select-all`                                                                           | L526-528        |
| Visibility     | `visible`, `invisible`                                                                                                              | L592, L233      |

### Overflow & Scrolling

| Property   | Classes                                                                           | Line References |
| ---------- | --------------------------------------------------------------------------------- | --------------- |
| Overflow   | `overflow-auto`, `overflow-hidden`, `overflow-visible`, `overflow-scroll`         | L389-392        |
| Overflow X | `overflow-x-auto`, `overflow-x-hidden`, `overflow-x-visible`, `overflow-x-scroll` | L393-396        |
| Overflow Y | `overflow-y-auto`, `overflow-y-hidden`, `overflow-y-visible`, `overflow-y-scroll` | L397-400        |
| Overscroll | `overscroll-auto`, `overscroll-contain`, `overscroll-none`                        | L401-403        |

### Object Fit & Position

| Property        | Classes                                                                             | Line References              |
| --------------- | ----------------------------------------------------------------------------------- | ---------------------------- |
| Object Fit      | `object-contain`, `object-cover`, `object-fill`, `object-none`, `object-scale-down` | L351-354, L357               |
| Object Position | `object-top`, `object-bottom`, `object-center`, `object-left`, `object-right`       | L358, L349, L350, L354, L356 |

### Z-Index

Stacking order utilities for layered layouts:

* `z-auto` (L620)
* `z-0` (L614)
* `z-10` (L615)
* `z-20` (L616)
* `z-30` (L617)
* `z-40` (L618)
* `z-50` (L619)

### Hyphens & Spacing

Additional text control utilities:

* `hyphens-none`, `hyphens-manual`, `hyphens-auto` (L226, L225, L224)
* `space-x-*` and `space-y-*` utilities for child element spacing (L543-554)

Sources: `src/lib/core-classes.json:132-139, 224-226, 233, 349-358, 389-403, 427-428, 526-528, 543-554, 592, 614-620`

## Integration with Component System

The utility classes in [core-classes.json](https://github.com/ui8kit/core/blob/56a59911/%60core-classes.json%60)() are consumed by components through multiple pathways:

```
Runtime Application

Build Pipeline

Component Styling Layer

Utility Class Source

core-classes.json
618 utility classes

CVA Variant Definitions
core/variants

Component className Props
Direct utility application

CVA Extractor
scripts/cva-extractor.ts

CSS Purging
Removes unused classes

Base Components
Block, Box, Container

UI Components
Button, Card, Badge

Consumer Application
Custom layouts
```

### Usage Patterns

{% stepper %}
{% step %}
### CVA Variant Integration

Component variants defined in `core/variants` reference utility classes from the whitelist. The CVA system ensures type safety and validation. See [Variant System](broken-reference) for details.
{% endstep %}

{% step %}
### Direct className Props

Components accept `className` props that can use any utility class from the whitelist. These are merged with variant-derived classes using the `cn()` utility function.
{% endstep %}

{% step %}
### Build-Time Validation

The CVA extractor tool scans component files and validates that all referenced classes exist in the whitelist. See [CVA Class Extraction](broken-reference) for the extraction process.
{% endstep %}

{% step %}
### CSS Optimization

During production builds, the class whitelist enables aggressive CSS purging, removing unused styles while preserving all classes referenced by components.
{% endstep %}
{% endstepper %}

Sources: `src/lib/core-classes.json:1-624`

## Class Metadata

The [core-classes.json](https://github.com/ui8kit/core/blob/56a59911/%60core-classes.json%60)() file includes metadata about the class extraction:

```json
{
  "classes": [ /* 618 utility classes */ ],
  "count": 618,
  "timestamp": "2025-10-29T12:17:54.882Z"
}
```

* Total Count: 618 unique utility classes (L622)
* Last Updated: The timestamp indicates when the class list was last extracted (L623)
* Version Controlled: The file is version-controlled to track changes to the available class set over time

This metadata enables tooling to verify class list freshness and detect when re-extraction is needed after component updates.

Sources: `src/lib/core-classes.json:622-623`
