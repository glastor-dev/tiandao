import { LicensesData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchLicensesData(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return { licenses: [], total: 0 };
    const repos = await res.json();
    if (!Array.isArray(repos)) return { licenses: [], total: 0 };
    
    const licCounts: Record<string, number> = {};
    let total = 0;
    
    for (const repo of repos) {
      if (repo.license && repo.license.spdx_id && repo.license.spdx_id !== "NOASSERTION") {
        const lic = repo.license.spdx_id;
        licCounts[lic] = (licCounts[lic] || 0) + 1;
        total++;
      }
    }
    
    const sorted = Object.entries(licCounts)
      .sort((a, b) => b[1] - a[1])
      .map(entry => ({ name: entry[0], count: entry[1], percent: Math.round((entry[1] / total) * 100) }));
      
    return { licenses: sorted, total };
  } catch {
    return { licenses: [], total: 0 };
  }
}

export function LicensesModule({ data, ctx }: { data: LicensesData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data.licenses || data.licenses.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M8.75.75V2h-1.5V.75a.75.75 0 0 1 1.5 0ZM6 2.75A2.75 2.75 0 0 1 8.75 0h-1.5v2h-1.5v-.75a.75.75 0 0 1 1.5 0h1.5A2.75 2.75 0 0 1 6 2.75Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>Repository Licenses</span>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {/* Progress bar */}
        <div style={{ display: "flex", width: "100%", height: "6px", borderRadius: "3px", overflow: "hidden", marginBottom: "8px" }}>
          {data.licenses.map((lic: { name: string; percent: number }, i: number) => {
             const color = i === 0 ? colors.green : i === 1 ? colors.accent : colors.muted;
             return <div key={lic.name} style={{ height: "100%", width: `${lic.percent}%`, backgroundColor: color }} />
          })}
        </div>

        {/* License Grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {data.licenses.map((lic: { name: string; percent: number }, i: number) => {
            const color = i === 0 ? colors.green : i === 1 ? colors.accent : colors.muted;
            return (
              <div key={lic.name} style={{ display: "flex", alignItems: "center", width: "45%" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: color, marginRight: "6px" }} />
                <span style={{ fontSize: "11px", color: colors.text }}>{lic.name}</span>
                <span style={{ fontSize: "11px", color: colors.muted, marginLeft: "auto" }}>{lic.percent}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
