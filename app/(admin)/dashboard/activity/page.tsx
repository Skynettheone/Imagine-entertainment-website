"use client"

import { Activity } from "lucide-react"
import { ActivityLogList } from "@/components/dashboard/activity-log-list"

export default function ActivityLogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Activity Log</h1>
          <p className="text-muted-foreground mt-1">
            History of actions performed in the dashboard
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="size-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">System Activity</h2>
            <p className="text-xs text-muted-foreground">Recent events and changes</p>
          </div>
        </div>
        
        <div className="p-6">
          <ActivityLogList />
        </div>
      </div>
    </div>
  )
}
