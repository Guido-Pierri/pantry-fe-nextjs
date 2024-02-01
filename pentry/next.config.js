/**
 *  @type {import('next').NextConfig}
 */
const nextConfig = {
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

module.exports = nextConfig
