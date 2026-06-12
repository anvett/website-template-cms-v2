import { faqPageData } from "@/data/pages/faq.page.data";
import { faqSectionsData } from "@/data/sections/faq.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { FAQSection } from "@/components/sections/faq";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export const metadata = {
  title: faqPageData.seo.title,
  description: faqPageData.seo.description,
  keywords: faqPageData.seo.keywords,
  openGraph: {
    title: faqPageData.openGraph.title,
    description: faqPageData.openGraph.description,
    images: faqPageData.openGraph.images,
  },
};

export default function FAQPage() {
  const sections = faqPageData.sections
    .map((sectionId) =>
      faqSectionsData.find((section) => section.id === sectionId),
    )
    .filter(Boolean);

  return (
    <main>
      {sections.map((section) => {
        if (!section.enabled) return null;

        switch (section.component) {
          case "Hero":
            return <HeroSection key={section.id} data={section} />;

          case "FAQ":
            return <FAQSection key={section.id} data={section} />;

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