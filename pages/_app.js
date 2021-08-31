import { Layout } from '../components/layout'
import 'normalize.css/normalize.css'
import '../styles/globals.css'

function Blog({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default Blog
