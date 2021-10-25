import { getPage, getBlocks } from '../../lib/notion'
import BlogHead from '../../components/head'
import { Blocks } from '../../components/notion'
import config from '../../config'

export default function About({ blocks }) {
  return (
    <article>
      <BlogHead
        title={`${config.name} | About`}
        description={config.description}
        image={config.defaultPostImage}
        type="website"
      />

      <h2 className="text-4xl font-semibold font-display mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-400">
        About
      </h2>
      <div className="prose prose-lg prose-blue">
        <Blocks blocks={blocks} />
      </div>
    </article>
  )
}

export const getStaticProps = async () => {
  const page = await getPage(config.aboutPageId)
  const blocks = await getBlocks(page.id)

  return {
    props: {
      blocks,
    },
    revalidate: 1,
  }
}
