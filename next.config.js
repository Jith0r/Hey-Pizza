/** @type {import('next').NextConfig} */
const nextConfig = {
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
