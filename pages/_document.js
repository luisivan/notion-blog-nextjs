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
            data-goatcounter="https://luisc.goatcounter.com/count"
            async
            src="//gc.zgo.at/count.js"
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
