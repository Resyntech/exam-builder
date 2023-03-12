/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/dashboard/subjects",
        destination: "/dashboard",
        permanent: false,
      },
      {
        source: "/dashboard/subjects/:subject",
        destination: "/dashboard",
        permanent: false,
      },
      {
        source: "/quiz/choice/:result",
        destination: "/quiz",
        permanent: false,
      },
      {
        source: "/quiz/choice",
        destination: "/quiz",
        permanent: false,
      },
      {
        source: "/quiz/:subject",
        destination: "/quiz",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
