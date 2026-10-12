import { YoutubeData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchYoutubeData(handle: string) {
  if (!handle) return null;
  
  // Clean handle if it starts with @
  const cleanHandle = handle.startsWith("@") ? handle.substring(1) : handle;
  
  try {
    // 1. Scrape the YouTube page to find the underlying Channel ID (UC...)
    const htmlRes = await fetch(`https://www.youtube.com/@${encodeURIComponent(cleanHandle)}`, { next: { revalidate: 86400 } });
    if (!htmlRes.ok) return null;
    const html = await htmlRes.text();
    
    const match = html.match(/"externalId":"(UC[^"]+)"/);
    const channelId = match ? match[1] : null;
    
    if (!channelId) return null;
    
    // 2. Use the free rss2json API to fetch the channel's XML feed
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const apiRes = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`, { next: { revalidate: 3600 } });
    
    if (!apiRes.ok) return null;
    const data = await apiRes.json();
    
    if (data.status !== "ok") return null;

    interface RawVideo {
      title: string;
      thumbnail: string;
      link?: string;
      pubDate?: string;
    }

    // We will convert image thumbnails to base64 so Satori doesn't crash drawing them
    const videos: RawVideo[] = (data.items || []).slice(0, 2);
    
    const videosWithBase64 = await Promise.all(
      videos.map(async (v: RawVideo) => {
        try {
          const imgRes = await fetch(v.thumbnail);
          const arrayBuffer = await imgRes.arrayBuffer();
          const base64 = btoa(
            new Uint8Array(arrayBuffer).reduce((dataStr, byte) => dataStr + String.fromCharCode(byte), '')
          );
          return { ...v, thumbnail: `data:image/jpeg;base64,${base64}` };
        } catch {
          return v;
        }
      })
    );

    return {
      author: data.feed?.title || "YouTube Channel",
      videos: videosWithBase64
    };
  } catch {
    return null;
  }
}

export function YoutubeModule({ data, ctx }: { data: YoutubeData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#ff0000" style={{ marginRight: "6px" }}><path d="M15.84 4.81c-.15-1.33-1.18-2.38-2.5-2.54C11.16 2 8 2 8 2s-3.16 0-5.34.27C1.34 2.43.31 3.48.16 4.81 0 6.16 0 8 0 8s0 1.84.16 3.19c.15 1.33 1.18 2.38 2.5 2.54C4.84 14 8 14 8 14s3.16 0 5.34-.27c1.32-.16 2.35-1.21 2.5-2.54C16 9.84 16 8 16 8s0-1.84-.16-3.19zM6.5 11V5l4.5 3-4.5 3z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#ff0000" }}>{data.author || "YouTube Channel"}</span>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {data.videos.map((vid: { title: string; thumbnail: string; link?: string; pubDate?: string }, i: number) => {
          // Decode HTML entities (RSS returns them encoded)
          const title = vid.title
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
            
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "8px", borderRadius: "8px", backgroundColor: "rgba(255, 0, 0, 0.05)", width: "100%", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={vid.thumbnail} width={80} height={45} style={{ borderRadius: "4px", objectFit: "cover", border: `1px solid ${colors.border}`, display: "block", flexShrink: 0 }} alt={title} />
              <div style={{ display: "flex", flexDirection: "column", width: "320px", overflow: "hidden" }}>
                <span style={{ fontSize: "11px", fontWeight: "bold", color: colors.text, display: "-webkit-box", overflow: "hidden", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", textOverflow: "ellipsis" }}>
                  {title}
                </span>
                <span style={{ fontSize: "9px", color: colors.muted, marginTop: "4px" }}>
                  📅 {vid.pubDate ? new Date(vid.pubDate).toLocaleDateString() : "Recent"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
