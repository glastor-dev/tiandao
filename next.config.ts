import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["satori", "harfbuzzjs"],
};

export default nextConfig;
