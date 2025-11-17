import { join, extname } from 'node:path'
import fs from 'node:fs/promises'

const mime = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
}

export async function toDataURL(fileName: string) {
  const dir = 'prisma/images'
  const filePath = join(dir, fileName)
  const buffer = await fs.readFile(filePath)
  const base64 = buffer.toString('base64')

  const ext = extname(filePath)
  const type = mime[ext]

  return `data:${type};base64,${base64}`
}
