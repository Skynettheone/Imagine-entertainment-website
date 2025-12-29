import { getAllGalleryImages } from '@/lib/data/events'
import GalleryClient from './gallery-client'

// Dynamic rendering - fetch fresh data on every request
export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  let images: string[] = []
  
  try {
    images = await getAllGalleryImages()
  } catch (error) {
    console.error('Failed to fetch gallery images:', error)
    images = []
  }
  
  // Ensure images is always an array
  if (!images || !Array.isArray(images)) {
    images = []
  }
  
  return <GalleryClient initialImages={images} />
}
