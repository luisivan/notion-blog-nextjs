/**
 * Queries the substack API
 * Sends the email to the substack subscribe API for the publication specified in the url option
 * @param {string} url the URL of the publication
 * @param {string} email the email that needs to be added as a subscriber to the newsletter
 */
const subscribe = async (url, email) => {
  console.log(url)
  console.log(email)
  console.log(`${url}/api/v1/free`)

  try {
    const res = await fetch(`${url}/api/v1/free`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authority: 'thoughtcrime.substack.com',
        origin: url,
        referer: `${url}/embed`,
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0',
      },
      body: JSON.stringify({
        email,
        first_url: 'https://thoughtcrime.substack.com/embed',
        first_referrer: '',
        current_url: 'https://thoughtcrime.substack.com/embed',
        current_referrer: '',
        referral_code: '',
        source: 'embed',
      }),
    })
    if (res.status === 400) {
      console.log(res.statusText)
      return
    } else if (res.status !== 200) {
      console.log(res.statusText)
      return
    }
    console.log(res)
    console.log(`${res.status} subscribed ${email} to ${url}`)
    const res2 = await fetch(`${url}/welcome?email=${email}`)
    console.log(res2)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

/**
 * The handler of serverless function
 * @param {Object} req
 * @param {Object} res
 */
const handler = async (req, res) => {
  // const { email } = req.body

  try {
    await subscribe(
      'https://thoughtcrime.substack.com',
      'nmf8zzg4c@relay.firefox.com'
    )
  } catch (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json({ response: 'subscribed!' })
}

module.exports = handler
