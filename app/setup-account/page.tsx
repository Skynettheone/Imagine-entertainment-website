"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function SetupAccountPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    let timeoutId: NodeJS.Timeout | null = null
    let isMounted = true
    
    // Check if this is an invite flow
    const params = new URLSearchParams(window.location.search)
    const isInvite = params.get('type') === 'invite' || window.location.hash.includes('access_token')

    // Timeout fallback - if verification takes too long, show error
    timeoutId = setTimeout(() => {
      if (isMounted && isCheckingSession) {
        setError("Verification timed out. Please try clicking the invite link again.")
        setIsCheckingSession(false)
      }
    }, 15000) // 15 second timeout

    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user && isMounted) {
        setEmail(user.email || null)
        setIsCheckingSession(false)
        if (timeoutId) clearTimeout(timeoutId)
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user && isMounted) {
        setEmail(session.user.email || null)
        setIsCheckingSession(false)
        if (timeoutId) clearTimeout(timeoutId)
      } else if (!session && !isInvite && isMounted) {
        // Only redirect if not waiting for invite token processing
        router.push("/dashboard?error=invalid_invite")
      }
    })

    // Initial check
    checkSession()

    // Retry session check after a short delay (in case auth callback is slow)
    const retryTimeout = setTimeout(checkSession, 2000)

    return () => {
      isMounted = false
      subscription.unsubscribe()
      if (timeoutId) clearTimeout(timeoutId)
      clearTimeout(retryTimeout)
    }
  }, [router, isCheckingSession])

  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return "Password must be at least 6 characters"
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

  const getPasswordStrength = (password: string): { label: string; color: string; width: string } => {
    if (!password) return { label: "", color: "", width: "0%" }
    
    let score = 0
    if (password.length >= 6) score++
    if (password.length >= 10) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "33%" }
    if (score <= 4) return { label: "Medium", color: "bg-yellow-500", width: "66%" }
    return { label: "Strong", color: "bg-green-500", width: "100%" }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()
      
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      })

      if (updateError) {
        setError(updateError.message || "Failed to set password")
        setIsLoading(false)
        return
      }

      // Sign out the user so they can log in with new credentials
      await supabase.auth.signOut()

      setSuccess(true)
      
      // Redirect to dashboard (will show login form)
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
      
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const strength = getPasswordStrength(password)

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Verifying invitation...</span>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-8 text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-500/10 mb-6">
            <CheckCircle2 className="size-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Account Setup Complete!</h1>
          <p className="text-muted-foreground mb-4">
            Your password has been set. Redirecting to dashboard...
          </p>
          <Loader2 className="size-5 animate-spin mx-auto text-muted-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <div className="grid md:grid-cols-2">
            {/* Left Column: Form */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 mb-2">
                    <Lock className="size-6 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold">Set Up Your Account</h1>
                  <p className="text-muted-foreground text-balance text-sm">
                    Create a password to complete your account setup
                  </p>
                </div>

                {/* Email Display */}
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Your Email
                  </p>
                  <p className="font-medium">{email}</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground font-medium"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    
                    {/* Password Strength */}
                    {password && (
                      <div className="space-y-1">
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
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
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground font-medium"
                      >
                        {showConfirm ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    
                    {/* Match indicator */}
                    {confirmPassword && (
                      <p className={`text-xs ${
                        password === confirmPassword ? "text-green-500" : "text-red-500"
                      }`}>
                        {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
                      </p>
                    )}
                  </div>

                  {/* Requirements */}
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Requirements:</span>{" "}
                    <span className={password.length >= 6 ? "text-green-500" : ""}>6+ characters</span>
                    {" • "}
                    <span className={/[A-Z]/.test(password) ? "text-green-500" : ""}>uppercase</span>
                    {" • "}
                    <span className={/[a-z]/.test(password) ? "text-green-500" : ""}>lowercase</span>
                    {" • "}
                    <span className={/[0-9]/.test(password) ? "text-green-500" : ""}>number</span>
                  </p>

                  <Button 
                    type="submit" 
                    className="w-full h-11 font-medium"
                    disabled={isLoading || !password || !confirmPassword}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Setting up...
                      </>
                    ) : (
                      "Complete Setup"
                    )}
                  </Button>
                </form>
              </div>
            </div>

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
                  Welcome to the team! Complete your account setup to access the admin dashboard.
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
