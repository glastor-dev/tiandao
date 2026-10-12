import { PluginContext } from "./core";

export function RadarModule({ ctx }: { ctx: PluginContext }) {
  const { colors } = ctx;
  
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px", justifyContent: "center" }}>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>🕸️ Tech Stack Radar (Premium)</span>
      </div>
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: "180px", width: "100%" }}>
        {/* Simple Hexagon Radar approximation using SVGs since we are inside Satori */}
        <svg width="180" height="180" viewBox="0 0 200 200" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }}>
          {/* Background polygons */}
          <polygon points="100,20 170,55 170,145 100,180 30,145 30,55" fill="none" stroke={colors.border} strokeWidth="1" />
          <polygon points="100,45 150,70 150,130 100,155 50,130 50,70" fill="none" stroke={colors.border} strokeWidth="1" />
          <polygon points="100,70 130,85 130,115 100,130 70,115 70,85" fill="none" stroke={colors.border} strokeWidth="1" />
          
          {/* Axis lines */}
          <line x1="100" y1="100" x2="100" y2="20" stroke={colors.border} strokeWidth="1" />
          <line x1="100" y1="100" x2="170" y2="55" stroke={colors.border} strokeWidth="1" />
          <line x1="100" y1="100" x2="170" y2="145" stroke={colors.border} strokeWidth="1" />
          <line x1="100" y1="100" x2="100" y2="180" stroke={colors.border} strokeWidth="1" />
          <line x1="100" y1="100" x2="30" y2="145" stroke={colors.border} strokeWidth="1" />
          <line x1="100" y1="100" x2="30" y2="55" stroke={colors.border} strokeWidth="1" />
          
          {/* Data Polygon */}
          <polygon points="100,40 160,65 140,120 100,170 45,130 60,65" fill={colors.accent + "50"} stroke={colors.accent} strokeWidth="2" />
        </svg>
        
        {/* Labels using standard divs */}
        <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%)", fontSize: "10px", fontWeight: "bold", color: colors.text }}>Frontend</div>
        <div style={{ position: "absolute", top: "35px", right: "0px", fontSize: "10px", fontWeight: "bold", color: colors.text }}>Backend</div>
        <div style={{ position: "absolute", bottom: "35px", right: "0px", fontSize: "10px", fontWeight: "bold", color: colors.text }}>DevOps</div>
        <div style={{ position: "absolute", bottom: "-5px", left: "50%", transform: "translateX(-50%)", fontSize: "10px", fontWeight: "bold", color: colors.text }}>Mobile</div>
        <div style={{ position: "absolute", bottom: "35px", left: "0px", fontSize: "10px", fontWeight: "bold", color: colors.text }}>Data</div>
        <div style={{ position: "absolute", top: "35px", left: "0px", fontSize: "10px", fontWeight: "bold", color: colors.text }}>Cloud</div>
      </div>
    </div>
  );
}
