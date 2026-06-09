/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#7C5CFF';
const tintColorDark = '#8B6CFF';

export const Colors = {
  light: {
    text: '#0F172A',
    background: '#F8FAFC',

    tint: tintColorLight,

    icon: '#64748B',
    tabIconDefault: '#64748B',
    tabIconSelected: tintColorLight,

    card: '#FFFFFF',
    border: '#E2E8F0',

    primary: '#7C5CFF',
    secondary: '#9B8AFB',

    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',

    chart: [
      '#7C5CFF',
      '#3B82F6',
      '#22C55E',
      '#F59E0B',
      '#EC4899'
    ]
  },

  dark: {
    text: '#E5E7EB',

    background: '#0A0F1E',

    tint: tintColorDark,

    icon: '#9BA1A6',
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,

    // dashboard cards
    card: '#111827',

    border: '#1F2937',

    primary: '#8B6CFF',
    secondary: '#A78BFA',

    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',

    chart: [
      '#8B6CFF',
      '#60A5FA',
      '#34D399',
      '#FBBF24',
      '#F472B6'
    ]
  },
};

export const KPIColors = {
  total: '#8B6CFF',
  average: '#3B82F6',
  max: '#6366F1',
  min: '#EC4899',
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
