import Head from "next/head";
import { Nav } from "./nav";
import styles from "../pages/index.module.css";

export const Layout = ({ children }) => (
  <div>
    <Head>
      <title>Notion Next.js blog</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav />

    <main className={styles.container}>{children}</main>
  </div>
);
