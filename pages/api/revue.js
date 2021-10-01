export default async function addSubscriber(req, res) {
  const { email } = req.body
  if (!email) {
    res.status(400).end()
  }

  const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REVUE_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, double_opt_in: true }),
  })

  res.status(result.ok ? 200 : 500).end()
}
