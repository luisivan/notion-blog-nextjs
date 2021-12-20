import { buildSitemap } from '../../lib/sitemap'

export default async function sitemap(req, res) {
  const sitemapOutput = await buildSitemap()

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  })

  res.end(sitemapOutput)
}
