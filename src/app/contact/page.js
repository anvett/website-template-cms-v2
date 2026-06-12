import { contactPageData } from "@/data/pages/contact.page.data";
import { contactSectionsData } from "@/data/sections/contact.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { ContactSection } from "@/components/sections/contact";
import { CTASection } from "@/components/sections/cta";

export const metadata = {
  title: contactPageData.seo.title,
  description: contactPageData.seo.description,
  alternates: {
    canonical: contactPageData.seo.canonical,
  },
  robots: contactPageData.seo.robots,
  openGraph: contactPageData.openGraph,
};

export default function ContactPage() {
  const sections = contactPageData.sections
    .map((sectionId) =>
      contactSectionsData.find((section) => section.id === sectionId),
    )
    .filter(Boolean);

  return (
    <main>
      {sections.map((section) => {
        if (!section.enabled) return null;

        switch (section.component) {
          case "Hero":
            return <HeroSection key={section.id} data={section} />;

          case "Contact":
            return <ContactSection key={section.id} data={section} />;

          case "CTA":
            return <CTASection key={section.id} data={section} />;

          default:
            return null;
        }
      })}
    </main>
  );
}