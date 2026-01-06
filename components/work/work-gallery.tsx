"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Masonry from "@/components/Masonry"

interface WorkGalleryProps {
  images: Array<{
    id: string
    image_url: string
    alt_text?: string
  }>
}

export default function WorkGallery({ images }: WorkGalleryProps) {
  /* Masonry item type definition */
  type MasonryItem = {
    id: string
    img: string
    url?: string
    height: number
    loaded?: boolean
  }

  const [masonryItems, setMasonryItems] = useState<MasonryItem[]>([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Helper function to get image dimensions
  const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight })
      }
      img.onerror = () => {
        resolve({ width: 1200, height: 1600 }) // Default fallback
      }
      img.src = src
    })
  }

  // Generate a random height for the skeleton
  const getRandomHeight = () => {
    const ratios = [0.75, 1, 1.25, 1.5]
    const ratio = ratios[Math.floor(Math.random() * ratios.length)]
    const baseWidth = 400
    return baseWidth * ratio
  }

  // Load actual image dimensions and update the item
  const updateItemDimensions = useCallback(async (item: MasonryItem) => {
    try {
      const dimensions = await getImageDimensions(item.img)
      const aspectRatio = dimensions.height / dimensions.width
      const baseWidth = 400
      const calculatedHeight = baseWidth * aspectRatio
      
      setMasonryItems(prev => prev.map(p => {
        if (p.id === item.id) {
          return { ...p, height: calculatedHeight, loaded: true }
        }
        return p
      }))
    } catch (e) {
      setMasonryItems(prev => prev.map(p => {
        if (p.id === item.id) return { ...p, loaded: true }
        return p
      }))
    }
  }, [])

  // Initialize items
  useEffect(() => {
    if (!images || images.length === 0) return

    const newItems: MasonryItem[] = images.map(img => ({
      id: `work-gallery-${img.id}`,
      img: img.image_url,
      height: getRandomHeight(),
      loaded: false
    }))

    setMasonryItems(newItems)

    // Trigger dimension loading
    newItems.forEach(item => {
      updateItemDimensions(item)
    })
  }, [images, updateItemDimensions])

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxOpen(false)
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, images.length])

  const handleImageClick = useCallback((_item: any, index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <>
      <div className="min-h-[400px]">
        <Masonry
          items={masonryItems}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.98}
          blurToFocus={true}
          colorShiftOnHover={false}
          stagger={0.05}
          onItemClick={handleImageClick}
        />
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && images[currentIndex] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm touch-none"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button - larger touch target on mobile */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 md:p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 md:w-6 md:h-6" />
          </button>

          {/* Previous button - positioned for mobile touch */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-2 md:left-4 z-50 p-3 md:p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}

          {/* Image container */}
          <div 
            className="relative max-w-[95vw] md:max-w-[90vw] max-h-[85vh] md:max-h-[90vh] flex items-center justify-center px-12 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex].image_url}
              alt={images[currentIndex].alt_text || `Gallery image ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            />
          </div>

          {/* Next button - positioned for mobile touch */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-2 md:right-4 z-50 p-3 md:p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          )}

          {/* Image counter - positioned above bottom safe area on mobile */}
          {images.length > 1 && (
            <div className="absolute bottom-6 md:bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  )
}

