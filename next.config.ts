import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img3.restaurantguru.com' },
      { protocol: 'https', hostname: 'img02.restaurantguru.com' },
      { protocol: 'https', hostname: 'content.jdmagicbox.com' },
      { protocol: 'https', hostname: 'spicesafari.in' },
      { protocol: 'https', hostname: 'www.tiktokbriyani.com' },
      { protocol: 'https', hostname: 'b.zmtcdn.com' },
      { protocol: 'https', hostname: 'www.skandacloudkitchen.in' },
      { protocol: 'https', hostname: 'media-assets.swiggy.com' },
      { protocol: 'https', hostname: 'hospitalitycareerprofile.com' },
    ],
  },
};

export default nextConfig;
