"use client";

import { DualContentDefault } from "./variants/default/DualContentDefault";

export function DualContentSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "default":
    default:
      return <DualContentDefault data={data} />;
  }
}

export default DualContentSection;