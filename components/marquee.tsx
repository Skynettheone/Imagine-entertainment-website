"use client"

export default function Marquee() {
  const text = "WORK WITH US"
  const repeat = 8

  return (
    <section className="py-8 bg-foreground text-background overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(repeat)].map((_, i) => (
          <span key={i} className="flex items-center mx-8">
            <span className="text-sm md:text-base font-medium tracking-[0.2em]">{text}</span>
            <span className="mx-8 text-muted-foreground">✦</span>
          </span>
        ))}
        {[...Array(repeat)].map((_, i) => (
          <span key={`duplicate-${i}`} className="flex items-center mx-8">
            <span className="text-sm md:text-base font-medium tracking-[0.2em]">{text}</span>
            <span className="mx-8 text-muted-foreground">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
