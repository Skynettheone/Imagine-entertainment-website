"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "CORPORATE SUMMIT 2024",
    category: "Corporate Events",
    image: "/corporate-event-stage-professional-lighting-dark.jpg",
  },
  {
    id: 2,
    title: "BRIT AWARDS",
    category: "Television Production",
    image: "/awards-show-stage-red-carpet-dramatic-lighting.jpg",
  },
  {
    id: 3,
    title: "FASHION WEEK LONDON",
    category: "Fashion Shows",
    image: "/fashion-runway-show-professional-lighting-pink.jpg",
  },
  {
    id: 4,
    title: "WEST END PREMIERE",
    category: "Theatre",
    image: "/theatre-stage-dramatic-lighting-blue.jpg",
  },
  {
    id: 5,
    title: "PRODUCT LAUNCH",
    category: "Brand Activation",
    image: "/tech-product-launch-event-modern-minimal.jpg",
  },
  {
    id: 6,
    title: "FILM PREMIERE",
    category: "Film Events",
    image: "/film-premiere-red-carpet-night-event.jpg",
  },
]

const categories = ["All", "Corporate Events", "Television Production", "Theatre", "Fashion Shows", "Film Events"]

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
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

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" ref={sectionRef} className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <p
              className={`text-xs tracking-[0.2em] text-muted-foreground mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              //Featured Projects
            </p>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-medium transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              WORK & PORTFOLIO
            </h2>
          </div>

          <p
            className={`text-muted-foreground max-w-md transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Our creative playground, where you would find real projects and extraordinary productions.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-sm px-4 py-2 transition-all duration-300 ${
                activeCategory === category
                  ? "bg-foreground text-background"
                  : "bg-transparent text-muted-foreground hover:text-foreground border border-border hover:border-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/3] mb-4 bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500" />

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Project Info */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">{project.category}</span>
                <h3 className="text-lg font-medium group-hover:text-muted-foreground transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* See All Link */}
        <div
          className={`mt-12 text-right transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button className="text-sm font-medium inline-flex items-center gap-2 group link-underline">
            See All Work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
