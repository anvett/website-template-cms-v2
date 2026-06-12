import { technicalServicePageData } from "@/data/pages/technical-service.page.data";
import { technicalServiceSectionsData } from "@/data/sections/technical-service.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { ComparisonSection } from "@/components/sections/comparison";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export default function TechnicalServicePage() {
  const sections = technicalServicePageData.sections
    .map((sectionId) =>
      technicalServiceSectionsData.find((section) => section.id === sectionId),
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
          case "Comparison":
            return <ComparisonSection key={section.id} data={section} />;
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