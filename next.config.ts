import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "randomuser.me",    // for random profile pics
      "i.pravatar.cc",    // placeholder avatar API
      "picsum.photos"     // random stock photos
    ],
  },
};

export default nextConfig;
