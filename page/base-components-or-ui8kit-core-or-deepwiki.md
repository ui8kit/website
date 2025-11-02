# Base Components | ui8kit/core | DeepWiki

Relevant source files

* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Block/Block.tsx
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Box/Box.tsx
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Container/Container.tsx

Purpose and Scope

Base Components are the foundational UI primitives in `@ui8kit/core` that provide the core building blocks for all other components in the library. These components live in the `core/ui/` directory and are exported with a `Base` prefix in the public API to avoid naming conflicts with higher-level wrapper components.

This document covers the 13 base primitives and their associated wrapper components in `ui/`. For information about:

* Composite components built on these primitives, see https://deepwiki.com/ui8kit/core/4.2-ui-components
* The variant system that powers these components, see https://deepwiki.com/ui8kit/core/6.1-variant-system
* Available themes and theming, see https://deepwiki.com/ui8kit/core/5-theming-system

Sources: High-level architecture diagrams

***

## Architecture Overview

Base components follow a dual-layer architecture pattern where low-level primitives from `core/ui/` are wrapped by higher-level components in `ui/` that apply variant systems and additional functionality.

```
Public API - src/index.ts

ui/ - Component Wrappers

core/variants - Variant System

core/ui/ - Base Primitives

exported as

exported as

exported as

exported as

exported as

BaseBadge
core/ui/Badge

BaseBlock
core/ui/Block

BaseBox
core/ui/Box

BaseButton
core/ui/Button

BaseContainer
core/ui/Container

spacingVariants

colorVariants

layoutVariants

roundedVariants

shadowVariants

borderVariants

badgeSizeVariants

buttonSizeVariants

flexVariants

Badge
ui/Badge/Badge.tsx

Block
ui/Block/Block.tsx

Box
ui/Box/Box.tsx

Button
ui/Button/Button.tsx

Container
ui/Container/Container.tsx

Badge + BaseBadge

Block + BaseBlock

Box + BaseBox

Button + BaseButton

Container + BaseContainer
```

Sources:

* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx#L1-L18
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Block/Block.tsx#L1-L18
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Box/Box.tsx#L1-L22
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L1-L20
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Container/Container.tsx#L1-L14

### Common Patterns

All base components follow consistent implementation patterns:

* ForwardRef — All components use `React.forwardRef` for ref forwarding\
  Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Box/Box.tsx#L39-L39
* Base Import — Import primitive from `@ui8kit/core` with `Base` prefix\
  Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx#L4-L4
* Variant Composition — Combine multiple variant functions via `cn()` utility\
  Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Box/Box.tsx#L67-L87
* Prop Spreading — Spread remaining props to base component\
  Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L82-L82
* Data Attributes — Use `data-class` for component identification\
  Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Block/Block.tsx#L69-L69
* Type Extension — Extend HTML attributes + variant prop types\
  Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Block/Block.tsx#L20-L31

Sources:

* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx#L34-L95
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Block/Block.tsx#L33-L86
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Box/Box.tsx#L39-L95
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L39-L104
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Container/Container.tsx#L28-L71

***

## Component Variants System

Base components leverage the Class Variance Authority (CVA) system to provide type-safe, composable styling props. Each component imports specific variant functions that generate Tailwind CSS classes based on prop values.

### Variant Composition Flow

```
Component Props
{ size: 'lg', bg: 'primary' }

Variant Functions
buttonSizeVariants()
colorVariants()

CSS Classes
'px-4 py-2 bg-primary-500'

cn() Utility
Merge + Dedupe

Base Component
className={...}
```

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L65-L76

### Common Variant Categories

All base components use a subset of these variant categories:

| Variant Category    | Imported From  | Props                                                                            | Used By                   |
| ------------------- | -------------- | -------------------------------------------------------------------------------- | ------------------------- |
| spacingVariants     | `@ui8kit/core` | `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr`, `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | All components            |
| colorVariants       | `@ui8kit/core` | `bg`, `c`, `borderColor`                                                         | Block, Box, Container     |
| layoutVariants      | `@ui8kit/core` | `display`, `maxW`, `w`, `h`, `minH`, `position`, `z`, `overflow`                 | Block, Box, Button        |
| roundedVariants     | `@ui8kit/core` | `rounded`                                                                        | Badge, Block, Box, Button |
| shadowVariants      | `@ui8kit/core` | `shadow`                                                                         | Badge, Block, Box, Button |
| borderVariants      | `@ui8kit/core` | `border`, `borderTop`, `borderBottom`, `borderLeft`, `borderRight`               | Badge, Block, Box         |
| flexVariants        | `@ui8kit/core` | `direction`, `align`, `justify`, `wrap`, `gap`                                   | Box                       |
| aspectRatioVariants | `@ui8kit/core` | `aspect`                                                                         | Box                       |

Sources:

* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Box/Box.tsx#L5-L21
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Block/Block.tsx#L5-L17

***

## Base Component Reference

### Box

`Box` is the most flexible base component, supporting all variant categories. It serves as a polymorphic container that can render as any HTML element.

Key Features

* Polymorphic: Accepts `component` prop to render as any element (defaults to `div`)
* Full Variant Support: Supports spacing, color, layout, border, flex, rounded, shadow, and aspect ratio variants
* Flexible Layout: Includes flexbox utilities for alignment and distribution

Component Interface

```
interface BoxProps extends
  VariantSpacingProps,
  RoundedProps,
  ShadowProps,
  ColorProps,
  VariantLayoutProps,
  BorderProps,
  VariantFlexProps,
  AspectRatioProps {
  component?: ElementType;
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}
```

Variant Application

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Box/Box.tsx#L67-L87

Use the stepper below to show the typical variant application order.

{% stepper %}
{% step %}
### Spacing variants

Margin, padding and related spacing props.
{% endstep %}

{% step %}
### Rounded corners

Apply `rounded` variants.
{% endstep %}

{% step %}
### Shadow effects

Apply `shadow` variants.
{% endstep %}

{% step %}
### Color theming

Apply `color` variants (background, text, border colors).
{% endstep %}

{% step %}
### Layout sizing and positioning

Apply `layout` variants (width, height, position).
{% endstep %}

{% step %}
### Border styling

Apply `border` variants.
{% endstep %}

{% step %}
### Flexbox alignment

Apply `flex` variants for alignment and distribution.
{% endstep %}

{% step %}
### Aspect ratio constraints

Apply `aspect` variants where applicable.
{% endstep %}
{% endstepper %}

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Box/Box.tsx#L1-L97

***

### Block

`Block` is a semantic HTML wrapper component designed for structural layout elements. It defaults the `w` (width) prop to `'full'` and provides semantic variant options.

Key Features

* Semantic HTML: Built-in `variant` prop for semantic elements (`section`, `main`, `nav`, `article`, `header`, `footer`, `aside`, `div`)
* Full Width Default: Automatically applies full width unless overridden
* Polymorphic: Supports custom `component` prop that overrides `variant`

Component Interface

```
interface BlockProps extends
  React.HTMLAttributes<HTMLElement>,
  VariantSpacingProps,
  ColorProps,
  Pick<VariantLayoutProps, 'w' | 'h' | 'minH' | 'position'>,
  RoundedProps,
  ShadowProps,
  BorderProps {
  children: ReactNode;
  component?: ElementType;
  variant?: 'section' | 'main' | 'nav' | 'article' | 'header' | 'footer' | 'aside' | 'div';
}
```

Semantic Element Selection

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Block/Block.tsx#L62-L63

* If `component` is provided, it takes precedence
* Otherwise, `variant` determines the HTML element
* Defaults to `'div'` if neither is specified

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Block/Block.tsx#L1-L88

***

### Container

`Container` provides responsive width constraints for content, with built-in centering and responsive sizing options.

Key Features

* Responsive Sizing: Pre-defined size variants (`xs`, `sm`, `md`, `lg`, `xl`, `xxl`)
* Auto-Centering: Enabled by default via `centered` prop
* Fluid Mode: Full-width option via `fluid` prop
* Horizontal Padding: Defaults to `px='md'` for content breathing room

Component Interface

```
interface ContainerProps extends
  React.HTMLAttributes<HTMLElement>,
  VariantSpacingProps,
  ColorProps,
  ContainerSizingProps,
  TextAlignProps {
  children: ReactNode;
  component?: ElementType;
  centered?: boolean;
  fluid?: boolean;
}
```

Size Variants and Centering

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Container/Container.tsx#L52-L58

* `containerSizeVariants` applies max-width constraints
* `centered && 'mx-auto'` centers the container horizontally
* `fluid && 'max-w-none'` removes width constraints
* Default `px='md'` provides horizontal padding

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Container/Container.tsx#L1-L73

***

### Button

`Button` is an interactive component with support for loading states, content sections, and comprehensive styling variants.

Key Features

* Loading State: Built-in spinner with `loading` prop
* Content Sections: `leftSection` and `rightSection` for icons/badges
* Disabled State: Automatic opacity and pointer-event handling
* Size Variants: Pre-defined sizes (`xs`, `sm`, `default`, `lg`, `xl`)
* Style Variants: Multiple visual styles (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`)
* Content Alignment: Optional `contentAlign` prop for justify-content

Component Interface

```
interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  Pick<VariantSpacingProps, 'm' | 'mx' | 'my'>,
  RoundedProps,
  ShadowProps,
  Pick<VariantLayoutProps, 'w'>,
  ButtonSizeProps,
  ButtonStyleProps,
  ButtonContentAlignProps {
  children: ReactNode;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  mr?: 1 | 2 | 3 | 4 | 0;
}
```

Content Sections and Loading State

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L84-L100

Use the stepper below to show the content rendering logic.

{% stepper %}
{% step %}
### Loading

When `loading` is true:

* Show spinner
* Hide left/right sections
{% endstep %}

{% step %}
### Left Section

Render before children with right margin.
{% endstep %}

{% step %}
### Children

Render main button content.
{% endstep %}

{% step %}
### Right Section

Render after children with left margin.
{% endstep %}
{% endstepper %}

Base Styles

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L66-L67

* Flexbox layout with gap spacing
* Focus ring styles
* Disabled state handling
* Icon sizing constraints
* Transition animations

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L1-L106

***

### Badge

`Badge` provides compact labels and status indicators with optional dots and content sections.

Key Features

* Visual Indicators: Optional `dot` prop for status indication
* Content Sections: `leftSection` and `rightSection` for icons
* Size Variants: Pre-defined sizes (`xs`, `sm`, `default`, `lg`)
* Style Variants: Multiple visual styles (`default`, `secondary`, `destructive`, `outline`, `success`, `warning`, `info`)
* Compact Layout: Inline-flex with font weight styling

Component Interface

```
interface BadgeProps extends
  React.HTMLAttributes<HTMLDivElement>,
  Pick<VariantSpacingProps, 'm' | 'mx' | 'my'>,
  RoundedProps,
  ShadowProps,
  BorderProps,
  BadgeSizeProps,
  BadgeStyleProps {
  children: ReactNode;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  dot?: boolean;
}
```

Content Rendering Pattern

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx#L75-L91

Use the stepper below to show the badge content structure.

{% stepper %}
{% step %}
### Dot

Optional status indicator (1.5×1.5, rounded, current color).
{% endstep %}

{% step %}
### Left Section

Rendered before children.
{% endstep %}

{% step %}
### Children

Main badge content.
{% endstep %}

{% step %}
### Right Section

Rendered after children.
{% endstep %}
{% endstepper %}

Base Styles

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx#L62-L63

* Inline-flex layout
* Font weight (semibold)
* Transition animations
* Focus ring styles

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx#L1-L97

***

## Usage Patterns

### Import and Usage Pattern

Example flow:

```
Import from @ui8kit/core
import { Badge, Button, Box } from '@ui8kit/core'

Define Props
variant, size, spacing, colors

Render Component

Variant Functions Execute
buttonStyleVariants()
buttonSizeVariants()

Base Component Renders

DOM Output
```

Source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L60-L82

### Prop Spreading and Ref Forwarding

All base components follow this pattern:

| Step                | Implementation                              | Location                                                                               |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| Extract Known Props | Destructure variant props and special props | https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx#L35-L54 |
| Apply Variants      | Call variant functions with extracted props | https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx#L60-L71 |
| Forward Ref         | Pass ref to base component                  | https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx#L57-L57 |
| Spread Remaining    | Pass remaining props via `{...props}`       | https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx#L73-L73 |

### Data Attributes for Testing

All components include `data-class` attributes for testing and debugging:

| Component | Data Attribute             | Sub-elements                                                            |
| --------- | -------------------------- | ----------------------------------------------------------------------- |
| Badge     | `data-class="badge"`       | `badge-dot`, `badge-left-section`, `badge-right-section`                |
| Block     | `data-class="block"`       | None                                                                    |
| Box       | None (applied via BaseBox) | None                                                                    |
| Button    | `data-class="button"`      | `button-loading-spinner`, `button-left-section`, `button-right-section` |
| Container | `data-class="container"`   | None                                                                    |

Sources:

* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Badge/Badge.tsx#L59
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Block/Block.tsx#L69
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L63
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Container/Container.tsx#L51

***

## Component Composition Hierarchy

Base components are designed to compose naturally:

```
Container
size='lg' centered

Block
variant='section' py='xl'

Box
display='flex' gap='md'

Button
variant='primary'

Button
variant='outline'

Badge
variant='success'
```

Sources: All component files demonstrate this composability through their polymorphic `children` props

***

## TypeScript Type Composition

Base component types are composed from multiple variant prop interfaces:

```
React.HTMLAttributes
onClick, onFocus, etc.

VariantSpacingProps
m, p, mx, py, etc.

ColorProps
bg, c, borderColor

VariantLayoutProps
w, h, display, etc.

RoundedProps
rounded

ShadowProps
shadow

BorderProps
border, borderTop, etc.

ButtonProps / BoxProps / etc.
```

Sources:

* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Box/Box.tsx#L24-L37
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Block/Block.tsx#L20-L31
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L22-L37

***

Sources and file references are preserved.
