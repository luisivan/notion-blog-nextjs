import Document, { Html, Head, Main, NextScript } from 'next/document'

class BlogDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          />
          <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
          <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
          <link
            rel="alternate"
            type="application/feed+json"
            href="/feed.json"
          />
          <meta name="theme-color" content="#5D93FF" />
          <script
            data-respect-dnt
            defer
            src="https://cdn.splitbee.io/sb.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default BlogDocument
