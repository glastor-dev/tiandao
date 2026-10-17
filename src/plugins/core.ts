export interface ThemeColors {
  bg: string;
  text: string;
  accent: string;
  border: string;
  muted: string;
  green: string;
}

export interface PluginContext {
  username: string;
  colors: ThemeColors;
}

// Common Themes
export const themes: Record<string, ThemeColors> = {
  dark: {
    bg: "#0d1117",
    text: "#c9d1d9",
    accent: "#58a6ff",
    border: "#30363d",
    muted: "#8b949e",
    green: "#238636"
  },
  light: {
    bg: "#ffffff",
    text: "#24292f",
    accent: "#0969da",
    border: "#d0d7de",
    muted: "#57606a",
    green: "#2da44e"
  },
  hacker: {
    bg: "#0d1117",
    text: "#00ff00",
    accent: "#00ff00",
    border: "#003300",
    muted: "#005500",
    green: "#00ff00"
  },
  "tokyo-night": {
    bg: "#1a1b26",
    text: "#c0caf5",
    accent: "#7aa2f7",
    border: "#292e42",
    muted: "#565f89",
    green: "#9ece6a"
  },
  catppuccin: {
    bg: "#1e1e2e",
    text: "#cdd6f4",
    accent: "#cba6f7",
    border: "#313244",
    muted: "#6c7086",
    green: "#a6e3a1"
  },
  dracula: {
    bg: "#282a36",
    text: "#f8f8f2",
    accent: "#bd93f9",
    border: "#44475a",
    muted: "#6272a4",
    green: "#50fa7b"
  },
  nord: {
    bg: "#2e3440",
    text: "#eceff4",
    accent: "#88c0d0",
    border: "#434c5e",
    muted: "#7b88a1",
    green: "#a3be8c"
  },
  cyberpunk: {
    bg: "#120826",
    text: "#00ffff",
    accent: "#ff007f",
    border: "#491069",
    muted: "#7e52a0",
    green: "#00ff66"
  }
};
