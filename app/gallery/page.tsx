import { getAllGalleryImages } from '@/lib/data/events'
import GalleryClient from './gallery-client'

// Dynamic rendering - fetch fresh data on every request
// Maximum performance with caching, no fallbacks
export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const images = await getAllGalleryImages()
  
  return <GalleryClient initialImages={images} />
}
