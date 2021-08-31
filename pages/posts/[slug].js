import Head from 'next/head'
import Link from 'next/link'
import { getDatabase, getPost, getBlocks } from '../../lib/notion'
import { Text, Blocks } from '../../components/notion'
import config from '../../config'
import { databaseId } from '../index.js'
import styles from '../post.module.css'

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />
  }
  const pageTitle = page.properties.Name.title[0].text.content
  return (
    <article>
      <Head>
        <title>
          {pageTitle} | {config.name}
        </title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="article" />
      </Head>

      <div className={styles.date}>{page.properties.Date.date.start}</div>
      <h1 class="pageTitle">
        <Text text={page.properties.Name.title} />
      </h1>

      <section>
        <Blocks blocks={blocks} />
      </section>
      <div className={styles.endLinks}>
        <Link
          href={`/category/${page.properties.Category.select.name.toLowerCase()}`}
        >
          {page.properties.Category.select.name}
        </Link>
        <Link href="/blog">More posts →</Link>
      </div>
      <iframe className={styles.substack} src="https://thoughtcrime.substack.com/embed" frameborder="0" scrolling="no"></iframe>
    </article>
  )
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId)
  return {
    paths: database.map((page) => ({
      params: { slug: page.properties.Slug.rich_text[0].plain_text },
    })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params
  const page = await getPost(databaseId, slug)
  const blocks = await getBlocks(page.id)

  return {
    props: {
      page,
      blocks,
    },
    revalidate: 1,
  }
}
