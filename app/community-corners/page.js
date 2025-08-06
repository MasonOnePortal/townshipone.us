import style from "@/components/community-corner/community_corners.module.css";
import PostingFeed from "@/components/community-corner/center/PostingFeed";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Script from "next/script";

export const metadata = {
  title: "Township OH Community | Local Events, News & Neighborhood Activities",
  description:
    "Connect with the Township Ohio local community! Stay updated on community news Township OH, local events, organizations, and neighborhood activities. Join the Township City OH community hub.",
  keywords: [
    "Township OH Community",
    "Township Ohio Local Community",
    "Community news Township OH",
    "Township City OH Community",
    "Township OH local events",
    "Organizations in Township OH",
    "Township Ohio neighborhood activities",
    "Township OH community center",
    "Local community Township Ohio",
    "Township Ohio residents",
    "Community events Township OH",
    "Township OH neighborhood news",
    "Local organizations Township Ohio",
    "Township City community groups",
    "Deerfield Township community",
    "Township OH community",
    "West Chester Township community",
    " Township area community",
  ],
  alternates: {
    canonical: "https://townshipone.us/community/",
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
    url: "https://townshipone.us/community/",
    title: "Township OH Community | Local Events, News & Neighborhood Activities",
    description:
      "Connect with the Township Ohio local community! Stay updated on community news, local events, and neighborhood activities in Township OH.",
    siteName: "TownshipOne Community",
    images: [
      {
        url: "/imgs/community-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Township OH Community - Local Events and Neighborhood Activities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Township OH Community | Local Events & Neighborhood Activities",
    description:
      "Connect with the Township Ohio local community! Stay updated on local events and community news.",
    images: ["/imgs/community-banner.jpg"],
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Deerfield Township & Symmes Township, OHio",
    "geo.position": "39.5151;-84.3983",
    ICBM: "39.5151, -84.3983",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Township OH Community Hub",
  description:
    "Local community platform connecting residents of Township OH and surrounding areas with news, events, and neighborhood activities",
  url: "https://townshipone.us/community/",
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
  serviceType: [
    "Community News",
    "Local Events",
    "Neighborhood Activities",
    "Community Announcements",
    "Lost and Found",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Township",
    addressRegion: "OH",
    addressCountry: "US",
  },
};

export default function CommunityPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Script
        id="community-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div className={style.center_data_wrap}>
        <PostingFeed />
      </div>
    </Suspense>
  );
}
