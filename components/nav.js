import Image from 'next/image'
import Link from 'next/link'
import config from '../config'
import styles from '../pages/index.module.css'

export const Nav = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <Link href="/" passHref>
        <a>
          <Image src="/logo.jpg" alt="" width="48" height="48" />
          <h1>{config.name}</h1>
        </a>
      </Link>
    </div>
    <nav className={styles.nav}>
      <Link href="/blog">Blog</Link>
      <Link href={`https://twitter.com/${config.twitter}`}>Twitter</Link>
      <Link href="/about">About</Link>
    </nav>
  </header>
)
