# IMAGINE Entertainment - Architecture & Decisions

> A comprehensive guide covering hosting, database, image storage, security, and edge cases for the IMAGINE Entertainment website.

---

## Table of Contents

1. [Final Tech Stack](#final-tech-stack)
2. [Hosting Strategy](#hosting-strategy)
3. [Database](#database)
4. [Image Storage & Optimization](#image-storage--optimization)
5. [Authentication & Security](#authentication--security)
6. [Project Structure](#project-structure)
7. [Resilience & Edge Cases](#resilience--edge-cases)
8. [SEO Strategy](#seo-strategy)
9. [Account Ownership](#account-ownership)
10. [Action Checklist](#action-checklist)

---

## Final Tech Stack

| Layer                  | Technology                     | Free Tier | Always On          |
| ---------------------- | ------------------------------ | --------- | ------------------ |
| **Frontend**           | Next.js on Vercel              | ✅        | ✅ (CDN)           |
| **Database**           | Supabase (PostgreSQL)          | ✅ 500MB  | ✅ with keep-alive |
| **Auth**               | Supabase Auth                  | ✅        | ✅                 |
| **Image Storage**      | Cloudinary                     | ✅ 25GB   | ✅ (CDN)           |
| **Domain/DNS**         | Cloudflare                     | ✅        | ✅                 |
| **Image Optimization** | Cloudflare Polish + Cloudinary | ✅        | ✅                 |

**Total Monthly Cost: $0**

---

## Hosting Strategy

### Frontend: Vercel (Free Hobby Tier)

- ✅ Perfect for Next.js
- ✅ Global CDN, 99.99% uptime
- ✅ Automatic SSL
- ✅ Preview deployments
- ⚠️ Hobby tier is technically for non-commercial (transfer to client's account for handoff)

### Backend: No Separate Backend Needed

Using **Vercel Serverless Functions** (Next.js API Routes):

- No Render needed
- No sleep/cold start issues for database
- API routes run on-demand
- Same free tier as frontend

### Why NOT Render?

| Render Free Tier                | Problem                            |
| ------------------------------- | ---------------------------------- |
| Sleeps after 15 min             | First request takes 30-60s to wake |
| Manual restart needed sometimes | Unreliable for production          |
| Separate service to manage      | More complexity                    |

**Verdict:** Skip Render. Use Vercel's built-in API routes.

---

## Database

### Choice: Supabase (PostgreSQL)

| Feature       | Supabase              | Neon                     |
| ------------- | --------------------- | ------------------------ |
| Database      | ✅ PostgreSQL         | ✅ PostgreSQL            |
| Built-in Auth | ✅ Yes                | ❌ No                    |
| REST API      | ✅ Auto-generated     | ❌ Write your own        |
| Pause Policy  | After 7 days inactive | After 5 min (auto-wakes) |
| Best For      | All-in-one solution   | Just database            |

**Winner: Supabase** - Auth is included, simpler setup.

### Keeping Supabase Active (Free Tier)

Supabase pauses free projects after **7 days of inactivity**.

**Solution: Cron Ping**

```tsx
// app/api/keep-alive/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  await supabase.from("events").select("id").limit(1);
  return NextResponse.json({ status: "ok" });
}
```

```json
// vercel.json
{
  "crons": [{ "path": "/api/keep-alive", "schedule": "0 0 */3 * *" }]
}
```

Runs every 3 days → Supabase never pauses.

### Database Schema

```sql
-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  client TEXT,
  event_date DATE,
  location TEXT,
  services TEXT[],
  cover_image_url TEXT,
  overview TEXT,
  challenge TEXT,
  solution TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Event images table
CREATE TABLE event_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);
```

---

## Image Storage & Optimization

### Choice: Cloudinary (Not Cloudflare R2)

| Reason                             | Explanation                              |
| ---------------------------------- | ---------------------------------------- |
| **Separate from personal account** | Don't mix client images with personal R2 |
| **More storage**                   | 25GB free vs 10GB on R2                  |
| **Auto-optimization**              | WebP/AVIF, resizing built-in             |
| **No egress concerns**             | 25GB bandwidth/month                     |

### Why NOT Google Drive?

| Problem                      | Impact                       |
| ---------------------------- | ---------------------------- |
| Not designed for web serving | Links can break, rate limits |
| No CDN                       | Slow loading                 |
| No optimization              | Large file sizes             |
| Looks unprofessional         | URLs expose Google Drive     |

### Image Pipeline

```
Admin uploads image
      │
      ▼
Cloudinary (stores + optimizes)
      │
      ▼
URL saved to Supabase
      │
      ▼
Frontend uses next/image with Cloudinary URL
      │
      ▼
Automatic WebP/AVIF, lazy loading, responsive sizes
```

### Cloudflare Polish

Enable in Cloudflare dashboard for additional compression on all images (free).

---

## Authentication & Security

### Dashboard Login

- **Method:** Email/Password (not Google OAuth)
- **Provider:** Supabase Auth
- **Protection:** Middleware checks session

```tsx
// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

### Security Best Practices

- ✅ All API keys in environment variables
- ✅ HTTPS everywhere (Vercel + Cloudflare)
- ✅ Row Level Security (RLS) in Supabase
- ✅ Password hashing handled by Supabase Auth

---

## Project Structure

### Decision: Monorepo (Single Repo)

| Monorepo               | Separate Repos                 |
| ---------------------- | ------------------------------ |
| ✅ Shared code         | ❌ Duplicate code              |
| ✅ Single deployment   | ❌ Two deployments             |
| ✅ Shared auth session | ❌ Cookie configuration needed |
| ✅ One free tier       | ❌ Two free tiers              |

**Dashboard URL:** `imaginesl.com/dashboard` (not subdomain)

### Folder Structure

```
imagine-entertainment-website/
├── app/
│   ├── (public)/              # Public website
│   │   ├── page.tsx           # Homepage
│   │   ├── work/
│   │   ├── gallery/
│   │   ├── services/
│   │   └── contact/
│   ├── (admin)/               # Dashboard
│   │   ├── login/
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       ├── events/
│   │       ├── analytics/
│   │       └── settings/
│   ├── api/
│   │   ├── keep-alive/
│   │   ├── events/
│   │   └── upload/
│   └── layout.tsx
├── components/
│   ├── ui/                    # Shared components
│   ├── public/                # Public site components
│   └── dashboard/             # Dashboard components
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── cloudinary.ts
└── middleware.ts
```

### Why NOT Separate Git Branch for Dashboard?

| Problem                                 | Impact                 |
| --------------------------------------- | ---------------------- |
| Branches are for versions, not features | Defeats Git purpose    |
| Constant merge conflicts                | Shared code diverges   |
| Maintenance nightmare                   | Bug fixes needed twice |

---

## Resilience & Edge Cases

### If Database Fails?

**Public site still works.** Using Static Site Generation (SSG):

- Pages pre-built at deploy time
- Served from CDN, no runtime DB calls
- Database outage = no impact on visitors

### If Dashboard Fails?

**Public site unaffected.** They're separate route groups in the same app:

- Dashboard crash is isolated
- Public pages continue serving static HTML

### If Images Fail (Cloudinary)?

- Very rare (99.99%+ uptime)
- Add fallback/placeholder images in code
- Use `next/image` with blur placeholder

### Architecture for Maximum Resilience

```
BUILD TIME (Deploy):
  Fetch all events from Supabase
  Pre-render all pages as static HTML
  Upload to Vercel CDN

RUNTIME (User Visits):
  Serve pre-built HTML from CDN edge (no DB call)
  Load images from Cloudinary CDN

  ✅ Database can be offline
  ✅ API routes can be broken
  ✅ Site still works perfectly
```

### Performance Impact

| Concern                      | Answer                                |
| ---------------------------- | ------------------------------------- |
| Does SSG slow down the site? | **No—it's the fastest option**        |
| Is there a cold start?       | **No—static files, instant response** |
| Time to First Byte (TTFB)    | **<50ms** (vs 200-500ms for SSR)      |

---

## SEO Strategy

### Key Optimizations

1. **Server-Side Rendering / Static Generation**

   - Remove `"use client"` from pages that don't need it
   - Use `generateStaticParams()` for pre-rendering

2. **Per-Page Metadata**

   ```tsx
   export async function generateMetadata({ params }) {
     const event = await getEvent(params.id);
     return {
       title: `${event.title} | IMAGINE`,
       description: event.description,
       openGraph: { images: [event.cover_image_url] },
     };
   }
   ```

3. **Image Optimization**

   - Use `next/image` with `priority` on hero images
   - Always set `width` and `height`

4. **Semantic HTML**
   - Proper heading hierarchy (`h1` → `h2` → `h3`)
   - Schema.org structured data for events

---

## Account Ownership

### Who Owns What?

| Service                 | Owner                   | You         |
| ----------------------- | ----------------------- | ----------- |
| **Domain (Cloudflare)** | Client                  | Manager     |
| **Database (Supabase)** | Client                  | Team member |
| **Images (Cloudinary)** | Client                  | API access  |
| **Frontend (Vercel)**   | Client (after transfer) | Developer   |

### Why Client Must Own Domain

- Domain = business identity
- Avoids legal/billing issues
- Easy handoff if they change developers

### Transfer Process

1. Client creates Cloudflare account (their email)
2. Transfer domain to their account
3. Create Supabase/Cloudinary under their email
4. Add yourself as collaborator
5. Transfer Vercel project when complete

---

## Action Checklist

### Phase 1: Foundation

- [ ] Restructure folders with route groups `(public)` and `(admin)`
- [ ] Set up Supabase project (under client email)
- [ ] Create database tables
- [ ] Set up Cloudinary (under client email)
- [ ] Add keep-alive cron job

### Phase 2: Authentication

- [ ] Implement Supabase Auth
- [ ] Create login page
- [ ] Add middleware for route protection

### Phase 3: Dashboard

- [ ] Build dashboard layout (sidebar, header)
- [ ] Create events list page
- [ ] Create event form (new/edit)
- [ ] Implement image upload to Cloudinary

### Phase 4: Frontend Integration

- [ ] Connect public pages to Supabase
- [ ] Replace hardcoded data with database queries
- [ ] Add per-page metadata
- [ ] Implement `next/image` for all images

### Phase 5: SEO & Polish

- [ ] Add JSON-LD structured data
- [ ] Test Core Web Vitals
- [ ] Add error boundaries (`error.tsx`)
- [ ] Add loading states (`loading.tsx`)

### Phase 6: Handoff

- [ ] Transfer domain to client's Cloudflare
- [ ] Transfer Vercel project to client
- [ ] Document admin credentials
- [ ] Create user guide for dashboard

---

## Summary

| Question            | Answer                                       |
| ------------------- | -------------------------------------------- |
| Hosting             | Vercel (frontend + API), no separate backend |
| Database            | Supabase with keep-alive ping                |
| Images              | Cloudinary (25GB free)                       |
| Authentication      | Supabase Auth (email/password)               |
| Project structure   | Monorepo with route groups                   |
| Dashboard URL       | `imaginesl.com/dashboard`                    |
| If backend fails?   | Public site still works (SSG)                |
| Performance impact? | SSG is faster, not slower                    |
| Account ownership   | Client owns everything                       |
| Total cost          | $0/month                                     |
