/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // ถ้าช้าให้เปิดอันนี้
  swcMinify: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
