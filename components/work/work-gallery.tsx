"use client"

import { useEffect, useState, useRef, useCallback } from "react"
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
  const itemIdCounter = useRef(0)

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

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="min-h-[400px]">
      <Masonry
        items={masonryItems}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.98}
        blurToFocus={true}
        colorShiftOnHover={false}
        stagger={0.05}
      />
    </div>
  )
}
