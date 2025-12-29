import { createClient } from '@/lib/supabase/server'
import { UsersTable } from '@/components/dashboard/users-table'

export default async function UsersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground mt-1">
          Manage admin users and access
        </p>
      </div>

      {/* Users Table */}
      <UsersTable />
    </div>
  )
}
