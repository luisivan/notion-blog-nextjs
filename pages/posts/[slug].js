import Head from 'next/head'
import Link from 'next/link'
import { getDatabase, getPost, formatPost } from '../../lib/notion'
import { Blocks } from '../../components/notion'
import { RevueForm } from '../../components/revue'
import config from '../../config'
import styles from '../post.module.css'

export default function Post({ post }) {
  if (!post) {
    return <div />
  }
  return (
    <article>
      <Head>
        <title>
          {post.title} | {config.name}
        </title>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Head>

      <div className={styles.date}>{post.date}</div>
      <h1 className="pageTitle">{post.title}</h1>

      <section>
        <Blocks blocks={post.blocks} />
      </section>
      <div className={styles.footer}>
        {config.revueUsername ? <RevueForm /> : ''}
        <div className={styles.footerLinks}>
          <Link href={`/category/${post.category.toLowerCase()}`}>
            {post.category}
          </Link>
          |<Link href="/blog">More posts →</Link>
        </div>
      </div>
    </article>
  )
}

export const getStaticPaths = async () => {
  const database = await getDatabase(config.databaseId)
  return {
    paths: database.map((post) => ({
      params: { slug: post.properties.Slug.rich_text[0].plain_text },
    })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params
  const rawPost = await getPost(config.databaseId, slug)
  const post = await formatPost(rawPost, true)

  return {
    props: {
      post,
    },
    revalidate: 1,
  }
}
