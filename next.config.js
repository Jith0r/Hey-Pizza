/** @type {import('next').NextConfig} */
const nextConfig = {
        typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
    //Pour avoir les images des host externe comme un compte google
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'hey-pizza.s3.amazonaws.com' //amazon
            }
        ]
    }
}

module.exports = nextConfig
