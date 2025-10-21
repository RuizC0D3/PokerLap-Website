/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['img.pkti.me', 'pokerlap.s3.amazonaws.com'],
  },
}

module.exports = nextConfig
