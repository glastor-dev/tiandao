import { AiMoodData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchAiMoodData(username: string, totalStars: number, repos?: unknown[]): Promise<AiMoodData | null> {
  void repos;
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    // Mock
    return {
      mood: "Zen Coder. Reflecting on architectural patterns.",
      color: "#3b82f6",
      emoji: "🧘‍♂️"
    };
  }

  try {
    const prompt = `You are a developer psychology analyzer. Based on this GitHub user: Username: ${username}, Stars: ${totalStars}. Describe their current coding "mood" or vibe in exactly one short, fun sentence. Also provide a hex color and a single emoji representing the mood. Reply ONLY in strict JSON format: {"mood": "string", "color": "#hex", "emoji": "emoji"}. Example: {"mood": "Refactor Maniac. Destroying legacy code today.", "color": "#ef4444", "emoji": "🔥"}`;
    
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      next: { revalidate: 3600 } 
    });
    
    if (!res.ok) throw new Error("API Error");
    const data = await res.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const result = JSON.parse(text);
    return {
      mood: result.mood || "Zen Coder.",
      color: result.color || "#3b82f6",
      emoji: result.emoji || "🧘‍♂️"
    };
  } catch {
    return { mood: "Mysterious. Vibes are hidden.", color: "#8b949e", emoji: "🕵️" };
  }
}

export function AiMoodModule({ data, ctx }: { data: AiMoodData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill={data.color} style={{ marginRight: "6px" }}><path d="M10.68 11.714c.241-.296.69-.328.985-.088a2 2 0 0 1-.355 3.197 4.195 4.195 0 0 1-3.238.257 4.186 4.186 0 0 1-2.222-1.897 4.187 4.187 0 0 1-.41-3.196.75.75 0 1 1 1.41.517 2.687 2.687 0 0 0 .262 2.05 2.685 2.685 0 0 0 1.425 1.217 2.695 2.695 0 0 0 2.077-.165 2.001 2.001 0 0 0 .16-.976.75.75 0 0 1-.094-.914ZM5.25 5.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm7.5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: data.color }}>AI Developer Mood</span>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: `${data.color}10` }}>
        <span style={{ fontSize: "28px" }}>{data.emoji}</span>
        <span style={{ fontSize: "13px", color: colors.text, fontStyle: "italic" }}>
          {data.mood}
        </span>
      </div>
    </div>
  );
}
