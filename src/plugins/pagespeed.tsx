import { PageSpeedData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchPageSpeedData(url: string) {
  if (!url) return null;
  try {
    const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
    const apiKey = process.env.PAGESPEED_API_KEY;
    const apiKeyParam = apiKey ? `&key=${apiKey}` : "";
    
    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(formattedUrl)}&category=performance&category=accessibility${apiKeyParam}`;
    
    // Adding timeout because PageSpeed API is notoriously slow
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const res = await fetch(api, { signal: controller.signal, next: { revalidate: 3600 } });
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      console.error("PageSpeed API failed:", await res.text());
      return { error: true, url: formattedUrl };
    }
    
    const data = await res.json();
    
    return {
      url: formattedUrl,
      performance: Math.round(data.lighthouseResult?.categories?.performance?.score * 100) || 0,
      accessibility: Math.round(data.lighthouseResult?.categories?.accessibility?.score * 100) || 0
    };
  } catch {
    return { error: true, url };
  }
}

export function PageSpeedModule({ data, ctx }: { data: PageSpeedData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data) return null;

  const getScoreColor = (score: number) => score >= 90 ? "#10b981" : score >= 50 ? "#f48024" : "#ef4444";

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="#4285F4" style={{ marginRight: "6px" }}><path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.22 8.72 5.78 7.28a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"></path></svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#4285F4" }}>Google PageSpeed</span>
      </div>
      
      <span style={{ fontSize: "11px", color: colors.text, marginBottom: "12px" }}>🔗 {data.url}</span>
      
      {data.error ? (
        <div style={{ fontSize: "10px", color: "#ef4444", textAlign: "center", padding: "8px", border: `1px solid #ef4444`, borderRadius: "4px" }}>
          ⚠️ Could not analyze this URL.
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", border: `3px solid ${getScoreColor(data.performance ?? 0)}`, color: colors.text, fontWeight: "bold", fontSize: "12px" }}>
              {data.performance ?? 0}
            </div>
            <span style={{ fontSize: "10px", color: colors.muted, marginTop: "4px" }}>Performance</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", border: `3px solid ${getScoreColor(data.accessibility ?? 0)}`, color: colors.text, fontWeight: "bold", fontSize: "12px" }}>
              {data.accessibility ?? 0}
            </div>
            <span style={{ fontSize: "10px", color: colors.muted, marginTop: "4px" }}>Accessibility</span>
          </div>
        </div>
      )}
    </div>
  );
}
