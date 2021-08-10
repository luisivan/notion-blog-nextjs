import Head from 'next/head'
import { getDatabase } from '../../lib/notion'
import { PostList } from '../../components/list'
import config from '../../config'
import styles from '../index.module.css'

export const databaseId = process.env.NOTION_DATABASE_ID

export default function Blog({ posts }) {
  return (
    <div>
      <Head>
        <title>{config.name} | Blog</title>
        <meta property="og:title" content={config.name} />
        <meta property="og:type" content="website" />
      </Head>

      <h2 className={styles.heading}>Blog</h2>
      <PostList posts={posts} />
    </div>
  )
}

export const getStaticProps = async () => {
  const posts = await getDatabase(databaseId)

  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}
