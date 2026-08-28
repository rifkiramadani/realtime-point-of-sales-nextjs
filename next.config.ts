import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  devIndicators: false,
  images: {
    domains: [
      "https://pjkpahtbzupvrnazvhas.storage.supabase.co",
      "https://pjkpahtbzupvrnazvhas.supabase.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pjkpahtbzupvrnazvhas.storage.supabase.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pjkpahtbzupvrnazvhas.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
