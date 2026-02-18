/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed basePath and assetPrefix for compatibility with Vercel root deployment
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
