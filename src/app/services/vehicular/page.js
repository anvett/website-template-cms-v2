import { vehicularPageData } from "@/data/pages/vehicular.page.data";
import { vehicularSectionsData } from "@/data/sections/vehicular.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { ComparisonSection } from "@/components/sections/comparison";
import { StatsSection } from "@/components/sections/stats";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export const metadata = {
  title: vehicularPageData.seo.title,
  description: vehicularPageData.seo.description,
  alternates: {
    canonical: vehicularPageData.seo.canonical,
  },
  robots: vehicularPageData.seo.robots,
  openGraph: vehicularPageData.openGraph,
};

export default function VehicularPage() {
  const sections = vehicularPageData.sections
    .map((sectionId) =>
      vehicularSectionsData.find((section) => section.id === sectionId),
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
          case "Stats":
            return <StatsSection key={section.id} data={section} />;
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
