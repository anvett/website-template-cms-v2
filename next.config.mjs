/** @type {import('next').NextConfig} */
const nextConfig = {
  // `output: "export"` QUITADO a propósito: este repo está sirviendo
  // ahora mismo el sitio de muestra "Eurocentro" (plan de validación de
  // dos sitios), una instancia con CMS activo — sus rutas
  // (src/app/**/page.js) hacen fetch server-side contra el backend vía
  // src/lib/cms/, lo que requiere runtime de servidor (ISR real). Static
  // export no tiene ese runtime — dejar esta línea rompería el build.
  // Si este repo vuelve a usarse como base para una instancia SIN CMS
  // (sitio informativo, cPanel o Vercel estático), restaurar
  // `output: "export"` en ese momento. Ver
  // docs/decisions/decision-log.md ("Static export + cPanel vs. Vercel
  // dinámico + ISR", 2026-08-12) y
  // docs/implementation/PROCESO-DEPLOY-PROVISIONING-INSTANCIA.md sección 6.
  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "peach.blender.org",
      },
    ],
  },

  // Bloque E4 (DW-008, DECISIÓN PO 3): `frame-ancestors` restringido,
  // scoped exclusivamente al origin de Editor Anvetcorp configurado
  // para ESTA instancia vía `NEXT_PUBLIC_ANVETCORP_EDITOR_ORIGIN` --
  // nunca framing universal, nunca "*". Sin esa variable configurada,
  // el default es `'self'` (ningún framing externo permitido) -- más
  // restrictivo que el estado actual (sin ningún CSP), nunca menos.
  // No se agrega ninguna otra directiva de CSP acá -- E4 no autoriza
  // ampliar esto a una política general.
  async headers() {
    const editorOrigin = process.env.NEXT_PUBLIC_ANVETCORP_EDITOR_ORIGIN;
    const frameAncestors = editorOrigin ? `'self' ${editorOrigin}` : "'self'";

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors ${frameAncestors};`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;