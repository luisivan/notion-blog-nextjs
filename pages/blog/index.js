import { getDatabase, formatPosts } from '../../lib/notion'
import BlogHead from '../../components/head'
import { PostList } from '../../components/list'
import config from '../../config'

export default function Blog({ posts }) {
  return (
    <div className="ablock">
      <BlogHead
        title={`${config.name} | Blog`}
        description={config.description}
        image={config.defaultPostImage}
        type="website"
      />

      <h2 className="lowkey-title">Blog</h2>
      <PostList posts={posts} />
    </div>
  )
}

export const getStaticProps = async () => {
  const rawPosts = await getDatabase(process.env.NOTION_DATABASE_ID)
  const posts = await formatPosts(rawPosts)

  return {
    props: {
      posts,
    },
    revalidate: 1,
  }
}
