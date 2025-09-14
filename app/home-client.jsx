"use client";
import BusinessListing from "@/components/business-listing/BusinessListing";
import BannerSlider from "@/components/slider/BannerSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RealEstateSlider from "@/components/RealEstate/RealEstateSlider";
import JobsGrid from "@/components/job/JobsGrid";
import Search from "@/components/MainSearch/Search";
import MainCategory from "@/components/MainCategory/MainCategory";
import { Loading } from "@/components/Loading";
import { Suspense } from "react";
import OffersSlider from "@/components/dealsSaleClearanceItems/OffersSlider";
import Content from "@/components/card/Content";
import { InformationPromotedWrapper } from "@/components/Information-listing/InformationPromotedWrapper";
import { useMemo } from "react";
import { Typewriter } from "react-simple-typewriter";

// Move static content outside component
const CONTENT_DATA_1 = (
  <div>
    The Deerfield Township & Symmes Township, OH Portal website is your go-to
    resource for exploring everything our city has to offer, from local
    businesses with exclusive deals to a vibrant real estate market and
    comprehensive job listings. It's designed to connect residents and visitors
    alike to the community, ensuring access to the latest promotions, discounts,
    and opportunities in Deerfield Township & Symmes Township, OH.
  </div>
);

// Move schema data outside component
const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Township OH Business Directory",
  description:
    "Complete business directory for Township OH, Deerfield Township, Township, West Chester Township, and surrounding areas",
  url: "https://townshipone.us",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://townshipone.us/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Township",
      addressRegion: "OH",
      addressCountry: "US",
    },
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
  ],
};

export default function HomeClient() {
  // Memoize schema script to prevent re-creation
  const schemaScript = useMemo(
    () => (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SCHEMA_DATA),
        }}
      />
    ),
    []
  );

  return (
    <Suspense fallback={<Loading />}>
      {/* Schema.org structured data */}
      {schemaScript}

      <BannerSlider />
      <Search />

      <div className="container">
        {/* Typewriter Hero Heading using React Simple Typewriter */}
        <div
          className="hero-heading-wrapper"
          style={{
            textAlign: "center",
            margin: "0px 0 30px 0",
            position: "relative",
            minHeight: "80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            className="typewriter-heading"
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
              fontWeight: "900",
              background:
                "linear-gradient(45deg, #d28454, #da8f61, #e29c6f, #ecae82)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 3s ease-in-out infinite",
              textShadow: "0 4px 8px rgba(0,0,0,0.25)",
              letterSpacing: "2px",
              lineHeight: "1.2",
              margin: "0",
              minHeight: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typewriter
              words={["Support and promote local businesses"]}
              loop={0} // Infinite loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>
        </div>

        <h1 className="fs-5" style={{ marginTop: "20px" }}>
          Welcome to the Deerfield Township OH Community Portal
        </h1>

        <p className="contentCss">
          Your gateway to an exceptional lifestyle and thriving commerce.
          Designed for those who value a premier living experience, our portal
          connects you to everything that makes{" "}
          <strong> Deerfield Township OH</strong> a wonderful place to live,
          work, and play.
        </p>

        {/* <p className="contentCss">
          Discover local deals, business and real estate listings, and job
          opportunities—all in one place. Stay updated on the latest promotions
          and community offers.
        </p>

        <p className="contentCss">
          The Deerfield Township & Symmes Township, OH City Portal website is
          your go-to resource for exploring everything our city has to offer,
          from local businesses with exclusive deals to a vibrant real estate
          market and comprehensive job listings. It's designed to connect
          residents and visitors alike to the community, ensuring access to the
          latest promotions, discounts, and opportunities in Deerfield Township
          & Symmes Township, OH City.
        </p> */}

        <ul className="fx-6 contentCss">
          <li>
            <b>Shop & Save Local</b>: Access special offers from the finest
            retailers in the area.
          </li>
          <li>
            <b>Connect with Businesses</b>: Find everything from Fortune 500
            companies to local professionals in{" "}
            <strong> Deerfield Township OH.</strong>
          </li>
          <li>
            <b>Find Your Place</b>:Browse real estate in the township's
            top-rated communities.
          </li>
          <li>
            <b>Grow Your Career</b>: Search for positions with major employers.
          </li>
          <li>
            <b>Stay Informed</b>: Keep up with{" "}
            <strong> Deerfield Township OH</strong> news and community events.
          </li>
        </ul>

        <p className="contentCss">
          Discover why this area is more than just a place to live---it's a
          place to thrive.
        </p>
      </div>

      <MainCategory />
      <BusinessListing />
      <OffersSlider />
      <RealEstateSlider />
      <JobsGrid />
      <InformationPromotedWrapper />

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .typewriter-heading {
          font-family: "Arial", sans-serif;
        }

        @media (max-width: 768px) {
          .hero-heading-wrapper {
            margin: 20px 0 !important;
            min-height: 100px !important;
          }

          .typewriter-heading {
            min-height: 60px !important;
          }
        }
      `}</style>
    </Suspense>
  );
}
