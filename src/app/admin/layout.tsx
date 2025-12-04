import { verifyAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminLayoutClient from '@/components/admin/AdminLayoutClient'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await verifyAdmin()

  if (!admin) {
    redirect('/login')
  }

  return <AdminLayoutClient admin={admin}>{children}</AdminLayoutClient>
}