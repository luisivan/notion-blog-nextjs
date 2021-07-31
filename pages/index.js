import { getDatabase } from '../lib/notion'
import { PostList } from '../components/list'
import styles from './index.module.css'

export const databaseId = process.env.NOTION_DATABASE_ID

export default function Home({ posts }) {
  return (
    <div>
      <h2 className={styles.heading}>All Posts</h2>
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
