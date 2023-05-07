import Document, { Html, Head, Main, NextScript } from 'next/document'

class BlogDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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
        <body className={this.props.theme}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default BlogDocument
