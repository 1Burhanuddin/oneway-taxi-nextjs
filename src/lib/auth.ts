import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function verifyAdmin() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin-token')?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    return decoded
  } catch (error) {
    return null
  }
}

export function createAdminHash(password: string) {
  const bcrypt = require('bcryptjs')
  return bcrypt.hashSync(password, 10)
}