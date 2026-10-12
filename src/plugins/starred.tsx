import { Repository, StarredData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchStarredData(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/starred?per_page=3`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return { repos: [] };
    const repos = await res.json();
    return { repos: Array.isArray(repos) ? repos : [] };
  } catch {
    return { repos: [] };
  }
}

export function StarredModule({ data, ctx }: { data: StarredData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data.repos || data.repos.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>Recently Starred Repositories</span>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
        {data.repos.map((repo: Repository) => (
          <div key={repo.id} style={{ display: "flex", flexDirection: "column", padding: "8px", border: `1px solid ${colors.border}`, borderRadius: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill={colors.muted} style={{ marginRight: "6px" }}><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"></path></svg>
              <span style={{ fontSize: "12px", fontWeight: "bold", color: colors.accent }}>{repo.full_name}</span>
            </div>
            <span style={{ fontSize: "10px", color: colors.muted, marginBottom: "6px" }}>{repo.description ? repo.description.substring(0, 70) + (repo.description.length > 70 ? '...' : '') : "No description"}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "10px", color: colors.muted }}>
              {repo.language && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: colors.accent, marginRight: "4px" }} />
                  {repo.language}
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center" }}>⭐ {repo.stargazers_count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
