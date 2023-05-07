import { getPage, getBlocks } from '../../lib/notion'
import BlogHead from '../../components/head'
import { Blocks } from '../../components/notion'
import { SubscribeBlock } from '../../components/subscribe'
import config from '../../config'

export default function About({ blocks }) {
  return (
    <>
      <article className="ablock">
        <BlogHead
          title={`${config.name} | About`}
          description={config.description}
          image={config.defaultPostImage}
          type="website"
        />

        <h2 className="lowkey-title">About</h2>
        <div className="prose dark:prose-invert prose-lg">
          <Blocks blocks={blocks} />
        </div>
      </article>
      <SubscribeBlock substackUsername={config.substackUsername} />
    </>
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
