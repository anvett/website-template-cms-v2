import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { StatsSection } from "@/components/sections/stats";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PartnersSection } from "@/components/sections/partners";
import { CTASection } from "@/components/sections/cta";
import { QuoteSection } from "@/components/sections/quote";
import { FAQSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { LegalSection } from "@/components/sections/legal";
import { ProductsSection } from "@/components/sections/products";
import { ComparisonSection } from "@/components/sections/comparison";
import { DualContentSection } from "@/components/sections/dual-content";
import { FeaturesSection } from "@/components/sections/features";
import { TeamSection } from "@/components/sections/team";

/**
 * `component` (contrato oficial, CLAUDE.md) -> componente React que lo
 * renderiza. Empezó en Fase 4.1 solo con "hero" (la Section piloto del
 * prototipo mínimo). Ampliado en Fase 5 para el sitio de muestra
 * "Eurocentro" con los 11 components que ese sitio realmente usa
 * (about, services, stats, testimonials, partners, cta, quote, faq,
 * contact, legal, products), y completado acá con los 4 restantes del
 * catálogo (`comparison`, `dual-content`, `features`, `team`) para
 * cerrar el inventario 100% (cronograma 5.1) — ningún sitio real los usa
 * todavía, quedan sin ejercitar contra contenido real hasta que un sitio
 * los necesite (mismo caveat que el resto del sistema: la ausencia de
 * caso de uso real no bloquea que el dispatcher los sepa resolver).
 */
export const sectionRegistry = {
  hero: HeroSection,
  about: AboutSection,
  services: ServicesSection,
  stats: StatsSection,
  testimonials: TestimonialsSection,
  partners: PartnersSection,
  cta: CTASection,
  quote: QuoteSection,
  faq: FAQSection,
  contact: ContactSection,
  legal: LegalSection,
  products: ProductsSection,
  comparison: ComparisonSection,
  "dual-content": DualContentSection,
  features: FeaturesSection,
  team: TeamSection,
};
