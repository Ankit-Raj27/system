/** @type {import('next').NextConfig} */
const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  // SSR mode for Vercel (real-time Notion updates)
  // Static mode for GitHub Pages (requires manual redeploy)
  output: isVercel ? undefined : 'export',
  basePath: isVercel ? '' : '/system',
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
