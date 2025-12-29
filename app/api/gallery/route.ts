import { NextResponse } from 'next/server'
import { getAllGalleryImages } from '@/lib/data/events'

export async function GET() {
  try {
    const images = await getAllGalleryImages()
    
    // Return with cache headers for faster subsequent loads
    // Cache for 60 seconds, stale-while-revalidate for 5 minutes
    return NextResponse.json({ images }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      }
    })
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gallery images', images: [] },
      { status: 500 }
    )
  }
}
