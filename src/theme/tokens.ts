/**
 * JS-readable copy of the design tokens defined in global.css.
 *
 * NativeWind classes (bg-primary, …) read the CSS variables directly, so most
 * UI never touches this file. It exists for consumers that can't use classes —
 * e.g. React Navigation's theme object, the status bar, native splash. Keep the
 * values in sync with global.css (and, eventually, the shared web token package).
 */
export const tokens = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(240 10% 3.9%)',
    primary: 'hsl(240 5.9% 10%)',
    border: 'hsl(240 5.9% 90%)',
  },
  dark: {
    background: 'hsl(240 10% 3.9%)',
    foreground: 'hsl(0 0% 98%)',
    primary: 'hsl(0 0% 98%)',
    border: 'hsl(240 3.7% 15.9%)',
  },
} as const;

export type ColorScheme = keyof typeof tokens;
