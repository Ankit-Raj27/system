/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export is only for GitHub Pages. 
  // Vercel will ignore this if we don't set it, or we can use an environment variable.
  output: process.env.GITHUB_PAGES ? 'export' : undefined,
  
  // Base path is only for GitHub Pages
  basePath: process.env.GITHUB_PAGES ? '/system' : '',
  
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
