"use client";

import { HeroBackgroundImage } from "./variants/hero-background-image/HeroBackgroundImage";
import { HeroInternal } from "./variants/hero-internal/HeroInternal";

export function HeroSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "hero-internal":
      return <HeroInternal data={data} />;

    case "background-image":
    default:
      return <HeroBackgroundImage data={data} />;
  }
}

export default HeroSection;