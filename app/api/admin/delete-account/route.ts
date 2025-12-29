import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// DELETE /api/admin/delete-account - Delete user account
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { userId } = body

    // Verify the user is deleting their own account
    if (userId !== user.id) {
      return NextResponse.json(
        { error: 'You can only delete your own account' },
        { status: 403 }
      )
    }

    // Delete user's data in order (respecting foreign key constraints)
    
    // 1. Delete activity logs
    await supabase
      .from('activity_logs')
      .delete()
      .eq('user_id', user.id)

    // 2. Delete event images (for events owned by user)
    const { data: userEvents } = await supabase
      .from('events')
      .select('id')
      .eq('created_by', user.id)

    if (userEvents && userEvents.length > 0) {
      const eventIds = userEvents.map(e => e.id)
      await supabase
        .from('event_images')
        .delete()
        .in('event_id', eventIds)
    }

    // 3. Delete events
    await supabase
      .from('events')
      .delete()
      .eq('created_by', user.id)

    // 4. Delete gallery images
    await supabase
      .from('gallery_images')
      .delete()
      .eq('uploaded_by', user.id)

    // 5. Sign out the user (this also invalidates the session)
    await supabase.auth.signOut()

    // Note: Actually deleting the user from auth.users requires admin privileges
    // In a production app, you would use a Supabase Edge Function with service role key
    // For now, we'll just clear their data and sign them out

    return NextResponse.json({ 
      success: true,
      message: 'Account data deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting account:', error)
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    )
  }
}
