"use client";

import { TeamMemberGrid } from "./variants/member-grid/TeamMemberGrid";

export function TeamSection({ data }) {
  if (!data || !data.enabled) return null;

  switch (data.variant) {
    case "member-grid":
    default:
      return <TeamMemberGrid data={data} />;
  }
}

export default TeamSection;
