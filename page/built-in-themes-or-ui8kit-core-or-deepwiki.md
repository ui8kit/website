# Built-in Themes | ui8kit/core | DeepWiki

Relevant source files

* https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts
* https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx

## Purpose and Scope

This page documents the three pre-built themes available in `@ui8kit/core`: `skyOSTheme`, `modernUITheme`, and `lesseUITheme`. Each theme provides a complete set of design tokens and configuration properties that control the visual appearance of components throughout the library.

For information about how to integrate these themes into your application using the `ThemeProvider` component, see https://deepwiki.com/ui8kit/core/5.1-theme-provider. For details on dark mode functionality, see https://deepwiki.com/ui8kit/core/5.3-dark-mode.

***

## Theme Architecture

All built-in themes conform to the `ThemeBase` type, which defines the core structure that components expect when consuming theme configuration.

### ThemeBase Type Structure

The following table describes the properties defined in the `ThemeBase` interface:

| Property     | Type                                     | Required | Description                                                   |
| ------------ | ---------------------------------------- | -------- | ------------------------------------------------------------- |
| `name`       | `string`                                 | Yes      | Unique identifier for the theme                               |
| `rounded`    | `Record<string, any> & { default: any }` | Yes      | Border radius token system with a required `default` fallback |
| `buttonSize` | `Record<string, any> & { default: any }` | Yes      | Button sizing token system with a required `default` fallback |
| `isNavFixed` | `boolean`                                | No       | Controls whether navigation elements use fixed positioning    |

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L5-L10

### Theme Object Structure

```
ThemeBase Interface

name: string

rounded: Record + default

buttonSize: Record + default

isNavFixed?: boolean
```

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L5-L10

***

## Available Themes

The library provides three pre-configured themes, each exported from the `src/themes/` directory:

| Theme Name | Export Symbol   | Type Export     | File Location            |
| ---------- | --------------- | --------------- | ------------------------ |
| skyOS      | `skyOSTheme`    | `SkyOSTheme`    | `src/themes/skyOS.ts`    |
| Modern UI  | `modernUITheme` | `ModernUITheme` | `src/themes/modernUI.ts` |
| Lesse UI   | `lesseUITheme`  | `LesseUITheme`  | `src/themes/lesseUI.ts`  |

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L1-L6

***

## Theme Exports and Type System

```
Consumer Application

Exports from src/themes/index.ts

Theme Files

src/themes/skyOS.ts

src/themes/modernUI.ts

src/themes/lesseUI.ts

skyOSTheme

modernUITheme

lesseUITheme

SkyOSTheme type

ModernUITheme type

LesseUITheme type

import { skyOSTheme } from '@ui8kit/core'

ThemeProvider theme={skyOSTheme}
```

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L1-L6

***

## Theme Properties

### Rounded Property

The `rounded` property defines border radius tokens used across components. This property must include a `default` key that serves as the fallback value when no specific variant is requested.

```
// Type structure
rounded: Record<string, any> & { default: any }
```

Components access the `rounded` property through the `useTheme` hook.

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L7-L14

### ButtonSize Property

The `buttonSize` property defines sizing tokens for button components, including dimensions, padding, and typography scale. Like `rounded`, it requires a `default` key.

```
// Type structure
buttonSize: Record<string, any> & { default: any }
```

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L8-L15

### IsNavFixed Property

The optional `isNavFixed` property controls whether navigation components use fixed positioning behavior. When set to `true`, navigation elements maintain their position during page scrolling.

```
// Type structure
isNavFixed?: boolean
```

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L9-L17

***

## Usage Patterns

### Basic Import and Setup

{% code title="Example" %}
```javascript
import { ThemeProvider, skyOSTheme } from '@ui8kit/core';

function App() {
  return (
    <ThemeProvider theme={skyOSTheme}>
      {/* Your application components */}
    </ThemeProvider>
  );
}
```
{% endcode %}

### Accessing Theme Properties

Within the `ThemeProvider` context, components can access theme properties using the `useTheme` hook:

{% code title="Example" %}
```javascript
import { useTheme } from '@ui8kit/core';

function MyComponent() {
  const { rounded, buttonSize, isNavFixed } = useTheme();

  // Use theme properties
  const borderRadius = rounded.default;
  const buttonHeight = buttonSize.default;
}
```
{% endcode %}

The `ThemeProvider` component exposes all theme properties through its context value.\
Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L70-L82 and https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L87-L93

***

## Theme Integration Flow

```
Consumer Components

Context Properties

ThemeProvider Component

Theme Definition

skyOSTheme / modernUITheme / lesseUITheme

name, rounded, buttonSize, isNavFixed

ThemeProvider

ThemeContext

ThemeContextValue

theme

rounded

buttonSize

isNavFixed

isDarkMode

prefersReducedMotion

useTheme() hook

Component implementation
```

Diagram / flow sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L25-L84 and https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L1-L9

***

## Type Safety and Extensions

Each built-in theme has its own TypeScript type export, allowing for theme-specific type checking:

* `SkyOSTheme` — Type definition for skyOS theme
* `ModernUITheme` — Type definition for Modern UI theme
* `LesseUITheme` — Type definition for Lesse UI theme

These types extend `ThemeBase` and may include additional theme-specific properties beyond the base interface. When using `useTheme` with a specific theme type, you can provide a type parameter for enhanced type safety:

```
const { theme, rounded } = useTheme<SkyOSTheme>();
```

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L4-L6 and https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L87-L93

***

## Theme Selection

Applications can switch between themes by changing the `theme` prop passed to `ThemeProvider`:

{% code title="Example" %}
```javascript
const [selectedTheme, setSelectedTheme] = useState(skyOSTheme);

// Switch to modernUI
setSelectedTheme(modernUITheme);

return (
  <ThemeProvider theme={selectedTheme}>
    {/* App content */}
  </ThemeProvider>
);
```
{% endcode %}

When the theme prop changes, the `ThemeProvider` component updates its context value through the `useMemo` dependency array, causing all consuming components to re-render with the new theme values.\
Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L70-L82 and https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L25-L84

***

## Related Context Properties

While not part of the theme object itself, the `ThemeProvider` augments theme properties with additional context values:

| Property               | Type                       | Description                                                                  |
| ---------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| `isDarkMode`           | `boolean`                  | Current dark mode state (see https://deepwiki.com/ui8kit/core/5.3-dark-mode) |
| `prefersReducedMotion` | `boolean`                  | System-level motion preference detection                                     |
| `toggleDarkMode`       | `() => void`               | Function to toggle dark mode                                                 |
| `setDarkMode`          | `(value: boolean) => void` | Function to set dark mode explicitly                                         |

These properties are documented in the context value interface.\
Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L12-L21 and https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L70-L82

***

If you want, I can:

* convert the diagrams/text flows into expandable blocks, or
* add a short stepper that walks through integrating a theme into an app. Which would you prefer?
