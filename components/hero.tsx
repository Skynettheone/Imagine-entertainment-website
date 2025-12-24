"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setVideoReady(true)
      video.play().catch(() => {
        // Autoplay failed, but video is ready
        setVideoReady(true)
      })
    }

    const handleLoadedData = () => {
      setVideoReady(true)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)

    // Force load
    video.load()

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [])

  return (
    <section className="relative min-h-[100dvh] h-[100dvh] bg-black dark:bg-black overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover scale-[1.3] transition-opacity duration-500 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          src="/Imagine Entertainment Commercial 30 Sec.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Imagine Entertainment showreel"
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 dark:from-black/50 dark:via-black/30 dark:to-black/60" />
      </div>

      {/* Content Overlay - Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 md:px-10 lg:px-12 pb-12 sm:pb-6 md:pb-8 lg:pb-13 hero-content-bottom">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 md:gap-8">
          {/* Left Side - Text */}
          <div className="text-white flex-1 w-full md:w-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-1 text-white leading-tight">
            IMAGINE ENTERTAINMENT
          </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed mt-2 sm:mt-1">
              Imagine Entertainment creates unforgettable live experiences, offering end-to-end event production, from creative design, lighting, sound, LED screens, creative visuals, Stage installation and equipment rentals to flawless execution and professional rigging, bringing every concert, corporate event, or large-scale production to life.
          </p>
          </div>

          {/* Right Side - Button */}
          <div className="w-full md:w-auto flex md:block">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-start md:justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:from-white/30 hover:to-white/20 hover:border-white/40 transition-all rounded-full font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 w-auto"
            >
              View Our Work
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
