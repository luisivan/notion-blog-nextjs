import { Feed } from 'feed'
import config from '../config'
import { getDatabase, formatPosts } from './notion'

export const buildFeed = async () => {
  const feed = new Feed({
    title: config.name,
    description: config.description,
    id: config.url,
    link: config.url,
    image: config.defaultPostImage,
    favicon: `${config.url}/favicon.ico`,
    copyright: '',
    author: {
      name: config.name,
      link: config.url,
    },
  })

  const rawPosts = await getDatabase(process.env.NOTION_DATABASE_ID)
  const posts = await formatPosts(rawPosts)

  posts.forEach((post) => {
    post.description = post.summary
    post.link = new URL(`/posts/${post.slug}`, config.url).href
    post.id = post.link
    post.date = new Date(post.origDate)
    feed.addItem(post)
  })

  return feed
}
