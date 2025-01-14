This is a [Next.js](https://nextjs.org/) blog using [Notions Public API](https://developers.notion.com), based off [the original implementation by samuelkraft](https://samuelkraft.com/blog/building-a-notion-blog-with-public-api).

## Features

- Image blocks with lazy loading/blurry loading
- Support for blockquotes
- Optimized tweet embeds
- Support for featured posts
- Support for categories
- Custom Notion page as index page
- Custom Notion page as about page
- Substack subscribe box

## [Demo](https://luisc.xyz)

## Getting Started

First, follow Notions [getting started guide](https://developers.notion.com/docs/getting-started) to get a `NOTION_TOKEN` and a `NOTION_DATABASE_ID`, then add them to a file called `.env.local`.

```
NOTION_TOKEN=
NOTION_DATABASE_ID=
```

Install dependencies

```bash
npm install
# or
yarn
```

Start the server with

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fluisivan%2Fnotion-blog-nextjs&env=NOTION_TOKEN,NOTION_DATABASE_ID&envDescription=Please%20add%20NOTION_TOKEN%20and%20NOTION_DATABASE_ID%20that%20is%20required%20to%20connect%20the%20blog%20to%20your%20notion%20account&envLink=https%3A%2F%2Fdevelopers.notion.com%2Fdocs%2Fgetting-started&project-name=notion-blog-nextjs&repo-name=notion-blog-nextjs&demo-title=Notion%20Blog%20with%20NextJS&demo-description=This%20is%20a%20Next.js%20blog%20using%20Notion's%20Public%20API&demo-url=https%3A%2F%2Fluisc.xyz)
