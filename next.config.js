/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID:11869438,
    NEXT_PUBLIC_ZEGO_SERVER_ID:"9390afab385cb02cce7dd1e550fa91c0",
  },
  images:{
    domains: ["localhost"],
  }
};

module.exports = nextConfig;
