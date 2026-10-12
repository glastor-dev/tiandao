import { PluginContext } from "./core";

export function SpotifyModule({ ctx }: { ctx: PluginContext }) {
  const { colors } = ctx;
  
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#1DB954" style={{ marginRight: "6px" }}>
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.84c.361.181.54.78.3 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.781-.18-.6.18-1.2.78-1.38 4.2-1.26 11.28-1.02 15.72 1.62.539.3.719 1.02.419 1.56-.299.42-1.02.599-1.559.36z"/>
        </svg>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#1DB954" }}>Currently Coding To (Premium)</span>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px", borderRadius: "8px", backgroundColor: "rgba(29, 185, 84, 0.05)", border: `1px solid ${colors.border}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://i.scdn.co/image/ab67616d0000b2734121fa0f24d86d63806a6dd8" width={64} height={64} style={{ borderRadius: "8px", objectFit: "cover" }} alt="Album Art" />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.text }}>Lofi Hip Hop Radio</span>
          <span style={{ fontSize: "12px", color: colors.muted, marginTop: "4px" }}>Lofi Girl</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
            <span style={{ fontSize: "10px", color: colors.muted }}>1:24</span>
            <div style={{ display: "flex", flex: 1, height: "4px", backgroundColor: colors.border, borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "35%", height: "100%", backgroundColor: "#1DB954" }}></div>
            </div>
            <span style={{ fontSize: "10px", color: colors.muted }}>3:15</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: "16px" }}>
          <div style={{ width: "4px", height: "100%", backgroundColor: "#1DB954" }}></div>
          <div style={{ width: "4px", height: "60%", backgroundColor: "#1DB954" }}></div>
          <div style={{ width: "4px", height: "80%", backgroundColor: "#1DB954" }}></div>
        </div>
      </div>
    </div>
  );
}
