/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "senware-blob.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
