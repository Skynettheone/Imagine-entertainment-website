export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.imaginesl.com/#organization",
        "name": "Imagine Entertainment (Pvt) Ltd",
        "legalName": "Imagine Entertainment (Pvt) Ltd",
        "url": "https://www.imaginesl.com",
        "logo": "https://www.imaginesl.com/favicon/android-chrome-512x512.png",
        "foundingDate": "1989",
        "slogan": "Sri Lanka's Premier Event Production Company",
        "description": "With over 37 years of excellence, Imagine Entertainment is Sri Lanka's leading event production company, delivering world-class corporate events, concerts, television production, and luxury experiences.",
        "sameAs": [
          "https://www.facebook.com/imagineentertainmentsl",
          "https://www.instagram.com/imagineentertainmentsl",
          "https://www.linkedin.com/company/imagine-entertainment-pvt-ltd"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+94-777-313-233",
          "contactType": "customer service",
          "areaServed": "LK",
          "availableLanguage": ["English", "Sinhala", "Tamil"]
        },
        "knowsAbout": [
          "Event Production",
          "Corporate Events",
          "Concert Production",
          "Television Production",
          "Stage Lighting",
          "Audio Visual Services",
          "LED Wall Solutions",
          "Brand Activations"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.imaginesl.com/#localbusiness",
        "name": "Imagine Entertainment (Pvt) Ltd",
        "image": "https://www.imaginesl.com/og-image.jpg",
        "url": "https://www.imaginesl.com",
        "telephone": "+94-777-313-233",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "No: 97 delkanda Old Kesbewa Rd",
          "addressLocality": "Nugegoda",
          "postalCode": "10250",
          "addressRegion": "Western Province",
          "addressCountry": "LK"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 6.8649,
          "longitude": 79.8997
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.4",
          "reviewCount": "103",
          "bestRating": "5",
          "worstRating": "1"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Sri Lanka"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Event Production Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Corporate Event Production"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Concert & Festival Production"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Television & Film Production"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sound & Lighting Services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "LED Wall & AV Solutions"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.imaginesl.com/#website",
        "url": "https://www.imaginesl.com",
        "name": "Imagine Entertainment",
        "description": "Sri Lanka's Premier Event Production Company - 37+ Years of Excellence",
        "publisher": {
          "@id": "https://www.imaginesl.com/#organization"
        },
        "inLanguage": "en-US"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
