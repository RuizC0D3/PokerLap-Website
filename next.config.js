/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BOLD_SECRET_KEY: process.env.BOLD_SECRET_KEY,
    BOLD_IDENTITY_KEY: process.env.BOLD_IDENTITY_KEY,
    BOLD_API_BASE: process.env.BOLD_API_BASE,
    BOLD_MODE: process.env.BOLD_MODE,
    COINBASE_COMMERCE_API_KEY: process.env.COINBASE_COMMERCE_API_KEY,
    COINBASE_COMMERCE_API_BASE: process.env.COINBASE_COMMERCE_API_BASE,
  },
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
