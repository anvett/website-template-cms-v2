import { vidaPageData } from "@/data/pages/vida.page.data";
import { vidaSectionsData } from "@/data/sections/vida.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";
import { ServicesSection } from "@/components/sections/services";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export const metadata = {
  title: vidaPageData.seo.title,
  description: vidaPageData.seo.description,
  alternates: {
    canonical: vidaPageData.seo.canonical,
  },
  robots: vidaPageData.seo.robots,
  openGraph: vidaPageData.openGraph,
};

export default function VidaPage() {
  const sections = vidaPageData.sections
    .map((sectionId) =>
      vidaSectionsData.find((section) => section.id === sectionId),
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
