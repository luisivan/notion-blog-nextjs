const { withPlaiceholder } = require('@plaiceholder/next')

module.exports = 
  withPlaiceholder({
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          notionhq: false,
        }
      }

      return config
    },
    rewrites() {
      return [
        {
          source: '/rss.xml',
          destination: '/api/feed/rss2',
        },
        {
          source: '/atom.xml',
          destination: '/api/feed/atom1',
        },
        {
          source: '/feed.json',
          destination: '/api/feed/json1',
        },
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap',
        },
        {
          source: '/robots.txt',
          destination: '/api/robots',
        },
      ]
    },
    images: {
      domains: ['s3.us-west-2.amazonaws.com'],
    },
    experimental: { esmExternals: true },
    transpilePackages: ['fetch-meta-tags'],
  })
