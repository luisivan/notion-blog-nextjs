import { getPage, getBlocks, getFeatured, formatPosts } from '../lib/notion'
import BlogHead from '../components/head'
import { PostList } from '../components/list'
import { Blocks } from '../components/notion'
import config from '../config'
import styles from './index.module.css'

export default function Home({ blocks, posts }) {
  return (
    <div>
      <BlogHead
        title={config.name}
        description={config.description}
        image={config.defaultPostImage}
        type="website"
      />

      <main className={styles.intro}>
        <Blocks blocks={blocks} />
      </main>
      <h2 className={styles.heading}>Featured writing</h2>
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
