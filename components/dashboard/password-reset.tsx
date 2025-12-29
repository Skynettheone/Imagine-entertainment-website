"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function PasswordReset() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validation
    if (!currentPassword) {
      setError("Please enter your current password")
      return
    }

    if (!newPassword) {
      setError("Please enter a new password")
      return
    }

    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      setError(passwordError)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()
      
      // First, verify current password by re-authenticating
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user?.email) {
        setError("Unable to verify user session")
        setIsLoading(false)
        return
      }

      // Try to sign in with current password to verify it
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      })

      if (signInError) {
        setError("Current password is incorrect")
        setIsLoading(false)
        return
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) {
        setError(updateError.message || "Failed to update password")
        setIsLoading(false)
        return
      }

      // Success
      setSuccess("Password updated successfully!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000)
      
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrength = (password: string): { label: string; color: string; width: string } => {
    if (!password) return { label: "", color: "", width: "0%" }
    
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "33%" }
    if (score <= 4) return { label: "Medium", color: "bg-yellow-500", width: "66%" }
    return { label: "Strong", color: "bg-green-500", width: "100%" }
  }

  const strength = getPasswordStrength(newPassword)

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-lg font-semibold">Change Password</h2>
          <p className="text-sm text-muted-foreground">Update your account password</p>
        </div>
        <div className="p-2.5 rounded-lg bg-muted/50">
          <Lock className="size-5 text-muted-foreground" />
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <CheckCircle2 className="size-5 text-green-500 shrink-0" />
          <p className="text-sm text-green-500">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertCircle className="size-5 text-red-500 shrink-0" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="space-y-1">
                <div className="h-1 rounded-full bg-muted overflow-hidden">
                  <div 
                    className={`h-full ${strength.color} transition-all duration-300`}
                    style={{ width: strength.width }}
                  />
                </div>
                <p className={`text-xs ${
                  strength.label === "Weak" ? "text-red-500" :
                  strength.label === "Medium" ? "text-yellow-500" :
                  "text-green-500"
                }`}>
                  {strength.label}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {/* Match indicator */}
            {confirmPassword && (
              <p className={`text-xs ${
                newPassword === confirmPassword ? "text-green-500" : "text-red-500"
              }`}>
                {newPassword === confirmPassword ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button with inline requirements */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Requirements:</span>{" "}
            <span className={newPassword.length >= 8 ? "text-green-500" : ""}>6+ characters</span>
            {" • "}
            <span className={/[A-Z]/.test(newPassword) ? "text-green-500" : ""}>One uppercase letter</span>
            {" • "}
            <span className={/[a-z]/.test(newPassword) ? "text-green-500" : ""}>One lowercase letter</span>
            {" • "}
            <span className={/[0-9]/.test(newPassword) ? "text-green-500" : ""}>One number</span>
          </p>
          <Button 
            type="submit" 
            disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
