"use client"

import type React from "react"

import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <section id="contact" className="py-12 pb-16 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Ready to Create Something?</h2>
          <p className="text-lg text-muted-foreground">Let's discuss your vision and bring it to life</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-border focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-border focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <textarea
            placeholder="Tell us about your project"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 bg-card border border-border focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground resize-none"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-accent text-accent-foreground px-8 py-3 font-medium hover:opacity-90 transition"
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-16 pt-12 border-t border-border grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-sm text-muted-foreground mb-2">PHONE</p>
            <p className="font-semibold">+1 (555) 123-4567</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">EMAIL</p>
            <p className="font-semibold">hello@imagineent.com</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">LOCATION</p>
            <p className="font-semibold">London, UK</p>
          </div>
        </div>
      </div>
    </section>
  )
}
