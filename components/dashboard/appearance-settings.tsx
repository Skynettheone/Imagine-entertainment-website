"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold border-b border-border pb-4">Appearance</h2>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted/50 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const themes = [
    {
      id: "light",
      name: "Light",
      icon: Sun,
      preview: "bg-white border-zinc-200",
      previewInner: "bg-zinc-100"
    },
    {
      id: "dark",
      name: "Dark",
      icon: Moon,
      preview: "bg-zinc-950 border-zinc-800",
      previewInner: "bg-zinc-900"
    },
    {
      id: "system",
      name: "System",
      icon: Monitor,
      preview: "bg-gradient-to-r from-white to-zinc-950 border-zinc-400",
      previewInner: "bg-gradient-to-r from-zinc-100 to-zinc-900"
    },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6 h-full">
      <h2 className="text-lg font-semibold border-b border-border pb-4">Appearance</h2>
      
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Choose your preferred theme for the dashboard
        </p>
        
        <div className="grid grid-cols-3 gap-3">
          {themes.map(({ id, name, icon: Icon, preview, previewInner }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`group relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                theme === id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              {/* Theme preview */}
              <div className={`w-full aspect-video rounded-md border ${preview} overflow-hidden`}>
                <div className={`w-full h-full ${previewInner}`}>
                  <div className="p-1.5 space-y-1">
                    <div className={`h-1 w-1/2 rounded ${id === 'dark' ? 'bg-zinc-700' : id === 'system' ? 'bg-zinc-400' : 'bg-zinc-300'}`} />
                    <div className={`h-1 w-3/4 rounded ${id === 'dark' ? 'bg-zinc-700' : id === 'system' ? 'bg-zinc-400' : 'bg-zinc-300'}`} />
                  </div>
                </div>
              </div>
              
              {/* Label */}
              <div className="flex items-center gap-1.5">
                <Icon className="size-3.5" />
                <span className="text-xs font-medium">{name}</span>
              </div>
              
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
