'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from '@/app/(admin)/dashboard/actions'
import { ForgotPasswordDialog } from '@/components/dashboard/forgot-password-dialog'
import { cn } from '@/lib/utils'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    
    try {
      const result = await signIn(formData)
      if (result?.error) {
        setError(result.error)
        setPending(false)
      } else if (result?.success) {
        // Use hard redirect to ensure clean state
        window.location.href = '/dashboard'
      }
    } catch (e) {
      setError('An unexpected error occurred')
      setPending(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
        <div className="grid md:grid-cols-2">
          {/* Left Column: Form */}
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
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground text-balance text-sm">
                  Sign in to manage Imagine Entertainment website
                </p>
              </div>

              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@imaginesl.com"
                  required
                  maxLength={50}
                  className="h-11"
                />
              </div>

              {/* Password Field */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <div className="ml-auto">
                    <div
                      onKeyDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                      onSubmit={(e) => e.stopPropagation()}
                    >
                      <ForgotPasswordDialog />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
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
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 font-medium"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </div>
          </form>

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

      {/* Footer Text */}
      <p className="px-6 text-center text-xs text-muted-foreground">
        By signing in, you agree to our{' '}
        <Link href="#" className="text-primary underline-offset-4 hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="#" className="text-primary underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}
