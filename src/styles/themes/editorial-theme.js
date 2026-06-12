import defaultTheme from './default-theme'

const editorialTheme = {
  ...defaultTheme,
  id: 'editorial',
  label: 'Editorial Theme',

  colors: {
    ...defaultTheme.colors,
    brandPrimary: '#3f1d38',
    brandSecondary: '#7c3aed',
    brandAccent: '#c084fc',
    bgSubtle: '#faf5ff',
  },

  radius: {
    ...defaultTheme.radius,
    lg: '1.25rem',
    xl: '2rem',
  },
}

export default editorialTheme