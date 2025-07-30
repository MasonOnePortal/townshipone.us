import Head from "next/head";
import HomeClient from "./home-client";

export const metadata = {
  title:
    "Township OH Business Directory | Local Business Listings & Services",
  description:
    "Discover local businesses, deals, real estate, and job opportunities in Township OH, and surrounding areas. Your complete Greater Township Ohio business directory.",
  keywords: [
    "Township Ohio",
    "Township City OH",
    "Township OH City Portal",
    "Township OH Business Directory",
    "Township Ohio local business",
    "Township Business Listings",
    "Deals and Promotion in Township OH",
    "Real Estate Listings Township Ohio",
    "Job Listings Township OH",
    "City Council Township OH",
    "Township OH News",
    "Schools in Township OH",
  ],
  authors: [{ name: "Township City Portal" }],
  creator: "Township City Portal",
  publisher: "Township City Portal",
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
    url: "https://townshipone.us",
    title:
      "Township OH Business Directory | Local Business Listings & Services",
    description:
      "Discover local businesses, deals, real estate, and job opportunities in Township OH and surrounding areas. Your complete Greater Township Ohio business directory.",
    siteName: "Township City Portal",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Township OH Business Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Township OH Business Directory | Local Business Listings & Services",
    description:
      "Discover local businesses, deals, real estate, and job opportunities in Township OH and surrounding areas.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://townshipone.us",
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Township, Ohio",
    "geo.position": "39.3601;-84.3099",
    ICBM: "39.3601, -84.3099",
  },
};

export default function Home() {
  return (
    <>
      <HomeClient />
    </>
  );
}
