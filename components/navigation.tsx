"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const menuItems = [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ]

  const isDarkPage = pathname === "/" || pathname === "/about"

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="relative z-50 flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <img
                src="/images/imagine-logo.png"
                alt="Imagine Entertainment"
                className={`h-8 w-auto transition-all duration-300 ${
                  isOpen ? "brightness-0 invert" : scrolled ? "" : isDarkPage ? "brightness-0 invert" : ""
                }`}
              />
            </Link>

            <div className="hidden lg:flex items-center gap-12">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    pathname === item.href
                      ? scrolled
                        ? "text-foreground"
                        : isDarkPage
                          ? "text-white"
                          : "text-foreground"
                      : scrolled
                        ? "text-muted-foreground hover:text-foreground"
                        : isDarkPage
                          ? "text-white/70 hover:text-white"
                          : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className={`hidden lg:flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                  scrolled ? "text-foreground" : isDarkPage ? "text-white" : "text-foreground"
                }`}
              >
                Talk to Us
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative z-50 w-8 h-8 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-3 flex flex-col justify-between">
                  <span
                    className={`block h-[1.5px] w-full transition-all duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] origin-center ${
                      isOpen
                        ? "bg-white rotate-45 translate-y-[5.25px]"
                        : scrolled
                          ? "bg-foreground"
                          : isDarkPage
                            ? "bg-white"
                            : "bg-foreground"
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] w-full transition-all duration-400 ease-[cubic-bezier(0.77,0,0.175,1)] origin-center ${
                      isOpen
                        ? "bg-white -rotate-45 -translate-y-[5.25px]"
                        : scrolled
                          ? "bg-foreground"
                          : isDarkPage
                            ? "bg-white"
                            : "bg-foreground"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-foreground transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col justify-center px-6 md:px-10">
          <div className="space-y-2">
            {[...menuItems, { label: "Contact", href: "/contact" }].map((item, index) => (
              <div
                key={item.label}
                className="overflow-hidden"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(100%)",
                  transition: `all 0.5s cubic-bezier(0.77, 0, 0.175, 1) ${isOpen ? index * 0.08 : 0}s`,
                }}
              >
                <Link href={item.href} onClick={() => setIsOpen(false)} className="block py-2">
                  <span className="text-4xl md:text-5xl font-medium text-white hover:text-white/60 transition-colors duration-300">
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
