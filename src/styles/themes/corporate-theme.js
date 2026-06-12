import defaultTheme from './default-theme'

const corporateTheme = {
  ...defaultTheme,
  id: 'corporate',
  label: 'Corporate Theme',

  colors: {
    ...defaultTheme.colors,
    brandPrimary: '#0b1f3a',
    brandSecondary: '#1d4ed8',
    brandAccent: '#38bdf8',
    bgSubtle: '#eff6ff',
  },
}

export default corporateTheme