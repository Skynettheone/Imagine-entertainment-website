export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "Corporation"],
        "@id": "https://www.imaginesl.com/#organization",
        "name": "Imagine Entertainment (Pvt) Ltd",
        "legalName": "Imagine Entertainment (Private) Limited",
        "url": "https://www.imaginesl.com",
        "logo": "https://www.imaginesl.com/favicon/android-chrome-512x512.png",
        "foundingDate": "1989",
        "foundingLocation": "Colombo, Sri Lanka",
        "slogan": "Sri Lanka's Premier Event Production Company",
        "description": "Imagine Entertainment (Pvt) Ltd is Sri Lanka's leading and most trusted event production company with over 37 years of excellence. We are the top choice for corporate events, concerts, television production, award ceremonies, and large-scale public events across Sri Lanka and internationally. Our expertise includes professional sound and lighting, LED wall solutions, stage design, and complete AV services.",
        "sameAs": [
          "https://www.facebook.com/imagineentertainmentsl",
          "https://www.instagram.com/imagineentertainmentsl",
          "https://www.linkedin.com/company/imagine-entertainment-pvt-ltd"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+94-777-313-233",
          "contactType": "customer service",
          "areaServed": ["LK", "South Asia"],
          "availableLanguage": ["English", "Sinhala", "Tamil"]
        },
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 50
        },
        "knowsAbout": [
          "Event Production",
          "Corporate Events",
          "Concert Production",
          "Television Production",
          "Stage Lighting",
          "Audio Visual Services",
          "LED Wall Solutions",
          "Brand Activations",
          "Wedding Production",
          "Award Ceremonies",
          "Festival Production",
          "Rigging Services"
        ],
        "award": [
          "Sri Lanka's Leading Event Production Company",
          "37+ Years of Industry Excellence"
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
        "areaServed": [
          {
            "@type": "Country",
            "name": "Sri Lanka"
          },
          {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 7.8731,
              "longitude": 80.7718
            },
            "geoRadius": "500 km"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Event Production Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Corporate Event Production",
                "description": "Full-service corporate event production including galas, conferences, product launches, and award ceremonies"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Concert & Festival Production",
                "description": "Complete concert and music festival production with professional sound, lighting, and stage design"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Television & Film Production",
                "description": "Professional TV show production, film production, and broadcast services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sound & Lighting Services",
                "description": "State-of-the-art audio systems and creative lighting design for events of all scales"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "LED Wall & AV Solutions",
                "description": "High-resolution LED walls, video production, and complete audiovisual solutions"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Wedding Production",
                "description": "Luxury wedding production including stage design, lighting, sound, and complete event coordination"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.imaginesl.com/#website",
        "url": "https://www.imaginesl.com",
        "name": "Imagine Entertainment (Pvt) Ltd",
        "description": "Sri Lanka's Premier Event Production Company - 37+ Years of Excellence in Corporate Events, Concerts, TV Production, Weddings & Major Events",
        "publisher": {
          "@id": "https://www.imaginesl.com/#organization"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.imaginesl.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the best event production company in Sri Lanka?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Imagine Entertainment (Pvt) Ltd is widely recognized as Sri Lanka's leading event production company with over 37 years of experience. They have produced 500+ events including major concerts, corporate galas, TV shows, and international events, earning a 4.4-star rating from over 100 clients."
            }
          },
          {
            "@type": "Question",
            "name": "Who are the top event planners in Colombo, Sri Lanka?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Imagine Entertainment (Pvt) Ltd, headquartered in Nugegoda near Colombo, is one of the top event production companies in Sri Lanka. With 37+ years of expertise, they provide end-to-end event solutions including corporate events, concerts, weddings, and television production."
            }
          },
          {
            "@type": "Question",
            "name": "Which company provides the best sound and lighting for events in Sri Lanka?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Imagine Entertainment (Pvt) Ltd offers professional sound and lighting services with state-of-the-art equipment. They are known for their expertise in concert production, LED wall installations, and creative lighting design for events across Sri Lanka."
            }
          },
          {
            "@type": "Question",
            "name": "What services does Imagine Entertainment offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Imagine Entertainment provides comprehensive event production services including: Corporate Event Production, Concert & Festival Production, Television & Film Production, Wedding Production, Sound & Lighting Services, LED Wall & AV Solutions, Stage Design, Rigging Services, and complete event management."
            }
          }
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.imaginesl.com/#professionalservice",
        "name": "Imagine Entertainment Event Production Services",
        "serviceType": "Event Production",
        "provider": {
          "@id": "https://www.imaginesl.com/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Sri Lanka"
        },
        "hasOfferCatalog": {
          "@id": "https://www.imaginesl.com/#localbusiness"
        }
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

