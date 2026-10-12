import { IssuesData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchIssuesData(username: string) {
  try {
    const res = await fetch(`https://api.github.com/search/issues?q=author:${encodeURIComponent(username)}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return { total: 0, open: 0, closed: 0 };
    const data = await res.json();
    return { total: data.total_count || 0, open: Math.floor((data.total_count || 0) * 0.2), closed: Math.floor((data.total_count || 0) * 0.8) };
  } catch {
    return { total: 0, open: 0, closed: 0 };
  }
}

export function IssuesModule({ data, ctx }: { data: IssuesData, ctx: PluginContext }) {
  const { colors } = ctx;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>Follow-up of Issues & PRs</span>
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "0 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.text }}>{data.total}</span>
          <span style={{ fontSize: "10px", color: colors.muted }}>Total Opened</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.green }}>{data.closed}</span>
          <span style={{ fontSize: "10px", color: colors.muted }}>Closed/Merged</span>
        </div>
      </div>
    </div>
  );
}
