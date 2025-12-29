'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { updatePassword } from '@/app/(admin)/dashboard/actions'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setError('Invalid or expired link. Redirecting to login...')
        setTimeout(() => {
          router.push('/dashboard') // Dashboard layout handles the login redirect
        }, 3000)
      }
      setCheckingSession(false)
    }

    checkSession()
  }, [router])

  const [success, setSuccess] = useState(false)

  // ... (keep useEffect)

  async function handleSubmit(formData: FormData) {
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setPending(true)
    setError(null)

    try {
      const result = await updatePassword(formData)
      if (result?.error) {
        setError(result.error)
        setPending(false)
      } else if (result?.success) {
        setSuccess(true)
        
        // Explicitly sign out client-side to ensure session is cleared
        const supabase = createClient()
        await supabase.auth.signOut()
        
        // Wait and double-check that session is gone
        let attempts = 0
        while (attempts < 5) {
          const { data: { session } } = await supabase.auth.getSession()
          if (!session) break
          await new Promise(r => setTimeout(r, 200)) // Wait 200ms
          await supabase.auth.signOut() // Try signing out again
          attempts++
        }
        
        // Redirect to login (dashboard) after 2 seconds
        setTimeout(() => {
          // Force a hard redirect to clear all client state
          window.location.href = '/dashboard'
        }, 2000)
      }
    } catch (e) {
      setError('An unexpected error occurred')
      setPending(false)
    }
  }

  return (
    <div className="min-h-dvh bg-muted flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <div className="grid md:grid-cols-2">
            {/* Left Column: Form or Success Message */}
            {success ? (
              <div className="flex flex-col items-center justify-center p-6 md:p-8 text-center min-h-[400px]">
                <div className="rounded-full bg-green-500/10 p-3 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Password Updated!</h2>
                <p className="text-muted-foreground mb-6">
                  Your password has been changed successfully. Redirecting you to login...
                </p>
                <Loader2 className="size-5 animate-spin text-primary" />
              </div>
            ) : (
             <form className="p-6 md:p-8" action={handleSubmit}>
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="relative mb-2 size-12">
                    <Image
                      src="/Imagine Logo White Alpha.png"
                      alt="IMAGINE Entertainment"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <h1 className="text-2xl font-bold">Reset Password</h1>
                  <p className="text-muted-foreground text-balance text-sm">
                    Enter your new password below
                  </p>
                </div>

                {checkingSession ? (
                   <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                      <Loader2 className="size-8 animate-spin mb-4" />
                      <p>Verifying secure link...</p>
                   </div>
                ) : (
                  <>
                {/* Form Fields */}
                <div className="grid gap-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="h-11 pr-10"
                      disabled={!!error && error.includes('Redirecting')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground font-medium"
                      disabled={!!error && error.includes('Redirecting')}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      required
                      className="h-11 pr-10"
                      disabled={!!error && error.includes('Redirecting')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground font-medium"
                      disabled={!!error && error.includes('Redirecting')}
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className={`text-sm p-3 rounded-lg border ${error.includes('Redirecting') ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'}`}>
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 font-medium"
                  disabled={pending || (!!error && error.includes('Redirecting'))}
                >
                  {pending ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </Button>
                  </>
                )}
              </div>
            </form>
            )}

            {/* Right Column: Branding Image */}
            <div className="relative hidden md:flex items-center justify-center bg-muted/30 p-8 min-h-[400px]">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
              
              {/* Logo & Branding */}
              <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                <div className="relative size-24">
                  <Image
                    src="/Imagine Logo White Alpha.png"
                    alt="IMAGINE Entertainment"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                
                <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
                  Every great experience starts with a story. We partner with you to shape that story from imagination to impact, creating moments people remember.
                </p>
                
                <p className="text-[10px] text-muted-foreground/40 tracking-wide">
                  IMAGINE ENTERTAINMENT (PVT) LTD
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
