import { aboutUsPageData } from "@/data/pages/about-us.page.data";
import { aboutUsSectionsData } from "@/data/sections/about-us.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ComparisonSection } from "@/components/sections/comparison";
import { ServicesSection } from "@/components/sections/services";

import { FeaturesSection } from "@/components/sections/features";
import { StatsSection } from "@/components/sections/stats";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { TeamSection } from "@/components/sections/team";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export default function AboutUsPage() {
  const sections = aboutUsPageData.sections
    .map((sectionId) =>
      aboutUsSectionsData.find((section) => section.id === sectionId),
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

          case "Comparison":
            return <ComparisonSection key={section.id} data={section} />;

          case "Features":
            return <FeaturesSection key={section.id} data={section} />;

          case "Services":
            return <ServicesSection key={section.id} data={section} />;

          case "Stats":
            return <StatsSection key={section.id} data={section} />;

          case "Testimonials":
            return <TestimonialsSection key={section.id} data={section} />;

          case "Team":
            return <TeamSection key={section.id} data={section} />;

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
