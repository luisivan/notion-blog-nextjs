import Head from 'next/head'
import config from '../config'
import { Nav } from './nav'
import styles from '../pages/index.module.css'

export const Layout = ({ children }) => (
  <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:site_name" content={config.name} />
    </Head>

    <Nav />

    <main className="container mx-auto max-w-screen-sm">{children}</main>
  </div>
)
