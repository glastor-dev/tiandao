import { FreelancerData } from "../types";
import React from "react";
import { PluginContext } from "./core";

export async function fetchFreelancerData(platform: string, username: string) {
  if (!username) return null;
  
  // In a real SaaS, you would connect to Upwork/Fiverr API via your backend.
  // Since Upwork has strict API limits, we simulate the fetch for the SaaS Demo.
  // This allows the user to see exactly how the Premium module looks.
  
  return {
    platform: platform.toLowerCase(), // 'upwork' or 'fiverr'
    username: username,
    rating: 4.9,
    reviews: 124,
    jobsCompleted: 87,
    topRated: true,
    hourlyRate: "$45.00/hr",
    totalEarned: "$10k+"
  };
}

export function FreelancerModule({ data, ctx }: { data: FreelancerData, ctx: PluginContext }) {
  const { colors } = ctx;
  if (!data) return null;

  const isUpwork = data.platform === "upwork";
  const brandColor = isUpwork ? "#14a800" : "#1dbf73";
  const brandName = isUpwork ? "Upwork" : "Fiverr";

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        {isUpwork ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill={brandColor} style={{ marginRight: "6px" }}><path d="M17.5 12.31c-1.83 0-3.37-.8-4.57-2.12l-1.39 3.24c.78 1.48 2.05 2.65 3.52 3.3l-1.12 2.61H11.6l1.24-2.88c-1.63-.6-3.03-1.69-4.04-3.06L7.33 17H4.95l1.69-3.95A7.54 7.54 0 0 1 4 8.75v-4h2.4v4c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5v-4h2.4v4c0 1.34-.35 2.6-1.02 3.66l1.23-2.86c1.32-1.78 3.4-2.95 5.74-2.95 3.97 0 7.2 3.23 7.2 7.2s-3.23 7.2-7.2 7.2c-2.3 0-4.36-1.09-5.68-2.81l1.5-3.5c.87 1.13 2.25 1.86 3.78 1.86 2.65 0 4.8-2.15 4.8-4.8s-2.15-4.8-4.8-4.8z"></path></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill={brandColor} style={{ marginRight: "6px" }}><path d="M22.5 5h-21v14h21V5zm-2.8 11.2h-2.1v-3.5c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v3.5h-2.1v-6.3h2.1v.8c.4-.6 1.1-1 1.9-1 1.7 0 3 1.3 3 3v3.5zm-8.8 0h-2.1v-7h2.1v7zm-4.7 0H4.1v-7h2.1v7zm1.1-8.5H5.2V6.2h2.1v1.5z"></path></svg>
        )}
        <span style={{ fontSize: "14px", fontWeight: "bold", color: brandColor }}>{brandName} Profile (Premium)</span>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "12px", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: `${brandColor}10` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.text }}>{data.username}</span>
            {data.topRated && (
              <span style={{ fontSize: "10px", color: brandColor, fontWeight: "bold", marginTop: "2px" }}>🏆 Top Rated Freelancer</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "16px", color: "#f5c518" }}>★</span>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.text }}>{data.rating}</span>
            <span style={{ fontSize: "10px", color: colors.muted }}>({data.reviews})</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${colors.border}`, paddingTop: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.text }}>{data.jobsCompleted}</span>
            <span style={{ fontSize: "10px", color: colors.muted }}>Jobs Done</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.text }}>{data.hourlyRate}</span>
            <span style={{ fontSize: "10px", color: colors.muted }}>Rate</span>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.text }}>{data.totalEarned}</span>
            <span style={{ fontSize: "10px", color: colors.muted }}>Earned</span>
          </div>
        </div>
      </div>
    </div>
  );
}
