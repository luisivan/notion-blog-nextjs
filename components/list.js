import Link from 'next/link'

export const PostList = ({ posts }) => (
  <ol>
    {posts &&
      posts.map((post) => {
        return (
          <li key={post.slug} className="mb-8">
            <h2 className="text-3xl font-display font-bold mt-6 mb-4">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-base">{post.summary}</p>
            <div className="text-base my-2 opacity-70">{post.date}</div>
          </li>
        )
      })}
  </ol>
)
