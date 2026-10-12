import { SponsorsData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchSponsorsData(_username: string) {
  if (!_username) return null;
  // Demo data for Premium Showcase
  return {
    totalSponsors: 14,
    monthlyIncome: "$320",
    sponsors: [
      { id: 1, avatar: "https://avatars.githubusercontent.com/u/1?v=4" },
      { id: 2, avatar: "https://avatars.githubusercontent.com/u/2?v=4" },
      { id: 3, avatar: "https://avatars.githubusercontent.com/u/3?v=4" },
      { id: 4, avatar: "https://avatars.githubusercontent.com/u/4?v=4" },
      { id: 5, avatar: "https://avatars.githubusercontent.com/u/5?v=4" },
      { id: 6, avatar: "https://avatars.githubusercontent.com/u/6?v=4" },
    ]
  };
}

export function SponsorsModule({ data, ctx }: { data: SponsorsData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#ea4aaa" style={{ marginRight: "6px" }}><path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 0 0 8 13.393a20.561 20.561 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#ea4aaa" }}>GitHub Sponsors (Premium)</span>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: "rgba(234, 74, 170, 0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.text }}>{data.totalSponsors}</span>
          <span style={{ fontSize: "12px", color: colors.muted }}>Sponsors</span>
          <span style={{ fontSize: "12px", color: colors.border, margin: "0 8px" }}>|</span>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#2ea043" }}>{data.monthlyIncome}</span>
          <span style={{ fontSize: "12px", color: colors.muted }}>/ month</span>
        </div>
        
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
          {data.sponsors.map((s: { id?: number; avatar?: string; avatarUrl?: string }) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={s.id} src={s.avatar || s.avatarUrl || ""} width={32} height={32} style={{ borderRadius: "50%", border: `2px solid ${colors.border}`, display: "block" }} alt="Sponsor" />
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", backgroundColor: colors.border, color: colors.text, fontSize: "10px", fontWeight: "bold" }}>
            +{data.totalSponsors - data.sponsors.length}
          </div>
        </div>
      </div>
    </div>
  );
}
