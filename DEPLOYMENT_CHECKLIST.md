# ⚡ Quick Deployment Checklist

Use this as a quick reference when deploying. See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 1. Supabase ✅

- [ ] Create new project
- [ ] Run `supabase-schema.sql` in SQL Editor
- [ ] Configure redirect URLs in Authentication settings:
  - `https://YOUR-DOMAIN.com/auth/callback`
  - `https://YOUR-DOMAIN.com/auth/callback?next=/reset-password`
  - `https://YOUR-DOMAIN.com/setup-account`
- [ ] Copy API credentials

---

## 2. Cloudinary ✅

- [ ] Copy Cloud Name from dashboard
- [ ] Get API Key and Secret from Settings → Access Keys
- [ ] Create upload preset:
  - Name: `imagine_events` (exact!)
  - Mode: `Unsigned`
- [ ] Upload hero video to `IMAGINE/` folder

---

## 3. Cloudflare ✅

- [ ] Add DNS records pointing to Vercel:
  - `@` → `cname.vercel-dns.com` (DNS only)
  - `www` → `cname.vercel-dns.com` (DNS only)
- [ ] Set SSL mode to "Full (strict)"
- [ ] (Optional) Copy Zone ID and create API token for analytics

---

## 4. Vercel ✅

- [ ] Import GitHub repository
- [ ] Add ALL environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
SMTP_USER=email@gmail.com
SMTP_PASS=xxxx-xxxx-xxxx-xxxx
CLOUDFLARE_ZONE_ID=xxx (optional)
CLOUDFLARE_API_TOKEN=xxx (optional)
```

- [ ] Deploy
- [ ] Add custom domain in Settings → Domains

---

## 5. Post-Deployment ✅

- [ ] Visit `/login` and create first admin account
- [ ] Confirm email and access `/dashboard`
- [ ] Test event creation with image upload
- [ ] Test contact form email delivery
- [ ] Verify hero video plays correctly

---

## 📋 Environment Variables Reference

| Variable                            | Required | Source                              |
| ----------------------------------- | -------- | ----------------------------------- |
| `NEXT_PUBLIC_SITE_URL`              | ✅       | Your domain                         |
| `NEXT_PUBLIC_SUPABASE_URL`          | ✅       | Supabase → Settings → API           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`     | ✅       | Supabase → Settings → API           |
| `SUPABASE_SERVICE_ROLE_KEY`         | ✅       | Supabase → Settings → API           |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅       | Cloudinary Dashboard                |
| `CLOUDINARY_API_KEY`                | ✅       | Cloudinary → Settings → Access Keys |
| `CLOUDINARY_API_SECRET`             | ✅       | Cloudinary → Settings → Access Keys |
| `SMTP_USER`                         | ✅       | Your email                          |
| `SMTP_PASS`                         | ✅       | Gmail App Password                  |
| `CLOUDFLARE_ZONE_ID`                | ❌       | Cloudflare → Overview               |
| `CLOUDFLARE_API_TOKEN`              | ❌       | Cloudflare → API Tokens             |

---

_Print this checklist for easy reference during deployment!_ 🖨️
