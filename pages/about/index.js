import { getPage, getBlocks } from '../../lib/notion'
import BlogHead from '../../components/head'
import { Blocks } from '../../components/notion'
import config from '../../config'

export default function About({ blocks }) {
  const subscribe = async (url, email) => {
    console.log(url)
    console.log(email)

    try {
      const res = await fetch(`${url}/api/v1/free`, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          first_url: `${url}/subscribe`,
          first_referrer: '',
          current_url: `${url}/subscribe`,
          current_referrer: '',
          referral_code: '',
          source: 'subscribe_page',
          email,
        }),
      })
      if (res.status === 400) {
        res.status(400).json({
          success: false,
          message: 'BAD_REQUEST',
        })
        return
      } else if (res.status !== 200) {
        res.status(500).json({
          success: false,
          message: 'UNEXPECTED_ERROR',
        })
        return
      }
      const res2 = await fetch(`${url}/welcome?email=${email}`)
      console.log(`${res.status} subscribed ${email} to ${url}`)
    } catch (error) {
      throw new Error(error)
    }
  }

  subscribe(
    'https://thoughtcrime.substack.com',
    encodeURI('licuende+test3@gmail.com')
  )

  return (
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
