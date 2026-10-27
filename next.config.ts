
import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  ...(isGitHubPages && {
    output: "export" as const,
    basePath: "/itzfizz-scroll-animation",
  }),
};

export default nextConfig;
