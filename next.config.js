const withTM = require('next-transpile-modules')(['react-markdown'])

module.exports = withTM({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        notionhq: false,
      }
    }

    return config
  },
})
