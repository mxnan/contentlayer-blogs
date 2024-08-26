/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com"],
  },
};
import { withContentlayer } from "next-contentlayer";
export default withContentlayer(nextConfig);
