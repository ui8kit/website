# Layout Components | ui8kit/core | DeepWiki

Relevant source files

* [src/layouts/DashLayout.tsx](https://github.com/ui8kit/core/blob/56a59911/src/layouts/DashLayout.tsx)
* [src/layouts/LayoutBlock.tsx](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx)
* [src/layouts/SplitBlock.tsx](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx)
* [src/layouts/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/layouts/index.ts)

## Purpose and Scope

This document covers the layout-level components in `@ui8kit/core` that provide structural patterns for organizing content at the page and section level. These components are higher-order compositions that orchestrate base components into complete layout structures.

The library provides three layout components:

* DashLayout — Dashboard layout with resizable sidebar and navigation
* LayoutBlock — Flexible section layout with configurable content rendering
* SplitBlock — Two-column split layout for media and content

For information about foundational UI primitives like `Block`, `Box`, and `Container`, see [Base Components](base-components-or-ui8kit-core-or-deepwiki.md). For composite UI elements like `Card` and `Accordion`, see [UI Components](ui-components-or-ui8kit-core-or-deepwiki.md).

**Sources:** [src/layouts/index.ts1-3](https://github.com/ui8kit/core/blob/56a59911/src/layouts/index.ts#L1-L3)

***

## Overview

The layout components are organized as a separate module within the package structure, distinct from base and UI components. They represent complete page sections or application shells rather than individual UI elements.

Example module structure (conceptual):

* Base Components
* External Dependencies
* Layout Components Module
  * layouts/index.ts (Module Exports)
  * DashLayout.tsx (Dashboard Shell)
  * LayoutBlock.tsx (Content Section)
  * SplitBlock.tsx (Split Section)
  * external libs: react-resizable-panels, lucide-react
  * base components used: Block, Container, Grid, Stack, Group, Title, Text, Badge, Icon, Card, Image, Box, Button

Component Characteristics:

| Component     | Purpose                     | External Dependencies                    | Complexity |
| ------------- | --------------------------- | ---------------------------------------- | ---------- |
| `DashLayout`  | Application dashboard shell | `react-resizable-panels`, `lucide-react` | High       |
| `LayoutBlock` | Flexible content section    | None                                     | Medium     |
| `SplitBlock`  | Two-column layout           | None                                     | Low        |

**Sources:** [src/layouts/index.ts1-3](https://github.com/ui8kit/core/blob/56a59911/src/layouts/index.ts#L1-L3) [src/layouts/DashLayout.tsx1-4](https://github.com/ui8kit/core/blob/56a59911/src/layouts/DashLayout.tsx#L1-L4) [src/layouts/LayoutBlock.tsx1-16](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L1-L16) [src/layouts/SplitBlock.tsx1-8](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L1-L8)

***

## DashLayout

### Component Architecture

`DashLayout` provides a complete dashboard application shell with a fixed navbar, resizable sidebar, and main content area. It is built on top of `react-resizable-panels` and exports multiple components for composition.

Panel structure and code entities (conceptual):

* Sidebar internals
* Navbar internals
* DashLayout component tree
  * DashLayout (factory alias)
  * Dashboard (main component)
  * Navbar (navigation bar)
  * Block component='main' data-role='dash-main'
  * PanelGroup direction='horizontal' autoSaveId='dashlayout-panels'
  * Left Panel: defaultSize=20, minSize=10, maxSize=40 (contains Sidebar)
  * PanelResizeHandle
  * Right Panel: defaultSize=80, minSize=50 (contains main content in Container)
  * Box p='md' Container
  * Group justify='between'
  * Theme toggle button using icons

**Sources:** [src/layouts/DashLayout.tsx1-99](https://github.com/ui8kit/core/blob/56a59911/src/layouts/DashLayout.tsx#L1-L99)

### Exported Components

The module exports four components that can be used independently or together. (Below are the sidebar and navbar details plus the main Dashboard composition.)

Sidebar (simple aside container)

* Props:
  * children?: React.ReactNode — Sidebar content
  * className?: string — Custom CSS classes
  * dataClass?: string — Data attribute for styling
  * title?: string — Optional sidebar title

Implementation: [src/layouts/DashLayout.tsx14-25](https://github.com/ui8kit/core/blob/56a59911/src/layouts/DashLayout.tsx#L14-L25)

Navbar (minimal navigation bar)

* Props:
  * isDarkMode: boolean — Current dark mode state
  * toggleDarkMode: () => void — Toggle function
  * brand?: string — Brand text (default: "App")
* Features:
  * Fixed navigation bar using `Block component="nav"`
  * Uses `Group` for horizontal layout with space-between justification
  * Icon changes based on dark mode state (Sun/Moon toggle)
  * Positioned at the top with `data-role="dash-navbar"` attribute

Implementation: [src/layouts/DashLayout.tsx34-49](https://github.com/ui8kit/core/blob/56a59911/src/layouts/DashLayout.tsx#L34-L49)

Dashboard (main composition)

* Props:

| Prop          | Type                   | Description                             |
| ------------- | ---------------------- | --------------------------------------- |
| `page`        | `React.ComponentType`  | Optional page component for main panel  |
| `children`    | `React.ReactNode`      | Fallback content if `page` not provided |
| `sidebar`     | `React.ReactNode`      | Sidebar content                         |
| `navbarProps` | `Partial<NavbarProps>` | Navbar configuration                    |

* Panel configuration:
  * Left Panel: 20% default, 10-40% resizable range, contains `Sidebar`
  * Right Panel: 80% default, min 50%, main content in `Container`
  * State persistence via `autoSaveId="dashlayout-panels"`

Implementation: [src/layouts/DashLayout.tsx64-91](https://github.com/ui8kit/core/blob/56a59911/src/layouts/DashLayout.tsx#L64-L91)

DashLayout (factory)

* A factory alias that re-exports `Dashboard` for convenient import.

Implementation: [src/layouts/DashLayout.tsx94-96](https://github.com/ui8kit/core/blob/56a59911/src/layouts/DashLayout.tsx#L94-L96)

### Usage Pattern

```jsx
// Import the layout
import { DashLayout } from '@ui8kit/core';

// Define a page component
const MyPage = () => <div>Main content</div>;

// Define sidebar content
const sidebar = (
  <Stack gap="md">
    <Text>Navigation Item 1</Text>
    <Text>Navigation Item 2</Text>
  </Stack>
);

// Render the dashboard
<DashLayout
  page={MyPage}
  sidebar={sidebar}
  navbarProps={{
    brand: "My App",
    isDarkMode: false,
    toggleDarkMode: () => {}
  }}
/>
```

**Sources:** [src/layouts/DashLayout.tsx64-96](https://github.com/ui8kit/core/blob/56a59911/src/layouts/DashLayout.tsx#L64-L96)

***

## LayoutBlock

### Component Overview

`LayoutBlock` is a flexible section component that renders a collection of items in different layout modes (grid, flex, stack) with customizable header and item renderers. It uses a content hooks system for deep customization without requiring custom components.

Conceptual flow and pieces:

* Default renderers
* Content hooks system
* Layout modes (grid, flex, stack)
* LayoutBlock component flow and render helpers
* Default hook sets: gridCards, gridSimple, flex, stack
* Utility createLayoutContentHook for typing

**Sources:** [src/layouts/LayoutBlock.tsx1-389](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L1-L389)

### Layout Types

Supported layouts controlled by the `layout` prop:

| Layout Type | Wrapper Component | Use Case                     | Default Columns        |
| ----------- | ----------------- | ---------------------------- | ---------------------- |
| `"grid"`    | `Grid`            | Card grids, feature sections | `"1-2-3"` (responsive) |
| `"flex"`    | `Group`           | Horizontal flexible layouts  | N/A                    |
| `"stack"`   | `Stack`           | Vertical stacked content     | N/A                    |

**Implementation:** [src/layouts/LayoutBlock.tsx20](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L20-L20) [src/layouts/LayoutBlock.tsx312-352](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L312-L352)

### Props Interface

Key props (conceptual TypeScript shape):

* layout: "grid" | "flex" | "stack"
* useContainer?: boolean (default: true)
* containerSize?: "sm" | "md" | "lg" | "xl" | "2xl"
* padding?, py?
* Grid: cols?: string (e.g., "1-2-3"), gridCols?: string, gap?, align?, justify?
* Flex: wrap?, flexWrap?
* Stack: stackAlign?
* Header: showHeader?: boolean (default true), headerAlign?
* content?: object containing badge, title, description, items\[]
* contentHooks?: LayoutContentHooks
* className?: string

Full shape: [src/layouts/LayoutBlock.tsx32-84](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L32-L84)

### Content Hooks System

Hooks allow intercepting and replacing default render logic.

Hook interface:

```
interface LayoutContentHooks {
  beforeHeader?: (content: any) => ReactNode;
  header?: (content: any) => ReactNode;
  afterHeader?: (content: any) => ReactNode;
  beforeItems?: (content: any) => ReactNode;
  item?: (item: any, index: number) => ReactNode;
  afterItems?: (content: any) => ReactNode;
}
```

**Sources:** [src/layouts/LayoutBlock.tsx23-30](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L23-L30)

Default hooks by layout:

* gridCards — center header alignment, card-based item renderer (images/icons)
* gridSimple — center header alignment, minimal stack items
* flex — start alignment, horizontal group items
* stack — center alignment, vertical stacked items

Implementation: [src/layouts/LayoutBlock.tsx230-254](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L230-L254)

### Default Renderers

Header renderer

* Renders optional Badge, Title, and Text (description)
* Configurable alignment and constrained width (max-w-2xl)
* Uses `Badge` with `variant="secondary"` and `rounded="full"`
* `Title` uses order and sizing parameters

Implementation: [src/layouts/LayoutBlock.tsx87-121](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L87-L121)

Item renderers

*   Grid Card Renderer (`gridCard`):

    * Full-height Card with padding and shadow
    * Optional Image (fixed height \~200px, cover)
    * Optional icon in colored box with primary background
    * Title and description in vertical stack

    Implementation: [src/layouts/LayoutBlock.tsx126-166](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L126-L166)
*   Grid Simple Renderer (`gridSimple`):

    * Minimal stack layout without card wrapper
    * Optional icon in colored box
    * Title with `size="lg"` and description with `size="sm"`

    Implementation: [src/layouts/LayoutBlock.tsx169-196](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L169-L196)
*   Flex Item Renderer (`flexItem`):

    * Horizontal Group layout
    * Icon to the left with `flex-shrink-0`
    * Content in vertical stack

    Implementation: [src/layouts/LayoutBlock.tsx199-226](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L199-L226)

### Usage Examples

Basic Grid Layout

```jsx
<LayoutBlock
  layout="grid"
  cols="1-2-3"
  gap="lg"
  content={{
    badge: "Features",
    title: "Our Services",
    description: "Comprehensive solutions for your needs",
    items: [
      {
        id: "1",
        title: "Feature 1",
        description: "Description of feature",
        lucideIcon: Zap
      },
      // More items...
    ]
  }}
/>
```

Custom Content Hooks

```jsx
const customHooks = {
  header: (content) => (
    <div>Custom header: {content.title}</div>
  ),
  item: (item, index) => (
    <div key={item.id}>Custom item {index}</div>
  )
};

<LayoutBlock
  layout="flex"
  contentHooks={customHooks}
  content={myContent}
/>
```

**Sources:** [src/layouts/LayoutBlock.tsx256-389](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L256-L389)

***

## SplitBlock

### Component Overview

`SplitBlock` provides a two-column split layout optimized for media-and-content sections. It supports flexible positioning, optional container wrapping, and a content hooks system similar to `LayoutBlock`.

Conceptual structure and behaviors:

* Column order control via `leftMedia`
* Two modes: Container Mode (`splitSection=false`) and Split Mode (`splitSection=true`)
* Slots API for overriding media and other sections
* Default content section that processes content through hooks

**Sources:** [src/layouts/SplitBlock.tsx1-145](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L1-L145)

### Layout Modes

SplitBlock operates in two modes controlled by the `splitSection` prop.

Container Mode (splitSection=false)

* Uses a `Container` wrapper for centered, constrained layout.
* Structure:
  * Block (section)
    * Container (size, padding)
      * Grid (cols="1-2", gap, align)
        * Media/Content (based on leftMedia)
        * Content/Media
* Use case: Standard content sections with consistent page margins

Implementation: [src/layouts/SplitBlock.tsx94-112](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L94-L112)

Split Mode (splitSection=true)

* Uses `Grid` directly after `Block` for edge-to-edge layouts.
* Structure:
  * Block (section, w="full")
    * Grid (cols="1-2", gap, align, data-class="split-grid")
      * Media/Content (based on leftMedia)
      * Content/Media
* Use case: Hero sections, full-width media displays

Implementation: [src/layouts/SplitBlock.tsx115-136](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L115-L136)

### Props Interface

Key props (conceptual TypeScript shape):

* mediaSection?: ReactNode
* contentSection?: ReactNode
* leftMedia?: boolean (default false)
* splitSection?: boolean (default true)
* content?: object (data)
* contentHooks?: ContentHooks
* slots?: { media?: ReactNode; header?: ReactNode; body?: ReactNode; actions?: ReactNode }
* containerSize?: "sm" | "md" | "lg" | "xl" | "2xl" (splitSection=false only)
* padding?, py?
* gap?: SpacingValue (default "lg")
* align?: "start" | "center" | "end" | "stretch"
* className?: string

Full shape: [src/layouts/SplitBlock.tsx17-55](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L17-L55)

### Content Hooks System

Hook interface:

```
interface ContentHooks {
  beforeContent?: (content: any) => ReactNode;
  content?: (content: any) => ReactNode;
  afterContent?: (content: any) => ReactNode;
}
```

Implementation: [src/layouts/SplitBlock.tsx11-15](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L11-L15)

Default content section

* When `contentSection` is not provided, `DefaultContentSection` processes `content` through `contentHooks` to render header/body/actions.

Implementation: [src/layouts/SplitBlock.tsx57-65](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L57-L65)

### Slots API

The `slots` prop provides named override points.

| Slot      | Purpose                    | Status   |
| --------- | -------------------------- | -------- |
| `media`   | Override media section     | Active   |
| `header`  | Future content composition | Reserved |
| `body`    | Future content composition | Reserved |
| `actions` | Future content composition | Reserved |

Slot resolution: if `slots.media` is defined it overrides `mediaSection`; otherwise `mediaSection` is used.

Implementation: [src/layouts/SplitBlock.tsx91](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L91-L91)

### Usage Examples

Basic Split Layout

```jsx
<SplitBlock
  leftMedia={false}
  splitSection={true}
  mediaSection={<Image src="/hero.jpg" alt="Hero" />}
  contentSection={
    <Stack gap="md">
      <Title>Welcome</Title>
      <Text>Description text</Text>
    </Stack>
  }
/>
```

Container Mode with Content Hooks

```jsx
const hooks = {
  beforeContent: (content) => <Badge>{content.category}</Badge>,
  content: (content) => (
    <>
      <Title>{content.title}</Title>
      <Text>{content.body}</Text>
    </>
  ),
  afterContent: (content) => <Button>Learn More</Button>
};

<SplitBlock
  splitSection={false}
  containerSize="lg"
  leftMedia={true}
  mediaSection={<Image src="/image.jpg" />}
  content={myContentData}
  contentHooks={hooks}
/>
```

Slots API Override

```jsx
<SplitBlock
  mediaSection={<Image src="/default.jpg" />}
  slots={{
    media: <Video src="/video.mp4" />  // Overrides mediaSection
  }}
  contentSection={<MyContent />}
/>
```

**Sources:** [src/layouts/SplitBlock.tsx67-145](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L67-L145)

***

## Component Dependency Graph (summary)

Conceptual dependencies and key observations:

* External dependencies: `react-resizable-panels` (for DashLayout panels), `lucide-react` (icons in DashLayout)
* Base components used across layout components: Block, Container, Grid, Stack, Group, Button, Title, Text, Badge, Icon, Box, Card, Image
* DashLayout is the only layout with external dependencies
* LayoutBlock uses the most base components
* SplitBlock is minimal and focused

Diagram (conceptual):

External Dependencies → Base Components (from src/components) → Layout Components

* DashLayout (Dashboard, Navbar, Sidebar)
* LayoutBlock (Grid/Flex/Stack layouts)
* SplitBlock (Two-column split)

**Sources:** [src/layouts/DashLayout.tsx2-4](https://github.com/ui8kit/core/blob/56a59911/src/layouts/DashLayout.tsx#L2-L4) [src/layouts/LayoutBlock.tsx3-16](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L3-L16) [src/layouts/SplitBlock.tsx3-7](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L3-L7)

***

## Common Patterns

### Composition Strategy

Layout components follow a consistent composition pattern:

1. Base Component Foundation — Use `Block` as the root semantic element (`section`, `nav`, `aside`)
2. Container Wrapping — Optional `Container` for content constraints and centering
3. Layout Primitives — Use `Grid`, `Stack`, or `Group` for internal arrangement
4. Content Components — Compose with `Title`, `Text`, `Badge`, `Card`, etc.

### Forwarded Refs

All layout components use `forwardRef` to expose the underlying DOM element:

* `LayoutBlock` forwards to `Block` element ([src/layouts/LayoutBlock.tsx256](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L256-L256))
* `SplitBlock` forwards to `Block` element ([src/layouts/SplitBlock.tsx67](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L67-L67))

This enables direct DOM manipulation and integration with ref-based libraries.

### Data Attributes

Data attributes used for styling and identification:

| Component     | Attribute    | Value                  | Purpose                       |
| ------------- | ------------ | ---------------------- | ----------------------------- |
| `DashLayout`  | `data-role`  | `"dash-navbar"`        | Navbar identification         |
| `DashLayout`  | `data-role`  | `"dash-main"`          | Main container identification |
| `DashLayout`  | `data-role`  | `"dash-sidebar-stack"` | Sidebar stack identification  |
| `LayoutBlock` | `data-class` | `"layout-block"`       | Root identification           |
| `LayoutBlock` | `data-class` | `"layout-grid"`        | Grid wrapper identification   |
| `LayoutBlock` | `data-class` | `"layout-flex"`        | Flex wrapper identification   |
| `LayoutBlock` | `data-class` | `"layout-stack"`       | Stack wrapper identification  |
| `SplitBlock`  | `data-class` | `"split-grid"`         | Split grid identification     |

**Sources:** [src/layouts/DashLayout.tsx18-74](https://github.com/ui8kit/core/blob/56a59911/src/layouts/DashLayout.tsx#L18-L74) [src/layouts/LayoutBlock.tsx320-344](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L320-L344) [src/layouts/SplitBlock.tsx129](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L129-L129)

### Content Hook Utilities

Both `LayoutBlock` and `SplitBlock` provide identity utility functions that help with TypeScript typing for hooks:

```ts
// LayoutBlock
export const createLayoutContentHook =
  (hooks: LayoutContentHooks): LayoutContentHooks => hooks;

// SplitBlock
export const createContentHook =
  (hooks: ContentHooks): ContentHooks => hooks;
```

These functions are identity helpers that provide type checking for hook definitions.

**Sources:** [src/layouts/LayoutBlock.tsx388-389](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L388-L389) [src/layouts/SplitBlock.tsx145](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L145-L145)

***

## Integration with Component Registry

* Registry Category: `layout`
* Registered Components: 3 (DashLayout, LayoutBlock, SplitBlock)
* Each component has an importance score of 1.44 in file importance analysis.

For more on registry: [Component Registry](component-registry-or-ui8kit-core-or-deepwiki.md).

**Sources:** [src/layouts/DashLayout.tsx1](https://github.com/ui8kit/core/blob/56a59911/src/layouts/DashLayout.tsx#L1-L1) [src/layouts/LayoutBlock.tsx1](https://github.com/ui8kit/core/blob/56a59911/src/layouts/LayoutBlock.tsx#L1-L1) [src/layouts/SplitBlock.tsx1](https://github.com/ui8kit/core/blob/56a59911/src/layouts/SplitBlock.tsx#L1-L1)

***

If you want, I can:

* Extract example snippets into reusable code blocks with titles for GitBook.
* Convert the usage examples into interactive tabs or stepper-guided examples.
* Produce smaller cheat-sheets (props reference tables) for each component.
