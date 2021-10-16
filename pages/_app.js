import { Layout } from '../components/layout'
import 'normalize.css/normalize.css'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

export default function Blog({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
