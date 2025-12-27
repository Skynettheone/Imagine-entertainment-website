"use client"

import { useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

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
  const [activeCategory, setActiveCategory] = useState("All")
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" ref={sectionRef} className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            {/* Same as CSS: transition-all duration-700, translate-y-8 -> translate-y-0 */}
            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.7 }}
              className="text-xs tracking-[0.2em] text-muted-foreground mb-4"
            >
              //Featured Projects
            </motion.p>
            {/* Same as CSS: delay-100 = 0.1s */}
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium"
            >
              WORK & PORTFOLIO
            </motion.h2>
          </div>

          {/* Same as CSS: delay-200 = 0.2s */}
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-muted-foreground max-w-md"
          >
            Our creative playground, where you would find real projects and extraordinary productions.
          </motion.p>
        </div>

        {/* Category Filter - Same as CSS: delay-300 = 0.3s */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-4 mb-12"
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
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            // Same as CSS: translate-y-12 -> translate-y-0, delay = 400ms + index * 100ms
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 48 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
              transition={{ duration: 0.7, delay: 0.4 + index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/3] mb-4 bg-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover img-zoom"
                />
                {/* Same as CSS: group-hover:bg-foreground/10 transition-all duration-500 */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500" />

                {/* Hover Arrow - Same as CSS: opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 */}
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
            </motion.div>
          ))}
        </div>

        {/* See All Link - Same as CSS: delay-700 = 0.7s */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 text-right"
        >
          <button className="text-sm font-medium inline-flex items-center gap-2 group link-underline">
            See All Work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
