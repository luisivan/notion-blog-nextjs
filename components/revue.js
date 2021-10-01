import Image from 'next/image'
import React, { useState } from 'react'
import checkmarkIcon from '../public/checkmark.svg'
import subscribeIcon from '../public/subscribe.svg'
import styles from '../pages/post.module.css'

export const RevueForm = () => {
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()
    await fetch('/api/revue', {
      body: JSON.stringify({
        email: e.target.email.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    setSubscribed(true)
  }

  return (
    <form onSubmit={subscribe} className={styles.revue}>
      <input placeholder="your@email.com" type="email" name="email" required />
      <button
        type="submit"
        value="Subscribe"
        name="member[subscribe]"
        id="member_submit"
      >
        <Image
          src={!subscribed ? subscribeIcon : checkmarkIcon}
          width={18}
          height={18}
          className={!subscribed ? styles.subscribeIcon : styles.checkmarkIcon}
        />
      </button>
    </form>
  )
}
