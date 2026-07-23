import { hogarPageData } from "@/data/pages/hogar.page.data";
import { hogarSectionsData } from "@/data/sections/hogar.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { ComparisonSection } from "@/components/sections/comparison";
import { ServicesSection } from "@/components/sections/services";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export const metadata = {
  title: hogarPageData.seo.title,
  description: hogarPageData.seo.description,
  alternates: {
    canonical: hogarPageData.seo.canonical,
  },
  robots: hogarPageData.seo.robots,
  openGraph: hogarPageData.openGraph,
};

export default function HogarPage() {
  const sections = hogarPageData.sections
    .map((sectionId) =>
      hogarSectionsData.find(
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
