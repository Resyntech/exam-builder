/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
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
    ]
  },
}

module.exports = nextConfig
