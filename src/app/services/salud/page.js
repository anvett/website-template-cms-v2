import { saludPageData } from "@/data/pages/salud.page.data";
import { saludSectionsData } from "@/data/sections/salud.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { ServicesSection } from "@/components/sections/services";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export const metadata = {
  title: saludPageData.seo.title,
  description: saludPageData.seo.description,
  alternates: {
    canonical: saludPageData.seo.canonical,
  },
  robots: saludPageData.seo.robots,
  openGraph: saludPageData.openGraph,
};

export default function SaludPage() {
  const sections = saludPageData.sections
    .map((sectionId) =>
      saludSectionsData.find((section) => section.id === sectionId),
    )
    .filter(Boolean);

  return (
    <main>
      {sections.map((section) => {
        if (!section.enabled) return null;

        switch (section.component) {
          case "Hero":
            return <HeroSection key={section.id} data={section} />;
          case "About":
            return <AboutSection key={section.id} data={section} />;
          case "Features":
            return <FeaturesSection key={section.id} data={section} />;
          case "Services":
            return <ServicesSection key={section.id} data={section} />;
          case "Quote":
            return <QuoteSection key={section.id} data={section} />;
          case "CTA":
            return <CTASection key={section.id} data={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
