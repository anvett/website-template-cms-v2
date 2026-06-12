"use client";

import { ContentList } from "./variants/content-list/ContentList";

export function LegalSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "content-list":
    default:
      return <ContentList data={data} />;
  }
}

export default LegalSection;