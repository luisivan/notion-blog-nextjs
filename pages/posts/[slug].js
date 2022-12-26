import Link from 'next/link'
import Script from 'next/script'
import { getDatabase, getPost, formatPost } from '../../lib/notion'
import BlogHead from '../../components/head'
import { Blocks } from '../../components/notion'
import config from '../../config'

export default function Post({ post }) {
  console.log(post)
  if (typeof window !== 'undefined') {
    window.CustomSubstackWidget = {
      substackUrl: `${config.substackUsername}.substack.com`,
      placeholder: 'example@gmail.com',
      buttonText: 'Subscribe',
      theme: 'custom',
      colors: {
        primary: '#60A5FA',
        input: '#FFFFFF',
        email: '#60A5FA',
        text: '#FFFFFF',
      },
    }
  }
  if (!post) {
    return <div />
  }
  return (
    <div>
      <article>
        <BlogHead
          title={`${post.title} | ${config.name}`}
          description={post.summary}
          image={post.image}
          type="article"
        />

        <div className="text-xs text-gray-500">{post.date}</div>
        <h1 className="text-5xl font-semibold font-display leading-snug mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-400">
          {post.title}
        </h1>

        <section className="prose prose-lg prose-blue">
          <Blocks blocks={post.blocks} />
        </section>
      </article>
      <div className="flex justify-between pt-8 gap-x-4 border-t border-gray-200 flex-col-reverse sm:flex-row">
        {config.substackUsername ? (
          <>
            <div id="custom-substack-embed"></div>
            <Script src="https://substackapi.com/widget.js" />
          </>
        ) : (
          ''
        )}
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
