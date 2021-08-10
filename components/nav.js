import { clearConfigCache } from 'prettier'
import config from '../config'
import styles from '../pages/index.module.css'

export const Nav = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <h1>
        <a href="/">{config.name}</a>
      </h1>
    </div>
    <nav className={styles.nav}>
      <a href="/blog">Blog</a>
      <a href={`https://twitter.com/${config.twitter}`}>Twitter</a>
      <a href="/about">About</a>
    </nav>
  </header>
)
