import { getPage, getBlocks, getFeatured, formatPosts } from '../lib/notion'
import BlogHead from '../components/head'
import { PostList } from '../components/list'
import { Blocks } from '../components/notion'
import { Subscribe } from '../components/subscribe'
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

      <main className="prose prose-2xl font-display">
        <Blocks blocks={blocks} />
        {config.substackUsername ? (
          <Subscribe substackUsername={config.substackUsername} />
        ) : (
          ''
        )}
      </main>
      <h2 className="text-base text-gray-500 font-bold uppercase pb-1 border-b border-gray-60 mt-8">
        Featured writing
      </h2>
      <PostList posts={posts} />
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
