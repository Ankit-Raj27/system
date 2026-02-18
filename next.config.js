/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/system',
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
