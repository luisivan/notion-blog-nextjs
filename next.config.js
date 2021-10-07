const withTM = require('next-transpile-modules')([
  'fetch-meta-tags',
  'fetch-blob',
])
const { withPlaiceholder } = require('@plaiceholder/next')

module.exports = withTM(
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
      ]
    },
    images: {
      domains: ['s3.us-west-2.amazonaws.com'],
    },
    experimental: { esmExternals: true },
  })
)
