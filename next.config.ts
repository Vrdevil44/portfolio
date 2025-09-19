import type { NextConfig } from "next";

// Derive basePath/assetPrefix for GitHub Pages static hosting.
// If deploying to a project page (repo != *.github.io), use "/<repo>".
// If deploying to user/organization pages (repo ends with .github.io), use "".
const repository = process.env.GITHUB_REPOSITORY || ""; // e.g. vibhu/portfolio
const repoName = repository.split("/")[1] || "";
const isGitHubPages = Boolean(process.env.GITHUB_ACTIONS);
const isUserOrOrgPages = repoName.endsWith(".github.io");

const computedBasePath = isGitHubPages && !isUserOrOrgPages && repoName
  ? `/${repoName}`
  : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: computedBasePath,
  assetPrefix: computedBasePath || undefined,
  trailingSlash: true,
};

export default nextConfig;
