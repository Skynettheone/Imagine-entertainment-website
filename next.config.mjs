/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Image optimization is now ENABLED (removed unoptimized: true)
  // Next.js will automatically optimize images with WebP, resize, and lazy load
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Allow all paths from Cloudinary
      },
    ],
  },
}

export default nextConfig
