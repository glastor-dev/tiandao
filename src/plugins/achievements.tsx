import { AchievementsData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchAchievementsData(username?: string) {
  void username;
  return { achievements: ["Explorer", "Polyglot", "Night Owl"] }; // Mocked for speed
}

export function AchievementsModule({ data, ctx }: { data: AchievementsData, ctx: PluginContext }) {
  const { colors } = ctx;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>Achievements</span>
      </div>
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
        {data.achievements.map((ach: string) => (
          <div key={ach} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "60px", height: "60px", borderRadius: "50%", border: `2px solid ${colors.accent}`, backgroundColor: `${colors.accent}20` }}>
            <span style={{ fontSize: "10px", fontWeight: "bold", color: colors.text, textAlign: "center" }}>{ach}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
