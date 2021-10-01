import FormData from 'form-data'

export default async function addSubscriber(req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400)
  }

  const formData = new FormData()
  formData.append('email', email)
  formData.append('double_opt_in', 'true')
  console.log(process.env.REVUE_SECRET_KEY)

  const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REVUE_SECRET_KEY}`,
    },
    body: formData,
  })
  console.log(result)
  const data = await result.json()

  return res.status(result.ok ? 200 : 500)
}
