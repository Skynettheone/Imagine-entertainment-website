'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadImageAction(formData: FormData) {
    try {
        const supabase = await createClient()

        // Check authentication
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            throw new Error('Unauthorized')
        }

        const file = formData.get('file') as File
        const folder = formData.get('folder') as string || 'imagine-events'

        if (!file) {
            throw new Error('No file provided')
        }

        // Cloudinary credentials
        const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
        const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
            throw new Error('Cloudinary not configured')
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = buffer.toString('base64')
        const dataUri = `data:${file.type};base64,${base64}`

        // Generate signature
        const crypto = await import('crypto')
        const timestamp = Math.round(new Date().getTime() / 1000)
        const toSign = `folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`
        const signature = crypto.createHash('sha1').update(toSign).digest('hex')

        // Upload to Cloudinary
        const cloudinaryResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    file: dataUri,
                    api_key: CLOUDINARY_API_KEY,
                    timestamp,
                    signature,
                    folder,
                }),
            }
        )

        if (!cloudinaryResponse.ok) {
            const errorText = await cloudinaryResponse.text()
            console.error('Cloudinary upload failed:', errorText)
            throw new Error('Cloudinary upload failed')
        }

        const result = await cloudinaryResponse.json()

        return {
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
        }
    } catch (error) {
        console.error('Error in uploadImageAction:', error)
        throw error
    }
}
