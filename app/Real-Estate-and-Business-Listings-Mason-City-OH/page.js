import { Loading } from "@/components/Loading";
import RealEstate from "@/components/realestates/RealEstate";
import { Suspense } from "react";
import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Script from "next/script";

export const metadata = {
  title:
    "Township OH Real Estate Listings | Homes for Sale & Properties in Township Ohio",
  description:
    "Discover Township OH real estate listings including homes for sale, apartments for rent, commercial properties, and land. Connect with local real estate agents and explore Township Ohio properties for sale.",
  keywords: [
    "Township OH Real Estate Listings",
    "Real Estate Township OH",
    "Township City OH Real Estate",
    "Homes for sale Township OH",
    "Apartments for rent Township OH",
    "Commercial real estate Township OH",
    "Land for sale Township OH",
    "Real estate agents Township OH",
    "Property listings Township OH",
    "Township Ohio properties for sale",
    "Township OH housing market",
    "Real estate Township Ohio",
    "Township OH homes",
    "Properties Township OH",
    "Township Ohio real estate market",
    "Deerfield Township real estate",
    "Township OH properties",
    "West Chester Township homes",
    "Symmes Township real estate",
    "Landen OH properties",
    "Township OH real estate",
  ],
  alternates: {
    canonical: "https://townshipone.us/real-estate/",
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
    url: "https://townshipone.us/real-estate/",
    title:
      "Township OH Real Estate Listings | Homes for Sale & Properties in Township Ohio",
    description:
      "Discover Township OH real estate listings including homes for sale, apartments for rent, and commercial properties in Township Ohio and surrounding areas.",
    siteName: "TownshipOne Real Estate",
    images: [
      {
        url: "/imgs/real-estate-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Township OH Real Estate - Homes for Sale and Property Listings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Township OH Real Estate Listings | Homes for Sale in Township Ohio",
    description:
      "Discover Township OH real estate listings including homes for sale and properties in Township Ohio.",
    images: ["/imgs/real-estate-banner.jpg"],
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
  "@type": "RealEstateAgent",
  name: "TownshipOne Real Estate Directory",
  description:
    "Comprehensive real estate listings and agent directory for Township OH and surrounding areas",
  url: "https://townshipone.us/real-estate/",
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
    "Residential Real Estate",
    "Commercial Real Estate",
    "Property Management",
    "Real Estate Consultation",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Township",
    addressRegion: "OH",
    addressCountry: "US",
  },
};

const RealStatePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Script
        id="real-estate-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <RealEstate />
    </Suspense>
  );
};

export default RealStatePage;
