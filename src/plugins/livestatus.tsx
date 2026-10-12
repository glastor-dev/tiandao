import { LiveStatusData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchLiveStatusData(timezone: string): Promise<LiveStatusData | null> {
  if (!timezone) return null;
  try {
    const opts = { timeZone: timezone, hour: 'numeric', minute: 'numeric', hour12: false } as const;
    const formatter = new Intl.DateTimeFormat('en-US', opts);
    
    // Check current hour in target timezone
    const hourOpts = { timeZone: timezone, hour: 'numeric', hour12: false } as const;
    const currentHourStr = new Intl.DateTimeFormat('en-US', hourOpts).format(new Date());
    const currentHour = parseInt(currentHourStr, 10);
    
    let status: "online" | "asleep" | "away" = "away";
    if (currentHour >= 9 && currentHour < 18) {
      status = "online"; // 9 AM to 6 PM
    } else if (currentHour >= 1 && currentHour < 7) {
      status = "asleep"; // 1 AM to 7 AM
    } else {
      status = "away";
    }

    return {
      status,
      localTime: formatter.format(new Date()),
      timezone
    };
  } catch {
    return null;
  }
}

export function LiveStatusModule({ data, ctx }: { data: LiveStatusData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data) return null;

  const statusColors = {
    online: "#2ea043", // Green
    asleep: "#8b949e", // Gray
    away: "#d29922",   // Yellow
  };
  
  const statusLabels = {
    online: "Available & Coding",
    asleep: "Probably Asleep",
    away: "Away from Keyboard",
  };
  
  const statusColor = statusColors[data.status];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.text} style={{ marginRight: "6px" }}><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028 .812a.75.75 0 0 1-.557 1.392l-2.5-1A.75.75 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.text }}>Live Status</span>
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: `${statusColor}10` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: statusColor, boxShadow: `0 0 8px ${statusColor}` }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.text }}>{statusLabels[data.status]}</span>
            <span style={{ fontSize: "11px", color: colors.muted }}>{data.timezone}</span>
          </div>
        </div>
        
        <div style={{ fontSize: "20px", fontWeight: "bold", color: colors.text, fontFamily: "monospace" }}>
          {data.localTime}
        </div>
      </div>
    </div>
  );
}
