# UI Components | ui8kit/core | DeepWiki

Relevant source files

* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Accordion/Accordion.tsx
* https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Card/Card.tsx

## Purpose and Scope

This document covers the composite UI components in the `@ui8kit/core` library located in `src/components/ui/`. These are higher-level components built on top of base primitives documented in Base Components, implementing complex interaction patterns and compound component architectures.

UI components differ from base components in that they:

* Compose multiple base primitives into cohesive units
* Implement stateful interaction patterns (accordions, modals, etc.)
* Often depend on external libraries for specialized functionality
* Use compound component patterns for flexible composition

For layout-specific components such as `DashLayout` and `SplitBlock`, see Layout Components. For theming and visual customization, see Theming System.

## Component Inventory

The `@ui8kit/core` library provides 15 UI components registered in the component catalog. Each component is designed for specific use cases while maintaining consistency with the overall design system.

| Component  | Type      | External Dependencies | Primary Use Case                      |
| ---------- | --------- | --------------------- | ------------------------------------- |
| Accordion  | Composite | lucide-react          | Collapsible content sections          |
| Card       | Composite | None                  | Content containers with header/footer |
| Badge      | Simple    | None                  | Labels and status indicators          |
| Button     | Simple    | None                  | Interactive actions                   |
| Sheet      | Complex   | lucide-react          | Side panels and drawers               |
| Title      | Simple    | None                  | Semantic headings                     |
| Text       | Simple    | None                  | Body text content                     |
| Stack      | Layout    | None                  | Flexbox containers                    |
| Block      | Primitive | None                  | Base block element                    |
| Box        | Primitive | None                  | Base box element                      |
| Container  | Layout    | None                  | Max-width containers                  |
| BaseIcon   | Utility   | lucide-react          | Icon rendering                        |
| BaseCard   | Primitive | None                  | Card foundation                       |
| BaseButton | Primitive | None                  | Button foundation                     |
| BaseBadge  | Primitive | None                  | Badge foundation                      |

Sources: Accordion, Card source files and registry.json in the repository.

***

## Accordion Component System

### Architecture Overview

The Accordion component implements a fully-controlled collapsible panel system supporting both single and multiple selection modes. It uses React Context for state distribution across a compound component architecture.

Main building blocks and dependencies:

* React Context layers for distributing state
* Accordion (Root Container)
* AccordionItem (Panel Wrapper)
* AccordionTrigger (Toggle Button)
* AccordionContent (Collapsible Content)
* AccordionContext: { value, onItemClick, type, collapsible }
* AccordionItemContext: { value }
* Base Button and Icon components
* lucide-react (ChevronDown, ChevronUp)
* layoutVariants, flexVariants

(See the Accordion source for the full context flow and implementation.)

### Component API

#### Accordion (Root)

Manages overall state and provides context to children.

Props (summary):

* type: "single" | "multiple" — default: "single"
* collapsible: boolean — default: false (allow closing active item in single mode)
* value: string | string\[] — controlled state value
* onValueChange: (value: string | string\[]) => void — controlled handler
* defaultValue: string | string\[] — uncontrolled initial value ("" or \[])
* w: VariantLayoutProps\['w'] — width variant

State management supports both controlled and uncontrolled patterns. The `onItemClick` callback uses `useCallback` for efficient updates.

Sources: Accordion root interface and state handling in the source file.

#### AccordionItem

Wraps a single panel and provides item-specific context.

Props (summary):

* value: string — unique identifier (required)
* w: VariantLayoutProps\['w']
* gap: VariantFlexProps\['gap']
* direction: VariantFlexProps\['direction'] — default: "col"

Tracks open/closed state via data attributes: `data-state="open"` or `data-state="closed"`.

#### AccordionTrigger

Renders the clickable header that toggles the panel. Extends base Button props.

Key features:

* Defaults to `variant="ghost"` and `size="sm"`
* Includes chevron icons that rotate based on open state
* Uses `contentAlign="between"` for icon positioning

#### AccordionContent

Renders the collapsible content area with animated transitions.

Animation classes used (data-state based):

* data-\[state=closed]:h-0
* data-\[state=closed]:opacity-0
* data-\[state=open]:h-auto
* data-\[state=open]:opacity-100

Content wrapper includes an inner `<div>` with `pb-4 pt-0` for consistent padding.

### Usage Pattern

```jsx
// Controlled single-selection
<Accordion type="single" collapsible value={value} onValueChange={setValue}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>

// Uncontrolled multiple-selection
<Accordion type="multiple" defaultValue={["item-1"]}>
  {/* ... */}
</Accordion>
```

Sources: Accordion component source.

***

## Card Component System

### Architecture Overview

The Card component implements a compound component pattern with semantic sub-components for structuring content. Card is stateless and focuses on visual composition.

Main building blocks and dependencies:

* CVA Variant system (spacing, rounded, shadow, color, border, layout, text size)
* Base components: BaseCard, Stack
* Card compound exports: Card, Card.Header, Card.Title, Card.Description, Card.Content, Card.Footer

(See Card source for implementation details and variant wiring.)

### Component API

#### Card (Root)

Visual container with extensive variant support.

Props (summary):

* variant: 'default' | 'outlined' | 'filled' — default: 'default'
* Padding props: p, px, py, pt, pb, pl, pr — default p='md'
* Margin props: m, mx, my, mt, mb, ml, mr
* rounded: RoundedProps — default: 'lg'
* shadow: ShadowProps — default: 'sm'
* bg: ColorProps — default: 'card'
* c: ColorProps — text color
* borderColor: ColorProps — default: 'border'
* border props: border, borderTop, borderBottom, borderLeft, borderRight — default border='1px'
* w, h: VariantLayoutProps

Variant behavior:

* default: Standard border with shadow
* outlined: Border only, no shadow
* filled: Muted background, transparent border

#### Card.Header

Wraps header content with consistent spacing and flex layout.

Default styling: `flex flex-col space-y-1.5`

Supports spacing props with default `p='md'`.

#### Card.Title

Renders semantic heading elements with configurable order and size.

Props:

* order: 1 | 2 | 3 | 4 | 5 | 6 — default: 3 (renders h1–h6 accordingly)
* size: TextSizeProps — default: 'lg'

The component dynamically renders the appropriate heading element based on `order`.

#### Card.Description

Simple paragraph element for descriptive text.

Styling: `text-sm text-muted-foreground`

#### Card.Content

Main content area with customizable spacing.

Supports spacing props with default `p='md'`.

#### Card.Footer

Footer area with flex layout for action buttons or metadata.

Styling: `flex items-center pt-0`

Supports spacing props with default `p='md'`.

### Compound Component Export

Card uses `Object.assign` to provide a compound API:

```js
const CompoundCard = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});
```

This enables both dot-notation and named imports:

```jsx
// Dot notation (recommended)
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>Content</Card.Content>
  <Card.Footer>Actions</Card.Footer>
</Card>

// Named imports (also supported)
import { Card, CardHeader, CardTitle, CardContent } from '@ui8kit/core';
```

Sources: Card source file.

***

## Design Patterns

### Compound Components

Both Accordion and Card implement compound component patterns with different approaches:

| Pattern            |                      Accordion | Card                  |
| ------------------ | -----------------------------: | --------------------- |
| State Management   |      Stateful with Context API | Stateless composition |
| Component Coupling |    Tightly coupled via context | Loosely coupled       |
| Usage Validation   |      Runtime errors if misused | No validation         |
| Flexibility        | Structured, enforced hierarchy | Free-form composition |

Accordion makes use of a context hook that throws when used outside an `<Accordion />`:

```js
const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an <Accordion />");
  }
  return context;
}
```

Card composition pattern uses `Object.assign` to attach subcomponents.

### Variant Forwarding

UI components use CVA (Class Variance Authority) variants from the base system. The pattern:

1. Import variant functions
2. Extend interfaces with variant prop types
3. Destructure variant props from HTML attributes
4. Combine variant classes with `cn()` utility

Example className composition:

```js
className={cn(
  'text-card-foreground transition-colors',
  spacingVariants({ p: p || 'md', px, py, pt, pb, pl, pr }),
  roundedVariants({ rounded }),
  shadowVariants({ shadow }),
  className
)}
```

### Data Attributes for Styling

Both components use `data-*` attributes for state-based styling:

Accordion state attributes:

* `data-state="open"` or `data-state="closed"`
* `data-type` for single/multiple mode
* `data-class` for component identification

Card structure attributes:

* `data-class="card"`
* `data-class="card-header"`, `card-title`, `card-content`, etc.

These attributes enable selectors like `[data-state=closed]:h-0`.

***

## Integration with Base Components

Dependency overview:

* UI components must import only from base components in `core/ui/`
* Use CVA variants from `core/variants/`
* Use `cn()` utility from `core/utils/`
* Avoid importing from sibling UI components to prevent circular dependencies

Other dependencies include lucide-react for icons and core utilities/variants.

This layering ensures predictable tree-shaking, no circular dependencies, and a clear component hierarchy.

Sources: Accordion and Card source headers and variant usage in their implementations.

***

## Component Registration

All UI components are cataloged in `registry.json` with metadata used for tooling and documentation.

Each registry entry includes:

* name: component identifier (e.g. "accordion")
* type: component category (e.g. "registry:ui")
* dependencies: runtime dependencies (e.g. \["lucide-react"])
* registryDependencies: internal component deps (e.g. \["button", "icon"])
* files: source file paths (e.g. \["ui/Accordion/Accordion.tsx"])

See Component Registry documentation for details.

***

Sources and references

* Accordion source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Accordion/Accordion.tsx
* Card source: https://github.com/ui8kit/core/blob/56a59911/src/components/ui/Card/Card.tsx
* registry.json referenced in the repository

(End of content.)
