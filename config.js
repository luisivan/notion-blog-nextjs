const config = {
  emoji: '☯︎✧',
  name: 'Luis Cuende',
  description:
    'Musings about modern philosophy, productivity and unbundling the nation state with crypto/Web3.',
  twitter: 'licuende',
  introPageId: '4d3df4af62704600b4d58cf3b4e39a21',
  aboutPageId: '9ed926b0566d46dcac5813de5af19dd8',
  defaultPostImage: '/logo.jpg',
  substackUsername: 'thoughtcrime',
  url: 'https://luis.com',
}

config.defaultPostImage = new URL(config.defaultPostImage, config.url).href

module.exports = config
