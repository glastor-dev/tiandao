import { TopicsData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchTopicsData(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return { topics: [] };
    const repos = await res.json();
    if (!Array.isArray(repos)) return { topics: [] };
    
    const topicCounts: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.topics) {
        for (const topic of repo.topics) {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        }
      }
    }
    
    // Sort topics by frequency
    const sorted = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(entry => entry[0]);
      
    return { topics: sorted };
  } catch {
    return { topics: [] };
  }
}

export function TopicsModule({ data, ctx }: { data: TopicsData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data.topics || data.topics.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M7.177 1.054a.75.75 0 0 1 .45-.296l5.772-.888a.75.75 0 0 1 .846.846l-.888 5.772a.75.75 0 0 1-.296.45L4.856 15.143a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 0-1.06L7.177 1.054Zm1.543 5.378a1.5 1.5 0 1 0-2.121-2.121 1.5 1.5 0 0 0 2.121 2.121Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>Starred Topics</span>
      </div>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px", justifyContent: "center" }}>
        {data.topics.map((topic: string) => (
          <div key={topic} style={{ display: "flex", padding: "4px 8px", backgroundColor: `${colors.accent}20`, border: `1px solid ${colors.accent}40`, borderRadius: "12px", fontSize: "10px", color: colors.accent, fontWeight: "bold" }}>
            {topic}
          </div>
        ))}
      </div>
    </div>
  );
}
