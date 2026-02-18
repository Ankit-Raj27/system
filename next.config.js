/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/system',
  assetPrefix: '/system/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
