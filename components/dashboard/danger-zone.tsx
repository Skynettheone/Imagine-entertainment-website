"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Trash2, Loader2, Eye, EyeOff } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

export function DangerZone() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  const CONFIRM_PHRASE = "DELETE MY ACCOUNT"

  const handleDeleteRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!password) {
      setError("Please enter your password to confirm")
      return
    }

    if (confirmText !== CONFIRM_PHRASE) {
      setError(`Please type "${CONFIRM_PHRASE}" to confirm`)
      return
    }

    setShowDialog(true)
  }

  const handleConfirmDelete = async () => {
    setShowDialog(false)
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user?.email) {
        setError("Unable to verify user session")
        setIsLoading(false)
        return
      }

      // Verify password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: password,
      })

      if (signInError) {
        setError("Incorrect password. Please try again.")
        setIsLoading(false)
        return
      }

      // Delete the user account
      const response = await fetch('/api/admin/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "Failed to delete account. Please contact support.")
        setIsLoading(false)
        return
      }

      // Sign out and redirect
      await supabase.auth.signOut()
      window.location.href = "/"
      
    } catch (err) {
      setError("An unexpected error occurred. Please try again or contact support.")
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-card border border-red-500/30 rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-red-500/20 pb-4">
          <div>
            <h2 className="text-lg font-semibold">Danger Zone</h2>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data
            </p>
          </div>
          <AlertTriangle className="size-5 text-red-500" />
        </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="size-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <form onSubmit={handleDeleteRequest} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Password Confirmation */}
              <div className="space-y-2">
                <Label htmlFor="delete-password" className="text-sm">
                  Confirm your password
                </Label>
                <div className="relative">
                  <Input
                    id="delete-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pr-10 border-red-500/30 focus:border-red-500 focus:ring-red-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Type to confirm */}
              <div className="space-y-2">
                <Label htmlFor="confirm-text" className="text-sm">
                  Type <span className="font-mono font-semibold text-red-500">{CONFIRM_PHRASE}</span> to confirm
                </Label>
                <Input
                  id="confirm-text"
                  type="text"
                  placeholder={CONFIRM_PHRASE}
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  disabled={isLoading}
                  className="border-red-500/30 focus:border-red-500 focus:ring-red-500/20"
                />
              </div>
            </div>

            {/* Delete Button */}
            <div className="flex justify-end pt-2">
              <Button 
                type="submit" 
                variant="destructive"
                disabled={isLoading || !password || confirmText !== CONFIRM_PHRASE}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    Delete Account
                  </>
                )}
              </Button>
            </div>
          </form>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        title="Are you absolutely sure?"
        description="This will permanently delete your account and remove all your data from our servers including all events, gallery images, and activity logs. This action cannot be undone."
        onConfirm={handleConfirmDelete}
        loading={isLoading}
        confirmText="Yes, delete my account"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  )
}
