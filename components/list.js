import Link from 'next/link'
import { Text } from './notion'
import styles from '../pages/index.module.css'

export const PostList = ({ posts }) => (
  <ol className={styles.posts}>
    {posts &&
      posts.map((post) => {
        const date = post.date.toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })
        return (
          <li key={post.slug} className={styles.post}>
            <h2 className={styles.postTitle}>
              <Link href={`/posts/${post.slug}`}>
                <a>
                  <Text text={post.title} />
                </a>
              </Link>
            </h2>
            <p className={styles.postSummary}>
              <Text text={post.summary} />
            </p>
            <div className={styles.postDate}>{date}</div>
          </li>
        )
      })}
  </ol>
)
