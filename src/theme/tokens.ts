export const themeColors = {
  light: {
    background: 'hsl(0, 0%, 100%)',
    foreground: 'hsl(240, 10%, 3.9%)',
    card: 'hsl(0, 0%, 100%)',
    primary: 'hsl(240, 5.9%, 10%)',
    border: 'hsl(240, 5.9%, 90%)',
    destructive: 'hsl(0, 84.2%, 60.2%)',
  },
  dark: {
    background: 'hsl(240, 10%, 3.9%)',
    foreground: 'hsl(0, 0%, 98%)',
    card: 'hsl(240, 10%, 3.9%)',
    primary: 'hsl(0, 0%, 98%)',
    border: 'hsl(240, 3.7%, 15.9%)',
    destructive: 'hsl(0, 72%, 51%)',
  },
} as const;

export type ColorScheme = keyof typeof themeColors;
