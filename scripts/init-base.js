const fs = require("fs");
const path = require("path");

const root = process.cwd();

const dirs = [
  "src/components/ui",
  "src/components/sections",
  "src/data",
  "src/lib/theme",
  "src/lib/content",
  "src/lib/utils",
  "src/styles/themes",
  "public/assets/images/placeholder",
  "public/assets/icons",
  "docs/architecture",
  "docs/decisions",
  "docs/implementation",
];

const files = {
  "src/data/site.data.js": `export const siteData = {
  name: "Template Base",
  description: "Base inicial del proyecto",
  language: "es",
};
`,
  "src/data/navigation.data.js": `export const navigationData = [];
`,
  "src/data/hero.data.js": `export const heroData = {
  title: "Título placeholder",
  subtitle: "Subtítulo placeholder",
};
`,
  "src/data/about.data.js": `export const aboutData = {
  title: "Sobre nosotros",
  content: "Contenido placeholder",
};
`,
  "src/data/services.data.js": `export const servicesData = [];
`,
  "src/data/contact.data.js": `export const contactData = {
  email: "",
  phone: "",
  address: "",
};
`,
  "src/data/footer.data.js": `export const footerData = {
  copyright: "Template Base",
};
`,
  "src/lib/theme/tokens.js": `export const themeTokens = {
  colors: {},
  typography: {},
  spacing: {},
};
`,
  "src/lib/theme/site-theme.js": `export const siteTheme = {
  name: "base",
  tokens: {},
};
`,
  "src/lib/theme/resolve-theme.js": `import { siteTheme } from "./site-theme";

export function resolveTheme() {
  return siteTheme;
}
`,
  "src/lib/content/section-registry.js": `export const sectionRegistry = {};
`,
  "src/lib/content/map-page-sections.js": `export function mapPageSections(sections = []) {
  return sections;
}
`,
  "docs/architecture/base.md": `# Arquitectura base

Documento inicial de arquitectura del proyecto.
`,
  "docs/decisions/decision-log.md": `# Decision log

## Decisiones iniciales
- Se crea una base reusable del template.
- Se separan app, data, theme, content, ui y sections.
`,
  "docs/implementation/setup-base.md": `# Setup base

## Estado inicial
- Proyecto Next.js creado
- Git inicializado
- Estructura base creada
`,
};

function ensureDir(dirPath) {
  fs.mkdirSync(path.join(root, dirPath), { recursive: true });
}

function ensureFile(filePath, content) {
  const fullPath = path.join(root, filePath);
  const parentDir = path.dirname(fullPath);
  fs.mkdirSync(parentDir, { recursive: true });

  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content, "utf8");
    console.log("Creado:", filePath);
  } else {
    console.log("Ya existe, omitido:", filePath);
  }
}

for (const dir of dirs) {
  ensureDir(dir);
  console.log("Carpeta lista:", dir);
}

for (const [filePath, content] of Object.entries(files)) {
  ensureFile(filePath, content);
}

console.log("Base inicial generada correctamente.");