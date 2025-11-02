# Quick Start Guide | ui8kit/core | DeepWiki

Relevant source files

* [src/components/ui/Button/Button.tsx](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx)
* [src/components/ui/Card/Card.tsx](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Card/Card.tsx)
* [src/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/index.ts)

This guide demonstrates basic usage of @ui8kit/core components in a React application. It covers importing components, setting up the theme provider, using variants and props, and working with compound components. For installation instructions, see [Installation](installation-or-ui8kit-core-or-deepwiki.md). For advanced monorepo setup, see [Monorepo Integration](broken-reference).

## Import Patterns

The library exports all components and utilities through a unified public API in [src/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/index.ts). Components are organized into three categories with distinct import patterns:

| Category                | Export Pattern    | Example Components                        |
| ----------------------- | ----------------- | ----------------------------------------- |
| Base Components         | `Base*` prefix    | `BaseBlock`, `BaseButton`, `BaseCard`     |
| Composite UI Components | Direct exports    | `Button`, `Card`, `Accordion`             |
| Layout Components       | Direct exports    | `DashLayout`, `LayoutBlock`, `SplitBlock` |
| Core Utilities          | Namespace exports | `spacingVariants`, `cn`, `colorVariants`  |

```javascript
// Import composite components (recommended for most use cases)
import { Button, Card, Badge } from '@ui8kit/core';

// Import base components when needed
import { BaseBlock, BaseButton } from '@ui8kit/core';

// Import utilities and variants
import { spacingVariants, cn, colorVariants } from '@ui8kit/core';

// Import theme system
import { ThemeProvider, useTheme } from '@ui8kit/core';
```

Component Import Flow Diagram

```
Theme System

Composite Layer

Core Primitives

aliased as Base*

export *

export *

export *

export *

export *

imports

imports

imports

import { ... }

src/index.ts
Public API

src/core/ui/*
13 base components

src/core/variants
CVA definitions

src/core/utils
cn, utilities

src/components/ui/*
Button, Card, Badge, etc

src/layouts/*
DashLayout, LayoutBlock

src/themes/*
ThemeProvider, themes

Your Application
```

Sources: [src/index.ts1-32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32)

## Theme Provider Setup

Wrap your application root with `ThemeProvider` to enable theming and dark mode support:

```javascript
import { ThemeProvider } from '@ui8kit/core';

function App() {
  return (
    <ThemeProvider defaultTheme="skyOS" storageKey="app-theme">
      {/* Your application components */}
    </ThemeProvider>
  );
}
```

ThemeProvider Props

| Prop           | Type        | Default          | Description                                            |
| -------------- | ----------- | ---------------- | ------------------------------------------------------ |
| `defaultTheme` | `string`    | `"skyOS"`        | Initial theme: `"skyOS"`, `"modernUI"`, or `"lesseUI"` |
| `storageKey`   | `string`    | `"ui8kit-theme"` | localStorage key for persistence                       |
| `children`     | `ReactNode` | required         | Application content                                    |

The `ThemeProvider` automatically handles:

* Dark mode toggle and persistence
* CSS variable injection for theme colors
* Accessibility preferences
* System theme detection

Sources: [src/index.ts28-29](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L28-L29)

## Basic Component Usage

### Simple Button Example

The `Button` component demonstrates the standard variant and prop pattern used throughout the library:

```javascript
import { Button } from '@ui8kit/core';

function Example() {
  return (
    <>
      {/* Basic button */}
      <Button>Click me</Button>

      {/* With variant and size */}
      <Button variant="primary" size="lg">
        Large Primary
      </Button>

      {/* With loading state */}
      <Button loading>Loading...</Button>

      {/* With sections (icons) */}
      <Button
        leftSection={<Icon />}
        variant="outline"
      >
        With Icon
      </Button>
    </>
  );
}
```

Button Component Props Structure

```
State Props

Content Props

Layout Props

Visual Props

Style Props

Button Component

variant
ButtonStyleProps

size
ButtonSizeProps

contentAlign
ButtonContentAlignProps

rounded
RoundedProps

shadow
ShadowProps

m, mx, my
VariantSpacingProps

w
VariantLayoutProps

children
ReactNode

leftSection
ReactNode

rightSection
ReactNode

loading
boolean

disabled
boolean
```

Sources: [src/components/ui/Button/Button.tsx22-37](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L22-L37) [src/components/ui/Button/Button.tsx39-104](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L39-L104)

### Applying Variant Props

All composite components accept standardized variant props from the core system:

```javascript
import { Button, Badge } from '@ui8kit/core';

function Example() {
  return (
    <Button
      // Button-specific variants
      variant="primary"
      size="lg"

      // Visual variants (from core)
      rounded="xl"
      shadow="lg"

      // Spacing variants (from core)
      m="md"
      mx="lg"

      // Layout variants (from core)
      w="full"
    >
      Styled Button
    </Button>
  );
}
```

Common Variant Props

| Prop Category | Props                                                              | Example Values                                     |
| ------------- | ------------------------------------------------------------------ | -------------------------------------------------- |
| Spacing       | `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr`, `p`, `px`, `py`           | `"xs"`, `"sm"`, `"md"`, `"lg"`, `"xl"`             |
| Rounded       | `rounded`                                                          | `"none"`, `"sm"`, `"md"`, `"lg"`, `"xl"`, `"full"` |
| Shadow        | `shadow`                                                           | `"none"`, `"sm"`, `"md"`, `"lg"`, `"xl"`           |
| Color         | `bg`, `c`, `borderColor`                                           | `"card"`, `"primary"`, `"muted"`, `"background"`   |
| Border        | `border`, `borderTop`, `borderBottom`, `borderLeft`, `borderRight` | `"1px"`, `"2px"`, `"none"`                         |
| Layout        | `w`, `h`                                                           | `"full"`, `"auto"`, `"fit"`                        |

Sources: [src/components/ui/Button/Button.tsx3-20](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L3-L20) [src/components/ui/Button/Button.tsx65-76](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L65-L76)

## Compound Components Pattern

Components like `Card` use a compound component pattern with subcomponents accessed via dot notation:

```javascript
import { Card } from '@ui8kit/core';

function Example() {
  return (
    <Card variant="outlined" rounded="lg" shadow="md">
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>
          Card description text
        </Card.Description>
      </Card.Header>

      <Card.Content>
        Main content goes here
      </Card.Content>

      <Card.Footer>
        <Button>Action</Button>
      </Card.Footer>
    </Card>
  );
}
```

Card Component Structure

```
assigned to

assigned to

assigned to

assigned to

assigned to

assigned to

imports

provides

Card
(BaseCard wrapper)

Card.Header
(Stack component)

Card.Title
(h1-h6 element)

Card.Description
(p element)

Card.Content
(div element)

Card.Footer
(div element)

CompoundCard
Object.assign()

import { Card }

Card.Header
Card.Title
Card.Content
```

Available Compound Components

| Component   | Subcomponents                                          | Description                        |
| ----------- | ------------------------------------------------------ | ---------------------------------- |
| `Card`      | `Header`, `Title`, `Description`, `Content`, `Footer`  | Container with structured sections |
| `Accordion` | `Item`, `Trigger`, `Content`                           | Collapsible content sections       |
| `Sheet`     | `Trigger`, `Content`, `Header`, `Title`, `Description` | Overlay panel component            |

Sources: [src/components/ui/Card/Card.tsx274-281](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Card/Card.tsx#L274-L281) [src/components/ui/Card/Card.tsx95-128](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Card/Card.tsx#L95-L128) [src/components/ui/Card/Card.tsx130-179](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Card/Card.tsx#L130-L179)

## Component Props Flow

Understanding how props flow from composite components to base components:

```
props

extract & apply

generate classes

merged className

renders

spread remaining

User Code
variant='primary'
size='lg'
rounded='xl'

Button Component
(Composite Layer)

CVA Variant Application
buttonStyleVariants()
buttonSizeVariants()
roundedVariants()

cn() Function
Merge classNames

BaseButton
(Core Primitive)

 DOM Element
```

Prop Processing Pipeline

{% stepper %}
{% step %}
### Props received — Composite component

Initial props passed by user into the composite component.

Source: [src/components/ui/Button/Button.tsx39-59](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L39-L59)
{% endstep %}

{% step %}
### Variant application — CVA functions

CVA (class-variance-authority) functions apply style variants like size, variant, rounded, etc.

Source: [src/components/ui/Button/Button.tsx65-76](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L65-L76)
{% endstep %}

{% step %}
### Class merging — cn() utility

Merge generated variant classes with existing className values.

Source: [src/components/ui/Button/Button.tsx65](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L65-L65)
{% endstep %}

{% step %}
### Base rendering — Base component

The base component receives merged classes and spreads remaining props to the DOM element.

Source: [src/components/ui/Button/Button.tsx61-83](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L61-L83)
{% endstep %}
{% endstepper %}

Sources: [src/components/ui/Button/Button.tsx39-104](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L39-L104)

## Working with Base Components

When you need lower-level control, import and use base components directly:

```javascript
import { BaseBlock, BaseButton, spacingVariants, cn } from '@ui8kit/core';

function CustomComponent() {
  return (
    <BaseBlock
      className={cn(
        'custom-base-styles',
        spacingVariants({ p: 'lg', m: 'md' })
      )}
    >
      <BaseButton className="custom-button-styles">
        Custom Styled
      </BaseButton>
    </BaseBlock>
  );
}
```

Base components provide:

* Minimal default styling
* Direct HTML element rendering
* Full className control
* No prop abstractions

Sources: [src/index.ts6-20](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L6-L20)

## Next Steps

After familiarizing yourself with basic usage:

* **Component Documentation**: See [Component Library](component-library-or-ui8kit-core-or-deepwiki.md) for comprehensive component APIs
* **Theming**: See [Theming System](theming-system-or-ui8kit-core-or-deepwiki.md) for theme customization and dark mode
* **Styling**: See [Styling Architecture](styling-architecture-or-ui8kit-core-or-deepwiki.md) for CVA patterns and utility classes
* **Monorepo Setup**: See [Monorepo Integration](broken-reference) for advanced development workflows

Quick Reference: Common Patterns

| Pattern            | Code Example                                        |
| ------------------ | --------------------------------------------------- |
| Basic component    | `<Button>Text</Button>`                             |
| With variant       | `<Button variant="primary" size="lg">Text</Button>` |
| With visual props  | `<Button rounded="xl" shadow="md">Text</Button>`    |
| With spacing       | `<Button m="md" px="lg">Text</Button>`              |
| Compound component | `<Card><Card.Header>...</Card.Header></Card>`       |
| Base component     | `<BaseButton className={cn(...)}>Text</BaseButton>` |
| Theme access       | `const { theme, setTheme } = useTheme()`            |

Sources: [src/index.ts1-32](https://github.com/ui8kit/core/blob/56a59911/src/index.ts#L1-L32) [src/components/ui/Button/Button.tsx1-106](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Button/Button.tsx#L1-L106) [src/components/ui/Card/Card.tsx1-285](https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Card/Card.tsx#L1-L285)
