# MANUAL-MAESTRO-SISTEMA.md

# TEMPLATE CMS INFORMATIVO — DOCUMENTACIÓN OFICIAL V2

---

# 1. INTRODUCCIÓN

## Propósito del sistema

El presente documento establece la arquitectura oficial, reglas operativas, filosofía técnica y lineamientos estructurales del Template CMS Informativo desarrollado para el ecosistema digital de Anvetcorp.

Este sistema fue diseñado como una arquitectura reutilizable orientada a:

- creación rápida de sitios web informativos;
- reutilización de sections y componentes;
- implementación acelerada de nuevas instancias;
- compatibilidad con múltiples tipos de negocio;
- futura integración CMS;
- futura automatización mediante agentes IA;
- escalabilidad multiinstancia;
- compatibilidad con despliegues modernos y tradicionales.

Este documento reemplaza oficialmente documentación antigua basada en arquitecturas previas del proyecto.

---

## Objetivo del framework

El objetivo del framework es permitir:

- construir sitios informativos modernos;
- mantener consistencia arquitectónica;
- acelerar nuevas implementaciones;
- desacoplar data y visuales;
- facilitar mantenimiento;
- preparar evolución futura hacia CMS/SaaS;
- servir como base documental para automatización IA.

---

## Alcance

Este manual documenta:

- arquitectura oficial actual;
- sistema visual;
- flujo operativo;
- filosofía del framework;
- reglas globales;
- responsive;
- motion;
- deploy;
- sistemas legacy;
- convenciones oficiales;
- anti-patrones;
- roadmap futuro.

---

# 2. FILOSOFÍA ARQUITECTÓNICA

## Data-first

Toda implementación del sistema debe construirse partiendo desde la data.

La arquitectura prioriza:

```txt
DATA
→ PAGES
→ SECTIONS
→ UI
→ VISUAL
```

Las sections deben consumir data estructurada.

La lógica visual no debe depender de contenido hardcodeado.

---

## Reusable-first

El sistema está diseñado para maximizar reutilización.

Esto aplica a:

- sections;
- variants;
- componentes UI;
- helpers visuales;
- estructuras data;
- motion;
- layouts;
- deploy.

---

## Responsive-first

Responsive-first es una regla arquitectónica oficial obligatoria.

Toda nueva:

- section;
- variant;
- componente;
- layout;
- página;
- instancia;

Debe diseñarse:

```txt
mobile
→ tablet
→ desktop
```

Nunca al revés.

---

## Sistema visual híbrido

El proyecto utiliza oficialmente una arquitectura visual híbrida.

```txt
globals.css
+
Tailwind
+
CSS local auxiliar
+
variables CSS
+
UI base desacoplada
```

No existe una única capa visual monolítica.

Cada capa tiene responsabilidades específicas.

---

## Desacoplamiento

El framework prioriza desacoplamiento entre:

- data;
- sections;
- visuales;
- deploy;
- componentes;
- layouts;
- branding.

Esto permite:

- escalabilidad;
- reemplazo de visuales;
- automatización;
- CMS futuro;
- agentes IA;
- multiinstancia.

---

## Escalabilidad

Toda decisión arquitectónica debe considerar:

- nuevas instancias;
- múltiples clientes;
- reutilización;
- automatización futura;
- CMS;
- IA;
- generación automática de sections y variants.

---

# 3. NATURALEZA OFICIAL DEL PROYECTO

El sistema queda oficialmente definido como:

## 3.1 Sistema multiproyecto

El framework puede reutilizarse para múltiples sitios informativos.

---

## 3.2 Sistema multiinstancia

El sistema permite crear múltiples instancias reutilizando:

- sections;
- components;
- layouts;
- contracts;
- estructura.

---

## 3.3 Base futura CMS/SaaS

La arquitectura actual prepara el camino para:

- CMS desacoplado;
- administración multiusuario;
- edición dinámica;
- agentes IA;
- automatización de instancias;
- generación automática de variants.

---

# 4. ARQUITECTURA GENERAL DEL SISTEMA

## Arquitectura oficial actual

```txt
DATA
→ PAGES
→ SECTIONS
→ VARIANTS
→ UI BASE
→ globals.css
→ Tailwind
→ CSS local auxiliar
→ layout.js
→ deploy
```

---

## Flujo operativo oficial

```txt
1. Definir data
2. Definir pages
3. Definir sections
4. Seleccionar variants
5. Implementar sections
6. Ajustar globals.css
7. Responsive
8. Motion
9. Build
10. Export
11. Deploy
```

---

## Capas principales

### DATA
Responsable de:

- contenido;
- configuración;
- estructura;
- pages;
- navegación;
- SEO;
- variantes;
- backgrounds;
- assets.

---

### PAGES
Responsables de:

- ensamblar sections;
- definir flujo visual;
- organizar contenido;
- renderizar páginas.

---

### SECTIONS
Responsables de:

- composición visual;
- responsive;
- backgrounds;
- overlays;
- integración UI;
- motion;
- layout final.

---

### VARIANTS
Responsables de:

- reutilización visual;
- variaciones de layout;
- estilos alternativos;
- composición especializada.

---

### UI BASE
Responsable de:

- reutilización;
- consistencia;
- desacoplamiento;
- aceleración de implementación.

---

### globals.css
Responsable de:

- tokens;
- identidad visual global;
- variables CSS;
- helpers reutilizables;
- surfaces;
- gradients;
- spacing;
- typography.

---

### Tailwind
Responsable de:

- layout;
- responsive;
- flex;
- grid;
- spacing;
- implementación visual rápida.

---

### CSS local
Responsable de:

- composición especializada;
- overlays;
- layouts complejos;
- reglas difíciles de mantener en JSX.

---

# 5. SISTEMA VISUAL OFICIAL

## globals.css

`globals.css` es oficialmente la capa visual global del sistema.

Debe contener:

- variables CSS;
- colores;
- typography;
- spacing;
- surfaces;
- gradients;
- shadows;
- radius;
- helpers;
- estilos globales reutilizables.

---

## Variables CSS

Las variables CSS son el sistema oficial de identidad visual.

Ejemplos:

```css
--color-primary
--color-secondary
--color-accent
--color-bg
--color-text
--font-heading
--font-body
--section-spacing
--container-width
```

---

## Tailwind

Tailwind es oficialmente la herramienta principal de implementación visual.

Debe utilizarse para:

- grid;
- flex;
- responsive;
- spacing;
- alignment;
- composición rápida.

---

## Regla oficial de Tailwind

Tailwind NO debe convertirse en:

- visuales completamente hardcodeados;
- sistema aislado;
- reemplazo total de variables globales.

Debe apoyarse preferentemente en:

```css
var(--...)
```

---

## CSS local por section

El CSS local está oficialmente permitido.

Debe usarse solo cuando:

- Tailwind vuelve el JSX difícil de mantener;
- la section requiere overlays complejos;
- la composición es especializada;
- existen animaciones complejas;
- se requieren layouts editoriales;
- existen reglas extensas.

---

## Helpers oficiales

El sistema permite helpers reutilizables globales.

Ejemplos:

```txt
surface-dark
surface-soft
gradient-dark
gradient-soft
btn-primary
btn-secondary
btn-outline
```

---

# 6. SISTEMA UI BASE

## Filosofía oficial

La UI base es un sistema desacoplado de componentes reutilizables.

No debe imponer:

- branding rígido;
- layouts específicos;
- composiciones cerradas.

---

## Regla oficial

La UI base debe ser el primer recurso reutilizable.

Sin embargo:

NO debe forzarse cuando:

- limita diseño;
- dificulta implementación;
- Tailwind directo resulta más claro;
- la section requiere composición propia.

---

## Objetivos oficiales de UI base

- reutilización;
- consistencia;
- aceleración;
- desacoplamiento;
- mantenibilidad.

---

## Componentes base esperados

```txt
Button
Card
Heading
Text
SectionHeader
Container
SectionWrapper
MediaFrame
Modal
Accordion
Form
Input
Textarea
Select
Slider
Table
Link
InfoItem
StatItem
```

---

# 7. SISTEMA DE SECTIONS

## Filosofía

Las sections son responsables de la composición visual final.

Las sections:

- pueden usar UI base;
- pueden usar Tailwind directo;
- pueden usar CSS local;
- pueden tener variantes;
- pueden tener backgrounds;
- pueden tener overlays;
- pueden tener motion;
- deben consumir data.

---

## Responsabilidades oficiales

Las sections controlan:

- layout final;
- responsive;
- composición;
- jerarquía visual;
- integración media;
- overlays;
- backgrounds;
- spacing;
- motion.

---

## Variants

Las variants son oficialmente parte central del sistema.

Permiten:

- reutilización;
- variaciones visuales;
- composiciones alternativas;
- escalabilidad.

---

## Backgrounds

Las sections pueden usar:

- colores sólidos;
- gradients;
- imágenes;
- overlays;
- media backgrounds.

---

## Overlays

Los overlays quedan oficialmente permitidos.

Especialmente en:

- Hero;
- CTA;
- Testimonials;
- Features;
- Products.

---

# 8. SISTEMA DATA-FIRST

## Filosofía oficial

La data es el núcleo del framework.

Toda implementación debe partir desde:

- contracts;
- estructura;
- organización;
- configuración.

---

## Estructuras oficiales

```txt
site.data.js
navigation.data.js
pages
sections
variants
shared data
```

---

## Responsabilidades de la data

La data debe controlar:

- contenido;
- SEO;
- variants;
- backgrounds;
- assets;
- navegación;
- acciones;
- metadata.

---

## Regla oficial

Evitar hardcodes innecesarios dentro de sections.

---

# 9. RESPONSIVE OFICIAL

## Regla oficial

Responsive-first obligatorio.

---

## Reglas oficiales

### Preferir:

- clamp();
- min();
- max();
- grid responsive;
- flex responsive;
- widths fluidos;
- aspect-ratio;
- spacing adaptable.

---

### Evitar:

- desktop-first;
- widths rígidos;
- heights rígidos;
- hardcodes excesivos;
- layouts estáticos.

---

## Tipografía oficial

NO usar:

```txt
text-xl
text-2xl
text-4xl
```

Preferir:

```txt
text-[1.25rem]
text-[2rem]
text-[clamp(...)]
```

---

# 10. MOTION OFICIAL

## Estado oficial

Motion queda oficialmente:

```txt
RECOMENDADO POR DEFECTO
```

---

## Librería oficial

```txt
Framer Motion
```

---

## Reglas oficiales

El motion debe:

- ser sutil;
- no romper responsive;
- no afectar performance;
- no complicar mantenibilidad;
- complementar diseño.

---

## Uso recomendado

Especialmente en:

- Hero;
- CTA;
- Products;
- Services;
- Testimonials;
- entrances;
- overlays;
- sliders;
- modals.

---

# 11. DEPLOY Y COMPATIBILIDAD

## Compatibilidad dual oficial

El sistema debe mantener compatibilidad obligatoria con:

- Vercel;
- static export;
- cPanel.

---

## Arquitectura futura

La arquitectura futura apunta a:

- multiinstancia;
- SaaS;
- subdominios;
- CMS;
- automatización.

---

## Restricciones oficiales

Toda nueva implementación debe evitar:

- dependencias server-only innecesarias;
- lógica incompatible con export;
- rutas problemáticas;
- assets incorrectos.

---

## Assets públicos

Regla oficial:

```txt
/assets/...
```

---

# 12. SISTEMA LEGACY

## Estado oficial de theme.js

El sistema basado en:

- theme.js
- resolve-theme.js
- theme injection

queda oficialmente marcado como:

```txt
LEGACY / DEPRECATED
```

---

## Estado actual

El sistema legacy:

- existe físicamente;
- puede reutilizarse parcialmente;
- puede servir como referencia;

Pero:

- NO participa del flujo visual actual;
- NO controla layout.js;
- NO controla globals.css;
- NO debe usarse para nuevas instancias.

---

# 13. CONVENCIONES OFICIALES

## Naming

Utilizar nombres:

- claros;
- descriptivos;
- consistentes.

---

## Sections

```txt
HeroSection
AboutSection
ServicesSection
```

---

## Variants

```txt
hero-internal
cards-with-icons
split-highlight
```

---

## Assets

Preferir:

```txt
background1.jpg
cta-back.jpg
service1.jpg
slide1.jpg
```

---

## Imports

Preferir aliases:

```txt
@/components
@/data
@/lib
```

---

# 14. ANTI-PATRONES

## Prohibido

- hardcodes excesivos;
- desktop-first;
- componentes gigantes;
- lógica mezclada con visuales;
- duplicación innecesaria;
- variants inconsistentes;
- estilos aislados del sistema;
- usar theme legacy en nuevas implementaciones.

---

## Evitar

- sobreingeniería;
- props infinitos;
- sections rígidas;
- visuales acoplados;
- dependencias innecesarias.

---

# 15. ROADMAP FUTURO

## Objetivos futuros

- CMS desacoplado;
- multiusuario;
- agentes IA;
- automatización;
- generador de variants;
- generador de sections;
- generación automática de instancias;
- pipelines IA.

---

## IA y automatización

La documentación oficial está diseñada también para:

- entrenamiento de agentes;
- automatización de implementación;
- generación asistida;
- mantenimiento IA.

---

# 16. ESTADO OFICIAL DEL SISTEMA

| Sistema | Estado |
|---|---|
| globals.css | Oficial |
| Variables CSS | Oficial |
| Tailwind | Oficial |
| UI Base | Oficial |
| Responsive-first | Oficial |
| Motion | Oficial |
| Variants | Oficial |
| CSS local auxiliar | Oficial |
| Static export | Oficial |
| Compatibilidad cPanel | Oficial |
| Vercel deploy | Oficial |
| theme.js | Deprecated |
| resolve-theme.js | Deprecated |
| theme injection | Deprecated |

---

# CIERRE OFICIAL

Este documento establece la arquitectura oficial actual del Template CMS Informativo.

Toda nueva implementación, instance, section, variant o componente debe alinearse a las reglas definidas en este manual.

Este documento reemplaza referencias históricas y define oficialmente:

- el estado operativo del sistema;
- las reglas arquitectónicas;
- la filosofía visual;
- la estructura reutilizable;
- y la base futura para automatización y CMS.

