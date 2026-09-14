import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'media-assets.swiggy.com' },
      { protocol: 'https', hostname: 'b.zmtcdn.com' },
      { protocol: 'https', hostname: 'img3.restaurantguru.com' },
    ],
  },
};

export default nextConfig;
