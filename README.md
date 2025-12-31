# IMAGINE Entertainment Website

A modern, high-performance event management and showcase website built with Next.js 16, featuring a stunning dark theme, smooth animations, and a comprehensive admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)

## ✨ Features

### Public Website

- 🎬 **Stunning Hero Section** with Cloudinary-hosted video
- 📸 **Events Gallery** with beautiful grid layouts
- 📧 **Contact Form** with email notifications
- 🌙 **Dark/Light Mode** with smooth transitions
- 📱 **Fully Responsive** design
- ⚡ **Optimized Performance** with lazy loading

### Admin Dashboard

- 🔐 **Secure Authentication** via Supabase
- 📊 **Analytics Dashboard** with Cloudflare integration
- 🎉 **Event Management** (Create, Edit, Publish)
- 🖼️ **Gallery Management** with drag-and-drop uploads
- 👥 **User Management** for team access
- 📝 **Activity Logging** for audit trails

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Media Storage**: Cloudinary
- **Animations**: Framer Motion, GSAP
- **UI Components**: Radix UI, shadcn/ui
- **Hosting**: Vercel
- **DNS/CDN**: Cloudflare

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (admin)/           # Admin dashboard routes
│   ├── api/               # API routes
│   └── auth/              # Authentication routes
├── components/            # React components
│   ├── dashboard/         # Admin dashboard components
│   ├── layout/            # Layout components
│   └── ui/                # UI primitives (shadcn)
├── lib/                   # Utilities and configurations
│   ├── supabase/          # Supabase client configs
│   └── actions/           # Server actions
├── public/                # Static assets
└── styles/                # Global styles
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account
- Cloudinary account

### Development

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/imagine-entertainment-website.git
   cd imagine-entertainment-website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

4. Fill in your environment variables in `.env.local`

5. Run database migrations:

   - Open Supabase SQL Editor
   - Run the contents of `supabase-schema.sql`

6. Start development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

| Document                                     | Description                          |
| -------------------------------------------- | ------------------------------------ |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Complete production deployment guide |
| [CLIENT_HANDOVER.md](./CLIENT_HANDOVER.md)   | Quick setup guide for clients        |
| [ARCHITECTURE.md](./ARCHITECTURE.md)         | Technical architecture overview      |
| [EMAIL_SETUP.md](./EMAIL_SETUP.md)           | Email configuration instructions     |

## 🔧 Environment Variables

See [.env.example](./.env.example) for all required environment variables.

### Required

- `NEXT_PUBLIC_SITE_URL` - Your production URL
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `SMTP_USER` - Email address for contact form
- `SMTP_PASS` - Email app password

### Optional

- `CLOUDFLARE_ZONE_ID` - For analytics
- `CLOUDFLARE_API_TOKEN` - For analytics

## 📜 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Service role key only used server-side
- Authentication required for admin routes
- Activity logging for audit trails

## 📄 License

This project is proprietary and confidential.

---

_Built with ❤️ for IMAGINE Entertainment_
