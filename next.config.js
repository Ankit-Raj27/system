/** @type {import('next').NextConfig} */
const isVercel = !!process.env.VERCEL;
const isGitHubPages = !!process.env.GITHUB_ACTIONS || (!isVercel && process.env.NODE_ENV === 'production');

const nextConfig = {
  // SSR for Vercel, Static for GitHub Pages
  output: isVercel ? undefined : 'export',
  
  // Base path only for GitHub Pages
  basePath: isVercel ? '' : '/system',
  
  trailingSlash: true,
  
  images: {
    unoptimized: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
