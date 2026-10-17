"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

// Simple Accordion Component
const Section = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: '16px', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        style={{ width: '100%', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.02)', border: 'none', borderBottom: isOpen ? '1px solid var(--border)' : 'none', color: 'var(--foreground)', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        {title}
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
      </button>
      {isOpen && <div style={{ padding: '16px', backgroundColor: 'var(--background)' }}>{children}</div>}
    </div>
  );
};

export default function Home() {
  const [username, setUsername] = useState("ricsg");
  const [theme, setTheme] = useState("dark");
  const [showIcons, setShowIcons] = useState(true);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showStargazers, setShowStargazers] = useState(false);
  const [showHabits, setShowHabits] = useState(false);
  const [showStarred, setShowStarred] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [showLicenses, setShowLicenses] = useState(false);
  const [showIssues, setShowIssues] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [showIsocalendar, setShowIsocalendar] = useState(false);
  const [showAipersona, setShowAipersona] = useState(false);
  
  const [githubToken, setGithubToken] = useState("");
  const [anilistUser, setAnilistUser] = useState("");
  const [soId, setSoId] = useState("");
  const [psUrl, setPsUrl] = useState("");
  const [leetcodeUser, setLeetcodeUser] = useState("");
  const [wakatimeUser, setWakatimeUser] = useState("");
  const [youtubeHandle, setYoutubeHandle] = useState("");
  const [freelancerPlatform, setFreelancerPlatform] = useState("upwork");
  const [freelancerUser, setFreelancerUser] = useState("");
  const [showSponsors, setShowSponsors] = useState(false);
  const [showPrivate, setShowPrivate] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
  const [showRadar, setShowRadar] = useState(false);
  const [showVelocity, setShowVelocity] = useState(false);
  const [showAimood, setShowAimood] = useState(false);
  const [liveStatusTimezone, setLiveStatusTimezone] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [cardTitle, setCardTitle] = useState("");
  const [showStreak, setShowStreak] = useState(false);
  const [statusPill, setStatusPill] = useState("");
  
  const [previewUrl, setPreviewUrl] = useState(() => {
    const params = new URLSearchParams({
      username: "ricsg",
      theme: "dark",
      icons: "true",
      languages: "false",
      stargazers: "false",
      habits: "false",
      starred: "false",
      topics: "false",
      licenses: "false",
      issues: "false",
      achievements: "false",
      people: "false",
      isocalendar: "false",
      aipersona: "false",
    });
    return `/api/metrics?${params.toString()}`;
  });
  const [loading, setLoading] = useState(false);

  const generateUrl = () => {
    let baseUrl = "";
    if (typeof window !== "undefined") {
      baseUrl = window.location.origin;
    }
    
    const params = new URLSearchParams({
      username: username || "ricsg",
      theme,
      icons: showIcons.toString(),
      languages: showLanguages.toString(),
      stargazers: showStargazers.toString(),
      habits: showHabits.toString(),
      starred: showStarred.toString(),
      topics: showTopics.toString(),
      licenses: showLicenses.toString(),
      issues: showIssues.toString(),
      achievements: showAchievements.toString(),
      people: showPeople.toString(),
      isocalendar: showIsocalendar.toString(),
      aipersona: showAipersona.toString(),
      ...(githubToken ? { token: githubToken } : {}),
      ...(anilistUser ? { anilist: anilistUser } : {}),
      ...(soId ? { stackoverflow: soId } : {}),
      ...(psUrl ? { pagespeed: psUrl } : {}),
      ...(leetcodeUser ? { leetcode: leetcodeUser } : {}),
      ...(wakatimeUser ? { wakatime: wakatimeUser } : {}),
      ...(youtubeHandle ? { youtube: youtubeHandle } : {}),
      ...(freelancerUser ? { freelancer: `${freelancerPlatform}:${freelancerUser}` } : {}),
      ...(showSponsors ? { sponsors: "true" } : {}),
      ...(showPrivate ? { private_repos: "true" } : {}),
      ...(showSpotify ? { spotify: "true" } : {}),
      ...(showRadar ? { radar: "true" } : {}),
      ...(showVelocity ? { velocity: "true" } : {}),
      ...(showAimood ? { aimood: "true" } : {}),
      ...(liveStatusTimezone ? { livestatus: liveStatusTimezone } : {}),
      ...(bgImage ? { bg_image: bgImage } : {}),
      ...(customColor ? { custom_color: customColor.replace("#", "") } : {}),
      ...(logoUrl ? { logo: logoUrl } : {}),
      ...(cardTitle ? { title: cardTitle } : {}),
      streak: showStreak.toString(),
      ...(statusPill ? { status: statusPill } : {}),
      _t: Date.now().toString(),
    });
    
    return `${baseUrl}/api/metrics?${params.toString()}`;
  };


  const handleUpdate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setPreviewUrl(generateUrl());
    toast.success("Métricas actualizadas", { position: "top-center" });
  };

  const handleCopy = () => {
    const fullUrl = previewUrl.startsWith("http")
      ? previewUrl
      : `${typeof window !== "undefined" ? window.location.origin : ""}${previewUrl}`;
    const code = `[![Metrics](${fullUrl})](${fullUrl})`;
    navigator.clipboard.writeText(code);
    toast.success("¡Código Markdown copiado!", {
      description: "Pégalo directamente en el README de tu perfil de GitHub.",
    });
  };

  const handleProCheck = (setter: React.Dispatch<React.SetStateAction<boolean>>, currentVal: boolean) => {
    if (!currentVal) {
      toast("Función PRO", {
        description: "Esta métrica requiere una licencia PRO. Puede aparecer una marca de agua si no la tienes.",
        action: { label: "Obtener PRO", onClick: () => window.open('/pro', '_blank') }
      });
    }
    setter(!currentVal);
  };

  const getExportUrl = (format: "png" | "svg") => {
    if (!previewUrl) return "#";
    const separator = previewUrl.includes("?") ? "&" : "?";
    return `${previewUrl}${separator}format=${format}`;
  };

  const handleDownload = async (format: "svg" | "png") => {
    try {
      toast.info(`Preparando descarga ${format.toUpperCase()}...`);
      const exportUrl = getExportUrl(format);
      const res = await fetch(exportUrl);
      if (!res.ok) throw new Error("Error fetching file");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `tiandao-metrics-${username || "profile"}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast.success(`Descarga completada: ${format.toUpperCase()}`);
    } catch {
      toast.error("Error al descargar el archivo");
    }
  };

  const applyPreset = (preset: "minimalist" | "full" | "gamer" | "devsecops") => {
    if (preset === "minimalist") {
      setTheme("dark");
      setShowLanguages(true);
      setShowStreak(true);
      setShowStargazers(false);
      setShowHabits(false);
      setShowStarred(false);
      setShowTopics(false);
      setShowLicenses(false);
      setShowIssues(false);
      setShowAchievements(false);
      setShowPeople(false);
      setShowIsocalendar(false);
      setCardTitle("For user accounts");
      setStatusPill("🟢 Available for hire");
    } else if (preset === "full") {
      setTheme("tokyo-night");
      setShowLanguages(true);
      setShowStargazers(true);
      setShowStreak(true);
      setShowHabits(true);
      setShowStarred(true);
      setShowTopics(true);
      setShowLicenses(true);
      setShowIssues(true);
      setShowAchievements(true);
      setShowPeople(false);
      setShowIsocalendar(true);
      setCardTitle("Full Developer Showcase");
      setStatusPill("🚀 Full Stack & AI");
    } else if (preset === "gamer") {
      setTheme("cyberpunk");
      setShowLanguages(true);
      setShowStreak(true);
      setShowAchievements(true);
      setShowHabits(true);
      setShowStargazers(true);
      setShowLicenses(false);
      setShowIssues(false);
      setShowStarred(false);
      setShowTopics(false);
      setShowPeople(false);
      setShowIsocalendar(false);
      setCardTitle("Cyber Terminal");
      setStatusPill("⚡ Level 99 Dev");
    } else if (preset === "devsecops") {
      setTheme("catppuccin");
      setShowLanguages(true);
      setShowLicenses(true);
      setShowIssues(true);
      setShowStreak(true);
      setShowStargazers(true);
      setShowHabits(false);
      setShowStarred(false);
      setShowTopics(false);
      setShowAchievements(false);
      setShowPeople(false);
      setShowIsocalendar(false);
      setCardTitle("DevSecOps & Compliance");
      setStatusPill("🛡️ Audited & Hardened");
    }
    toast.success(`Preset aplicado: ${preset.toUpperCase()}`);
  };

  return (
    <main className="container">
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/favicon-32x32.png" alt="Logo" width={32} height={32} style={{ borderRadius: "8px" }} />
          <span style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "-0.02em" }}>GLASTOR®</span>
        </div>
        <Link href="/pro" style={{ display: "inline-flex", alignItems: "center", padding: "8px 16px", backgroundColor: "rgba(234, 74, 170, 0.1)", border: "1px solid #ea4aaa", color: "#ea4aaa", borderRadius: "8px", fontWeight: "bold", textDecoration: "none", fontSize: "14px", transition: "all 0.2s" }}>
          ⚡ Ser PRO
        </Link>
      </nav>

      <header className="header" style={{ marginBottom: "3rem" }}>
        <h1>Perfil SVG Dinámico para GitHub</h1>
        <p>Crea impresionantes y dinámicas métricas para el README de tu perfil de GitHub. Impulsado por Edge Computing.</p>
      </header>

      <div className="builder-layout">
        
        {/* Configuration Sidebar */}
        <aside className="panel glass">
          <h2 className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Configuración</span>
            <button 
              type="button" 
              onClick={() => handleUpdate()} 
              disabled={loading}
              className="btn btn-primary" 
              style={{ padding: '8px 16px', width: 'auto', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              {loading ? '⏳ Generando...' : '⚡ Generar Reporte'}
            </button>
          </h2>
          
          {/* 1-Click Presets Toolbar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px", padding: "10px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border)", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "bold", color: "var(--accent)" }}>⚡ Presets:</span>
            <button type="button" onClick={() => applyPreset("minimalist")} style={{ padding: "4px 10px", fontSize: "11px", borderRadius: "14px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "var(--foreground)", cursor: "pointer" }}>👔 Minimalist</button>
            <button type="button" onClick={() => applyPreset("full")} style={{ padding: "4px 10px", fontSize: "11px", borderRadius: "14px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "var(--foreground)", cursor: "pointer" }}>🚀 Full Showcase</button>
            <button type="button" onClick={() => applyPreset("gamer")} style={{ padding: "4px 10px", fontSize: "11px", borderRadius: "14px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "var(--foreground)", cursor: "pointer" }}>🎮 Cyberpunk</button>
            <button type="button" onClick={() => applyPreset("devsecops")} style={{ padding: "4px 10px", fontSize: "11px", borderRadius: "14px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "var(--foreground)", cursor: "pointer" }}>🛡️ DevSecOps</button>
          </div>

          <form onSubmit={handleUpdate}>
            
            <Section title="⚙️ Ajustes Básicos" defaultOpen={true}>
              <div className="form-group">
                <label htmlFor="username">GitHub Username</label>
                <input id="username" type="text" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. lowlighter" />
              </div>
              <div className="form-group">
                <label htmlFor="theme">Tema Visual</label>
                <select id="theme" className="input-field" value={theme} onChange={(e) => setTheme(e.target.value)}>
                  <option value="dark">Dark (Default)</option>
                  <option value="tokyo-night">Tokyo Night 🌌</option>
                  <option value="catppuccin">Catppuccin Mocha ☕</option>
                  <option value="dracula">Dracula 🧛</option>
                  <option value="nord">Nord ❄️</option>
                  <option value="cyberpunk">Cyberpunk / Synthwave ⚡</option>
                  <option value="hacker">Hacker (Matrix) 💻</option>
                  <option value="light">Light ☀️</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="statusPill">Status Badge / Disponibilidad</label>
                <input id="statusPill" type="text" className="input-field" value={statusPill} onChange={(e) => setStatusPill(e.target.value)} placeholder="e.g. 🟢 Open to work" />
              </div>
              <div className="form-group">
                <label htmlFor="token" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  GitHub Token <span style={{ fontSize: '10px', color: 'var(--accent)' }}>Opcional</span>
                </label>
                <input id="token" type="password" className="input-field" value={githubToken} onChange={(e) => setGithubToken(e.target.value)} placeholder="ghp_..." />
              </div>
              <div className="form-group">
                <label htmlFor="cardTitle">Título del Encabezado</label>
                <input id="cardTitle" type="text" className="input-field" value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} placeholder="For user accounts" />
              </div>
              <div className="form-group">
                <label htmlFor="logoUrl">Logo URL (Encabezado)</label>
                <input id="logoUrl" type="text" className="input-field" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://example.com/logo.png" />
              </div>
            </Section>

            <Section title="💰 Funciones PRO (Premium)">
              <div className="form-group">
                <label htmlFor="bgImage">Custom Background Image URL</label>
                <input id="bgImage" type="text" className="input-field" value={bgImage} onChange={(e) => setBgImage(e.target.value)} placeholder="https://example.com/bg.png" />
              </div>
              <div className="form-group">
                <label htmlFor="customColor">Custom Brand Color (HEX)</label>
                <input id="customColor" type="text" className="input-field" value={customColor} onChange={(e) => setCustomColor(e.target.value)} placeholder="#ff00ff" />
              </div>
              <div className="form-group">
                <label htmlFor="livestatus">Live Status Timezone</label>
                <input id="livestatus" type="text" className="input-field" value={liveStatusTimezone} onChange={(e) => setLiveStatusTimezone(e.target.value)} placeholder="e.g. America/Argentina/Buenos_Aires" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={showAipersona} onChange={() => handleProCheck(setShowAipersona, showAipersona)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                  🤖 AI Code Reviewer (Persona)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={showAimood} onChange={() => handleProCheck(setShowAimood, showAimood)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                  🧠 AI Developer Mood
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={showSponsors} onChange={() => handleProCheck(setShowSponsors, showSponsors)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                  💖 GitHub Sponsors Leaderboard
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={showPrivate} onChange={() => handleProCheck(setShowPrivate, showPrivate)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                  🔒 Private Repositories Data
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={showSpotify} onChange={() => handleProCheck(setShowSpotify, showSpotify)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                  🎵 Currently Coding To (Spotify)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={showRadar} onChange={() => handleProCheck(setShowRadar, showRadar)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                  🕸️ Tech Stack Radar Chart
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={showVelocity} onChange={() => handleProCheck(setShowVelocity, showVelocity)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} />
                  ⚡ Velocity & Impact Metrics
                </label>
              </div>
            </Section>

            <Section title="📊 Métricas de GitHub">
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showIcons} onChange={(e) => setShowIcons(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> Show Icons</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showLanguages} onChange={(e) => setShowLanguages(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> Top Languages</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showStreak} onChange={(e) => setShowStreak(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> 🔥 Commit Streaks (Rachas)</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showStargazers} onChange={(e) => setShowStargazers(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> 🌟 Stargazers & Forks</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showHabits} onChange={(e) => setShowHabits(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> 📊 Coding Habits</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showStarred} onChange={(e) => setShowStarred(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> ⭐ Starred Repos</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showTopics} onChange={(e) => setShowTopics(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> 🏷️ Starred Topics</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showLicenses} onChange={(e) => setShowLicenses(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> ⚖️ Repo Licenses</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showIssues} onChange={(e) => setShowIssues(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> 📈 Issues & PRs</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showAchievements} onChange={(e) => setShowAchievements(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> 🏆 Achievements</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showPeople} onChange={(e) => setShowPeople(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> 👥 People (Followers)</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" checked={showIsocalendar} onChange={(e) => setShowIsocalendar(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }} /> 🧱 Isometric Calendar (3D)</label>
              </div>
            </Section>

            <Section title="🔌 Integraciones Externas">
              <div className="form-group">
                <label htmlFor="anilist">AniList Username</label>
                <input id="anilist" type="text" className="input-field" value={anilistUser} onChange={(e) => setAnilistUser(e.target.value)} placeholder="e.g. lowlighter" />
              </div>
              <div className="form-group">
                <label htmlFor="stackoverflow">StackOverflow User ID</label>
                <input id="stackoverflow" type="text" className="input-field" value={soId} onChange={(e) => setSoId(e.target.value)} placeholder="e.g. 1111111" />
              </div>
              <div className="form-group">
                <label htmlFor="pagespeed">PageSpeed Audit URL</label>
                <input id="pagespeed" type="text" className="input-field" value={psUrl} onChange={(e) => setPsUrl(e.target.value)} placeholder="https://example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="leetcode">LeetCode Username</label>
                <input id="leetcode" type="text" className="input-field" value={leetcodeUser} onChange={(e) => setLeetcodeUser(e.target.value)} placeholder="e.g. neetcode" />
              </div>
              <div className="form-group">
                <label htmlFor="wakatime">WakaTime Username</label>
                <input id="wakatime" type="text" className="input-field" value={wakatimeUser} onChange={(e) => setWakatimeUser(e.target.value)} placeholder="e.g. torvalds" />
              </div>
              <div className="form-group">
                <label htmlFor="youtube">YouTube Channel Handle</label>
                <input id="youtube" type="text" className="input-field" value={youtubeHandle} onChange={(e) => setYoutubeHandle(e.target.value)} placeholder="e.g. ChannelName" />
              </div>
              <div className="form-group">
                <label htmlFor="freelancerPlatform">Freelancer Platform</label>
                <select id="freelancerPlatform" className="input-field" value={freelancerPlatform} onChange={(e) => setFreelancerPlatform(e.target.value)}>
                  <option value="upwork">Upwork</option>
                  <option value="fiverr">Fiverr</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="freelancer">Freelancer Username</label>
                <input id="freelancer" type="text" className="input-field" value={freelancerUser} onChange={(e) => setFreelancerUser(e.target.value)} placeholder="e.g. john_doe" />
              </div>
            </Section>

            {/* Botón Principal para Generar el Reporte */}
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary" 
                style={{ 
                  width: '100%', 
                  padding: '14px 20px', 
                  fontSize: '15px', 
                  fontWeight: 'bold', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px',
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? (
                  <>
                    <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    <span>Generando Reporte...</span>
                  </>
                ) : (
                  <>
                    <span>🚀 Generar Reporte / Actualizar Métricas</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </aside>

        {/* Live Preview Panel */}
        <section className="preview-container">
          <div className="panel glass" style={{ position: 'sticky', top: '2rem', zIndex: 10 }}>
            <h2 className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Vista Previa en Vivo</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  type="button" 
                  onClick={() => handleUpdate()} 
                  disabled={loading}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    backgroundColor: 'var(--secondary)', 
                    color: 'white', 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    fontWeight: 'bold', 
                    border: '1px solid var(--border)',
                    cursor: 'pointer'
                  }}
                >
                  🔄 {loading ? 'Cargando...' : 'Actualizar'}
                </button>
                <button 
                  type="button" 
                  onClick={() => handleDownload("png")} 
                  style={{ textDecoration: 'none', backgroundColor: 'var(--primary)', color: 'white', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                >
                  📥 Descargar PNG
                </button>
                <button 
                  type="button" 
                  onClick={() => handleDownload("svg")} 
                  style={{ textDecoration: 'none', backgroundColor: 'var(--secondary)', color: 'white', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', border: '1px solid var(--border)', cursor: 'pointer' }}
                >
                  📥 Descargar SVG
                </button>
              </div>
            </h2>
            <div className="preview-box">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={previewUrl} 
                  alt="Metrics Preview" 
                  className="preview-image"
                  onLoad={() => setLoading(false)}
                  onError={() => setLoading(false)}
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              ) : (
                <p style={{ color: 'var(--muted-foreground)' }}>Generating preview...</p>
              )}
            </div>
            
            <div style={{ marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--muted-foreground)' }}>Código Markdown</h3>
              <div className="code-box" style={{ paddingRight: '100px' }}>
                {`[![Metrics](${previewUrl})](${previewUrl})`}
                <button type="button" onClick={handleCopy} className="copy-btn">Copiar</button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
