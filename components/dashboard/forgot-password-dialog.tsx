'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { resetPassword } from '@/app/(admin)/dashboard/actions'

export function ForgotPasswordDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    e.stopPropagation()
    setPending(true)
    setError(null)

    const formData = new FormData()
    formData.append('email', email)

    try {
      const result = await resetPassword(formData)
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setSuccess(true)
      }
    } catch (e) {
      setError('An unexpected error occurred')
    } finally {
      setPending(false)
    }
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open) {
      // Reset state when dialog closes
      setEmail('')
      setError(null)
      setSuccess(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-sm text-primary underline-offset-4 hover:underline"
          suppressHydrationWarning
        >
          Forgot your password?
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-4">
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-center">
              <p className="text-sm text-green-600 dark:text-green-400">
                ✓ Password reset email sent!
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Check your inbox for a link to reset your password.
              </p>
            </div>
            <Button
              onClick={() => handleOpenChange(false)}
              className="w-full mt-4"
              variant="outline"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="admin@imaginesl.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={pending || !email}
                className="flex-1"
              >
                {pending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
