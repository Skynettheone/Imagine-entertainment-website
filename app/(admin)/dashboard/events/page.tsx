import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Plus, MapPin, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeleteEventButton } from '@/components/dashboard/delete-event-button'

export default async function EventsPage() {
  const supabase = await createClient()
  
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio events
          </p>
        </div>
        <Link href="/dashboard/events/new" className="cursor-pointer">
          <Button size="lg" className="gap-2">
            <Plus className="size-5" />
            New Event
          </Button>
        </Link>
      </div>

      {/* Events List */}
      {events && events.length > 0 ? (
        <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border">
          {events.map((event) => (
            <div
              key={event.id}
              className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 hover:bg-muted/50 transition-colors"
            >
              {/* Thumbnail and Content Row on Mobile */}
              <div className="flex items-start gap-3 sm:flex-1 sm:items-center">
                {/* Thumbnail */}
                <Link href={`/dashboard/events/${event.id}`} className="shrink-0 cursor-pointer">
                  <div className="relative size-16 sm:size-20 rounded-lg overflow-hidden bg-muted">
                    {event.cover_image_url ? (
                      <Image
                        src={event.cover_image_url}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                        <Calendar className="size-5 sm:size-6 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                </Link>

                {/* Content */}
                <Link href={`/dashboard/events/${event.id}`} className="flex-1 min-w-0 cursor-pointer">
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-2 sm:truncate group-hover:text-primary transition-colors mb-0.5 sm:mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                    {event.category}
                  </p>
                  {(event.event_date || event.location) && (
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                      {event.event_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {new Date(event.event_date).toLocaleDateString('en-US', { 
                            month: 'numeric', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          <span className="truncate max-w-[120px] sm:max-w-none">{event.location}</span>
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              </div>

              {/* Right side - Status and Delete */}
              <div className="flex items-center justify-between sm:justify-end gap-2 pl-[calc(4rem+0.75rem)] sm:pl-0">
                <span className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-md ${
                  event.is_published 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                    : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                }`}>
                  {event.is_published ? 'Published' : 'Draft'}
                </span>
                <DeleteEventButton eventId={event.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="relative overflow-hidden bg-gradient-to-b from-card to-card/50 border border-border rounded-2xl">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="relative p-16 text-center">
            <div className="inline-flex items-center justify-center size-20 rounded-2xl bg-primary/10 mb-6">
              <Calendar className="size-10 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold">No events yet</h3>
            <p className="text-muted-foreground mt-2 mb-8 max-w-md mx-auto">
              Create your first event to showcase your amazing work. Add photos, details, and publish it to your portfolio.
            </p>
            <Link href="/dashboard/events/new" className="cursor-pointer">
              <Button size="lg" className="gap-2">
                <Plus className="size-5" />
                Create Your First Event
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
