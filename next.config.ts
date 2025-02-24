import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    domains: ['lefredo.s3.us-east-1.amazonaws.com'],
  },
};

export default nextConfig;
