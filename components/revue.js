import Image from 'next/image'
import config from '../config'
import styles from '../pages/post.module.css'

export const RevueForm = () => (
  <form
    action={`https://www.getrevue.co/profile/${config.revueUsername}/add_subscriber`}
    method="post"
    id="revue-form"
    name="revue-form"
    target="_blank"
    className={styles.revue}
  >
    <input
      placeholder="your@email.com"
      type="email"
      name="member[email]"
      id="member_email"
    />
    <button
      type="submit"
      value="Subscribe"
      name="member[subscribe]"
      id="member_submit"
    >
      <Image src="/subscribe.svg" width={18} height={18} />
    </button>
  </form>
)
