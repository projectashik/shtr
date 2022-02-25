/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.countryflags.io", "flagcdn.com"],
  },
};

module.exports = nextConfig;
