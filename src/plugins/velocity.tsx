import { PluginContext } from "./core";

export function VelocityModule({ ctx }: { ctx: PluginContext }) {
  const { colors } = ctx;
  
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px", justifyContent: "center" }}>
        <span style={{ fontSize: "14px", fontWeight: "bold", color: "#f59e0b" }}>⚡ Velocity & Impact (Premium)</span>
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", width: "100%" }}>
        
        {/* TTM */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "12px", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: "rgba(245, 158, 11, 0.05)", alignItems: "center" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.text }}>4.2h</span>
          <span style={{ fontSize: "10px", color: colors.muted, textAlign: "center", marginTop: "4px" }}>Avg Time-to-Merge</span>
        </div>
        
        {/* Open Source Karma */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "12px", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: "rgba(245, 158, 11, 0.05)", alignItems: "center" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.text }}>42</span>
          <span style={{ fontSize: "10px", color: colors.muted, textAlign: "center", marginTop: "4px" }}>External PRs Merged</span>
        </div>
        
        {/* Code Refactors */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "12px", borderRadius: "8px", border: `1px solid ${colors.border}`, backgroundColor: "rgba(245, 158, 11, 0.05)", alignItems: "center" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: colors.text }}>94%</span>
          <span style={{ fontSize: "10px", color: colors.muted, textAlign: "center", marginTop: "4px" }}>Review Success Rate</span>
        </div>

      </div>
    </div>
  );
}
