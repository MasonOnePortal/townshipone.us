import Blog from "@/components/blog/Blog";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Script from "next/script";

export const metadata = {
  title: "Township OH Blog | Local News, Events & Community Stories",
  description:
    "Discover the best of Township OH through our local blog. Read about things to do in Township OH, local events, community news, living in Township OH, and exploring everything our city offers.",
  keywords: [
    "Things to do in Township OH blog",
    "Local events Township OH blog",
    "Township OH news blog",
    "Living in Township OH blog",
    "Township City OH community blog",
    "Exploring Township OH blog",
    "Best of Township OH blog",
    "Township Ohio blog",
    "Township OH lifestyle blog",
    "Local news Township Ohio",
    "Township OH community stories",
    "Township Ohio events blog",
    "Township OH local insights",
    "Community blog Township OH",
    "Township Ohio local guide",
    "Deerfield Township blog",
    "Township OH blog",
    "West Chester Township blog",
    "Greater Township area blog",
  ],
  alternates: {
    canonical: "https://townshipone.us/blog/",
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
    url: "https://townshipone.us/blog/",
    title: "Township OH Blog | Local News, Events & Community Stories",
    description:
      "Discover the best of Township OH through our local blog. Read about things to do, local events, and community stories in Township Ohio.",
    siteName: "TownshipOne Blog",
    images: [
      {
        url: "/imgs/blog-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Township OH Blog - Local News and Community Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Township OH Blog | Local News, Events & Community Stories",
    description:
      "Discover the best of Township OH through our local blog featuring community stories and local events.",
    images: ["/imgs/blog-banner.jpg"],
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Township, Ohio",
    "geo.position": "39.5151;-84.3983",
    ICBM: "39.5151, -84.3983",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "TownshipOne Blog",
  description:
    "Local blog covering news, events, community stories, and insights about living in Township OH and surrounding areas",
  url: "https://townshipone.us/blog/",
  publisher: {
    "@type": "Organization",
    name: "TownshipOne",
    url: "https://townshipone.us",
  },
  about: [
    {
      "@type": "Thing",
      name: "Township Ohio Community",
    },
    {
      "@type": "Thing",
      name: "Local Events",
    },
    {
      "@type": "Thing",
      name: "Community News",
    },
  ],
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
};

export default function BlogPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Blog />
    </Suspense>
  );
}
