import Head from 'next/head'
import { getDatabase, getCategory } from '../../lib/notion'
import { PostList } from '../../components/list'
import config from '../../config'
import { databaseId } from '../index.js'
import styles from '../index.module.css'

export default function Category({ name, posts }) {
  return (
    <div>
      <Head>
        <title>
          {config.name} | {name}
        </title>
        <meta property="og:title" content={name} />
        <meta property="og:type" content="website" />
      </Head>

      <h2 className={styles.heading}>{name}</h2>
      <PostList posts={posts} />
    </div>
  )
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId)
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
  const posts = await getCategory(databaseId, uppercaseCategory)

  return {
    props: {
      name: uppercaseCategory,
      posts,
    },
    revalidate: 1,
  }
}
