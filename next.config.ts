import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img3.restaurantguru.com' },
      { protocol: 'https', hostname: 'img02.restaurantguru.com' },
    ],
  },
};

export default nextConfig;
