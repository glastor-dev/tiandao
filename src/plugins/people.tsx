import { PeopleData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchPeopleData(username: string, token?: string) {
  try {
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Fetch user for total followers count
    const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers, next: { revalidate: 3600 } });
    const user = await userRes.json();
    const totalFollowers = user.followers || 0;

    // Fetch up to 14 followers for the avatars
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/followers?per_page=14`, { headers, next: { revalidate: 3600 } });
    if (!res.ok) return { followers: [], total: totalFollowers };
    const followers = await res.json();
    if (!Array.isArray(followers)) return { followers: [], total: totalFollowers };
    
    // Satori (next/og) often struggles with external image URLs. We fetch them here and convert to Base64!
    interface RawFollower {
      id?: number;
      login: string;
      avatar_url: string;
    }
    const followersWithBase64 = await Promise.all(
      followers.map(async (f: RawFollower) => {
        try {
          const imgRes = await fetch(f.avatar_url);
          const arrayBuffer = await imgRes.arrayBuffer();
          // Edge-compatible base64 conversion
          const base64 = btoa(
            new Uint8Array(arrayBuffer)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          return { ...f, avatar_url: `data:image/jpeg;base64,${base64}` };
        } catch {
          return f; // fallback to URL if fetch fails
        }
      })
    );

    return { followers: followersWithBase64, total: totalFollowers };
  } catch {
    return { followers: [], total: 0 };
  }
}

export function PeopleModule({ data, ctx }: { data: PeopleData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data.followers || data.followers.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a.75.75 0 1 0 0 1.5 1.5 1.5 0 0 1 .666 2.844.75.75 0 0 0-.416.672v.352a.75.75 0 0 0 .574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 1 0 1.434-.44 5.01 5.01 0 0 0-3.424-3.474 3.0 3.0 0 0 0-1.356-4.556Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>People plugin</span>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <span style={{ fontSize: "12px", fontWeight: "bold", color: colors.text, marginBottom: "8px" }}>▼ Related to a user</span>
        
        <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: colors.accent, marginBottom: "12px" }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5Z"></path></svg>
          <span>{data.total} followers</span>
        </div>

        {/* Avatars Grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {data.followers.map((f: { id?: number; login: string; avatar_url?: string; avatarUrl?: string }) => (
             /* eslint-disable-next-line @next/next/no-img-element */
            <img key={f.id || f.login} src={f.avatar_url || f.avatarUrl || ""} width={24} height={24} style={{ borderRadius: "50%", border: `1px solid ${colors.border}`, display: "block" }} alt={f.login} />
          ))}
        </div>
      </div>
    </div>
  );
}
