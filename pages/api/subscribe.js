const subscribe = async (url, email) => {
  if (res.status === 400) {
  } else if (res.status !== 200) {
    throw res.statusText
    return
  }
}

/**
 * The handler of serverless function
 * @param {Object} req
 * @param {Object} res
 */
const handler = async (req, res) => {
  const { email } = req.query

  try {
    await subscribe('https://thoughtcrime.substack.com', email)
  } catch (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json({ response: 'subscribed!' })
}

module.exports = handler
