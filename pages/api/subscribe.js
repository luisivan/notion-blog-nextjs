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
      body: JSON.stringify({
        additional_referring_pub_ids: '',
        current_referrer: '',
        current_url: `${encodeURIComponent(url)}`,
        email: `${encodeURIComponent(email)}`,
        first_referrer: `${encodeURIComponent('https://substack.com/')}`,
        first_url: `${encodeURIComponent(url)}`,
        referral_code: '',
        referring_pub_id: '',
        source: `${encodeURIComponent('cover_page')}`,
      }),
    })
    console.log(`${res.status} subscribed ${email} to ${url}`)
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
    await subscribe('https://thoughtcrime.substack.com', 'me+test2@luisc.xyz')
  } catch (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json({ response: 'subscribed!' })
}

module.exports = handler
