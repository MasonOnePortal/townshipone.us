import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Banner from "@/components/banner/Banner";
import { ServiceWrapper } from "@/components/professional-services/ServiceWrapper";
import second from "@/public/img/new.webp";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import Content from "@/components/card/Content";
import Link from "next/link";

export const metadata = {
  title: {
    absolute:
      "Grow Your Business with Deerfield Township & Symmes Township, OH Us IT solutions in Deerfield Township & Symmes Township, OH city",
  },
  description:
    "Best Professional Services with a comprehensive range of cutting-edge IT solutions tailored to meet your business needs in Deerfield Township & Symmes Township, OH City, Iowa, US explore now",
  keywords: [
    "Professional IT services Deerfield Township OH",
    "Digital Marketing Deerfield Township OH",
    "Ecommerce Integration Deerfield Township OH",
    "AI Chatbot Deerfield Township OH",
    "IT solutions Deerfield Township OH",
    "Technical services Deerfield Township OH",
    "Deerfield Township OH business IT support",
    "Deerfield Township Ohio web development",
    "Digital transformation Deerfield Township OH",
    "Deerfield Township Ohio technology services",
    "Symmes Township IT services",
    "Symmes Township OH software solutions",
    "Symmes Township IT consultancy",
    "Business automation Deerfield Township OH",
  ],
  alternates: {
    canonical: "https://yourwebsite.com/professional-services/deerfield-symmes-township",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com/professional-services/deerfield-symmes-township",
    title:
      "Professional IT Services Deerfield Township & Symmes Township OH | Digital Marketing, Ecommerce & AI Solutions",
    description:
      "Comprehensive IT services in Deerfield Township & Symmes Township, Ohio, including Digital Marketing, Ecommerce integration, and AI Chatbot solutions.",
    siteName: "Deerfield & Symmes Professional Services",
    images: [
      {
        url: "/img/new.webp",
        width: 1200,
        height: 630,
        alt: "Professional IT Services in Deerfield Township OH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional IT Services Deerfield Township & Symmes Township OH | Digital Marketing & AI Solutions",
    description:
      "Boost your business with IT services in Deerfield Township & Symmes Township, Ohio. We offer digital marketing, ecommerce, and AI chatbot solutions.",
    images: ["/img/new.webp"],
  },
  other: {
    "geo.region": "US-OH",
    "geo.placename": "Deerfield Township & Symmes Township, Ohio",
    "geo.position": "39.3700;-84.3700",  // Update with actual coordinates if necessary
    ICBM: "39.3700, -84.3700",  // Update with actual coordinates if necessary
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Deerfield & Symmes Township IT Services",
  description:
    "Professional IT services in Deerfield Township & Symmes Township OH including Digital Marketing, Ecommerce Integration, and AI Chatbot solutions.",
  url: "https://yourwebsite.com/professional-services/deerfield-symmes-township",
  areaServed: [
    {
      "@type": "City",
      name: "Deerfield Township",
      addressRegion: "OH",
      addressCountry: "US",
    },
    {
      "@type": "City",
      name: "Symmes Township",
      addressRegion: "OH",
      addressCountry: "US",
    },
    {
      "@type": "City",
      name: "Cincinnati",
      addressRegion: "OH",
      addressCountry: "US",
    },
  ],
  provider: {
    "@type": "Organization",
    name: "Deerfield & Symmes IT Services",
    url: "https://yourwebsite.com",
    description:
      "Professional IT services provider for businesses in Deerfield Township & Symmes Township, Ohio",
  },
};

export default async function ProfessionalServices() {
  return (
    <Suspense fallback={<Loading />}>
      <Script
        id="deals-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords.join(", ")} />
      <Banner
        img={second}
        bannerHeading="Ecommerce integration, Digital Marketing, and AI Chatbot Services in Deerfield Township & Symmes Township, OH"
        bannerContent="Comprehensive IT solutions tailored to your business needs."
      />
      <Breadcrumb pagename="Technology Solutions" />
      <div className="container">
        <h1 className="fs-5">Technical Services Deerfield Township & Symmes Township, OH</h1>
        <Content contentData="Welcome to our IT Services page, where we offer a comprehensive range of solutions to cater to your diverse technological needs. Our dedicated team of IT professionals is committed to delivering exceptional services that propel your business forward. Explore our key services below" />
        <ul className="fx-6 contentCss">
          <li>
            Including our specialized, expedited, and prime technical services.
          </li>
          <li>Digital Marketing Deerfield Township & Symmes Township, OH</li>
          <li>AI Chatbot Deerfield Township & Symmes Township, OH</li>
          <li>Ecommerce Integration Deerfield Township & Symmes Township, OH</li>
        </ul>
        <div className="web_link_wr">
          <h4>
            Please
            <Link href="contact-us" target="_blank" rel="">
              <b className="ps-1 pe-1">Contact Us </b>
            </Link>
            for any questions or inquiries.
          </h4>
        </div>
      </div>

      <div className="container">
        <ServiceWrapper />
      </div>
    </Suspense>
  );
}
