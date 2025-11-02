# Dark Mode | ui8kit/core | DeepWiki

Relevant source files

* https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts
* https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx

This document explains the dark mode implementation in @ui8kit/core, including how dark mode state is managed, persisted, and toggled. For information about the theme system's broader configuration options, see Theme Provider: https://deepwiki.com/ui8kit/core/5.1-theme-provider. For details on theme-specific styling, see Built-in Themes: https://deepwiki.com/ui8kit/core/5.2-built-in-themes.

## Purpose and Scope

Dark mode in @ui8kit/core is implemented as part of the theme system and provides automatic dark mode support with user preference detection, localStorage persistence, and programmatic control. The implementation integrates with the CSS `dark` class pattern and respects system-level color scheme preferences.

## Architecture Overview

Dark mode is managed through the `ThemeProvider` component and exposed via the `useTheme` hook. The system maintains a single boolean state (`isDarkMode`) that controls both CSS class application and localStorage persistence.

Consumer Access

* useTheme() hook exposes isDarkMode, toggleDarkMode, setDarkMode Side Effects
* Applies/removes `dark` class on documentElement
* Sets `document.documentElement.style.colorScheme` State Management
* Single boolean: isDarkMode Initialization
* Read from localStorage `'ui:dark'`
* Fallback to system `prefers-color-scheme`
* Default to `false` (light)

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L28-L44

## Initialization Strategy

Dark mode preference is determined through a three-tier fallback mechanism implemented in the `ThemeProvider` component's initial state.

| Priority | Source            | Key                          | Values                        |
| -------- | ----------------- | ---------------------------- | ----------------------------- |
| 1        | localStorage      | `'ui:dark'`                  | `'1'` (dark) or `'0'` (light) |
| 2        | System Preference | `prefers-color-scheme: dark` | Media query match             |
| 3        | Default           | -                            | `false` (light mode)          |

The initialization logic is executed during the first render and includes SSR checks (see SSR Compatibility). This ensures safe behavior when rendering on the server and respects stored or system preferences when available.

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L28-L35

### Initialization Decision (summary of logic)

* If window is undefined -> default to false (SSR-safe).
* If localStorage contains `'ui:dark'`:
  * `'1'` -> dark
  * `'0'` -> light
* Else if `window.matchMedia` exists and matches `'(prefers-color-scheme: dark)'` -> dark
* Else -> light

## DOM Integration

When dark mode state changes, the system applies two DOM modifications so CSS-based theming can work correctly.

### Class Toggle

The `dark` class is toggled on the root HTML element (`document.documentElement`):

document.documentElement.classList.toggle('dark', isDarkMode)

This enables CSS patterns like:

* `.dark .component { ... }` for component-specific dark styles
* `:root.dark { --color: ... }` for CSS custom property overrides

### Color Scheme Property

The `colorScheme` CSS property is set to inform the browser of the current color scheme (helpful for native UI elements like scrollbars, form controls):

document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light'

Both modifications occur in a `useEffect` hook that runs whenever `isDarkMode` changes.

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L37-L44

## Persistence Mechanism

Dark mode preference is persisted to `localStorage` with the key `'ui:dark'`. Values:

* `'1'` represents dark mode enabled
* `'0'` represents dark mode disabled

Writes to localStorage are wrapped in a try/catch to handle restricted storage environments (private browsing, security policies). The DOM updates are skipped during SSR via `typeof document === 'undefined'` checks.

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L37-L44

## Programmatic API

The `ThemeProvider` exposes dark mode control through the `useTheme` hook, providing access to the `ThemeContextValue` interface.

### ThemeContextValue Interface

interface ThemeContextValue { theme: T; rounded: T\['rounded']; buttonSize: T\['buttonSize']; isDarkMode: boolean; // Current dark mode state isNavFixed?: T\['isNavFixed']; prefersReducedMotion: boolean; toggleDarkMode: () => void; // Toggle dark mode on/off setDarkMode: (value: boolean) => void; // Set dark mode explicitly }

### Usage Pattern

import { useTheme } from '@ui8kit/core'

const { isDarkMode, toggleDarkMode, setDarkMode } = useTheme()

* Read isDarkMode to conditionally render UI.
* Call toggleDarkMode() to flip the mode.
* Call setDarkMode(true/false) to set a specific mode.

The hook must be used within a component tree wrapped by `ThemeProvider`; otherwise it throws.

Sources:

* https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L12-L21
* https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L70-L82
* https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L87-L93

## API Methods

### toggleDarkMode()

Toggles dark mode between `true` and `false`:

toggleDarkMode: () => setIsDarkMode((v) => !v)

This function is memoized in the context value.

### setDarkMode(value: boolean)

Sets dark mode explicitly. This is the direct state setter from `useState`:

setDarkMode: setIsDarkMode

Use this to explicitly enable/disable dark mode.

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L78-L79

## Code Entity Reference

| Concept            | Code Entity                             | Location                                                               |
| ------------------ | --------------------------------------- | ---------------------------------------------------------------------- |
| Dark Mode State    | `isDarkMode: boolean`                   | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L28     |
| State Setter       | `setIsDarkMode`                         | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L28     |
| Toggle Function    | `toggleDarkMode: () => void`            | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L78     |
| Explicit Setter    | `setDarkMode: (value: boolean) => void` | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L79     |
| Storage Key        | `'ui:dark'`                             | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L29-L42 |
| Storage Values     | `'1'` / `'0'`                           | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L30-L42 |
| CSS Class          | `'dark'`                                | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L39     |
| CSS Property       | `colorScheme`                           | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L40     |
| Context Interface  | `ThemeContextValue`                     | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L12-L21 |
| Context Object     | `ThemeContext`                          | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L23     |
| Provider Component | `ThemeProvider`                         | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L25     |
| Consumer Hook      | `useTheme()`                            | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L87-L93 |

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx

## System Preference Detection

The implementation uses the `prefers-color-scheme` media query as a fallback when no explicit preference is stored:

window.matchMedia('(prefers-color-scheme: dark)').matches

This detection only occurs when:

{% stepper %}
{% step %}
typeof window !== 'undefined' — code is running in a browser environment (SSR-safe)
{% endstep %}

{% step %}
No explicit preference stored in localStorage — only then fall back to system preference
{% endstep %}

{% step %}
window.matchMedia API is available — only then perform the media query check
{% endstep %}
{% endstepper %}

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L31-L32

## Export Structure

Dark mode functionality is exported through the theme system's public API:

* src/themes/providers/ThemeProvider.tsx
* src/themes/index.ts

Exported symbols:

* ThemeProvider
* useTheme
* (ThemeContextValue is available via types)

Import path for consumers:

import { ThemeProvider, useTheme } from '@ui8kit/core'

Sources:

* https://github.com/ui8kit/core/blob/56a59911/src/themes/index.ts#L9
* https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L25-L87

## SSR Compatibility

The implementation includes guards to avoid runtime errors during server-side rendering:

| Check                             | Purpose                                  | Location                                                               |
| --------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| `typeof window !== 'undefined'`   | Prevent access to window APIs during SSR | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L29-L31 |
| `typeof document === 'undefined'` | Skip DOM manipulation during SSR         | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L38     |
| Try/catch around localStorage     | Handle restricted storage access         | https://github.com/ui8kit/core/blob/56a59911/ThemeProvider.tsx#L41-L43 |

These guards ensure the component can render on the server and provide full functionality in the browser.

Sources: https://github.com/ui8kit/core/blob/56a59911/src/themes/providers/ThemeProvider.tsx#L28-L44
