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
  }
};
