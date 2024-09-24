/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        ignored: /node_modules/,
        poll: 1000, // Check for file changes every second
      };
    }
    return config;
  },
};

export default nextConfig;
