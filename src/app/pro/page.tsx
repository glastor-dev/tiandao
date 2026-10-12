import React from "react";
import Link from "next/link";

export default function ProPage() {
  return (
    <div className="container">
      <div className="header">
        <h1>Desbloquea Tiandao PRO ⚡</h1>
        <p style={{ color: "var(--muted)", maxWidth: "600px" }}>
          Lleva tu perfil al siguiente nivel con el ecosistema B2B integrado, 
          IA Code Reviewer, Radar de Tecnologías y acceso a repositorios privados.
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginTop: "32px" }}>
        
        {/* Pesos Argentinos (ARS) */}
        <div className="card" style={{ flex: "1 1 300px", border: "1px solid var(--border)", padding: "24px", borderRadius: "12px", backgroundColor: "rgba(0,0,0,0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "24px" }}>🇦🇷</span>
            <h2 style={{ fontSize: "20px", margin: 0 }}>Pago Local (ARS)</h2>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "24px" }}>
            Precio especial para Argentina: <strong>Acceso de por vida por $15.000 ARS.</strong>
          </p>
          
          <div style={{ backgroundColor: "var(--bg)", padding: "16px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "monospace" }}>
            <p style={{ margin: "0 0 8px 0", color: "var(--muted)", fontSize: "12px" }}>BANCO GALICIA</p>
            <p style={{ margin: "0", fontSize: "16px", color: "var(--text)" }}>Alias: <strong style={{ color: "var(--accent)" }}>DIBUJO.DRAGA.PRIMO</strong></p>
          </div>
        </div>

        {/* Dólares (USD ACH) */}
        <div className="card" style={{ flex: "1 1 300px", border: "1px solid var(--border)", padding: "24px", borderRadius: "12px", backgroundColor: "rgba(0,0,0,0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "24px" }}>🇺🇸</span>
            <h2 style={{ fontSize: "20px", margin: 0 }}>Transferencia ACH (USD)</h2>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "24px" }}>
            Desbloquea el acceso de por vida por un pago único de <strong>$19 USD.</strong>
          </p>
          
          <div style={{ backgroundColor: "var(--bg)", padding: "16px", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "monospace", fontSize: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)" }}>Banco:</span>
              <span>Lead Bank</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)" }}>Titular:</span>
              <span>Andres Antonio Cardoso</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)" }}>Ruta (Routing):</span>
              <strong style={{ color: "var(--accent)" }}>101019644</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)" }}>Cuenta:</span>
              <strong style={{ color: "var(--accent)" }}>214564140545</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--muted)" }}>Tipo:</span>
              <span>Personal checking</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid var(--border)" }}>
              <span style={{ color: "var(--muted)", fontSize: "11px" }}>Dirección del banco:</span>
              <span style={{ fontSize: "11px", textAlign: "right" }}>1801 Main St., Kansas City, MO, 64108</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "48px", padding: "24px", border: "1px solid var(--border)", borderRadius: "12px", backgroundColor: "rgba(46, 160, 67, 0.05)", borderLeft: "4px solid #2ea043" }}>
        <h3 style={{ margin: "0 0 12px 0", color: "#2ea043", fontSize: "18px" }}>🚀 ¿Qué hacer luego de transferir?</h3>
        <p style={{ margin: 0, lineHeight: "1.6" }}>
          Una vez realizado el pago, envía un correo a <strong>ventas@glastor.es</strong> adjuntando el comprobante de pago y tu <strong>nombre de usuario de GitHub</strong>. 
          <br /><br />
          Tu acceso PRO será habilitado manualmente y podrás disfrutar de todas las características premium en las métricas.
        </p>

        <div style={{ marginTop: "24px", display: "flex" }}>
          <a 
            href="https://wa.me/5491132578591?text=Hola,%20acabo%20de%20realizar%20el%20pago%20para%20Tiandao%20PRO.%20Mi%20usuario%20de%20GitHub%20es:" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#25D366",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "15px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s"
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Notificar pago por WhatsApp
          </a>
        </div>
      </div>
      
      <div style={{ marginTop: "32px", textAlign: "center" }}>
        <Link href="/" style={{ color: "var(--accent)", textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>
          ← Volver al generador de métricas
        </Link>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: var(--font-geist-sans), sans-serif;
        }
        .header {
          margin-bottom: 24px;
        }
        h1 {
          font-size: 32px;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
      `}} />
    </div>
  );
}
