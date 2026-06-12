/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8080/api/:path*', // Points to your FastAPI backend
      },
    ]
  },
}

// CHANGE THIS LINE: Swap module.exports for export default
export default nextConfig;