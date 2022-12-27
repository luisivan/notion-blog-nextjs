import { getBlock } from '../../lib/notion'
import {Readable} from 'stream';

export default async function proxy(req, res) {
  let url = ''
  if (req.query.url) {
    url = decodeURIComponent(req.query.url)
  } else if (req.query.id) {
    const block = await getBlock(req.query.id)
    url = block.image.file.url
  }
  const result = await fetch(url)
  Readable.fromWeb(result.body).pipe(res)
}
