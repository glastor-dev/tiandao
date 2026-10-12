import { StargazersData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchStargazersData(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return { stars: 0, forks: 0 };
    
    const repos = await res.json();
    if (!Array.isArray(repos)) return { stars: 0, forks: 0 };
    let stars = 0;
    let forks = 0;
    
    for (const repo of repos) {
      stars += repo.stargazers_count || 0;
      forks += repo.forks_count || 0;
    }
    
    return { stars, forks };
  } catch {
    return { stars: 0, forks: 0 };
  }
}

export function StargazersModule({ data, ctx }: { data: StargazersData, ctx: PluginContext }) {
  const { colors } = ctx;
  
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>Stargazers & Forks</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", width: "100%", marginTop: "8px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: colors.muted, marginBottom: "4px" }}>Total Stargazers</span>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.text }}>{data.stars}</span>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: colors.muted, marginBottom: "4px" }}>Total Forks</span>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.text }}>{data.forks}</span>
        </div>
      </div>
    </div>
  );
}
