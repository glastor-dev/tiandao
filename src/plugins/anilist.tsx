import { AnilistData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchAnilistData(username: string) {
  if (!username) return null;
  try {
    const query = `
      query ($name: String) {
        User(name: $name) {
          statistics {
            anime { minutesWatched }
          }
          favourites {
            anime(page: 1, perPage: 2) {
              nodes {
                id
                title { romaji }
                coverImage { medium }
                startDate { year }
              }
            }
          }
        }
      }
    `;
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ query, variables: { name: username } }),
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.User || null;
  } catch {
    return null;
  }
}

interface AnimeNode {
  id: number;
  title: { romaji: string };
  coverImage: { medium: string };
  startDate?: { year?: number };
}

export function AnilistModule({ data, ctx }: { data: AnilistData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data) return null;

  const minutes = data.statistics?.anime?.minutesWatched || 0;
  const hours = Math.round(minutes / 60);
  const favorites = (data.favourites?.anime?.nodes || []) as unknown as AnimeNode[];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#e85d75" style={{ marginRight: "6px" }}><path d="M4.75 2.5a.75.75 0 0 0-.75.75v9.5c0 .414.336.75.75.75h6.5a.75.75 0 0 0 .75-.75v-9.5a.75.75 0 0 0-.75-.75h-6.5Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#e85d75" }}>Anilist watch list</span>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "12px", fontWeight: "bold", color: colors.text, marginBottom: "8px" }}>▼ Favorites anime</span>
        <div style={{ display: "flex", alignItems: "center", fontSize: "11px", color: colors.muted, marginBottom: "12px" }}>
          <span>🎥 {hours} hours watched</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {favorites.map((anime: AnimeNode) => (
            <div key={anime.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={anime.coverImage.medium} width="40" height="55" style={{ borderRadius: "4px", objectFit: "cover" }} alt={anime.title.romaji} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "12px", fontWeight: "bold", color: colors.accent, maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{anime.title.romaji}</span>
                <span style={{ fontSize: "10px", color: colors.muted }}>📺 Anime • 📅 {anime.startDate?.year || "N/A"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
