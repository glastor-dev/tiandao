export interface BaseData {
  repositories: number;
  licensePreference: string;
  releases: number;
  packages: number;
  sponsors: number;
  stars: number;
  forks: number;
  activityDots: number[];
}

export async function fetchBaseData(username: string, token?: string, defaultRepos: number = 0): Promise<BaseData> {
  // 1. Try GitHub GraphQL API if token is provided
  if (token) {
    try {
      const query = `
        query ($login: String!) {
          user(login: $login) {
            packages { totalCount }
            sponsorshipsAsMaintainer { totalCount }
            repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
              totalCount
              nodes {
                stargazerCount
                forkCount
                licenseInfo { spdxId name }
                releases { totalCount }
              }
            }
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Tiandao-Metrics"
        },
        body: JSON.stringify({ query, variables: { login: username } }),
        next: { revalidate: 3600 }
      });

      if (res.ok) {
        const json = await res.json();
        const userData = json?.data?.user;
        if (userData) {
          let stars = 0;
          let forks = 0;
          let releases = 0;
          const licCounts: Record<string, number> = {};
          const reposNodes = userData.repositories?.nodes || [];

          for (const r of reposNodes) {
            stars += r.stargazerCount || 0;
            forks += r.forkCount || 0;
            releases += r.releases?.totalCount || 0;
            const lic = r.licenseInfo?.spdxId || r.licenseInfo?.name;
            if (lic && lic !== "NOASSERTION") {
              licCounts[lic] = (licCounts[lic] || 0) + 1;
            }
          }

          const topLic = Object.entries(licCounts).sort((a, b) => b[1] - a[1])[0];
          const licensePreference = topLic ? `${topLic[0]} license` : "No license preference";

          const weeks = userData.contributionsCollection?.contributionCalendar?.weeks || [];
          const allDays: number[] = [];
          for (const w of weeks) {
            for (const d of (w.contributionDays || [])) {
              allDays.push(d.contributionCount || 0);
            }
          }
          const last9 = allDays.length >= 9 ? allDays.slice(-9) : (allDays.length > 0 ? allDays : [0, 0, 0, 0, 0, 0, 0, 0, 0]);

          return {
            repositories: userData.repositories?.totalCount ?? defaultRepos,
            licensePreference,
            releases,
            packages: userData.packages?.totalCount || 0,
            sponsors: userData.sponsorshipsAsMaintainer?.totalCount || 0,
            stars,
            forks,
            activityDots: last9.slice(-9)
          };
        }
      }
    } catch {
      // Fallback gracefully to REST
    }
  }

  // 2. REST API fallback (unauthenticated or fallback on 401)
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Tiandao-Metrics"
  };
  if (token) headers.Authorization = `token ${token}`;

  async function safeFetch(url: string) {
    try {
      let res = await fetch(url, { headers, next: { revalidate: 3600 } });
      if (res.status === 401 && token) {
        const publicHeaders = { Accept: "application/vnd.github.v3+json", "User-Agent": "Tiandao-Metrics" };
        res = await fetch(url, { headers: publicHeaders, next: { revalidate: 3600 } });
      }
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  }

  const [reposData, eventsData] = await Promise.all([
    safeFetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`),
    safeFetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100`)
  ]);

  let stars = 0;
  let forks = 0;
  const licCounts: Record<string, number> = {};
  const repos = Array.isArray(reposData) ? reposData : [];

  for (const r of repos) {
    stars += r.stargazers_count || 0;
    forks += r.forks_count || 0;
    const lic = r.license?.spdx_id || r.license?.name;
    if (lic && lic !== "NOASSERTION") {
      licCounts[lic] = (licCounts[lic] || 0) + 1;
    }
  }

  const topLic = Object.entries(licCounts).sort((a, b) => b[1] - a[1])[0];
  const licensePreference = topLic ? `${topLic[0]} license` : "No license preference";

  // Check releases for top 5 active repos
  let releases = 0;
  if (repos.length > 0) {
    const topRepos = repos.slice(0, 5);
    const relResults = await Promise.allSettled(
      topRepos.map((r: { url: string }) => safeFetch(`${r.url}/releases?per_page=20`))
    );
    for (const res of relResults) {
      if (res.status === "fulfilled" && Array.isArray(res.value)) {
        releases += res.value.length;
      }
    }
  }

  // Calculate activity for the last 9 days
  const dayMap: Record<string, number> = {};
  for (let i = 0; i < 9; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (8 - i));
    dayMap[d.toISOString().slice(0, 10)] = 0;
  }

  if (Array.isArray(eventsData)) {
    for (const ev of eventsData) {
      if (ev.created_at) {
        const key = ev.created_at.slice(0, 10);
        if (dayMap[key] !== undefined) {
          dayMap[key]++;
        }
      }
    }
  }
  const activityDots = Object.values(dayMap);

  return {
    repositories: defaultRepos || repos.length,
    licensePreference,
    releases,
    packages: 0,
    sponsors: 0,
    stars,
    forks,
    activityDots
  };
}
