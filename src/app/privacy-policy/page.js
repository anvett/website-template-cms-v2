import { privacyPolicyPageData } from "@/data/pages/privacy-policy.page.data";
import { privacyPolicySectionsData } from "@/data/sections/privacy-policy.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { LegalSection } from "@/components/sections/legal";
import { ContactSection } from "@/components/sections/contact";

export const metadata = {
  title: privacyPolicyPageData.seo.title,
  description: privacyPolicyPageData.seo.description,
  alternates: {
    canonical: privacyPolicyPageData.seo.canonical,
  },
  robots: privacyPolicyPageData.seo.robots,
  openGraph: privacyPolicyPageData.openGraph,
};

export default function PrivacyPolicyPage() {
  const sections = privacyPolicyPageData.sections
    .map((sectionId) =>
      privacyPolicySectionsData.find((section) => section.id === sectionId),
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