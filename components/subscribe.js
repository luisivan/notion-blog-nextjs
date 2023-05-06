import { useState } from 'react'

export const Subscribe = ({
  substackUsername,
  className,
  showButtonOnType,
}) => {
  const [email, setEmail] = useState()
  const [subscribed, setSubscribed] = useState()

  const subscribe = async () => {
    setSubscribed('loading')
    const res = await fetch('https://substackapi.com/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        domain: `${substackUsername}.substack.com`,
      }),
    })
    if (res.status !== 200) return alert('Error 🤷‍♀️')
    setSubscribed('yes')
  }
  return (
    <div className={className}>
      <input
        name="email"
        placeholder="your@email.xyz"
        type="email"
        className="grow bg-transparent outline-none xs:w-40 sm:w-64"
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && subscribe()}
      />
      {(!showButtonOnType || (showButtonOnType && email)) && (
        <button className="shrink rounded-full" onClick={subscribe}>
          {{
            loading: <div className="animate-spin text-3xl">⏱</div>,
            yes: (
              <div className="text-green-600 dark:text-green-300 text-3xl">
                ☺
              </div>
            ),
          }[subscribed] || '⏎'}
        </button>
      )}
    </div>
  )
}
