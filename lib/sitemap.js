import { SitemapStream, streamToPromise } from 'sitemap'
import config from '../config'
import { getDatabase, formatPosts } from './notion'

export const buildSitemap = async () => {
  const smStream = new SitemapStream({
    hostname: config.url,
    cacheTime: 600000,
  })

  const rawPosts = await getDatabase(process.env.NOTION_DATABASE_ID)
  const posts = await formatPosts(rawPosts)

  posts.forEach((post) => {
    smStream.write({
      url: new URL(`/posts/${post.slug}`, config.url).href,
      changefreq: 'daily',
      priority: 0.9,
    })
  })
  smStream.end()

  const sitemapOutput = (await streamToPromise(smStream)).toString()
  return sitemapOutput
}
