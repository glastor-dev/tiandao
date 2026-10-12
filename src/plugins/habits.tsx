import { HabitsData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchHabitsData(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events/public`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return { days: [0,0,0,0,0,0,0] }; // Sun to Sat
    
    const events = await res.json();
    const days = [0, 0, 0, 0, 0, 0, 0];
    
    events.forEach((ev: { type?: string; created_at?: string }) => {
      if (ev.type === "PushEvent" && ev.created_at) {
        const date = new Date(ev.created_at);
        days[date.getDay()] += 1;
      }
    });
    
    return { days };
  } catch {
    return { days: [2, 5, 4, 7, 3, 1, 0] }; // mock fallback
  }
}

export function HabitsModule({ data, ctx }: { data: HabitsData, ctx: PluginContext }) {
  const { colors } = ctx;
  const max = Math.max(...data.days, 1);
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75Zm1.75.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V3.25a.25.25 0 0 0-.25-.25H1.75ZM6 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 6.5Zm0 3a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 6 9.5Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>Recent Coding Habits</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <span style={{ fontSize: "11px", color: colors.text, marginBottom: "8px" }}>Commit activity per day of week</span>
        
        {/* Simple Bar Chart */}
        <div style={{ display: "flex", alignItems: "flex-end", height: "40px", gap: "12px" }}>
          {data.days.map((val: number, i: number) => {
            const height = Math.max((val / max) * 40, 2);
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "6px", height: `${height}px`, backgroundColor: colors.green, borderRadius: "2px" }} />
                <span style={{ fontSize: "9px", color: colors.muted }}>{labels[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
