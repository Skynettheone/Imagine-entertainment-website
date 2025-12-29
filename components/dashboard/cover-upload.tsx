'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useFileUpload, type FileMetadata, type FileWithPreview } from '@/hooks/use-file-upload';
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CloudUpload, ImageIcon, TriangleAlert, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoverUploadProps {
  defaultImage?: string | null;
  maxSize?: number;
  accept?: string;
  className?: string;
  onImageChange?: (file: File | null) => void;
}

export function CoverUpload({
  defaultImage = null,
  maxSize = 10 * 1024 * 1024, // 10MB default
  accept = 'image/*',
  className,
  onImageChange,
}: CoverUploadProps) {
  // Initialize with default image if provided
  const [coverImage, setCoverImage] = useState<FileWithPreview | null>(
    defaultImage ? {
      id: 'default-cover',
      file: { id: 'default', name: 'cover.jpg', size: 0, type: 'image/jpeg', url: defaultImage } as FileMetadata,
      preview: defaultImage,
    } : null
  );

  const [imageLoading, setImageLoading] = useState(!!defaultImage);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [
    { isDragging, errors },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept,
    multiple: false,
    onFilesChange: (files) => {
      if (files.length > 0) {
        setImageLoading(true);
        setIsUploading(true);
        setUploadProgress(0);
        setUploadError(null);
        setCoverImage(files[0]);
        onImageChange?.(files[0].file as File);

        // Simulate upload progress
        simulateUpload();
      }
    },
  });

  // Simulate upload progress
  const simulateUpload = () => {
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }

        // Random progress increment between 5-15%
        const increment = Math.random() * 10 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setImageLoading(false);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadError(null);
    onImageChange?.(null);
  };

  const retryUpload = () => {
    if (coverImage) {
      setUploadError(null);
      setIsUploading(true);
      setUploadProgress(0);
      simulateUpload();
    }
  };

  const hasImage = coverImage && coverImage.preview;

  return (
    <div className={cn('w-full', className)}>
      {/* Cover Upload Area */}
      <div
        className={cn(
          'group relative overflow-hidden rounded-xl transition-all duration-200 border',
          isDragging
            ? 'border-2 border-dashed border-primary bg-primary/5'
            : hasImage
              ? 'border-border bg-background hover:border-primary/50'
              : 'border-dashed border-border bg-muted/30 hover:border-primary hover:bg-primary/5',
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input {...getInputProps()} className="sr-only" />

        {hasImage ? (
          <>
            {/* Cover Image Display */}
            <div className="relative aspect-[2/1] w-full">
              {/* Loading placeholder */}
              {imageLoading && (
                <div className="absolute inset-0 animate-pulse bg-muted flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="size-5" />
                    <span className="text-sm">Loading image...</span>
                  </div>
                </div>
              )}

              {/* Actual image */}
              <Image
                src={coverImage.preview}
                alt="Cover"
                fill
                className={cn(
                  'object-cover transition-opacity duration-300',
                  imageLoading ? 'opacity-0' : 'opacity-100',
                )}
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/40" />

              {/* Action buttons overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button
                    onClick={openFileDialog}
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 text-gray-900 hover:bg-white dark:bg-white/90 dark:text-gray-900 dark:hover:bg-white"
                  >
                    <Upload className="size-4" />
                    Change Cover
                  </Button>
                  <Button onClick={removeCoverImage} type="button" variant="destructive" size="sm">
                    <X className="size-4" />
                    Remove
                  </Button>
                </div>
              </div>

              {/* Upload progress */}
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center  bg-black/40">
                  <div className="relative">
                    <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-white/20"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - uploadProgress / 100)}`}
                        className="text-white transition-all duration-300"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">{Math.round(uploadProgress)}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Empty State */
          <div
            className="flex aspect-[2/1] w-full cursor-pointer flex-col items-center justify-center gap-3 p-6 text-center"
            onClick={openFileDialog}
          >
            <div className="rounded-xl bg-primary/10 p-3">
              <CloudUpload className="size-6 text-primary" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-semibold">Upload Cover Image</h3>
              <p className="text-xs text-muted-foreground">Drag and drop an image here, or click to browse</p>
              <p className="text-xs text-muted-foreground">Recommended: 1920x1080px • Max: 10MB</p>
            </div>

            <Button type="button" variant="outline" size="sm">
              <ImageIcon className="size-4" />
              Browse Files
            </Button>
          </div>
        )}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" appearance="light" className="mt-4">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>File upload error(s)</AlertTitle>
            <AlertDescription>
              {errors.map((error, index) => (
                <p key={index} className="last:mb-0">
                  {error}
                </p>
              ))}
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}

      {/* Upload Error */}
      {uploadError && (
        <Alert variant="destructive" appearance="light" className="mt-4">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Upload failed</AlertTitle>
            <AlertDescription>
              <p className="mb-2">{uploadError}</p>
              <Button onClick={retryUpload} type="button" size="sm" className="mt-2">
                Retry Upload
              </Button>
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}
    </div>
  );
}
