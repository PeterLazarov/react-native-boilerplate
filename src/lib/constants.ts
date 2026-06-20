import { themeColors } from '@/theme/tokens';

export const NAV_THEME = {
  light: {
    background: themeColors.light.background,
    border: themeColors.light.border,
    card: themeColors.light.card,
    notification: themeColors.light.destructive,
    primary: themeColors.light.primary,
    text: themeColors.light.foreground,
  },
  dark: {
    background: themeColors.dark.background,
    border: themeColors.dark.border,
    card: themeColors.dark.card,
    notification: themeColors.dark.destructive,
    primary: themeColors.dark.primary,
    text: themeColors.dark.foreground,
  },
};
