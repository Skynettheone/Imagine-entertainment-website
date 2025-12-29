'use server'

import { createClient, createAdminClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Log successful login
  // We need to get the user to log them
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    try {
      await supabase.from('activity_logs').insert({
        user_id: user.id,
        action: "User Login",
        entity_type: "auth",
        entity_id: user.id
      })
    } catch (e) {
      console.error("Failed to log login:", e)
    }
  }

  return { success: true }
}

export async function signOut() {
  const supabase = await createClient()
  
  // Log signout before clearing session
  try {
     const { data: { user } } = await supabase.auth.getUser()
     if (user) {
        await supabase.from('activity_logs').insert({
          user_id: user.id,
          action: "User Logout",
          entity_type: "auth",
          entity_id: user.id
        })
     }
  } catch (e) {
    console.error("Failed to log logout:", e)
  }

  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string
  
  // Create admin client to check if user exists
  const supabaseAdmin = createAdminClient()
  
  // Check if user exists primarily to give better error feedback as requested
  // Note: Only do this in admin/internal apps where email enumeration is acceptable
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers()
  
  if (listError) {
    return { error: 'Failed to verify user. Please try again.' }
  }

  const userExists = users.some(u => u.email?.toLowerCase() === email.toLowerCase())

  if (!userExists) {
    return { error: 'No account found with this email address.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string

  if (!password || password.length < 6) {
    return { error: 'Password must be at least 6 characters long.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}


export async function logActivity(
  action: string,
  entityType?: string,
  entityId?: string,
  details?: any
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  try {
    const { error } = await supabase.from('activity_logs').insert({
      user_id: user.id,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details: {
        ...details,
        user_email: user.email // Store email for display
      }
    })

    if (error) {
      console.error('Failed to log activity:', error)
    }
  } catch (err) {
    console.error('Error logging activity:', err)
  }
}
