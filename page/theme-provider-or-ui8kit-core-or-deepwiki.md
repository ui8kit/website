# Theme Provider | ui8kit/core | DeepWiki

Relevant source files

* [src/themes/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts)
* [src/themes/providers/ThemeProvider.tsx](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx)

## Purpose and Scope

This document describes the `ThemeProvider` component and `useTheme` hook, which form the core infrastructure for theme management in `@ui8kit/core`. The Theme Provider handles theme distribution through React Context, manages dark mode state, and monitors accessibility preferences.

For information about the specific themes available (skyOS, modernUI, lesseUI), see [Built-in Themes](built-in-themes-or-ui8kit-core-or-deepwiki.md). For detailed dark mode implementation and toggle functionality, see [Dark Mode](dark-mode-or-ui8kit-core-or-deepwiki.md).

Sources: [src/themes/providers/ThemeProvider.tsx#L1-L94](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L1-L94), [src/themes/index.ts#L9](https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L9-L9)

***

## Overview

The Theme Provider system consists of three primary entities exported from [src/themes/providers/ThemeProvider.tsx](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx):

* `ThemeProvider`: A React component that wraps the application and provides theme context
* `useTheme`: A hook that consumes the theme context from any descendant component
* `ThemeContext`: The underlying React Context (internal, not exported)

The system is theme-agnostic, accepting any object that conforms to the `ThemeBase` interface. This allows custom themes to be used alongside the built-in themes documented in [Built-in Themes](built-in-themes-or-ui8kit-core-or-deepwiki.md).

Sources: [ThemeProvider.tsx L1-L94](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L1-L94), [index.ts L9](https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L9-L9)

***

## System Architecture

High-level components and state flow:

* Application Root
  * ThemeProvider (wraps app)
    * ThemeContext
    * isDarkMode state
    * prefersReducedMotion state
    * localStorage: 'ui:dark'
    * ThemeContextValue (provided via context)
* Consumer Components use `useTheme()` to consume the context

Sources: [ThemeProvider.tsx L23-L93](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L23-L93)

***

## ThemeBase Type Structure

The `ThemeBase` type defines the minimum required structure for any theme object passed to the `ThemeProvider`. It is intentionally generic to support custom themes.

| Property     |                                     Type | Required | Description                                             |
| ------------ | ---------------------------------------: | :------: | ------------------------------------------------------- |
| `name`       |                                 `string` |    Yes   | Unique identifier for the theme                         |
| `rounded`    | `Record<string, any> & { default: any }` |    Yes   | Border radius configuration with required `default` key |
| `buttonSize` | `Record<string, any> & { default: any }` |    Yes   | Button size configuration with required `default` key   |
| `isNavFixed` |                                `boolean` |    No    | Whether navigation should be fixed positioned           |

The `rounded` and `buttonSize` properties must contain a `default` key, ensuring there is always a fallback variant. Additional keys can be added for custom variants.

Source: [ThemeProvider.tsx L4-L10](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L4-L10)

***

## ThemeProvider Component

### Component Signature

```ts
function ThemeProvider({
  children,
  theme
}: {
  children: ReactNode;
  theme: ThemeBase
}): JSX.Element
```

Source: [ThemeProvider.tsx L25](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L25-L25)

### Internal State Management

The `ThemeProvider` manages two pieces of internal state: dark mode and reduced motion preference.

{% stepper %}
{% step %}
### Dark Mode State — Initialization & priority

The dark mode state initializes with the following priority:

* 1st: Stored value in `localStorage` key `'ui:dark'`\
  (see ThemeProvider.tsx:29)
* 2nd: System preference from `window.matchMedia('(prefers-color-scheme: dark)')`\
  (see ThemeProvider.tsx:31-32)
* Default: `false` if neither source provides a value\
  (see ThemeProvider.tsx:34)

Sources: [ThemeProvider.tsx L28-L35](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L28-L35)
{% endstep %}

{% step %}
### Reduced Motion State — Accessibility monitoring

The provider monitors the `prefers-reduced-motion` media query and updates state when the user's accessibility preferences change. Components can read this state to disable/limit animations.

Sources: [ThemeProvider.tsx L46-L68](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L46-L68)
{% endstep %}
{% endstepper %}

### Side Effects

The `ThemeProvider` manages two key side effects via `useEffect`:

*   Dark Mode Application (on `isDarkMode` change)

    * Toggles the `'dark'` class on `document.documentElement`
    * Sets `document.documentElement.style.colorScheme` to `'dark'` or `'light'`
    * Persists preference to `localStorage` key `'ui:dark'`

    Source: [ThemeProvider.tsx L37-L44](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L37-L44)
*   Motion Preference Monitoring

    * Sets up a media query listener for `'(prefers-reduced-motion: reduce)'`
    * Updates state when the user's preference changes
    * Handles both modern (`addEventListener`) and legacy (`addListener`) APIs

    Source: [ThemeProvider.tsx L51-L68](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L51-L68)

***

## ThemeContextValue Interface

The context value provided to consumers has this structure (generic over `T extends ThemeBase`):

* theme: T — The complete theme object
* rounded: T\['rounded'] — Direct accessor for border radius variants
* buttonSize: T\['buttonSize'] — Direct accessor for button size variants
* isNavFixed?: T\['isNavFixed'] — Optional navigation positioning flag
* isDarkMode: boolean — Current dark mode state
* prefersReducedMotion: boolean — User's motion preference
* toggleDarkMode: () => void — Function to toggle dark mode
* setDarkMode: (value: boolean) => void — Function to set dark mode explicitly

Sources: [ThemeProvider.tsx L12-L21](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L12-L21), [ThemeProvider.tsx L70-L82](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L70-L82)

***

## useTheme Hook

### Hook Signature

```ts
function useTheme<T extends ThemeBase = ThemeBase>(): ThemeContextValue<T>
```

The `useTheme` hook provides type-safe access to the theme context from any component within the `ThemeProvider` tree.

Source: [ThemeProvider.tsx L87-L93](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L87-L93)

<details>

<summary>Error handling</summary>

If `useTheme` is called outside a `ThemeProvider`, the hook throws:

```
Error: useTheme must be used within ThemeProvider
```

This ensures consumers always have access to a valid theme context.

Source: [ThemeProvider.tsx L89-L91](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L89-L91)

</details>

### Type Safety

The generic type parameter `T` allows consumers to specify the exact theme type for better type inference:

```ts
// Generic usage
const { theme } = useTheme();

// Type-specific usage (example)
const { theme } = useTheme<SkyOSTheme>();
```

Source: [ThemeProvider.tsx L87](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L87-L87)

***

## Usage Pattern

Typical integration pattern:

{% stepper %}
{% step %}
### Application Setup — Import and wrap

* Import a theme object (see [Built-in Themes](built-in-themes-or-ui8kit-core-or-deepwiki.md)) from [src/themes/index.ts](https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts)
* Wrap the application root with `ThemeProvider`, passing the theme object
{% endstep %}

{% step %}
### Use within components

* Use the `useTheme` hook in any descendant component
* Access theme properties, dark mode state, and control methods
{% endstep %}
{% endstepper %}

Sources: [src/themes/index.ts L1-L9](https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L1-L9), [ThemeProvider.tsx L25-L85](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L25-L85)

Example (conceptual):

```tsx
import { ThemeProvider } from '@ui8kit/core';
import { skyOSTheme } from '@ui8kit/core/themes';

function App() {
  return (
    <ThemeProvider theme={skyOSTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

***

## Data Flow

* Theme object (e.g., `skyOSTheme`) passed into `ThemeProvider` via props
* Provider initializes local state (dark mode, reduced motion) using:
  * `localStorage` ('ui:dark')
  * `window.matchMedia`
* Provider composes `ThemeContextValue` (memoized) and supplies it via `ThemeContext`
* Consumers call `useTheme()` -> `useContext(ThemeContext)` -> receive `ThemeContextValue`
* Consumers can read theme, toggle/set dark mode, and read `prefersReducedMotion`

Source: [ThemeProvider.tsx L25-L93](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L25-L93)

***

## Integration with Components

1. Direct Theme Access

```ts
const { rounded, buttonSize } = useTheme();
// Use rounded.default, buttonSize.lg, etc.
```

Source: [ThemeProvider.tsx L73-L74](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L73-L74)

2. Dark Mode Control

```ts
const { isDarkMode, toggleDarkMode, setDarkMode } = useTheme();
// Read state, toggle, or set explicitly
```

Source: [ThemeProvider.tsx L75-L79](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L75-L79)

3. Accessibility Features

```ts
const { prefersReducedMotion } = useTheme();
// Disable animations when true
```

Source: [ThemeProvider.tsx L77](https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L77-L77)

***

## Export Structure

The `ThemeProvider` and `useTheme` are exported and become part of the public API. They can be imported as:

```ts
import { ThemeProvider, useTheme } from '@ui8kit/core';
```

Sources: [src/themes/index.ts L9](https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L9-L9), [src/index.ts public API](https://github.com/ui8kit/core)

***

If you want, I can produce a minimal example project file layout showing where to import themes and wrap the app, or extract the exact TypeScript interfaces from the source files. Which would you prefer?
