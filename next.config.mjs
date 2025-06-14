/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["next-international", "international-types"],
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  // dùng để truyền dữ liệu từ web xuống iframe tránh cors
  async headers() {
    return [
      {
        // Routes this applies to
        source: "/(.*)",
        // Headers
        headers: [
          // Allow for specific domains to have access or * for all
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
            // DOES NOT WORK
            // value: process.env.ALLOWED_ORIGIN,
          },
          // Allows for specific methods accepted
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          // Allows for specific headers accepted (These are a few standard ones)
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          // X-Frame-Options header (cho phép nhúng từ mọi nguồn)
          {
            key: "X-Frame-Options",
            value: "", // Loại bỏ header này hoặc để trống
          },
          // Content-Security-Policy (cho phép nhúng iframe từ mọi nguồn)
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *;", // * cho phép nhúng từ mọi nguồn
          },
        ],
      },
    ];
  },
};

export default nextConfig;
