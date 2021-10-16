import { getPage, getBlocks } from '../../lib/notion'
import BlogHead from '../../components/head'
import { Blocks } from '../../components/notion'
import config from '../../config'

export default function About({ blocks }) {
  return (
    <article className="prose prose-lg prose-blue">
      <BlogHead
        title={`${config.name} | About`}
        description={config.description}
        image={config.defaultPostImage}
        type="website"
      />

      <h2 className="pageTitle">About</h2>
      <Blocks blocks={blocks} />
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
