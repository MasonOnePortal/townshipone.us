import News from "@/components/News/News";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Script from "next/script";

export const metadata = {
  title: "Township OH News | Local Breaking News & Latest Updates",
  description:
    "Stay informed with the latest Township OH news, breaking news, and local updates. Your trusted source for Township Ohio local news, city news, and community updates.",
  keywords: [
    "Township OH News",
    "Township Ohio Local News",
    "Township City OH News",
    "Local News Township OH",
    "Township OH breaking news",
    "Township OH latest news",
    "Township OH city news",
    "Township Ohio news updates",
    "Local news Township Ohio",
    "Township OH community news",
    "Township Ohio headlines",
    "Breaking news Township OH",
    "Township OH local updates",
    "City news Township Ohio",
    "Deerfield Township news",
    "Township OH news",
    "West Chester Township news",
    " Township area news",
  ],
  alternates: {
    canonical: "https://townshipone.us/news/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://townshipone.us/news/",
    title: "Township OH News | Local Breaking News & Latest Updates",
    description:
      "Stay informed with the latest Township OH news, breaking news, and local updates from your trusted Township Ohio news source.",
    siteName: "Townshipone News",
    images: [
      {
        url: "/imgs/news-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Township OH News - Local Breaking News and Updates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Township OH News | Local Breaking News & Latest Updates",
    description:
      "Stay informed with the latest Township OH news and breaking news from your trusted local source.",
    images: ["/imgs/news-banner.jpg"],
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Deerfield Township & Symmes Township, OHio",
    "geo.position": "39.3601;-84.3099",
    ICBM: "39.3601, -84.3099",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "TownshipOne News",
  description:
    "Local news organization covering Township OH and surrounding communities with breaking news and updates",
  url: "https://townshipone.us/news/",
  logo: {
    "@type": "ImageObject",
    url: "https://townshipone.us/logo.png",
  },
  sameAs: ["https://townshipone.us"],
  areaServed: [
    {
      "@type": "City",
      name: "Township",
      addressRegion: "OH",
      addressCountry: "US",
    },
    {
      "@type": "AdministrativeArea",
      name: "Deerfield Township",
      addressRegion: "OH",
      addressCountry: "US",
    },
    {
      "@type": "City",
      name: "Township",
      addressRegion: "OH",
      addressCountry: "US",
    },
    {
      "@type": "AdministrativeArea",
      name: "West Chester Township",
      addressRegion: "OH",
      addressCountry: "US",
    },
  ],
  publishingPrinciples: "https://townshipone.us/editorial-guidelines",
  diversityPolicy: "https://townshipone.us/diversity-policy",
};

export default async function NewsPage() {
  return (

    <Suspense fallback={<Loading />}>
      <Script
        id="news-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <News />
    </Suspense>
  );
}
