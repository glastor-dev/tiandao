import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiandao",
  description: "Generador de métricas para GitHub",
  icons: {
    icon: [
      { url: "/assets/icons/favicon.ico", sizes: "any" },
      { url: "/assets/icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/assets/icons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/assets/icons/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/assets/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster theme="dark" position="bottom-right" />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <footer style={{ 
          borderTop: "1px solid var(--border)", 
          padding: "32px 24px", 
          marginTop: "64px",
          textAlign: "center",
          color: "var(--muted)",
          fontSize: "12px",
          lineHeight: "1.8",
          backgroundColor: "rgba(0,0,0,0.1)",
        }}>
          <p style={{ margin: "0 0 8px 0", fontWeight: "bold", color: "var(--text)" }}>© 2010-2026 GLASTOR®. Todos los derechos reservados.</p>
          <p style={{ margin: "0 0 8px 0" }}>Marca registrada ante el INPI (Reg. 4559568 y 4559567).</p>
          <p style={{ margin: "0" }}>
            Los precios están expresados en moneda local e incluyen IVA.<br/>
            CUIT 23-25316566-9 | Resp. Inscripto | IB: Convenio Multilateral<br/>
            GLASTOR-DEV (División de Desarrollo) | Core v.1.0.0<br/>
            <strong style={{ color: "var(--accent)" }}>Exclusivo B2B / Pagos por Transferencia.</strong>
          </p>
        </footer>
      </body>
    </html>
  );
}
