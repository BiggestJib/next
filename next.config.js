/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "myprojectbukkky.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
module.exports = nextConfig;
