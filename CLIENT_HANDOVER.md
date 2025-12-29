# Imagine Entertainment Website - Client Handover & Setup Guide

This guide provides step-by-step instructions for setting up the Imagine Entertainment website for production. It covers all necessary accounts, environment variables, and service configurations.

## 1. Required Accounts

Before starting, create accounts on the following platforms:

1.  **Supabase** (Database & Auth): [https://supabase.com/](https://supabase.com/)
2.  **Cloudinary** (Image Hosting): [https://cloudinary.com/](https://cloudinary.com/)
3.  **Vercel** (Hosting/Deployment): [https://vercel.com/](https://vercel.com/) (Recommended)
4.  **Email Provider** (Gmail, Resend, or Outlook) for sending emails.

---

## 2. Environment Variables

You will need to configure the following environment variables in your local `.env.local` file (for development) and in your Vercel Project Settings (for production).

| Variable Name                       | Description                                               | Where to find it                          |
| :---------------------------------- | :-------------------------------------------------------- | :---------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | The URL of your website (e.g., `https://your-domain.com`) | Your Vercel deployment URL                |
| `NEXT_PUBLIC_SUPABASE_URL`          | Supabase API URL                                          | Supabase > Settings > API                 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`     | Supabase Anonymous Key (Client-side safe)                 | Supabase > Settings > API                 |
| `SUPABASE_SERVICE_ROLE_KEY`         | Supabase Service Role Key (**Secret!**)                   | Supabase > Settings > API                 |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name                                     | Cloudinary Dashboard                      |
| `SMTP_USER`                         | Email address for sending notifications                   | Your Email Provider                       |
| `SMTP_PASS`                         | App Password (NOT your normal password)                   | Google Account > Security > App Passwords |
| `CLOUDFLARE_API_TOKEN`              | (Optional) For Analytics                                  | Cloudflare Dashboard                      |
| `CLOUDFLARE_ZONE_ID`                | (Optional) For Analytics                                  | Cloudflare Dashboard                      |

---

## 3. Step-by-Step Setup

### Step 1: Supabase (Database)

1.  Create a new project on **Supabase**.
2.  Go to the **SQL Editor** in the left sidebar.
3.  Click **New Query**.
4.  Open the file `supabase-schema.sql` from this project's root folder.
5.  Copy the **entire content** of `supabase-schema.sql` and paste it into the Supabase query editor.
6.  Click **Run** to set up your database tables and security policies.
7.  Go to **Project Settings > API** to copy your `URL`, `anon public` key, and `service_role` key.

### Step 2: Cloudinary (Images)

1.  Log in to **Cloudinary**.
2.  Go to **Settings (Gear Icon) > Upload**.
3.  Scroll down to **Upload presets** and click **Add upload preset**.
4.  **Crucial Step**:
    - **Upload preset name**: `imagine_events` (Must match exactly!)
    - **Signing Mode**: `Unsigned`
    - **Folder**: `IMAGINE/General` (Optional, keeps things organized)
5.  Save the preset.
6.  Go to your **Dashboard** to copy your **Cloud Name**.

### Step 3: Deployment (Vercel)

1.  Push this code to a **GitHub repository**.
2.  Log in to **Vercel** and click **Add New > Project**.
3.  Import your GitHub repository.
4.  In the "Configure Project" screen, expand **Environment Variables**.
5.  Add all the variables listed in Section 2.
6.  Click **Deploy**.

---

## 4. First-Time Usage

1.  Once deployed, visit your website URL.
2.  Go to `/login` or the hidden admin route to Create an Account (or use the Sign Up feature if enabled).
3.  The first user will manage the site via the `/dashboard`.

## 5. Code Customization

If you need to change branding:

- **Logo/Title**: Edit `app/layout.tsx` (Metadata) and `components/layout/sidebar.tsx` (Sidebar Logo).
- **Colors**: Edit `globals.css` (Tailwind CSS variables).
