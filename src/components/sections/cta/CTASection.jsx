"use client";

import { CTABackgroundImage } from "./variants/background-image/CTABackgroundImage";

export function CTASection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "background-image":
    case "centered":
    default:
      return <CTABackgroundImage data={data} />;
  }
}

export default CTASection;