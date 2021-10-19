import Link from 'next/link'
import { getDatabase, getPost, formatPost } from '../../lib/notion'
import BlogHead from '../../components/head'
import { Blocks } from '../../components/notion'
import { RevueForm } from '../../components/revue'
import config from '../../config'

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

        <div className="text-xs text-gray-500 mb-2">{post.date}</div>
        <h1 className="pageTitle">{post.title}</h1>

        <section>
          <Blocks blocks={post.blocks} />
        </section>
      </article>
      <div className="flex justify-between pt-8 gap-x-4 border-t border-gray-200 flex-col-reverse sm:flex-row">
        {config.revueUsername ? <RevueForm /> : ''}
        <div className="flex flex-grow sm:justify-end justify-between mb-8 sm:mb-0 flex-wrap items-center">
          <Link href={`/category/${post.category.toLowerCase()}`}>
            <a className="sm:border-r border-r-0 border-gray-300 pr-4 text-blue-400">
              {post.category}
            </a>
          </Link>
          <Link href="/blog">
            <a className="pl-4 text-blue-400">More posts →</a>
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
