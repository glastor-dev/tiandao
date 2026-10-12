import { LeetCodeData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchLeetCodeData(username: string) {
  if (!username) return null;
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(username)}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === "error") return null;
    return data;
  } catch {
    return null;
  }
}

export function LeetCodeModule({ data, ctx }: { data: LeetCodeData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#ffa116" style={{ marginRight: "6px" }}><path d="M12.213 6.942l-7.39 4.316a1.272 1.272 0 0 1-1.282-.016 1.263 1.263 0 0 1-.624-1.107V1.507c0-.448.24-.86.624-1.107a1.272 1.272 0 0 1 1.282-.016l7.39 4.316a1.267 1.267 0 0 1 0 2.242z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#ffa116" }}>LeetCode Stats</span>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.text }}>{data.totalSolved}</span>
          <span style={{ fontSize: "10px", color: colors.muted }}>Problems Solved</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>Rank {data.ranking.toLocaleString()}</span>
          <span style={{ fontSize: "10px", color: colors.muted }}>Global Ranking</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {/* Easy */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <span style={{ width: "45px", fontSize: "10px", color: "#00b8a3" }}>Easy</span>
          <div style={{ flex: 1, height: "6px", backgroundColor: colors.border, borderRadius: "3px", overflow: "hidden", margin: "0 8px" }}>
            <div style={{ height: "100%", width: `${(data.easySolved / data.totalEasy) * 100}%`, backgroundColor: "#00b8a3" }} />
          </div>
          <span style={{ width: "40px", fontSize: "10px", color: colors.text, textAlign: "right" }}>{data.easySolved}/{data.totalEasy}</span>
        </div>
        
        {/* Medium */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <span style={{ width: "45px", fontSize: "10px", color: "#ffc01e" }}>Medium</span>
          <div style={{ flex: 1, height: "6px", backgroundColor: colors.border, borderRadius: "3px", overflow: "hidden", margin: "0 8px" }}>
            <div style={{ height: "100%", width: `${(data.mediumSolved / data.totalMedium) * 100}%`, backgroundColor: "#ffc01e" }} />
          </div>
          <span style={{ width: "40px", fontSize: "10px", color: colors.text, textAlign: "right" }}>{data.mediumSolved}/{data.totalMedium}</span>
        </div>

        {/* Hard */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <span style={{ width: "45px", fontSize: "10px", color: "#ff375f" }}>Hard</span>
          <div style={{ flex: 1, height: "6px", backgroundColor: colors.border, borderRadius: "3px", overflow: "hidden", margin: "0 8px" }}>
            <div style={{ height: "100%", width: `${(data.hardSolved / data.totalHard) * 100}%`, backgroundColor: "#ff375f" }} />
          </div>
          <span style={{ width: "40px", fontSize: "10px", color: colors.text, textAlign: "right" }}>{data.hardSolved}/{data.totalHard}</span>
        </div>
      </div>
    </div>
  );
}
