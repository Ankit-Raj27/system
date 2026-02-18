/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  // Use static export only when building for GitHub Pages (local build)
  // Vercel handles SSR by default
  output: isVercel ? undefined : 'export',
  
  // Base path is only for GitHub Pages
  basePath: isVercel ? '' : '/system',
  
  // trailingSlash is required for GitHub Pages to resolve paths correctly
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
