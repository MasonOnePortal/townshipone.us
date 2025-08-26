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
import { Suspense, useEffect, useState } from "react";
import OffersSlider from "@/components/dealsSaleClearanceItems/OffersSlider";
import Content from "@/components/card/Content";
import { InformationPromotedWrapper } from "@/components/Information-listing/InformationPromotedWrapper";

export default function HomeClient() {
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ["Support and promote local businesses"];

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentWord = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && currentCharIndex < currentWord.length) {
        setDisplayText(currentWord.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      } else if (isDeleting && currentCharIndex > 0) {
        setDisplayText(currentWord.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(currentCharIndex - 1);
      } else if (!isDeleting && currentCharIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentCharIndex, currentWordIndex, isDeleting, words]);
  const contentData1 = (
    <div>
      The Deerfield Township & Symmes Township, OH Portal website is your go-to
      resource for exploring everything our city has to offer, from local
      businesses with exclusive deals to a vibrant real estate market and
      comprehensive job listings. It's designed to connect residents and
      visitors alike to the community, ensuring access to the latest promotions,
      discounts, and opportunities in Deerfield Township & Symmes Township, OH.
    </div>
  );

  return (
    <Suspense fallback={<Loading />}>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "Township",
                addressRegion: "OH",
                addressCountry: "US",
              },
            ],
          }),
        }}
      />

      <BannerSlider />
      <Search />


      <div className="container">
        {/* Typewriter Hero Heading */}
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
            }}
          >
            {displayText}
            <span
              className="cursor"
              style={{
                borderRight: "3px solid #d28454",
                animation: "blink 1s infinite",
                marginLeft: "5px",
              }}
            >
              |
            </span>
          </h1>
        </div>
        <h1 className="fs-5" style={{ marginTop: "20px" }}>
          Explore Local Listings & Services in Deerfield Township & Symmes
          Township, OH
        </h1>

        <p className="contentCss">
          Welcome to the Deerfield Township & Symmes Township, OH Area Portal,
          your comprehensive resource for exploring everything our vibrant
          region has to offer.
        </p>

        <p className="contentCss">
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
        </p>

        <ul className="fx-6 contentCss">
          <li>
            <b>Uncover Exclusive Deals</b>: Discover the best deals and
            discounts from local businesses across the region.
          </li>
          <li>
            <b>Connect with Local Businesses</b>: Explore a diverse selection of
            businesses offering unique products and services near you.
          </li>
          <li>
            <b>Explore a Thriving Real Estate Market</b>: Search for your ideal
            home across Deerfield Township & Symmes Township, OH and surrounding
            areas.
          </li>
          <li>
            <b>Find Your Perfect Job</b>: Browse a broad range of job
            opportunities suited to your skills across multiple towns.
          </li>
        </ul>

        <p className="contentCss">
          With our portal, connecting with the Deerfield Township & Symmes
          Township, OH community has never been easier. Whether you're a local
          resident, newcomer, or visitor, find everything you need to stay
          connected, informed, and engaged with the region's dynamic offerings.
        </p>
      </div>

      <MainCategory />
      <BusinessListing />
      <OffersSlider />
      <RealEstateSlider />
      <JobsGrid />
      <InformationPromotedWrapper />
      {/* CSS Animations */}
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

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }

        .typewriter-heading {
          font-family: "Arial", sans-serif;
        }

        .cursor {
          display: inline-block;
          vertical-align: top;
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
