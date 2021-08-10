import Link from 'next/link'
import { Text } from './notion'
import styles from '../pages/index.module.css'

export const PostList = ({ posts }) => (
  <ol className={styles.posts}>
    {posts &&
      posts.map((post) => {
        const date = new Date(post.properties.Date.date.start).toLocaleString(
          'en-US',
          {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }
        )
        return (
          <li
            key={post.properties.Slug.rich_text[0].plain_text}
            className={styles.post}
          >
            <h2 className={styles.postTitle}>
              <Link
                href={`/posts/${post.properties.Slug.rich_text[0].plain_text}`}
              >
                <a>
                  <Text text={post.properties.Name.title} />
                </a>
              </Link>
            </h2>

            <p className={styles.postDescription}>{date}</p>
          </li>
        )
      })}
  </ol>
)
