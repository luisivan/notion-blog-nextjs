import Link from 'next/link'
import { Fragment } from 'react'
import { getDatabase, getPage, getBlocks } from '../../lib/notion'
import { Text } from '../../components/notion'
import { databaseId } from '../index.js'
import styles from '../post.module.css'

const renderBlock = (block) => {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <Text text={value.text} />
        </p>
      )
    case 'heading_1':
      return (
        <h1>
          <Text text={value.text} />
        </h1>
      )
    case 'heading_2':
      return (
        <h2>
          <Text text={value.text} />
        </h2>
      )
    case 'heading_3':
      return (
        <h3>
          <Text text={value.text} />
        </h3>
      )
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <Text text={value.text} />
        </li>
      )
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <Text text={value.text} />
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      )
    case 'child_page':
      return <p>{value.title}</p>
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`
  }
}

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />
  }
  return (
    <article>
      <h1 className={styles.name}>
        <Text text={page.properties.Name.title} />
      </h1>
      <p>{page.properties.Date.date.start}</p>
      <Link
        href={`/category/${page.properties.Category.select.name.toLowerCase()}`}
      >
        {page.properties.Category.select.name}
      </Link>
      <section>
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
        <Link href="/">
          <a className={styles.back}>← Go home</a>
        </Link>
      </section>
    </article>
  )
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId)
  return {
    paths: database.map((page) => ({
      params: { slug: page.properties.Slug.rich_text[0].plain_text },
    })),
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params
  const page = await getPage(databaseId, slug)
  const blocks = await getBlocks(page.id)

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
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

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  }
}
