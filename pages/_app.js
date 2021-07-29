import { Layout } from "../components/layout";
import "../styles/globals.css";

function Blog({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default Blog;
