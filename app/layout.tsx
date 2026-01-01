import type React from "react"
import type { Metadata, Viewport } from "next"
import { Outfit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { GoogleAnalytics } from "@/components/seo/google-analytics"
import { JsonLd } from "@/components/seo/json-ld"
import { AutoLogoutListener } from "@/components/auth/auto-logout-listener"
import { cn } from "@/lib/utils"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "IMAGINE ENTERTAINMENT | Sri Lanka's Premier Event Production Company",
  description:
    "With over 35 years of excellence, Imagine Entertainment delivers world-class event production across Sri Lanka. From corporate galas, musical concerts, and awards ceremonies to television production, weddings, and stadium-scale events — we bring extraordinary visions to life.",
  keywords: [
    // Core Brand
    "Imagine Entertainment",
    "Imagine Entertainment Sri Lanka",
    "Imagine Events",
    "Imagine Event Production",
    // Core Services
    "Event Production Company",
    "Event Management Company Sri Lanka",
    "Corporate Event Production",
    "Luxury Event Production",
    "End-to-End Event Solutions",
    "Turnkey Event Production",
    "Live Event Specialists",
    // Technical Services
    "Professional Sound & Lighting",
    "Stage Design & Setup",
    "LED Wall Solutions",
    "Audiovisual Production",
    "Event Technical Partner",
    "Show Production Services",
    "Concert Production",
    "Festival Production",
    // Creative & Experience
    "Immersive Event Experiences",
    "Experiential Marketing",
    "Creative Event Design",
    "Bespoke Event Experiences",
    "Premium Event Styling",
    // Event Types
    "Corporate Galas",
    "Award Ceremonies",
    "Product Launches",
    "Brand Activations",
    "Conferences & Summits",
    "Weddings Sri Lanka",
    // Broadcast & Virtual
    "Broadcast Production",
    "Live Streaming Services",
    "Hybrid Events",
    "Virtual Event Production",
    "Television & Film Production",
    // Corporate Specific
    "Corporate Entertainment Solutions",
    "Corporate Events Colombo",
    // Authority & Location
    "Award-Winning Event Production",
    "Industry-Leading Event Experts",
    "Trusted Technical Partner",
    "Professional Event Team",
    "35+ Years of Experience",
    "High-End Event Production",
    "Event Production Sri Lanka",
    "Colombo Event Production",
    "Sri Lanka Event Specialists"
  ],
  authors: [{ name: "Imagine Entertainment (Pvt) Ltd" }],
  creator: "Imagine Entertainment",
  publisher: "Imagine Entertainment",
  metadataBase: new URL('https://www.imaginesl.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.imaginesl.com/",
    title: "IMAGINE ENTERTAINMENT | Sri Lanka's Premier Event Production",
    description: "35+ years of creating extraordinary experiences. Corporate events, concerts, TV production, weddings & major events across Sri Lanka.",
    siteName: "Imagine Entertainment",
    images: [{
      url: '/og-image.jpg', // Ensure this exists or use a default
      width: 1200,
      height: 630,
      alt: 'Imagine Entertainment Event Production'
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "IMAGINE ENTERTAINMENT | Event Production Specialists",
    description: "Sri Lanka's premier event production company. 35+ years of excellence in corporate events, concerts, TV production & more.",
    // creator: "@imagineentertainment", // Uncomment if valid handle exists
    images: ['/og-image.jpg']
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={cn("font-sans antialiased overflow-x-hidden", outfit.variable)} suppressHydrationWarning>
        <AutoLogoutListener />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <JsonLd />
          <GoogleAnalytics />
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
