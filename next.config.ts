import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lefredo-development.s3.us-east-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
