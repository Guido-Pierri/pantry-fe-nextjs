/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    nextConfig,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dabas.blob.core.windows.net',
                port: '',
                pathname: '/media/**',
            },
        ],
    },
}
