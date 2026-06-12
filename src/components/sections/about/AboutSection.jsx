"use client";

import { AboutImageRight } from "./variants/image-right/AboutImageRight";
import { AboutStackedCentered } from "./variants/stacked-centered/AboutStackedCentered";

export function AboutSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "image-right":
      return <AboutImageRight data={data} />;

    case "stacked-centered":
    default:
      return <AboutStackedCentered data={data} />;
  }
}

export default AboutSection;