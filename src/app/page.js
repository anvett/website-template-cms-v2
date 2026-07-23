import { homePageData } from "@/data/pages/home.page.data";
import { homeSectionsData } from "@/data/sections/home.sections.data";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services/ServiceSection";
import { DualContentSection } from "@/components/sections/dual-content";
import { FeaturesSection } from "@/components/sections/features";
import { StatsSection } from "@/components/sections/stats";
import { PartnersSection } from "@/components/sections/partners";
import { CTASection } from "@/components/sections/cta";

import { HeroSection } from "@/components/sections/hero";


export default function HomePage() {
  const sections = homePageData.sections
    .map((sectionId) =>
      homeSectionsData.find((section) => section.id === sectionId),
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
          case "DualContent":
            return <DualContentSection key={section.id} data={section} />;
          case "Features":
            return <FeaturesSection key={section.id} data={section} />;
          case "Stats":
            return <StatsSection key={section.id} data={section} />;
          case "Partners":
            return <PartnersSection key={section.id} data={section} />;
          case "CTA":
            return <CTASection key={section.id} data={section} />;

          default:
            return (
              <div key={section.id} style={{ padding: "100px 20px" }}>
                {section.id} (pendiente)
              </div>
            );
        }
      })}
    </main>
  );
}
