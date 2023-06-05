/** @type {import('next').NextConfig} */
const dev = process.env.NODE_ENV !== "production";
const nextConfig = {
  env: {
    API_URL: dev ? "http://localhost:3000/" : "/",
  },
  basePath: "",
  distDir: "build",
  trailingSlash: true,
  headers: () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
};

module.exports = nextConfig;
