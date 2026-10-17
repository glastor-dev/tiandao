import { StreakData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchStreakData(username: string, token?: string): Promise<StreakData> {
  // 1. Try GraphQL if token
  if (token) {
    try {
      const query = `
        query ($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Tiandao-Metrics"
        },
        body: JSON.stringify({ query, variables: { login: username } }),
        next: { revalidate: 3600 }
      });
      if (res.ok) {
        const json = await res.json();
        const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
        if (cal) {
          const days: { date: string; count: number }[] = [];
          for (const w of cal.weeks || []) {
            for (const d of w.contributionDays || []) {
              days.push({ date: d.date, count: d.contributionCount || 0 });
            }
          }

          let currentStreak = 0;
          let longestStreak = 0;
          let tempStreak = 0;

          for (let i = 0; i < days.length; i++) {
            if (days[i].count > 0) {
              tempStreak++;
              if (tempStreak > longestStreak) longestStreak = tempStreak;
            } else {
              tempStreak = 0;
            }
          }

          // Count current streak backwards
          const lastIdx = days.length - 1;
          let startIdx = lastIdx;
          if (days[lastIdx]?.count === 0 && lastIdx > 0 && days[lastIdx - 1]?.count > 0) {
            startIdx = lastIdx - 1;
          }
          for (let i = startIdx; i >= 0; i--) {
            if (days[i].count > 0) {
              currentStreak++;
            } else {
              break;
            }
          }

          return {
            currentStreak,
            longestStreak,
            totalContributions: cal.totalContributions || 0
          };
        }
      }
    } catch {
      // Fallback to REST
    }
  }

  // 2. REST fallback
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100`, {
      headers: { "User-Agent": "Tiandao-Metrics" },
      next: { revalidate: 3600 }
    });
    if (!res.ok) return { currentStreak: 0, longestStreak: 0, totalContributions: 0 };
    const events = await res.json();
    const activeDates = new Set<string>();
    let total = 0;
    if (Array.isArray(events)) {
      for (const ev of events) {
        if (ev.created_at) {
          activeDates.add(ev.created_at.slice(0, 10));
          total++;
        }
      }
    }

    let currentStreak = 0;
    const d = new Date();
    const today = d.toISOString().slice(0, 10);
    if (!activeDates.has(today)) {
      d.setDate(d.getDate() - 1);
    }
    while (activeDates.has(d.toISOString().slice(0, 10))) {
      currentStreak++;
      d.setDate(d.getDate() - 1);
    }

    return {
      currentStreak,
      longestStreak: Math.max(currentStreak, activeDates.size),
      totalContributions: total
    };
  } catch {
    return { currentStreak: 0, longestStreak: 0, totalContributions: 0 };
  }
}

export function StreakModule({ data, ctx }: { data: StreakData; ctx: PluginContext }) {
  const { colors } = ctx;
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#f85149" style={{ marginRight: "6px" }}><path d="M8.2 1.35a.75.75 0 0 0-1.07.13L5.29 4.02a4.48 4.48 0 0 0-.89 2.57c0 .6.12 1.18.35 1.71A3.75 3.75 0 0 1 7.25 7a.75.75 0 0 0 .75-.75c0-.6.18-1.18.52-1.68l.21-.3a3.5 3.5 0 0 1 1.95 4.36 4.96 4.96 0 0 1-1.38 2.06.75.75 0 0 0 .5 1.31c2.8 0 5-2.2 5-5 0-2.3-1.4-4.2-3.4-4.8a5.5 5.5 0 0 0-2.2-.85l-.2-.05Z"></path><path d="M5.5 8.75a2.5 2.5 0 0 0-2.5 2.5c0 1.25.9 2.27 2.1 2.46.22.04.45.04.67 0 1.2-.19 2.1-1.21 2.1-2.46a2.5 2.5 0 0 0-2.37-2.5Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#f85149" }}>GitHub Commit Streaks</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", width: "100%", marginTop: "4px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: colors.muted, marginBottom: "4px" }}>🔥 Current Streak</span>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.text }}>{data.currentStreak} <span style={{ fontSize: "12px", color: colors.muted }}>days</span></span>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: colors.muted, marginBottom: "4px" }}>⚡ Longest Streak</span>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.accent }}>{data.longestStreak} <span style={{ fontSize: "12px", color: colors.muted }}>days</span></span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: colors.muted, marginBottom: "4px" }}>📈 Total Activity</span>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.green }}>{data.totalContributions}</span>
        </div>
      </div>
    </div>
  );
}
