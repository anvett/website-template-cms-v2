# 02-MANUAL-MAESTRO-UI-BASE.md

# TEMPLATE CMS INFORMATIVO
## MANUAL MAESTRO UI BASE V2

---

# 1. PROPÓSITO

La UI Base es la capa reutilizable oficial del framework.

Su objetivo es:

- acelerar implementación de nuevas instancias;
- mantener consistencia;
- reducir duplicación;
- facilitar mantenimiento;
- servir de base para CMS futuro;
- servir de base para agentes IA.

La UI Base NO controla branding final.

La identidad visual final pertenece a:

- globals.css
- variables CSS
- sections
- variants

---

# 2. FILOSOFÍA

## Reusable First

Todo componente debe poder reutilizarse en múltiples proyectos.

## Desacoplamiento

Los componentes UI no deben contener:

- contenido hardcodeado;
- branding específico;
- lógica de negocio.

## Responsive First

Todo componente debe funcionar:

- mobile
- tablet
- desktop

## Visual Hybrid System

La UI Base se integra con:

- globals.css
- variables CSS
- Tailwind
- CSS auxiliar

---

# 3. ESTRUCTURA OFICIAL

/actions
- Button

/content
- Card
- Heading
- Text
- SectionHeader
- InfoItem
- MediaFrame
- StatItem

/layout
- Container
- Grid
- GridItem
- Stack

/structure
- Divider
- SectionWrapper

/navigation
- Link

/form
- Form
- FormField
- Input
- Select
- Textarea

/feedback
- Modal

/media
- MapEmbed
- Slider

/disclosure
- Accordion

/data-display
- Table

---

# 4. REGLAS GLOBALES

## Permitido

- Tailwind
- variables CSS
- CSS Modules
- CSS auxiliar local
- Framer Motion

## Prohibido

- colores hardcodeados
- branding dentro de UI Base
- lógica de negocio
- contenido fijo
- desktop-first

---

# 5. FAMILIA ACTIONS

## Button

Estado: OFICIAL

Responsabilidad:
Acciones reutilizables del sistema.

Variants:
- primary
- secondary
- outline

Sizes:
- sm
- md
- lg

Uso:
- CTA
- navegación
- formularios
- cards

---

# 6. FAMILIA CONTENT

## Card

Estado: OFICIAL

Responsabilidad:
Contenedor visual reutilizable.

Uso:
- servicios
- productos
- testimonios
- features

---

## Heading

Estado: OFICIAL

Responsabilidad:
Títulos reutilizables.

Reglas:
- utilizar variables globales
- evitar text-xl, text-2xl, etc.

---

## Text

Estado: OFICIAL

Responsabilidad:
Párrafos y contenido textual.

---

## SectionHeader

Estado: OFICIAL

Responsabilidad:
Encabezado estándar de sections.

Elementos:
- eyebrow
- title
- description

---

## InfoItem

Estado: OFICIAL

Responsabilidad:
Mostrar icono, título y descripción.

---

## MediaFrame

Estado: OFICIAL

Soporta:
- image
- video
- embed

---

## StatItem

Estado: OFICIAL

Responsabilidad:
Métricas e indicadores.

---

# 7. FAMILIA LAYOUT

## Container

Estado: OFICIAL

Variants:
- content
- section
- wide
- full

---

## Grid

Estado: OFICIAL

Responsabilidad:
Grillas responsivas reutilizables.

---

## GridItem

Estado: OFICIAL

Responsabilidad:
Elemento hijo de Grid.

---

## Stack

Estado: OFICIAL

Responsabilidad:
Distribución horizontal o vertical.

---

# 8. FAMILIA STRUCTURE

## Divider

Estado: OFICIAL

Responsabilidad:
Separación visual de bloques.

---

## SectionWrapper

Estado: OFICIAL

Responsabilidad:
Envolver sections con:
- spacing
- surface
- container

Props:
- surface
- spacing
- containerWidth

---

# 9. FAMILIA NAVIGATION

## Link

Estado: OFICIAL

Soporta:
- internos
- externos
- anchors
- mailto
- tel

---

# 10. FAMILIA FORM

## Form

Estado: OFICIAL

## FormField

Estado: OFICIAL

## Input

Estado: OFICIAL

## Select

Estado: OFICIAL

## Textarea

Estado: OFICIAL

Objetivo:
Preparar integración CMS y formularios reutilizables.

---

# 11. FAMILIA FEEDBACK

## Modal

Estado: OFICIAL

Soporta:
- portal
- overlay
- escape
- closeOnOverlay

Sizes:
- sm
- md
- lg

---

# 12. FAMILIA MEDIA

## MapEmbed

Estado: OFICIAL

Responsabilidad:
Mapas embebidos.

---

## Slider

Estado: OFICIAL

Ratios:
- auto
- square
- video
- portrait
- landscape

Uso:
- galerías
- productos
- testimonios

---

# 13. FAMILIA DISCLOSURE

## Accordion

Estado: OFICIAL

Soporta:
- FAQ
- contenido expandible
- apertura múltiple

---

# 14. FAMILIA DATA DISPLAY

## Table

Estado: OFICIAL

Soporta:
- caption
- density
- striped
- hoverable
- empty state

---

# 15. CONVENCIONES PARA IA

Todo componente debe incluir documentación interna.

Formato recomendado:

- propósito
- props
- dependencias
- uso recomendado
- reglas

Los agentes IA deben consultar primero:

1. MANUAL-MAESTRO-SISTEMA.md
2. MANUAL-MAESTRO-UI-BASE.md
3. MANUAL-MAESTRO-SECTIONS.md
4. MANUAL-MAESTRO-DATA.md

---

# 16. ANTI-PATRONES

Prohibido:

- hardcodes visuales
- branding dentro de UI
- lógica de negocio
- props innecesarias
- dependencias circulares

---

# 17. ROADMAP

Futuras mejoras:

- CMS
- generación automática de sections
- generación automática de variants
- agentes IA
- constructor visual

---

# CIERRE

La UI Base constituye la capa reutilizable oficial del framework y debe mantenerse desacoplada, documentada, responsive y preparada para automatización futura.
