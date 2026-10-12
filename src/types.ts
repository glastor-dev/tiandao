export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  created_at: string;
  public_repos: number;
  followers: number;
}

export interface Repository {
  id?: number;
  name: string;
  full_name?: string;
  stargazers_count: number;
  forks_count?: number;
  description: string | null;
  language: string | null;
}

export interface TopLanguage {
  name: string;
  percent: number;
  color: string;
}

export interface StargazersData {
  stars: number;
  forks: number;
}

export interface HabitsData {
  days: number[]; // e.g. [sun, mon, tue, wed, thu, fri, sat]
}

export interface StarredData {
  repos: Repository[];
}

export interface TopicsData {
  topics: string[];
}

export interface LicensesData {
  licenses: { name: string; count?: number; percent: number }[];
  total: number;
}

export interface IssuesData {
  total: number;
  open: number;
  closed: number;
}

export interface AchievementsData {
  achievements: string[];
}

export interface Follower {
  id?: number;
  login: string;
  avatar_url?: string;
  avatarUrl?: string;
}

export interface PeopleData {
  followers: Follower[];
  total: number;
}

export interface IsoCalendarData {
  days: number[] | null;
  total?: number;
}

export interface AnilistData {
  favourites: { anime: { nodes: { title: string; image: string }[] } };
  statistics: { anime: { count: number; minutesWatched: number } };
}

export interface StackOverflowData {
  reputation: number;
  badges: { gold: number; silver: number; bronze: number };
  answers: { title: string; score: number }[];
}

export interface PageSpeedData {
  url?: string;
  error?: boolean;
  performance?: number;
  accessibility?: number;
  bestPractices?: number;
  seo?: number;
}

export interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
}

export interface WakatimeData {
  human_readable_total_including_other_language: string;
  languages: { name: string; percent: number; color: string }[];
  editors: { name: string; percent: number }[];
}

export interface YoutubeData {
  author: string;
  videos: { title: string; thumbnail: string; link?: string; pubDate?: string }[];
}

export interface FreelancerData {
  platform: string;
  username: string;
  rating: number;
  jobsCompleted: number;
  hourlyRate: string;
  totalEarned: string;
  topRated?: boolean;
  reviews?: number;
}

export interface Sponsor {
  id?: number;
  login?: string;
  avatar?: string;
  avatarUrl?: string;
}

export interface SponsorsData {
  sponsors: Sponsor[];
  totalSponsors: number;
  monthlyIncome: number | string;
}

export interface AiPersonaData {
  persona: string;
}

export interface LiveStatusData {
  status: "online" | "asleep" | "away";
  localTime: string;
  timezone: string;
}

export interface AiMoodData {
  mood: string;
  color: string;
  emoji: string;
}
