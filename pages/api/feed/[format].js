import { buildFeed } from '../../../lib/feed'

export default async (req, res) => {
  const { format } = req.query
  const feed = await buildFeed()

  res.statusCode = 200
  const contentType = format === 'json1' ? 'json' : 'xml'
  res.setHeader('Content-Type', `application/rss+${contentType}`)
  res.end(feed[format]())
}
