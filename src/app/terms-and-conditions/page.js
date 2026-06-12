import { termsAndConditionsPageData } from "@/data/pages/terms-and-conditions.page.data";
import { termsAndConditionsSectionsData } from "@/data/sections/terms-and-conditions-sections.data";

import { HeroSection } from "@/components/sections/hero";
import { LegalSection } from "@/components/sections/legal";
import { ContactSection } from "@/components/sections/contact";

export const metadata = {
  title: termsAndConditionsPageData.seo.title,
  description: termsAndConditionsPageData.seo.description,
  alternates: {
    canonical: termsAndConditionsPageData.seo.canonical,
  },
  robots: termsAndConditionsPageData.seo.robots,
  openGraph: termsAndConditionsPageData.openGraph,
};

export default function TermsAndConditionsPage() {
  const sections = termsAndConditionsPageData.sections
    .map((sectionId) =>
      termsAndConditionsSectionsData.find(
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

          case "Legal":
            return <LegalSection key={section.id} data={section} />;

          case "Contact":
            return <ContactSection key={section.id} data={section} />;

          default:
            return null;
        }
      })}
    </main>
  );
}