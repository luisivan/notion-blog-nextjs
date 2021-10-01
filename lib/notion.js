import { Client } from '@notionhq/client'
import { getPlaiceholder } from 'plaiceholder'
import config from '../config'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const publishedFilter = {
  property: 'Published',
  checkbox: {
    equals: true,
  },
}

const dateSort = {
  property: 'Date',
  direction: 'descending',
}

export const getDatabase = async (databaseId) => {
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: publishedFilter,
    sorts: [dateSort],
  })
  return results
}

export const getPost = async (databaseId, pageSlug) => {
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Slug',
          text: {
            equals: pageSlug,
          },
        },
        publishedFilter,
      ],
    },
  })
  return await notion.pages.retrieve({ page_id: results[0].id })
}

export const getPage = async (pageId) => {
  return await notion.pages.retrieve({ page_id: pageId })
}

export const getCategory = async (databaseId, category) => {
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Category',
      select: {
        equals: category,
      },
    },
    sorts: [dateSort],
  })
  return results
}

export const getFeatured = async (databaseId) => {
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Featured',
          checkbox: {
            equals: true,
          },
        },
        publishedFilter,
      ],
    },
    sorts: [dateSort],
  })
  return results
}

const fetchBlocks = async (blockId, start_cursor) => {
  let results = []

  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
    start_cursor: start_cursor,
  })
  results.push(...response.results)
  if (response.has_more) {
    fetchBlocks(blockId, response.next_cursor)
  } else {
    return results
  }
}

export const getBlocks = async (blockId) => {
  const blocks = await fetchBlocks(blockId)

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        }
      })
  )
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find(
        (x) => x.id === block.id
      )?.children
    }
    return block
  })
  return blocksWithChildren
}

const getUrlFromImageBlock = (block) => {
  return block.image.type === 'external'
    ? block.image.external.url
    : block.image.file.url
}

export const formatPost = async ({ id, properties }, fetchBlocks) => {
  let post = {
    id,
    slug: properties.Slug.rich_text[0].plain_text,
    title: properties.Name.title[0].text.content,
    summary: properties.Summary.rich_text[0].plain_text,
    date: new Date(properties.Date.date.start).toLocaleDateString('en-GB'),
    origDate: properties.Date.date.start,
    category: properties.Category.select.name,
  }

  if (fetchBlocks) {
    post.blocks = await getBlocks(post.id)
    post.image = config.defaultPostImage
    for (let i in post.blocks) {
      if (post.blocks[i].type == 'image') {
        if (post.image === config.defaultPostImage) {
          post.image = getUrlFromImageBlock(post.blocks[i])
        }
        const { img, base64 } = await getPlaiceholder(
          getUrlFromImageBlock(post.blocks[i]),
          { size: 64 }
        )
        if (post.blocks[i].image.type === 'external') {
          img.src = `/api/imageproxy?url=${encodeURIComponent(img.src)}`
        }
        post.blocks[i] = {
          type: 'image',
          image: {
            ...img,
            blurDataURL: base64,
          },
        }
      }
    }
  }
  return post
}

export const formatPosts = async (rawPosts) => {
  return await Promise.all(rawPosts.map((post) => formatPost(post, false)))
}
