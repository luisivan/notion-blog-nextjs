import Image from 'next/image'
import { Fragment } from 'react'
import ReactMarkdown from 'react-markdown/react-markdown.min'
import { Tweet } from 'react-twitter-widgets'
import styles from './Blocks.module.css'

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
          bold ? styles.bold : '',
          code ? styles.code : '',
          italic ? styles.italic : '',
          strikethrough ? styles.strikethrough : '',
          underline ? styles.underline : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
        key={index}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    )
  })
}

const textToPlain = (block) => {
  return block.text.map((item) => item.text.content).join('')
}

const renderBlock = (block) => {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      if (value.text[0] && value.text[0].text.content.startsWith('!m ')) {
        return <ReactMarkdown>{textToPlain(value).slice(3)}</ReactMarkdown>
      }
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
        <Image {...block.image} placeholder="blur" layout="responsive" alt="" />
      )
    case 'embed':
      if (value.url.startsWith('https://twitter.com')) {
        const tweetId = /.*\/([^?]+)/.exec(value.url)[1]
        return <Tweet tweetId={tweetId} />
      }
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
    <div>
      {blocks.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  )
}
