import defaultTheme from './default-theme'

const minimalTheme = {
  ...defaultTheme,
  id: 'minimal',
  label: 'Minimal Theme',

  colors: {
    ...defaultTheme.colors,
    brandPrimary: '#7c3aed',
    brandSecondary: '#a855f7',
    brandAccent: '#c084fc',
    bgBase: '#fcfcff',
    bgSubtle: '#f3e8ff',
    bgMuted: '#ede9fe',
    bgStrong: '#2e1065',
    textBase: '#1f1637',
    textMuted: '#5b4b7a',
    textInverse: '#ffffff',
    borderBase: '#d8b4fe',
    borderStrong: '#c084fc',
  },

  spacing: {
    ...defaultTheme.spacing,
    section: 'clamp(7rem, 12vw, 10rem)',
    containerX: '2rem',
    stack: '2rem',
  },

  radius: {
    ...defaultTheme.radius,
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '2.75rem',
    pill: '9999px',
  },

  shadows: {
    sm: '0 2px 8px rgba(124, 58, 237, 0.10)',
    md: '0 12px 24px rgba(124, 58, 237, 0.18)',
    lg: '0 24px 48px rgba(124, 58, 237, 0.24)',
  },
}

export default minimalTheme