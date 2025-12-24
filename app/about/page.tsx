"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Footer from "@/components/footer"

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] bg-foreground dark:bg-black text-white overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src="/professional-event-production-team-working-stage-s.jpg"
            alt="Team at work"
            className="w-full h-full object-cover opacity-40 dark:opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/40 dark:from-black/90 dark:via-black/70 dark:to-black/50" />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-16 md:pb-20">
          <div className="max-w-3xl">
            <div className="overflow-hidden mb-3">
              <p
                className={`text-white/50 dark:text-white/70 text-xs tracking-[0.15em] transition-all duration-700 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
              >
                IMAGINE ENTERTAINMENT
              </p>
            </div>

            <h1>
              <div className="overflow-hidden">
                <span
                  className={`block text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-white dark:text-white transition-all duration-700 ${
                    isLoaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  }`}
                  style={{ transitionDelay: "0.15s" }}
                >
                  About Us
                </span>
              </div>
            </h1>

            <div
              className={`mt-6 max-w-lg transition-all duration-700 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <p className="text-base md:text-lg text-white/70 dark:text-white/80 leading-relaxed">
                A team of creative producers, technical directors, and event specialists delivering extraordinary
                experiences worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 lg:py-40 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left side - small text */}
            <div className="lg:col-span-3">
              <AnimatedLabel />
            </div>
            {/* Right side - huge text */}
            <div className="lg:col-span-9">
              <AnimatedHeadline />
            </div>
          </div>

          {/* Supporting text */}
          <SupportingText />
        </div>
      </section>

      {/* The Minds Behind the Experience */}
      <section className="pb-20 md:pb-28 px-6 md:px-10 border-t border-border pt-20 md:pt-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-muted-foreground text-xs tracking-[0.15em] mb-4">//Leadership</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
              The Minds Behind the Experience
            </h2>
            <p className="text-muted-foreground text-lg mb-8">Meet Our Founders</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 mb-12">
            {/* Founder 1 */}
            <div className="text-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-6 rounded-full overflow-hidden bg-muted">
                <img
                  src="/professional-event-production-team-working-stage-s.jpg"
                  alt="Mr. Sajith Morawaka Kodikara"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-2">Mr. Sajith Morawaka Kodikara</h3>
              <p className="text-muted-foreground mb-4">Managing Director</p>
            </div>

            {/* Founder 2 */}
            <div className="text-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-6 rounded-full overflow-hidden bg-muted">
                <img
                  src="/creative-team-meeting-modern-office-collaboration-e.jpg"
                  alt="Mr. Sandun Morawaka Kodikara"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-medium mb-2">Mr. Sandun Morawaka Kodikara</h3>
              <p className="text-muted-foreground mb-4">Director</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              With over 37 years of experience in the events and entertainment industry, our founders have shaped Imagine Entertainment into a premier full-service production company. Their vision, expertise, and dedication continue to drive creativity, innovation, and flawless execution in every event we produce.
            </p>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-20 md:py-28 bg-muted mx-4 md:mx-6 rounded-2xl">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="text-muted-foreground text-xs tracking-[0.15em] mb-3">//Experience</p>
          <p className="text-muted-foreground mb-10">A diverse, tight-knit team of vision-builders</p>

          <div className="grid grid-cols-3 gap-6 md:gap-10">
            {[
              { number: "20+", label: "Years experience" },
              { number: "500+", label: "Events delivered" },
              { number: "98%", label: "Client satisfaction" },
            ].map((stat, index) => (
              <StatCounter key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team image */}
      <section className="relative h-[50vh] md:h-[70vh] mt-16 mx-4 md:mx-6 rounded-2xl overflow-hidden">
        <img
          src="/creative-team-meeting-modern-office-collaboration-e.jpg"
          alt="Our Team"
          className="w-full h-full object-cover"
        />
      </section>

      <Footer />
    </main>
  )
}

function AnimatedLabel() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <p className="text-muted-foreground text-sm md:text-base tracking-wide">Build More With</p>
    </div>
  )
}

function AnimatedHeadline() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <h2 className="text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-bold leading-[0.85] tracking-tighter">
        {["LESS", "STRESS"].map((word, i) => (
          <div key={word} className="overflow-hidden">
            <span
              className={`block transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {word}
            </span>
          </div>
        ))}
      </h2>
    </div>
  )
}

function SupportingText() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`mt-12 md:mt-16 lg:mt-20 max-w-2xl lg:ml-auto transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: "0.3s" }}
    >
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
        We handle the complexity so you can focus on what matters. Our end-to-end production expertise means seamless
        events, delivered on time, every time.
      </p>
    </div>
  )
}

function StatCounter({ stat, index }: { stat: { number: string; label: string }; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <p className="text-4xl md:text-5xl lg:text-6xl font-medium mb-1">{stat.number}</p>
      <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
    </div>
  )
}
