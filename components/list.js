import Link from 'next/link'

export const PostList = ({ posts }) => (
  <ol>
    {posts &&
      posts.map((post) => {
        return (
          <li key={post.slug}>
            <h2 className="text-3xl font-display font-bold mt-6 mb-2">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-base">{post.summary}</p>
            <div className="text-base text-gray-500 dark:text-gray-300 my-2">
              {post.date}
            </div>
          </li>
        )
      })}
  </ol>
)
