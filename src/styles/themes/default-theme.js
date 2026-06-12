const defaultTheme = {
  id: 'default',
  label: 'Default Theme',

  colors: {
    brandPrimary: '#0f172a',
    brandSecondary: '#334155',
    brandAccent: '#2563eb',

    bgBase: '#ffffff',
    bgSubtle: '#f8fafc',
    bgMuted: '#e2e8f0',
    bgStrong: '#0f172a',

    textBase: '#0f172a',
    textMuted: '#475569',
    textInverse: '#ffffff',

    borderBase: '#2563eb',
    borderStrong: '#1d4ed8',

    stateSuccess: '#16a34a',
    stateWarning: '#d97706',
    stateDanger: '#dc2626',
  },

  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },

  spacing: {
    section: 'clamp(4rem, 8vw, 6rem)',
    containerX: '1.25rem',
    stack: '1.5rem',
  },

  radius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    pill: '9999px',
  },

  shadows: {
    sm: '0 1px 2px rgba(15, 23, 42, 0.06)',
    md: '0 12px 24px rgba(15, 23, 42, 0.08)',
    lg: '0 24px 48px rgba(15, 23, 42, 0.12)',
  },

  containers: {
    narrow: '48rem',
    base: '72rem',
    wide: '84rem',
  },
}

export default defaultTheme