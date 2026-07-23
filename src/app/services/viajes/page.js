import { viajesPageData } from "@/data/pages/viajes.page.data";
import { viajesSectionsData } from "@/data/sections/viajes.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { ServicesSection } from "@/components/sections/services";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export const metadata = {
  title: viajesPageData.seo.title,
  description: viajesPageData.seo.description,
  alternates: {
    canonical: viajesPageData.seo.canonical,
  },
  robots: viajesPageData.seo.robots,
  openGraph: viajesPageData.openGraph,
};

export default function ViajesPage() {
  const sections = viajesPageData.sections
    .map((sectionId) =>
      viajesSectionsData.find((section) => section.id === sectionId),
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
