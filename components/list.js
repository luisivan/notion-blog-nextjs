import Link from 'next/link'
import styles from '../pages/index.module.css'

export const PostList = ({ posts }) => (
  <ol className={styles.posts}>
    {posts &&
      posts.map((post) => {
        return (
          <li key={post.slug} className={styles.post}>
            <h2 className={styles.postTitle}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className={styles.postSummary}>{post.summary}</p>
            <div className={styles.postDate}>{post.date}</div>
          </li>
        )
      })}
  </ol>
)
