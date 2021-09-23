import { Client } from '@notionhq/client'
import config from '../config'

const notion = new Client({
  auth: config.token,
})

export const getDatabase = async (databaseId) => {
  const { results } = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })
  return results
}

export const getPost = async (databaseId, pageSlug) => {
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Slug',
      text: {
        equals: pageSlug,
      },
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
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  })
  return results
}

export const getFeatured = async (databaseId) => {
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Featured',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
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

export const getUrlFromImageBlock = (block) => {
  return block.image.type === 'external'
    ? block.image.external.url
    : block.image.file.url
}

export const formatPost = async ({ id, properties }, fetchBlocks) => {
  let post = {
    id,
    slug: properties.Slug.rich_text[0].plain_text,
    title: properties.Name.title[0].text.content,
    summary: properties.Summary.rich_text,
    date: new Date(properties.Date.date.start),
    category: properties.Category.select.name,
  }

  if (fetchBlocks) {
    post.blocks = await getBlocks(post.id)
    const imageBlock = post.blocks.find((block) => block.type == 'image')
    post.image = imageBlock
      ? getUrlFromImageBlock(imageBlock)
      : config.defaultPostImage
  }
  return post
}

export const formatPosts = async (rawPosts) => {
  return await Promise.all(rawPosts.map((post) => formatPost(post, false)))
}
