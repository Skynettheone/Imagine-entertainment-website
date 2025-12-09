"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

const services = [
  {
    number: "01",
    title: "Corporate Events",
    description:
      "From product launches to annual meetings, we create impactful corporate experiences that align with your brand and engage your audience.",
    items: ["Events & Meetings", "Product Launches", "Brand Activation", "Conferences"],
  },
  {
    number: "02",
    title: "Television & Film",
    description:
      "Award-winning production services for television shows, award ceremonies, and film projects with cutting-edge technical expertise.",
    items: ["Light Entertainment", "Awards Shows", "Film Production", "Factual Television"],
  },
  {
    number: "03",
    title: "Theatre Productions",
    description:
      "From West End to touring productions, we bring theatrical visions to life with exceptional staging, lighting, and technical direction.",
    items: ["West End Theatre", "Touring Theatre", "Regional Theatre", "Performing Arts"],
  },
]

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-24 lg:py-32 px-6 lg:px-12 bg-muted/30 border-y border-border">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <p
              className={`text-xs tracking-[0.2em] text-muted-foreground mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              //What We Do
            </p>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-medium transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              CREATIVE EVENT
              <br />
              PRODUCTION
            </h2>
          </div>

          {/* Service Links */}
          <div
            className={`flex flex-col gap-2 text-right transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {["CONSULTATION", "DESIGN & PLANNING", "TECHNICAL PRODUCTION", "EQUIPMENT RENTALS"].map((item) => (
              <span key={item} className="text-xs text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={service.number}
              className={`group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] mb-6 bg-muted">
                <img
                  src={`/.jpg?height=400&width=600&query=${service.title.toLowerCase().replace(/ /g, "-")} event production professional`}
                  alt={service.title}
                  className="w-full h-full object-cover img-zoom"
                />
              </div>

              {/* Number */}
              <span className="text-4xl md:text-5xl font-light text-muted-foreground/30 mb-4 block">
                {service.number}
              </span>

              {/* Content */}
              <h3 className="text-xl font-medium mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>

              {/* Items */}
              <ul className="space-y-1 mb-6">
                {service.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    • {item}
                  </li>
                ))}
              </ul>

              {/* Link */}
              <button className="text-sm font-medium inline-flex items-center gap-2 group/btn link-underline">
                SEE PROJECTS
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
