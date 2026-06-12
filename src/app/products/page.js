import { productsPageData } from "@/data/pages/products.page.data";
import { productsSectionsData } from "@/data/sections/products.sections.data";

import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ComparisonSection } from "@/components/sections/comparison";
import { ProductsSection } from "@/components/sections/products";
import { FeaturesSection } from "@/components/sections/features";
import { QuoteSection } from "@/components/sections/quote";
import { CTASection } from "@/components/sections/cta";

export default function ProductsPage() {
  const sections = productsPageData.sections
    .map((sectionId) =>
      productsSectionsData.find((section) => section.id === sectionId),
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

          case "Products":
            return <ProductsSection key={section.id} data={section} />;

          case "Features":
            return <FeaturesSection key={section.id} data={section} />;

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