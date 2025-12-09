"use client"

import { useEffect, useRef, useState } from "react"

export default function Statement() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 lg:px-12 border-b border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16">
          {/* Left side - Label */}
          <div
            className={`flex items-center gap-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-12 h-px bg-foreground" />
            <span className="text-xs tracking-[0.2em] text-muted-foreground">PHILOSOPHY</span>
          </div>

          {/* Right side - Statement */}
          <div className="lg:max-w-3xl">
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-8 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              WE'RE NOT JUST AN EVENT AGENCY. WE'RE A CREATIVE PARTNER.
            </h2>

            <div
              className={`space-y-6 text-muted-foreground transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-base leading-relaxed">
                Every brilliant event starts with a spark of imagination. At IMAGINE ENTERTAINMENT, we specialize in
                transforming ambitious visions into extraordinary experiences that captivate, inspire, and leave lasting
                impressions.
              </p>
              <p className="text-base leading-relaxed">
                From intimate corporate gatherings to large-scale television productions, we bring meticulous attention
                to detail, cutting-edge technical expertise, and unwavering creative excellence to every project we
                undertake.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
