import { getDatabase, getCategory } from "../../lib/notion";
import { databaseId } from "../index.js";
import { PostList } from "../../components/list";
import styles from "../index.module.css";

export default function Category({ posts }) {
  return (
    <div>
      <h2 className={styles.heading}>All Posts</h2>
      <PostList posts={posts} />
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
  const posts = await getCategory(databaseId, uppercaseCategory);

  return {
    props: {
      posts
    },
    revalidate: 1,
  };
};
