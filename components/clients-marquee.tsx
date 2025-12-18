"use client"

import { useEffect, useState, useRef } from "react"

const clients = [
  { abbr: "BBC", name: "BBC Studios" },
  { abbr: "ITV", name: "ITV Productions" },
  { abbr: "SKY", name: "Sky UK" },
  { abbr: "NFX", name: "Netflix" },
  { abbr: "AMZ", name: "Amazon Prime" },
  { abbr: "LN", name: "Live Nation" },
  { abbr: "AEG", name: "AEG Presents" },
  { abbr: "SNY", name: "Sony Music" },
  { abbr: "UNI", name: "Universal" },
  { abbr: "WB", name: "Warner Bros" },
  { abbr: "MB", name: "Mercedes-Benz" },
  { abbr: "CH4", name: "Channel 4" },
]

const clients2 = [
  { abbr: "EMI", name: "EMI Records" },
  { abbr: "HBO", name: "HBO Max" },
  { abbr: "DSN", name: "Disney+" },
  { abbr: "APL", name: "Apple TV" },
  { abbr: "BMG", name: "BMG Rights" },
  { abbr: "O2", name: "O2 Arena" },
  { abbr: "RAH", name: "Royal Albert" },
  { abbr: "NTL", name: "National Theatre" },
  { abbr: "RSC", name: "RSC" },
  { abbr: "ENO", name: "English Nat. Opera" },
  { abbr: "RFH", name: "Royal Festival" },
  { abbr: "BP", name: "Barbican" },
]

export default function ClientsMarquee() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
<<<<<<< HEAD
    <section ref={ref} className="py-20 md:py-28 overflow-hidden border-t border-border" suppressHydrationWarning>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12" suppressHydrationWarning>
=======
    <section ref={ref} className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12">
>>>>>>> c39683023328cd58b532e2e557b9c05486e2b399
        <p
          className={`text-muted-foreground text-xs tracking-[0.2em] text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          TRUSTED BY
        </p>
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-medium text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Industry-Leading
          <br />
          <span className="italic font-normal text-muted-foreground">Brands & Organizations</span>
        </h2>
      </div>

      {/* Row 1 - scroll left */}
      <div className="relative mb-4 marquee-mask" suppressHydrationWarning>
        <div className="flex animate-marquee" suppressHydrationWarning>
          {[...clients, ...clients, ...clients].map((client, index) => (
            <ClientCard key={`row1-${index}`} client={client} />
          ))}
        </div>
      </div>

      {/* Row 2 - scroll right */}
      <div className="relative marquee-mask" suppressHydrationWarning>
        <div className="flex animate-marquee-reverse" suppressHydrationWarning>
          {[...clients2, ...clients2, ...clients2].map((client, index) => (
            <ClientCard key={`row2-${index}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ClientCard({ client }: { client: { abbr: string; name: string } }) {
  return (
<<<<<<< HEAD
    <div className="flex-shrink-0 px-2" suppressHydrationWarning>
      <div className="w-20 md:w-24 flex flex-col items-center gap-2" suppressHydrationWarning>
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl border border-border bg-muted/30 flex items-center justify-center hover:border-foreground/30 hover:bg-muted/50 transition-all duration-300">
          <span className="text-sm md:text-base font-medium text-foreground/70">{client.abbr}</span>
=======
    <div className="flex-shrink-0 px-4 md:px-6">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 md:h-16 w-auto flex items-center justify-center">
          <img
            src={`/images/logos/${client.abbr.toLowerCase()}-logo.png`}
            alt={client.name}
            className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
            onError={(e) => {
              // Hide image if logo doesn't exist
              e.currentTarget.style.display = 'none'
            }}
          />
>>>>>>> c39683023328cd58b532e2e557b9c05486e2b399
        </div>
        <span className="text-[10px] md:text-xs text-muted-foreground text-center whitespace-nowrap">
          {client.name}
        </span>
      </div>
    </div>
  )
}
