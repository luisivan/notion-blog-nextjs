import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results;
};

export const getPage = async (databaseId, pageSlug) => {
  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Slug",
      text: {
        equals: pageSlug,
      },
    },
  });
  const response = await notion.pages.retrieve({ page_id: results[0].id });
  return response;
};

export const getCategory = async (databaseId, category) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Category",
      select: {
        equals: category,
      },
    },
  });
  return response.results;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};
