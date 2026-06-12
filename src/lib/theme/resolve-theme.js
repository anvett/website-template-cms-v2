/*
  LEGACY FILE

  Este archivo pertenecía al sistema visual anterior
  basado en theme injection desde layout.js.

  Actualmente el sistema visual principal utiliza:
  globals.css como fuente visual principal.

  Mantener temporalmente por compatibilidad mientras
  se completa la migración.
*/

import defaultTheme from '@/styles/themes/default-theme'
import corporateTheme from '@/styles/themes/corporate-theme'
import minimalTheme from '@/styles/themes/minimal-theme'
import editorialTheme from '@/styles/themes/editorial-theme'
import instamaticTheme from '@/styles/themes/instamatic-theme'

const themesMap = {
  default: defaultTheme,
  corporate: corporateTheme,
  minimal: minimalTheme,
  editorial: editorialTheme,
  instamatic: instamaticTheme,
}

export function resolveTheme(themeKey = 'instamatic') {
  return themesMap[themeKey] || defaultTheme
}