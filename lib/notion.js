import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{
      property: 'Date',
      direction: 'descending',
    }],
  })
  return response.results
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
  const response = await notion.pages.retrieve({ page_id: results[0].id })
  return response
}

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getCategory = async (databaseId, category) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Category',
      select: {
        equals: category,
      },
    },
    sorts: [{
      property: 'Date',
      direction: 'descending',
    }],
  })
  return response.results
}

export const getFeatured = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Featured',
      checkbox: {
        equals: true,
      },
    },
    sorts: [{
      property: 'Date',
      direction: 'descending',
    }],
  })
  return response.results
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