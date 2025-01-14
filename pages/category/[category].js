import { getDatabase, getCategory, formatPosts } from '../../lib/notion'
import BlogHead from '../../components/head'
import { PostList } from '../../components/list'
import { SubscribeBlock } from '../../components/subscribe'
import config from '../../config'

export default function Category({ name, posts }) {
  return (
    <>
      <div className="ablock">
        <BlogHead
          title={`${config.name} | ${name}`}
          description={config.description}
          image={config.defaultPostImage}
          type="website"
        />
        <h2 className="lowkey-title">{name}</h2>
        <PostList posts={posts} />
      </div>
      <SubscribeBlock substackUsername={config.substackUsername} />
    </>
  )
}

export const getStaticPaths = async () => {
  const database = await getDatabase(process.env.NOTION_DATABASE_ID)
  return {
    paths: database.map((page) => ({
      params: { category: page.properties.Category.select.name.toLowerCase() },
    })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { category } = context.params
  const uppercaseCategory = category.charAt(0).toUpperCase() + category.slice(1)
  const rawPosts = await getCategory(
    process.env.NOTION_DATABASE_ID,
    uppercaseCategory
  )
  const posts = await formatPosts(rawPosts)

  return {
    props: {
      name: uppercaseCategory,
      posts,
    },
    revalidate: 1,
  }
}
