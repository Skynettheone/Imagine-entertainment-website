"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"

type OverallStatus = "checking" | "online" | "offline" | "degraded"

export function SystemStatusPill() {
  const [status, setStatus] = useState<OverallStatus>("checking")

  useEffect(() => {
    const checkServices = async () => {
      try {
        // Quick health check via keep-alive endpoint
        const res = await fetch('/api/keep-alive', { method: 'GET' })
        setStatus(res.ok ? "online" : "degraded")
      } catch {
        setStatus("offline")
      }
    }

    checkServices()
    
    // Refresh every 60 seconds
    const interval = setInterval(checkServices, 60000)
    return () => clearInterval(interval)
  }, [])

  const statusConfig = {
    checking: {
      dot: "bg-muted-foreground",
      label: "Checking..."
    },
    online: {
      dot: "bg-green-500",
      label: "All Systems Go"
    },
    degraded: {
      dot: "bg-yellow-500",
      label: "Degraded"
    },
    offline: {
      dot: "bg-red-500",
      label: "Offline"
    }
  }

  const config = statusConfig[status]

  return (
    <Link 
      href="/dashboard/settings"
      className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 px-3"
    >
      {status === "checking" ? (
        <Loader2 className="size-3 animate-spin" />
      ) : (
        <span className={`size-2 rounded-full ${config.dot} animate-pulse`} />
      )}
      <span className="hidden sm:inline">{config.label}</span>
    </Link>
  )
}
