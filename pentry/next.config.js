/**
 *  @type {import('next').NextConfig}
 */
const withNextIntl = require("next-intl/plugin")();
module.exports = withNextIntl({
  // Other Next.js config options...
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dabas.blob.core.windows.net",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.spoonacular.com",
        port: "",
        pathname: "/recipes/**",
      },
    ],
  },
};
module.exports = nextConfig;
