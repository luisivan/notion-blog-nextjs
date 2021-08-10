import Head from 'next/head'
import { getPage, getBlocks, getFeatured } from '../lib/notion'
import { PostList } from '../components/list'
import { Blocks } from '../components/notion'
import config from '../config'
import styles from './index.module.css'

export const databaseId = process.env.NOTION_DATABASE_ID

export default function Home({ blocks, posts }) {
  return (
    <div>
      <Head>
        <title>{config.name}</title>
        <meta property="og:title" content={config.name} />
        <meta property="og:type" content="website" />
      </Head>

      <Blocks blocks={blocks} />
      <h2 className={styles.heading}>Featured posts</h2>
      <PostList posts={posts} />
    </div>
  )
}

export const getStaticProps = async () => {
  const posts = await getFeatured(databaseId)
  const page = await getPage(config.bioPageId)
  const blocks = await getBlocks(page.id)

  return {
    props: {
      posts,
      blocks,
    },
    revalidate: 1,
  }
}
