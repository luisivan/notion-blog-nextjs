import Image from 'next/image'
import Link from 'next/link'
import config from '../config'
import logo from '../public/logo.jpg'

export const Nav = () => (
  <header className="container mx-auto max-w-screen-lg flex justify-between py-5 font-display text-sm md:text-base">
    <Link href="/" passHref>
      <a className="flex items-center">
        <Image src={logo} alt="" width="48" height="48" />
        <h1 className="text-sm md:text-xl ml-4 bg-clip-text">{config.name}</h1>
      </a>
    </Link>
    <nav className="flex justify-between items-center">
      <Link href="/blog">
        <a className="mx-4">Blog</a>
      </Link>
      <Link href={`https://twitter.com/${config.twitter}`}>
        <a className="mx-4">Twitter</a>
      </Link>
      <Link href="/about">
        <a className="mx-4">About</a>
      </Link>
    </nav>
  </header>
)
