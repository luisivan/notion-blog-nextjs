import Head from 'next/head'
import { getPage, getBlocks } from '../../lib/notion'
import { Blocks } from '../../components/notion'
import config from '../../config'

export default function About({ blocks }) {
  return (
    <article>
      <Head>
        <title>{config.name} | About</title>
        <meta property="og:title" content={config.name} />
        <meta property="og:type" content="website" />
      </Head>

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
