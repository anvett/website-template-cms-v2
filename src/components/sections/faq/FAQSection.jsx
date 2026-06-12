"use client";

import { CategorizedFAQ } from "./variants/categorized-faq/CategorizedFAQ";

export function FAQSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "categorized-faq":
    default:
      return <CategorizedFAQ data={data} />;
  }
}

export default FAQSection;