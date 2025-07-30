import JobListing from "@/components/jobs/JobListing";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import Banner from "@/components/banner/Banner";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Script from "next/script";

export const metadata = {
  title:
    "Jobs Township OH | Local Employment & Career Opportunities in Township Ohio",
  description:
    "Find the latest jobs Township OH has to offer. Explore employment opportunities, technology jobs, healthcare positions, part-time work, and remote jobs in Township Ohio and surrounding areas.",
  keywords: [
    "Jobs Township OH",
    "Township Ohio job listings",
    "Employment Township OH",
    "Careers Township OH",
    "Technology Jobs Township OH",
    "Healthcare Jobs Township OH",
    "Part-time Jobs Township OH",
    "Remote Jobs Township OH",
    "Local jobs Township City OH",
    "Career opportunities Township OH",
    "Hiring in Township Ohio",
    "Township OH employment",
    "Job openings Township Ohio",
    "Work in Township OH",
    "Township Ohio careers",
    "Deerfield Township jobs",
    "Township OH employment",
    "West Chester Township careers",
    "Symmes Township jobs",
    "Landen OH job opportunities",
    "Township OH employment",
  ],
  alternates: {
    canonical: "https://townshipone.us/jobs/",
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
    url: "https://townshipone.us/jobs/",
    title:
      "Jobs Township OH | Local Employment & Career Opportunities in Township Ohio",
    description:
      "Find the latest jobs Township OH has to offer. Explore employment opportunities, technology jobs, healthcare positions, and remote work in Township Ohio.",
    siteName: "TownshipOne Jobs",
    images: [
      {
        url: "/imgs/jobs-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Jobs Township OH - Local Employment Opportunities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs Township OH | Local Employment & Career Opportunities",
    description:
      "Find the latest jobs Township OH has to offer. Explore local employment and career opportunities.",
    images: ["/imgs/jobs-banner.jpg"],
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
  "@type": "JobPosting",
  hiringOrganization: {
    "@type": "Organization",
    name: "TownshipOne Job Board",
    sameAs: "https://townshipone.us",
  },
  jobLocation: [
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Township",
        addressRegion: "OH",
        addressCountry: "US",
      },
    },
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Deerfield Township",
        addressRegion: "OH",
        addressCountry: "US",
      },
    },
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Township",
        addressRegion: "OH",
        addressCountry: "US",
      },
    },
  ],
  description:
    "Local job opportunities in Township OH and surrounding areas including technology, healthcare, part-time, and remote positions",
  employmentType: ["FULL_TIME", "PART_TIME", "CONTRACTOR", "TEMPORARY"],
  industry: "Multiple Industries",
};

const JobList = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Script
        id="jobs-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <JobListing />
    </Suspense>
  );
};

export default JobList;
