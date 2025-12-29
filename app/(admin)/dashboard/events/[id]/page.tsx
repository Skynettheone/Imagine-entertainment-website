import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { EventEditForm } from '@/components/dashboard/event-edit-form'
import { DeleteEventButton } from '@/components/dashboard/delete-event-button'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: event, error } = await supabase
    .from('events')
    .select(`
      *,
      event_images (*)
    `)
    .eq('id', id)
    .single()

  if (error || !event) {
    notFound()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/events"
            className="p-2.5 hover:bg-muted rounded-xl transition-colors border border-transparent hover:border-border shrink-0"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">{event.title}</h1>
            <p className="text-muted-foreground">{event.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pl-[3.25rem] sm:pl-0">
          <DeleteEventButton eventId={event.id} />
          <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${
            event.is_published 
              ? 'bg-green-500/10 text-green-500 border border-green-500/30' 
              : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30'
          }`}>
            {event.is_published ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>

      {/* Edit Form */}
      <EventEditForm event={event} />
    </div>
  )
}
