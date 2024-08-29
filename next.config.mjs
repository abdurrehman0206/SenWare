/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aoypinw312binnuy.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
