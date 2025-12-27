"use client"

import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

const services = ["Consultation", "Design", "Audio", "Video", "Lighting", "Staging", "Technical Direction"]
const industries = ["Corporate", "Television", "Film", "Theatre", "Fashion", "Brand Activation", "Awards"]

const stats = [
  { value: "500+", label: "Events Produced" },
  { value: "97%", label: "Client Satisfaction" },
  { value: "20+", label: "Years Experience" },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 })

  return (
    <section id="about" ref={sectionRef} className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Statement */}
        <div className="mb-20">
          {/* Same as CSS: transition-all duration-700, translate-y-8 -> translate-y-0 */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            <span className="text-sm font-semibold tracking-widest text-foreground">BUILD MORE WITH</span>
          </motion.div>
          {/* Same as CSS: delay-100 = 0.1s */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-[120px] font-medium tracking-tight leading-none"
          >
            IMAGINATION
          </motion.h2>
        </div>

        {/* Expertise Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20 pt-8 border-t border-border">
          <div>
            {/* Same as CSS: delay-200 = 0.2s */}
            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xs tracking-[0.2em] text-muted-foreground mb-6"
            >
              //Expertise
            </motion.p>
            {/* Same as CSS: delay-300 = 0.3s */}
            <motion.h3
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl md:text-2xl font-medium mb-6"
            >
              A dedicated team—designers, technicians, and producers working side-by-side.
            </motion.h3>
            {/* Same as CSS: delay-400 = 0.4s */}
            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-muted-foreground mb-6 leading-relaxed"
            >
              IMAGINE ENTERTAINMENT is a full-service event production company that takes ideas from conception to
              reality. Our cross-functional crew—production managers, technical directors, and creative
              designers—collaborates under one roof, so you deal with one accountable partner, not a patchwork of
              subcontractors.
            </motion.p>
            {/* Same as CSS: delay-500 = 0.5s */}
            <motion.button
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-sm font-medium inline-flex items-center gap-2 group link-underline"
            >
              Let's work together
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* Services & Industries Lists */}
          <div className="grid grid-cols-2 gap-12">
            <div>
              {/* Same as CSS: delay-300 = 0.3s */}
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-xs tracking-[0.2em] text-muted-foreground mb-6"
              >
                //Services
              </motion.p>
              <ul className={`space-y-3 stagger-children ${isInView ? "visible" : ""}`}>
                {services.map((service) => (
                  <li key={service} className="text-lg md:text-xl font-medium">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* Same as CSS: delay-400 = 0.4s */}
              <motion.p
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xs tracking-[0.2em] text-muted-foreground mb-6"
              >
                //Industries
              </motion.p>
              <ul className={`space-y-3 stagger-children ${isInView ? "visible" : ""}`}>
                {industries.map((industry) => (
                  <li key={industry} className="text-lg md:text-xl font-medium">
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="pt-8 border-t border-border">
          {/* Same as CSS: transition-all duration-700, translate-y-8 -> translate-y-0 */}
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7 }}
            className="text-xs tracking-[0.2em] text-muted-foreground mb-4"
          >
            //Experience
          </motion.p>
          {/* Same as CSS: delay-100 = 0.1s */}
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-sm text-muted-foreground mb-8"
          >
            We're a diverse, tight-knit team of event production experts.
          </motion.p>

          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              // Same as CSS: delay = 200ms + index * 150ms
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 32 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-medium">{stat.value}</span>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
