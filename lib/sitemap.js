import { SitemapStream, streamToPromise } from 'sitemap'
import config from '../config'
import { getDatabase, getFeatured, formatPosts } from './notion'

const addPost = (stream, post, priority) => {
  stream.write({
    url: new URL(`/posts/${post.slug}`, config.url).href,
    changefreq: 'daily',
    priority: priority,
  })
}

export const buildSitemap = async () => {
  const sitemapStream = new SitemapStream({
    hostname: config.url,
    cacheTime: 600000,
  })

  const mainPages = ['/', '/blog', '/about']
  mainPages.forEach((url) => {
    sitemapStream.write({
      url: new URL(url, config.url).href,
      changefreq: 'daily',
      priority: 1,
    })
  })

  const rawFeaturedPosts = await getFeatured(process.env.NOTION_DATABASE_ID)
  const featuredPosts = await formatPosts(rawFeaturedPosts)
  featuredPosts.forEach((post) => addPost(sitemapStream, post, 0.9))

  const rawPosts = await getDatabase(process.env.NOTION_DATABASE_ID)
  const posts = await formatPosts(rawPosts)
  posts.forEach((post) => addPost(sitemapStream, post, 0.8))

  sitemapStream.end()

  const sitemapOutput = (await streamToPromise(sitemapStream)).toString()
  return sitemapOutput
}
