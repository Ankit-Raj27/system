/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSR mode for Vercel (real-time Notion updates)
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
