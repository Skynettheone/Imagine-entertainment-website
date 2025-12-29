"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ActivityLog } from "@/lib/types/database"
import { formatDistanceToNow } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, Activity } from "lucide-react"

export function ActivityLogList() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchLogs()

    // Subscribe to new logs
    const channel = supabase
      .channel('activity_logs')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'activity_logs' },
        (payload) => {
          const newLog = payload.new as ActivityLog
          // Ideally fetch user details here, but for now just show email if we have it or fallback
          setLogs((prev) => [newLog, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchLogs = async () => {
    try {
      // Join with auth.users to get email if possible, but Supersbase generic client 
      // might not have permissions to query auth.users directly. 
      // For now, we'll just fetch logs and rely on client-side context or just show "Admin"
      
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setLogs(data || [])
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (logs.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No recent activity</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[400px] w-full pr-4">
      <div className="">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 items-center py-4 border-b border-border last:border-0">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-primary/10 text-primary uppercase">
                {log.details?.user_email?.[0] || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">
                  {log.action}
                </p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/80">
                 {log.details?.user_email || 'Admin'}
                </span>
                {log.device_info && (
                  <span className="text-[10px] opacity-70">
                    {log.device_info.browser} • {log.device_info.os} • {log.device_info.device}
                  </span>
                )}
              </div>
              {log.details && (
                 // Filter out user_email from details view to avoid clutter
                <div className="bg-muted/50 p-2 rounded text-xs font-mono mt-1 text-muted-foreground break-all">
                  {JSON.stringify(
                    Object.fromEntries(
                      Object.entries(log.details).filter(([key]) => key !== 'user_email')
                    )
                  ).slice(0, 100)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
