/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aggressive caching for image proxy routes
  async headers() {
    return [
      {
        source: "/api/candidate-photo/:id*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400, immutable" },
          { key: "CDN-Cache-Control", value: "public, max-age=86400, immutable" },
        ],
      },
      {
        source: "/api/symbol/:code*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400, immutable" },
          { key: "CDN-Cache-Control", value: "public, max-age=86400, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
