"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Masonry from "@/components/Masonry"
import PublicLayout from "@/components/layouts/public-layout"

const INITIAL_LOAD_COUNT = 20 // Load 20 images initially
const LOAD_MORE_COUNT = 15 // Load 15 more images each time

// Helper function to get image dimensions
const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = () => {
      // Default aspect ratio if image fails to load
      resolve({ width: 1200, height: 1600 })
    }
    img.src = src
  })
}

interface GalleryClientProps {
  initialImages: string[]
}

export default function GalleryClient({ initialImages }: GalleryClientProps) {
  /* Masonry item type definition */
  type MasonryItem = {
    id: string
    img: string
    url?: string
    height: number
    loaded?: boolean
  }

  const [allImages] = useState<string[]>(() => {
    // Shuffle images on initial mount
    const shuffled = [...initialImages]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  })
  
  const [masonryItems, setMasonryItems] = useState<MasonryItem[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  const currentIndexRef = useRef(0)
  const observerTarget = useRef<HTMLDivElement>(null)
  const itemIdCounter = useRef(0)
  const processedImages = useRef<Set<string>>(new Set())

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
    } catch {
      setMasonryItems(prev => prev.map(p => {
        if (p.id === item.id) return { ...p, loaded: true }
        return p
      }))
    }
  }, [])

  // Add items with placeholder heights immediately, then load real dimensions
  const addItems = useCallback((imageSources: string[]) => {
    const newSources = imageSources.filter(src => !processedImages.current.has(src))
    
    if (newSources.length === 0) return

    newSources.forEach(src => processedImages.current.add(src))

    const newItems: MasonryItem[] = newSources.map(src => ({
      id: `gallery-item-${itemIdCounter.current++}-${src}`,
      img: src,
      height: getRandomHeight(),
      loaded: false
    }))

    setMasonryItems(prev => [...prev, ...newItems])

    newItems.forEach(item => {
      updateItemDimensions(item)
    })
  }, [updateItemDimensions])

  // Initial load - immediately load from pre-fetched images
  useEffect(() => {
    if (allImages.length > 0 && masonryItems.length === 0) {
      const initialBatch = allImages.slice(0, INITIAL_LOAD_COUNT)
      currentIndexRef.current = INITIAL_LOAD_COUNT
      setHasMore(allImages.length > INITIAL_LOAD_COUNT)
      addItems(initialBatch)
    }
  }, [allImages, masonryItems.length, addItems])

  // Load more images when scrolling
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return

    setIsLoadingMore(true)
    
    setTimeout(() => {
      const currentIndex = currentIndexRef.current
      
      if (currentIndex >= allImages.length) {
        setHasMore(false)
        setIsLoadingMore(false)
        return
      }
      
      const nextBatch = allImages.slice(currentIndex, currentIndex + LOAD_MORE_COUNT)
      
      if (nextBatch.length > 0) {
        currentIndexRef.current = currentIndex + nextBatch.length
        addItems(nextBatch)
        setHasMore(currentIndexRef.current < allImages.length)
      } else {
        setHasMore(false)
      }
      setIsLoadingMore(false)
    }, 100)
  }, [allImages, isLoadingMore, hasMore, addItems])

  // Intersection Observer
  useEffect(() => {
    const currentTarget = observerTarget.current
    if (!currentTarget || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMore()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '400px'
      }
    )

    observer.observe(currentTarget)

    return () => {
      observer.disconnect()
    }
  }, [hasMore, isLoadingMore, loadMore])

  return (
    <PublicLayout>
      <main className="min-h-screen bg-background pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Gallery</h1>
            <p className="text-muted-foreground">
              Explore our portfolio of spectacular events across categories.
            </p>
          </div>

          {masonryItems.length > 0 ? (
            <Masonry data={masonryItems} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-muted rounded-lg animate-pulse"
                  style={{ aspectRatio: [0.75, 1, 1.25, 1.5][i % 4] }}
                />
              ))}
            </div>
          )}

          {/* Infinite scroll trigger */}
          {hasMore && (
            <div ref={observerTarget} className="flex justify-center py-8">
              {isLoadingMore && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Loading more...</span>
                </div>
              )}
            </div>
          )}

          {!hasMore && masonryItems.length > 0 && (
            <p className="text-center text-muted-foreground py-8">
              You&apos;ve seen all {masonryItems.length} images
            </p>
          )}
        </div>
      </main>
    </PublicLayout>
  )
}
