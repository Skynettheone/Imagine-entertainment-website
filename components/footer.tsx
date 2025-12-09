"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-6">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="py-16 md:py-20 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <img src="/images/imagine-logo.png" alt="Imagine Entertainment" className="h-12 w-auto mb-4" />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Creating extraordinary experiences for corporate events, television, film, and theatre worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-[0.15em] text-white/40 mb-4">COMPANY</p>
            <ul className="space-y-3">
              {["About", "Work", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs tracking-[0.15em] text-white/40 mb-4">SERVICES</p>
            <ul className="space-y-3">
              {["Corporate Events", "Television & Film", "Theatre", "Technical Production"].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs tracking-[0.15em] text-white/40 mb-4">CONNECT</p>
            <ul className="space-y-3">
              {["Instagram", "LinkedIn", "Twitter"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center gap-1"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-8 border-t border-white/10">
          <p className="text-[8vw] md:text-[6vw] font-medium tracking-wider text-white/5 text-center select-none">
            IMAGINE
          </p>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2025 IMAGINE ENTERTAINMENT. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
