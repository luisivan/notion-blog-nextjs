import Image from 'next/image'
import Link from 'next/link'
import config from '../config'
import { IconTwitter } from './icons'

export const Nav = () => (
  <header className="container mx-auto max-w-screen-sm flex justify-between  ablock lowercase">
    <Link href="/" className="flex items-center">
      <h1 className="text-sm md:text-xl bg-clip-text">
        {config.emoji} {config.name}
      </h1>
    </Link>
    <nav className="flex justify-between items-center gap-6">
      <Link href="/blog">Posts</Link>
      <Link href="/about">About</Link>
      <Link href={`https://twitter.com/${config.twitter}`}>
        <IconTwitter className="text-sky-500" />
      </Link>
    </nav>
  </header>
)
