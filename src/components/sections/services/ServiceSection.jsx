"use client";

import { ServicesGrid } from "./variants/services-grid/ServicesGrid";
import { ServicesCardsWithIcons } from "./variants/cards-with-icons/ServicesCardsWithIcons";
import { ServicesDetailCards } from "./variants/services-detail-cards/ServicesDetailCards";

export function ServicesSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "cards-with-icons":
      return <ServicesCardsWithIcons data={data} />;

    case "services-detail-cards":
      return <ServicesDetailCards data={data} />;

    case "grid-2":
    case "grid-3":
    case "grid-4":
    default:
      return <ServicesGrid data={data} />;
  }
}

export default ServicesSection;