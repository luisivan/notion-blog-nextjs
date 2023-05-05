import Link from 'next/link'
import { getDatabase, getPost, formatPost } from '../../lib/notion'
import BlogHead from '../../components/head'
import { Blocks } from '../../components/notion'
import { Subscribe } from '../../components/subscribe'
import config from '../../config'

export default function Post({ post }) {
  if (!post) {
    return <div />
  }
  console.log(config.substackUsername)
  return (
    <div>
      <article className="block">
        <BlogHead
          title={`${post.title} | ${config.name}`}
          description={post.summary}
          image={post.image}
          type="article"
        />

        <div className="text-xs text-gray-500">{post.date}</div>
        <h1 className="text-5xl font-semibold font-display leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-400 -mb-4">
          {post.title}
        </h1>

        <section className="prose prose-lg prose-blue -mb-4">
          <Blocks blocks={post.blocks} />
        </section>
      </article>
      <div className="block flex justify-between gap-x-4 flex-col-reverse sm:flex-row">
        {config.substackUsername ? (
          <Subscribe substackUsername={config.substackUsername} />
        ) : (
          ''
        )}
        <div className="flex flex-grow sm:justify-end justify-between mb-8 sm:mb-0 flex-wrap items-center">
          <Link
            href={`/category/${post.category.toLowerCase()}`}
            className="sm:border-r border-r-0 border-gray-300 pr-4 text-blue-400"
          >
            {post.category}
          </Link>
          <Link href="/blog" className="pl-4 text-blue-400">
            More posts →
          </Link>
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
