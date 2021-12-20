import config from '../../config'

export default async function robots(req, res) {
  res.setHeader('Content-Type', `text/plain`)
  res.end(`Sitemap: https://${config.url}/sitemap.xml\nUser-agent: *\nAllow: /`)
}
