import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
      },
      {
        protocol: 'https',
        hostname: 'iconscout.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/sample-page',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
