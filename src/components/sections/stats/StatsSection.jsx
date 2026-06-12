"use client";

import { StatsGrid } from "./variants/stats-grid/StatsGrid";
import { StatsSplitHighlight } from "./variants/split-highlight/StatsSplitHighlight";

export function StatsSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "split-highlight":
      return <StatsSplitHighlight data={data} />;

    case "3-items":
    case "4-items":
    default:
      return <StatsGrid data={data} />;
  }
}

export default StatsSection;