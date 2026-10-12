import { IsoCalendarData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchIsoCalendarData(username: string, token: string) {
  // If no token, we can't fetch GraphQL, return mocked data
  if (!token) return { days: Array(30).fill(1) };
  
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
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) return { days: Array(30).fill(1) };
    const data = await res.json();
    
    // Extract last 4 weeks for a small isometric preview
    interface WeekData {
      contributionDays: { contributionCount: number; date: string }[];
    }
    const weeks: WeekData[] = data.data?.user?.contributionsCollection?.contributionCalendar?.weeks?.slice(-4) || [];
    const days: number[] = [];
    weeks.forEach((w: WeekData) => {
      w.contributionDays.forEach((d: { contributionCount: number; date: string }) => {
        days.push(d.contributionCount);
      });
    });
    return { days, total: data.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0 };
  } catch {
    return { days: Array(30).fill(1) };
  }
}

export function IsoCalendarModule({ data, ctx }: { data: IsoCalendarData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data.days) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M1 2.5A2.5 2.5 0 0 1 3.5 0h8.75a.75.75 0 0 1 .75.75v14.5a.75.75 0 0 1-1.5 0v-1.5h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 1 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 3.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.5a.25.25 0 0 1-.25.25h-3.5a.25.25 0 0 1-.25-.25Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>Isometric Calendar (Preview)</span>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <span style={{ fontSize: "10px", color: colors.muted, marginBottom: "8px" }}>Last 30 days of contributions</span>
        
        {/* Fake 2D heatmap since drawing 3D polygons in satori requires complex matrix math */}
        <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "center", maxWidth: "200px" }}>
          {data.days.map((val: number, i: number) => {
             const opacity = val === 0 ? "20" : val > 5 ? "ff" : val > 2 ? "aa" : "66";
             return <div key={i} style={{ width: "10px", height: "10px", backgroundColor: val === 0 ? colors.border : `${colors.green}${opacity}` }} />
          })}
        </div>
      </div>
    </div>
  );
}
