# Theming System | ui8kit/core | DeepWiki

Relevant source files

* https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts
* https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx

## Purpose and Scope

The theming system provides a centralized mechanism for managing visual design tokens, dark mode preferences, and accessibility settings across all components in the library. It uses React Context to distribute theme configuration and state management throughout the component tree.

This page provides an overview of the theming architecture and how themes integrate with the component library. For detailed documentation on specific aspects, see:

* Theme Provider — Implementation details of `ThemeProvider` and `useTheme` hook: https://deepwiki.com/ui8kit/core/5.1-theme-provider
* Built-in Themes — Documentation of `skyOSTheme`, `modernUITheme`, and `lesseUITheme`: https://deepwiki.com/ui8kit/core/5.2-built-in-themes
* Dark Mode — Dark mode implementation and persistence: https://deepwiki.com/ui8kit/core/5.3-dark-mode

## Architecture Overview

The theming system is built on three core layers: theme definitions, the provider infrastructure, and consumer components.

Theme System Architecture

```
Consumer Components

State Management

Provider Layer

Theme Definitions Layer

defines structure

defines structure

defines structure

skyOSTheme

modernUITheme

lesseUITheme

ThemeBase interface

ThemeProvider component

ThemeContext (React.Context)

useTheme hook

isDarkMode state

prefersReducedMotion state

localStorage persistence

MediaQuery detection

Base Components

UI Components

Layout Components
```

Sources:\
https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L1-L9\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L1-L94

## Theme Definition Structure

Themes in the library conform to the `ThemeBase` interface, which defines a type-safe contract for theme objects. Each theme must provide specific design tokens that components rely on.

ThemeBase Interface Structure

| Property     | Type                                     | Required | Description                                |
| ------------ | ---------------------------------------- | -------- | ------------------------------------------ |
| `name`       | `string`                                 | Yes      | Unique identifier for the theme            |
| `rounded`    | `Record<string, any> & { default: any }` | Yes      | Border radius values with required default |
| `buttonSize` | `Record<string, any> & { default: any }` | Yes      | Button size variants with required default |
| `isNavFixed` | `boolean`                                | No       | Optional navigation layout configuration   |

The `rounded` and `buttonSize` properties use an indexed record pattern with a required `default` property, ensuring components always have a fallback value.

Theme Data Flow

```
Component Consumers

React Context

ThemeProvider

Theme Definition

Theme Object
{name, rounded, buttonSize, isNavFixed}

props.theme

baseTheme variable

ThemeContextValue
{theme, rounded, buttonSize, isDarkMode, isNavFixed, ...}

ThemeContext.Provider

Context State

useTheme() hook

Component access to theme data
```

Sources:\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L4-L10\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L25-L26\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L70-L82

## Theme Provider Pattern

The `ThemeProvider` component wraps the application and provides theme context to all descendant components. It accepts a single `theme` prop and manages both theme distribution and runtime state.

Provider Implementation Details

The provider manages three primary concerns:

{% stepper %}
{% step %}
### Theme Distribution

Exposes the theme object and extracted properties (`rounded`, `buttonSize`, `isNavFixed`) through context so consumers can access design tokens directly.
{% endstep %}

{% step %}
### Dark Mode State

Manages boolean dark mode state with persistence to `localStorage` and system preference detection via `matchMedia`.
{% endstep %}

{% step %}
### Accessibility State

Tracks the user's reduced motion preference via the `prefers-reduced-motion` media query and exposes it through context.
{% endstep %}
{% endstepper %}

Implementation touches include media query listeners, DOM manipulation (toggling `dark` class and `color-scheme`), and state persistence.

Sources:\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L25-L84

## Context Value Structure

The `ThemeContextValue` interface defines the complete shape of data available to consuming components through the `useTheme` hook.

Context Value Properties

| Property               | Type                       | Description                           |
| ---------------------- | -------------------------- | ------------------------------------- |
| `theme`                | `T extends ThemeBase`      | Complete theme object                 |
| `rounded`              | `T['rounded']`             | Direct access to border radius values |
| `buttonSize`           | `T['buttonSize']`          | Direct access to button size values   |
| `isDarkMode`           | `boolean`                  | Current dark mode state               |
| `isNavFixed`           | `T['isNavFixed']`          | Navigation layout preference          |
| `prefersReducedMotion` | `boolean`                  | User's reduced motion preference      |
| `toggleDarkMode`       | `() => void`               | Function to toggle dark mode          |
| `setDarkMode`          | `(value: boolean) => void` | Function to set dark mode explicitly  |

The context uses generic typing `<T extends ThemeBase>` to preserve type information from specific theme definitions, enabling type-safe access to theme properties in consuming components.

Sources:\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L12-L21

## Built-in Themes

The library ships with three pre-configured themes, each designed for different visual aesthetics. All themes implement the `ThemeBase` interface and export corresponding TypeScript types.

Available Themes

| Theme     | Export Name     | Type Export     |
| --------- | --------------- | --------------- |
| Sky OS    | `skyOSTheme`    | `SkyOSTheme`    |
| Modern UI | `modernUITheme` | `ModernUITheme` |
| Lesse UI  | `lesseUITheme`  | `LesseUITheme`  |

These themes are exported from the themes module index and can be imported directly for use with `ThemeProvider`. Detailed configuration and usage examples for each theme are documented in Built-in Themes: https://deepwiki.com/ui8kit/core/5.2-built-in-themes

Sources:\
https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L1-L6

## Dark Mode Implementation

Dark mode is implemented as a managed state within `ThemeProvider` with automatic persistence and system preference detection. The implementation follows a three-tier priority:

{% stepper %}
{% step %}
### Stored Preference

Checks `localStorage` for `'ui:dark'` key (values: `'1'` or `'0'`).
{% endstep %}

{% step %}
### System Preference

Falls back to `matchMedia('(prefers-color-scheme: dark)')`.
{% endstep %}

{% step %}
### Default

Defaults to light mode if neither is available.
{% endstep %}
{% endstepper %}

When dark mode state changes, the provider:

* Toggles the `dark` class on `document.documentElement`
* Sets `colorScheme` CSS property to `'dark'` or `'light'`
* Persists the preference to `localStorage`

For complete documentation on dark mode functionality, see: https://deepwiki.com/ui8kit/core/5.3-dark-mode

Sources:\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L28-L44

## Accessibility Features

The theming system includes built-in support for the `prefers-reduced-motion` media query, allowing components to adapt animations and transitions based on user preferences.

Reduced Motion Detection

* Initializes from `matchMedia('(prefers-reduced-motion: reduce)')`
* Updates automatically when the system preference changes
* Is exposed through the context for components to consume
* Supports both modern (`addEventListener`) and legacy (`addListener`) media query APIs

Components can access this state via `useTheme()` and conditionally disable or reduce animations accordingly.

Sources:\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L46-L68

## Using the Theme Context

Components consume theme data through the `useTheme` hook, which provides type-safe access to the context value.

Hook Usage Pattern

```js
// Basic usage
const { theme, isDarkMode, toggleDarkMode } = useTheme();

// Type-safe access with specific theme
const { theme } = useTheme<SkyOSTheme>();
```

The hook throws an error if called outside a `ThemeProvider`, ensuring proper component hierarchy.

Error Handling

```
Error: useTheme must be used within ThemeProvider
```

Sources:\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L87-L93

## Integration with Component System

The theming system integrates with the broader component architecture through multiple touchpoints:

Theme Integration Points

```
Styling Application

Component Layer

Variant System (CVA)

Theme System

ThemeProvider

useTheme hook

core/variants
Design tokens

Base Components
(Block, Box, Button, etc)

Composite Components
(Accordion, Card, etc)

Layout Components
(DashLayout, etc)

theme.rounded

theme.buttonSize

dark class on html element
```

Components can access theme properties directly through the `useTheme` hook and apply them to variant selection or dynamic styling. The `dark` class on the document root enables Tailwind's dark mode utilities throughout the component tree.

Sources:\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L70-L82\
https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L1-L9

## Server-Side Rendering Considerations

The theme provider includes guards for server-side rendering environments where `window`, `document`, and `localStorage` are undefined:

* State initialization uses `typeof window !== 'undefined'` checks
* DOM manipulation operations are wrapped in `typeof document === 'undefined'` guards
* `localStorage` access is wrapped in try-catch blocks to handle quota exceeded errors
* Media query subscriptions verify `window.matchMedia` availability

These guards ensure the component can render on the server without errors while preserving full functionality in browser environments.

Sources:\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L29\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L38\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L41-L43\
https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L52
