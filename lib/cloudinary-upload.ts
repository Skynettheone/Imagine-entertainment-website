import { uploadImageAction } from '@/lib/actions/upload';

export interface CloudinaryUploadResult {
    url: string;
    public_id: string;
    width: number;
    height: number;
}

export async function uploadToCloudinary(
    file: File,
    folder: string = 'imagine-events'
): Promise<CloudinaryUploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
        const result = await uploadImageAction(formData);
        return result;
    } catch (error) {
        console.error('Upload to Cloudinary failed:', error);
        throw error instanceof Error ? error : new Error('Upload failed');
    }
}
