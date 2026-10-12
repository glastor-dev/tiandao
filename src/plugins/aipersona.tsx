import { AiPersonaData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchAiPersonaData(username: string, languages: { name: string }[], stars: number) {
  const apiKey = process.env.GEMINI_API_KEY;
  const topLangs = languages.slice(0, 3).map((l: { name: string }) => l.name).join(", ");
  
  if (!apiKey) {
    // Mocked data if no API key is provided
    return {
      persona: `Level 42 ${topLangs.split(",")[0] || "Code"} Mage. Known for pushing chaotic commits at 3 AM and collecting ${stars} stars along the journey.`
    };
  }

  try {
    const prompt = `You are a gaming profile generator. Based on this GitHub user's stats: Username: ${username}, Top Languages: ${topLangs}, Total Stars: ${stars}. Create a 2-sentence RPG developer persona in English. Example: 'Level 42 TypeScript Paladin. Known for pushing chaotic commits at 3 AM.' Make it fun, epic, and exactly 2 sentences. No intro/outro text.`;
    
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      next: { revalidate: 86400 } // Cache this response for a day to save API limits
    });
    
    if (!res.ok) throw new Error("API Error");
    const data = await res.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unknown Wanderer.";
    
    return { persona: generatedText.replace(/\n/g, " ").trim() };
  } catch {
    return { persona: "Mysterious Developer. The AI could not scry their true nature." };
  }
}

export function AiPersonaModule({ data, ctx }: { data: AiPersonaData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#a78bfa" style={{ marginRight: "6px" }}><path d="M12.92 1.343a1.75 1.75 0 0 0-2.474 0l-1.39 1.389a.75.75 0 0 0 1.06 1.061l1.39-1.389a.25.25 0 0 1 .354 0l1.414 1.414a.25.25 0 0 1 0 .354L5.688 11.757l.001-.001-4.343 4.343a1.75 1.75 0 0 0 2.475 2.475l4.343-4.343h-.001l7.586-7.586a1.75 1.75 0 0 0 0-2.474l-2.829-2.828ZM8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#a78bfa" }}>AI Developer Persona</span>
      </div>
      
      <div style={{ display: "flex", padding: "12px", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: "rgba(139, 92, 246, 0.05)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", backgroundColor: "#a78bfa" }} />
        <span style={{ fontSize: "12px", color: colors.text, lineHeight: 1.6, fontStyle: "italic" }}>
          &ldquo;{data.persona}&rdquo;
        </span>
      </div>
    </div>
  );
}
