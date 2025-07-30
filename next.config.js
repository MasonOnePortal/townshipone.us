const nextConfig = {
  eslint: {
    // Disable linting errors during build process
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/real-estate',
        destination: '/Real-Estate-and-Business-Listings-Mason-City-OH',
        permanent: true, // This will issue a 301 redirect
      },
      {
        source: '/deals-sale',
        destination: '/Deals-Discounts-and-Promotions-Mason-City-OH',
        permanent: true,
      },
      {
        source: '/professional-services',
        destination: '/Ecommerce-integration-Digital-Marketing-and-AI-Chatbot-Companies-Mason-City-OH',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: '/Job-Listings-Mason-City-OH',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
