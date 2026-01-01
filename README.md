# IMAGINE Entertainment - Website & Management System

> A premium, high-performance web platform built for IMAGINE Entertainment, featuring a sophisticated event management dashboard and a high-speed public portfolio.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![Supabase](https://img.shields.io/badge/Supabase-DB%20%26%20Auth-green)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Optimization-blue)
![Vercel](https://img.shields.io/badge/Vercel-Hosted-black)

---

## 🌟 Overview

IMAGINE Entertainment's website is a modern, full-stack application designed to showcase a premium entertainment portfolio. It features a blazing-fast public interface for clients and a robust, secure dashboard for staff to manage events, galleries, and analytics.

### Key Features
- **Public Portfolio**: Fast, SEO-optimized event listings and image galleries using Static Site Generation (SSG).
- **Admin Dashboard**: Full CRUD for events, including multi-image gallery uploads.
- **High-Performance Images**: Automated optimization and delivery via Cloudinary CDN.
- **Secure Authentication**: Protected admin routes using Supabase Auth and Next.js Middleware.
- **Analytics Integration**: Real-time traffic monitoring and event performance tracking.
- **Automated Maintenance**: Keep-alive cron jobs to ensure the database stays active on free tiers.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| **Database** | [Supabase (PostgreSQL)](https://supabase.com/) |
| **Authentication** | [Supabase Auth](https://supabase.com/auth) |
| **Image Storage** | [Cloudinary](https://cloudinary.com/) |
| **Hosting** | [Vercel](https://vercel.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A [Supabase](https://supabase.com/) project
- A [Cloudinary](https://cloudinary.com/) account
- (Optional) A [Cloudflare](https://www.cloudflare.com/) account for analytics

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Skynettheone/Imagine-entertainment-website.git
   cd Imagine-entertainment-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and fill in the following:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # SMTP (for emails)
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password

   # Analytics
   CLOUDFLARE_API_TOKEN=your_token
   CLOUDFLARE_ZONE_ID=your_zone_id
   ```

4. **Initialize Database:**
   Run the SQL provided in `supabase-schema.sql` within your Supabase SQL Editor to create the necessary tables and policies.

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 🏗️ Architecture

The project follows a **Monorepo** structure leveraging Next.js Route Groups for clean separation:

- **`(public)`**: Contains the visitor-facing pages (Home, Work, Gallery, Contact). Optimized for speed with SSG.
- **`(admin)`**: Contains the secure dashboard and login flows.
- **`app/api`**: Serverless functions for image uploads, data management, and cron jobs.
- **`lib/`**: Shared utilities for database access, authentication logic, and cloudinary integration.

### Database Schema
- `events`: Stores event details (title, category, date, cover image, etc).
- `event_images`: Stores additional gallery images linked to specific events.
- `activity_logs`: Tracks admin actions for security and audit purposes.

---

## 📦 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Checks for linting errors.

---

## 🌐 Deployment

This project is optimized for **Vercel**. 

1. Connect your GitHub repository to Vercel.
2. Add your environment variables in the Vercel Dashboard.
3. Configure the **Cron Job** (as defined in `vercel.json`) to run the `api/keep-alive` route every 3 days. This prevents your Supabase instance from pausing due to inactivity.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Support

For technical support or inquiries, please contact the development team at [support@imaginesl.com](mailto:support@imaginesl.com).

Designed & Developed by **Imagine Entertainment Dev Team**.
