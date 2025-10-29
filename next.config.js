/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: ['img.pkti.me', 'pokerlap.s3.amazonaws.com'],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}
module.exports = nextConfig

