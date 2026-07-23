"use client";

import { PartnersLogoGrid } from "./variants/logo-grid/PartnersLogoGrid";

export function PartnersSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "logo-grid":
    default:
      return <PartnersLogoGrid data={data} />;
  }
}

export default PartnersSection;
