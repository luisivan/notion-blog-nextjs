import Head from "next/head";
import Link from "next/link";
import { getDatabase, getCategory } from "../../lib/notion";
import { databaseId } from "../index.js";
import { Text } from "../posts/[slug].js";
import styles from "../index.module.css";

export default function Category({ posts }) {
  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts && posts.map((post) => {
            const date = new Date(post.properties.Date.date.start).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.properties.Slug.rich_text[0].plain_text} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/posts/${post.properties.Slug.rich_text[0].plain_text}`}>
                    <a>
                      <Text text={post.properties.Name.title} />
                    </a>
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
                <Link href={`/posts/${post.properties.Slug.rich_text[0].plain_text}`}>
                  <a> Read post →</a>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database.map((page) => ({ params: { category: page.properties.Category.select.name.toLowerCase() } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { category } = context.params;
  const uppercaseCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const database = await getCategory(databaseId, uppercaseCategory);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
