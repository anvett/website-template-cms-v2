import { waterPumpsPageData } from "@/data/pages/water-pumps.page.data";
import { waterPumpsSectionsData } from "@/data/sections/water-pumps.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { ComparisonSection } from "@/components/sections/comparison";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export default function WaterPumpsPage() {
  const sections = waterPumpsPageData.sections
    .map((sectionId) =>
      waterPumpsSectionsData.find((section) => section.id === sectionId),
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