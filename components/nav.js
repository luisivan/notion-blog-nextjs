import config from '../config'
import styles from '../pages/index.module.css'

export const Nav = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <a href="/">
        <img src="/logo.jpg" />
        <h1>{config.name}</h1>
      </a>
    </div>
    <nav className={styles.nav}>
      <a href="/blog">Blog</a>
      <a href={`https://twitter.com/${config.twitter}`}>Twitter</a>
      <a href="/about">About</a>
    </nav>
  </header>
)
