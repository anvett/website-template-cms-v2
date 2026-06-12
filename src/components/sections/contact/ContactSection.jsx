"use client";

import { InfoForm } from "./variants/info-form/InfoForm";
import { InfoOnly } from "./variants/info-only/InfoOnly";

export function ContactSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "info-form":
      return <InfoForm data={data} />;

    case "info-only":
    default:
      return <InfoOnly data={data} />;
  }
}

export default ContactSection;