import styles from './Blocks.module.css'

export const Bookmark = ({ title, description, icon, image, url }) => (
  <a className={styles.bookmark} href={url}>
    <div className={styles.bookmarkData}>
      <span className={styles.bookmarkTitle}>{title}</span>
      <span className={styles.bookmarkDescription}>{description}</span>
      <div className={styles.bookmarkLink}>
        <img src={icon} width={16} height={16} />
        <span className={styles.bookmarkUrl}>{url}</span>
      </div>
    </div>
    <div
      className={styles.bookmarkImage}
      style={{
        backgroundImage: `url(${image})`,
      }}
    ></div>
  </a>
)
