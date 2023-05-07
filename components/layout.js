import { Inter } from 'next/font/google'
import Head from 'next/head'
import config from '../config'
import { Nav } from './nav'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const Layout = ({ children }) => (
  <div className={`px-0 xs:px-4 ${inter.variable}`}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:site_name" content={config.name} />
    </Head>

    <Nav />

    <main className="container mx-auto max-w-screen-sm">{children}</main>
  </div>
)
