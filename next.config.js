/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // Comentar o eliminar esta línea
  images: {
    unoptimized: true,
    domains: ['img.pkti.me', 'pokerlap.s3.amazonaws.com'],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}
module.exports = nextConfig
