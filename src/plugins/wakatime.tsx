import { WakatimeData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchWakatimeData(username: string) {
  if (!username) return null;
  try {
    const res = await fetch(`https://wakatime.com/api/v1/users/${encodeURIComponent(username)}/stats/last_7_days`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

interface WakaItem {
  name: string;
  text?: string;
  percent?: number;
}

export function WakatimeModule({ data, ctx }: { data: WakatimeData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data) return null;

  const langs = (data.languages?.slice(0, 4) || []) as WakaItem[];
  const editors = (data.editors?.slice(0, 2) || []) as WakaItem[];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#007bff" style={{ marginRight: "6px" }}><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7.25-3.25v2.92l2.28 2.28a.75.75 0 0 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1-.22-.53V4.75a.75.75 0 0 1 1.5 0Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#007bff" }}>WakaTime Activity</span>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "12px" }}>
        <span style={{ fontSize: "11px", color: colors.muted, marginBottom: "2px" }}>Last 7 days total</span>
        <span style={{ fontSize: "16px", fontWeight: "bold", color: colors.text }}>{data.human_readable_total_including_other_language}</span>
      </div>
      
      <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: colors.accent, marginBottom: "6px" }}>Languages</span>
          {langs.map((l: WakaItem) => (
            <div key={l.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
              <span style={{ color: colors.text }}>{l.name}</span>
              <span style={{ color: colors.muted }}>{l.text || ""}</span>
            </div>
          ))}
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <span style={{ fontSize: "12px", fontWeight: "bold", color: colors.accent, marginBottom: "6px" }}>Editors</span>
          {editors.map((ed: WakaItem) => (
            <div key={ed.name} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
              <span style={{ color: colors.text }}>{ed.name}</span>
              <span style={{ color: colors.muted }}>{ed.text || ""}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
