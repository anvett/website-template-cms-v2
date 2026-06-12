"use client";

import { ComparisonSplit } from "./variants/comparison-split/ComparisonSplit";

export function ComparisonSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "comparison-split":
    case "split":
    default:
      return <ComparisonSplit data={data} />;
  }
}

export default ComparisonSection;