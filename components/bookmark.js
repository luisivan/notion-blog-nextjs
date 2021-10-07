import Image from 'next/image'
import styles from './Blocks.module.css'

export const Bookmark = ({ title, description, icon, image, url }) => (
  <div className={styles.bookmark}>
    {title}
    {description}
    <img src={icon} />
    <img src={image} />
    {url}
  </div>
)
