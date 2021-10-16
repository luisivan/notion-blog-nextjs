import Link from 'next/link'
import { getDatabase, getPost, formatPost } from '../../lib/notion'
import BlogHead from '../../components/head'
import { Blocks } from '../../components/notion'
import { RevueForm } from '../../components/revue'
import config from '../../config'
import styles from '../post.module.css'

export default function Post({ post }) {
  if (!post) {
    return <div />
  }
  return (
    <div>
      <article className="prose prose-lg prose-blue">
        <BlogHead
          title={`${post.title} | ${config.name}`}
          description={post.summary}
          image={post.image}
          type="article"
        />

        <div className={styles.date}>{post.date}</div>
        <h1 className="pageTitle">{post.title}</h1>

        <section>
          <Blocks blocks={post.blocks} />
        </section>
      </article>
      <div className={styles.footer}>
        {config.revueUsername ? <RevueForm /> : ''}
        <div className={styles.footerLinks}>
          <Link href={`/category/${post.category.toLowerCase()}`}>
            {post.category}
          </Link>
          <Link href="/blog">More posts →</Link>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const database = await getDatabase(process.env.NOTION_DATABASE_ID)
  return {
    paths: database.map((post) => ({
      params: { slug: post.properties.Slug.rich_text[0].plain_text },
    })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params
  const rawPost = await getPost(process.env.NOTION_DATABASE_ID, slug)
  const post = await formatPost(rawPost, true)

  return {
    props: {
      post,
    },
    revalidate: 1,
  }
}
