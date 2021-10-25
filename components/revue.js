import Image from 'next/image'
import React, { useState } from 'react'
import checkmarkIcon from '../public/checkmark.svg'
import subscribeIcon from '../public/subscribe.svg'
import styles from './Revue.module.css'

export const RevueForm = () => {
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()
    await setSubscribed(true)
    fetch('/api/revue', {
      body: JSON.stringify({
        email: e.target.email.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  return (
    <form
      onSubmit={subscribe}
      className="flex flex-grow max-w-full sm:max-w-xs border border-gray-200 justify-center flex-row"
    >
      <input
        placeholder="your@email.com"
        type="email"
        name="email"
        required
        className="flex-grow border-0 pl-2.5 leading-4 outline-none"
      />
      <button
        type="submit"
        value="Subscribe"
        name="member[subscribe]"
        id="member_submit"
        className="border-0 bg-transparent pt-1.5 pb-0.5 pr-2 cursor-pointer hover:opacity-75 active:opacity-50 transition-opacity duration-300"
      >
        <Image
          src={!subscribed ? subscribeIcon : checkmarkIcon}
          width={18}
          height={18}
          className={!subscribed ? styles.subscribeIcon : styles.checkmarkIcon}
          alt="Subscribe"
        />
      </button>
    </form>
  )
}
