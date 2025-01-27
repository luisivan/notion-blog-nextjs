import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Tweet } from 'react-twitter-widgets'
import config from '../config'
import { Bookmark } from './bookmark'

export const Text = ({ text }) => {
  if (!Array.isArray(text)) {
    return null
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value
    return (
      <span
        className={[
          bold ? 'font-semibold' : '',
          code ? 'font-mono' : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
        key={index}
      >
        {text.link ? (
          text.link.url.startsWith(config.url) ? (
            <Link href={text.link.url}>{text.content}</Link>
          ) : (
            <a href={text.link.url} rel="noopener noreferrer" target="_blank">
              {text.content}
            </a>
          )
        ) : (
          text.content
        )}
      </span>
    )
  })
}

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
        <li key={id}>
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
    case 'image':
      return (
        <Image
          {...value}
          placeholder="blur"
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          alt=""
          className="w-full"
        />
      )
    case 'embed':
      if (value.url.startsWith('https://twitter.com')) {
        const tweetId = /.*\/([^?]+)/.exec(value.url)[1]
        return <Tweet tweetId={tweetId} />
      }
    case 'bookmark':
      return <Bookmark {...value} />
    case 'quote':
      return (
        <blockquote>
          <Text text={value.text} />
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </blockquote>
      )
    default:
      console.log(
        `❌ Unsupported block (${
          type === 'unsupported' ? 'unsupported by Notion API' : type
        })`
      )
      return ''
  }
}

export const Blocks = ({ blocks }) => {
  return (
    <div className="-my-2">
      {blocks.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  )
}
