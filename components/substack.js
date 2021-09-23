import config from '../config'
import styles from '../pages/post.module.css'

export const SubstackForm = () => (
  <iframe
    className={styles.substack}
    src={`https://${config.substackUsername}.substack.com/embed`}
    frameBorder="0"
    scrolling="no"
  ></iframe>
)
