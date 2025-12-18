"use client"

import Image from "next/image"
import Masonry from "react-masonry-css"

const galleryItems = [
  "/brit-awards-stage-red-lighting-production.jpg",
  "/fashion-runway-show-pink-dramatic-lighting.jpg",
  "/corporate-event-stage-blue-lighting-conference.jpg",
  "/theatre-stage-dramatic-spotlight-performance.jpg",
  "/dramatic-stage-lighting-corporate-event-dark-green.jpg",
  "/professional-event-production-team-working-stage-s.jpg",
  "/tech-product-launch-event-modern-minimal.jpg",
  "/music-festival-outdoor-stage-crowd-night-lights.jpg",
  "/theatre-stage-lights-performance.jpg",
  "/behind-the-scenes-event-production-crew-working-ba.jpg",
  "/awards-show-stage-red-carpet-dramatic-lighting.jpg",
  "/corporate-event-stage-lighting.jpg",
]

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  768: 2,
  640: 2,
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="pt-28 pb-12 px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="max-w-3xl mb-10">
          <p className="text-xs tracking-[0.15em] text-muted-foreground mb-3">//Gallery</p>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">Visual Highlights</h1>
          <p className="text-muted-foreground">
            A Pinterest-style wall of recent stages, shows, and experiences we've delivered.
          </p>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {galleryItems.map((src, idx) => (
            <div key={src + idx} className="overflow-hidden rounded-xl group shadow-sm mb-4">
              <div className="relative w-full h-auto block">
                <Image
                  src={src}
                  alt="Imagine Entertainment gallery item"
                  width={1200}
                  height={1600}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 50vw"
                  priority={idx < 4}
                />
              </div>
            </div>
          ))}
        </Masonry>
      </section>

      <style jsx global>{`
        .masonry-grid {
          display: flex;
          width: auto;
          gap: 1rem;
        }
        .masonry-grid_column {
          padding-left: 1rem;
          background-clip: padding-box;
        }
        .masonry-grid_column > div {
          margin-bottom: 1rem;
        }
        @media (max-width: 639px) {
          .masonry-grid {
            gap: 0.75rem;
          }
          .masonry-grid_column {
            padding-left: 0.75rem;
          }
        }
      `}</style>
    </main>
  )
}

