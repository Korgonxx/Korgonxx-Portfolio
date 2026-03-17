/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // enables `next build` → static HTML export (works on any host)
  trailingSlash: true,
  images: { unoptimized: true },
}

module.exports = nextConfig
