/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    domains: [
      "static.plgworks.com",
      "nftornot-assests.s3.amazonaws.com",
      "non-staging-assests.s3.amazonaws.com",
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    path: process.env.W_CDN_IMAGE_RESIZER_URL,
    formats: ["image/avif", "image/webp"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    exportPathMap: [],
  },
};

module.exports = nextConfig;
