const withTM = require('next-transpile-modules')(['react-markdown'])
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
  })
)
