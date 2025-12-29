import { createClient } from '@/lib/supabase/server'
import { AppearanceSettings } from '@/components/dashboard/appearance-settings'
import { SystemStatus } from '@/components/dashboard/system-status'
import { PasswordReset } from '@/components/dashboard/password-reset'
import { DangerZone } from '@/components/dashboard/danger-zone'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings
        </p>
      </div>

      {/* Two Column Layout - Account Info & Appearance */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Account Info */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6 space-y-6 h-full">
            <h2 className="text-lg font-semibold border-b border-border pb-4">Account Information</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Account ID</p>
                <p className="font-mono text-sm bg-muted/50 p-2 rounded w-fit">{user?.id}</p>
              </div>
              
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground mb-1">Last Sign In</p>
                <p className="text-sm">
                  {user?.last_sign_in_at 
                    ? new Date(user.last_sign_in_at).toLocaleString(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'long'
                      })
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Appearance */}
        <div className="lg:col-span-1">
          <AppearanceSettings />
        </div>
      </div>

      {/* Full Width - System Status */}
      <SystemStatus />

      {/* Full Width - Password Reset */}
      <PasswordReset />

      {/* Full Width - Danger Zone */}
      <DangerZone />
    </div>
  )
}
