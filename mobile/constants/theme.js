/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#4f46e5"; // Indigo primary
const tintColorDark = "#8b5cf6"; // Violet secondary

export const Colors = {
  light: {
    text: "#0f172a",
    background: "#f8fafc",
    tint: tintColorLight,
    icon: "#64748b",
    tabIconDefault: "#cbd5e1",
    tabIconSelected: tintColorLight,
    primary: "#4f46e5",
    secondary: "#8b5cf6",
    accent: "#06b6d4",
    card: "#ffffff",
    border: "#e2e8f0",
  },
  dark: {
    text: "#f8fafc",
    background: "#0f172a",
    tint: tintColorDark,
    icon: "#94a3b8",
    tabIconDefault: "#334155",
    tabIconSelected: tintColorDark,
    primary: "#6366f1",
    secondary: "#a78bfa",
    accent: "#22d3ee",
    card: "#1e293b",
    border: "#334155",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
