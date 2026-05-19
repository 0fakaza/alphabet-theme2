/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/turnuvalar", destination: "/tournaments", permanent: true },
    ]
  },
}

export default nextConfig
