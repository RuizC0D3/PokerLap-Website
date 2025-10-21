// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  images: {
    domains: ['img.pkti.me', 'pokerlap.s3.amazonaws.com'],
  },
}

module.exports = nextConfig
