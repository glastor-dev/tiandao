import { StackOverflowData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchStackOverflowData(userId: string) {
  if (!userId) return null;
  try {
    const userRes = await fetch(`https://api.stackexchange.com/2.3/users/${encodeURIComponent(userId)}?site=stackoverflow`);
    if (!userRes.ok) return null;
    const userData = await userRes.json();
    const user = userData.items?.[0];
    if (!user) return null;

    const ansRes = await fetch(`https://api.stackexchange.com/2.3/users/${encodeURIComponent(userId)}/answers?order=desc&sort=votes&site=stackoverflow&pagesize=2&filter=withbody`);
    const ansData = ansRes.ok ? await ansRes.json() : { items: [] };

    return {
      reputation: user.reputation || 0,
      badges: user.badge_counts || { gold: 0, silver: 0, bronze: 0 },
      answers: ansData.items || []
    };
  } catch {
    return null;
  }
}

interface AnswerItem {
  answer_id?: number;
  is_accepted?: boolean;
  score: number;
  body?: string;
  title?: string;
}

export function StackOverflowModule({ data, ctx }: { data: StackOverflowData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#f48024" style={{ marginRight: "6px" }}><path d="M10.87 13.911V9.56h1.564v5.915H.83V9.56h1.564v4.351h8.476Zm-7.794-2.883 7.37 1.554.32-1.523-7.37-1.554-.32 1.523Zm.83-2.909 6.828 3.167.652-1.406-6.828-3.166-.651 1.405Zm1.711-2.73 5.86 4.675.972-1.218-5.86-4.675-.972 1.218Zm2.62-2.316 4.39 6.015 1.261-.921-4.39-6.015-1.26.921ZM2.997 12.35h7.534v-1.564H2.997v1.564Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#f48024" }}>Stack Overflow</span>
      </div>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
        <div style={{ display: "flex", width: "45%", fontSize: "11px", color: colors.muted }}>
          <span style={{ marginRight: "4px" }}>✳️</span> {data.reputation.toLocaleString()} reputation
        </div>
        <div style={{ display: "flex", width: "45%", fontSize: "11px", color: colors.muted }}>
          <span style={{ marginRight: "4px" }}>🥇</span> {data.badges.gold} gold
        </div>
        <div style={{ display: "flex", width: "45%", fontSize: "11px", color: colors.muted }}>
          <span style={{ marginRight: "4px" }}>🥈</span> {data.badges.silver} silver
        </div>
        <div style={{ display: "flex", width: "45%", fontSize: "11px", color: colors.muted }}>
          <span style={{ marginRight: "4px" }}>🥉</span> {data.badges.bronze} bronze
        </div>
      </div>
      
      <span style={{ fontSize: "12px", fontWeight: "bold", color: colors.accent, marginBottom: "8px" }}>▼ Top answers</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {(data.answers as AnswerItem[]).map((ans: AnswerItem, idx: number) => (
          <div key={ans.answer_id ?? idx} style={{ display: "flex", flexDirection: "column", paddingLeft: "10px", borderLeft: `2px solid ${ans.is_accepted ? colors.green : colors.border}` }}>
            <span style={{ fontSize: "11px", color: colors.text, fontWeight: "bold", marginBottom: "4px" }}>Score: {ans.score}</span>
            <div style={{ fontSize: "10px", color: colors.muted, display: "-webkit-box", overflow: "hidden", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
              {(ans.body || ans.title || "").replace(/<[^>]*>?/gm, '').substring(0, 100)}...
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
