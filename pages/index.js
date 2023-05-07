import { getPage, getBlocks, getFeatured, formatPosts } from '../lib/notion'
import BlogHead from '../components/head'
import { PostList } from '../components/list'
import { Blocks } from '../components/notion'
import { SubscribeBlock } from '../components/subscribe'
import config from '../config'

export default function Home({ blocks, posts }) {
  return (
    <div>
      <BlogHead
        title={config.name}
        description={config.description}
        image={config.defaultPostImage}
        type="website"
      />

      <main className="ablock prose dark:prose-invert prose-xl font-display">
        <Blocks blocks={blocks} />
      </main>
      <SubscribeBlock substackUsername={config.substackUsername} />
      <div className="ablock">
        <h2 className="lowkey-title">Featured posts</h2>
        <PostList posts={posts} />
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const rawPosts = await getFeatured(process.env.NOTION_DATABASE_ID)
  const posts = await formatPosts(rawPosts)
  const page = await getPage(config.introPageId)
  const blocks = await getBlocks(page.id)

  return {
    props: {
      posts,
      blocks,
    },
    revalidate: 1,
  }
}
