/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['skauto.s3.amazonaws.com'], // Itt adod hozzá az S3 domain-t
    },
  };
  
  export default nextConfig;