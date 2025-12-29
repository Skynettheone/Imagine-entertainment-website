import { NextResponse } from 'next/server'
import { getAllGalleryImages } from '@/lib/data/events'

export async function GET() {
  try {
    const images = await getAllGalleryImages()
    
    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery images', images: [] },
      { status: 500 }
    )
  }
}

