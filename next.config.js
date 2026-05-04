/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // Vercel-optimized build output
  reactStrictMode: true,
  swcMinify: true,
  // Exclude p5 from bundling since we load via CDN
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
