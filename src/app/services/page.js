import { servicesPageData } from "@/data/pages/services.page.data";
import { servicesSectionsData } from "@/data/sections/services.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { FeaturesSection } from "@/components/sections/features";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export default function ServicesPage() {
  const sections = servicesPageData.sections
    .map((sectionId) =>
      servicesSectionsData.find((section) => section.id === sectionId),
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

          case "Services":
            return <ServicesSection key={section.id} data={section} />;

          case "Features":
            return <FeaturesSection key={section.id} data={section} />;

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