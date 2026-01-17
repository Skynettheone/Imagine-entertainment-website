# Media Hosting Architecture Guide

## Overview

This document outlines the media hosting architecture for Imagine Entertainment website, designed for long-term scalability and minimal costs.

```
┌────────────────────────────────────────────────────────────────┐
│                    HOSTINGER ($4.49/mo)                        │
│  ┌──────────────────┐    ┌──────────────────────────────────┐  │
│  │   Next.js App    │    │   Hero Video (self-hosted)       │  │
│  │   (Node.js)      │    │   /public/hero-video.mp4         │  │
│  └──────────────────┘    └──────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
                               │
                     Upload images to
                               ▼
┌────────────────────────────────────────────────────────────────┐
│                  CLOUDFLARE R2 (FREE)                          │
│                  Storage: 10 GB | Bandwidth: Unlimited         │
└────────────────────────────────────────────────────────────────┘
                               │
                     Fetch & Transform via
                               ▼
┌────────────────────────────────────────────────────────────────┐
│                  IMAGEKIT (FREE - 20GB/mo)                     │
│                  Auto: WebP, resize, quality optimization      │
└────────────────────────────────────────────────────────────────┘
```

---

## Cost Breakdown

| Component        | Service                 | Monthly Cost          | Notes                  |
| ---------------- | ----------------------- | --------------------- | ---------------------- |
| Web Hosting      | Hostinger Node.js       | $4.49 - $16.99        | Promo vs regular price |
| Image Storage    | Cloudflare R2           | $0                    | 10GB free, ∞ bandwidth |
| Image Transforms | ImageKit                | $0                    | 20GB bandwidth/month   |
| Video Hosting    | Hostinger (self-hosted) | $0                    | Included in hosting    |
| Database         | Supabase                | $0                    | Existing free tier     |
| **TOTAL**        |                         | **$4.49 - $16.99/mo** |                        |

---

## Component Details

### 1. Hostinger Node.js Hosting

**Plan:** Business Web Hosting (or higher with Node.js support)

**Features Used:**

- 50 GB NVMe storage
- Node.js web apps (5 included)
- Free CDN
- Free SSL

**Hosts:**

- Next.js application (standalone build)
- Hero video file (`/public/hero-video.mp4`)
- Static assets

---

### 2. Cloudflare R2 (Image Storage)

**Account:** Existing Imagine Entertainment Cloudflare account

**Free Tier Limits:**
| Resource | Free Amount |
|----------|-------------|
| Storage | 10 GB/month |
| Class A operations (writes) | 1M/month |
| Class B operations (reads) | 10M/month |
| Egress (bandwidth) | **Unlimited** |

**Bucket Setup:**

- Bucket name: `imagine-media` (or similar)
- Public access: Enabled via R2.dev subdomain
- Structure:
  ```
  imagine-media/
  ├── events/
  │   ├── event-123/
  │   │   ├── cover.jpg
  │   │   └── gallery/
  │   │       ├── img1.jpg
  │   │       └── img2.jpg
  ├── gallery/
  │   └── standalone-images/
  ```

**Public URL Format:**

```
https://pub-XXXXX.r2.dev/events/event-123/cover.jpg
```

---

### 3. ImageKit (Image Transformation & CDN)

**Account:** New free account for Imagine Entertainment

**Free Tier Limits:**
| Resource | Free Amount |
|----------|-------------|
| Bandwidth | 20 GB/month |
| Storage | Not used (fetching from R2) |
| Transformations | Unlimited |

**URL Endpoint:**

```
https://ik.imagekit.io/imaginesl/
```

**Fetch URL Pattern:**

```
https://ik.imagekit.io/imaginesl/https://pub-XXXXX.r2.dev/events/cover.jpg?tr=w-800,q-80,f-webp
```

**Common Transformations:**
| Transform | Parameter | Example |
|-----------|-----------|---------|
| Width | `w-{pixels}` | `w-800` |
| Quality | `q-{1-100}` | `q-80` |
| Format | `f-{format}` | `f-webp` |
| Auto format | `f-auto` | Serves WebP/AVIF |

---

### 4. Supabase (Database)

**Usage:** Authentication + Event/Image metadata storage

**Tables:**

- `events` - Event information
- `event_images` - Image metadata (URLs point to R2 via ImageKit)
- `gallery_images` - Standalone gallery images
- `users` - Admin users

**No Changes Required:** Database structure remains the same, only image URLs change.

---

## Migration Checklist

### Phase 1: Setup Services

- [ ] **Cloudflare R2**

  - [ ] Create R2 bucket in Cloudflare dashboard
  - [ ] Enable public access (R2.dev subdomain)
  - [ ] Note the public URL format
  - [ ] Generate API tokens for uploads

- [ ] **ImageKit**

  - [ ] Create free ImageKit account
  - [ ] Configure URL endpoint
  - [ ] Add R2 as external URL source
  - [ ] Test fetch URL transformation

- [ ] **Hostinger**
  - [ ] Purchase Node.js hosting plan
  - [ ] Configure Node.js environment
  - [ ] Set up domain DNS

### Phase 2: Code Updates

- [ ] **Upload Logic**

  - [ ] Update `lib/actions/upload.ts` to upload to R2
  - [ ] Configure R2 credentials in environment
  - [ ] Return ImageKit fetch URLs for display

- [ ] **Hero Video**

  - [ ] Download video from Cloudinary
  - [ ] Compress/optimize if needed
  - [ ] Add to `/public/hero-video.mp4`
  - [ ] Update `components/hero.tsx` to use local path

- [ ] **Image Display**

  - [ ] Update image URL generation to use ImageKit fetch
  - [ ] Test all gallery and event pages

- [ ] **Next.js Config**
  - [ ] Add ImageKit domain to `next.config.mjs`
  - [ ] Configure standalone build

### Phase 3: Deployment

- [ ] Build Next.js in standalone mode
- [ ] Deploy to Hostinger
- [ ] Configure environment variables
- [ ] Test all functionality
- [ ] Update DNS to point to Hostinger

### Phase 4: Cleanup

- [ ] Verify everything works
- [ ] Keep Cloudinary images for 30 days (backup)
- [ ] Delete Cloudinary video
- [ ] Update Vercel project (optional: remove or keep as staging)

---

## Environment Variables

```env
# Cloudflare R2
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=imagine-media
R2_PUBLIC_URL=https://pub-XXXXX.r2.dev

# ImageKit
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/imaginesl
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key

# Supabase (existing)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

---

## Image URL Format Examples

### Before (Cloudinary):

```
https://res.cloudinary.com/dqhklh9nd/image/upload/q_auto:best,f_auto/v1234/imagine-events/cover.jpg
```

### After (R2 + ImageKit):

```
https://ik.imagekit.io/imaginesl/https://pub-XXXXX.r2.dev/imagine-events/cover.jpg?tr=q-80,f-auto
```

---

## Capacity Planning

| Timeframe | Est. Images | Est. Storage | R2 Free (10GB) | ImageKit BW (20GB)  |
| --------- | ----------- | ------------ | -------------- | ------------------- |
| Current   | ~1000       | ~2.5 GB      | ✅ 25%         | ✅ ~75%             |
| +1 Year   | ~1500       | ~4 GB        | ✅ 40%         | ✅ Within limit     |
| +2 Years  | ~2000       | ~5 GB        | ✅ 50%         | ⚠️ Monitor          |
| +3 Years  | ~2500       | ~6.5 GB      | ✅ 65%         | ⚠️ May need upgrade |

**Notes:**

- R2 storage will remain free for foreseeable future
- If ImageKit bandwidth exceeds 20GB, consider:
  - ImageKit Essential plan ($45/mo)
  - Or serve directly from R2 (no transforms)
  - Or use Cloudflare Image Resizing

---

## Rollback Plan

If issues arise after migration:

1. **Immediate:** Cloudinary images still accessible (don't delete for 30 days)
2. **Short-term:** Can revert code to use Cloudinary URLs
3. **DNS:** Can point back to Vercel if Hostinger has issues

---

## Support Contacts

- **Hostinger:** support@hostinger.com
- **Cloudflare:** cloudflare.com/support
- **ImageKit:** support@imagekit.io
- **Supabase:** supabase.com/support

---

_Document created: January 2026_
_Last updated: January 10, 2026_
