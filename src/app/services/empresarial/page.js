import { empresarialPageData } from "@/data/pages/empresarial.page.data";
import { empresarialSectionsData } from "@/data/sections/empresarial.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { ComparisonSection } from "@/components/sections/comparison";
import { ServicesSection } from "@/components/sections/services";
import { StatsSection } from "@/components/sections/stats";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export const metadata = {
  title: empresarialPageData.seo.title,
  description: empresarialPageData.seo.description,
  alternates: {
    canonical: empresarialPageData.seo.canonical,
  },
  robots: empresarialPageData.seo.robots,
  openGraph: empresarialPageData.openGraph,
};

export default function EmpresarialPage() {
  const sections = empresarialPageData.sections
    .map((sectionId) =>
      empresarialSectionsData.find(
        (section) => section.id === sectionId,
      ),
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
          case "Services":
            return <ServicesSection key={section.id} data={section} />;
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
