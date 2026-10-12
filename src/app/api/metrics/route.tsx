import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import satori from "satori";
import { ThemeColors } from "@/plugins/core";
import { fetchStargazersData, StargazersModule } from "@/plugins/stargazers";
import { fetchHabitsData, HabitsModule } from "@/plugins/habits";
import { fetchStarredData, StarredModule } from "@/plugins/starred";
import { fetchTopicsData, TopicsModule } from "@/plugins/topics";
import { fetchLicensesData, LicensesModule } from "@/plugins/licenses";
import { fetchIssuesData, IssuesModule } from "@/plugins/issues";
import { fetchAchievementsData, AchievementsModule } from "@/plugins/achievements";
import { fetchPeopleData, PeopleModule } from "@/plugins/people";
import { fetchIsoCalendarData, IsoCalendarModule } from "@/plugins/isocalendar";
import { fetchAnilistData, AnilistModule } from "@/plugins/anilist";
import { fetchStackOverflowData, StackOverflowModule } from "@/plugins/stackoverflow";
import { fetchPageSpeedData, PageSpeedModule } from "@/plugins/pagespeed";
import { fetchLeetCodeData, LeetCodeModule } from "@/plugins/leetcode";
import { fetchWakatimeData, WakatimeModule } from "@/plugins/wakatime";
import { fetchAiPersonaData, AiPersonaModule } from "@/plugins/aipersona";
import { fetchYoutubeData, YoutubeModule } from "@/plugins/youtube";
import { fetchFreelancerData, FreelancerModule } from "@/plugins/freelancer";
import { fetchSponsorsData, SponsorsModule } from "@/plugins/sponsors";
import { SpotifyModule } from "@/plugins/spotify";
import { RadarModule } from "@/plugins/radar";
import { VelocityModule } from "@/plugins/velocity";
import { fetchLiveStatusData, LiveStatusModule } from "@/plugins/livestatus";
import { fetchAiMoodData, AiMoodModule } from "@/plugins/aimood";

// Check if user is PRO via Environment Variable Whitelist
async function checkIsProUser(username: string): Promise<boolean> {
  const proUsersEnv = process.env.PRO_USERS;
  
  // If no whitelist is configured, assume free for all (good for local testing or personal self-hosting)
  if (!proUsersEnv) return true; 
  
  // If explicitly set to empty or specific users, check the list
  const proUsers = proUsersEnv.split(",").map(u => u.trim().toLowerCase());
  return proUsers.includes(username.toLowerCase());
}


// Set runtime to nodejs for full Satori & WASM compatibility
export const runtime = "nodejs";

let cachedFontData: ArrayBuffer | null = null;

async function loadFontData(): Promise<ArrayBuffer> {
  if (cachedFontData) {
    return cachedFontData;
  }
  try {
    const fontPath = fileURLToPath(new URL("./Roboto-Regular.ttf", import.meta.url));
    const buf = await readFile(fontPath);
    cachedFontData = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return cachedFontData;
  } catch {
    const fallbackPath = join(process.cwd(), "src/app/api/metrics/Roboto-Regular.ttf");
    const buf = await readFile(fallbackPath);
    cachedFontData = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    return cachedFontData;
  }
}

// Function to fetch GitHub user data
async function getGitHubUser(username: string, token?: string) {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      return null;
    }
    
    return await res.json();
  } catch {
    return null;
  }
}

async function getTopLanguages(username: string, token?: string) {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) return [];
    
    const repos = await res.json();
    if (!Array.isArray(repos)) return [];

    const langCounts: Record<string, number> = {};
    let total = 0;
    
    repos.forEach((repo: { language?: string | null }) => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        total++;
      }
    });
    
    return Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        count,
        percent: Math.round((count / total) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
  const rawUsername = searchParams.get("username") || "ricsg";
  const isValidUsername = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(rawUsername);
  const username = isValidUsername ? rawUsername : "ricsg";
  const theme = searchParams.get("theme") || "dark";
  const showLanguages = searchParams.get("languages") === "true";
  const showStargazers = searchParams.get("stargazers") === "true";
  const showHabits = searchParams.get("habits") === "true";
  const showStarred = searchParams.get("starred") === "true";
  const showTopics = searchParams.get("topics") === "true";
  const showLicenses = searchParams.get("licenses") === "true";
  const showIssues = searchParams.get("issues") === "true";
  const showAchievements = searchParams.get("achievements") === "true";
  const showPeople = searchParams.get("people") === "true";
  const showIsocalendar = searchParams.get("isocalendar") === "true";
  let showAipersona = searchParams.get("aipersona") === "true";
  
  const anilistUser = searchParams.get("anilist") || "";
  const soId = searchParams.get("stackoverflow") || "";
  const psUrl = searchParams.get("pagespeed") || "";
  const leetcodeUser = searchParams.get("leetcode") || "";
  const wakatimeUser = searchParams.get("wakatime") || "";
  const youtubeHandle = searchParams.get("youtube") || "";
  let freelancerUser = searchParams.get("freelancer") || ""; // Format: platform:username
  let showSponsors = searchParams.get("sponsors") === "true";
  let showPrivate = searchParams.get("private_repos") === "true";
  let showSpotify = searchParams.get("spotify") === "true";
  let showRadar = searchParams.get("radar") === "true";
  let showVelocity = searchParams.get("velocity") === "true";
  let showAimood = searchParams.get("aimood") === "true";
  let liveStatusTimezone = searchParams.get("livestatus") || "";
  const bgImage = searchParams.get("bg_image") || "";
  const customColor = searchParams.get("custom_color") || "";
  const outputFormat = searchParams.get("format") || "png";
  
  // SECURE TOKEN HANDLING: Prioritize server-side Environment Variable for production
  const token = process.env.GITHUB_TOKEN || searchParams.get("token") || "";
  
  // Check PRO status
  const isPro = await checkIsProUser(username);
  if (!isPro) {
    showAipersona = false;
    freelancerUser = "";
    showSponsors = false;
    showPrivate = false;
    showSpotify = false;
    showRadar = false;
    showVelocity = false;
    showAimood = false;
    liveStatusTimezone = "";
  }
  
  const results = await Promise.allSettled([
    getGitHubUser(username, token),
    showLanguages ? getTopLanguages(username, token) : Promise.resolve([]),
    showStargazers ? fetchStargazersData(username) : Promise.resolve({ stars: 0, forks: 0 }),
    showHabits ? fetchHabitsData(username) : Promise.resolve({ days: [0,0,0,0,0,0,0] }),
    showStarred ? fetchStarredData(username) : Promise.resolve({ repos: [] }),
    showTopics ? fetchTopicsData(username) : Promise.resolve({ topics: [] }),
    showLicenses ? fetchLicensesData(username) : Promise.resolve({ licenses: [], total: 0 }),
    showIssues ? fetchIssuesData(username) : Promise.resolve({ total: 0, open: 0, closed: 0 }),
    showAchievements ? fetchAchievementsData(username) : Promise.resolve({ achievements: [] }),
    showPeople ? fetchPeopleData(username, token) : Promise.resolve({ followers: [], total: 0 }),
    showIsocalendar ? fetchIsoCalendarData(username, token) : Promise.resolve({ days: null }),
    anilistUser ? fetchAnilistData(anilistUser) : Promise.resolve(null),
    soId ? fetchStackOverflowData(soId) : Promise.resolve(null),
    psUrl ? fetchPageSpeedData(psUrl) : Promise.resolve(null),
    leetcodeUser ? fetchLeetCodeData(leetcodeUser) : Promise.resolve(null),
    wakatimeUser ? fetchWakatimeData(wakatimeUser) : Promise.resolve(null),
    youtubeHandle ? fetchYoutubeData(youtubeHandle) : Promise.resolve(null),
    freelancerUser ? fetchFreelancerData(freelancerUser.split(":")[0], freelancerUser.split(":")[1]) : Promise.resolve(null),
    showSponsors ? fetchSponsorsData(username) : Promise.resolve(null)
  ]);

  const getValue = <T,>(result: PromiseSettledResult<T>, fallback: T): T => result.status === "fulfilled" ? result.value : fallback;

  const user = getValue(results[0], null);
  const topLanguages = getValue(results[1], []);
  const stargazersData = getValue(results[2], { stars: 0, forks: 0 });
  const habitsData = getValue(results[3], { days: [0,0,0,0,0,0,0] });
  const starredData = getValue(results[4], { repos: [] });
  const topicsData = getValue(results[5], { topics: [] });
  const licensesData = getValue(results[6], { licenses: [], total: 0 });
  const issuesData = getValue(results[7], { total: 0, open: 0, closed: 0 });
  const achievementsData = getValue(results[8], { achievements: [] });
  const peopleData = getValue(results[9], { followers: [], total: 0 });
  const isoCalendarData = getValue(results[10], { days: null });
  const anilistData = getValue(results[11], null);
  const soData = getValue(results[12], null);
  const psData = getValue(results[13], null);
  const leetcodeData = getValue(results[14], null);
  const wakatimeData = getValue(results[15], null);
  const youtubeData = getValue(results[16], null);
  const freelancerData = getValue(results[17], null);
  const sponsorsData = getValue(results[18], null);
  
  // AI Persona and Mood depend on other fetched data, so we fetch it sequentially here if enabled
  const aiPersonaData = showAipersona ? await fetchAiPersonaData(username, topLanguages, stargazersData.stars) : null;
  const aiMoodData = showAimood ? await fetchAiMoodData(username, stargazersData.stars, starredData.repos) : null;
  const liveStatusData = liveStatusTimezone ? await fetchLiveStatusData(liveStatusTimezone) : null;
  
  // Theme configuration (Classic metrics)
  const themeMap: Record<string, ThemeColors & { red: string }> = {
    dark: {
      bg: "#0d1117",
      text: "#c9d1d9",
      accent: "#58a6ff",
      border: "#30363d",
      muted: "#8b949e",
      green: "#238636",
      red: "#f85149"
    },
    light: {
      bg: "#ffffff",
      text: "#24292f",
      accent: "#0969da",
      border: "#d0d7de",
      muted: "#57606a",
      green: "#2da44e",
      red: "#cf222e"
    },
    hacker: {
      bg: "#0d1117",
      text: "#00ff00",
      accent: "#00ff00",
      border: "#003300",
      muted: "#005500",
      green: "#00ff00",
      red: "#ff0000"
    }
  };
  
  const selectedTheme = themeMap[theme] || themeMap.dark;
  const isValidHex = (hex: string) => /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(hex);
  const safeCustomColor = customColor && isValidHex(customColor)
    ? (customColor.startsWith("#") ? customColor : `#${customColor}`)
    : "";
  const colors = {
    ...selectedTheme,
    ...(safeCustomColor ? { accent: safeCustomColor } : {})
  };
  
  // Simulate Private Repositories boost for Premium Demo
  if (showPrivate && user) {
    user.public_repos = (user.public_repos || 0) + 42;
    stargazersData.stars = (stargazersData.stars || 0) + 1500;
  }

  const getLanguageColor = (lang: string) => {
    const langColors: Record<string, string> = {
      TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
      Java: "#b07219", Go: "#00ADD8", Rust: "#dea584", C: "#555555",
      "C++": "#f34b7d", "C#": "#178600", PHP: "#4F5D95", Ruby: "#701516",
      HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051", Swift: "#F05138"
    };
    return langColors[lang] || colors.accent;
  };
  
  // Calculate years joined
  const joinedYear = user?.created_at ? new Date(user.created_at).getFullYear() : new Date().getFullYear();
  const yearsAgo = new Date().getFullYear() - joinedYear;

  // Load font
  const fontData = await loadFontData();

  const isValidImageUrl = (urlStr: string) => {
    try {
      const parsed = new URL(urlStr);
      return (parsed.protocol === "http:" || parsed.protocol === "https:") && !urlStr.includes('"') && !urlStr.includes("'");
    } catch {
      return false;
    }
  };
  const safeBgImage = bgImage && isValidImageUrl(bgImage) ? bgImage : "";

  // Extract the React tree
  const reactTree = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: safeBgImage ? "transparent" : colors.bg,
          ...(safeBgImage ? { backgroundImage: `url(${safeBgImage})`, backgroundSize: "100% 100%", backgroundPosition: "center" } : {}),
          color: colors.text,
          fontFamily: '"Roboto", sans-serif',
          padding: "24px 32px",
          border: `1px solid ${colors.border}`,
        }}
      >
        {/* Overlay to ensure text readability if safeBgImage is used */}
        {safeBgImage && <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.bg, display: "flex", opacity: 0.85, zIndex: -1 }}></div>}
        
        {showPrivate && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", backgroundColor: "rgba(46, 160, 67, 0.1)", border: "1px solid #2ea043", padding: "6px", borderRadius: "6px", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#2ea043" }}>🔒 Enterprise Private Data Included</span>
          </div>
        )}
        
        {/* Header Title for the Card */}
        <div style={{ display: "flex", justifyContent: "center", borderBottom: `1px solid ${colors.border}`, paddingBottom: "10px", marginBottom: "20px" }}>
          <span style={{ fontSize: "16px", fontWeight: "bold", color: colors.text }}>For user accounts</span>
        </div>

        <div style={{ display: "flex", width: "100%", gap: "40px" }}>
          
          {/* Main User Column */}
          <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
            
            {/* User Header */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
              {user?.avatar_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={user.avatar_url} width={24} height={24} style={{ borderRadius: "50%", marginRight: "10px" }} alt="Avatar" />
              ) : (
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: colors.border, marginRight: "10px" }} />
              )}
              <span style={{ fontSize: "18px", fontWeight: "bold", color: colors.accent }}>{user?.login || username}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: colors.muted, marginBottom: "4px" }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill={colors.muted} style={{ marginRight: "8px" }}><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.75.75 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"></path></svg>
              <span>Joined GitHub {yearsAgo > 0 ? `${yearsAgo} years` : 'recently'} ago</span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: colors.muted, marginBottom: "16px" }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill={colors.muted} style={{ marginRight: "8px" }}><path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.498 3.498 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path></svg>
              <span>Followed by {user?.followers || 0} users</span>
            </div>

            {/* Repositories Section */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "8px" }}><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>
              <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>{user?.public_repos || 0} Repositories</span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: colors.muted }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill={colors.muted} style={{ marginRight: "8px" }}><path d="M8.75.75V2h-1.5V.75a.75.75 0 0 1 1.5 0ZM6 2.75A2.75 2.75 0 0 1 8.75 0h-1.5v2h-1.5v-.75a.75.75 0 0 1 1.5 0h1.5A2.75 2.75 0 0 1 6 2.75Z"></path></svg>
                <span>No license preference</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: colors.muted }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill={colors.muted} style={{ marginRight: "8px" }}><path d="M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0ZM8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"></path></svg>
                <span>0 Releases</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: colors.muted }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill={colors.muted} style={{ marginRight: "8px" }}><path d="M2.5 1.5A1.5 1.5 0 0 1 4 0h8a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5v-13ZM4 1.5v13h8v-13H4Z"></path></svg>
                <span>0 Packages</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", width: "50%", marginTop: "36px" }}>
            
            {/* Fake heatmap for visual parity */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1,2,3,4,5,6,7,8,9].map(i => (
                  <div key={i} style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: i > 5 ? colors.green : colors.border }} />
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: colors.muted }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill={colors.muted} style={{ marginRight: "8px" }}><path d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5ZM8 14.25l-.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C1.204 10.73 0 8.23 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.73-1.205 5.23-3.195 6.814a22.043 22.043 0 0 1-3.434 2.414 7.156 7.156 0 0 1-.31.17l-.018.01-.008.004a.75.75 0 0 1-.69 0Z"></path></svg>
                <span>0 Sponsors</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: colors.muted }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill={colors.muted} style={{ marginRight: "8px" }}><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
                <span>0 Stargazers</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: colors.muted }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill={colors.muted} style={{ marginRight: "8px" }}><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.5a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path></svg>
                <span>0 Forkers</span>
              </div>
            </div>

          </div>
        </div>

        {/* Separator */}
        <div style={{ width: "100%", height: "1px", backgroundColor: colors.border, marginTop: "20px", marginBottom: "20px" }} />

        {/* 2-Column Plugin Layout */}
        <div style={{ display: "flex", width: "100%", marginTop: "16px" }}>
          
          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingRight: "16px" }}>
            {/* Languages Module inside same unified style */}
            {showLanguages && topLanguages.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "16px 0", borderTop: `1px solid ${colors.border}` }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M4.75 0a.75.75 0 0 1 .75.75V1.5h5V.75a.75.75 0 0 1 1.5 0V1.5h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 13.25 15H2.75A1.75 1.75 0 0 1 1 13.25V3.25C1 2.284 1.784 1.5 2.75 1.5H4V.75A.75.75 0 0 1 4.75 0ZM2.5 7.5v5.75c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V7.5h-11Z"></path></svg>
                  <span style={{ fontSize: "14px", fontWeight: "bold", color: colors.accent }}>Languages Analysis</span>
                </div>

                {/* In-depth Analysis Box */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "12px", fontWeight: "bold", color: colors.text, marginBottom: "8px" }}>▼ Indepth analysis</span>
                  
                  <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: colors.accent, marginBottom: "12px" }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill={colors.accent} style={{ marginRight: "6px" }}><path d="M1.5 1.5A1.5 1.5 0 0 1 3 0h10a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5H8.75l-4.5 3v-3H3A1.5 1.5 0 0 1 1.5 11.5v-10Z"></path></svg>
                    <span>{topLanguages.length} Languages</span>
                  </div>

                  {/* Progress bar */}
                  <div style={{ display: "flex", width: "100%", height: "6px", borderRadius: "3px", overflow: "hidden", marginBottom: "8px" }}>
                    {topLanguages.map((lang: { name: string; percent: number }) => (
                      <div key={lang.name} style={{ height: "100%", width: `${lang.percent}%`, backgroundColor: getLanguageColor(lang.name) }} />
                    ))}
                  </div>

                  {/* Language List */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "8px" }}>
                    {topLanguages.map((lang: { name: string; percent: number }) => (
                      <div key={lang.name} style={{ display: "flex", alignItems: "center", width: "45%" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: getLanguageColor(lang.name), marginRight: "8px" }} />
                        <span style={{ fontSize: "11px", color: colors.text }}>{lang.name}</span>
                        <span style={{ fontSize: "11px", color: colors.muted, marginLeft: "auto" }}>{lang.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {showStarred && <StarredModule data={starredData} ctx={{ username, colors }} />}
            {liveStatusTimezone && liveStatusData && <LiveStatusModule data={liveStatusData} ctx={{ username, colors }} />}
            {showTopics && <TopicsModule data={topicsData} ctx={{ username, colors }} />}
            {showPeople && <PeopleModule data={peopleData} ctx={{ username, colors }} />}
            {soId && soData && <StackOverflowModule data={soData} ctx={{ username, colors }} />}
            {leetcodeUser && leetcodeData && <LeetCodeModule data={leetcodeData} ctx={{ username, colors }} />}
            {wakatimeUser && wakatimeData && <WakatimeModule data={wakatimeData} ctx={{ username, colors }} />}
            {youtubeHandle && youtubeData && <YoutubeModule data={youtubeData} ctx={{ username, colors }} />}
            {freelancerUser && freelancerData && <FreelancerModule data={freelancerData} ctx={{ username, colors }} />}
            {showSpotify && <SpotifyModule ctx={{ username, colors }} />}
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: "16px", borderLeft: `1px solid ${colors.border}` }}>
            {showAipersona && aiPersonaData && <AiPersonaModule data={aiPersonaData} ctx={{ username, colors }} />}
            {showAimood && aiMoodData && <AiMoodModule data={aiMoodData} ctx={{ username, colors }} />}
            {showIsocalendar && <IsoCalendarModule data={isoCalendarData} ctx={{ username, colors }} />}
            {showStargazers && <StargazersModule data={stargazersData} ctx={{ username, colors }} />}
            {showHabits && <HabitsModule data={habitsData} ctx={{ username, colors }} />}
            {showLicenses && <LicensesModule data={licensesData} ctx={{ username, colors }} />}
            {showIssues && <IssuesModule data={issuesData} ctx={{ username, colors }} />}
            {showAchievements && <AchievementsModule data={achievementsData} ctx={{ username, colors }} />}
            {anilistUser && anilistData && <AnilistModule data={anilistData} ctx={{ username, colors }} />}
            {psUrl && psData && <PageSpeedModule data={psData} ctx={{ username, colors }} />}
            {showSponsors && sponsorsData && <SponsorsModule data={sponsorsData} ctx={{ username, colors }} />}
            {showVelocity && <VelocityModule ctx={{ username, colors }} />}
            {showRadar && <RadarModule ctx={{ username, colors }} />}
          </div>
        </div>

      </div>
    );

    const calcWidth = 960;
    const calcHeight = 260 + Math.max(
      (showLanguages ? 180 : 0) + (showStarred ? 300 : 0) + (showTopics ? 100 : 0) + (showPeople ? 140 : 0) + (soId ? 200 : 0) + (leetcodeUser ? 160 : 0) + (wakatimeUser ? 160 : 0) + (youtubeHandle ? 180 : 0) + (freelancerUser ? 160 : 0) + (showSpotify ? 160 : 0) + (liveStatusTimezone ? 100 : 0),
      (showAipersona ? 120 : 0) + (showAimood ? 100 : 0) + (showIsocalendar ? 120 : 0) + (showStargazers ? 80 : 0) + (showHabits ? 120 : 0) + (showLicenses ? 120 : 0) + (showIssues ? 80 : 0) + (showAchievements ? 120 : 0) + (anilistUser ? 180 : 0) + (psUrl ? 120 : 0) + (showSponsors ? 160 : 0) + (showVelocity ? 160 : 0) + (showRadar ? 220 : 0)
    ) + (showPrivate ? 60 : 0) + 40;

    if (outputFormat === "svg") {
      const svg = await satori(reactTree, {
        width: calcWidth,
        height: calcHeight,
        fonts: [
          { name: "Roboto", data: fontData, weight: 400, style: "normal" }
        ],
      });
      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          "X-Content-Type-Options": "nosniff",
          "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
        },
      });
    }

    return new ImageResponse(reactTree, {
      width: calcWidth,
      height: calcHeight,
      fonts: [
        {
          name: "Roboto",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      }
    });
  } catch (error) {
    console.error("METRICS_API_ERROR:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
