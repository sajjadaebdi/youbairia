// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/(.*)", // apply to all routes
          headers: [
            {
              key: "Content-Security-Policy",
              value: `
                default-src 'self';
                script-src 'self' https://checkout.razorpay.com;
                frame-src https://api.razorpay.com https://checkout.razorpay.com;
                connect-src 'self' https://api.razorpay.com;
                img-src 'self' data: https://checkout.razorpay.com;
                style-src 'self' 'unsafe-inline';
              `.replace(/\s{2,}/g, ' ').trim(),
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;