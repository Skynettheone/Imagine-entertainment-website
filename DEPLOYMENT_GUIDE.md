# 🚀 IMAGINE Entertainment - Production Deployment Guide

This comprehensive guide walks you through deploying the IMAGINE Entertainment website to production using **Vercel**, **Supabase**, **Cloudinary**, and **Cloudflare**.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Supabase project created
- [ ] Cloudinary account set up
- [ ] Cloudflare domain configured
- [ ] Vercel account ready
- [ ] GitHub repository with the code

---

## 1️⃣ Supabase Setup (Database & Authentication)

### Create Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a strong database password (save it securely)
3. Select the region closest to your target audience

### Setup Database Schema

1. Go to **SQL Editor** in the Supabase dashboard
2. Click **New Query**
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste and click **Run**

> ⚠️ **Important**: This creates all tables, indexes, and Row Level Security policies

### Get Your API Keys

Navigate to **Settings → API** and copy:

| Key                    | Environment Variable            |
| ---------------------- | ------------------------------- |
| Project URL            | `NEXT_PUBLIC_SUPABASE_URL`      |
| anon public            | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| service_role (secret!) | `SUPABASE_SERVICE_ROLE_KEY`     |

### Configure Authentication

1. Go to **Authentication → URL Configuration**
2. Set **Site URL** to your production domain: `https://your-domain.com`
3. Add **Redirect URLs**:
   - `https://your-domain.com/auth/callback`
   - `https://your-domain.com/auth/callback?next=/reset-password`
   - `https://your-domain.com/setup-account`

---

## 2️⃣ Cloudinary Setup (Image & Video Hosting)

### Get Your Credentials

1. Go to [cloudinary.com](https://cloudinary.com) and log in
2. From **Dashboard**, copy your **Cloud Name**
3. Go to **Settings → Access Keys** to get your API Key and Secret

### Create Upload Preset

1. Go to **Settings → Upload**
2. Scroll to **Upload presets** and click **Add upload preset**
3. Configure:
   - **Preset name**: `imagine_events` ⚠️ _Must be exact!_
   - **Signing Mode**: `Unsigned`
   - **Folder**: `IMAGINE/General` (optional, for organization)
4. Save the preset

### Upload Hero Video (If not already done)

1. Go to **Media Library**
2. Create folder: `IMAGINE`
3. Upload the hero video (it should be named `Final_Web` or update the reference in `components/hero.tsx`)

---

## 3️⃣ Cloudflare Setup (DNS & Domain)

### Configure DNS for Vercel

1. Go to your domain in [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **DNS → Records**
3. Add these records:

| Type  | Name | Content                | Proxy Status          |
| ----- | ---- | ---------------------- | --------------------- |
| CNAME | @    | `cname.vercel-dns.com` | DNS only (gray cloud) |
| CNAME | www  | `cname.vercel-dns.com` | DNS only (gray cloud) |

> ⚠️ **Important**: Set proxy status to "DNS only" (gray cloud) for SSL to work with Vercel

### Get Analytics Tokens (Optional)

If you want Cloudflare analytics in the dashboard:

1. Copy your **Zone ID** from the domain overview page
2. Go to **My Profile → API Tokens → Create Token**
3. Use the "Cloudflare Analytics Read" template
4. Copy the token

---

## 4️⃣ Vercel Deployment

### Connect Repository

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **Add New → Project**
3. Import your GitHub repository

### Configure Environment Variables

In the **Environment Variables** section, add ALL of these:

```
# Required - Site
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Required - Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# Required - Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abc123...

# Required - Email (Gmail with App Password)
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx

# Optional - Cloudflare Analytics
CLOUDFLARE_ZONE_ID=your-zone-id
CLOUDFLARE_API_TOKEN=your-api-token
```

### Deploy

1. Click **Deploy**
2. Wait for the build to complete (usually 2-3 minutes)
3. Vercel will provide a preview URL

### Connect Custom Domain

1. Go to **Settings → Domains**
2. Add your custom domain (e.g., `your-domain.com`)
3. Follow the verification steps (Cloudflare DNS should already be configured)

---

## 5️⃣ Post-Deployment Setup

### Create Admin Account

1. Visit your deployed site: `https://your-domain.com/login`
2. Click **Sign Up** to create the first admin account
3. Check your email for the confirmation link
4. After confirming, you can access the dashboard at `/dashboard`

### Verify Everything Works

- [ ] Homepage loads with hero video
- [ ] Contact form sends emails
- [ ] Login/Signup works
- [ ] Dashboard is accessible
- [ ] Events can be created with images
- [ ] Gallery uploads work
- [ ] Analytics show data (if Cloudflare configured)

---

## 🔧 Gmail App Password Setup

If using Gmail for the contact form:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Go to **App Passwords** (search for it in the account settings)
4. Select **App**: Mail, **Device**: Other (Custom name)
5. Enter a name like "IMAGINE Website"
6. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)
7. Use this as `SMTP_PASS` (remove spaces)

---

## 🔄 Keeping Supabase Active

The website includes a keep-alive mechanism in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/keep-alive",
      "schedule": "0 0 */3 * *"
    }
  ]
}
```

This pings the database every 3 days to prevent Supabase free tier from pausing.

> 💡 **Note**: Vercel Pro plan is required for cron jobs. On the free plan, the database may pause after 1 week of inactivity.

---

## 🆘 Troubleshooting

### Build Fails

- Check that all environment variables are set correctly
- Ensure there are no typos in the variable names
- Check the Vercel build logs for specific errors

### Images Not Loading

- Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is correct
- Check that images exist in Cloudinary with the correct paths
- Ensure the `imagine_events` upload preset exists

### Authentication Not Working

- Verify Supabase URL and keys are correct
- Check that redirect URLs are configured in Supabase
- Ensure `NEXT_PUBLIC_SITE_URL` matches your actual domain

### Contact Form Not Sending

- Verify SMTP credentials are correct
- For Gmail, ensure you're using an App Password (not your regular password)
- Check that 2FA is enabled on your Gmail account

### Database Errors

- Verify the schema was run successfully in Supabase
- Check that RLS policies are in place
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set for admin operations

---

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Check Supabase logs (Database → Logs)
4. Review this guide for missed steps

---

_Last updated: December 31, 2024_
