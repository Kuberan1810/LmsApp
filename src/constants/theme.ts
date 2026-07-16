export const Colors = {
  light: {
    text: '#1F2937',
    textSecondary: '#4B5563',
    background: '#FFFFFF',
    backgroundElement: '#F3F4F6',
    backgroundSelected: '#E5E7EB',
  },
  dark: {
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    background: '#111827',
    backgroundElement: '#1F2937',
    backgroundSelected: '#374151',
  },
};

export type ThemeColor = keyof typeof Colors.light;

export const Spacing = {
  half: 4,
  one: 8,
  two: 16,
  three: 24,
  four: 32,
  five: 40,
};

export const Fonts = {
  mono: 'System',
};

export const MaxContentWidth = 1200;
